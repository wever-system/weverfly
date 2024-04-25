import { create } from "zustand";

interface IActiveTab {
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
}

const useActiveTabStore = create<IActiveTab>((set) => ({
    activeTab: "clipboard",
    setActiveTab: (activeTab) => set({ activeTab })
}));

export default useActiveTabStore;