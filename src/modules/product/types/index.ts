export type ProductAvailabilityFilter = 'all' | 'available' | 'unavailable';

export type ProductSortOption = 'newest' | 'name-asc' | 'price-asc' | 'price-desc' | 'popular';

export type ProductViewMode = 'grid' | 'list';

export type ProductActivityStatus = 'active' | 'inactive';

export interface CreateProductFormValues {
  name: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  status: ProductActivityStatus;
}
