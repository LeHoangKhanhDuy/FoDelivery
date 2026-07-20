import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GoogleMapPlaceholder } from '@/components/maps/GoogleMapPlaceholder';
import { useBranchStore } from '@/stores/useBranchStore';
import { Store, MapPin, Phone, Navigation } from 'lucide-react';
import toast from 'react-hot-toast';

export const Branches: React.FC = () => {
  const { branches, updateBranchRadius, toggleBranchStatus } = useBranchStore();
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0].id);

  const selectedBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Quản lý Chi nhánh Nhà hàng"
        subtitle="Cấu hình thông số vận hành chi nhánh, điều chỉnh bán kính giao hàng Google Maps và thông tin quản lý."
      />

      {/* Grid: Left Branch Cards, Right Interactive Radius Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Branch Cards List */}
        <div className="lg:col-span-5 space-y-4">
          {branches.map((b) => {
            const isSelected = b.id === selectedBranchId;
            return (
              <Card
                key={b.id}
                hoverable
                onClick={() => setSelectedBranchId(b.id)}
                className={`transition-all ${
                  isSelected
                    ? 'border-[#F97316] ring-2 ring-orange-500/20 bg-orange-50/20 dark:bg-orange-950/20'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950 text-[#F97316] font-bold">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{b.name}</h4>
                      <p className="text-xs text-slate-500">{b.district}, {b.city}</p>
                    </div>
                  </div>
                  <Badge variant={b.isActive ? 'success' : 'neutral'}>
                    {b.isActive ? 'Đang mở cửa' : 'Đóng cửa'}
                  </Badge>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{b.address}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> {b.phone}
                    </span>
                    <span className="font-bold text-[#F97316]">Bán kính {b.deliveryRadiusKm} km</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Column: Selected Branch Map & Delivery Radius Control */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{selectedBranch.name}</h3>
                <p className="text-xs text-slate-500">Quản lý chi nhánh: {selectedBranch.managerName}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toggleBranchStatus(selectedBranch.id);
                  toast.success(`Đã đổi trạng thái mở/đóng cửa cho ${selectedBranch.name}`);
                }}
              >
                Đổi trạng thái Mở/Đóng
              </Button>
            </div>

            {/* Google Map showing Branch Pin & Delivery Radius Circle */}
            <GoogleMapPlaceholder
              height="h-72"
              radiusKm={selectedBranch.deliveryRadiusKm}
              centerAddress={selectedBranch.address}
              markers={[{ id: selectedBranch.id, lat: selectedBranch.lat, lng: selectedBranch.lng, label: selectedBranch.name, type: 'BRANCH' }]}
            />

            {/* Delivery Radius Slider */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-[#F97316]" />
                  Điều chỉnh Bán kính Giao hàng: <strong className="text-[#F97316] text-sm ml-1">{selectedBranch.deliveryRadiusKm} km</strong>
                </label>
                <span className="text-[10px] text-slate-400">Tối đa: 20km</span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="1"
                value={selectedBranch.deliveryRadiusKm}
                onChange={(e) => updateBranchRadius(selectedBranch.id, parseInt(e.target.value, 10))}
                className="w-full accent-[#F97316] cursor-pointer"
              />
            </div>

            {/* Opening Hours & Details Form */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Input label="Khung giờ Mở cửa" value={selectedBranch.openingHours} readOnly />
              <Input label="Quản lý Trực tiếp" value={selectedBranch.managerName} readOnly />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
