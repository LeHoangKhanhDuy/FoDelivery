import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateCategoryFormValues } from '@/modules/category/types';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const DEFAULT_VALUES: CreateCategoryFormValues = {
  name: '',
  description: '',
  image: '',
};

const readImageAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Không thể đọc hình ảnh'));
    reader.readAsDataURL(file);
  });

export const useAddCategoryForm = (isOpen: boolean) => {
  const [imageFileName, setImageFileName] = useState('');
  const form = useForm<CreateCategoryFormValues>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });
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
    event.target.value = '';
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
      const image = await readImageAsDataUrl(file);
      form.setValue('image', image, { shouldDirty: true });
      form.clearErrors('image');
      setImageFileName(file.name);
    } catch {
      form.setError('image', { message: 'Không thể đọc hình ảnh đã chọn' });
    }
  };

  const removeImage = () => {
    form.setValue('image', '', { shouldDirty: true });
    form.clearErrors('image');
    setImageFileName('');
  };

  return {
    form,
    imageFileName,
    imagePreview: form.watch('image'),
    handleImageChange,
    removeImage,
    resetForm,
  };
};
