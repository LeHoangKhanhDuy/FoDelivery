import { create } from 'zustand';
import { Product, Category } from '../types';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../constants/mockData';

interface MenuState {
  products: Product[];
  categories: Category[];
  selectedCategoryId: string;
  searchQuery: string;

  // Actions
  setSelectedCategoryId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  toggleProductStock: (id: string) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  products: MOCK_PRODUCTS,
  categories: MOCK_CATEGORIES,
  selectedCategoryId: 'cat-1',
  searchQuery: '',

  setSelectedCategoryId: (selectedCategoryId) => set({ selectedCategoryId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  toggleProductStock: (id) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)),
    }));
  },
}));
