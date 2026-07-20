export type OrderChannel = 'PHONE' | 'FACEBOOK' | 'ZALO' | 'MESSENGER' | 'WEBSITE' | 'POS';

export type OrderStatus = 
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'ON_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export type PaymentMethod = 'CASH' | 'ZALOPAY' | 'MOMOPAY' | 'BANK_TRANSFER' | 'CREDIT_CARD';
export type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: string[];
  note?: string;
}

export interface Order {
  id: string;
  code: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  customerLat?: number;
  customerLng?: number;
  branchId: string;
  branchName: string;
  channel: OrderChannel;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  voucherCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  distanceKm: number;
  estimatedDurationMins: number;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverLat?: number;
  driverLng?: number;
  note?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  addresses: {
    id: string;
    label: string;
    address: string;
    isDefault?: boolean;
    lat?: number;
    lng?: number;
  }[];
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  notes?: string;
  tier: 'REGULAR' | 'SILVER' | 'GOLD' | 'PLATINUM';
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  vehicleType: 'MOTORBIKE' | 'SCOOTER' | 'CAR';
  vehiclePlate: string;
  status: 'ONLINE' | 'BUSY' | 'OFFLINE';
  currentLat: number;
  currentLng: number;
  rating: number;
  completedDeliveriesToday: number;
  totalDeliveries: number;
  avgDeliveryMinutes: number;
  assignedBranchId?: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  lat: number;
  lng: number;
  isActive: boolean;
  deliveryRadiusKm: number;
  openingHours: string;
  activeOrdersCount: number;
  managerName: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  isAvailable: boolean;
  options?: {
    groupName: string;
    choices: { name: string; extraPrice: number }[];
  }[];
  rating: number;
  orderCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

export type ShippingRuleType = 'PER_KM' | 'DISTANCE_RANGE' | 'DISTRICT' | 'FREE_SHIPPING';

export interface ShippingRule {
  id: string;
  name: string;
  type: ShippingRuleType;
  isActive: boolean;
  baseFee: number;
  baseDistanceKm: number;
  perKmRate: number;
  freeShippingThreshold: number; // Order value threshold for free shipping
  minFee: number;
  maxFee: number;
  roundToNearest: number; // e.g. 1000 for VND
  distanceRanges?: {
    fromKm: number;
    toKm: number;
    fee: number;
  }[];
  districtFees?: {
    districtName: string;
    fee: number;
  }[];
}

export interface DashboardStats {
  revenueToday: number;
  revenueGrowthPercent: number;
  ordersToday: number;
  ordersGrowthPercent: number;
  avgDeliveryTimeMins: number;
  avgTimeImprovementMins: number;
  shippingRevenueToday: number;
  shippingRevenueGrowthPercent: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'ORDER' | 'DRIVER' | 'SYSTEM' | 'ALERT';
}
