import { ChevronDown, Grid2X2, List, Plus, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import type { Category } from '@/types';
import { PRODUCT_SORT_OPTIONS, PRODUCT_STATUS_OPTIONS } from '@/modules/product/constants';
import type { ProductAvailabilityFilter, ProductSortOption, ProductViewMode } from '@/modules/product/types/index';

interface ProductFiltersProps {
  categories: Category[];
  searchQuery: string;
  selectedCategoryId: string;
  availability: ProductAvailabilityFilter;
  sortBy: ProductSortOption;
  viewMode: ProductViewMode;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAvailabilityChange: (value: ProductAvailabilityFilter) => void;
  onSortChange: (value: ProductSortOption) => void;
  onViewModeChange: (value: ProductViewMode) => void;
  onCreateProduct: () => void;
}

interface FilterOption<TValue extends string> {
  value: TValue;
  label: string;
}

interface FilterDropdownProps<TValue extends string> {
  ariaLabel: string;
  value: TValue;
  options: ReadonlyArray<FilterOption<TValue>>;
  onChange: (value: TValue) => void;
}

const FilterDropdown = <TValue extends string>({
  ariaLabel,
  value,
  options,
  onChange,
}: FilterDropdownProps<TValue>) => {
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  return (
    <Dropdown
      align="start"
      width="100%"
      trigger={
        <button
          type="button"
          aria-label={ariaLabel}
          className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15 cursor-pointer"
        >
          <span className="truncate">{selectedOption?.label}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        </button>
      }
    >
      {options.map((option) => (
        <DropdownItem
          key={option.value}
          label={option.label}
          active={option.value === value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </Dropdown>
  );
};

export const ProductFilters = ({
  categories,
  searchQuery,
  selectedCategoryId,
  availability,
  sortBy,
  viewMode,
  onSearchChange,
  onCategoryChange,
  onAvailabilityChange,
  onSortChange,
  onViewModeChange,
  onCreateProduct,
}: ProductFiltersProps) => {
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.id === 'all' ? 'Tất cả danh mục' : category.name,
  }));

  return (
    <section
      aria-label="Bộ lọc thực đơn"
      className="grid gap-3 rounded-lg bg-white p-3 shadow-sm shadow-slate-200/40 md:grid-cols-2 xl:grid-cols-[minmax(240px,2fr)_repeat(3,minmax(130px,1fr))_92px_auto] xl:items-center"
    >
      <label className="relative block">
        <span className="sr-only">Tìm kiếm món ăn</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tìm món ăn theo tên, mô tả..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      <FilterDropdown
        ariaLabel="Lọc theo trạng thái"
        value={availability}
        options={PRODUCT_STATUS_OPTIONS}
        onChange={onAvailabilityChange}
      />
      <FilterDropdown
        ariaLabel="Lọc theo danh mục"
        value={selectedCategoryId}
        options={categoryOptions}
        onChange={onCategoryChange}
      />
      <FilterDropdown
        ariaLabel="Sắp xếp món ăn"
        value={sortBy}
        options={PRODUCT_SORT_OPTIONS}
        onChange={onSortChange}
      />

      <div className="flex h-10 overflow-hidden rounded-lg border border-slate-200 bg-white">
        {(['grid', 'list'] as const).map((mode) => {
          const Icon = mode === 'grid' ? Grid2X2 : List;
          const label = mode === 'grid' ? 'Xem dạng lưới' : 'Xem dạng danh sách';

          return (
            <button key={mode} type="button" aria-label={label} aria-pressed={viewMode === mode} onClick={() => onViewModeChange(mode)} className={clsx('flex flex-1 items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500/30  cursor-pointer', viewMode === mode ? 'bg-[#F97316] text-white' : 'text-slate-500 hover:bg-slate-50')}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        className="h-10 whitespace-nowrap"
        leftIcon={<Plus className="h-4 w-4" />}
        onClick={onCreateProduct}
      >
        Thêm thực đơn
      </Button>
    </section>
  );
};
