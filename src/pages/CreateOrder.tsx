import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SearchBox } from '@/components/common/SearchBox';
import { GoogleMapPlaceholder } from '@/components/maps/GoogleMapPlaceholder';
import { useCartStore } from '@/stores/useCartStore';
import { useCustomerStore } from '@/stores/useCustomerStore';
import { useBranchStore } from '@/stores/useBranchStore';
import { useMenuStore } from '@/stores/useMenuStore';
import { useShippingStore } from '@/stores/useShippingStore';
import { useDriverStore } from '@/stores/useDriverStore';
import { useOrderStore } from '@/stores/useOrderStore';
import { calculateShippingFee, formatVND } from '@/utils/shippingCalculator';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Phone,
  User,
  MapPin,
  Store,
  Navigation,
  Plus,
  Minus,
  Trash2,
  Tag,
  Bike,
  CheckCircle,
} from 'lucide-react';
import { OrderChannel, PaymentMethod } from '@/types';

export const CreateOrder: React.FC = () => {
  const navigate = useNavigate();

  // Stores
  const cart = useCartStore();
  const { findCustomerByPhone } = useCustomerStore();
  const branches = useBranchStore((state) => state.branches);
  const { products, categories } = useMenuStore();
  const { rules, activeRuleId } = useShippingStore();
  const drivers = useDriverStore((state) => state.drivers);
  const { createOrder } = useOrderStore();

  const activeBranch = branches.find((b) => b.id === cart.branchId) || branches[0];
  const activeShippingRule = rules.find((r) => r.id === activeRuleId) || rules[0];

  // Local states
  const [selectedCategory, setSelectedCategory] = useState('cat-1');
  const [menuSearch, setMenuSearch] = useState('');
  const [voucherInput, setVoucherInput] = useState('');

  // Handle phone lookup
  const handlePhoneChange = (phone: string) => {
    cart.setCustomerInfo({ phone });
    if (phone.length >= 8) {
      const existing = findCustomerByPhone(phone);
      if (existing) {
        cart.setCustomerInfo({
          name: existing.name,
          address: existing.addresses[0]?.address || cart.deliveryAddress,
        });
        toast.success(`Đã tìm thấy khách hàng quen: ${existing.name}`, { id: 'phone-lookup' });
      }
    }
  };

  // Address search simulation & distance recalculation
  const handleAddressChange = (address: string) => {
    cart.setCustomerInfo({ address });
    const simulatedKm = parseFloat((2.5 + (address.length % 7) * 0.8).toFixed(1));
    const simulatedMins = Math.round(simulatedKm * 5 + 8);
    cart.setDistance(simulatedKm, simulatedMins);
  };

  // Subtotal calculation
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Dynamic Shipping Fee Engine Calculation
  const { fee: calculatedShippingFee, breakdown: feeBreakdown } = calculateShippingFee(
    cart.distanceKm,
    subtotal,
    activeShippingRule
  );

  const grandTotal = Math.max(0, subtotal + calculatedShippingFee - cart.discountAmount);

  // Filter products by category & search
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'cat-1' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyVoucher = () => {
    if (voucherInput.toUpperCase() === 'FODELIVERY30') {
      cart.setVoucher('FODELIVERY30', 30000);
      toast.success('Đã áp dụng Voucher: -30.000 VNĐ');
    } else if (voucherInput.toUpperCase() === 'FREESHIP') {
      cart.setVoucher('FREESHIP', calculatedShippingFee);
      toast.success('Đã áp dụng Mã Miễn Phí Vận Chuyển');
    } else {
      toast.error('Mã giảm giá không hợp lệ. Thử "FODELIVERY30"');
    }
  };

  const handleCreateOrder = () => {
    if (cart.items.length === 0) {
      toast.error('Giỏ hàng đang trống! Vui lòng chọn món ăn.');
      return;
    }
    if (!cart.customerName || !cart.customerPhone || !cart.deliveryAddress) {
      toast.error('Vui lòng điền đầy đủ Tên, SĐT và Địa chỉ giao hàng.');
      return;
    }

    const assignedDriver = drivers.find((d) => d.id === cart.assignedDriverId);

    const newOrder = createOrder({
      customerName: cart.customerName,
      customerPhone: cart.customerPhone,
      deliveryAddress: cart.deliveryAddress,
      customerLat: cart.customerLat,
      customerLng: cart.customerLng,
      branchId: cart.branchId,
      branchName: activeBranch.name,
      channel: cart.channel,
      status: 'PREPARING',
      items: cart.items,
      subtotal,
      discount: cart.discountAmount,
      voucherCode: cart.voucherCode,
      shippingFee: calculatedShippingFee,
      tax: 0,
      total: grandTotal,
      paymentMethod: cart.paymentMethod,
      paymentStatus: cart.paymentMethod === 'CASH' ? 'UNPAID' : 'PAID',
      distanceKm: cart.distanceKm,
      estimatedDurationMins: cart.estimatedDurationMins,
      driverId: cart.assignedDriverId,
      driverName: assignedDriver?.name,
      driverPhone: assignedDriver?.phone,
      note: cart.note,
    });

    cart.clearCart();
    toast.success(`Đã tạo đơn hàng thành công #${newOrder.code}!`);
    navigate(`/orders/${newOrder.id}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Tạo đơn hàng mới (POS Giao hàng Express)"
        subtitle="Giao diện POS 3 cột tích hợp định vị Google Maps & thuật toán tính phí ship tự động."
      />

      {/* 3 Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Customer Information & Delivery Settings */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-4">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <User className="w-4 h-4 text-[#F97316]" />
              Thông tin Khách hàng & Giao hàng
            </h3>

            <Select
              label="Kênh Đặt Hàng"
              value={cart.channel}
              onChange={(e) => cart.setChannel(e.target.value as OrderChannel)}
              options={[
                { value: 'PHONE', label: '📞 Điện thoại (Phone)' },
                { value: 'FACEBOOK', label: '💬 Facebook Messenger' },
                { value: 'ZALO', label: '📱 Zalo OA' },
                { value: 'WEBSITE', label: '🌐 Website đặt món' },
                { value: 'POS', label: '🏬 Trực tiếp tại quầy' },
              ]}
            />

            <Input
              label="Số điện thoại Khách hàng"
              value={cart.customerPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="Ví dụ: 0988 123 456"
              leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Tên Khách hàng"
              value={cart.customerName}
              onChange={(e) => cart.setCustomerInfo({ name: e.target.value })}
              placeholder="Nhập họ tên khách hàng"
              leftIcon={<User className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Địa chỉ Giao hàng (Tìm qua Google)"
              value={cart.deliveryAddress}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Nhập địa chỉ nhận món..."
              leftIcon={<MapPin className="w-4 h-4 text-rose-500" />}
              helperText="Khoảng cách tự động cập nhật phí ship."
            />

            <Select
              label="Chọn Chi nhánh Giao"
              value={cart.branchId}
              onChange={(e) => cart.setBranchId(e.target.value)}
              options={branches.map((b) => ({
                value: b.id,
                label: `${b.name} (${b.district})`,
              }))}
              icon={<Store className="w-4 h-4 text-slate-400" />}
            />

            <div className="p-3 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-900 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-[#F97316]" />
                <span>Khoảng cách: <strong className="text-[#F97316]">{cart.distanceKm} km</strong></span>
              </div>
              <div>Thời gian: <strong className="text-emerald-600">{cart.estimatedDurationMins} phút</strong></div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Ghi chú Đơn hàng</label>
              <textarea
                value={cart.note}
                onChange={(e) => cart.setNote(e.target.value)}
                placeholder="Ví dụ: Ăn cay nhiều, gọi trước khi giao"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-[#F97316]"
                rows={2}
              />
            </div>
          </Card>
        </div>

        {/* ========================================================= */}
        {/* CENTER COLUMN: Food Categories & Menu Catalog */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 xl:col-span-5 space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Thực đơn Món ăn</h3>
              <div className="w-44 sm:w-52">
                <SearchBox
                  value={menuSearch}
                  onChange={(val) => setMenuSearch(val)}
                  placeholder="Tìm món..."
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = cat.id === selectedCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#F97316] text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredProducts.map((product) => {
                const inCart = cart.items.find((i) => i.productId === product.id);
                return (
                  <div
                    key={product.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between hover:border-orange-300 transition-all group"
                  >
                    <div className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                          {product.description}
                        </p>
                        <div className="mt-1 font-extrabold text-xs text-[#F97316]">
                          {formatVND(product.price)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-semibold">★ {product.rating}</span>
                      {inCart ? (
                        <div className="flex items-center gap-1.5 bg-orange-100 text-[#F97316] px-2 py-1 rounded-lg">
                          <button onClick={() => cart.updateQuantity(product.id, inCart.quantity - 1)}>
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold px-1">{inCart.quantity}</span>
                          <button onClick={() => cart.addItem(product)}>
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          leftIcon={<Plus className="w-3.5 h-3.5" />}
                          onClick={() => cart.addItem(product)}
                        >
                          Thêm
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Live Cart, Shipping Engine, Map & Summary */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span>Giỏ hàng & Thanh toán</span>
              <span className="text-xs font-normal text-slate-400">{cart.items.length} món</span>
            </h3>

            {/* Cart Items List */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {cart.items.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">Giỏ hàng trống. Chọn món từ danh mục.</div>
              ) : (
                cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{formatVND(item.price)} mỗi món</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-md">
                        <button onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}>
                          <Minus className="w-3 h-3 text-slate-500" />
                        </button>
                        <span className="font-bold px-1">{item.quantity}</span>
                        <button onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}>
                          <Plus className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.removeItem(item.productId)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Voucher Input */}
            <div className="flex gap-2">
              <Input
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
                placeholder="Mã Voucher (FODELIVERY30)"
                leftIcon={<Tag className="w-3.5 h-3.5 text-slate-400" />}
              />
              <Button variant="outline" size="sm" onClick={handleApplyVoucher}>
                Áp dụng
              </Button>
            </div>

            {/* Financial Breakdown & Shipping Fee Engine Readout */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs border border-slate-200/80 dark:border-slate-800">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tạm tính món</span>
                <span className="font-semibold">{formatVND(subtotal)}</span>
              </div>

              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <div>
                  <span className="font-semibold">Phí giao hàng</span>
                  <p className="text-[10px] text-slate-400 leading-tight">{feeBreakdown}</p>
                </div>
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  {calculatedShippingFee === 0 ? 'MIỄN PHÍ' : formatVND(calculatedShippingFee)}
                </span>
              </div>

              {cart.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Giảm giá</span>
                  <span>-{formatVND(cart.discountAmount)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Tổng thanh toán</span>
                <span className="font-black text-lg text-[#F97316]">{formatVND(grandTotal)}</span>
              </div>
            </div>

            {/* Google Map Route Preview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Bản đồ Đường đi Google Maps</label>
              <GoogleMapPlaceholder
                height="h-36"
                distanceKm={cart.distanceKm}
                estimatedDurationMins={cart.estimatedDurationMins}
                centerAddress={cart.deliveryAddress}
              />
            </div>

            {/* Driver & Payment Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Select
                label="Gán Tài xế Giao"
                value={cart.assignedDriverId}
                onChange={(e) => cart.setAssignedDriverId(e.target.value)}
                options={drivers.map((d) => ({ value: d.id, label: d.name }))}
                icon={<Bike className="w-4 h-4 text-slate-400" />}
              />

              <Select
                label="Phương thức Thanh toán"
                value={cart.paymentMethod}
                onChange={(e) => cart.setPaymentMethod(e.target.value as PaymentMethod)}
                options={[
                  { value: 'CASH', label: '💵 Tiền mặt (COD)' },
                  { value: 'ZALOPAY', label: '📱 ZaloPay' },
                  { value: 'MOMOPAY', label: '🟣 Ví MoMo' },
                  { value: 'BANK_TRANSFER', label: '🏦 Chuyển khoản' },
                ]}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" className="w-1/3" onClick={() => toast.success('Đã lưu bản nháp')}>
                Lưu nháp
              </Button>
              <Button
                variant="primary"
                className="w-2/3"
                onClick={handleCreateOrder}
                leftIcon={<CheckCircle className="w-4 h-4" />}
              >
                Tạo Đơn Hàng
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
