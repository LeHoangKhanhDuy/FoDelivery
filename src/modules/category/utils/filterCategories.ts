import type { Category } from '@/types';
import type { CategorySortOption } from '@/modules/category/types';

interface FilterCategoriesParams {
  categories: Category[];
  searchQuery: string;
  sortBy: CategorySortOption;
}

const normalizeSearchValue = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase('vi');

export const filterCategories = ({
  categories,
  searchQuery,
  sortBy,
}: FilterCategoriesParams): Category[] => {
  const normalizedQuery = normalizeSearchValue(searchQuery.trim());
  const filteredCategories = categories.filter((category) =>
    normalizeSearchValue(`${category.name} ${category.description}`).includes(normalizedQuery),
  );

  return [...filteredCategories].sort((firstCategory, secondCategory) => {
    switch (sortBy) {
      case 'name-asc':
        return firstCategory.name.localeCompare(secondCategory.name, 'vi');
      case 'item-count-desc':
        return secondCategory.itemCount - firstCategory.itemCount;
      case 'display-order':
      default:
        return firstCategory.sortOrder - secondCategory.sortOrder;
    }
  });
};
