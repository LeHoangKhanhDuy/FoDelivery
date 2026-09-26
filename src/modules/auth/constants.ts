import type { AuthFeature, LoginCredentials } from '@/modules/auth/types';

export const DEMO_CREDENTIALS: LoginCredentials = {
  email: 'admin@fodelivery.ai',
  password: 'password123',
};

export const AUTH_TOKEN_STORAGE_KEY = 'fodelivery_token';
export const MOCK_AUTH_TOKEN = 'mock_jwt_token_12345';

export const AUTH_FEATURES: AuthFeature[] = [
  {
    icon: 'desktop',
    title: 'Sử dụng trên máy tính',
    description: 'Quản lý, theo dõi, báo cáo toàn diện',
  },
  {
    icon: 'touch',
    title: 'Tối ưu cho máy POS cảm ứng',
    description: 'Giao diện đơn giản, thao tác nhanh',
  },
  {
    icon: 'store',
    title: 'Đa kênh & đa chi nhánh',
    description: 'Quản lý tập trung, đồng bộ dữ liệu',
  },
];
