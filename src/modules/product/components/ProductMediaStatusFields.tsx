import type { ChangeEvent } from 'react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { ImageIcon, Upload } from 'lucide-react';
import type { CreateProductFormValues, ProductActivityStatus } from '@/modules/product/types/index';
import { ProductFormDropdown } from '@/modules/product/components/ProductFormDropdown';
import { ProductFormLabel } from '@/modules/product/components/ProductFormLabel';

interface ProductMediaStatusFieldsProps {
  control: Control<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
  imageFileName: string;
  imagePreview: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Đang hoạt động' },
  { value: 'inactive', label: 'Ngừng hoạt động' },
] satisfies Array<{ value: ProductActivityStatus; label: string }>;

export const ProductMediaStatusFields = ({
  control,
  errors,
  imageFileName,
  imagePreview,
  onImageChange,
}: ProductMediaStatusFieldsProps) => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-1.5">
      <ProductFormLabel htmlFor="product-image" required>Hình ảnh sản phẩm</ProductFormLabel>
      <label
        htmlFor="product-image"
        className={`flex h-20 cursor-pointer items-center gap-3 rounded-xl border bg-white p-2.5 transition hover:bg-slate-50 ${
          errors.image ? 'border-red-400' : 'border-slate-200'
        }`}
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
          {imagePreview ? (
            <img src={imagePreview} alt="Xem trước sản phẩm" className="h-full w-full object-contain" />
          ) : (
            <ImageIcon className="h-6 w-6 text-slate-300" aria-hidden="true" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <Upload className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
            Chọn ảnh
          </span>
          <span className="mt-1 block truncate text-xs text-slate-400">
            {imageFileName || 'PNG, JPG hoặc WebP, tối đa 5 MB'}
          </span>
        </span>
      </label>
      <input
        id="product-image"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={onImageChange}
      />
      {errors.image && <p className="text-xs font-medium text-red-500">{errors.image.message}</p>}
    </div>

    <div className="space-y-1.5">
      <ProductFormLabel htmlFor="product-status" required>Trạng thái bán hàng</ProductFormLabel>
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <ProductFormDropdown
            ariaLabel="Chọn trạng thái bán hàng"
            value={field.value}
            placeholder="Chọn trạng thái"
            options={STATUS_OPTIONS}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  </div>
);
