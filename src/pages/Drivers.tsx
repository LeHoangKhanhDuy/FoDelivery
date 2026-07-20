import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/ui/Card';
import { Table, Column } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { useDriverStore } from '../stores/useDriverStore';
import { Driver } from '../types';
import { Bike, Star, Clock, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

export const Drivers: React.FC = () => {
  const { drivers, updateDriverStatus } = useDriverStore();

  const onlineCount = drivers.filter((d) => d.status === 'ONLINE').length;
  const busyCount = drivers.filter((d) => d.status === 'BUSY').length;
  const offlineCount = drivers.filter((d) => d.status === 'OFFLINE').length;

  const getStatusLabel = (status: Driver['status']) => {
    switch (status) {
      case 'ONLINE':
        return 'Trực tuyến (Rảnh)';
      case 'BUSY':
        return 'Đang giao hàng';
      case 'OFFLINE':
        return 'Ngoại tuyến';
    }
  };

  const columns: Column<Driver>[] = [
    {
      header: 'Họ tên Tài xế',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={item.avatar}
            name={item.name}
            size="md"
            status={item.status === 'ONLINE' ? 'online' : item.status === 'BUSY' ? 'busy' : 'offline'}
          />
          <div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.name}</div>
            <div className="text-[11px] text-slate-400">{item.phone}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Phương tiện & Biển số',
      cell: (item) => (
        <div>
          <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">
            {item.vehicleType === 'MOTORBIKE' ? 'Xe máy' : item.vehicleType === 'SCOOTER' ? 'Xe tay ga' : 'Ô tô'}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">{item.vehiclePlate}</div>
        </div>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (item) => (
        <Badge
          variant={item.status === 'ONLINE' ? 'success' : item.status === 'BUSY' ? 'primary' : 'neutral'}
          size="sm"
        >
          {getStatusLabel(item.status)}
        </Badge>
      ),
    },
    {
      header: 'Đã giao hôm nay',
      cell: (item) => (
        <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.completedDeliveriesToday} đơn</span>
      ),
    },
    {
      header: 'Thời gian giao TB',
      cell: (item) => (
        <span className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">{item.avgDeliveryMinutes} phút</span>
      ),
    },
    {
      header: 'Đánh giá',
      cell: (item) => (
        <div className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{item.rating}</span>
        </div>
      ),
    },
    {
      header: 'Chuyển Trạng thái',
      cell: (item) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const nextStatus: Driver['status'] =
              item.status === 'ONLINE' ? 'BUSY' : item.status === 'BUSY' ? 'OFFLINE' : 'ONLINE';
            updateDriverStatus(item.id, nextStatus);
            toast.success(`Đã chuyển trạng thái tài xế ${item.name} sang ${getStatusLabel(nextStatus)}`);
          }}
        >
          Đổi trạng thái
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Quản lý Đội ngũ Tài xế"
        subtitle="Theo dõi trực tuyến trạng thái tài xế, hiệu suất giao hàng và điều phối phương tiện."
      />

      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Tài xế Trực tuyến (Sẵn sàng)"
          value={`${onlineCount} tài xế`}
          icon={<Bike className="w-5 h-5" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
        />
        <StatCard
          title="Đang trên đường giao hàng"
          value={`${busyCount} tài xế`}
          icon={<Navigation className="w-5 h-5" />}
          iconBgColor="bg-orange-50 text-[#F97316] dark:bg-orange-950/50 dark:text-orange-400"
        />
        <StatCard
          title="Tài xế Ngoại tuyến"
          value={`${offlineCount} tài xế`}
          icon={<Clock className="w-5 h-5" />}
          iconBgColor="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        />
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {drivers.map((driver) => (
          <Card key={driver.id} hoverable className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src={driver.avatar}
                  name={driver.name}
                  size="md"
                  status={driver.status === 'ONLINE' ? 'online' : driver.status === 'BUSY' ? 'busy' : 'offline'}
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{driver.name}</h4>
                  <p className="text-[10px] text-slate-400">{driver.vehiclePlate}</p>
                </div>
              </div>
              <Badge
                variant={driver.status === 'ONLINE' ? 'success' : driver.status === 'BUSY' ? 'primary' : 'neutral'}
                size="sm"
              >
                {getStatusLabel(driver.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Đơn hôm nay</span>
                <strong className="text-slate-900 dark:text-slate-100">{driver.completedDeliveriesToday}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Đánh giá</span>
                <strong className="text-amber-500">★ {driver.rating}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Thời gian TB</span>
                <strong className="text-emerald-600">{driver.avgDeliveryMinutes}p</strong>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Driver Table */}
      <Table columns={columns} data={drivers} keyExtractor={(item) => item.id} />
    </div>
  );
};
