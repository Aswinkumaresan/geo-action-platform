import { create } from "zustand";

type Module = "dashboard" | "gis" | "dsr" | "intelligence" | "analytics" | "checkpost" | "reports" | "admin" | "audit" | "settings";

interface AppState {
  activeModule: Module;
  setActiveModule: (m: Module) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  selectedCaseId: string | null;
  setSelectedCaseId: (id: string | null) => void;
  alertCount: number;
}

export const useAppStore = create<AppState>((set) => ({
  activeModule: "dashboard",
  setActiveModule: (m) => set({ activeModule: m }),
  sidebarOpen: true,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  selectedCaseId: null,
  setSelectedCaseId: (id) => set({ selectedCaseId: id }),
  alertCount: 7,
}));
