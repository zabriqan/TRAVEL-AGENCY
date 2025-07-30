// store/useDestinationStore.ts
import { create } from 'zustand';

export const Destinationstore = create<{
  selectedDestinations: string[];
  setSelectedDestinations: (dest: string[]) => void;
  addDestination: (dest: string) => void;
}>((set) => ({
  selectedDestinations: [],
  setSelectedDestinations: (dest) => set({ selectedDestinations: dest }),
  addDestination: (dest) =>
    set((state) => ({
      selectedDestinations: state.selectedDestinations.includes(dest)
        ? state.selectedDestinations
        : [...state.selectedDestinations, dest],
    })),
}));
