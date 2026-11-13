import { asset } from '../utils/asset';
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Store, 
  Wrench, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { SiteContent, CompanyGalleryItem } from '../types';
import { useLanguage } from '../locales/LanguageContext';
import { api } from '../services/api';

interface CompanyProps {
  content: SiteContent | null;
  navigate: (path: string) => void;
}

export const Company: React.FC<CompanyProps> = ({ content, navigate }) => {
  const { t, localize } = useLanguage();
  const company = content?.company;

  // Administrable Company Gallery state
  const [galleryItems, setGalleryItems] = useState<CompanyGalleryItem[]>([]);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<CompanyGalleryItem | null>(null);

  // Slideshow / Automatic Transition State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Slideshow Slides: Official corporate photographs
  const slides = [
    {
      id: 'slide-1',
      title: 'Sede Central y Tienda en La Lisa',
      subtitle: 'Instalaciones centrales de FKR SURL en La Lisa con taller, patio logístico y flota de generadores HIMOINSA',
      slogan: 'Disponibilidad de repuestos y servicio postventa en La Lisa',
      image: asset('/assets/facility/fkr-sede-la-lisa.jpg'),
      badge: 'SEDE CENTRAL LA LISA',
    },
    {
      id: 'slide-4',
      title: 'Tienda Oficial de Insumos en La Lisa',
      subtitle: 'Venta directa en mostrador de lubricantes Repsol Leader y Giant, baterías JET JEX95D y filtros',
      slogan: 'Stock de fluidos y piezas en tienda',
      image: asset('/assets/facility/fkr-tienda-interior.jpg'),
      badge: 'TIENDA EN LA LISA',
    },
    {
      id: 'slide-5',
      title: 'Flota de Transporte y Logística Propia',
      subtitle: 'Medios especializados de transporte para maniobras y entregas seguras en toda La Habana',
      slogan: 'Capacidad operativa directa y logística adaptada a cada cliente',
      image: asset('/assets/facility/fkr-truck-loading-crane.jpg'),
      badge: 'LOGÍSTICA PROPIA',
    },
    {
      id: 'slide-6',
      title: 'Ingeniería en Terreno y Montaje en Altura',
      subtitle: 'Cuadrilla técnica capacitada en conexionado, cuadros ATS y puesta en marcha con carga',
      slogan: 'Rigor técnico y garantía postventa en Cuba',
      image: asset('/assets/facility/fkr-team-rooftop.jpg'),
      badge: 'INGENIERÍA Y MONTAJE',
    },
  ];

  // Auto-advance slideshow every 5 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Load administrable company gallery
  useEffect(() => {
    api.getCompanyGallery().then((items) => {
      if (items && items.length > 0) {
        setGalleryItems(items);
      }
    }).catch((err) => {
      console.error('Error fetching company gallery:', err);
    });
  }, []);

  // Store items sold in La Lisa (filtros, aceites, baterías)
  const storeItems = [
    {
      id: 'store-aceite-repsol',
      category: 'LUBRICANTES REPSOL',
      title: 'Aceites Repsol Heavy Duty & Leader Neo',
      desc: 'Formulados específicamente para motores diesel de generadores sometidos a regímenes continuos de trabajo severo en el clima de Cuba.',
      image: asset('/assets/products/repsol-leader-neo-5w30.jpg'),
      specs: ['Grado 5W-30 & 15W-40', 'Protección anti-desgaste y control de hollín', 'Envases sellados originales de fábrica'],
      whatsappText: 'Hola FKR SURL, deseo consultar precio y disponibilidad de aceites Repsol en la tienda de La Lisa.',
    },
    {
      id: 'store-filtros',
      category: 'FILTRACIÓN INDUSTRIAL',
      title: 'Filtros Originales de Aceite, Combustible y Aire',
      desc: 'Cartuchos y filtros de alto rendimiento para retención de impurezas y partículas de azufre, asegurando la vida útil de bombas e inyectores.',
      image: asset('/assets/facility/fkr-tienda-interior.jpg'),
      specs: ['Filtros de combustible con separador de agua', 'Filtros de aceite de flujo total', 'Filtros de aire de alta capacidad'],
      whatsappText: 'Hola FKR SURL, deseo consultar stock de filtros para generadores en su tienda de La Lisa.',
    },
    {
      id: 'store-baterias',
      category: 'ARRANQUE Y ACUMULACIÓN',
      title: 'Baterías JET JEX95D Libre de Mantenimiento',
      desc: 'Baterías de 12V 95Ah con 710A CCA de corriente de arranque en frío y 150 min de reserva para generadores y vehículos.',
      image: asset('/assets/products/bateria-jet-960x720.webp'),
      specs: ['12V / 95Ah C20 (25°C)', '710A CCA (-18°C) corriente de arranque', '150 min reserva · Rango 13.8V-14.5V', 'Libre de mantenimiento · ISO 9001'],
      whatsappText: 'Hola FKR SURL, deseo consultar disponibilidad de la batería JET JEX95D (12V 95Ah) en la tienda de La Lisa.',
    },
  ];

  return (
    <div className="py-8 sm:py-12 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Hero Banner with Bluish-Gray Industrial Theme (#2C353F) */}
        <div className="bg-[#2C353F] text-white p-6 sm:p-12 lg:p-14 border border-[#414D5C] relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-blueprint-dark opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-3.5">
            <div className="flex items-center gap-2.5 text-[#D20A11] text-xs sm:text-sm font-headline font-bold uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-[#D20A11]" />
              <span>Institucional · FKR SURL Soluciones Energéticas</span>
            </div>
            <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Sede Central, Tienda y Capacidad Operativa
            </h1>
            <p className="text-base sm:text-xl text-[#CBD5E1] leading-relaxed font-normal">
              Empresa cubana con sede y tienda física en La Lisa, La Habana. Suministro, transporte y logística propia, montaje electromecánico y venta de insumos originales.
            </p>
          </div>
        </div>

        {/* 
          AUTOMATIC SLIDESHOW / TRANSITION PANEL
          Official corporate photographs of FKR SURL facilities and operations
        */}
        <section 
          className="bg-white border border-[#D1D5DB] p-4 sm:p-6 shadow-sm overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[16/9] sm:aspect-[2.2/1] lg:aspect-[2.6/1] bg-[#2C353F] overflow-hidden border border-[#414D5C]">
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
                    }}
                  />
                  
                  {/* Subtle dark contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C353F]/90 via-[#2C353F]/40 to-transparent flex items-end">
                    <div className="p-6 sm:p-10 max-w-3xl space-y-2 text-white">
                      <span className="inline-block px-3 py-1 bg-[#D20A11] text-white text-[11px] font-mono font-bold tracking-widest uppercase">
                        {slide.badge}
                      </span>
                      <h2 className="font-headline font-bold text-xl sm:text-3xl lg:text-4xl leading-tight">
                        {slide.title}
                      </h2>
                      <p className="text-xs sm:text-base text-[#E2E8F0] line-clamp-2">
                        {slide.subtitle}
                      </p>
                      <span className="text-xs sm:text-sm font-semibold text-[#CBD5E1] block italic pt-1">
                        "{slide.slogan}"
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Manual Arrows */}
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#2C353F]/80 hover:bg-[#D20A11] text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % slides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#2C353F]/80 hover:bg-[#D20A11] text-white flex items-center justify-center transition-colors shadow-md"
              aria-label="Siguiente diapositiva"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`h-2 transition-all ${
                    i === currentSlideIndex ? 'w-8 bg-[#D20A11]' : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Ir a diapositiva ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 
          TIENDA OFICIAL EN LA SEDE DE LA LISA (REEMPLAZA EL ALMACÉN DE REPUESTOS)
          Mostrando los artículos reales que vende: filtros, aceites y baterías.
        */}
        <section className="bg-white border border-[#D1D5DB] p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2 text-[#D20A11] text-xs sm:text-sm font-headline font-bold uppercase tracking-widest mb-1">
                <Store className="w-4 h-4 text-[#D20A11]" />
                <span>Punto de Venta Directo en La Habana</span>
              </div>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1C1C]">
                Tienda FKR en su Sede de La Lisa
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#4B5563] max-w-md">
              Atención presencial en mostrador para compra inmediata de aceites Repsol, filtros de recambio y baterías industriales.
            </p>
          </div>

          {/* Store items cards: Reorganized horizontally for wide layout and low scroll */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {storeItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#D20A11] transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs"
              >
                <div className="relative aspect-[16/10] bg-[#E2E8F0] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#2C353F] text-white text-[11px] font-mono px-2.5 py-1 tracking-wider uppercase">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#0F172A] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed mt-2.5">
                      {item.desc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] space-y-1.5">
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-[#334155]">
                          <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0]">
                    <a
                      href={`https://wa.me/5350998801?text=${encodeURIComponent(item.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white w-full justify-center text-sm sm:text-base py-3 px-4 shadow-xs flex items-center gap-2 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 text-current shrink-0" />
                      <span>Contactar con Tienda La Lisa</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Store location & customer care strip */}
          <div className="bg-[#2C353F] text-white p-6 sm:p-8 border border-[#414D5C] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 bg-[#D20A11] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <strong className="block text-lg sm:text-xl font-headline font-bold uppercase">
                  Visite nuestra tienda en La Lisa
                </strong>
                <span className="text-sm sm:text-base text-[#CBD5E1]">
                  Dirección: 2GWX+Q5G, La Habana, Cuba · Horario de atención comercial y retiro de insumos
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/contacto')}
              className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-6 shrink-0"
            >
              <span>Ver Ubicación en Mapa</span>
              <span className="text-sm">↗</span>
            </button>
          </div>

        </section>

        {/* 
          GALERÍA DE IMÁGENES DE LA EMPRESA (ADMINISTRABLE)
          Permite subir, ordenar y eliminar fotos desde el panel administrativo.
        */}
        <section className="bg-white border border-[#D1D5DB] p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2 text-[#D20A11] text-xs sm:text-sm font-headline font-bold uppercase tracking-widest mb-1">
                <span className="w-4 h-[2px] bg-[#D20A11]" />
                <span>Instalaciones, Flota y Equipamiento</span>
              </div>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1C1C]">
                Galería Institucional de FKR SURL
              </h2>
            </div>
            
            <button
              onClick={() => navigate('/admin')}
              className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] hover:underline uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>Gestionar galería en panel admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group cursor-pointer bg-white border border-[#D1D5DB] hover:border-[#D20A11] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-[#F4F5F7] overflow-hidden">
                  <img
                    src={asset(item.imageUrl)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
                    }}
                  />
                  <div className="absolute inset-0 bg-[#000000]/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 bg-white text-[#1A1C1C] shadow-md">
                      <Maximize2 className="w-5 h-5 text-[#D20A11]" />
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="font-headline font-bold text-base text-[#1A1C1C] group-hover:text-[#D20A11] transition-colors leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>

      {/* Lightbox Modal for Company Gallery */}
      {selectedGalleryItem && (
        <div 
          onClick={() => setSelectedGalleryItem(null)}
          className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-2 border-[#2C353F] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 bg-[#2C353F] text-white hover:bg-[#D20A11] flex items-center justify-center transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[16/10] bg-[#101317]">
              <img
                src={asset(selectedGalleryItem.imageUrl)}
                alt={selectedGalleryItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#1A1C1C]">
                {selectedGalleryItem.title}
              </h3>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {selectedGalleryItem.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 border-t border-[#E5E7EB]">
                <a
                  href={`https://wa.me/5350998801?text=${encodeURIComponent(
                    `Hola FKR SURL, estoy consultando información sobre ${selectedGalleryItem.title} desde su página web.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white text-sm py-2.5 px-5 flex items-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-current shrink-0" />
                  <span>Contactar por WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="fkr-btn fkr-btn-outline text-sm py-2.5 px-5"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
