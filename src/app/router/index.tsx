import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/MainLayout';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { SeoLayout } from '@/app/layouts/SeoLayout';
import { LoadingSpinner } from '@/components/common/Loading';

const Dashboard = lazy(() =>
  import('@/pages/Dashboard').then((module) => ({ default: module.Dashboard }))
);
const Orders = lazy(() =>
  import('@/pages/Orders').then((module) => ({ default: module.Orders }))
);
const CreateOrder = lazy(() =>
  import('@/pages/CreateOrder').then((module) => ({ default: module.CreateOrder }))
);
const OrderDetail = lazy(() =>
  import('@/pages/OrderDetail').then((module) => ({ default: module.OrderDetail }))
);
const Customers = lazy(() =>
  import('@/pages/Customers').then((module) => ({ default: module.Customers }))
);
const Drivers = lazy(() =>
  import('@/pages/Drivers').then((module) => ({ default: module.Drivers }))
);
const Branches = lazy(() =>
  import('@/pages/Branches').then((module) => ({ default: module.Branches }))
);
const Menu = lazy(() =>
  import('@/pages/Menu').then((module) => ({ default: module.Menu }))
);
const ShippingRulePage = lazy(() =>
  import('@/pages/ShippingRule').then((module) => ({ default: module.ShippingRulePage }))
);
const SettingsPage = lazy(() =>
  import('@/pages/Settings').then((module) => ({ default: module.SettingsPage }))
);
const Reports = lazy(() =>
  import('@/pages/Reports').then((module) => ({ default: module.Reports }))
);
const AuthPage = lazy(() =>
  import('@/pages/Auth').then((module) => ({ default: module.AuthPage }))
);
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound }))
);

const renderLazyPage = (Page: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<LoadingSpinner label="Đang tải trang..." />}>
    <Page />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <SeoLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: renderLazyPage(Dashboard) },
          { path: 'orders', element: renderLazyPage(Orders) },
          { path: 'orders/new', element: renderLazyPage(CreateOrder) },
          { path: 'orders/:id', element: renderLazyPage(OrderDetail) },
          { path: 'customers', element: renderLazyPage(Customers) },
          { path: 'drivers', element: renderLazyPage(Drivers) },
          { path: 'branches', element: renderLazyPage(Branches) },
          { path: 'menu', element: renderLazyPage(Menu) },
          { path: 'shipping', element: renderLazyPage(ShippingRulePage) },
          { path: 'reports', element: renderLazyPage(Reports) },
          { path: 'settings', element: renderLazyPage(SettingsPage) },
        ],
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [{ path: 'login', element: renderLazyPage(AuthPage) }],
      },
      { path: '*', element: renderLazyPage(NotFound) },
    ],
  },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
