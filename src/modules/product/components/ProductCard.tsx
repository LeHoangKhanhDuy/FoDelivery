import { EllipsisVertical, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { Card } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import type { Product } from '@/types';
import { formatVND } from '@/utils/shippingCalculator';
import type { ProductViewMode } from '@/modules/product/types/index';

interface ProductCardProps {
  product: Product;
  viewMode: ProductViewMode;
  onToggleAvailability: (product: Product) => void;
  onOpenActions: (product: Product) => void;
}

const ProductAvailabilityBadge = ({ isAvailable }: Pick<Product, 'isAvailable'>) => (
  <span className={clsx('inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold shadow-sm backdrop-blur-sm', isAvailable ? 'bg-emerald-50/95 text-emerald-700' : 'bg-rose-50/95 text-rose-700')}>
    <span className={clsx('h-1.5 w-1.5 rounded-full', isAvailable ? 'bg-emerald-500' : 'bg-rose-500')} aria-hidden="true" />
    {isAvailable ? 'Còn hàng' : 'Hết hàng'}
  </span>
);

export const ProductCard = ({ product, viewMode, onToggleAvailability, onOpenActions }: ProductCardProps) => {
  const isListView = viewMode === 'list';

  return (
    <Card padded={false} className={clsx('group relative isolate z-0 border border-slate-100/80 shadow-sm shadow-slate-200/40 cursor-pointer', isListView ? 'grid min-h-44 grid-cols-1 sm:grid-cols-[240px_1fr]' : 'flex h-full flex-col')}>
      <div className={clsx('relative overflow-hidden bg-slate-100 ', isListView ? 'min-h-44' : 'aspect-[4/3]')}>
        <img
          src={product.image}
          alt={product.name}
          width="640"
          height="480"
          loading="lazy"
          decoding="async"
          className="relative z-10 h-full w-full bg-slate-50 object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3 z-20"><ProductAvailabilityBadge isAvailable={product.isAvailable} /></div>
        <button type="button" aria-label={`Mở thao tác cho ${product.name}`} onClick={() => onOpenActions(product)} className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-slate-700 shadow-md transition hover:bg-white hover:text-orange-600 cursor-pointer">
          <EllipsisVertical className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">{product.categoryName}</p>
        <h2 className="mt-0.5 line-clamp-1 text-sm font-extrabold text-slate-900 ">{product.name}</h2>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 ">{product.description}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-[#F97316]">{formatVND(product.price)}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-slate-500 ">
              <Star className="h-3 w-3 fill-orange-500 text-orange-500" aria-hidden="true" />
              <span>{product.rating}</span>
              <span>({product.orderCount.toLocaleString('vi-VN')} đã bán)</span>
            </p>
          </div>
          <Switch checked={product.isAvailable} onChange={() => onToggleAvailability(product)} />
        </div>
      </div>
    </Card>
  );
};
