import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  UtensilsCrossed,
  Users,
  Bike,
  Store,
  Calculator,
  BarChart3,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
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

  const navItems = [
    { label: 'Tổng quan Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Quản lý Đơn hàng', path: '/orders', icon: ShoppingBag, badge: pendingOrdersCount },
    { label: 'Tạo đơn mới (POS)', path: '/orders/new', icon: PlusCircle, highlight: true },
    { label: 'Danh mục Thực đơn', path: '/menu', icon: UtensilsCrossed },
    { label: 'Quản lý Khách hàng', path: '/customers', icon: Users },
    { label: 'Đội ngũ Tài xế', path: '/drivers', icon: Bike },
    { label: 'Quản lý Chi nhánh', path: '/branches', icon: Store },
    { label: 'Cấu hình Phí Ship', path: '/shipping', icon: Calculator },
    { label: 'Báo cáo & Thống kê', path: '/reports', icon: BarChart3 },
    { label: 'Cài đặt Hệ thống', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <NavLink to="/" onClick={onMobileClose} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
              <UtensilsCrossed className="w-5 h-5 fill-white" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div>
                <span className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  FoDelivery <span className="text-xs px-1.5 py-0.5 rounded-md bg-orange-100 text-[#F97316] dark:bg-orange-950 dark:text-orange-400 font-extrabold">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
                  Quản lý Giao hàng POS
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse Trigger */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={collapsed ? 'Mở rộng Sidebar' : 'Thu gọn Sidebar'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}

          {/* Mobile Close Button */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={clsx(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all group',
                  item.highlight && !isActive
                    ? 'bg-orange-50 text-[#F97316] hover:bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400'
                    : isActive
                    ? 'bg-[#F97316] text-white shadow-sm shadow-orange-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                )}
                title={collapsed && !mobileOpen ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={clsx(
                      'w-4 h-4 shrink-0 transition-transform group-hover:scale-110',
                      isActive ? 'text-white' : item.highlight ? 'text-[#F97316]' : 'text-slate-400'
                    )}
                  />
                  {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                </div>

                {(!collapsed || mobileOpen) && (
                  <div className="flex items-center gap-1">
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={clsx(
                          'px-2 py-0.5 text-[10px] font-bold rounded-full',
                          isActive ? 'bg-white text-[#F97316]' : 'bg-orange-100 text-[#F97316] dark:bg-orange-950 dark:text-orange-400'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner */}
      {(!collapsed || mobileOpen) && (
        <div className="p-3">
          <div className="p-4 rounded-2xl bg-slate-900 text-white dark:bg-slate-800 border border-slate-800 relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[10px] font-extrabold uppercase text-orange-400 tracking-wider block">
                Định vị Google Maps
              </span>
              <p className="text-xs font-bold text-slate-200 mt-0.5">
                Tính Phí Ship Tự Động
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Khoảng cách & Đơn giá Per KM đang bật.
              </p>
            </div>
          </div>
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside
        className={clsx(
          'hidden lg:flex h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex-col z-30 transition-all duration-200 shrink-0',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
