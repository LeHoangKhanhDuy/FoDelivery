import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { DEMO_CREDENTIALS } from '@/modules/auth/constants';
import type { LoginCredentials } from '@/modules/auth/types';
import { createMockAuthSession } from '@/modules/auth/utils/authSession';

const EMPTY_CREDENTIALS: LoginCredentials = {
  email: '',
  password: '',
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>(EMPTY_CREDENTIALS);
  const [showPassword, setShowPassword] = useState(false);

  const updateCredential = (field: keyof LoginCredentials, value: string) => {
    setCredentials((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!credentials.email.trim() || !credentials.password.trim()) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    createMockAuthSession();
    toast.success('Đăng nhập thành công! Chào mừng Quản trị viên.');
    navigate('/');
  };

  return {
    credentials,
    showPassword,
    updateCredential,
    togglePasswordVisibility: () => setShowPassword((current) => !current),
    fillDemoAccount: () => setCredentials({ ...DEMO_CREDENTIALS }),
    handleSubmit,
  };
};
