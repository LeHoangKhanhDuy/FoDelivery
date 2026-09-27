import type { CategorySortOption } from '@/modules/category/types';

export const CATEGORY_SORT_OPTIONS: ReadonlyArray<{
  value: CategorySortOption;
  label: string;
}> = [
  { value: "display-order", label: "Sắp xếp tăng dần" },
  { value: "item-count-desc", label: "Sắp xếp giảm dần" },
  { value: "name-asc", label: "Tên danh mục (A - Z)" },
];
