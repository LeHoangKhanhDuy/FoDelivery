import toast from "react-hot-toast";
import type { Product } from "@/types";
import { ProductCatalog } from "../components/ProductCatalog";
import { ProductFilters } from "../components/ProductFilters";
import { useProductCatalog } from "../hooks/useProductCatalog";

export const ProductManagementPage = () => {
  const catalog = useProductCatalog();

  const handleToggleAvailability = (product: Product) => {
    catalog.toggleProductStock(product.id);
    toast.success(
      product.isAvailable
        ? `Đã chuyển “${product.name}” sang hết hàng`
        : `Đã mở bán lại “${product.name}”`,
    );
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
        onCreateProduct={() =>
          toast.success("Đã sẵn sàng mở biểu mẫu thêm thực đơn")
        }
      />
      <ProductCatalog
        products={catalog.visibleProducts}
        viewMode={catalog.viewMode}
        onToggleAvailability={handleToggleAvailability}
        onOpenActions={(product) => toast(`Mở thao tác cho ${product.name}`)}
        onResetFilters={catalog.resetFilters}
      />
    </div>
  );
};
