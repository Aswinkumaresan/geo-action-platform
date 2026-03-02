import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mapMarkers } from "@/data/mockData";
import { Layers, Thermometer, RotateCcw, ZoomIn, ZoomOut, Filter, X, MapPin, AlertTriangle } from "lucide-react";

const severityColor: Record<string, string> = {
  high: "#ef4444",
  medium: "#f97316",
  low: "#22c55e",
};

export function GISPage() {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedMarker, setSelectedMarker] = useState<typeof mapMarkers[0] | null>(null);
  const [activeLayer, setActiveLayer] = useState<"standard" | "satellite">("standard");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    if (mapInstanceRef.current) return;
    
    import("leaflet").then((L) => {
      // Fix icon issues
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [11.0, 78.5],
        zoom: 7,
        zoomControl: false,
      });


      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '©OpenStreetMap ©CARTO',
        maxZoom: 19,
      }).addTo(map);

      mapMarkers.forEach((m) => {
        const circle = L.circleMarker([m.lat, m.lng], {
          radius: 10,
          fillColor: severityColor[m.severity],
          color: severityColor[m.severity],
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.7,
        });
        circle.addTo(map);
        circle.bindTooltip(`<b>${m.label}</b><br/>${m.district} — ${m.type}`, {
          className: "leaflet-tooltip-dark",
        });
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative flex-1 flex overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="flex-1 h-full" style={{ background: "#e8f0fe" }} />

      {/* Left Controls */}
      <div className="gis-control-panel absolute left-4 top-4 space-y-2 w-52">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="h-4 w-4" style={{ color: "hsl(var(--accent))" }} />
          <span className="text-xs font-semibold">Layer Controls</span>
        </div>
        {[
          { id: "all", label: "All Cases" },
          { id: "NDPS", label: "NDPS" },
          { id: "Excise", label: "Excise" },
          { id: "Smuggling", label: "Smuggling" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors"
            style={{
              background: filterType === f.id ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted))",
              color: filterType === f.id ? "hsl(var(--primary))" : "hsl(var(--foreground))",
            }}
          >
            <div className="h-2 w-2 rounded-full" style={{ background: filterType === f.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }} />
            {f.label}
          </button>
        ))}
        <div className="border-t pt-2 mt-2" style={{ borderColor: "hsl(var(--border))" }}>
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors"
            style={{
              background: showHeatmap ? "hsl(var(--risk-high) / 0.2)" : "hsl(var(--muted))",
              color: showHeatmap ? "hsl(var(--risk-high))" : "hsl(var(--foreground))",
            }}
          >
            <Thermometer className="h-3.5 w-3.5" />
            Heatmap Overlay
          </button>
        </div>
      </div>

      {/* Right Marker Legend */}
      <div className="gis-control-panel absolute right-4 top-4 w-44">
        <p className="text-xs font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" style={{ color: "hsl(var(--accent))" }} />
          Severity Legend
        </p>
        {Object.entries(severityColor).map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 text-xs mb-1.5">
            <div className="h-3 w-3 rounded-full" style={{ background: v }} />
            <span className="capitalize">{k} Risk</span>
          </div>
        ))}
        <div className="border-t mt-3 pt-3" style={{ borderColor: "hsl(var(--border))" }}>
          <p className="text-[10px] font-semibold mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>ACTIVE MARKERS</p>
          {mapMarkers.slice(0, 5).map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMarker(m)}
              className="w-full text-left text-[10px] mb-1 px-2 py-1 rounded hover:bg-muted transition-colors font-mono"
              style={{ color: severityColor[m.severity] }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="gis-control-panel absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex gap-6">
          <div className="text-xs">
            <span style={{ color: "hsl(var(--muted-foreground))" }}>Total Markers</span>
            <span className="ml-2 font-bold">{mapMarkers.length}</span>
          </div>
          <div className="text-xs">
            <span style={{ color: "hsl(var(--muted-foreground))" }}>High Risk</span>
            <span className="ml-2 font-bold" style={{ color: "hsl(var(--risk-high))" }}>
              {mapMarkers.filter(m => m.severity === "high").length}
            </span>
          </div>
          <div className="text-xs">
            <span style={{ color: "hsl(var(--muted-foreground))" }}>Districts Covered</span>
            <span className="ml-2 font-bold">14</span>
          </div>
        </div>
        <div className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>
          Last updated: {new Date().toLocaleTimeString()} IST
        </div>
      </div>

      {/* Case Detail Drawer */}
      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 w-72 flex flex-col"
            style={{ background: "hsl(var(--card))", borderLeft: "1px solid hsl(var(--border))" }}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
              <div>
                <p className="text-sm font-bold font-mono" style={{ color: "hsl(var(--accent))" }}>{selectedMarker.label}</p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Case Details</p>
              </div>
              <button onClick={() => setSelectedMarker(null)} className="p-1 rounded hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              <div className="space-y-3">
                {[
                  { label: "District", value: selectedMarker.district },
                  { label: "Case Type", value: selectedMarker.type },
                  { label: "Coordinates", value: `${selectedMarker.lat.toFixed(4)}, ${selectedMarker.lng.toFixed(4)}` },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{row.label}</p>
                    <p className="text-sm font-medium">{row.value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>Severity</p>
                  <span className={`risk-badge-${selectedMarker.severity}`}>
                    <AlertTriangle className="h-3 w-3" />
                    {selectedMarker.severity.toUpperCase()} RISK
                  </span>
                </div>
              </div>
              <div className="rounded-lg p-3" style={{ background: "hsl(var(--muted))" }}>
                <p className="text-xs font-semibold mb-2">Quick Actions</p>
                <div className="space-y-2">
                  {["View Full Case", "Add Intelligence", "Assign Officer", "Generate Report"].map((action) => (
                    <button key={action} className="w-full text-left text-xs px-3 py-2 rounded transition-colors hover:bg-card">
                      → {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
