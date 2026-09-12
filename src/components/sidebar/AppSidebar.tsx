import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  Bike,
  BarChart3,
  Settings,
  ArrowLeft,
  X,
  ChevronRight,
} from 'lucide-react';
import { useOrderStore } from '@/stores/useOrderStore';

export interface AppSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onMobileClose,
}) => {
  const location = useLocation();
  const orders = useOrderStore((state) => state.orders);

  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'PENDING' || o.status === 'PREPARING' || o.status === 'READY'
  ).length;

  const isOrdersActive = location.pathname.startsWith('/orders');
  const isOrdersNew = location.pathname === '/orders/new';
  const isOrdersList = location.pathname === '/orders';

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between select-none bg-[#111827] text-slate-300">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
          <NavLink to="/" onClick={onMobileClose} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F97316] flex items-center justify-center text-white shadow-md shadow-orange-500/30 shrink-0 font-bold">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div>
                <span className="text-base font-black tracking-wider text-white flex items-center gap-1 uppercase">
                  GOODFOOD
                </span>
                <span className="text-[11px] text-slate-400 block -mt-0.5 font-normal">
                  Quản lý đơn hàng
                </span>
              </div>
            )}
          </NavLink>

          {/* Mobile Close Button */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {/* 1. Tổng quan */}
          <NavLink
            to="/"
            onClick={onMobileClose}
            className={clsx(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors',
              location.pathname === '/'
                ? 'bg-[#F97316] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            )}
            title={collapsed && !mobileOpen ? 'Tổng quan' : undefined}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Tổng quan</span>}
          </NavLink>

          {/* 2. Đơn hàng (Parent & Submenu) */}
          <div className="space-y-1">
            <NavLink
              to="/orders"
              onClick={onMobileClose}
              className={clsx(
                'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-colors',
                isOrdersActive
                  ? 'bg-[#F97316] text-white font-bold shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium'
              )}
              title={collapsed && !mobileOpen ? 'Đơn hàng' : undefined}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 shrink-0" />
                {(!collapsed || mobileOpen) && <span>Đơn hàng</span>}
              </div>
              {(!collapsed || mobileOpen) && pendingOrdersCount > 0 && (
                <span
                  className={clsx(
                    'px-2 py-0.5 text-[10px] font-bold rounded-full',
                    isOrdersActive ? 'bg-white text-[#F97316]' : 'bg-orange-500/20 text-orange-400'
                  )}
                >
                  {pendingOrdersCount}
                </span>
              )}
            </NavLink>

            {/* Sub-menu: Danh sách đơn hàng & Tạo đơn mới */}
            {(!collapsed || mobileOpen) && isOrdersActive && (
              <div className="pl-9 pr-2 py-1 space-y-1">
                <NavLink
                  to="/orders"
                  onClick={onMobileClose}
                  className={clsx(
                    'block px-2.5 py-1.5 rounded-lg text-xs transition-colors',
                    isOrdersList
                      ? 'text-white font-bold bg-slate-800/60'
                      : 'text-slate-400 hover:text-slate-200'
                  )}
                >
                  Danh sách đơn hàng
                </NavLink>
                <NavLink
                  to="/orders/new"
                  onClick={onMobileClose}
                  className={clsx(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors',
                    isOrdersNew
                      ? 'text-[#F97316] font-bold bg-orange-950/30'
                      : 'text-slate-400 hover:text-slate-200'
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                  <span>Tạo đơn mới</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* 3. Thực đơn */}
          <NavLink
            to="/menu"
            onClick={onMobileClose}
            className={clsx(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors',
              location.pathname.startsWith('/menu')
                ? 'bg-[#F97316] text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            )}
            title={collapsed && !mobileOpen ? 'Thực đơn' : undefined}
          >
            <UtensilsCrossed className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Thực đơn</span>}
          </NavLink>

          {/* 4. Khách hàng */}
          <NavLink
            to="/customers"
            onClick={onMobileClose}
            className={clsx(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors',
              location.pathname.startsWith('/customers')
                ? 'bg-[#F97316] text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            )}
            title={collapsed && !mobileOpen ? 'Khách hàng' : undefined}
          >
            <Users className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Khách hàng</span>}
          </NavLink>

          {/* 5. Tài xế giao hàng */}
          <NavLink
            to="/drivers"
            onClick={onMobileClose}
            className={clsx(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors',
              location.pathname.startsWith('/drivers')
                ? 'bg-[#F97316] text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            )}
            title={collapsed && !mobileOpen ? 'Tài xế giao hàng' : undefined}
          >
            <Bike className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Tài xế giao hàng</span>}
          </NavLink>

          {/* 6. Báo cáo */}
          <NavLink
            to="/reports"
            onClick={onMobileClose}
            className={clsx(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors',
              location.pathname.startsWith('/reports')
                ? 'bg-[#F97316] text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            )}
            title={collapsed && !mobileOpen ? 'Báo cáo' : undefined}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Báo cáo</span>}
          </NavLink>

          {/* 7. Cài đặt */}
          <NavLink
            to="/settings"
            onClick={onMobileClose}
            className={clsx(
              'flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors',
              location.pathname.startsWith('/settings')
                ? 'bg-[#F97316] text-white font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            )}
            title={collapsed && !mobileOpen ? 'Cài đặt' : undefined}
          >
            <Settings className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Cài đặt</span>}
          </NavLink>
        </nav>
      </div>

      {/* Bottom: Thu gọn Trigger */}
      {onToggleCollapse && (
        <div className="p-3 border-t border-slate-800">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 shrink-0" />
            ) : (
              <>
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>Thu gọn</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-[#111827] z-50 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside
        className={clsx(
          'hidden lg:flex h-screen sticky top-0 bg-[#111827] flex-col z-30 transition-all duration-200 shrink-0 border-r border-slate-800',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
