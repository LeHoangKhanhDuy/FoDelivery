import { Controller, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form';
import { Tag } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import type { Category } from '@/types';
import type { CreateProductFormValues } from '@/modules/product/types/index';
import { ProductFormDropdown } from "@/modules/product/components/ProductFormDropdown";
import { ProductFormLabel } from "@/modules/product/components/ProductFormLabel";

interface ProductGeneralFieldsProps {
  categories: Category[];
  control: Control<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
  register: UseFormRegister<CreateProductFormValues>;
}

export const ProductGeneralFields = ({
  categories,
  control,
  errors,
  register,
}: ProductGeneralFieldsProps) => {
  const options = categories
    .filter((category) => category.id !== 'all')
    .map((category) => ({ value: category.id, label: category.name }));

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <ProductFormLabel htmlFor="product-name" required>Tên món</ProductFormLabel>
        <Input
          id="product-name"
          placeholder="Ví dụ: Cơm gà xối mỡ"
          leftIcon={<Tag className="h-4 w-4" />}
          error={errors.name?.message}
          {...register('name', {
            required: 'Vui lòng nhập tên món',
            minLength: { value: 2, message: 'Tên món phải có ít nhất 2 ký tự' },
            maxLength: { value: 100, message: 'Tên món không được vượt quá 100 ký tự' },
          })}
        />
      </div>

      <div className="space-y-1.5">
        <ProductFormLabel htmlFor="product-category" required>Danh mục</ProductFormLabel>
        <Controller
          control={control}
          name="categoryId"
          rules={{ required: 'Vui lòng chọn danh mục' }}
          render={({ field }) => (
            <ProductFormDropdown
              ariaLabel="Chọn danh mục"
              value={field.value}
              placeholder="Chọn danh mục"
              options={options}
              error={errors.categoryId?.message}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
};
