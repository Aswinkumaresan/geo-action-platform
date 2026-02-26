import { motion } from "framer-motion";
import { useState } from "react";
import { Users, Lock, Building2, Plus, Edit, Trash2 } from "lucide-react";

const users = [
  { id: 1, name: "SP Ramesh Kumar", role: "SP", district: "Thiruvananthapuram", status: "Active", lastLogin: "2025-02-26 14:00" },
  { id: 2, name: "DSP Anitha Nair", role: "DSP", district: "Ernakulam", status: "Active", lastLogin: "2025-02-26 13:45" },
  { id: 3, name: "CI Suresh Babu", role: "CI", district: "Kozhikode", status: "Active", lastLogin: "2025-02-26 11:30" },
  { id: 4, name: "CIU Hameed A.", role: "CIU Officer", district: "Malappuram", status: "Active", lastLogin: "2025-02-26 09:15" },
  { id: 5, name: "ASI Priya K.", role: "ASI", district: "Thrissur", status: "Inactive", lastLogin: "2025-02-20 16:00" },
];

const permissions = [
  { module: "Dashboard", SP: true, DSP: true, CI: true, CIU: true, ASI: false },
  { module: "GIS Map", SP: true, DSP: true, CI: true, CIU: false, ASI: false },
  { module: "DSR Entry", SP: true, DSP: true, CI: true, CIU: true, ASI: true },
  { module: "Intelligence", SP: true, DSP: true, CI: false, CIU: true, ASI: false },
  { module: "Analytics", SP: true, DSP: true, CI: false, CIU: false, ASI: false },
  { module: "Admin Panel", SP: true, DSP: false, CI: false, CIU: false, ASI: false },
  { module: "Audit Logs", SP: true, DSP: true, CI: false, CIU: false, ASI: false },
];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"users" | "permissions" | "districts">("users");

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      <div className="flex gap-2">
        {[
          { id: "users", label: "Users", icon: Users },
          { id: "permissions", label: "Permission Matrix", icon: Lock },
          { id: "districts", label: "District Mapping", icon: Building2 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === id ? "hsl(var(--primary) / 0.15)" : "hsl(var(--muted))",
              color: activeTab === id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            }}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          <Plus className="h-3.5 w-3.5" /> Add User
        </button>
      </div>

      {activeTab === "users" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <h3 className="text-sm font-semibold mb-4">User Management</h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                {["Name", "Role", "District", "Status", "Last Login", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-medium pb-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="data-table-row">
                  <td className="py-3 font-semibold">{u.name}</td>
                  <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>{u.role}</span></td>
                  <td className="py-3 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{u.district}</td>
                  <td className="py-3"><span className="text-xs font-medium" style={{ color: u.status === "Active" ? "hsl(var(--risk-low))" : "hsl(var(--muted-foreground))" }}>● {u.status}</span></td>
                  <td className="py-3 text-xs font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>{u.lastLogin}</td>
                  <td className="py-3 flex items-center gap-2">
                    <button className="p-1.5 rounded hover:bg-muted transition-colors"><Edit className="h-3.5 w-3.5" style={{ color: "hsl(var(--accent))" }} /></button>
                    <button className="p-1.5 rounded hover:bg-muted transition-colors"><Trash2 className="h-3.5 w-3.5" style={{ color: "hsl(var(--risk-high))" }} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === "permissions" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="stat-card overflow-x-auto">
          <h3 className="text-sm font-semibold mb-4">Role-Based Permission Matrix</h3>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                <th className="text-left font-medium pb-3 pr-6">Module</th>
                {["SP", "DSP", "CI", "CIU", "ASI"].map(r => (
                  <th key={r} className="text-center font-medium pb-3 px-4">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr key={perm.module} className="data-table-row">
                  <td className="py-2.5 pr-6 font-medium">{perm.module}</td>
                  {["SP", "DSP", "CI", "CIU", "ASI"].map(role => (
                    <td key={role} className="py-2.5 text-center">
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold mx-auto"
                        style={{
                          background: perm[role as keyof typeof perm] ? "hsl(var(--risk-low) / 0.15)" : "hsl(var(--muted))",
                          color: perm[role as keyof typeof perm] ? "hsl(var(--risk-low))" : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {perm[role as keyof typeof perm] ? "✓" : "✗"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === "districts" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
          <h3 className="text-sm font-semibold mb-4">District-Unit Mapping</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"].map((d, i) => (
              <div key={d} className="flex items-center justify-between rounded-lg p-3" style={{ background: "hsl(var(--muted))" }}>
                <span className="text-xs font-medium">{d}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>{3 + (i % 4)} units</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
