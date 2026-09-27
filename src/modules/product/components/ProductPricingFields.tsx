import type { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import type { CreateProductFormValues } from "@/modules/product/types/index";
import { ProductFormLabel } from "@/modules/product/components/ProductFormLabel";

interface ProductPricingFieldsProps {
  errors: FieldErrors<CreateProductFormValues>;
  getValues: UseFormGetValues<CreateProductFormValues>;
  register: UseFormRegister<CreateProductFormValues>;
}

export const ProductPricingFields = ({ errors, getValues, register }: ProductPricingFieldsProps) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-1.5">
      <ProductFormLabel htmlFor="product-price" required>Giá bán</ProductFormLabel>
      <Input
        id="product-price"
        type="number"
        min="1000"
        step="1000"
        placeholder="0"
        error={errors.price?.message}
        {...register('price', {
          valueAsNumber: true,
          required: 'Vui lòng nhập giá bán',
          min: { value: 1000, message: 'Giá bán phải từ 1.000 VNĐ' },
        })}
      />
    </div>

    <div className="space-y-1.5">
      <ProductFormLabel htmlFor="product-original-price">Giá gốc</ProductFormLabel>
      <Input
        id="product-original-price"
        type="number"
        min="1000"
        step="1000"
        placeholder="Không bắt buộc"
        error={errors.originalPrice?.message}
        {...register('originalPrice', {
          setValueAs: (value) => (value === '' ? undefined : Number(value)),
          validate: (value) =>
            value === undefined ||
            value >= getValues('price') ||
            'Giá gốc phải lớn hơn hoặc bằng giá bán',
        })}
      />
    </div>
  </div>
);
