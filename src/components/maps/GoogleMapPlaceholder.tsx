import React from 'react';
import { MapPin, Navigation, Layers, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

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
  markers = [],
  showRoute = true,
  distanceKm,
  estimatedDurationMins,
  radiusKm,
  centerAddress = 'Quận 1, Thành phố Hồ Chí Minh',
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-inner group select-none',
        height,
        className
      )}
    >
      {/* Mock Map Tiles Styling Background */}
      <div className="absolute inset-0 bg-[#1e293b] opacity-95 flex items-center justify-center overflow-hidden">
        {/* Grid lines representing roads/blocks */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, #f97316 1px, transparent 1px),
              linear-gradient(to right, #475569 1px, transparent 1px),
              linear-gradient(to bottom, #475569 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px, 40px 40px, 40px 40px',
          }}
        />

        {/* River curve graphic */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
          <path
            d="M-50 120 C 150 180, 250 80, 500 220 C 700 320, 850 150, 1100 250"
            fill="none"
            stroke="#0284c7"
            strokeWidth="38"
            strokeLinecap="round"
          />
        </svg>

        {/* Dynamic Route SVG Polyline */}
        {showRoute && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <path
              d="M 120 180 Q 240 120 380 200 T 580 140"
              fill="none"
              stroke="#F97316"
              strokeWidth="5"
              strokeDasharray="8,6"
              className="animate-[dash_20s_linear_infinite]"
            />
          </svg>
        )}

        {/* Delivery Radius Circle overlay */}
        {radiusKm && (
          <div className="absolute w-72 h-72 rounded-full border-2 border-orange-500/40 bg-orange-500/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold text-orange-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-orange-500/30">
              Bán kính: {radiusKm} km
            </span>
          </div>
        )}

        {/* Interactive Pin Markers */}
        <div className="absolute inset-0 flex items-center justify-around px-12 z-20 pointer-events-none">
          {/* Branch Pin */}
          <div className="flex flex-col items-center animate-bounce duration-1000">
            <div className="px-2.5 py-1 bg-[#F97316] text-white text-[11px] font-bold rounded-lg shadow-lg border border-orange-400 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Chi nhánh HQ</span>
            </div>
            <div className="w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-md ring-4 ring-orange-500/30" />
          </div>

          {/* Driver Pin */}
          {markers.some((m) => m.type === 'DRIVER') && (
            <div className="flex flex-col items-center">
              <div className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md shadow-md border border-emerald-400 mb-1 flex items-center gap-1">
                <Navigation className="w-3 h-3 animate-spin" />
                <span>Tài xế (Đang di chuyển)</span>
              </div>
              <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md ring-4 ring-emerald-500/30" />
            </div>
          )}

          {/* Customer Pin */}
          <div className="flex flex-col items-center">
            <div className="px-2.5 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg shadow-lg border border-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Khách hàng</span>
            </div>
            <div className="w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-md ring-4 ring-rose-500/30" />
          </div>
        </div>
      </div>

      {/* Top Left Google Map Label Badge */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
        <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold rounded-xl border border-slate-700/80 shadow-md flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-orange-400" />
          Bản đồ Google Maps (Mô phỏng)
        </span>
        <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 text-[10px] font-semibold rounded-lg border border-emerald-800 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Đã kết nối API
        </span>
      </div>

      {/* Distance & Duration Badge */}
      {(distanceKm !== undefined || estimatedDurationMins !== undefined) && (
        <div className="absolute bottom-3 left-3 z-30 px-3.5 py-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white rounded-xl shadow-lg flex items-center gap-3">
          {distanceKm !== undefined && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Khoảng cách</span>
              <span className="text-sm font-extrabold text-orange-400">{distanceKm} km</span>
            </div>
          )}
          {distanceKm !== undefined && estimatedDurationMins !== undefined && (
            <div className="w-px h-6 bg-slate-700" />
          )}
          {estimatedDurationMins !== undefined && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Thời gian dự kiến</span>
              <span className="text-sm font-extrabold text-emerald-400">{estimatedDurationMins} phút</span>
            </div>
          )}
        </div>
      )}

      {/* Map Control Buttons */}
      <div className="absolute bottom-3 right-3 z-30 flex flex-col gap-1">
        <button className="p-2 bg-slate-900/90 text-white rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-bold">
          +
        </button>
        <button className="p-2 bg-slate-900/90 text-white rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-bold">
          -
        </button>
      </div>

      {/* Bottom Center Address Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <span className="px-3 py-1 bg-slate-950/80 text-slate-300 text-[11px] font-medium rounded-full border border-slate-800 shadow-md">
          📍 {centerAddress}
        </span>
      </div>
    </div>
  );
};
