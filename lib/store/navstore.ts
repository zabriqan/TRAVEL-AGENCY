// store/useNavStore.ts
import { create } from 'zustand';

type NavState = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const useNavStore = create<NavState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
