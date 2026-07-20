import React, { useState } from 'react';
import { SearchBox } from '@/components/common/SearchBox';
import { useBranchStore } from '@/stores/useBranchStore';
import { useTheme } from '@/contexts/ThemeContext';
import { Avatar } from '@/components/ui/Avatar';
import {
  Bell,
  Sun,
  Moon,
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
import { useNavigate } from 'react-router-dom';

export interface AppHeaderProps {
  onToggleSidebar?: () => void;
  onToggleMobileMenu?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleMobileMenu }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { branches, activeBranchId, setActiveBranchId } = useBranchStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  return (
    <header className="h-16 px-4 sm:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between sticky top-0 z-20 transition-colors w-full">
      {/* Left: Mobile Menu Toggle & Global Search Box */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            title="Mở Menu Navigation"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        )}

        <div className="w-full max-w-xs sm:max-w-md">
          <SearchBox
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              if (val.trim()) {
                navigate(`/orders?search=${encodeURIComponent(val)}`);
              }
            }}
            placeholder="Tìm đơn hàng, khách hàng, tài xế..."
          />
        </div>
      </div>

      {/* Right: Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Branch Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <Store className="w-4 h-4 text-[#F97316] shrink-0" />
            <span className="hidden sm:inline max-w-[130px] md:max-w-[180px] truncate">{activeBranch.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {isBranchDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
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
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200"
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

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={theme === 'light' ? 'Chuyển sang Dark Mode' : 'Chuyển sang Light Mode'}
        >
          {theme === 'light' ? <Moon className="w-4 h-4 text-slate-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Notification Bell Button */}
        <button
          onClick={() => setIsNotifDrawerOpen(true)}
          className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Thông báo"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F97316] ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              name="Quản trị viên"
              size="sm"
            />
            <div className="hidden md:block text-left text-xs">
              <div className="font-extrabold text-slate-900 dark:text-slate-100">Trần Văn Nam</div>
              <div className="text-[10px] text-slate-400">Quản trị Điều phối</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Trần Văn Nam</p>
                <p className="text-[10px] text-slate-400">nam.tran@fodelivery.ai</p>
              </div>
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate('/settings');
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                Cài đặt Tài khoản
              </button>
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  navigate('/login');
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
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
              className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {n.title}
                </span>
                <Badge variant={n.type === 'ORDER' ? 'primary' : 'neutral'} size="sm">
                  {n.type}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">{n.message}</p>
              <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
            </div>
          ))}
        </div>
      </Drawer>
    </header>
  );
};
