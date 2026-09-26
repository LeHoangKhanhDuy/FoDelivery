import React from 'react';
import { LoginBrandPanel } from '@/modules/auth/components/LoginBrandPanel';
import { LoginForm } from '@/modules/auth/components/LoginForm';

export const LoginPage: React.FC = () => (
  <div className="grid min-h-[650px] w-full min-w-0 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] lg:grid-cols-[48%_52%]">
    <LoginBrandPanel />
    <LoginForm />
  </div>
);
