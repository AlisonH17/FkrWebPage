import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from '../components/catalog/ProductCard';
import { useLanguage } from '../locales/LanguageContext';

interface CatalogProps {
  products: Product[];
  categories: Category[];
  navigate: (path: string) => void;
  initialCategory?: string;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  categories,
  navigate,
  initialCategory,
}) => {
  const { t, localize } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.published) return false;

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Availability filter
      if (onlyAvailable && !product.available) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameEs = product.name?.es?.toLowerCase() || '';
        const nameEn = product.name?.en?.toLowerCase() || '';
        const shortEs = product.shortDescription?.es?.toLowerCase() || '';
        const specsMatch = product.specifications?.some(
          (s) => s.key.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        );

        if (!nameEs.includes(q) && !nameEn.includes(q) && !shortEs.includes(q) && !specsMatch) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, onlyAvailable, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlyAvailable(false);
  };

  return (
    <div className="py-10 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2.5 text-[#D20A11] text-sm sm:text-base font-headline font-bold uppercase tracking-widest mb-2">
            <span className="w-6 h-[2.5px] bg-[#D20A11]" />
            <span>{t.catalogPage.eyebrow}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline font-bold text-3xl sm:text-5xl text-[#101317] tracking-tight">
                {t.catalogPage.title}
              </h1>
              <p className="text-base sm:text-lg text-[#374151] mt-2.5 max-w-xl">
                {t.catalogPage.subtitle}
              </p>
            </div>
            <div className="text-sm sm:text-base font-bold font-mono text-[#4B5563]">
              {t.catalogPage.showingProducts.replace('{{count}}', String(filteredProducts.length))}
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-[#E5E7EB] p-5 sm:p-7 mb-8 space-y-5 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.catalogPage.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 text-sm sm:text-base bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:border-[#D20A11] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#9CA3AF] hover:text-[#101317]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Availability Switch & Reset */}
            <div className="flex items-center gap-5 text-sm sm:text-base">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="w-5 h-5 accent-[#D20A11]"
                />
                <span className="font-headline font-bold text-[#1F242C]">
                  {t.catalogPage.onlyAvailable}
                </span>
              </label>

              {(selectedCategory !== 'all' || searchQuery || onlyAvailable) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-2 text-sm sm:text-base text-[#D20A11] hover:underline font-headline font-bold uppercase tracking-wider ml-auto lg:ml-0"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.catalogPage.clearFilters}</span>
                </button>
              )}
            </div>

          </div>

          {/* Category Tabs (Horizontal scroll on mobile, wrap on tablet/desktop) */}
          <div className="pt-3.5 border-t border-[#F3F4F6] flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#D20A11] text-white shadow-xs'
                  : 'bg-[#F4F5F7] text-[#374151] hover:bg-[#E5E7EB] hover:text-[#101317]'
              }`}
            >
              {t.common.allCategories}
            </button>

            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = products.filter((p) => p.category === cat.id && p.published).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#D20A11] text-white shadow-xs'
                      : 'bg-[#F4F5F7] text-[#374151] hover:bg-[#E5E7EB] hover:text-[#101317]'
                  }`}
                >
                  <span>{localize(cat.name)}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 font-bold ${isActive ? 'bg-white/25 text-white' : 'bg-[#E5E7EB] text-[#4B5563]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categories={categories}
                navigate={navigate}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] p-12 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-[#F3F4F6] text-[#9CA3AF] flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-lg text-[#101317]">
              {t.common.noResults}
            </h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              Intente cambiar los términos de búsqueda o desactivar el filtro de disponibilidad.
            </p>
            <button
              onClick={handleResetFilters}
              className="fkr-btn fkr-btn-outline text-xs mt-2"
            >
              Restablecer filtros
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
