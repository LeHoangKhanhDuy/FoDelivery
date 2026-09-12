import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMapPlaceholder } from '@/components/maps/GoogleMapPlaceholder';
import { PrintInvoiceModal } from '@/components/common/PrintInvoiceModal';
import { useOrderStore } from '@/stores/useOrderStore';
import { User, Phone, MapPin, Printer } from 'lucide-react';
import toast from 'react-hot-toast';

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrderStore();

  const [printModalOpen, setPrintModalOpen] = useState(false);

  const order = orders.find((o) => o.id === id) || orders[0];

  if (!order) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold">Không tìm thấy đơn hàng</h3>
        <button
          onClick={() => navigate('/orders')}
          className="mt-3 px-4 py-2 bg-[#F97316] text-white rounded-xl text-xs font-bold"
        >
          Về danh sách
        </button>
      </div>
    );
  }

  const handleUpdateStatus = () => {
    const nextStatus =
      order.status === 'ON_DELIVERY'
        ? 'DELIVERED'
        : order.status === 'DELIVERED'
        ? 'CANCELLED'
        : 'ON_DELIVERY';

    updateOrderStatus(order.id, nextStatus);
    toast.success(`Đã chuyển trạng thái đơn hàng sang: ${nextStatus === 'DELIVERED' ? 'Đã giao' : nextStatus === 'CANCELLED' ? 'Đã hủy' : 'Đang giao'}`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200 pb-10">
      {/* Top Header: Order Code & Status + Status Update Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {order.code}
          </h2>
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
            {order.status === 'DELIVERED'
              ? 'Đã giao'
              : order.status === 'CANCELLED'
              ? 'Đã hủy'
              : 'Đang giao'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleUpdateStatus}
          className="px-4 py-2 rounded-xl border border-orange-300 dark:border-orange-800 bg-white dark:bg-slate-900 text-[#F97316] hover:bg-orange-50 dark:hover:bg-orange-950/30 text-xs font-bold transition-colors cursor-pointer shadow-xs"
        >
          Cập nhật trạng thái
        </button>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Thông tin khách hàng & Thông tin giao hàng */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
          {/* Thông tin khách hàng */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Thông tin khách hàng
            </h3>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {order.customerName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono text-slate-600 dark:text-slate-400">
                  {order.customerPhone}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{order.deliveryAddress}</span>
              </div>
              {order.note && (
                <div className="pt-1 text-[11px] text-slate-500 italic">
                  Ghi chú: {order.note}
                </div>
              )}
            </div>
          </div>

          {/* Thông tin giao hàng */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Thông tin giao hàng
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <span className="text-slate-400 block text-[11px]">Tài xế</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {order.driverName || 'Lê Văn Tài'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">SĐT tài xế</span>
                <span className="font-mono text-slate-900 dark:text-slate-100">
                  {order.driverPhone || '0908 765 432'}
                </span>
              </div>
            </div>

            {/* Google Maps Thumbnail */}
            <div className="pt-1">
              <GoogleMapPlaceholder
                height="h-44"
                distanceKm={order.distanceKm || 4.6}
                estimatedDurationMins={order.estimatedDurationMins || 16}
                centerAddress="208 Nguyễn Hữu Cảnh"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Chi tiết đơn hàng */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Chi tiết đơn hàng
          </h3>

          {/* Items List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                    alt={item.name}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">x{item.quantity}</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 shrink-0 font-mono">
                  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </div>
              </div>
            ))}
          </div>

          {/* Calculations */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Tạm tính</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono">
                {order.subtotal.toLocaleString('vi-VN')} đ
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Phí vận chuyển</span>
              <span className="font-semibold text-emerald-600 font-mono">
                {order.shippingFee.toLocaleString('vi-VN')} đ
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">Tổng cộng</span>
              <span className="text-base font-black text-rose-600 font-mono">
                {order.total.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Phương thức thanh toán</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {order.paymentMethod === 'CASH' ? 'Tiền mặt' : order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Thời gian đặt hàng</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {order.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            updateOrderStatus(order.id, 'CANCELLED');
            toast.error('Đã hủy đơn hàng');
          }}
          className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
        >
          Hủy đơn
        </button>

        <button
          type="button"
          onClick={() => setPrintModalOpen(true)}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl border border-orange-200 dark:border-orange-800 bg-white dark:bg-slate-900 text-[#F97316] dark:text-orange-400 text-xs font-bold hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>In hóa đơn</span>
        </button>

        <button
          type="button"
          onClick={() => {
            toast.success('Đã lưu thông tin đơn hàng');
            navigate('/orders');
          }}
          className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-colors cursor-pointer"
        >
          Lưu
        </button>
      </div>

      {/* Print Invoice Modal */}
      <PrintInvoiceModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        order={order}
      />
    </div>
  );
};
