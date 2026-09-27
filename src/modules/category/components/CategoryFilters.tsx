import { ChevronDown, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';
import { CATEGORY_SORT_OPTIONS } from '@/modules/category/constants';
import type { CategorySortOption } from '@/modules/category/types';

interface CategoryFiltersProps {
  searchQuery: string;
  sortBy: CategorySortOption;
  onSearchChange: (value: string) => void;
  onSortChange: (value: CategorySortOption) => void;
  onCreateCategory: () => void;
}

export const CategoryFilters = ({
  searchQuery,
  sortBy,
  onSearchChange,
  onSortChange,
  onCreateCategory,
}: CategoryFiltersProps) => {
  const selectedSort = CATEGORY_SORT_OPTIONS.find((option) => option.value === sortBy);

  return (
    <section
      aria-label="Bộ lọc danh mục"
      className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow-sm shadow-slate-200/40 xl:flex-row xl:items-center"
    >
      <label className="relative block w-full xl:max-w-[520px] xl:flex-1">
        <span className="sr-only">Tìm kiếm danh mục</span>
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Tìm danh mục theo tên, mô tả..."
          className="h-10 w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
        />
      </label>

      <div className="grid w-full gap-3 sm:grid-cols-[minmax(220px,260px)_auto] xl:ml-auto xl:w-auto">
        <Dropdown
          align="start"
          width="100%"
          trigger={
            <button
              type="button"
              aria-label="Sắp xếp danh mục"
              className="flex h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15"
            >
              <span className="truncate">{selectedSort?.label}</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            </button>
          }
        >
          {CATEGORY_SORT_OPTIONS.map((option) => (
            <DropdownItem
              key={option.value}
              label={option.label}
              active={option.value === sortBy}
              onClick={() => onSortChange(option.value)}
            />
          ))}
        </Dropdown>

        <Button
          type="button"
          className="h-10 whitespace-nowrap"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={onCreateCategory}
        >
          Thêm danh mục
        </Button>
      </div>
    </section>
  );
};
