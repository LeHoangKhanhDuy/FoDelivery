import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC] dark:bg-[#0B0F19] text-center">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950 text-[#F97316] flex items-center justify-center mb-4 shadow-lg">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">404</h1>
      <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 mt-1 mb-2">Không tìm thấy trang</h2>
      <p className="text-xs text-slate-500 max-w-sm mb-6">
        Trang bạn đang truy cập không tồn tại hoặc đã được di chuyển.
      </p>
      <Button
        variant="primary"
        onClick={() => navigate('/')}
        leftIcon={<Home className="w-4 h-4" />}
      >
        Về Trang chủ Dashboard
      </Button>
    </div>
  );
};
