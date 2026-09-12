import { create } from 'zustand';
import { OrderItem, Product, OrderChannel, PaymentMethod } from '@/types';

interface CartState {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  customerLat: number;
  customerLng: number;
  branchId: string;
  channel: OrderChannel;
  items: OrderItem[];
  voucherCode: string;
  discountAmount: number;
  paymentMethod: PaymentMethod;
  assignedDriverId: string;
  note: string;
  distanceKm: number;
  estimatedDurationMins: number;

  // Actions
  setCustomerInfo: (info: { name?: string; phone?: string; address?: string; lat?: number; lng?: number }) => void;
  setBranchId: (branchId: string) => void;
  setChannel: (channel: OrderChannel) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setAssignedDriverId: (driverId: string) => void;
  setNote: (note: string) => void;
  setDistance: (distanceKm: number, durationMins: number) => void;
  setVoucher: (code: string, discount: number) => void;

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemNote: (productId: string, note: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  customerName: 'Trần Minh Anh',
  customerPhone: '0901 234 567',
  deliveryAddress: '208 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
  customerLat: 10.79145,
  customerLng: 106.71982,
  branchId: 'b-1',
  channel: 'PHONE',
  items: [
    {
      id: 'cart-1',
      productId: 'p-rice-1',
      name: 'Cơm gà xối mỡ',
      price: 45000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cart-2',
      productId: 'p-milktea-1',
      name: 'Trà sữa truyền thống',
      price: 25000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'cart-3',
      productId: 'p-side-1',
      name: 'Chả giò hải sản',
      price: 35000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80',
    },
  ],
  voucherCode: '',
  discountAmount: 0,
  paymentMethod: 'CASH',
  assignedDriverId: 'd-tai',
  note: '',
  distanceKm: 4.6,
  estimatedDurationMins: 16,

  setCustomerInfo: (info) =>
    set((state) => ({
      customerName: info.name !== undefined ? info.name : state.customerName,
      customerPhone: info.phone !== undefined ? info.phone : state.customerPhone,
      deliveryAddress: info.address !== undefined ? info.address : state.deliveryAddress,
      customerLat: info.lat !== undefined ? info.lat : state.customerLat,
      customerLng: info.lng !== undefined ? info.lng : state.customerLng,
    })),

  setBranchId: (branchId) => set({ branchId }),
  setChannel: (channel) => set({ channel }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setAssignedDriverId: (assignedDriverId) => set({ assignedDriverId }),
  setNote: (note) => set({ note }),
  setDistance: (distanceKm, estimatedDurationMins) => set({ distanceKm, estimatedDurationMins }),
  
  setVoucher: (voucherCode, discountAmount) => set({ voucherCode, discountAmount }),

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: `item-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ],
      };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }));
      return;
    }
    set((state) => ({
      items: state.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    }));
  },

  updateItemNote: (productId, note) => {
    set((state) => ({
      items: state.items.map((i) => (i.productId === productId ? { ...i, note } : i)),
    }));
  },

  clearCart: () =>
    set({
      items: [],
      voucherCode: '',
      discountAmount: 0,
      note: '',
    }),
}));
