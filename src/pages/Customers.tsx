import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SearchBox } from '@/components/common/SearchBox';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { Avatar } from '@/components/ui/Avatar';
import { useCustomerStore } from '@/stores/useCustomerStore';
import { useOrderStore } from '@/stores/useOrderStore';
import { Customer } from '@/types';
import { formatVND } from '@/utils/shippingCalculator';
import { Eye } from 'lucide-react';

export const Customers: React.FC = () => {
  const { customers } = useCustomerStore();
  const { orders } = useOrderStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  const customerOrders = orders.filter(
    (o) => selectedCustomer && o.customerPhone.replace(/\s+/g, '') === selectedCustomer.phone.replace(/\s+/g, '')
  );

  const columns: Column<Customer>[] = [
    {
      header: 'Khách hàng',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Avatar src={item.avatar} name={item.name} size="md" />
          <div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.name}</div>
            <div className="text-[11px] text-slate-400">{item.phone}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Hạng hội viên',
      cell: (item) => (
        <Badge
          variant={
            item.tier === 'PLATINUM'
              ? 'primary'
              : item.tier === 'GOLD'
              ? 'secondary'
              : item.tier === 'SILVER'
              ? 'info'
              : 'neutral'
          }
          size="sm"
        >
          {item.tier === 'PLATINUM' ? 'Bạch Kim' : item.tier === 'GOLD' ? 'Vàng' : item.tier === 'SILVER' ? 'Bạc' : 'Thường'}
        </Badge>
      ),
    },
    {
      header: 'Địa chỉ chính',
      cell: (item) => (
        <div className="max-w-xs truncate text-xs text-slate-600 dark:text-slate-300">
          {item.addresses[0]?.address || 'Chưa cập nhật'}
        </div>
      ),
    },
    {
      header: 'Tổng đơn hàng',
      cell: (item) => <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.totalOrders} đơn</span>,
    },
    {
      header: 'Tổng chi tiêu',
      cell: (item) => (
        <span className="font-extrabold text-xs text-[#F97316]">{formatVND(item.totalSpent)}</span>
      ),
    },
    {
      header: 'Đơn gần nhất',
      cell: (item) => <span className="text-xs text-slate-500">{item.lastOrderDate || 'Chưa có'}</span>,
    },
    {
      header: 'Thao tác',
      cell: (item) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedCustomerId(item.id)}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
        >
          Hồ sơ
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Danh bạ Khách hàng"
        subtitle="Quản lý thông tin khách hàng quen, sổ địa chỉ nhận hàng và lịch sử mua sắm."
      />

      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl soft-shadow">
        <div className="max-w-md">
          <SearchBox
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="Tìm theo tên, SĐT hoặc email..."
          />
        </div>
      </div>

      <Table columns={columns} data={filteredCustomers} keyExtractor={(item) => item.id} />

      {/* Customer Detail Drawer */}
      <Drawer
        isOpen={!!selectedCustomerId}
        onClose={() => setSelectedCustomerId(null)}
        title={`Hồ sơ Khách hàng: ${selectedCustomer?.name}`}
        subtitle="Sổ địa chỉ & lịch sử đơn hàng"
        width="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-900 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar src={selectedCustomer.avatar} name={selectedCustomer.name} size="lg" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{selectedCustomer.name}</h3>
                  <p className="text-xs text-slate-500">{selectedCustomer.phone}</p>
                </div>
              </div>
              <Badge variant="primary">THÀNH VIÊN {selectedCustomer.tier}</Badge>
            </div>

            {/* Address Book */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sổ địa chỉ giao hàng</h4>
              {selectedCustomer.addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs space-y-1 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>{addr.label}</span>
                    {addr.isDefault && <Badge variant="success" size="sm">Mặc định</Badge>}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{addr.address}</p>
                </div>
              ))}
            </div>

            {/* Order History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lịch sử Đặt món</h4>
              <div className="space-y-2">
                {customerOrders.length === 0 ? (
                  <div className="text-xs text-slate-400 py-4 text-center">Chưa có lịch sử đơn hàng.</div>
                ) : (
                  customerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex items-center justify-between text-xs border border-slate-100 dark:border-slate-800"
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100">{ord.code}</div>
                        <div className="text-[10px] text-slate-400">{ord.createdAt}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-[#F97316]">{formatVND(ord.total)}</div>
                        <Badge size="sm">{ord.status}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
