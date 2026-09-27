export interface RouteSeoConfig {
  title: string;
  description: string;
  robots: string;
}

const INDEXABLE_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const PRIVATE_ROBOTS = 'noindex, nofollow, noarchive';

const PRIVATE_ROUTE_SEO: Record<string, Omit<RouteSeoConfig, 'robots'>> = {
  '/login': {
    title: 'Đăng nhập | FoDelivery',
    description: 'Đăng nhập hệ thống quản lý giao hàng và POS đa kênh FoDelivery.',
  },
  '/orders': {
    title: 'Quản lý đơn hàng | FoDelivery',
    description: 'Theo dõi và điều phối đơn hàng đa kênh trong hệ thống FoDelivery.',
  },
  '/orders/new': {
    title: 'Tạo đơn hàng mới | FoDelivery',
    description: 'Tạo đơn hàng giao tận nơi và tính phí vận chuyển trong FoDelivery.',
  },
  '/customers': {
    title: 'Quản lý khách hàng | FoDelivery',
    description: 'Quản lý hồ sơ, địa chỉ và lịch sử mua hàng của khách hàng.',
  },
  '/drivers': {
    title: 'Quản lý tài xế | FoDelivery',
    description: 'Theo dõi trạng thái và hiệu suất đội ngũ tài xế giao hàng.',
  },
  '/branches': {
    title: 'Quản lý chi nhánh | FoDelivery',
    description: 'Quản lý chi nhánh, trạng thái vận hành và bán kính giao hàng.',
  },
  '/menu': {
    title: 'Quản lý thực đơn | FoDelivery',
    description: 'Quản lý món ăn, danh mục, giá bán và trạng thái còn hàng.',
  },
  '/categories': {
    title: 'Quản lý danh mục sản phẩm | FoDelivery',
    description: 'Quản lý thứ tự, trạng thái hiển thị và sản phẩm thuộc từng danh mục.',
  },
  '/shipping': {
    title: 'Cấu hình phí giao hàng | FoDelivery',
    description: 'Thiết lập và mô phỏng quy tắc tính phí giao hàng linh hoạt.',
  },
  '/reports': {
    title: 'Báo cáo và phân tích | FoDelivery',
    description: 'Theo dõi doanh thu, đơn hàng và hiệu suất giao hàng đa kênh.',
  },
  '/settings': {
    title: 'Cài đặt hệ thống | FoDelivery',
    description: 'Cấu hình doanh nghiệp, tích hợp và thông số vận hành FoDelivery.',
  },
};

export const getRouteSeoConfig = (pathname: string): RouteSeoConfig => {
  if (pathname === '/') {
    return {
      title: 'FoDelivery | Phần mềm quản lý giao hàng và POS đa kênh',
      description:
        'FoDelivery giúp chuỗi nhà hàng quản lý đơn hàng đa kênh, điều phối tài xế, chi nhánh và tối ưu phí giao hàng trên một nền tảng.',
      robots: INDEXABLE_ROBOTS,
    };
  }

  const privateRoute = PRIVATE_ROUTE_SEO[pathname];
  if (privateRoute) {
    return { ...privateRoute, robots: PRIVATE_ROBOTS };
  }

  if (/^\/orders\/[^/]+$/.test(pathname)) {
    return {
      title: 'Chi tiết đơn hàng | FoDelivery',
      description: 'Xem chi tiết, trạng thái và thông tin giao nhận của đơn hàng.',
      robots: PRIVATE_ROBOTS,
    };
  }

  return {
    title: 'Không tìm thấy trang | FoDelivery',
    description: 'Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển.',
    robots: PRIVATE_ROBOTS,
  };
};
