import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b172b] px-4 py-8 sm:px-6 lg:px-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_88%,rgba(255,190,150,0.95),transparent_30%),radial-gradient(circle_at_20%_35%,rgba(32,65,111,0.65),transparent_42%),linear-gradient(135deg,#071426_0%,#14243d_52%,#667087_100%)]" />
      <div className="absolute -bottom-32 right-[-8%] h-96 w-96 rounded-full bg-orange-200/50 blur-3xl" />
      <div className="relative w-full max-w-[1080px]">
        <Outlet />
      </div>
    </div>
  );
};
