import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { CreateProductFormValues } from '@/modules/product/types/index';
import { ProductFormLabel } from '@/modules/product/components/ProductFormLabel';

interface ProductDescriptionFieldProps {
  errors: FieldErrors<CreateProductFormValues>;
  register: UseFormRegister<CreateProductFormValues>;
}

export const ProductDescriptionField = ({ errors, register }: ProductDescriptionFieldProps) => (
  <div className="space-y-1.5">
    <ProductFormLabel htmlFor="product-description" required>Mô tả</ProductFormLabel>
    <textarea
      id="product-description"
      rows={3}
      placeholder="Mô tả thành phần, hương vị hoặc cách phục vụ..."
      className={`w-full resize-none rounded-xl border bg-white px-3.5 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
        errors.description
          ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
          : 'border-slate-200 focus:border-[#F97316] focus:ring-orange-500/20'
      }`}
      {...register('description', {
        required: 'Vui lòng nhập mô tả món',
        minLength: { value: 10, message: 'Mô tả phải có ít nhất 10 ký tự' },
        maxLength: { value: 300, message: 'Mô tả không được vượt quá 300 ký tự' },
      })}
    />
    {errors.description && (
      <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
    )}
  </div>
);
