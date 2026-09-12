import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Order } from '@/types';
import { formatVND } from '@/utils/shippingCalculator';
import { Printer, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export interface PrintInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
}

export const PrintInvoiceModal: React.FC<PrintInvoiceModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [printer, setPrinter] = useState('Microsoft Print to PDF');
  const [paperSize, setPaperSize] = useState('80mm');
  const [copies, setCopies] = useState('1');
  const [autoCut, setAutoCut] = useState(true);
  const [printLogo, setPrintLogo] = useState(true);

  if (!order) return null;

  const handlePrint = () => {
    toast.success(`Đang gửi lệnh in ${copies} bản tới ${printer}...`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="In hóa đơn"
      maxWidth="3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
        {/* LEFT COLUMN: Thermal Bill 80mm Preview */}
        <div className="md:col-span-7 bg-slate-100 dark:bg-slate-900/80 p-4 sm:p-6 rounded-2xl flex justify-center items-start overflow-y-auto max-h-[580px]">
          <div className="w-full max-w-[340px] bg-white text-slate-900 p-5 rounded-lg shadow-md border border-slate-200 text-xs font-sans select-none">
            {/* Store Header */}
            {printLogo && (
              <div className="text-center mb-1">
                <div className="w-8 h-8 rounded-lg bg-[#F97316] text-white flex items-center justify-center font-black mx-auto text-sm shadow-xs mb-1">
                  GF
                </div>
              </div>
            )}
            <div className="text-center space-y-0.5 border-b border-dashed border-slate-300 pb-3">
              <h4 className="font-black text-base tracking-wider">GOODFOOD</h4>
              <p className="text-[11px] text-slate-600">
                208 Nguyễn Hữu Cảnh, P.22, Bình Thạnh, TP. HCM
              </p>
              <p className="text-[11px] text-slate-600">ĐT: 0901 234 567</p>
              <h5 className="font-bold text-sm tracking-wide pt-2 uppercase">HÓA ĐƠN BÁN HÀNG</h5>
            </div>

            {/* Order Info */}
            <div className="py-2.5 space-y-1 text-[11px] border-b border-dashed border-slate-300 text-slate-700">
              <div className="flex justify-between">
                <span>Mã đơn:</span>
                <strong className="text-slate-900 font-bold">{order.code}</strong>
              </div>
              <div className="flex justify-between">
                <span>Ngày:</span>
                <span>{order.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span>Khách hàng:</span>
                <strong className="text-slate-900">{order.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span>SĐT:</span>
                <span>{order.customerPhone}</span>
              </div>
              <div className="text-[10px] text-slate-600 pt-0.5 leading-snug">
                <span>Địa chỉ: </span>
                <span>{order.deliveryAddress}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="py-2.5 border-b border-dashed border-slate-300">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-500 font-bold text-[10px]">
                    <th className="py-1 w-6">STT</th>
                    <th className="py-1">Tên món</th>
                    <th className="py-1 text-center w-8">SL</th>
                    <th className="py-1 text-right">Đơn giá</th>
                    <th className="py-1 text-right">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <tr key={item.id} className="text-slate-800">
                      <td className="py-1.5 font-medium">{idx + 1}</td>
                      <td className="py-1.5 font-medium max-w-[120px] truncate">{item.name}</td>
                      <td className="py-1.5 text-center font-bold">{item.quantity}</td>
                      <td className="py-1.5 text-right font-mono text-[10px]">
                        {item.price.toLocaleString('vi-VN')}
                      </td>
                      <td className="py-1.5 text-right font-mono font-semibold text-[10px]">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price Calculations */}
            <div className="py-2.5 space-y-1 text-[11px] text-slate-700">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span className="font-mono">{order.subtotal.toLocaleString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="font-mono text-emerald-600 font-semibold">
                  {order.shippingFee.toLocaleString('vi-VN')}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>Giảm giá:</span>
                  <span className="font-mono">-{order.discount.toLocaleString('vi-VN')}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-slate-300 text-sm font-black text-slate-900">
                <span>Tổng cộng:</span>
                <span className="text-rose-600 font-bold">{order.total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-3 border-t border-dashed border-slate-300 text-[11px] text-slate-500 italic">
              Cảm ơn quý khách!
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Print Settings Form */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <Select
              label="Máy in"
              value={printer}
              onChange={(e) => setPrinter(e.target.value)}
              options={[
                { value: 'Microsoft Print to PDF', label: 'Microsoft Print to PDF' },
                { value: 'Xprinter XP-420B (USB)', label: 'Xprinter XP-420B (USB)' },
                { value: 'POS-80C Thermal Printer (LAN)', label: 'POS-80C Thermal Printer (LAN)' },
                { value: 'Epson TM-T82III (Bếp)', label: 'Epson TM-T82III (Bếp)' },
              ]}
            />

            <Select
              label="Kích thước giấy"
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              options={[
                { value: '80mm', label: '80mm (Khổ nhiệt tiêu chuẩn)' },
                { value: '58mm', label: '58mm (Khổ nhỏ)' },
                { value: 'A4', label: 'A4 (Hóa đơn văn phòng)' },
              ]}
            />

            <Input
              label="Số bản in"
              type="number"
              min="1"
              max="5"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
            />

            <div className="space-y-2.5 pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoCut}
                  onChange={(e) => setAutoCut(e.target.checked)}
                  className="rounded text-[#F97316] focus:ring-[#F97316] w-4 h-4 cursor-pointer accent-[#F97316]"
                />
                <span>Cắt giấy tự động</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={printLogo}
                  onChange={(e) => setPrintLogo(e.target.checked)}
                  className="rounded text-[#F97316] focus:ring-[#F97316] w-4 h-4 cursor-pointer accent-[#F97316]"
                />
                <span>In logo</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
              className="bg-[#F97316] hover:bg-[#EA580C] px-6 font-bold"
            >
              In
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
