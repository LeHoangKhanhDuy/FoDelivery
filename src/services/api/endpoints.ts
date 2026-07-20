export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
    ASSIGN_DRIVER: (id: string) => `/orders/${id}/assign-driver`,
  },
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
    SEARCH_PHONE: '/customers/search-phone',
  },
  DRIVERS: {
    LIST: '/drivers',
    DETAIL: (id: string) => `/drivers/${id}`,
    UPDATE_STATUS: (id: string) => `/drivers/${id}/status`,
  },
  BRANCHES: {
    LIST: '/branches',
    DETAIL: (id: string) => `/branches/${id}`,
  },
  PRODUCTS: {
    LIST: '/products',
    CATEGORIES: '/categories',
  },
  SHIPPING: {
    RULES: '/shipping/rules',
    CALCULATE_FEE: '/shipping/calculate',
  },
  REPORTS: {
    DASHBOARD: '/reports/dashboard',
    REVENUE: '/reports/revenue',
  },
};
