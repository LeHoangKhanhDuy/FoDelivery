import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { Dropdown, DropdownItem } from '@/components/ui/dropdown';

export interface ProductFormDropdownOption<TValue extends string = string> {
  value: TValue;
  label: string;
}

interface ProductFormDropdownProps<TValue extends string> {
  ariaLabel: string;
  value: TValue;
  placeholder: string;
  options: ReadonlyArray<ProductFormDropdownOption<TValue>>;
  error?: string;
  onChange: (value: TValue) => void;
}

export const ProductFormDropdown = <TValue extends string>({
  ariaLabel,
  value,
  placeholder,
  options,
  error,
  onChange,
}: ProductFormDropdownProps<TValue>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="space-y-1.5">
      <Dropdown
        align="start"
        width="100%"
        trigger={
          <button
            type="button"
            aria-label={ariaLabel}
            aria-invalid={Boolean(error)}
            className={clsx(
              'flex h-10 w-full items-center justify-between gap-3 rounded-lg border bg-white px-3.5 text-left text-sm outline-none transition focus:ring-2 cursor-pointer',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-[#F97316] focus:ring-orange-500/20',
              selectedOption ? 'text-slate-900' : 'text-slate-400'
            )}
          >
            <span className="truncate">{selectedOption?.label ?? placeholder}</span>
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
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};
