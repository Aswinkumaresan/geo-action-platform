import { motion } from "framer-motion";
import { intelligenceProfiles } from "@/data/mockData";
import { Brain, ChevronRight, User, Network, Clock, AlertTriangle, Check } from "lucide-react";
import { useState } from "react";

const workflowSteps = [
  { role: "CIU Personnel", status: "approved", time: "09:15" },
  { role: "DSP", status: "approved", time: "10:32" },
  { role: "SP", status: "approved", time: "11:48" },
  { role: "DIG", status: "pending", time: "" },
  { role: "ADGP", status: "waiting", time: "" },
  { role: "District Unit", status: "waiting", time: "" },
];

export function IntelligencePage() {
  const [selected, setSelected] = useState(intelligenceProfiles[0]);

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Profiles List */}
      <div className="w-72 border-r flex flex-col" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="p-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Brain className="h-4 w-4" style={{ color: "hsl(var(--intelligence))" }} />
            Accused Profiles
          </h3>
          <input className="mt-2 w-full rounded-md border px-3 py-1.5 text-xs bg-muted focus:outline-none" style={{ borderColor: "hsl(var(--border))" }} placeholder="Search profiles..." />
        </div>
        <div className="flex-1 overflow-y-auto">
          {intelligenceProfiles.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(p)}
              className="w-full text-left p-4 border-b transition-colors hover:bg-muted/50"
              style={{
                borderColor: "hsl(var(--border))",
                background: selected.id === p.id ? "hsl(var(--primary) / 0.08)" : "transparent",
                borderLeft: selected.id === p.id ? "2px solid hsl(var(--primary))" : "2px solid transparent",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{p.district}</p>
                  <p className="text-[10px] font-mono mt-1" style={{ color: "hsl(var(--accent))" }}>{p.id}</p>
                </div>
                <span className={`risk-badge-${p.risk}`}>{p.risk}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Profile Detail */}
      <div className="flex-1 overflow-y-auto p-6">
        <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-5">
          {/* Header */}
          <div className="stat-card flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>
                {selected.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold">{selected.name}</h2>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{selected.district} · Age {selected.age}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`risk-badge-${selected.risk}`}><AlertTriangle className="h-3 w-3" />{selected.risk.toUpperCase()} RISK</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>{selected.status}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: "hsl(var(--risk-high))" }}>{selected.cases}</p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Known Cases</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Known Cases", value: selected.cases, color: "risk-high" },
              { label: "Associates", value: selected.associates, color: "intelligence" },
              { label: "Risk Level", value: selected.risk.toUpperCase(), color: "accent" },
            ].map((stat) => (
              <div key={stat.label} className="stat-card text-center">
                <p className="text-2xl font-bold" style={{ color: `hsl(var(--${stat.color}))` }}>{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Activity Timeline */}
          <div className="stat-card">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: "hsl(var(--accent))" }} />
              Activity Timeline
            </h3>
            <div className="space-y-3">
              {[
                { date: "2025-02-15", event: "Arrested at Walayar Checkpost with 2.1kg Cannabis", type: "high" },
                { date: "2025-01-28", event: "Spotted near Palakkad border area", type: "medium" },
                { date: "2024-12-10", event: "Released on bail — Ernakulam Sessions Court", type: "low" },
                { date: "2024-11-03", event: "Case CS-2024-0892 filed — District Court", type: "medium" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full mt-1 shrink-0" style={{ background: `hsl(var(--risk-${item.type}))` }} />
                    {i < 3 && <div className="w-0.5 flex-1 mt-1" style={{ background: "hsl(var(--border))" }} />}
                  </div>
                  <div className="pb-3 flex-1">
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{item.date}</p>
                    <p className="text-sm mt-0.5">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Workflow */}
          <div className="stat-card">
            <h3 className="text-sm font-semibold mb-4">Intel Report Approval Pipeline</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {workflowSteps.map((step, i) => (
                <div key={step.role} className="flex items-center gap-1 shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center text-xs"
                      style={{
                        background: step.status === "approved" ? "hsl(var(--risk-low) / 0.15)" : step.status === "pending" ? "hsl(var(--risk-medium) / 0.15)" : "hsl(var(--muted))",
                        color: step.status === "approved" ? "hsl(var(--risk-low))" : step.status === "pending" ? "hsl(var(--risk-medium))" : "hsl(var(--muted-foreground))",
                        border: step.status === "pending" ? "1px solid hsl(var(--risk-medium))" : "none",
                      }}
                    >
                      {step.status === "approved" ? <Check className="h-4 w-4" /> : <User className="h-3.5 w-3.5" />}
                    </div>
                    <p className="text-[10px] text-center font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>{step.role}</p>
                    {step.time && <p className="text-[9px]" style={{ color: "hsl(var(--risk-low))" }}>{step.time}</p>}
                  </div>
                  {i < workflowSteps.length - 1 && (
                    <ChevronRight className="h-3 w-3 mx-0.5 mb-5 shrink-0" style={{ color: "hsl(var(--muted-foreground))" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
