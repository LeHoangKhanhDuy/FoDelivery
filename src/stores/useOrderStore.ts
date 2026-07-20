import { create } from 'zustand';
import { Order, OrderStatus } from '@/types';
import { MOCK_ORDERS } from '@/constants/mockData';

interface OrderState {
  orders: Order[];
  selectedOrderId: string | null;
  searchQuery: string;
  statusFilter: OrderStatus | 'ALL';
  branchFilter: string;
  driverFilter: string;
  channelFilter: string;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  setSelectedOrderId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: OrderStatus | 'ALL') => void;
  setBranchFilter: (branchId: string) => void;
  setDriverFilter: (driverId: string) => void;
  setChannelFilter: (channel: string) => void;
  
  createOrder: (newOrder: Omit<Order, 'id' | 'code' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  assignDriver: (orderId: string, driverId: string, driverName: string, driverPhone: string) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: MOCK_ORDERS,
  selectedOrderId: null,
  searchQuery: '',
  statusFilter: 'ALL',
  branchFilter: 'ALL',
  driverFilter: 'ALL',
  channelFilter: 'ALL',

  setOrders: (orders) => set({ orders }),
  setSelectedOrderId: (selectedOrderId) => set({ selectedOrderId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setBranchFilter: (branchFilter) => set({ branchFilter }),
  setDriverFilter: (driverFilter) => set({ driverFilter }),
  setChannelFilter: (channelFilter) => set({ channelFilter }),

  createOrder: (orderData) => {
    const nextCodeNum = 89425 + get().orders.length;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      code: `FD-${nextCodeNum}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    set((state) => ({ orders: [newOrder, ...state.orders] }));
    return newOrder;
  },

  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((ord) =>
        ord.id === id
          ? {
              ...ord,
              status,
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
              ...(status === 'DELIVERED'
                ? { deliveredAt: new Date().toISOString().replace('T', ' ').substring(0, 16) }
                : {}),
            }
          : ord
      ),
    }));
  },

  assignDriver: (orderId, driverId, driverName, driverPhone) => {
    set((state) => ({
      orders: state.orders.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              driverId,
              driverName,
              driverPhone,
              status: ord.status === 'PREPARING' || ord.status === 'READY' ? 'ON_DELIVERY' : ord.status,
              updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            }
          : ord
      ),
    }));
  },
}));
