import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@fodelivery.ai');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('fodelivery_token', 'mock_jwt_token_12345');
    toast.success('Đăng nhập thành công! Chào mừng Quản trị viên.');
    navigate('/');
  };

  return (
    <Card className="p-8 space-y-6 shadow-2xl border-slate-700 bg-slate-900/90 backdrop-blur-xl text-white">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-black tracking-tight">FoDelivery AI</h2>
        <p className="text-xs text-slate-400">Hệ thống Quản lý Giao hàng & POS Đa kênh Doanh nghiệp</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email công việc"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          className="bg-slate-800 border-slate-700 text-white"
        />

        <Input
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          className="bg-slate-800 border-slate-700 text-white"
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 mt-2 font-bold"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Đăng nhập vào Dashboard
        </Button>
      </form>

      <div className="p-3 bg-slate-800/60 rounded-xl text-[11px] text-slate-400 text-center border border-slate-700/60">
        Tài khoản Demo: <strong className="text-orange-400">admin@fodelivery.ai</strong> / <strong className="text-orange-400">password123</strong>
      </div>
    </Card>
  );
};
