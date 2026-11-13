import { asset } from '../utils/asset';
import React, { useState } from 'react';
import { 
  Search, 
  Truck, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  X,
  Maximize2,
  MessageCircle
} from 'lucide-react';
import { SiteContent } from '../types';
import { useLanguage } from '../locales/LanguageContext';

interface ServicesProps {
  content: SiteContent | null;
  navigate: (path: string) => void;
  initialStep?: string;
}

const parseStepIndex = (val?: string | null): number => {
  if (!val) return 0;
  const clean = val.toLowerCase().trim();
  if (clean === '01' || clean === '1' || clean.includes('estudio')) return 0;
  if (clean === '02' || clean === '2' || clean.includes('transporte')) return 1;
  if (clean === '03' || clean === '3' || clean.includes('montaje')) return 2;
  if (clean === '04' || clean === '4' || clean.includes('instalacion') || clean.includes('instalación')) return 3;
  if (clean === '05' || clean === '5' || clean.includes('garantia') || clean.includes('garantía') || clean.includes('postventa')) return 4;
  if (clean === '06' || clean === '6' || clean.includes('mantenimiento') || clean.includes('repuesto')) return 5;
  const num = parseInt(clean, 10);
  if (!isNaN(num) && num >= 1 && num <= 6) return num - 1;
  return 0;
};

