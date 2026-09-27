import { useMemo, useState } from 'react';
import { useMenuStore } from '@/stores/useMenuStore';
import type { CategorySortOption } from '@/modules/category/types';
import { filterCategories } from '@/modules/category/utils/filterCategories';

export const useCategoryCatalog = () => {
  const { categories, products, addCategory, toggleCategoryVisibility } = useMenuStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<CategorySortOption>('display-order');

  const managedCategories = useMemo(
    () =>
      categories
        .filter((category) => category.id !== 'all')
        .map((category) => ({
          ...category,
          itemCount: products.filter((product) => product.categoryId === category.id).length,
        })),
    [categories, products],
  );

  const visibleCategories = useMemo(
    () => filterCategories({ categories: managedCategories, searchQuery, sortBy }),
    [managedCategories, searchQuery, sortBy],
  );
  const nextSortOrder = useMemo(
    () => Math.max(0, ...managedCategories.map((category) => category.sortOrder)) + 1,
    [managedCategories],
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('display-order');
  };

  return {
    visibleCategories,
    nextSortOrder,
    searchQuery,
    sortBy,
    setSearchQuery,
    setSortBy,
    addCategory,
    toggleCategoryVisibility,
    resetFilters,
  };
};
