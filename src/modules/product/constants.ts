import type { ProductAvailabilityFilter, ProductSortOption } from './types';

export const ALL_CATEGORY_ID = 'all';

export const PRODUCT_STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'available', label: 'Còn hàng' },
  { value: 'unavailable', label: 'Hết hàng' },
] satisfies Array<{ value: ProductAvailabilityFilter; label: string }>;

export const PRODUCT_SORT_OPTIONS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'popular', label: 'Bán chạy nhất' },
  { value: 'name-asc', label: 'Tên A - Z' },
  { value: 'price-asc', label: 'Giá thấp đến cao' },
  { value: 'price-desc', label: 'Giá cao đến thấp' },
] satisfies Array<{ value: ProductSortOption; label: string }>;
