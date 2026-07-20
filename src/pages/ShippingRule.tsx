import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useShippingStore } from '@/stores/useShippingStore';
import { calculateShippingFee, formatVND } from '@/utils/shippingCalculator';
import { CheckCircle2, Play } from 'lucide-react';
import toast from 'react-hot-toast';

export const ShippingRulePage: React.FC = () => {
  const { rules, activeRuleId, setActiveRuleId, updateRule } = useShippingStore();
  const activeRule = rules.find((r) => r.id === activeRuleId) || rules[0];

  // Interactive Simulator State
  const [testDistanceKm, setTestDistanceKm] = useState(4.5);
  const [testSubtotal, setTestSubtotal] = useState(250000);

  const simulationResult = calculateShippingFee(testDistanceKm, testSubtotal, activeRule);

  const getRuleTypeLabel = (type: string) => {
    switch (type) {
      case 'PER_KM':
        return 'Theo khoảng cách KM';
      case 'DISTANCE_RANGE':
        return 'Khung khoảng cách';
      case 'DISTRICT':
        return 'Đồng giá Quận';
      case 'FREE_SHIPPING':
        return 'Miễn phí giao hàng';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Cấu hình Thuật toán Phí Ship"
        subtitle="Quản lý công thức tính phí giao hàng linh hoạt, hạn mức Miễn phí ship và mô phỏng tính phí trực tiếp."
      />

      {/* Select Active Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rules.map((rule) => {
          const isSelected = rule.id === activeRuleId;
          return (
            <Card
              key={rule.id}
              hoverable
              onClick={() => {
                setActiveRuleId(rule.id);
                toast.success(`Đã kích hoạt chiến lược: ${rule.name}`);
              }}
              className={`space-y-3 transition-all ${
                isSelected
                  ? 'border-[#F97316] ring-2 ring-orange-500/20 bg-orange-50/20 dark:bg-orange-950/20'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <Badge variant={isSelected ? 'primary' : 'neutral'}>
                  {getRuleTypeLabel(rule.type)}
                </Badge>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-[#F97316]" />}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{rule.name}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Giá sàn: {formatVND(rule.baseFee)} + Đơn giá: {formatVND(rule.perKmRate)}/km
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Strategy Config Left, Live Interactive Simulator Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Rule Parameters Form */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Cấu hình Thông số ({activeRule.name})
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Phí cơ sở (VNĐ)"
                type="number"
                value={activeRule.baseFee}
                onChange={(e) => updateRule({ ...activeRule, baseFee: Number(e.target.value) })}
              />
              <Input
                label="Bán kính bao gồm ban đầu (km)"
                type="number"
                step="0.5"
                value={activeRule.baseDistanceKm}
                onChange={(e) => updateRule({ ...activeRule, baseDistanceKm: Number(e.target.value) })}
              />
              <Input
                label="Đơn giá mỗi KM tiếp theo (VNĐ)"
                type="number"
                value={activeRule.perKmRate}
                onChange={(e) => updateRule({ ...activeRule, perKmRate: Number(e.target.value) })}
              />
              <Input
                label="Hạn mức Đơn hàng Miễn Phí Ship (VNĐ)"
                type="number"
                value={activeRule.freeShippingThreshold}
                onChange={(e) => updateRule({ ...activeRule, freeShippingThreshold: Number(e.target.value) })}
              />
              <Input
                label="Mức phí tối thiểu (VNĐ)"
                type="number"
                value={activeRule.minFee}
                onChange={(e) => updateRule({ ...activeRule, minFee: Number(e.target.value) })}
              />
              <Input
                label="Mức phí tối đa (VNĐ)"
                type="number"
                value={activeRule.maxFee}
                onChange={(e) => updateRule({ ...activeRule, maxFee: Number(e.target.value) })}
              />
            </div>

            <Button
              variant="primary"
              onClick={() => toast.success('Đã lưu cấu hình thuật toán phí ship!')}
            >
              Lưu cấu hình Phí Ship
            </Button>
          </Card>
        </div>

        {/* Right Column: Live Interactive Fee Simulator Playground */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="space-y-4 bg-slate-900 text-white border-slate-800 shadow-2xl">
            <div className="flex items-center gap-2 text-orange-400 font-extrabold text-sm border-b border-slate-800 pb-3">
              <Play className="w-4 h-4 fill-orange-400" />
              Công cụ Mô phỏng & Test Phí Ship Trực tiếp
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">
                  Khoảng cách thử nghiệm: <strong className="text-orange-400">{testDistanceKm} km</strong>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="15"
                  step="0.1"
                  value={testDistanceKm}
                  onChange={(e) => setTestDistanceKm(parseFloat(e.target.value))}
                  className="w-full accent-[#F97316] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold">
                  Tạm tính giá trị đơn hàng: <strong className="text-emerald-400">{formatVND(testSubtotal)}</strong>
                </label>
                <input
                  type="range"
                  min="50000"
                  max="800000"
                  step="10000"
                  value={testSubtotal}
                  onChange={(e) => setTestSubtotal(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Output Result Panel */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Kết quả Phí Ship tính được</span>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-300 font-medium">Phí giao hàng cuối cùng</span>
                <span className="text-2xl font-black text-orange-400">
                  {simulationResult.isFree ? 'MIỄN PHÍ' : formatVND(simulationResult.fee)}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 text-[11px] text-slate-400 space-y-1 border border-slate-800">
                <div className="font-semibold text-slate-200">Diễn giải công thức:</div>
                <p>{simulationResult.breakdown}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
