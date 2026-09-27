export type CategorySortOption = 'display-order' | 'name-asc' | 'item-count-desc';

export interface CreateCategoryFormValues {
  name: string;
  description: string;
  image: string;
}

export interface ToggleCategoryVisibilityResult {
  success: boolean;
  isVisible: boolean;
  activeProductCount: number;
}
