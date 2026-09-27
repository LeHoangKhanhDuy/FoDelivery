import type { LucideIcon } from 'lucide-react';
import {
  CircleEllipsis,
  Coffee,
  CookingPot,
  GlassWater,
  Soup,
  UtensilsCrossed,
} from 'lucide-react';
import { clsx } from 'clsx';
import { Card } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  onToggleVisibility: (category: Category) => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  CircleEllipsis,
  Coffee,
  CookingPot,
  GlassWater,
  Soup,
  UtensilsCrossed,
};

const CATEGORY_ICON_COLORS: Record<string, string> = {
  'cat-rice': 'bg-orange-500',
  'cat-noodle': 'bg-rose-500',
  'cat-soup': 'bg-amber-500',
  'cat-side': 'bg-violet-500',
  'cat-milktea': 'bg-amber-700',
  'cat-juice': 'bg-emerald-500',
  'cat-other': 'bg-slate-600',
};

export const CategoryCard = ({
  category,
  onToggleVisibility,
}: CategoryCardProps) => {
  const Icon = CATEGORY_ICONS[category.icon] ?? UtensilsCrossed;

  return (
    <Card
      padded={false}
      className="flex h-full flex-col overflow-hidden border border-slate-100/80 shadow-sm shadow-slate-200/40"
    >
      <div className="relative h-48 shrink-0 bg-slate-100">
        <img
          src={category.image}
          alt={`Danh mục ${category.name}`}
          width="720"
          height="320"
          loading="lazy"
          decoding="async"
          className={clsx(
            'h-full w-full object-cover transition duration-300',
            !category.isVisible && 'grayscale opacity-60',
          )}
        />
        <span className="absolute left-3 top-3 flex h-7 min-w-7 items-center justify-center rounded-lg bg-white px-2 text-xs font-extrabold text-slate-700 shadow-md">
          {category.sortOrder}
        </span>
        <span
          className={clsx(
            'absolute -bottom-5 left-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-white shadow-md',
            CATEGORY_ICON_COLORS[category.id] ?? 'bg-orange-500',
          )}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-4 pb-4 pt-7">
        <h2 className="truncate text-sm font-extrabold text-slate-900">{category.name}</h2>
        <p className="mt-0.5 text-xs font-semibold text-slate-500">
          {category.itemCount.toLocaleString('vi-VN')} món ăn
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{category.description}</p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Switch
            checked={category.isVisible}
            onChange={() => onToggleVisibility(category)}
          />
          <span className="text-xs font-medium text-slate-500">
            {category.isVisible ? 'Hiển thị' : 'Đã ẩn'}
          </span>
        </div>
      </div>
    </Card>
  );
};
