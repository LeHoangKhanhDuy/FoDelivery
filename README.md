# FoDelivery AI - SaaS Delivery Management & POS System

**FoDelivery AI** là giải pháp Quản lý Giao hàng và Điểm bán (POS) SaaS dành cho các chuỗi nhà hàng, thương hiệu F&B và dịch vụ ăn uống. Hệ thống hỗ trợ tiếp nhận đơn hàng Đa kênh (*Điện thoại, Facebook Messenger, Zalo OA, Website, POS trực tiếp*), định vị địa chỉ khách hàng qua Google Maps và tự động tính phí ship dựa trên khoảng cách thực tế.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

Hệ thống được phát triển với kiến trúc Clean Architecture tiên tiến:

- **Core Framework**: React 19, TypeScript, Vite
- **Styling & Design System**: TailwindCSS v4 (Cấu hình `@variant dark`), Vanilla CSS Design Tokens
- **Routing**: React Router v7
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form & Validation**: React Hook Form, Zod
- **HTTP Client**: Axios (Cấu hình Interceptors & Endpoints)
- **Icons & Visuals**: Lucide React
- **Animations & Interactivity**: Framer Motion
- **Data Visualization**: Recharts (Biểu đồ Vùng, Biểu đồ Cột, Biểu đồ Tròn)
- **Utilities**: dayjs, clsx, tailwind-merge
- **Notification**: react-hot-toast

---

## 🎨 Phong cách Thiết kế (Design System)

- **Màu chủ đạo (Primary)**: `#F97316` (Cam rực rỡ)
- **Màu phụ (Secondary)**: `#FB923C` (Cam dịu)
- **Nền ứng dụng (Background)**: Sáng `#F8FAFC` | Tối `#0B0F19` (Dark Mode)
- **Thẻ nội dung (Cards)**: `#FFFFFF` | Tối `#1E293B`
- **Bo góc (Border Radius)**: `16px` (`rounded-2xl`)
- **Hiệu ứng (Effects)**: Soft Shadow, Glassmorphism backdrop blur, mượt mà chuẩn SaaS Enterprise (Stripe, Linear, Toast POS).

---

## ✨ Tính năng Nổi bật

1. **Giao diện Tiếng Việt & Chế độ Tối/Sáng (Light/Dark Mode)**:
   - Việt hóa 100% giao diện, thuật ngữ điều phối, đơn vị tiền tệ VNĐ.
   - Nút bật/tắt Dark Mode & Light Mode thời gian thực trên thanh Header.

2. **Tối ưu Bố cục Rộng & Responsive Toàn diện**:
   - Khung nội dung trung tâm tự động mở rộng theo màn hình máy tính rộng (`max-w-[1700px]`), cân đối lề trái/phải.
   - Thanh điều hướng Mobile Drawer tự động trượt ra trên smartphone và tablet.
   - Thu gọn / Mở rộng Sidebar linh hoạt trên Desktop.

3. **POS Tạo Đơn Nhanh 3 Cột (`/orders/new`)**:
   - **Cột Trái**: Tra cứu SĐT khách quen, Tìm địa chỉ Google Maps, tự động tính khoảng cách KM & thời gian giao dự kiến.
   - **Cột Giữa**: Thực đơn phân theo danh mục (Burger, Pizza, Gà rán, Trà sữa, Tráng miệng) kèm thanh tìm kiếm.
   - **Cột Phải**: Giỏ hàng trực tiếp, áp dụng Voucher (`FODELIVERY30`, `FREESHIP`), công thức tính phí ship tự động, xem bản đồ tuyến đường, gán tài xế & Tạo đơn hàng.

4. **Thuật toán Phí Ship Linh hoạt (`/shipping`)**:
   - Hỗ trợ 4 chiến lược tính phí: **Theo KM**, **Khung khoảng cách**, **Đồng giá Quận**, **Miễn phí giao hàng**.
   - Bộ công cụ mô phỏng & test phí ship trực tiếp với diễn giải công thức từng bước.

