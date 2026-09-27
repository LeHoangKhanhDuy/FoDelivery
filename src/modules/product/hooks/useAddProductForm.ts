import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateProductFormValues } from '@/modules/product/types/index';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const DEFAULT_VALUES: CreateProductFormValues = {
  name: '',
  categoryId: '',
  price: 0,
  originalPrice: undefined,
  image: '',
  description: '',
  status: 'active',
};

const readImageAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Không thể đọc hình ảnh'));
    reader.readAsDataURL(file);
  });

export const useAddProductForm = (isOpen: boolean) => {
  const [imageFileName, setImageFileName] = useState('');
  const form = useForm<CreateProductFormValues>({ defaultValues: DEFAULT_VALUES, mode: 'onTouched' });
  const { reset } = form;

  const resetForm = useCallback(() => {
    reset(DEFAULT_VALUES);
    setImageFileName('');
  }, [reset]);

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      form.setError('image', { message: 'Chỉ hỗ trợ ảnh PNG, JPG hoặc WebP' });
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      form.setError('image', { message: 'Kích thước ảnh không được vượt quá 5 MB' });
      return;
    }

    try {
      const imageDataUrl = await readImageAsDataUrl(file);
      form.setValue('image', imageDataUrl, { shouldDirty: true });
      form.clearErrors('image');
      setImageFileName(file.name);
    } catch {
      form.setError('image', { message: 'Không thể đọc hình ảnh đã chọn' });
    }
  };

  const validateImage = () => {
    if (form.getValues('image')) return true;
    form.setError('image', { message: 'Vui lòng tải lên hình ảnh sản phẩm' });
    return false;
  };

  return {
    form,
    imageFileName,
    imagePreview: form.watch('image'),
    handleImageChange,
    resetForm,
    validateImage,
  };
};
