import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';

interface IndustrialProofProps {
  navigate: (path: string) => void;
}

export const IndustrialProof: React.FC<IndustrialProofProps> = ({ navigate }) => {
  const { t } = useLanguage();

  return (
    <section className="py-14 sm:py-18 bg-[#F4F5F7] border-b border-[#D1D5DB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 pb-5 border-b border-[#D1D5DB]">
          <div>
            <div className="flex items-center gap-2.5 text-[#D20A11] text-sm sm:text-base font-headline font-bold uppercase tracking-widest mb-1.5">
              <span className="w-6 h-[2.5px] bg-[#D20A11]" />
              <span>Capacidad Operativa en Terreno</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#101317] tracking-tight">
              Proyectos e Intervenciones Reales en Cuba
            </h2>
          </div>
        </div>

        {/* Bento Grid with Bright, 100% Clear Photography */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Showcase (Span 7): Technical Team on Havana Rooftop */}
          <div className="md:col-span-7 bg-white border border-[#E5E7EB] hover:border-[#D20A11] transition-all shadow-sm flex flex-col overflow-hidden">
            <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] md:min-h-[500px] bg-[#F4F5F7] overflow-hidden">
              <img
                src={asset('/assets/facility/fkr-team-rooftop.jpg')}
                alt="Equipo técnico de FKR SURL en instalación de generador HIMOINSA en azotea con vista a La Habana"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="p-6 sm:p-7 space-y-3 border-t border-[#F3F4F6] bg-white">
              <div className="flex items-center justify-between text-sm text-[#4B5563]">
                <span className="font-headline font-bold uppercase text-[#D20A11] tracking-wider text-xs sm:text-sm">
                  Montaje en Altura · La Habana
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[#101317] text-sm sm:text-base">
                  <MapPin className="w-4 h-4 text-[#D20A11]" />
                  La Habana, Cuba
                </span>
              </div>
              <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#101317]">
                Instalación y puesta en marcha de Grupo Electrógeno HIMOINSA
              </h3>
              <p className="text-base sm:text-lg text-[#374151] leading-relaxed">
                Cuadrilla técnica de FKR SURL tras la culminación del izaje y conexión de unidad insonorizada en cubierta, garantizando suministro continuo y seguro.
              </p>
            </div>
          </div>

          {/* Side Showcase (Span 5): 2 stacked cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Crane Truck Loading */}
            <div className="bg-white border border-[#E5E7EB] hover:border-[#D20A11] transition-all shadow-sm flex flex-col justify-between">
              <div className="relative h-48 sm:h-52 bg-[#F4F5F7] overflow-hidden">
                <img
                  src={asset('/assets/facility/fkr-truck-loading-crane.jpg')}
                  alt="Camión grúa cargando generador HIMOINSA en las instalaciones de FKR SURL"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-1.5">
                <span className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-wider block">
                  Logística Especializada
                </span>
                <h4 className="font-headline font-bold text-lg sm:text-xl text-[#101317]">
                  Transporte Propio y Maniobras de Elevación
                </h4>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  Medios propios de transporte para traslado seguro y maniobras de elevación hacia cubiertas y azoteas.
                </p>
              </div>
            </div>

            {/* Card 2: Solar Inverter Installation */}
            <div className="bg-white border border-[#E5E7EB] hover:border-[#D20A11] transition-all shadow-sm flex flex-col justify-between">
              <div className="relative h-48 sm:h-52 bg-[#F4F5F7] overflow-hidden">
                <img
                  src={asset('/assets/products/rosen-solar-inverter-system.jpg')}
                  alt="Instalación de inversores híbridos solares y baterías ROSEN"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-1.5">
                <span className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-wider block">
                  Energía Solar Fotovoltaica
                </span>
                <h4 className="font-headline font-bold text-lg sm:text-xl text-[#101317]">
                  Bancos de Baterías de Litio de Pared ROSEN
                </h4>
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  Sistemas modulares híbridos para autonomía energética residencial y comercial.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* CTA to Company Page */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/empresa')}
            className="inline-flex items-center gap-2.5 text-sm sm:text-base font-headline font-bold uppercase tracking-wider text-[#101317] hover:text-[#D20A11] transition-colors"
          >
            <span>Conozca más sobre nuestras instalaciones y taller en La Lisa</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
