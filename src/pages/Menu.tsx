import React, { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchBox } from '@/components/common/SearchBox';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { useMenuStore } from '@/stores/useMenuStore';
import { formatVND } from '@/utils/shippingCalculator';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export const Menu: React.FC = () => {
  const { products, categories, toggleProductStock } = useMenuStore();
  const [selectedCategory, setSelectedCategory] = useState('cat-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'cat-1' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Quản lý Danh mục Thực đơn"
        subtitle="Quản lý các món ăn, phân loại danh mục, giá bán và bật/tắt trạng thái Còn hàng thời gian thực."
        action={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => toast.success('Mở Form thêm món mới')}>
            Thêm món ăn mới
          </Button>
        }
      />

      {/* Category Pills & Search */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl soft-shadow flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => {
            const isActive = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({cat.itemCount})
              </button>
            );
          })}
        </div>

        <div className="w-full md:w-64">
          <SearchBox value={searchQuery} onChange={(val) => setSearchQuery(val)} placeholder="Tìm món ăn..." />
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map((p) => (
          <Card key={p.id} hoverable className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <Badge
                  variant={p.isAvailable ? 'success' : 'neutral'}
                  className="absolute top-2.5 right-2.5 shadow-md"
                >
                  {p.isAvailable ? 'Còn hàng' : 'Hết hàng'}
                </Badge>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">{p.categoryName}</span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{p.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-[#F97316]">{formatVND(p.price)}</span>
                <div className="text-[10px] text-slate-400">★ {p.rating} ({p.orderCount} đã bán)</div>
              </div>

              <Switch
                checked={p.isAvailable}
                onChange={() => {
                  toggleProductStock(p.id);
                  toast.success(`Đã đổi trạng thái kho cho ${p.name}`);
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
