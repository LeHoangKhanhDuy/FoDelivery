import { create } from 'zustand';
import type { Product, Category } from '@/types';
import { MOCK_CATEGORIES } from '@/modules/category/mocks/categories';
import { MOCK_PRODUCTS } from '@/modules/product/mocks/products';
import type { ToggleCategoryVisibilityResult } from '@/modules/category/types';

interface MenuState {
  products: Product[];
  categories: Category[];
  selectedCategoryId: string;
  searchQuery: string;
  setSelectedCategoryId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  addCategory: (category: Category) => boolean;
  addProduct: (product: Product) => boolean;
  updateProduct: (product: Product) => boolean;
  toggleProductStock: (id: string) => boolean;
  toggleCategoryVisibility: (id: string) => ToggleCategoryVisibilityResult;
}

const isCategoryVisible = (categories: Category[], categoryId: string) =>
  categories.find((category) => category.id === categoryId)?.isVisible !== false;

export const useMenuStore = create<MenuState>((set, get) => ({
  products: MOCK_PRODUCTS,
  categories: MOCK_CATEGORIES,
  selectedCategoryId: 'all',
  searchQuery: '',

  setSelectedCategoryId: (selectedCategoryId) => set({ selectedCategoryId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  addCategory: (category) => {
    const normalizedName = category.name.trim().toLocaleLowerCase('vi');
    const alreadyExists = get().categories.some(
      (item) => item.name.trim().toLocaleLowerCase('vi') === normalizedName,
    );
    if (alreadyExists) return false;

    set((state) => ({ categories: [...state.categories, category] }));
    return true;
  },
  addProduct: (product) => {
    if (product.isAvailable && !isCategoryVisible(get().categories, product.categoryId)) return false;
    set((state) => ({ products: [product, ...state.products] }));
    return true;
  },
  updateProduct: (product) => {
    if (product.isAvailable && !isCategoryVisible(get().categories, product.categoryId)) return false;
    set((state) => ({
      products: state.products.map((item) => (item.id === product.id ? product : item)),
    }));
    return true;
  },

  toggleProductStock: (id) => {
    const product = get().products.find((item) => item.id === id);
    if (!product) return false;
    if (!product.isAvailable && !isCategoryVisible(get().categories, product.categoryId)) return false;

    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)),
    }));
    return true;
  },

  toggleCategoryVisibility: (id) => {
    const state = get();
    const category = state.categories.find((item) => item.id === id);
    if (!category || id === 'all') {
      return { success: false, isVisible: true, activeProductCount: 0 };
    }

    const activeProductCount = state.products.filter(
      (product) => product.categoryId === id && product.isAvailable,
    ).length;

    if (category.isVisible && activeProductCount > 0) {
      return { success: false, isVisible: true, activeProductCount };
    }

    const isVisible = !category.isVisible;
    set((currentState) => ({
      categories: currentState.categories.map((item) =>
        item.id === id ? { ...item, isVisible } : item,
      ),
    }));

    return { success: true, isVisible, activeProductCount: 0 };
  },
}));
