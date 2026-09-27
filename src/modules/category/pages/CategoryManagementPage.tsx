import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Category } from '@/types';
import { CategoryCatalog } from '@/modules/category/components/CategoryCatalog';
import { CategoryFilters } from '@/modules/category/components/CategoryFilters';
import { useCategoryCatalog } from '@/modules/category/hooks/useCategoryCatalog';
import { AddCategoryModal } from '@/modules/category/pages/AddCategoryModal';
import type { CreateCategoryFormValues } from '@/modules/category/types';

export const CategoryManagementPage = () => {
  const catalog = useCategoryCatalog();
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const handleToggleVisibility = (category: Category) => {
    const result = catalog.toggleCategoryVisibility(category.id);

    if (!result.success) {
      toast.error(
        `Không thể ẩn “${category.name}”. Hãy ẩn ${result.activeProductCount} sản phẩm đang hoạt động trong danh mục trước.`,
      );
      return;
    }

    toast.success(
      result.isVisible
        ? `Đã hiển thị danh mục “${category.name}”`
        : `Đã ẩn danh mục “${category.name}”`,
    );
  };

  const handleCreateCategory = (values: CreateCategoryFormValues) => {
    const wasAdded = catalog.addCategory({
      ...values,
      id: `category-${crypto.randomUUID()}`,
      icon: 'UtensilsCrossed',
      itemCount: 0,
      sortOrder: catalog.nextSortOrder,
      isVisible: true,
    });

    if (!wasAdded) {
      toast.error(`Danh mục “${values.name}” đã tồn tại`);
      return;
    }

    setIsAddCategoryOpen(false);
    toast.success(`Đã thêm danh mục “${values.name}”`);
  };

  return (
    <div className="animate-in space-y-4 fade-in duration-300">
      <CategoryFilters
        searchQuery={catalog.searchQuery}
        sortBy={catalog.sortBy}
        onSearchChange={catalog.setSearchQuery}
        onSortChange={catalog.setSortBy}
        onCreateCategory={() => setIsAddCategoryOpen(true)}
      />
      <CategoryCatalog
        categories={catalog.visibleCategories}
        onToggleVisibility={handleToggleVisibility}
        onResetFilters={catalog.resetFilters}
      />
      <AddCategoryModal
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
};
