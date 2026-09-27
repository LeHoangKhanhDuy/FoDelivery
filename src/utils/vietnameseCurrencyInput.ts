const VIETNAMESE_NUMBER_FORMATTER = new Intl.NumberFormat('vi-VN', {
  maximumFractionDigits: 0,
});

export const formatVietnameseCurrencyInput = (value?: number | null): string => {
  if (!value || value < 0) return '';
  return VIETNAMESE_NUMBER_FORMATTER.format(value);
};

export const parseVietnameseCurrencyInput = (value: string): number => {
  const digits = value.replace(/\D/g, '');
  return digits ? Number(digits) : 0;
};
