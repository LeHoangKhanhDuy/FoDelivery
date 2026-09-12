import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrintInvoiceModal } from '@/components/common/PrintInvoiceModal';
import { useOrderStore } from '@/stores/useOrderStore';
import { Order, OrderStatus } from '@/types';
import {
  Search,
  Calendar,
  ChevronDown,
  Plus,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrderStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [dateRange, setDateRange] = useState('01/05/2024 - 31/05/2024');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<Order | null>(null);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        searchQuery === '' ||
        ord.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customerPhone.includes(searchQuery);

      const matchesStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'ON_DELIVERY' && ord.status === 'ON_DELIVERY') ||
        (selectedStatus === 'DELIVERED' && ord.status === 'DELIVERED') ||
        (selectedStatus === 'CANCELLED' && ord.status === 'CANCELLED');

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatus]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'ON_DELIVERY':
      case 'PREPARING':
      case 'READY':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
            Đang giao
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            Đã giao
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Chờ xử lý
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200 pb-10">
      {/* Top Filter & Actions Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[300px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm đơn hàng, sđt, tên khách..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>

          {/* Date Picker Range Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none px-3 py-2 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 focus:outline-none focus:border-[#F97316] cursor-pointer"
            >
              <option value="ALL">Trạng thái (Tất cả)</option>
              <option value="ON_DELIVERY">Đang giao</option>
              <option value="DELIVERED">Đã giao</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Create Order Button */}
        <button
          type="button"
          onClick={() => navigate('/orders/new')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-sm shadow-orange-500/20 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo đơn mới</span>
        </button>
      </div>

      {/* Orders Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200/80 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Mã đơn</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">SĐT</th>
                <th className="py-3 px-4">Tổng tiền</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Tài xế</th>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {paginatedOrders.map((ord) => (
                <tr
                  key={ord.id}
                  onClick={() => navigate(`/orders/${ord.id}`)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  {/* Mã đơn */}
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {ord.code}
                  </td>

                  {/* Khách hàng */}
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {ord.customerName}
                  </td>

                  {/* SĐT */}
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400">
                    {ord.customerPhone}
                  </td>

                  {/* Tổng tiền */}
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    {ord.total.toLocaleString('vi-VN')} đ
                  </td>

                  {/* Trạng thái */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(ord.status)}
                  </td>

                  {/* Tài xế */}
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {ord.driverName || '-'}
                  </td>

                  {/* Thời gian */}
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">
                    {ord.createdAt}
                  </td>

                  {/* Thao tác */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/orders/${ord.id}`);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrderForPrint(ord);
                        }}
                        className="p-1.5 text-slate-400 hover:text-[#F97316] transition-colors cursor-pointer"
                        title="In hóa đơn"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Hiển thị 1 - {paginatedOrders.length} của {filteredOrders.length} đơn hàng
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Print Invoice Modal */}
      <PrintInvoiceModal
        isOpen={!!selectedOrderForPrint}
        onClose={() => setSelectedOrderForPrint(null)}
        order={selectedOrderForPrint}
      />
    </div>
  );
};
