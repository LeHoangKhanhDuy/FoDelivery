import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { GoogleMapPlaceholder } from '../components/maps/GoogleMapPlaceholder';
import { useOrderStore } from '../stores/useOrderStore';
import { formatVND } from '../utils/shippingCalculator';
import {
  ArrowLeft,
  CheckCircle2,
  Store,
  History,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { OrderStatus } from '../types';

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrderStore();

  const order = orders.find((o) => o.id === id) || orders[0];

  if (!order) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold">Không tìm thấy Đơn hàng</h3>
        <Button onClick={() => navigate('/orders')}>Về Danh sách Đơn hàng</Button>
      </div>
    );
  }

  const timelineSteps: { status: OrderStatus; label: string; time?: string }[] = [
    { status: 'PENDING', label: 'Đặt hàng thành công', time: order.createdAt },
    { status: 'PREPARING', label: 'Nhà bếp Đang chế biến', time: '16:30' },
    { status: 'READY', label: 'Chế biến xong (Sẵn sàng)', time: '16:40' },
    { status: 'ON_DELIVERY', label: 'Tài xế Đang giao hàng', time: '16:45' },
    { status: 'DELIVERED', label: 'Đã giao tới Khách hàng', time: order.deliveredAt },
  ];

  const currentStepIndex = timelineSteps.findIndex((s) => s.status === order.status);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title={`Chi tiết Đơn hàng: ${order.code}`}
        subtitle={`Tạo lúc ${order.createdAt} qua kênh ${order.channel}`}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate('/orders')}
            >
              Về Danh sách
            </Button>
            {order.status !== 'DELIVERED' && (
              <Button
                variant="primary"
                onClick={() => {
                  const nextStatus: Record<string, OrderStatus> = {
                    PENDING: 'PREPARING',
                    PREPARING: 'READY',
                    READY: 'ON_DELIVERY',
                    ON_DELIVERY: 'DELIVERED',
                  };
                  if (nextStatus[order.status]) {
                    updateOrderStatus(order.id, nextStatus[order.status]);
                    toast.success(`Đã cập nhật trạng thái đơn hàng sang ${nextStatus[order.status]}`);
                  }
                }}
              >
                Chuyển Trạng thái Kế tiếp
              </Button>
            )}
          </div>
        }
      />

      {/* Visual Order Timeline */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-6">Tiến trình Giao hàng</h3>
        <div className="relative flex items-center justify-between">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
          {timelineSteps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step.status} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-[#F97316] text-white shadow-md shadow-orange-500/30'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`text-xs font-bold mt-2 ${isCurrent ? 'text-[#F97316]' : 'text-slate-600 dark:text-slate-400'}`}>
                  {step.label}
                </span>
                {step.time && <span className="text-[10px] text-slate-400">{step.time}</span>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Grid: Details Left, Map & Driver Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer, Branch & Driver Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Khách hàng</span>
              <div className="flex items-center gap-2">
                <Avatar name={order.customerName} size="sm" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{order.customerName}</h4>
                  <p className="text-[11px] text-slate-400">{order.customerPhone}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                📍 {order.deliveryAddress}
              </p>
            </Card>

            <Card className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Chi nhánh</span>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-50 text-[#F97316] font-bold">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{order.branchName}</h4>
                  <p className="text-[11px] text-slate-400">Điều phối Trung tâm</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                Giờ hoạt động: 08:00 - 23:00
              </p>
            </Card>

            <Card className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Tài xế giao hàng</span>
              {order.driverName ? (
                <div className="flex items-center gap-2">
                  <Avatar name={order.driverName} size="sm" status="busy" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{order.driverName}</h4>
                    <p className="text-[11px] text-slate-400">{order.driverPhone}</p>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-amber-600 font-semibold py-1">Chưa gán tài xế</div>
              )}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">Dự kiến giao</span>
                <span className="font-bold text-emerald-600">{order.estimatedDurationMins} phút</span>
              </div>
            </Card>
          </div>

          {/* Itemized Order Products */}
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Danh sách Món đặt</h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.name}</h4>
                      <p className="text-slate-400">{formatVND(item.price)} × {item.quantity}</p>
                      {item.note && <span className="text-[10px] text-orange-600">Ghi chú: {item.note}</span>}
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">
                    {formatVND(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment & Shipping Summary */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 text-xs border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tạm tính món</span>
                <span>{formatVND(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Phí giao hàng ({order.distanceKm} km)</span>
                <span>{formatVND(order.shippingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Giảm giá Voucher</span>
                  <span>-{formatVND(order.discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-black text-sm text-slate-900 dark:text-slate-100">
                <span>Tổng tiền đã thanh toán</span>
                <span className="text-[#F97316]">{formatVND(order.total)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Google Map Route & Audit History */}
        <div className="space-y-6">
          <Card className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Bản đồ Tuyến đường Thời gian thực</h3>
            <GoogleMapPlaceholder
              height="h-64"
              distanceKm={order.distanceKm}
              estimatedDurationMins={order.estimatedDurationMins}
              centerAddress={order.deliveryAddress}
              markers={[{ id: 'driver-m', lat: 10.779, lng: 106.698, label: 'Tài xế', type: 'DRIVER' }]}
            />
          </Card>

          <Card className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <History className="w-4 h-4 text-[#F97316]" />
              Nhật ký Xử lý Đơn (Audit Log)
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-slate-100">Đơn hàng được tạo thành công</span>
                <p className="text-[10px] text-slate-400">Kênh: {order.channel} • {order.createdAt}</p>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-slate-100">Tài xế nhận giao hàng</span>
                <p className="text-[10px] text-slate-400">Tài xế: {order.driverName || 'Hệ thống tự động'}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
