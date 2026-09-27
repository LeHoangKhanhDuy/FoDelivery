import { FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { CategoryImageField } from '@/modules/category/components/CategoryImageField';
import { useAddCategoryForm } from '@/modules/category/hooks/useAddCategoryForm';
import type { CreateCategoryFormValues } from '@/modules/category/types';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateCategoryFormValues) => void;
}

export const AddCategoryModal = ({ isOpen, onClose, onSubmit }: AddCategoryModalProps) => {
  const { form, imageFileName, imagePreview, handleImageChange, removeImage, resetForm } =
    useAddCategoryForm(isOpen);
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleValidSubmit = (values: CreateCategoryFormValues) => {
    if (!getValues('image')) {
      setError('image', { message: 'Vui lòng tải lên hình ảnh danh mục' });
      return;
    }
    onSubmit(values);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Thêm danh mục"
      description="Tạo nhóm sản phẩm mới trong thực đơn"
      maxWidth="lg"
      backdropBlur={false}
    >
      <form noValidate onSubmit={handleSubmit(handleValidSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="category-name" className="text-sm font-semibold text-slate-700">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <Input
            id="category-name"
            placeholder="Ví dụ: Món tráng miệng"
            error={errors.name?.message}
            {...register('name', {
              required: 'Vui lòng nhập tên danh mục',
              minLength: { value: 2, message: 'Tên danh mục phải có ít nhất 2 ký tự' },
              maxLength: { value: 60, message: 'Tên danh mục không được vượt quá 60 ký tự' },
            })}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="category-description" className="text-sm font-semibold text-slate-700">
            Mô tả <span className="text-red-500">*</span>
          </label>
          <textarea
            id="category-description"
            rows={3}
            placeholder="Mô tả ngắn về các sản phẩm trong danh mục"
            className={`min-h-24 w-full resize-y rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/15 ${errors.description ? 'border-red-400' : 'border-slate-200'}`}
            {...register('description', {
              required: 'Vui lòng nhập mô tả danh mục',
              maxLength: { value: 180, message: 'Mô tả không được vượt quá 180 ký tự' },
            })}
          />
          {errors.description && (
            <p className="text-xs font-medium text-red-500">{errors.description.message}</p>
          )}
        </div>

        <CategoryImageField
          fileName={imageFileName}
          preview={imagePreview}
          error={errors.image?.message}
          onChange={handleImageChange}
          onRemove={removeImage}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<FolderPlus className="h-4 w-4" />}
          >
            Thêm danh mục
          </Button>
        </div>
      </form>
    </Modal>
  );
};
