import { asset } from '../../utils/asset';
import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Product, Category } from '../../types';
import { useLanguage } from '../../locales/LanguageContext';

interface ProductCardProps {
  product: Product;
  categories: Category[];
  navigate: (path: string) => void;
  onInquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categories,
  navigate,
}) => {
  const { t, localize } = useLanguage();
  const category = categories.find((c) => c.id === product.category);

  const whatsappInquiryUrl = `https://wa.me/5350998801?text=${encodeURIComponent(
    `Hola FKR SURL, deseo consultar sobre el equipo ${localize(product.name)} (Ref: ${product.slug}).`
  )}`;

  return (
    <article className="group bg-white border border-[#E5E7EB] hover:border-[#D20A11] transition-all hover:shadow-md flex flex-col justify-between">
      
      {/* Product Image Stage */}
      <div 
        onClick={() => navigate(`/catalogo/${product.slug}`)}
        className="relative aspect-[960/720] bg-white overflow-hidden cursor-pointer flex items-center justify-center border-b border-[#E5E7EB]"
      >
        <img
          src={asset(product.primaryImage)}
          alt={localize(product.name)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
          }}
        />

        {/* Top left category indicator */}
        <div className="absolute top-3 left-3 bg-[#101317]/95 text-white text-xs sm:text-sm font-headline font-bold uppercase tracking-wider px-2.5 py-1">
          {category ? localize(category.name) : 'FKR SURL'}
        </div>

        {/* Top right availability indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/95 px-2.5 py-1 text-xs sm:text-sm font-bold border border-[#E5E7EB] shadow-xs">
          {product.available ? (
            <span className="text-[#15803D] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#15803D] inline-block" />
              {t.common.available}
            </span>
          ) : (
            <span className="text-[#B45309] flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[#B45309] inline-block" />
              {t.common.unavailable}
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 
            onClick={() => navigate(`/catalogo/${product.slug}`)}
            className="font-headline font-bold text-xl sm:text-2xl text-[#101317] group-hover:text-[#D20A11] transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {localize(product.name)}
          </h3>

          <p className="text-sm sm:text-base text-[#374151] mt-2.5 leading-relaxed line-clamp-3">
            {localize(product.shortDescription)}
          </p>

          {/* Quick Specifications strip */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-[#F3F4F6] space-y-1.5">
              {product.specifications.slice(0, 2).map((spec, i) => (
                <div key={i} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-[#4B5563] font-medium">{spec.key}:</span>
                  <span className="font-bold text-[#101317] truncate max-w-[170px] text-right font-mono-num">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions Bottom Bar with Direct WhatsApp Consultation */}
        <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(`/catalogo/${product.slug}`)}
            className="text-sm sm:text-base font-headline font-bold text-[#101317] hover:text-[#D20A11] flex items-center gap-1.5 transition-colors uppercase tracking-wider py-1.5"
          >
            <span>{t.common.viewDetails}</span>
            <span className="text-base">→</span>
          </button>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white text-xs sm:text-sm py-2 px-3 flex items-center gap-1.5 transition-all shadow-xs"
            title="Contactar por WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-current shrink-0" />
            <span>Contactar</span>
          </a>
        </div>

      </div>

    </article>
  );
};