5. **Trang Dashboard Tổng quan (`/`)**:
   - Thẻ chỉ số KPI (Doanh thu, Đơn hàng, Thời gian giao TB, Doanh thu phí ship).
   - Biểu đồ Recharts theo dõi doanh thu & khung giờ cao điểm.
   - Danh sách đơn mới nhận, tài xế tiêu biểu, chi nhánh đang mở.

6. **Quản lý Đơn hàng & Tiến trình Giao (`/orders` & `/orders/:id`)**:
   - Lọc đa kênh (Phone, FB, Zalo, Web, POS), phân loại trạng thái, phân trang và Drawer xem nhanh.
   - Tiến trình 5 bước giao hàng trực quan và bản đồ tuyến đường thời gian thực.

7. **Quản lý Khách hàng, Đội ngũ Tài xế & Chi nhánh**:
   - **Khách hàng (`/customers`)**: Sổ địa chỉ giao hàng & lịch sử mua sắm.
   - **Tài xế (`/drivers`)**: Quản lý trực tuyến, đang giao, ngoại tuyến, bảng điểm đánh giá.
   - **Chi nhánh (`/branches`)**: Bản đồ vị trí kèm thanh trượt điều chỉnh bán kính giao hàng (Delivery Radius Slider).

8. **Báo cáo & Thống kê (`/reports`)**, **Cài đặt Hệ thống (`/settings`)**, **Đăng nhập (`/login`)**.

---

## 📁 Cấu trúc Thư mục Dự án

```
FoDelivery/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.app.json
├── README.md
└── src/
    ├── app/
    │   ├── layouts/       # MainLayout (Sidebar + Header), AuthLayout
    │   └── router/        # Cấu hình React Router v7
    ├── components/
    │   ├── ui/            # Button, Input, Select, Badge, Avatar, Card, Drawer, Modal, Pagination, Table, Switch, Tabs
    │   ├── common/        # SearchBox, EmptyState, LoadingSpinner, Skeleton, PageHeader, StatCard, ConfirmDialog
    │   ├── maps/          # GoogleMapPlaceholder (Tuyến đường, Marker, Bán kính giao hàng)
    │   ├── sidebar/       # AppSidebar (Navigation & Đếm đơn)
    │   └── header/        # AppHeader (Tìm kiếm, Thông báo, Dark Mode, Đổi chi nhánh)
    ├── contexts/          # ThemeContext (Light/Dark Mode)
    ├── constants/         # Mock datasets tiếng Việt
    ├── services/
    │   └── api/
    │       ├── axios.ts   # Cấu hình Axios Client
    │       └── endpoints.ts # Danh mục Endpoints API
    ├── stores/            # Zustand Stores (Orders, Branches, ShippingRules, Drivers, Customers, Menu, Cart)
    ├── styles/            # globals.css (Cấu hình TailwindCSS v4 Dark Variant & CSS Tokens)
    ├── types/             # Định nghĩa TypeScript Domain Interfaces
    ├── utils/             # shippingCalculator.ts (Thuật toán Phí Ship & Định dạng VNĐ)
    └── pages/
        ├── Dashboard.tsx
        ├── Orders.tsx
        ├── CreateOrder.tsx
        ├── OrderDetail.tsx
        ├── Customers.tsx
        ├── Drivers.tsx
        ├── Branches.tsx
        ├── ShippingRule.tsx
        ├── Menu.tsx
        ├── Reports.tsx
        ├── Settings.tsx
        ├── Auth.tsx
        └── NotFound.tsx
```

---

## 🚀 Hướng dẫn Cài đặt & Chạy ứng dụng

### 1. Cài đặt Dependencies

```bash
npm install
```

### 2. Chạy ứng dụng ở chế độ Phát triển (Dev Mode)

```bash
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173`

### 3. Biên dịch ứng dụng cho Production

```bash
npm run build
```

---

## 🔒 Tài khoản Đăng nhập Demo

- **Email**: `admin@fodelivery.ai`
- **Mật khẩu**: `password123`
