import { asset } from '../utils/asset';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, ShieldCheck, FileText, Check, MessageCircle } from 'lucide-react';
import { Product, Category } from '../types';
import { useLanguage } from '../locales/LanguageContext';
import { ProductCard } from '../components/catalog/ProductCard';
import { generateProductPdf } from '../utils/generateProductPdf';

interface ProductDetailProps {
  slug: string;
  products: Product[];
  categories: Category[];
  navigate: (path: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  slug,
  products,
  categories,
  navigate,
}) => {
  const { t, localize } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  // Find product
  const product = products.find((p) => p.slug === slug || p.id === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setPdfDownloaded(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-headline font-bold text-2xl text-[#101317]">
          Equipo no encontrado
        </h2>
        <p className="text-sm text-[#6B7280]">
          El equipo solicitado no existe o ha sido retirado del catálogo.
        </p>
        <button
          onClick={() => navigate('/catalogo')}
          className="fkr-btn fkr-btn-primary text-xs"
        >
          {t.common.backToCatalog}
        </button>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const allImages = [product.primaryImage, ...(product.gallery || [])].filter(
    (img, i, arr) => arr.indexOf(img) === i
  );
  const currentImage = allImages[activeImageIndex] || product.primaryImage;
  const productName = localize(product.name);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.published)
    .slice(0, 3);

  // Direct WhatsApp Consultation URL with pre-filled product details
  const whatsappInquiryUrl = `https://wa.me/5350998801?text=${encodeURIComponent(
    `Hola FKR SURL, estoy consultando desde su web el equipo ${productName} (Ref: ${product.slug}). Deseo cotización y verificar disponibilidad en La Habana.`
  )}`;

  const handleDownloadPdf = () => {
    setPdfGenerating(true);
    try {
      generateProductPdf(product, category);
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 4000);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setPdfGenerating(false);
    }
  };

  return (
    <div className="py-8 sm:py-10 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm sm:text-base text-[#4B5563] mb-6 font-medium">
          <button onClick={() => navigate('/')} className="hover:text-[#D20A11] transition-colors">
            {t.nav.home}
          </button>
          <span>/</span>
          <button onClick={() => navigate('/catalogo')} className="hover:text-[#D20A11] transition-colors">
            {t.nav.catalog}
          </button>
          {category && (
            <>
              <span>/</span>
              <button
                onClick={() => navigate(`/catalogo?category=${category.id}`)}
                className="hover:text-[#D20A11] transition-colors"
              >
                {localize(category.name)}
              </button>
            </>
          )}
          <span>/</span>
          <span className="text-[#101317] font-bold truncate max-w-xs">
            {productName}
          </span>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate('/catalogo')}
          className="inline-flex items-center gap-2 text-sm sm:text-base font-headline font-bold text-[#374151] hover:text-[#D20A11] uppercase tracking-wider mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t.common.backToCatalog}</span>
        </button>

        {/* Product Primary Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#E5E7EB] p-6 sm:p-10 shadow-sm mb-12">
          
          {/* Left Column: Image Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative h-80 sm:h-[460px] bg-[#F4F5F7] border border-[#E5E7EB] flex items-center justify-center p-6 overflow-hidden">
              <img
                src={asset(currentImage)}
                alt={productName}
                className="w-full h-full object-contain transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
                }}
              />

              {/* Status flag */}
              <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 border border-[#E5E7EB] text-xs sm:text-sm font-headline font-bold uppercase tracking-wider shadow-xs">
                {product.available ? (
                  <span className="text-[#15803D] flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#15803D] inline-block" />
                    {t.common.available}
                  </span>
                ) : (
                  <span className="text-[#B45309] flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#B45309] inline-block" />
                    {t.common.unavailable}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails strip */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 bg-[#F4F5F7] border p-1 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#D20A11] ring-2 ring-[#D20A11]'
                        : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                    }`}
                  >
                    <img
                      src={asset(img)}
                      alt={`Vista ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Operational reassurance banner */}
            <div className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] text-sm sm:text-base text-[#374151] space-y-2">
              <div className="font-headline font-bold text-[#101317] flex items-center gap-2.5 uppercase tracking-wide">
                <ShieldCheck className="w-5 h-5 text-[#D20A11]" />
                <span>Garantía y Servicio FKR SURL en Cuba</span>
              </div>
              <p className="leading-relaxed">
                {t.productDetail.guaranteeNotice}
              </p>
            </div>

          </div>

          {/* Right Column: Information & Actions (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category kicker */}
              <div className="text-sm sm:text-base font-headline font-bold text-[#D20A11] uppercase tracking-widest">
                {category ? localize(category.name) : 'FKR SURL'}
              </div>

              {/* Product Headline */}
              <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#101317] tracking-tight leading-tight">
                {productName}
              </h1>

              {/* Short description */}
              <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
                {localize(product.shortDescription)}
              </p>

              {/* Detailed description */}
              {product.fullDescription && (
                <div className="pt-3 border-t border-[#F3F4F6] text-base text-[#4B5563] leading-relaxed">
                  {localize(product.fullDescription)}
                </div>
              )}
            </div>

            {/* Action Buttons (Direct WhatsApp consultation + Brand PDF generator, NO FORMS) */}
            <div className="space-y-3.5 pt-6 border-t border-[#E5E7EB]">
              
              {/* Primary Consultation via WhatsApp with Minimalist Outline Styling */}
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white w-full justify-center py-4 text-base sm:text-lg font-headline font-bold uppercase tracking-wider shadow-sm flex items-center gap-3 transition-all"
              >
                <MessageCircle className="w-6 h-6 text-current shrink-0" />
                <span>Contactar por WhatsApp</span>
              </a>

              {/* Branded Technical Sheet PDF Generator */}
              <button
                onClick={handleDownloadPdf}
                disabled={pdfGenerating}
                className="fkr-btn fkr-btn-primary w-full justify-center py-4 text-base sm:text-lg font-headline font-bold uppercase tracking-wider flex items-center gap-3 shadow-sm"
              >
                {pdfDownloaded ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Ficha Técnica Descargada</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>{pdfGenerating ? 'Generando PDF...' : 'Descargar Ficha Técnica (PDF Oficial)'}</span>
                  </>
                )}
              </button>

              <div className="text-center text-sm text-[#4B5563] pt-1">
                Ficha oficial en formato PDF con especificaciones técnicas, garantía y datos de FKR SURL.
              </div>

            </div>

          </div>

        </div>

        {/* Technical Specifications Section */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="bg-white border border-[#E5E7EB] p-6 sm:p-10 shadow-sm mb-12">
            <div className="border-b border-[#E5E7EB] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-widest text-[#D20A11] block mb-1">
                  Parámetros Nominales
                </span>
                <h2 className="font-headline font-bold text-2xl sm:text-3xl text-[#101317]">
                  {t.productDetail.specsTitle}
                </h2>
              </div>

              {/* Second trigger to download PDF */}
              <button
                onClick={handleDownloadPdf}
                className="fkr-btn fkr-btn-outline text-sm py-2.5 px-4 flex items-center gap-2 self-start sm:self-auto"
              >
                <FileText className="w-4 h-4 text-[#D20A11]" />
                <span>Exportar en PDF</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm sm:text-base border-collapse">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'}
                    >
                      <th className="py-3.5 px-5 font-headline font-bold text-[#1F242C] border-b border-[#E5E7EB] w-1/3">
                        {spec.key}
                      </th>
                      <td className="py-3.5 px-5 text-[#101317] border-b border-[#E5E7EB] font-mono-num font-semibold">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="border-b border-[#E5E7EB] pb-4 mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-widest text-[#D20A11] block mb-1">
                  Recomendaciones
                </span>
                <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#101317]">
                  {t.productDetail.relatedTitle}
                </h3>
              </div>
              <button
                onClick={() => navigate('/catalogo')}
                className="fkr-btn fkr-btn-outline text-sm"
              >
                {t.common.viewAll} →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  categories={categories}
                  navigate={navigate}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
