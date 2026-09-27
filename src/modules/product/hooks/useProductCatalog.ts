import { useMemo, useState } from 'react';
import { useMenuStore } from '@/stores/useMenuStore';
import type { ProductAvailabilityFilter, ProductSortOption, ProductViewMode } from '@/modules/product/types/index';
import { filterProducts } from '@/modules/product/utils/filterProducts';

export const useProductCatalog = () => {
  const {
    products,
    categories,
    selectedCategoryId,
    searchQuery,
    setSelectedCategoryId,
    setSearchQuery,
    addProduct,
    updateProduct,
    toggleProductStock,
  } = useMenuStore();
  const [availability, setAvailability] = useState<ProductAvailabilityFilter>('all');
  const [sortBy, setSortBy] = useState<ProductSortOption>('newest');
  const [viewMode, setViewMode] = useState<ProductViewMode>('grid');

  const visibleProducts = useMemo(
    () =>
      filterProducts({
        products,
        categoryId: selectedCategoryId,
        searchQuery,
        availability,
        sortBy,
      }),
    [availability, products, searchQuery, selectedCategoryId, sortBy]
  );

  const resetFilters = () => {
    setSelectedCategoryId('all');
    setSearchQuery('');
    setAvailability('all');
    setSortBy('newest');
  };

  return {
    categories,
    visibleProducts,
    selectedCategoryId,
    searchQuery,
    availability,
    sortBy,
    viewMode,
    setSelectedCategoryId,
    setSearchQuery,
    setAvailability,
    setSortBy,
    setViewMode,
    addProduct,
    updateProduct,
    toggleProductStock,
    resetFilters,
  };
};
