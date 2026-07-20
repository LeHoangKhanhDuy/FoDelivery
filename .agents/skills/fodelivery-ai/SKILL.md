---
name: fodelivery-ai
description: Core operational knowledge, architecture guidelines, state stores, dynamic shipping fee engine rules, and UI component standards for FoDelivery AI SaaS Delivery Management System.
---

# FoDelivery AI Skill Specification & Operational Guidelines

This skill provides architectural patterns, state store usage, shipping fee calculation rules, and UI component standards for extending and maintaining **FoDelivery AI** - SaaS Delivery Management & POS System.

---

## 1. Core Technology Stack & Rules

- **Framework**: React 19 + TypeScript + Vite.
- **Styling**: TailwindCSS v4 with `@variant dark (&:where(.dark, .dark *));` in `src/styles/globals.css`.
- **Primary Color Token**: `#F97316` (Orange primary), `#FB923C` (Secondary), `#F8FAFC` (Canvas background), `#FFFFFF` / `#1E293B` (Cards).
- **State Management**: Zustand stores in `src/stores/`.
- **Language Policy**: 100% Vietnamese user-facing labels, status text, and toast notifications.
- **Layout Rule**: Wide fluid layout with `max-w-[1700px] w-full mx-auto` in `MainLayout.tsx`.

---

## 2. Zustand Store Architecture

All global states must be managed through specialized Zustand stores:

1. `useOrderStore`: Orders list, status updates (`updateOrderStatus`), driver assignment (`assignDriver`), and order creation (`createOrder`).
2. `useCartStore`: POS 3-column cart state, customer info, address geocoding, item quantities, voucher discounts, and assigned driver.
3. `useShippingStore`: Active shipping rule strategies (`PER_KM`, `DISTANCE_RANGE`, `DISTRICT`, `FREE_SHIPPING`) and rule parameter updates.
4. `useBranchStore`: Branch locations, operational status toggle, and delivery radius slider (`updateBranchRadius`).
5. `useDriverStore`: Fleet status management (`ONLINE`, `BUSY`, `OFFLINE`) and rating statistics.
6. `useCustomerStore`: Customer records, address books, and phone auto-lookup.
7. `useMenuStore`: Food items catalog, category filter, and stock availability toggling (`toggleProductStock`).

---

## 3. Shipping Fee Calculation Engine

Fee calculations MUST use `calculateShippingFee(distanceKm, subtotal, rule)` from `@/utils/shippingCalculator`:

```typescript
export function calculateShippingFee(
  distanceKm: number,
  subtotal: number,
  rule: ShippingRule
): { fee: number; isFree: boolean; breakdown: string }
```

- **Free Shipping Threshold**: If `rule.freeShippingThreshold > 0` and `subtotal >= threshold`, return `fee: 0, isFree: true`.
- **Per KM Rule**: `rawFee = baseFee + Math.max(0, distanceKm - baseDistanceKm) * perKmRate`.
- **Min/Max Capping**: Clamp result between `rule.minFee` and `rule.maxFee`.
- **Rounding**: Round fee to nearest `rule.roundToNearest` (e.g., 1,000 VND).

---

## 4. Component Standards

- **Buttons**: Use `@/components/ui/Button` with variants (`primary`, `secondary`, `outline`, `ghost`, `danger`).
- **Cards**: Use `@/components/ui/Card` with `rounded-2xl` and `soft-shadow`.
- **Modals & Drawers**: Use `@/components/ui/Modal` or `@/components/ui/Drawer` backed by Framer Motion.
- **Maps**: Use `@/components/maps/GoogleMapPlaceholder` for simulated Google Maps routes, markers, and delivery radius overlays.
- **Formatters**: Always format currency using `formatVND(amount)` (returns `129.000 VNĐ`).

---

## 5. Order Status Lifecycles

`PENDING` -> `PREPARING` -> `READY` -> `ON_DELIVERY` -> `DELIVERED` (or `CANCELLED`).
Vietnamese Status Labels:
- `PENDING`: Chờ xử lý
- `PREPARING`: Đang chế biến
- `READY`: Sẵn sàng giao
- `ON_DELIVERY`: Đang giao hàng
- `DELIVERED`: Đã hoàn thành
- `CANCELLED`: Đã hủy
