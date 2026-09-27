import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Product } from '@/types';
import { AddProductModal } from '@/modules/product/pages/AddProductModal';
import { ProductCatalog } from "@/modules/product/components/ProductCatalog";
import { ProductFilters } from "@/modules/product/components/ProductFilters";
import { useProductCatalog } from "@/modules/product/hooks/useProductCatalog";
import type { CreateProductFormValues } from "@/modules/product/types/index";

export const ProductManagementPage = () => {
  const catalog = useProductCatalog();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleToggleAvailability = (product: Product) => {
    catalog.toggleProductStock(product.id);
    toast.success(
      product.isAvailable
        ? `Đã chuyển “${product.name}” sang hết hàng`
        : `Đã mở bán lại “${product.name}”`,
    );
  };

  const handleCreateProduct = (values: CreateProductFormValues) => {
    const category = catalog.categories.find((item) => item.id === values.categoryId);
    if (!category) {
      toast.error('Không tìm thấy danh mục đã chọn');
      return;
    }

    const { status, ...productValues } = values;
    catalog.addProduct({
      ...productValues,
      id: `product-${crypto.randomUUID()}`,
      categoryName: category.name,
      isAvailable: status === 'active',
      rating: 5,
      orderCount: 0,
    });
    setIsAddProductOpen(false);
    toast.success(`Đã thêm “${values.name}” vào thực đơn`);
  };

  return (
    <div className="animate-in space-y-4 fade-in duration-300">
      <ProductFilters
        categories={catalog.categories}
        searchQuery={catalog.searchQuery}
        selectedCategoryId={catalog.selectedCategoryId}
        availability={catalog.availability}
        sortBy={catalog.sortBy}
        viewMode={catalog.viewMode}
        onSearchChange={catalog.setSearchQuery}
        onCategoryChange={catalog.setSelectedCategoryId}
        onAvailabilityChange={catalog.setAvailability}
        onSortChange={catalog.setSortBy}
        onViewModeChange={catalog.setViewMode}
        onCreateProduct={() => setIsAddProductOpen(true)}
      />
      <ProductCatalog
        products={catalog.visibleProducts}
        viewMode={catalog.viewMode}
        onToggleAvailability={handleToggleAvailability}
        onOpenActions={(product) => toast(`Mở thao tác cho ${product.name}`)}
        onResetFilters={catalog.resetFilters}
      />
      <AddProductModal
        isOpen={isAddProductOpen}
        categories={catalog.categories}
        onClose={() => setIsAddProductOpen(false)}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};
