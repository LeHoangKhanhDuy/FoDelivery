import { EmptyState } from '@/components/common/EmptyState';
import type { Category } from '@/types';
import { CategoryCard } from '@/modules/category/components/CategoryCard';

interface CategoryCatalogProps {
  categories: Category[];
  onToggleVisibility: (category: Category) => void;
  onResetFilters: () => void;
}

export const CategoryCatalog = ({
  categories,
  onToggleVisibility,
  onResetFilters,
}: CategoryCatalogProps) => {
  if (categories.length === 0) {
    return (
      <EmptyState
        title="Không tìm thấy danh mục"
        description="Hãy thử thay đổi từ khóa hoặc cách sắp xếp để xem lại danh mục."
        actionLabel="Xóa bộ lọc"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <section
      aria-label="Danh sách danh mục sản phẩm"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onToggleVisibility={onToggleVisibility}
        />
      ))}
    </section>
  );
};
