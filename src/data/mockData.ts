export const kpiData = [
  { label: "Active Cases", value: 1247, delta: "+12%", deltaType: "up", icon: "briefcase", color: "primary" },
  { label: "Seizures Today", value: 38, delta: "+5", deltaType: "up", icon: "package", color: "accent" },
  { label: "High-Risk Districts", value: 6, delta: "-1", deltaType: "down", icon: "alert-triangle", color: "risk-high" },
  { label: "Intel Reports", value: 184, delta: "+22", deltaType: "up", icon: "brain", color: "intel" },
  { label: "Checkposts Active", value: 42, delta: "0", deltaType: "neutral", icon: "shield", color: "risk-low" },
  { label: "Helpline Calls", value: 93, delta: "+8", deltaType: "up", icon: "phone", color: "risk-medium" },
];

export const recentCases = [
  { id: "CS-2024-1831", district: "Thiruvananthapuram", unit: "STF", type: "NDPS", severity: "high", status: "Active", accused: "Rajan K.", seizure: "4.2 kg Cannabis" },
  { id: "CS-2024-1830", district: "Ernakulam", unit: "District", type: "Excise", severity: "medium", status: "Under Investigation", accused: "Pradeep M.", seizure: "120 L Arrack" },
  { id: "CS-2024-1829", district: "Kozhikode", unit: "CIU", type: "NDPS", severity: "high", status: "Chargesheeted", accused: "Suresh V.", seizure: "850g Heroin" },
  { id: "CS-2024-1828", district: "Thrissur", unit: "Anti-Narcotics", type: "NDPS", severity: "low", status: "Closed", accused: "Anwar S.", seizure: "22 tablets" },
  { id: "CS-2024-1827", district: "Palakkad", unit: "District", type: "Smuggling", severity: "medium", status: "Active", accused: "Krishnan P.", seizure: "Counterfeit goods" },
  { id: "CS-2024-1826", district: "Malappuram", unit: "CIU", type: "NDPS", severity: "high", status: "Active", accused: "Hameed A.", seizure: "1.2 kg Ganja" },
];

export const districtRisk = [
  { district: "Thiruvananthapuram", score: 87, cases: 234, trend: "up" },
  { district: "Ernakulam", score: 72, cases: 198, trend: "up" },
  { district: "Kozhikode", score: 65, cases: 156, trend: "stable" },
  { district: "Thrissur", score: 58, cases: 134, trend: "down" },
  { district: "Malappuram", score: 79, cases: 178, trend: "up" },
  { district: "Palakkad", score: 45, cases: 98, trend: "down" },
  { district: "Kannur", score: 61, cases: 142, trend: "stable" },
  { district: "Wayanad", score: 71, cases: 89, trend: "up" },
];

export const trendData = [
  { month: "Aug", cases: 98, seizures: 34 },
  { month: "Sep", cases: 112, seizures: 41 },
  { month: "Oct", cases: 127, seizures: 38 },
  { month: "Nov", cases: 143, seizures: 52 },
  { month: "Dec", cases: 138, seizures: 48 },
  { month: "Jan", cases: 156, seizures: 61 },
  { month: "Feb", cases: 171, seizures: 67 },
];

export const offenceBreakdown = [
  { type: "NDPS", count: 445, pct: 36 },
  { type: "Excise", count: 312, pct: 25 },
  { type: "Smuggling", count: 187, pct: 15 },
  { type: "Counterfeit", count: 124, pct: 10 },
  { type: "Others", count: 179, pct: 14 },
];

export const checkpostData = [
  { name: "Walayar", district: "Palakkad", status: "active", vehicles: 342, alerts: 3 },
  { name: "Talapady", district: "Kasaragod", status: "active", vehicles: 218, alerts: 1 },
  { name: "Muzhikkunnu", district: "Kannur", status: "active", vehicles: 189, alerts: 0 },
  { name: "Nilambur", district: "Malappuram", status: "active", vehicles: 276, alerts: 5 },
  { name: "Aralam", district: "Kannur", status: "maintenance", vehicles: 0, alerts: 0 },
  { name: "Thrissur Bypass", district: "Thrissur", status: "active", vehicles: 411, alerts: 2 },
];

export const auditLogs = [
  { id: 1, user: "SP Ramesh Kumar", action: "Approved Intel Report", module: "Intelligence", ip: "10.0.1.45", time: "2025-02-26 14:32" },
  { id: 2, user: "DSP Anitha Nair", action: "Created DSR Entry", module: "DSR", ip: "10.0.2.12", time: "2025-02-26 14:18" },
  { id: 3, user: "CI Suresh Babu", action: "Updated Case Status", module: "Case Mgmt", ip: "10.0.3.78", time: "2025-02-26 13:55" },
  { id: 4, user: "Admin Priya", action: "Created User Account", module: "Admin", ip: "10.0.1.10", time: "2025-02-26 13:40" },
  { id: 5, user: "DIG Krishnan", action: "Exported PDF Report", module: "Reports", ip: "10.0.4.22", time: "2025-02-26 13:22" },
  { id: 6, user: "CIU Officer Hameed", action: "Added Accused Profile", module: "Intelligence", ip: "10.0.5.33", time: "2025-02-26 13:10" },
];

export const intelligenceProfiles = [
  { id: "ACC-001", name: "Rajan Krishnan", age: 38, district: "Thiruvananthapuram", risk: "high", cases: 4, status: "Active", associates: 6 },
  { id: "ACC-002", name: "Mohammed Hameed", age: 44, district: "Malappuram", risk: "high", cases: 7, status: "Active", associates: 12 },
  { id: "ACC-003", name: "Suresh Varma", age: 29, district: "Kozhikode", risk: "medium", cases: 2, status: "Absconding", associates: 3 },
  { id: "ACC-004", name: "Anwar Sadique", age: 35, district: "Thrissur", risk: "medium", cases: 3, status: "Arrested", associates: 5 },
  { id: "ACC-005", name: "Pradeep Menon", age: 51, district: "Ernakulam", risk: "low", cases: 1, status: "Released on Bail", associates: 2 },
];

export const mapMarkers = [
  { id: 1, lat: 8.5241, lng: 76.9366, type: "NDPS", severity: "high", district: "Thiruvananthapuram", label: "CS-2024-1831" },
  { id: 2, lat: 9.9312, lng: 76.2673, type: "Excise", severity: "medium", district: "Ernakulam", label: "CS-2024-1830" },
  { id: 3, lat: 11.2588, lng: 75.7804, type: "NDPS", severity: "high", district: "Kozhikode", label: "CS-2024-1829" },
  { id: 4, lat: 10.5276, lng: 76.2144, type: "NDPS", severity: "low", district: "Thrissur", label: "CS-2024-1828" },
  { id: 5, lat: 10.7867, lng: 76.6548, type: "Smuggling", severity: "medium", district: "Palakkad", label: "CS-2024-1827" },
  { id: 6, lat: 11.0510, lng: 76.0711, type: "NDPS", severity: "high", district: "Malappuram", label: "CS-2024-1826" },
  { id: 7, lat: 11.8745, lng: 75.3704, type: "Excise", severity: "medium", district: "Kannur", label: "CS-2024-1825" },
  { id: 8, lat: 11.6854, lng: 76.1320, type: "NDPS", severity: "high", district: "Wayanad", label: "CS-2024-1824" },
];
