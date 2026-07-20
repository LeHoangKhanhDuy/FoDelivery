import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/common/StatCard';
import { formatVND } from '../utils/shippingCalculator';
import { DollarSign, ShoppingBag, Clock } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const CHANNEL_DATA = [
  { name: 'Điện thoại (Phone)', value: 45, color: '#F97316' },
  { name: 'Facebook', value: 30, color: '#3b82f6' },
  { name: 'Zalo OA', value: 35, color: '#06b6d4' },
  { name: 'Website', value: 20, color: '#10b981' },
  { name: 'Quầy POS', value: 12, color: '#8b5cf6' },
];

const WEEKLY_DATA = [
  { day: 'Thứ 2', revenue: 18500000, orders: 110 },
  { day: 'Thứ 3', revenue: 21200000, orders: 125 },
  { day: 'Thứ 4', revenue: 19800000, orders: 118 },
  { day: 'Thứ 5', revenue: 24500000, orders: 142 },
  { day: 'Thứ 6', revenue: 31000000, orders: 180 },
  { day: 'Thứ 7', revenue: 38900000, orders: 220 },
  { day: 'Chủ Nhật', revenue: 35400000, orders: 198 },
];

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Báo cáo & Phân tích Giao hàng"
        subtitle="Phân tích tỷ trọng đơn hàng Đa kênh, hiệu suất doanh thu theo tuần và thời gian hoàn tất đơn."
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Doanh thu Tuần này"
          value={formatVND(189300000)}
          growthPercent={15.8}
          growthLabel="so với tuần trước"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Tổng đơn đã giao trong tuần"
          value="1.093 đơn"
          growthPercent={11.2}
          growthLabel="so với tuần trước"
          icon={<ShoppingBag className="w-5 h-5" />}
        />
        <StatCard
          title="Thời gian giao trung bình"
          value="19.4 phút"
          growthPercent={-4.1}
          growthLabel="nhanh hơn tuần trước"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Bar Chart */}
        <Card className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Hiệu suất Doanh thu theo Tuần (VNĐ)
          </h3>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                  tickFormatter={(val) => `${val / 1000000}Tr`}
                />
                <Tooltip formatter={(val: any) => [formatVND(Number(val) || 0), 'Doanh thu']} contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="revenue" fill="#F97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Omnichannel Share Pie Chart */}
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Tỷ trọng Đơn hàng theo Kênh
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CHANNEL_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={45} paddingAngle={4}>
                  {CHANNEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
            {CHANNEL_DATA.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{c.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
