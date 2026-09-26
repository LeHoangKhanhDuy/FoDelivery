import { AUTH_TOKEN_STORAGE_KEY, MOCK_AUTH_TOKEN } from '@/modules/auth/constants';

export const createMockAuthSession = () => {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, MOCK_AUTH_TOKEN);
};
