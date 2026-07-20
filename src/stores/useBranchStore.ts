import { create } from 'zustand';
import { Branch } from '@/types';
import { MOCK_BRANCHES } from '@/constants/mockData';

interface BranchState {
  branches: Branch[];
  activeBranchId: string;
  
  // Actions
  setActiveBranchId: (id: string) => void;
  updateBranchRadius: (id: string, radiusKm: number) => void;
  toggleBranchStatus: (id: string) => void;
}

export const useBranchStore = create<BranchState>((set) => ({
  branches: MOCK_BRANCHES,
  activeBranchId: 'b-1',

  setActiveBranchId: (activeBranchId) => set({ activeBranchId }),

  updateBranchRadius: (id, radiusKm) => {
    set((state) => ({
      branches: state.branches.map((b) => (b.id === id ? { ...b, deliveryRadiusKm: radiusKm } : b)),
    }));
  },

  toggleBranchStatus: (id) => {
    set((state) => ({
      branches: state.branches.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)),
    }));
  },
}));
