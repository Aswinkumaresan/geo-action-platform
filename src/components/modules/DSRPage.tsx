import { useState } from "react";
import { Search, FileText, FileSpreadsheet, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DSRNewEntryForm } from "./DSRNewEntryForm";
import { DSRPEWForm } from "./DSRPEWForm";
import { DSRNDPSForm } from "./DSRNDPSForm";

const topTabs = ["DSR Cases", "PEW", "NDPS"];

const dsrSubTabs = [
  "Checkpost Seizures",
  "BL Goondas Entry",
  "Bandobust Details",
  "Helpline Calls",
  "WhatsApp Calls",
  "Vehicle Disposal",
  "Solvent Inspections",
];

const tableColumns = ["Case ID", "Date", "District", "Unit", "Checkpost", "Offence Type", "Contraband", "Status"];

const districts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
];

export function DSRPage() {
  const [topTab, setTopTab] = useState("DSR Cases");
  const [activeTab, setActiveTab] = useState("Checkpost Seizures");
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Daily Situation Report</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage case entries and daily reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-muted" style={{ borderColor: "hsl(var(--border))" }}>
            <FileText className="h-4 w-4" /> Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-muted" style={{ borderColor: "hsl(var(--border))" }}>
            <FileSpreadsheet className="h-4 w-4" /> Export Excel
          </button>
          {topTab === "DSR Cases" && (
            <button
              onClick={() => setShowNewEntry(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              <Plus className="h-4 w-4" /> New Entry
            </button>
          )}
        </div>
      </div>

      {/* Top-level Tabs: DSR Cases | PEW | NDPS */}
      <div className="flex items-center gap-1 border-b mb-6" style={{ borderColor: "hsl(var(--border))" }}>
        {topTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setTopTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors relative ${
              topTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {topTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "hsl(var(--primary))" }} />
            )}
          </button>
        ))}
      </div>

      {/* DSR Cases Tab Content */}
      {topTab === "DSR Cases" && (
        <>
          {/* Search & Filters */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search cases..."
                className="w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <select
              value={districtFilter}
              onChange={e => setDistrictFilter(e.target.value)}
              className="rounded-lg border px-4 py-2.5 text-sm bg-background min-w-[140px] focus:outline-none"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="rounded-lg border px-4 py-2.5 text-sm bg-background min-w-[120px] focus:outline-none"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1 border-b mb-0" style={{ borderColor: "hsl(var(--border))" }}>
            {dsrSubTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "hsl(var(--primary))" }} />
                )}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-b-lg border border-t-0 overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-4">{activeTab}</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
                    {tableColumns.map(col => (
                      <th key={col} className="text-left py-3 px-3 text-muted-foreground font-medium text-xs">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={tableColumns.length} className="text-center py-12 text-muted-foreground text-sm">
                      No records found. Click "New Entry" to add a case.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* PEW Tab Content */}
      {topTab === "PEW" && <DSRPEWForm />}

      {/* NDPS Tab Content */}
      {topTab === "NDPS" && <DSRNDPSForm />}

      {/* New Entry Dialog */}
      <Dialog open={showNewEntry} onOpenChange={setShowNewEntry}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">New DSR Case Entry</DialogTitle>
          </DialogHeader>
          <DSRNewEntryForm onClose={() => setShowNewEntry(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
