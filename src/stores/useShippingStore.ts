import { create } from 'zustand';
import { ShippingRule } from '@/types';
import { MOCK_SHIPPING_RULES } from '@/constants/mockData';

interface ShippingState {
  rules: ShippingRule[];
  activeRuleId: string;
  
  // Actions
  setActiveRuleId: (id: string) => void;
  updateRule: (updatedRule: ShippingRule) => void;
}

export const useShippingStore = create<ShippingState>((set) => ({
  rules: MOCK_SHIPPING_RULES,
  activeRuleId: 'rule-standard',

  setActiveRuleId: (id) => {
    set((state) => ({
      activeRuleId: id,
      rules: state.rules.map((r) => ({ ...r, isActive: r.id === id })),
    }));
  },

  updateRule: (updatedRule) => {
    set((state) => ({
      rules: state.rules.map((r) => (r.id === updatedRule.id ? updatedRule : r)),
    }));
  },
}));
