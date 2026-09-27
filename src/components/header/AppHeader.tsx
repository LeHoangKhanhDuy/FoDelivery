import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBranchStore } from '@/stores/useBranchStore';
import { Avatar } from '@/components/ui/Avatar';
import {
  Bell,
  Store,
  ChevronDown,
  LogOut,
  UserCheck,
  Check,
  Menu as MenuIcon,
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/constants/mockData';
import { Drawer } from '@/components/ui/Drawer';
import { Badge } from '@/components/ui/Badge';

export interface AppHeaderProps {
  onToggleSidebar?: () => void;
  onToggleMobileMenu?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { branches, activeBranchId, setActiveBranchId } = useBranchStore();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  // Dynamic Page Title or Breadcrumb matching the screenshot
  const renderBreadcrumbOrTitle = () => {
    const path = location.pathname;
    if (path === '/orders/new') {
      return (
        <h1 className="text-lg sm:text-xl font-black text-slate-900  tracking-tight">
          Tạo đơn hàng mới
        </h1>
      );
    }
    if (path === '/orders') {
      return (
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
          <span className="text-slate-500">Đơn hàng</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900  font-bold">Danh sách đơn hàng</span>
        </div>
      );
    }
    if (path.startsWith('/orders/')) {
      return (
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
          <span className="text-slate-500">Đơn hàng</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900  font-bold">Chi tiết đơn hàng</span>
        </div>
      );
    }
    if (path === '/menu') {
      return <h1 className="text-lg sm:text-xl font-bold text-slate-900 ">Thực đơn</h1>;
    }
    if (path === '/categories') {
      return <h1 className="text-lg sm:text-xl font-bold text-slate-900 ">Danh mục sản phẩm</h1>;
    }
    if (path === '/customers') {
      return <h1 className="text-lg sm:text-xl font-bold text-slate-900 ">Khách hàng</h1>;
    }
    if (path === '/drivers') {
      return <h1 className="text-lg sm:text-xl font-bold text-slate-900 ">Tài xế giao hàng</h1>;
    }
    if (path === '/reports') {
      return <h1 className="text-lg sm:text-xl font-bold text-slate-900 ">Báo cáo & Thống kê</h1>;
    }
    if (path === '/settings') {
      return <h1 className="text-lg sm:text-xl font-bold text-slate-900 ">Cài đặt</h1>;
    }

    return (
      <h1 className="text-lg sm:text-xl font-bold text-slate-900 ">
        Tổng quan Điều phối & Doanh thu
      </h1>
    );
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-white  border-b border-slate-200  flex items-center justify-between sticky top-0 z-20 w-full select-none transition-colors">
      {/* Left: Mobile Menu Toggle & Title/Breadcrumb */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-slate-200  bg-white  text-slate-600  hover:bg-slate-100  transition-colors shrink-0"
            title="Mở Menu Navigation"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        )}

        <div>{renderBreadcrumbOrTitle()}</div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Branch Selector Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200  bg-slate-50  hover:bg-slate-100  transition-colors text-xs font-semibold text-slate-800 "
          >
            <Store className="w-4 h-4 text-[#F97316] shrink-0" />
            <span className="max-w-[120px] lg:max-w-[160px] truncate">{activeBranch.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white  border border-slate-200  rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Chọn Chi nhánh Hoạt động
              </div>
              {branches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBranchId(b.id);
                    setIsBranchDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50  flex items-center justify-between text-xs font-semibold text-slate-800 "
                >
                  <div>
                    <div className="font-bold">{b.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{b.district}</div>
                  </div>
                  {b.id === activeBranchId && <Check className="w-4 h-4 text-[#F97316]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell Icon with Badge "1" */}
        <button
          onClick={() => setIsNotifDrawerOpen(true)}
          className="relative p-2 rounded-xl border border-slate-200  bg-white  text-slate-600  hover:bg-slate-100  transition-colors cursor-pointer"
          title="Thông báo"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
            1
          </span>
        </button>

        {/* User Profile: Avatar + Nguyễn Văn A / Quản trị viên */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 rounded-xl border border-slate-200  hover:bg-slate-50  transition-colors cursor-pointer"
          >
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              name="Nguyễn Văn A"
              size="sm"
            />
            <div className="text-left text-xs">
              <div className="font-bold text-slate-900  leading-tight">
                Nguyễn Văn A
              </div>
              <div className="text-[10px] text-slate-400 font-normal leading-tight">
                Quản trị viên
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white  border border-slate-200  rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100 ">
                <p className="text-xs font-bold text-slate-900 ">Nguyễn Văn A</p>
                <p className="text-[10px] text-slate-400">admin@goodfood.vn</p>
              </div>
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate('/settings');
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700  hover:bg-slate-50  flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                Cài đặt Tài khoản
              </button>
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate('/login');
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600  hover:bg-rose-50  flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications Drawer */}
      <Drawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        title="Thông báo Hệ thống"
        subtitle="Cập nhật đơn hàng & điều phối thời gian thực"
        width="md"
      >
        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-xl border border-slate-100  bg-slate-50/50  hover:bg-slate-100  transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 ">
                  {n.title}
                </span>
                <Badge variant={n.type === 'ORDER' ? 'primary' : 'neutral'} size="sm">
                  {n.type}
                </Badge>
              </div>
              <p className="text-xs text-slate-600  mb-2">{n.message}</p>
              <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  );
};
