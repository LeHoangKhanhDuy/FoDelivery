import type { ChangeEvent } from 'react';
import { ImageIcon, Trash2, Upload } from 'lucide-react';

interface CategoryImageFieldProps {
  fileName: string;
  preview: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export const CategoryImageField = ({
  fileName,
  preview,
  error,
  onChange,
  onRemove,
}: CategoryImageFieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor="category-image" className="text-sm font-semibold text-slate-700">
      Hình ảnh danh mục <span className="text-red-500">*</span>
    </label>
    <div className={`relative h-24 rounded-lg border bg-white ${error ? 'border-red-400' : 'border-slate-200'}`}>
      <label
        htmlFor="category-image"
        className="flex h-full cursor-pointer items-center gap-3 rounded-lg p-3 pr-11 transition hover:bg-slate-50"
      >
        <span className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
          {preview ? (
            <img src={preview} alt="Xem trước danh mục" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-6 w-6 text-slate-300" aria-hidden="true" />
          )}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <Upload className="h-4 w-4 text-orange-500" aria-hidden="true" />
            {preview ? 'Đổi hình ảnh' : 'Tải hình ảnh lên'}
          </span>
          <span className="mt-1 block truncate text-xs text-slate-400">
            {fileName || 'PNG, JPG hoặc WebP, tối đa 5 MB'}
          </span>
        </span>
      </label>
      {preview && (
        <button
          type="button"
          aria-label="Xóa hình ảnh danh mục"
          onClick={onRemove}
          className="absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
    <input
      id="category-image"
      type="file"
      accept="image/png,image/jpeg,image/webp"
      className="sr-only"
      onChange={onChange}
    />
    {error && <p className="text-xs font-medium text-red-500">{error}</p>}
  </div>
);
