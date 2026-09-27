import { useState, type ChangeEvent, type DragEvent } from 'react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { ImageIcon, Trash2, Upload } from 'lucide-react';
import { clsx } from 'clsx';
import type { CreateProductFormValues, ProductActivityStatus } from '@/modules/product/types/index';
import { ProductFormDropdown } from '@/modules/product/components/ProductFormDropdown';
import { ProductFormLabel } from '@/modules/product/components/ProductFormLabel';

interface ProductMediaStatusFieldsProps {
  control: Control<CreateProductFormValues>;
  errors: FieldErrors<CreateProductFormValues>;
  imageFileName: string;
  imagePreview: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (file: File) => void;
  onRemoveImage: () => void;
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
  onImageSelect,
  onRemoveImage,
}: ProductMediaStatusFieldsProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) onImageSelect(file);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
    <div className="space-y-1.5">
      <ProductFormLabel htmlFor="product-image" required>Hình ảnh sản phẩm</ProductFormLabel>
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={clsx(
          'relative h-20 rounded-lg border bg-white transition',
          isDragging && 'border-orange-400 bg-orange-50 ring-2 ring-orange-100',
          !isDragging && (errors.image ? 'border-red-400' : 'border-slate-200')
        )}
      >
        <label htmlFor="product-image" className="flex h-full cursor-pointer items-center gap-3 p-2.5 pr-10 hover:bg-slate-50">
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
              {imagePreview ? 'Đổi ảnh' : 'Chọn hoặc kéo thả ảnh'}
            </span>
            <span className="mt-1 block truncate text-xs text-slate-400">
              {imageFileName || 'PNG, JPG hoặc WebP, tối đa 5 MB'}
            </span>
          </span>
        </label>
        {imagePreview && (
          <button
            type="button"
            aria-label="Xóa ảnh đã tải lên"
            title="Xóa ảnh"
            onClick={onRemoveImage}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-200 transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
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
};
