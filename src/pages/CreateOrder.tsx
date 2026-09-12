import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMapPlaceholder } from '@/components/maps/GoogleMapPlaceholder';
import { PrintInvoiceModal } from '@/components/common/PrintInvoiceModal';
import { useCartStore } from '@/stores/useCartStore';
import { useCustomerStore } from '@/stores/useCustomerStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { useDriverStore } from '@/stores/useDriverStore';
import { useOrderStore } from '@/stores/useOrderStore';
import { formatVND } from '@/utils/shippingCalculator';
import { Order } from '@/types';
import toast from 'react-hot-toast';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  X,
  MapPin,
  ChevronDown,
} from 'lucide-react';

export const CreateOrder: React.FC = () => {
  const navigate = useNavigate();

  // Stores
  const cart = useCartStore();
  const { findCustomerByPhone } = useCustomerStore();
  const { products, categories } = useMenuStore();
  const drivers = useDriverStore((state) => state.drivers);
  const { createOrder } = useOrderStore();

  // Local states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuSearch, setMenuSearch] = useState('');
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [createdOrderForPrint, setCreatedOrderForPrint] = useState<Order | null>(null);

  // Selected driver
  const assignedDriver =
    drivers.find((d) => d.id === cart.assignedDriverId) ||
    drivers.find((d) => d.name === 'Lê Văn Tài') ||
    drivers[0];

  // Handle phone lookup
  const handlePhoneChange = (phone: string) => {
    cart.setCustomerInfo({ phone });
    if (phone.length >= 9) {
      const existing = findCustomerByPhone(phone);
      if (existing) {
        cart.setCustomerInfo({
          name: existing.name,
          address: existing.addresses[0]?.address || cart.deliveryAddress,
        });
        toast.success(`Đã nhận diện khách quen: ${existing.name}`, { id: 'phone-lookup' });
      }
    }
  };

  // Subtotal & Shipping Calculation
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 26000; // 4.6km rule: 2km free, 10k/km for next 2.6km = 26.000đ
  const grandTotal = Math.max(0, subtotal + shippingFee - cart.discountAmount);

  // Filter products by category & search
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateOrderAndPrint = (shouldPrint: boolean = true) => {
    if (cart.items.length === 0) {
      toast.error('Vui lòng chọn ít nhất một món ăn!');
      return;
    }
    if (!cart.customerName.trim() || !cart.customerPhone.trim() || !cart.deliveryAddress.trim()) {
      toast.error('Vui lòng điền đầy đủ Tên, SĐT và Địa chỉ nhận hàng.');
      return;
    }

    const newOrder = createOrder({
      customerName: cart.customerName,
      customerPhone: cart.customerPhone,
      deliveryAddress: cart.deliveryAddress,
      customerLat: cart.customerLat,
      customerLng: cart.customerLng,
      branchId: 'b-1',
      branchName: 'Cửa hàng (Vị trí của bạn)',
      channel: cart.channel,
      status: 'ON_DELIVERY',
      items: cart.items,
      subtotal,
      discount: cart.discountAmount,
      shippingFee,
      tax: 0,
      total: grandTotal,
      paymentMethod: 'CASH',
      paymentStatus: 'UNPAID',
      distanceKm: 4.6,
      estimatedDurationMins: 16,
      driverId: assignedDriver.id,
      driverName: assignedDriver.name,
      driverPhone: assignedDriver.phone,
      note: cart.note,
    });

    toast.success(`Đã tạo thành công đơn hàng ${newOrder.code}!`);

    if (shouldPrint) {
      setCreatedOrderForPrint(newOrder);
      setPrintModalOpen(true);
    } else {
      navigate(`/orders/${newOrder.id}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-10">
      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ========================================================= */}
        {/* COLUMN 1: 1. Thông tin khách hàng */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            1. Thông tin khách hàng
          </h3>

          {/* Họ tên */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Họ tên <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={cart.customerName}
              onChange={(e) => cart.setCustomerInfo({ name: e.target.value })}
              placeholder="Nhập họ tên khách hàng"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>

          {/* Số điện thoại */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Số điện thoại <span className="text-rose-500 font-bold">*</span>
            </label>
            <input
              type="text"
              value={cart.customerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="Nhập số điện thoại"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>

          {/* Địa chỉ nhận hàng */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Địa chỉ nhận hàng <span className="text-rose-500 font-bold">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={cart.deliveryAddress}
                onChange={(e) => cart.setCustomerInfo({ address: e.target.value })}
                placeholder="Nhập địa chỉ giao hàng"
                className="w-full pl-3 pr-16 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] transition-colors"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-400">
                {cart.deliveryAddress && (
                  <button
                    type="button"
                    onClick={() => cart.setCustomerInfo({ address: '' })}
                    className="p-1 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Ghi chú */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Ghi chú
            </label>
            <div className="relative">
              <textarea
                value={cart.note}
                onChange={(e) => cart.setNote(e.target.value)}
                maxLength={200}
                placeholder="VD: Không cay, thêm ớt, giao trước 12h..."
                rows={3}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] transition-colors resize-none pb-6"
              />
              <span className="absolute right-2.5 bottom-2 text-[10px] text-slate-400 select-none">
                {cart.note.length}/200
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2: 2. Chọn món */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            2. Chọn món
          </h3>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="Tìm món..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>

          {/* Body: Categories (Left) + Food list (Middle) + Cart (Right) */}
          <div className="grid grid-cols-12 gap-3 pt-1">
            {/* Category Vertical Pills */}
            <div className="col-span-3 space-y-1 pr-1 border-r border-slate-100 dark:border-slate-800">
              {categories.map((cat) => {
                const isActive = cat.id === selectedCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer block ${
                      isActive
                        ? 'bg-orange-50 text-[#F97316] dark:bg-orange-950/40 dark:text-orange-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Food Items List */}
            <div className="col-span-5 space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2 group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {p.price.toLocaleString('vi-VN')} đ
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      cart.addItem(p);
                      toast.success(`Đã thêm ${p.name}`, { id: 'add-item' });
                    }}
                    className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600 hover:border-[#F97316] hover:text-[#F97316] text-slate-400 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    title="Thêm vào đơn"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Right Sub-Column: Đơn hàng (X món) */}
            <div className="col-span-4 border-l border-slate-100 dark:border-slate-800 pl-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">
                  Đơn hàng ({cart.items.length} món)
                </h4>

                {/* Selected items list */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {cart.items.length === 0 ? (
                    <div className="text-[11px] text-slate-400 italic py-6 text-center">
                      Chưa có món nào được chọn
                    </div>
                  ) : (
                    cart.items.map((item) => (
                      <div key={item.id} className="space-y-1">
                        <div className="flex items-start justify-between gap-1">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {item.name}
                            </p>
                            <span className="text-[11px] text-slate-400">x{item.quantity}</span>
                          </div>
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 shrink-0">
                            {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                          </span>
                        </div>
                        {/* Inline quantity buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}
                            className="p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}
                            className="p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => cart.removeItem(item.productId)}
                            className="p-0.5 text-slate-400 hover:text-rose-500 cursor-pointer ml-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {subtotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-emerald-600">
                    {shippingFee.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">Tổng cộng</span>
                  <span className="text-base font-black text-rose-600">
                    {grandTotal.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 3: 3. Thông tin giao hàng */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            3. Thông tin giao hàng
          </h3>

          {/* Google Maps Route Card */}
          <GoogleMapPlaceholder
            height="h-52"
            distanceKm={4.6}
            estimatedDurationMins={16}
            centerAddress="208 Nguyễn Hữu Cảnh"
          />

          {/* Shipping fee & Policy note */}
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Phí ship
              </span>
              <span className="text-base font-black text-emerald-600">
                {shippingFee.toLocaleString('vi-VN')} đ
              </span>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium">
              Miễn phí trong bán kính 2km, tính 10.000 đ / km từ km thứ 2
            </p>
          </div>

          {/* Driver Selection & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tên tài xế <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  value={cart.assignedDriverId}
                  onChange={(e) => cart.setAssignedDriverId(e.target.value)}
                  className="w-full appearance-none px-3 py-2 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:border-[#F97316] transition-colors cursor-pointer"
                >
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Số điện thoại tài xế
              </label>
              <input
                type="text"
                readOnly
                value={assignedDriver.phone}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 select-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate('/orders')}
          className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
        >
          Hủy
        </button>

        <button
          type="button"
          onClick={() => {
            toast.success('Đã lưu bản nháp thành công!');
          }}
          className="px-6 py-2.5 rounded-xl border border-orange-200 dark:border-orange-800 bg-white dark:bg-slate-900 text-[#F97316] dark:text-orange-400 text-xs font-semibold hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors cursor-pointer shadow-xs"
        >
          Lưu nháp
        </button>

        <button
          type="button"
          onClick={() => handleCreateOrderAndPrint(true)}
          className="px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer active:scale-98"
        >
          Tạo đơn và in
        </button>
      </div>

      {/* Print Invoice Modal */}
      <PrintInvoiceModal
        isOpen={printModalOpen}
        onClose={() => {
          setPrintModalOpen(false);
          if (createdOrderForPrint) {
            navigate(`/orders/${createdOrderForPrint.id}`);
          }
        }}
        order={createdOrderForPrint}
      />
    </div>
  );
};
