import { EmptyState } from '@/components/common/EmptyState';
import type { Product } from '@/types';
import type { ProductViewMode } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  viewMode: ProductViewMode;
  onToggleAvailability: (product: Product) => void;
  onOpenActions: (product: Product) => void;
  onResetFilters: () => void;
}

export const ProductCatalog = ({ products, viewMode, onToggleAvailability, onOpenActions, onResetFilters }: ProductCatalogProps) => {
  if (products.length === 0) {
    return <EmptyState title="Không tìm thấy món ăn" description="Hãy thử thay đổi từ khóa hoặc bộ lọc để xem thêm món trong thực đơn." actionLabel="Xóa bộ lọc" onAction={onResetFilters} />;
  }

  return (
    <section aria-label="Danh sách món ăn" className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'grid grid-cols-1 gap-4 xl:grid-cols-2'}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} onToggleAvailability={onToggleAvailability} onOpenActions={onOpenActions} />
      ))}
    </section>
  );
};
