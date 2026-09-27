import { create } from 'zustand';
import type { Product, Category } from '@/types';
import { MOCK_CATEGORIES } from '@/constants/mockData';
import { MOCK_PRODUCTS } from '@/modules/product/mocks/products';

interface MenuState {
  products: Product[];
  categories: Category[];
  selectedCategoryId: string;
  searchQuery: string;
  setSelectedCategoryId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  toggleProductStock: (id: string) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  products: MOCK_PRODUCTS,
  categories: MOCK_CATEGORIES,
  selectedCategoryId: 'all',
  searchQuery: '',

  setSelectedCategoryId: (selectedCategoryId) => set({ selectedCategoryId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (product) => set((state) => ({
    products: state.products.map((item) => (item.id === product.id ? product : item)),
  })),

  toggleProductStock: (id) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)),
    }));
  },
}));
