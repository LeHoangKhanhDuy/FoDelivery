import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { Switch } from '@/components/ui/Switch';
import { Map, MessageSquare, Printer, Truck, Building, ShieldCheck, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Settings State
  const [googleMapsKey, setGoogleMapsKey] = useState('AIzaSyD-x92183192831923819238');
  const [zaloOaToken, setZaloOaToken] = useState('zalo_oa_secret_token_9921');
  const [fbPageToken, setFbPageToken] = useState('EAAC29819231892381923812938');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [thermalPrintOnOrder, setThermalPrintOnOrder] = useState(true);

  const settingTabs = [
    { id: 'general', label: 'Chung & Công ty', icon: <Building className="w-4 h-4" /> },
    { id: 'maps', label: 'Google Maps API', icon: <Map className="w-4 h-4" /> },
    { id: 'omnichannel', label: 'Zalo & Facebook & SMS', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'printer', label: 'Máy in Hóa đơn POS', icon: <Printer className="w-4 h-4" /> },
    { id: 'delivery', label: 'Cấu hình Giao hàng', icon: <Truck className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Cài đặt Hệ thống SaaS"
        subtitle="Cấu hình thông tin doanh nghiệp, API Google Maps, kết nối Zalo/Facebook và máy in nhiệt nhà bếp."
      />

      <Tabs tabs={settingTabs} activeTabId={activeTab} onTabChange={setActiveTab} variant="underline" />

      {activeTab === 'general' && (
        <Card className="space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Hồ sơ Doanh nghiệp & Hệ thống
          </h3>
          <Input label="Tên Hệ thống" defaultValue="FoDelivery AI SaaS" />
          <Input label="Tên Công ty / Chuỗi Nhà hàng" defaultValue="FOTECH JSC ECOSYSTEM" />
          <Input label="Hotline Hỗ trợ Khách hàng" defaultValue="1900 6789" />
          <Input label="Địa chỉ Trụ sở chính" defaultValue="150 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM" />
          <Button variant="primary" onClick={() => toast.success('Đã lưu cấu hình chung')}>
            Lưu thay đổi
          </Button>
        </Card>
      )}

      {activeTab === 'maps' && (
        <Card className="space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Dịch vụ Google Maps API
          </h3>
          <Input
            label="Google Maps Javascript & Distance Matrix API Key"
            value={googleMapsKey}
            onChange={(e) => setGoogleMapsKey(e.target.value)}
            leftIcon={<Key className="w-4 h-4 text-slate-400" />}
            helperText="Dùng để tính khoảng cách & thời gian di chuyển chính xác tại trang Tạo đơn POS."
          />
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Đã kết nối Distance Matrix API & Places Autocomplete API
          </div>
          <Button variant="primary" onClick={() => toast.success('Đã cập nhật API Key Google Maps')}>
            Cập nhật API Key
          </Button>
        </Card>
      )}

      {activeTab === 'omnichannel' && (
        <Card className="space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Kết nối Tích hợp Đa kênh
          </h3>
          <Input label="Zalo OA Secret Access Token" value={zaloOaToken} onChange={(e) => setZaloOaToken(e.target.value)} />
          <Input label="Facebook Page Access Token" value={fbPageToken} onChange={(e) => setFbPageToken(e.target.value)} />
          <Input label="SMS Gateway Brandname Key" defaultValue="SMS_BRAND_89123891" />
          <Button variant="primary" onClick={() => toast.success('Đã lưu Token kết nối Đa kênh')}>
            Lưu Token Tích hợp
          </Button>
        </Card>
      )}

      {activeTab === 'printer' && (
        <Card className="space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Máy in Nhiệt Bếp & Hóa đơn POS
          </h3>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Tự động in hóa đơn khi nhận đơn mới</span>
            <Switch checked={thermalPrintOnOrder} onChange={setThermalPrintOnOrder} />
          </div>
          <Input label="Địa chỉ IP Máy in / USB Name" defaultValue="192.168.1.200:9100 (Máy in bếp 80mm)" />
          <Button variant="primary" onClick={() => toast.success('Đã lưu cài đặt máy in')}>
            Lưu Cấu hình Máy in
          </Button>
        </Card>
      )}

      {activeTab === 'delivery' && (
        <Card className="space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            Thông số Điều phối Giao hàng
          </h3>
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Tự động gán tài xế theo thuật toán vị trí gần nhất</span>
            <Switch checked={autoDispatch} onChange={setAutoDispatch} />
          </div>
          <Input label="Thời gian tối đa giao hàng (Phút)" defaultValue="45" />
          <Button variant="primary" onClick={() => toast.success('Đã cập nhật thông số điều phối')}>
            Lưu Thông số
          </Button>
        </Card>
      )}
    </div>
  );
};
