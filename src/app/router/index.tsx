import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from '@/app/layouts/MainLayout';
import { AuthLayout } from '@/app/layouts/AuthLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Orders } from '@/pages/Orders';
import { CreateOrder } from '@/pages/CreateOrder';
import { OrderDetail } from '@/pages/OrderDetail';
import { Customers } from '@/pages/Customers';
import { Drivers } from '@/pages/Drivers';
import { Branches } from '@/pages/Branches';
import { Menu } from '@/pages/Menu';
import { ShippingRulePage } from '@/pages/ShippingRule';
import { SettingsPage } from '@/pages/Settings';
import { Reports } from '@/pages/Reports';
import { AuthPage } from '@/pages/Auth';
import { NotFound } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'orders', element: <Orders /> },
      { path: 'orders/new', element: <CreateOrder /> },
      { path: 'orders/:id', element: <OrderDetail /> },
      { path: 'customers', element: <Customers /> },
      { path: 'drivers', element: <Drivers /> },
      { path: 'branches', element: <Branches /> },
      { path: 'menu', element: <Menu /> },
      { path: 'shipping', element: <ShippingRulePage /> },
      { path: 'reports', element: <Reports /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <AuthPage /> }],
  },
  { path: '*', element: <NotFound /> },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
