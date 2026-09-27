import { PackagePlus, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { Category, Product } from '@/types';
import { ProductDescriptionField } from '@/modules/product/components/ProductDescriptionField';
import { ProductGeneralFields } from "@/modules/product/components/ProductGeneralFields";
import { ProductMediaStatusFields } from "@/modules/product/components/ProductMediaStatusFields";
import { ProductPricingFields } from "@/modules/product/components/ProductPricingFields";
import { useAddProductForm } from '@/modules/product/hooks/useAddProductForm';
import type { CreateProductFormValues } from '@/modules/product/types/index';

interface AddProductModalProps {
  isOpen: boolean;
  categories: Category[];
  product?: Product | null;
  onClose: () => void;
  onSubmit: (values: CreateProductFormValues) => void;
}

export const AddProductModal = ({
  isOpen,
  categories,
  product,
  onClose,
  onSubmit,
}: AddProductModalProps) => {
  const isEditMode = Boolean(product);
  const {
    form,
    imageFileName,
    imagePreview,
    handleImageChange,
    handleImageFile,
    removeImage,
    resetForm,
    validateImage,
  } = useAddProductForm(isOpen, product);
  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleValidSubmit = (values: CreateProductFormValues) => {
    if (!validateImage()) return;
    onSubmit(values);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Chi tiết sản phẩm' : 'Thêm thực đơn mới'}
      description={isEditMode ? 'Xem và cập nhật thông tin sản phẩm' : 'Tạo món mới và đưa vào danh sách bán hàng'}
      maxWidth="2xl"
      backdropBlur={false}
    >
      <form
        noValidate
        onSubmit={handleSubmit(handleValidSubmit)}
        className="max-h-[calc(100vh-10rem)] space-y-5 overflow-y-auto pr-1"
      >
        <ProductGeneralFields
          categories={categories}
          control={control}
          errors={errors}
          register={register}
        />
        <ProductPricingFields control={control} errors={errors} getValues={getValues} />
        <ProductMediaStatusFields
          control={control}
          errors={errors}
          imageFileName={imageFileName}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onImageSelect={handleImageFile}
          onRemoveImage={removeImage}
        />
        <ProductDescriptionField errors={errors} register={register} />

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={isEditMode ? <Save className="h-4 w-4" /> : <PackagePlus className="h-4 w-4" />}
          >
            {isEditMode ? 'Lưu thay đổi' : 'Thêm thực đơn'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
