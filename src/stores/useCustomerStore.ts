import { create } from 'zustand';
import { Customer } from '@/types';
import { MOCK_CUSTOMERS } from '@/constants/mockData';

interface CustomerState {
  customers: Customer[];
  selectedCustomerId: string | null;

  // Actions
  setSelectedCustomerId: (id: string | null) => void;
  findCustomerByPhone: (phone: string) => Customer | undefined;
}

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: MOCK_CUSTOMERS,
  selectedCustomerId: null,

  setSelectedCustomerId: (selectedCustomerId) => set({ selectedCustomerId }),

  findCustomerByPhone: (phone) => {
    const cleanPhone = phone.replace(/\s+/g, '');
    return get().customers.find((c) => c.phone.replace(/\s+/g, '').includes(cleanPhone));
  },
}));
