import React from 'react';
import { clsx } from 'clsx';
import { Info, MapPin } from 'lucide-react';

export interface Marker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: 'BRANCH' | 'CUSTOMER' | 'DRIVER';
  subText?: string;
}

export interface GoogleMapPlaceholderProps {
  height?: string;
  markers?: Marker[];
  showRoute?: boolean;
  distanceKm?: number;
  estimatedDurationMins?: number;
  radiusKm?: number;
  centerAddress?: string;
  className?: string;
}

export const GoogleMapPlaceholder: React.FC<GoogleMapPlaceholderProps> = ({
  height = 'h-64',
  distanceKm = 4.6,
  estimatedDurationMins = 16,
  radiusKm,
  centerAddress = '208 Nguyễn Hữu Cảnh',
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'relative w-full rounded-2xl overflow-hidden bg-[#F2EFE9] border border-slate-200/80 shadow-xs select-none',
        height,
        className
      )}
    >
      {/* Realistic Google Map Tiles Background Graphic */}
      <div className="absolute inset-0 bg-[#F4F1EA] overflow-hidden">
        {/* River / Water body */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M -40 180 C 120 190, 180 80, 360 140 C 480 180, 560 60, 720 120 C 850 170, 960 90, 1100 150 L 1100 280 L -40 280 Z"
            fill="#C3E1FA"
          />
          {/* Roads & Highways */}
          <path
            d="M -20 60 L 600 60"
            stroke="#FFFFFF"
            strokeWidth="10"
            fill="none"
          />
          <path
            d="M 160 -20 L 160 350"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M -20 120 Q 180 130 320 200 T 700 240"
            stroke="#FFFFFF"
            strokeWidth="14"
            fill="none"
          />
          <path
            d="M -20 120 Q 180 130 320 200 T 700 240"
            stroke="#FDE047"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 280 -20 L 280 350"
            stroke="#FFFFFF"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M 80 200 Q 220 260 450 200"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M 400 -20 L 400 350"
            stroke="#FFFFFF"
            strokeWidth="7"
            fill="none"
          />

          {/* Actual Polyline Blue Navigation Route */}
          <path
            d="M 120 70 L 120 130 Q 140 165 240 170 L 330 200 Q 380 210 440 215"
            fill="none"
            stroke="#2563EB"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Start Point Pin: Cửa hàng (Vị trí của bạn) */}
        <div className="absolute top-12 left-20 -translate-x-1/2 flex flex-col items-center z-10">
          <div className="bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-slate-200 whitespace-nowrap mb-1">
            Cửa hàng (Vị trí của bạn)
          </div>
          <div className="relative flex items-center justify-center">
            <MapPin className="w-6 h-6 text-rose-600 fill-rose-600 drop-shadow-md" />
            <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-2" />
          </div>
        </div>

        {/* Destination Point Pin: 208 Nguyễn Hữu Cảnh */}
        <div className="absolute bottom-6 right-24 sm:right-32 translate-x-1/2 flex flex-col items-center z-10">
          <div className="relative flex items-center justify-center mb-1">
            <MapPin className="w-6 h-6 text-rose-600 fill-rose-600 drop-shadow-md" />
            <span className="w-1.5 h-1.5 rounded-full bg-white absolute top-2" />
          </div>
          <div className="bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-slate-200 whitespace-nowrap">
            {centerAddress}
          </div>
        </div>

        {/* Radius Circle if requested */}
        {radiusKm && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-orange-500/40 bg-orange-500/10 pointer-events-none flex items-center justify-center">
            <span className="text-[10px] font-bold text-orange-600 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
              Bán kính: {radiusKm} km
            </span>
          </div>
        )}
      </div>

      {/* Top Right Floating Route Info Card */}
      <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl shadow-md border border-slate-200/80 text-left min-w-[170px] select-none">
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium mb-0.5">
          <span>Quãng đường (theo Google Maps)</span>
          <Info className="w-3 h-3 text-slate-400 shrink-0" />
        </div>
        <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">
          {distanceKm} km
        </div>

        <div className="text-[10px] text-slate-500 font-medium mt-2 mb-0.5">
          Thời gian di chuyển (ước tính)
        </div>
        <div className="text-sm sm:text-base font-black text-slate-900 leading-tight">
          {estimatedDurationMins} phút
        </div>
      </div>

      {/* Bottom Left Google Logo */}
      <div className="absolute bottom-2 left-3 z-20 font-black text-xs tracking-tighter select-none drop-shadow-xs flex items-center">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </div>
    </div>
  );
};
