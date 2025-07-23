import { create } from 'zustand';

type Dates = {
  from: Date | null;
  to: Date | null;
};

type BookingStore = {
  dates: Dates;
  selectedCities: string[];
  setDates: (dates: Dates) => void;
  setSelectedCities: (cities: string[]) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  dates: { from: null, to: null },
  selectedCities: [],
  setDates: (dates) => set({ dates }),
  setSelectedCities: (cities) => set({ selectedCities: cities }),
}));
