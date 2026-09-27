import { Controller, type Control, type FieldErrors, type UseFormGetValues } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import type { CreateProductFormValues } from "@/modules/product/types/index";
import { ProductFormLabel } from "@/modules/product/components/ProductFormLabel";
import {
  formatVietnameseCurrencyInput,
  parseVietnameseCurrencyInput,
} from '@/utils/vietnameseCurrencyInput';

interface ProductPricingFieldsProps {
  control: Control<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
  getValues: UseFormGetValues<CreateProductFormValues>;
}

export const ProductPricingFields = ({ control, errors, getValues }: ProductPricingFieldsProps) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-1.5">
      <ProductFormLabel htmlFor="product-price" required>Giá bán</ProductFormLabel>
      <Controller
        control={control}
        name="price"
        rules={{
          validate: (value) => value >= 1000 || 'Giá bán phải từ 1.000 VNĐ',
        }}
        render={({ field }) => (
          <Input
            id="product-price"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={formatVietnameseCurrencyInput(field.value)}
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(parseVietnameseCurrencyInput(event.target.value))}
            rightIcon={<span className="text-[10px] font-bold text-slate-500">VNĐ</span>}
            error={errors.price?.message}
          />
        )}
      />
    </div>

    <div className="space-y-1.5">
      <ProductFormLabel htmlFor="product-original-price">Giá gốc</ProductFormLabel>
      <Controller
        control={control}
        name="originalPrice"
        rules={{
          validate: (value) =>
            value === undefined ||
            value >= getValues('price') ||
            'Giá gốc phải lớn hơn hoặc bằng giá bán',
        }}
        render={({ field }) => (
          <Input
            id="product-original-price"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Không bắt buộc"
            value={formatVietnameseCurrencyInput(field.value)}
            onBlur={field.onBlur}
            onChange={(event) => {
              const value = parseVietnameseCurrencyInput(event.target.value);
              field.onChange(value || undefined);
            }}
            rightIcon={<span className="text-[10px] font-bold text-slate-500">VNĐ</span>}
            error={errors.originalPrice?.message}
          />
        )}
      />
    </div>
  </div>
);
