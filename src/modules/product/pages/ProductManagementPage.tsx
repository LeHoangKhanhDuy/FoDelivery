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
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleToggleAvailability = (product: Product) => {
    const wasUpdated = catalog.toggleProductStock(product.id);
    if (!wasUpdated) {
      toast.error(`Không thể mở bán “${product.name}” vì danh mục đang bị ẩn`);
      return;
    }
    toast.success(
      product.isAvailable
        ? `Đã chuyển “${product.name}” sang hết hàng`
        : `Đã mở bán lại “${product.name}”`,
    );
  };

  const handleSaveProduct = (values: CreateProductFormValues) => {
    const category = catalog.categories.find((item) => item.id === values.categoryId);
    if (!category) {
      toast.error('Không tìm thấy danh mục đã chọn');
      return;
    }

    const { status, ...productValues } = values;
    if (selectedProduct) {
      const wasUpdated = catalog.updateProduct({
        ...selectedProduct,
        ...productValues,
        categoryName: category.name,
        isAvailable: status === 'active',
      });
      if (!wasUpdated) {
        toast.error(`Không thể mở bán sản phẩm vì danh mục “${category.name}” đang bị ẩn`);
        return;
      }
      setIsProductModalOpen(false);
      setSelectedProduct(null);
      toast.success(`Đã cập nhật “${values.name}”`);
      return;
    }

    const wasAdded = catalog.addProduct({
      ...productValues,
      id: `product-${crypto.randomUUID()}`,
      categoryName: category.name,
      isAvailable: status === 'active',
      rating: 5,
      orderCount: 0,
    });
    if (!wasAdded) {
      toast.error(`Không thể mở bán sản phẩm vì danh mục “${category.name}” đang bị ẩn`);
      return;
    }
    setIsProductModalOpen(false);
    toast.success(`Đã thêm “${values.name}” vào thực đơn`);
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
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
        onCreateProduct={handleCreateProduct}
      />
      <ProductCatalog
        products={catalog.visibleProducts}
        viewMode={catalog.viewMode}
        onToggleAvailability={handleToggleAvailability}
        onSelectProduct={handleSelectProduct}
        onResetFilters={catalog.resetFilters}
      />
      <AddProductModal
        isOpen={isProductModalOpen}
        categories={catalog.categories}
        product={selectedProduct}
        onClose={handleCloseProductModal}
        onSubmit={handleSaveProduct}
      />
    </div>
  );
};
