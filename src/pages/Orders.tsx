import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchBox } from '@/components/common/SearchBox';
import { Tabs } from '@/components/ui/Tabs';
import { Select } from '@/components/ui/Select';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { Pagination } from '@/components/ui/Pagination';
import { useOrderStore } from '@/stores/useOrderStore';
import { useBranchStore } from '@/stores/useBranchStore';
import { useDriverStore } from '@/stores/useDriverStore';
import { Order, OrderStatus } from '@/types';
import { formatVND } from '@/utils/shippingCalculator';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Eye, User, Phone, MapPin } from 'lucide-react';

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const { orders, updateOrderStatus } = useOrderStore();
  const branches = useBranchStore((state) => state.branches);
  const drivers = useDriverStore((state) => state.drivers);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeTab, setActiveTab] = useState<OrderStatus | 'ALL'>('ALL');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedDriver, setSelectedDriver] = useState('ALL');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewOrderId, setPreviewOrderId] = useState<string | null>(null);

  // Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        searchQuery === '' ||
        ord.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerPhone.includes(searchQuery) ||
        ord.deliveryAddress.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = activeTab === 'ALL' || ord.status === activeTab;
      const matchesBranch = selectedBranch === 'ALL' || ord.branchId === selectedBranch;
      const matchesDriver = selectedDriver === 'ALL' || ord.driverId === selectedDriver;
      const matchesChannel = selectedChannel === 'ALL' || ord.channel === selectedChannel;

      return matchesSearch && matchesStatus && matchesBranch && matchesDriver && matchesChannel;
    });
  }, [orders, searchQuery, activeTab, selectedBranch, selectedDriver, selectedChannel]);

  // Pagination logic
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const previewOrder = orders.find((o) => o.id === previewOrderId);

  const statusTabs = [
    { id: 'ALL', label: 'Tất cả đơn hàng', count: orders.length },
    { id: 'PENDING', label: 'Chờ xử lý', count: orders.filter((o) => o.status === 'PENDING').length },
    { id: 'PREPARING', label: 'Đang chế biến', count: orders.filter((o) => o.status === 'PREPARING').length },
    { id: 'READY', label: 'Sẵn sàng giao', count: orders.filter((o) => o.status === 'READY').length },
    { id: 'ON_DELIVERY', label: 'Đang giao hàng', count: orders.filter((o) => o.status === 'ON_DELIVERY').length },
    { id: 'DELIVERED', label: 'Hoàn thành', count: orders.filter((o) => o.status === 'DELIVERED').length },
  ];

  const getStatusBadgeVariant = (status: OrderStatus) => {
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

  const getStatusLabel = (status: OrderStatus) => {
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

  const columns: Column<Order>[] = [
    {
      header: 'Mã đơn hàng',
      accessor: 'code',
      cell: (item) => (
        <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>{item.code}</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
            {item.channel}
          </span>
        </div>
      ),
    },
    {
      header: 'Khách hàng',
      cell: (item) => (
        <div>
          <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.customerName}</div>
          <div className="text-[11px] text-slate-400">{item.customerPhone}</div>
        </div>
      ),
    },
    {
      header: 'Địa chỉ giao hàng',
      cell: (item) => (
        <div className="max-w-xs truncate text-xs text-slate-600 dark:text-slate-300" title={item.deliveryAddress}>
          {item.deliveryAddress}
        </div>
      ),
    },
    {
      header: 'Chi nhánh',
      cell: (item) => <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{item.branchName}</span>,
    },
    {
      header: 'Tài xế',
      cell: (item) =>
        item.driverName ? (
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.driverName}</div>
        ) : (
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Chưa gán</span>
        ),
    },
    {
      header: 'Tổng tiền',
      cell: (item) => (
        <div>
          <div className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{formatVND(item.total)}</div>
          <div className="text-[10px] text-slate-400">Ship: {formatVND(item.shippingFee)}</div>
        </div>
      ),
    },
    {
      header: 'Trạng thái',
      cell: (item) => (
        <Badge variant={getStatusBadgeVariant(item.status)} size="sm">
          {getStatusLabel(item.status)}
        </Badge>
      ),
    },
    {
      header: 'Thao tác',
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setPreviewOrderId(item.id);
            }}
          >
            <Eye className="w-4 h-4 text-slate-500" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/orders/${item.id}`);
            }}
          >
            Chi tiết
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Quản lý Đơn hàng Đa kênh"
        subtitle="Lọc, theo dõi tiến độ và xử lý đơn hàng giao từ Phone, Facebook, Zalo, Website."
        action={
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/orders/new')}
          >
            Tạo đơn mới
          </Button>
        }
      />

      {/* Status Filter Tabs */}
      <Tabs
        tabs={statusTabs}
        activeTabId={activeTab}
        onTabChange={(id) => {
          setActiveTab(id as OrderStatus | 'ALL');
          setCurrentPage(1);
        }}
        variant="underline"
      />

      {/* Advanced Search & Filter Controls */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl soft-shadow space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <SearchBox
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder="Tìm mã đơn, SĐT, địa chỉ..."
          />

          <Select
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'ALL', label: 'Tất cả Chi nhánh' },
              ...branches.map((b) => ({ value: b.id, label: b.name })),
            ]}
          />

          <Select
            value={selectedDriver}
            onChange={(e) => {
              setSelectedDriver(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'ALL', label: 'Tất cả Tài xế' },
              ...drivers.map((d) => ({ value: d.id, label: d.name })),
            ]}
          />

          <Select
            value={selectedChannel}
            onChange={(e) => {
              setSelectedChannel(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { value: 'ALL', label: 'Tất cả Kênh' },
              { value: 'PHONE', label: 'Gọi điện (Phone)' },
              { value: 'FACEBOOK', label: 'Facebook Messenger' },
              { value: 'ZALO', label: 'Zalo OA' },
              { value: 'WEBSITE', label: 'Website' },
              { value: 'POS', label: 'Quầy POS' },
            ]}
          />
        </div>
      </div>

      {/* Orders Table */}
      <Table
        columns={columns}
        data={paginatedOrders}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => navigate(`/orders/${item.id}`)}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
      />

      {/* Quick View Drawer */}
      <Drawer
        isOpen={!!previewOrderId}
        onClose={() => setPreviewOrderId(null)}
        title={`Xem nhanh đơn hàng - ${previewOrder?.code}`}
        subtitle="Tổng quan chi tiết & điều phối nhanh"
        width="lg"
      >
        {previewOrder && (
          <div className="space-y-6">
            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-900 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#F97316]">Trạng thái hiện tại</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={getStatusBadgeVariant(previewOrder.status)}>
                    {getStatusLabel(previewOrder.status)}
                  </Badge>
                  <span className="text-xs text-slate-500">• Kênh: {previewOrder.channel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {previewOrder.status === 'PENDING' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateOrderStatus(previewOrder.id, 'PREPARING')}
                  >
                    Duyệt nhận đơn
                  </Button>
                )}
                {previewOrder.status === 'PREPARING' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateOrderStatus(previewOrder.id, 'READY')}
                  >
                    Báo Chế biến xong
                  </Button>
                )}
                {previewOrder.status === 'READY' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateOrderStatus(previewOrder.id, 'ON_DELIVERY')}
                  >
                    Gán giao hàng
                  </Button>
                )}
              </div>
            </div>

            {/* Customer & Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin Khách hàng</h4>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                  <User className="w-4 h-4 text-[#F97316]" /> {previewOrder.customerName}
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Phone className="w-4 h-4 text-slate-400" /> {previewOrder.customerPhone}
                </div>
                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> {previewOrder.deliveryAddress}
                </div>
              </div>
            </div>

            {/* Itemized Cart */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Danh sách Món đặt</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {previewOrder.items.map((item) => (
                  <div key={item.id} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />}
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100">{item.name}</div>
                        <div className="text-slate-400">SL: {item.quantity} × {formatVND(item.price)}</div>
                      </div>
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-slate-100">
                      {formatVND(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 text-xs border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tiền món ăn</span>
                <span>{formatVND(previewOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Phí giao hàng ({previewOrder.distanceKm} km)</span>
                <span>{formatVND(previewOrder.shippingFee)}</span>
              </div>
              {previewOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Giảm giá ({previewOrder.voucherCode})</span>
                  <span>-{formatVND(previewOrder.discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-black text-sm text-slate-900 dark:text-slate-100">
                <span>Tổng cộng thanh toán</span>
                <span className="text-[#F97316]">{formatVND(previewOrder.total)}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPreviewOrderId(null);
                navigate(`/orders/${previewOrder.id}`);
              }}
            >
              Trang Chi tiết Đơn hàng đầy đủ
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};
