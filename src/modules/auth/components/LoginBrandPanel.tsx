import React from 'react';
import { Monitor, MousePointerClick, Store } from 'lucide-react';
import loginPosHero from '@/assets/login-pos-hero.png';
import { AUTH_FEATURES } from '@/modules/auth/constants';
import type { AuthFeatureIcon } from '@/modules/auth/types';
import { AuthLogo } from '@/modules/auth/components/AuthLogo';

const featureIcons: Record<AuthFeatureIcon, React.ReactNode> = {
  desktop: <Monitor className="h-5 w-5" />,
  touch: <MousePointerClick className="h-5 w-5" />,
  store: <Store className="h-5 w-5" />,
};

export const LoginBrandPanel: React.FC = () => (
  <section className="relative hidden overflow-hidden bg-[#07162c] px-9 py-8 text-white lg:flex lg:flex-col">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(31,67,119,0.7),transparent_42%),linear-gradient(145deg,rgba(3,13,29,0.98),rgba(13,35,69,0.94))]" />
    <div className="absolute inset-x-0 bottom-0 h-52 bg-[radial-gradient(ellipse_at_bottom,rgba(249,115,22,0.48),transparent_65%)]" />

    <div className="relative z-10">
      <AuthLogo />
    </div>

    <div className="relative z-10 mt-9">
      <h1 className="max-w-[390px] text-[38px] font-black leading-[1.2] tracking-tight">
        Quản lý đơn hàng<br />
        <span className="text-[#F97316]">dễ dàng,</span> mọi thiết bị
      </h1>

      <div className="mt-6 space-y-4">
        {AUTH_FEATURES.map((feature) => (
          <div key={feature.title} className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/5">
              {featureIcons[feature.icon]}
            </div>
            <div>
              <h2 className="text-sm font-bold">{feature.title}</h2>
              <p className="mt-0.5 text-xs text-slate-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <img
      src={loginPosHero}
      alt="Thiết bị POS, máy in hóa đơn và kiện hàng giao nhận"
      className="pointer-events-none absolute -bottom-1 left-2 z-10 w-[520px] max-w-none select-none drop-shadow-[0_18px_22px_rgba(0,0,0,0.45)]"
    />
  </section>
);
