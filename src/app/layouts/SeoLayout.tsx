import React from 'react';
import { Outlet } from 'react-router-dom';
import { SeoManager } from '@/app/seo/SeoManager';

export const SeoLayout: React.FC = () => (
  <>
    <SeoManager />
    <Outlet />
  </>
);
