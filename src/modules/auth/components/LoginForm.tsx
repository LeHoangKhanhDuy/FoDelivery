import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle, ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DEMO_CREDENTIALS } from '@/modules/auth/constants';
import { AuthLogo } from '@/modules/auth/components/AuthLogo';
import { useLoginForm } from '@/modules/auth/hooks/useLoginForm';

export const LoginForm: React.FC = () => {
  const {
    credentials,
    errors,
    showPassword,
    updateCredential,
    togglePasswordVisibility,
    fillDemoAccount,
    handleSubmit,
  } = useLoginForm();

  return (
    <section className="flex min-w-0 items-center bg-[linear-gradient(145deg,#ffffff_0%,#fbfcfe_60%,#f5f7fa_100%)] px-6 py-10 sm:px-12 lg:px-10 xl:px-14">
      <div className="mx-auto w-full min-w-0 max-w-[470px]">
        <AuthLogo centered />

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
          <div className="space-y-2">
            <label htmlFor="login-email" className="text-sm font-bold text-slate-800">
              Email công việc <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail
                className={clsx(
                  'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2',
                  errors.email ? 'text-red-500' : 'text-slate-500'
                )}
              />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={credentials.email}
                onChange={(event) => updateCredential('email', event.target.value)}
                placeholder="Nhập email công việc"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'login-email-error' : undefined}
                className={clsx(
                  'h-13 w-full rounded-xl border bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4',
                  errors.email
                    ? 'border-red-500 bg-red-50/40 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-300 focus:border-[#F97316] focus:ring-orange-100'
                )}
              />
            </div>
            {errors.email && (
              <p id="login-email-error" className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="login-password" className="text-sm font-bold text-slate-800">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LockKeyhole
                className={clsx(
                  'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2',
                  errors.password ? 'text-red-500' : 'text-slate-500'
                )}
              />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={credentials.password}
                onChange={(event) => updateCredential('password', event.target.value)}
                placeholder="Nhập mật khẩu"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                className={clsx(
                  'h-13 w-full rounded-xl border bg-slate-50 pl-12 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4',
                  errors.password
                    ? 'border-red-500 bg-red-50/40 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-300 focus:border-[#F97316] focus:ring-orange-100'
                )}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-[#F97316]"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p id="login-password-error" className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="h-13 w-full rounded-xl bg-gradient-to-r from-[#ff7a0a] to-[#F97316] text-sm font-bold shadow-lg shadow-orange-500/20 hover:from-[#F97316] hover:to-[#EA580C]"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Đăng nhập vào Dashboard
          </Button>
        </form>

        <button
          type="button"
          onClick={fillDemoAccount}
          className="mt-7 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl bg-slate-700 px-4 py-4 text-center text-xs font-medium text-slate-300 shadow-inner transition hover:bg-slate-800"
        >
          <span>Tài khoản Demo:</span>
          <strong className="text-[#fb923c]">{DEMO_CREDENTIALS.email}</strong>
          <span className="text-slate-400">/</span>
          <strong className="text-[#fb923c]">{DEMO_CREDENTIALS.password}</strong>
        </button>

        <p className="mt-5 text-center text-[11px] text-slate-400 lg:hidden">
          Quản lý đơn hàng đa kênh trên mọi thiết bị
        </p>
      </div>
    </section>
  );
};
