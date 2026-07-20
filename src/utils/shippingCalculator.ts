import { ShippingRule } from '@/types';

export function calculateShippingFee(
  distanceKm: number,
  subtotal: number,
  rule: ShippingRule
): { fee: number; isFree: boolean; breakdown: string } {
  if (!rule || !rule.isActive) {
    return { fee: 15000, isFree: false, breakdown: 'Flat default fallback fee' };
  }

  // Check free shipping threshold
  if (rule.freeShippingThreshold > 0 && subtotal >= rule.freeShippingThreshold) {
    return {
      fee: 0,
      isFree: true,
      breakdown: `Free shipping applied (Subtotal ≥ ${rule.freeShippingThreshold.toLocaleString('vi-VN')} VND)`,
    };
  }

  let rawFee = 0;
  let breakdown = '';

  if (rule.type === 'PER_KM') {
    const extraDistance = Math.max(0, distanceKm - rule.baseDistanceKm);
    const extraFee = extraDistance * rule.perKmRate;
    rawFee = rule.baseFee + extraFee;
    breakdown = `Base (${rule.baseFee.toLocaleString('vi-VN')} VND for first ${rule.baseDistanceKm}km) + ${extraDistance.toFixed(1)}km × ${rule.perKmRate.toLocaleString('vi-VN')} VND/km`;
  } else if (rule.type === 'DISTANCE_RANGE' && rule.distanceRanges) {
    const matchedRange = rule.distanceRanges.find(
      (r) => distanceKm >= r.fromKm && distanceKm < r.toKm
    );
    if (matchedRange) {
      rawFee = matchedRange.fee;
      breakdown = `Tiered Range ${matchedRange.fromKm}-${matchedRange.toKm}km`;
    } else {
      const maxRange = rule.distanceRanges[rule.distanceRanges.length - 1];
      rawFee = maxRange ? maxRange.fee : rule.baseFee;
      breakdown = `Beyond highest distance tier`;
    }
  } else {
    rawFee = rule.baseFee || 20000;
    breakdown = `Standard flat rate`;
  }

  // Apply min / max cap
  if (rule.minFee && rawFee < rule.minFee) {
    rawFee = rule.minFee;
    breakdown += ` (Capped at minimum fee)`;
  }
  if (rule.maxFee && rawFee > rule.maxFee) {
    rawFee = rule.maxFee;
    breakdown += ` (Capped at maximum fee)`;
  }

  // Rounding
  if (rule.roundToNearest && rule.roundToNearest > 0) {
    rawFee = Math.round(rawFee / rule.roundToNearest) * rule.roundToNearest;
  }

  return { fee: rawFee, isFree: false, breakdown };
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(amount)
    .replace('₫', 'VND');
}

export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}
