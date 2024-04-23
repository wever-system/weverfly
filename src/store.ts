import { create } from "zustand";

interface IActiveTab {
    activeTab: string;
    setActiveTab: (activeTab: string) => void;
}

const useActiveTabStore = create<IActiveTab>((set) => ({
    activeTab: "gpt",
    setActiveTab: (activeTab) => set({ activeTab })
}));

export default useActiveTabStore;