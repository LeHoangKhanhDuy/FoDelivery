import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatCard } from '@/components/common/StatCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_DASHBOARD_STATS } from '@/constants/mockData';
import { useOrderStore } from '@/stores/useOrderStore';
import { useDriverStore } from '@/stores/useDriverStore';
import { useBranchStore } from '@/stores/useBranchStore';
import { formatVND } from '@/utils/shippingCalculator';
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Truck,
  Plus,
  ArrowRight,
  MapPin,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const REVENUE_DATA = [
  { time: '08:00', revenue: 1200000, orders: 8 },
  { time: '10:00', revenue: 3400000, orders: 18 },
  { time: '12:00', revenue: 8900000, orders: 42 },
  { time: '14:00', revenue: 5200000, orders: 24 },
  { time: '16:00', revenue: 4100000, orders: 19 },
  { time: '18:00', revenue: 9800000, orders: 51 },
  { time: '20:00', revenue: 6500000, orders: 32 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const orders = useOrderStore((state) => state.orders);
  const drivers = useDriverStore((state) => state.drivers);
  const branches = useBranchStore((state) => state.branches);

  const recentOrders = orders.slice(0, 5);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'success';
      case 'ON_DELIVERY':
        return 'primary';
      case 'PREPARING':
      case 'READY':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Chờ xử lý';
      case 'PREPARING':
        return 'Đang chế biến';
      case 'READY':
        return 'Sẵn sàng giao';
      case 'ON_DELIVERY':
        return 'Đang giao hàng';
      case 'DELIVERED':
        return 'Đã hoàn thành';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      <PageHeader
        title="Tổng quan Điều phối & Doanh thu"
        subtitle="Theo dõi doanh thu thời gian thực, hiệu suất giao hàng và đội ngũ tài xế."
        action={
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/orders/new')}
          >
            Tạo đơn hàng mới
          </Button>
        }
      />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Doanh thu hôm nay"
          value={formatVND(MOCK_DASHBOARD_STATS.revenueToday)}
          growthPercent={MOCK_DASHBOARD_STATS.revenueGrowthPercent}
          growthLabel="so với hôm qua"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Tổng đơn hàng hôm nay"
          value={`${MOCK_DASHBOARD_STATS.ordersToday} đơn`}
          growthPercent={MOCK_DASHBOARD_STATS.ordersGrowthPercent}
          growthLabel="so với hôm qua"
          icon={<ShoppingBag className="w-5 h-5" />}
        />
        <StatCard
          title="Thời gian giao trung bình"
          value={`${MOCK_DASHBOARD_STATS.avgDeliveryTimeMins} phút`}
          growthPercent={MOCK_DASHBOARD_STATS.avgTimeImprovementMins}
          growthLabel="nhanh hơn trung bình"
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
        <StatCard
          title="Doanh thu Phí Ship"
          value={formatVND(MOCK_DASHBOARD_STATS.shippingRevenueToday)}
          growthPercent={MOCK_DASHBOARD_STATS.shippingRevenueGrowthPercent}
          growthLabel="so với hôm qua"
          icon={<Truck className="w-5 h-5" />}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400"
        />
      </div>

      {/* Revenue & Orders Trend Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Revenue Trend Chart */}
        <Card className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Xu hướng Doanh thu & Đơn hàng trong ngày
              </h3>
              <p className="text-xs text-slate-500">Dữ liệu đơn hàng Đa kênh theo mốc giờ</p>
            </div>
            <Badge variant="primary" size="sm">Trực tiếp</Badge>
          </div>

          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#94A3B8' }}
                  tickFormatter={(val) => `${val / 1000000}Tr`}
                />
                <Tooltip
                  formatter={(val: any) => [formatVND(Number(val) || 0), 'Doanh thu']}
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Hourly Orders Volume */}
        <Card className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Khung giờ Cao điểm
            </h3>
            <p className="text-xs text-slate-500">Số lượng đơn hàng mỗi 2 giờ</p>
          </div>

          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="orders" fill="#FB923C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Grid: Recent Orders & Top Drivers / Top Branches */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders List */}
        <Card className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Đơn hàng mới nhận</h3>
              <p className="text-xs text-slate-500">Danh sách đơn đa kênh đang xử lý</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/orders')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Xem tất cả
            </Button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentOrders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => navigate(`/orders/${ord.id}`)}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/40 rounded-xl px-2 transition-colors cursor-pointer gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F97316] font-bold text-xs flex items-center justify-center border border-orange-200 shrink-0">
                    {ord.channel}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{ord.code}</span>
                      <span className="text-xs text-slate-500 truncate">• {ord.customerName}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-sm">{ord.deliveryAddress}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
                  <div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
                      {formatVND(ord.total)}
                    </div>
                    <div className="text-[10px] text-slate-400">{ord.items.length} món</div>
                  </div>
                  <Badge variant={getStatusVariant(ord.status)} size="sm">
                    {getStatusLabel(ord.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Active Drivers & Top Branches */}
        <div className="space-y-6">
          {/* Top Drivers */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Tài xế tiêu biểu</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/drivers')}>
                Xem đội ngũ
              </Button>
            </div>
            <div className="space-y-2.5">
              {drivers.slice(0, 3).map((driver) => (
                <div
                  key={driver.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-2.5">
                    <Avatar src={driver.avatar} name={driver.name} size="sm" status={driver.status === 'ONLINE' ? 'online' : 'busy'} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{driver.name}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {driver.rating} • {driver.completedDeliveriesToday} đơn hôm nay
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                    {driver.avgDeliveryMinutes}p trung bình
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Branches */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Chi nhánh Đang mở</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/branches')}>
                Quản lý
              </Button>
            </div>
            <div className="space-y-2.5">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-orange-50 text-[#F97316] font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{b.name}</h4>
                      <p className="text-[10px] text-slate-400">{b.activeOrdersCount} đơn đang xử lý</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    Mở cửa ({b.deliveryRadiusKm}km)
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
