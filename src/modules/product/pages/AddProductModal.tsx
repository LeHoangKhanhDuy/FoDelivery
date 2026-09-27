import { PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { Category } from '@/types';
import { ProductDescriptionField } from '@/modules/product/components/ProductDescriptionField';
import { ProductGeneralFields } from "@/modules/product/components/ProductGeneralFields";
import { ProductMediaStatusFields } from "@/modules/product/components/ProductMediaStatusFields";
import { ProductPricingFields } from "@/modules/product/components/ProductPricingFields";
import { useAddProductForm } from '@/modules/product/hooks/useAddProductForm';
import type { CreateProductFormValues } from '@/modules/product/types/index';

interface AddProductModalProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  onSubmit: (values: CreateProductFormValues) => void;
}

export const AddProductModal = ({
  isOpen,
  categories,
  onClose,
  onSubmit,
}: AddProductModalProps) => {
  const {
    form,
    imageFileName,
    imagePreview,
    handleImageChange,
    resetForm,
    validateImage,
  } = useAddProductForm(isOpen);
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
      title="Thêm thực đơn"
      description="Tạo món mới và đưa vào danh sách bán hàng."
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
        <ProductPricingFields errors={errors} getValues={getValues} register={register} />
        <ProductMediaStatusFields
          control={control}
          errors={errors}
          imageFileName={imageFileName}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
        />
        <ProductDescriptionField errors={errors} register={register} />

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<PackagePlus className="h-4 w-4" />}
          >
            Thêm thực đơn
          </Button>
        </div>
      </form>
    </Modal>
  );
};