export const Services: React.FC<ServicesProps> = ({ content, navigate, initialStep }) => {
  const { t } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState<number>(() => {
    return parseStepIndex(
      initialStep || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('step') : null)
    );
  });
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<any | null>(null);

  // Synchronize active step and smoothly scroll to the conceptual map details when navigated to a step
  React.useEffect(() => {
    const stepParam = initialStep || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('step') : null);
    if (stepParam) {
      const idx = parseStepIndex(stepParam);
      setActiveStepIndex(idx);

      const timer = setTimeout(() => {
        const target = document.getElementById('detalles-paso') || document.getElementById('mapa-servicios');
        if (target) {
          const headerOffset = 90;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 140);
      return () => clearTimeout(timer);
    }
  }, [initialStep]);

  const handleSelectStep = (idx: number) => {
    setActiveStepIndex(idx);
    window.history.replaceState({}, '', `/servicios?step=${steps[idx].number}`);
  };

  // 6 Sequential Steps of the Interactive Conceptual Map (strictly in requested order)
  const steps = [
    {
      number: '01',
      title: 'Estudio Energético',
      shortDesc: 'Evaluación técnica, levantamiento de carga y dimensionamiento.',
      fullDesc: 'Nuestros ingenieros analizan detalladamente el perfil de consumo eléctrico, cargas críticas continuas y de arranque, factor de potencia y requerimientos de autonomía para definir con exactitud la potencia (kVA/kW) y la tecnología ideal (grupo electrógeno diesel o kit solar híbrido).',
      icon: Search,
      tag: 'FASE INICIAL',
    },
    {
      number: '02',
      title: 'Transporte',
      shortDesc: 'Logística y medios propios de transporte desde La Lisa.',
      fullDesc: 'Disponemos de transporte y logística propia con diversos medios adaptados para el traslado seguro de generadores de gran tonelaje, sistemas solares e insumos industriales directamente desde nuestra sede en La Lisa hasta la locación del cliente, garantizando una entrega segura sin intermediarios.',
      icon: Truck,
      tag: 'LOGÍSTICA',
    },
    {
      number: '03',
      title: 'Montaje',
      shortDesc: 'Maniobras mecánicas especializadas de montaje y posicionamiento.',
      fullDesc: 'Ejecución de maniobras mecánicas de montaje y elevación adaptadas a cada locación y equipo. Posicionamos las plantas eléctricas con precisión sobre cubiertas de edificios, azoteas o losas técnicas con apoyos antivibratorios industriales reglamentarios.',
      icon: Layers,
      tag: 'MANIOBRA TÉCNICA',
    },
    {
      number: '04',
      title: 'Instalación',
      shortDesc: 'Conexión eléctrica, cuadro de transferencia (ATS) y puesta a tierra.',
      fullDesc: 'Instalación electromecánica completa: tendido de acometidas de potencia en cobre de alto calibre, cuadro de transferencia automática (ATS) para conmutación inmediata ante cortes de red, sistema de puesta a tierra certificado y sistema de escape de gases.',
      icon: Zap,
      tag: 'ELECTROMECÁNICA',
    },
    {
      number: '05',
      title: 'Garantía Postventa',
      shortDesc: 'Acompañamiento técnico directo y respaldo garantizado en Cuba.',
      fullDesc: 'FKR SURL respalda cada suministro con una política de garantía real y local. Contamos con ingenieros y mecánicos en La Habana preparados para responder con agilidad, brindar asesoría continua y asegurar la operatividad permanente de su inversión energética.',
      icon: ShieldCheck,
      tag: 'PROTECCIÓN Y RESPALDO',
    },
    {
      number: '06',
      title: 'Mantenimiento',
      shortDesc: 'Planes preventivos, correctivos y piezas de repuesto originales.',
      fullDesc: 'Programas periódicos de mantenimiento que incluyen cambio de lubricantes Repsol específicos para generadores (Heavy Duty / Leader), sustitución de filtros de aceite, combustible y aire, pruebas con carga y suministro inmediato de baterías JET JEX95D (12V 95Ah / 710A CCA) y repuestos originales.',
      icon: Wrench,
      tag: 'OPERACIÓN CONTINUA',
    },
  ];

  // Gallery of Services Images (replacing the single hoist crane image)
  const serviceGallery = [
    {
      id: 'srv-gal-1',
      title: 'Transporte y Logística Especializada',
      subtitle: 'Medios propios de FKR para maniobras complejas y traslados seguros en La Habana',
      image: asset('/assets/facility/fkr-truck-loading-crane.jpg'),
      stage: '02. Transporte & 03. Montaje',
    },
    {
      id: 'srv-gal-2',
      title: 'Instalación en Azotea por Cuadrilla Técnica',
      subtitle: 'Técnicos certificados realizando conexionado y verificación electromecánica',
      image: asset('/assets/facility/fkr-team-rooftop.jpg'),
      stage: '03. Montaje & 04. Instalación',
    },
    {
      id: 'srv-gal-3',
      title: 'Montaje Mecánico y Elevación de Equipos',
      subtitle: 'Elevación y posicionamiento seguro de plantas eléctricas con equipo calificado',
      image: asset('/assets/facility/fkr-engine-hoist.jpg'),
      stage: '03. Montaje',
    },
    {
      id: 'srv-gal-4',
      title: 'Preparación de Flota HIMOINSA en Sede Central',
      subtitle: 'Inspección previa, calibración y pruebas de carga antes del despacho',
      image: asset('/assets/facility/fkr-sede-la-lisa.jpg'),
      stage: '01. Estudio & Despacho',
    },
    {
      id: 'srv-gal-5',
      title: 'Instalación de Sistemas Solares ROSEN',
      subtitle: 'Montaje de inversores híbridos inteligentes y bancos de baterías de litio',
      image: asset('/assets/products/rosen-solar-inverter-system.jpg'),
      stage: '04. Instalación Solar',
    },
    {
      id: 'srv-gal-6',
      title: 'Tienda de Repuestos y Sede en La Lisa',
      subtitle: 'Stock permanente de lubricantes Repsol, filtros y baterías para mantenimiento',
      image: asset('/assets/facility/fkr-tienda-interior.jpg'),
      stage: '06. Mantenimiento & Repuestos',
    },
  ];

  const activeStep = steps[activeStepIndex];
  const ActiveIcon = activeStep.icon;

  const handleWhatsappStepInquiry = (stepName: string) => {
    const text = encodeURIComponent(
      `Hola FKR SURL, deseo coordinar información técnica sobre el paso "${stepName}" de sus servicios energéticos.`
    );
    window.open(`https://wa.me/5350998801?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Hero Banner with Bluish-Gray Industrial Theme (#2C353F) */}
        <div className="bg-[#2C353F] text-white p-6 sm:p-12 lg:p-14 border border-[#414D5C] relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-blueprint-dark opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-3.5">
            <div className="flex items-center gap-2.5 text-[#D20A11] text-xs sm:text-sm font-headline font-bold uppercase tracking-widest">
              <span className="w-5 h-[2px] bg-[#D20A11]" />
              <span>Ciclo Completo de Ingeniería y Respaldo</span>
            </div>
            <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              Servicios Técnicos Especializados
            </h1>
            <p className="text-base sm:text-xl text-[#CBD5E1] leading-relaxed font-normal">
              Acompañamiento integral desde el estudio inicial hasta el mantenimiento postventa con personal técnico propio en La Lisa, La Habana.
            </p>
          </div>
        </div>

        {/* 
          INTERACTIVE CONCEPTUAL MAP (MAPA CONCEPTUAL INTERACTIVO)
          Paso a paso en orden exacto:
          1. Estudio Energético
          2. Transporte
          3. Montaje
          4. Instalación
          5. Garantía Postventa
          6. Mantenimiento (incluye piezas de repuesto)
        */}
        <section id="mapa-servicios" className="bg-white border border-[#D1D5DB] p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2 text-[#D20A11] text-xs sm:text-sm font-headline font-bold uppercase tracking-widest mb-1">
                <span className="w-4 h-[2px] bg-[#D20A11]" />
                <span>Mapa Conceptual Interactivo</span>
              </div>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1C1C]">
                Flujo Integral del Servicio FKR
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#4B5563] max-w-md">
              Seleccione o deslice cualquier etapa para conocer el alcance técnico y las garantías ofrecidas en cada fase.
            </p>
          </div>

          {/* Stepper Navigation: Responsive horizontal row on desktop, finger-usable slider/tabs on mobile */}
          <div className="overflow-x-auto pb-3 -mx-2 px-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 min-w-[620px] lg:min-w-0">
              {steps.map((st, idx) => {
                const isActive = idx === activeStepIndex;
                const StepIcon = st.icon;

                return (
                  <button
                    key={st.number}
                    onClick={() => handleSelectStep(idx)}
                    className={`p-3.5 sm:p-4 text-left border transition-all duration-200 flex flex-col justify-between min-h-[110px] sm:min-h-[120px] group cursor-pointer ${
                      isActive
                        ? 'bg-[#2C353F] border-[#D20A11] text-white shadow-md -translate-y-0.5'
                        : 'bg-[#F9FAFB] border-[#D1D5DB] text-[#1A1C1C] hover:border-[#D20A11] hover:bg-white dark:hover:bg-[#27303A]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`text-xs font-mono font-bold tracking-wider ${
                        isActive ? 'text-[#D20A11]' : 'text-[#6B7280]'
                      }`}>
                        PASO {st.number}
                      </span>
                      <StepIcon className={`w-5 h-5 ${
                        isActive ? 'text-[#D20A11]' : 'text-[#4B5563] group-hover:text-[#D20A11]'
                      }`} />
                    </div>

                    <div>
                      <h3 className={`font-headline font-bold text-sm sm:text-base leading-snug line-clamp-2 ${
                        isActive ? 'text-white' : 'text-[#1A1C1C]'
                      }`}>
                        {st.title}
                      </h3>
                    </div>

                    {/* Step indicator bar */}
                    <div className={`mt-2 h-[2px] w-full transition-all ${
                      isActive ? 'bg-[#D20A11]' : 'bg-transparent group-hover:bg-[#E5E7EB]'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Detailed Showcase Card (Horizontal & Wide format) */}
          <div id="detalles-paso" className="bg-[#F8FAFC] border-2 border-[#2C353F] p-6 sm:p-10 shadow-md scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Number badge + Icon + Titles */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#D20A11] text-white text-xs font-bold uppercase tracking-widest">
                    Paso {activeStep.number} de 06
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                    {activeStep.tag}
                  </span>
                </div>

                <div className="flex items-start gap-4 pt-1">
                  <div className="w-14 h-14 bg-[#2C353F] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ActiveIcon className="w-7 h-7 text-[#D20A11]" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1C1C]">
                      {activeStep.title}
                    </h3>
                    <p className="text-base sm:text-lg text-[#D20A11] font-semibold mt-1">
                      {activeStep.shortDesc}
                    </p>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#334155] leading-relaxed pt-2">
                  {activeStep.fullDesc}
                </p>
              </div>

              {/* Right Column: Interactive Actions & Direct Consultation */}
              <div className="lg:col-span-4 bg-white border border-[#CBD5E1] p-6 space-y-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-widest block mb-1">
                    Atención Directa
                  </span>
                  <h4 className="font-headline font-bold text-lg sm:text-xl text-[#0F172A] leading-snug">
                    Para más información
                  </h4>
                  <p className="text-sm text-[#475569] mt-2">
                    Comuníquese directamente con nuestro equipo técnico de guardia en La Lisa, La Habana para coordinar detalles de este paso.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => handleWhatsappStepInquiry(activeStep.title)}
                    className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white w-full justify-center text-sm sm:text-base py-3 px-4 shadow-xs flex items-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-5 h-5 text-current shrink-0" />
                    <span>Contactar por WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleSelectStep(activeStepIndex > 0 ? activeStepIndex - 1 : steps.length - 1)}
                      className="text-xs sm:text-sm font-bold text-[#475569] hover:text-[#D20A11] flex items-center gap-1 py-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Anterior</span>
                    </button>

                    <button
                      onClick={() => handleSelectStep(activeStepIndex < steps.length - 1 ? activeStepIndex + 1 : 0)}
                      className="text-xs sm:text-sm font-bold text-[#D20A11] hover:underline flex items-center gap-1 py-1"
                    >
                      <span>Siguiente paso</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </section>

        {/* 
          SERVICES IMAGE GALLERY (GALERÍA DE IMÁGENES DE SERVICIOS)
          Added underneath the conceptual map, replacing the old single crane image.
        */}
        <section className="bg-white border border-[#D1D5DB] p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
            <div>
              <div className="flex items-center gap-2 text-[#D20A11] text-xs sm:text-sm font-headline font-bold uppercase tracking-widest mb-1">
                <span className="w-4 h-[2px] bg-[#D20A11]" />
                <span>Evidencia Gráfica en Cuba</span>
              </div>
              <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1C1C]">
                Galería de Operaciones y Servicios Técnicos
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#4B5563] max-w-md">
              Fotografías reales de transporte pesado, maniobras de izaje, montaje en azoteas y taller en La Lisa.
            </p>
          </div>

          {/* Responsive Gallery Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryImage(item)}
                className="group cursor-pointer bg-white border border-[#D1D5DB] hover:border-[#D20A11] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-[#F4F5F7] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#2C353F]/90 text-white text-[11px] font-mono px-2.5 py-1 tracking-wider uppercase backdrop-blur-xs">
                    {item.stage}
                  </span>
                  <div className="absolute inset-0 bg-[#000000]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 bg-white text-[#1A1C1C] shadow-md">
                      <Maximize2 className="w-5 h-5 text-[#D20A11]" />
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-headline font-bold text-base sm:text-lg text-[#1A1C1C] group-hover:text-[#D20A11] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

      </div>

      {/* Lightbox Modal for Services Gallery */}
      {selectedGalleryImage && (
        <div 
          onClick={() => setSelectedGalleryImage(null)}
          className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-2 border-[#2C353F] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 bg-[#2C353F] text-white hover:bg-[#D20A11] flex items-center justify-center transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-[16/10] bg-[#101317]">
              <img
                src={selectedGalleryImage.image}
                alt={selectedGalleryImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <span className="text-xs font-mono font-bold text-[#D20A11] uppercase tracking-widest block">
                {selectedGalleryImage.stage}
              </span>
              <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#1A1C1C]">
                {selectedGalleryImage.title}
              </h3>
              <p className="text-base text-[#4B5563] leading-relaxed">
                {selectedGalleryImage.subtitle}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 border-t border-[#E5E7EB]">
                <button
                  onClick={() => handleWhatsappStepInquiry(selectedGalleryImage.title)}
                  className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white text-sm py-2.5 px-5 flex items-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-current shrink-0" />
                  <span>Contactar sobre este servicio</span>
                </button>
                <button
                  onClick={() => setSelectedGalleryImage(null)}
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
