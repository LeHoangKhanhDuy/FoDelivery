import { create } from 'zustand';
import { Driver } from '../types';
import { MOCK_DRIVERS } from '../constants/mockData';

interface DriverState {
  drivers: Driver[];
  selectedDriverId: string | null;

  // Actions
  setSelectedDriverId: (id: string | null) => void;
  updateDriverStatus: (id: string, status: Driver['status']) => void;
}

export const useDriverStore = create<DriverState>((set) => ({
  drivers: MOCK_DRIVERS,
  selectedDriverId: null,

  setSelectedDriverId: (selectedDriverId) => set({ selectedDriverId }),

  updateDriverStatus: (id, status) => {
    set((state) => ({
      drivers: state.drivers.map((d) => (d.id === id ? { ...d, status } : d)),
    }));
  },
}));
