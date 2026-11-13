import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, Category } from '../../types';
import { ProductCard } from '../catalog/ProductCard';
import { useLanguage } from '../../locales/LanguageContext';

interface FeaturedProductsProps {
  products: Product[];
  categories: Category[];
  navigate: (path: string) => void;
  onInquire?: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  categories,
  navigate,
}) => {
  const { t } = useLanguage();
  const featured = products.filter((p) => p.featured && p.published);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 text-[#D20A11] text-sm sm:text-base font-headline font-bold uppercase tracking-widest mb-2">
              <span className="w-6 h-[2.5px] bg-[#D20A11]" />
              <span>Equipos Destacados</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#101317] tracking-tight">
              Sistemas de Generación y Respaldo Eléctrico
            </h2>
          </div>

          <button
            onClick={() => navigate('/catalogo')}
            className="fkr-btn fkr-btn-outline group shrink-0 text-sm sm:text-base"
          >
            <span>{t.common.exploreCatalog}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categories={categories}
              navigate={navigate}
            />
          ))}
        </div>



      </div>
    </section>
  );
};
