import type { Product } from '@/types';
import { ALL_CATEGORY_ID } from '../constants';
import type { ProductAvailabilityFilter, ProductSortOption } from '../types';

interface FilterProductsParams {
  products: Product[];
  categoryId: string;
  searchQuery: string;
  availability: ProductAvailabilityFilter;
  sortBy: ProductSortOption;
}

const normalizeSearchValue = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase('vi');

export const filterProducts = ({
  products,
  categoryId,
  searchQuery,
  availability,
  sortBy,
}: FilterProductsParams): Product[] => {
  const normalizedQuery = normalizeSearchValue(searchQuery.trim());

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryId === ALL_CATEGORY_ID || product.categoryId === categoryId;
    const matchesAvailability =
      availability === 'all' ||
      (availability === 'available' ? product.isAvailable : !product.isAvailable);
    const searchableContent = normalizeSearchValue(
      `${product.name} ${product.categoryName} ${product.description}`
    );

    return matchesCategory && matchesAvailability && searchableContent.includes(normalizedQuery);
  });

  return [...filteredProducts].sort((firstProduct, secondProduct) => {
    switch (sortBy) {
      case 'popular':
        return secondProduct.orderCount - firstProduct.orderCount;
      case 'name-asc':
        return firstProduct.name.localeCompare(secondProduct.name, 'vi');
      case 'price-asc':
        return firstProduct.price - secondProduct.price;
      case 'price-desc':
        return secondProduct.price - firstProduct.price;
      case 'newest':
      default:
        return 0;
    }
  });
};
