import React from 'react';
import { Wrench, Truck, PlayCircle, ShieldCheck, Settings, PackageCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';

interface ServicesBannerProps {
  navigate: (path: string) => void;
}

export const ServicesBanner: React.FC<ServicesBannerProps> = ({ navigate }) => {
  const { t } = useLanguage();

  const services = [
    {
      title: 'Estudio Energético',
      desc: 'Diagnóstico eléctrico y levantamiento de carga para dimensionar el equipo exacto.',
      icon: <Wrench className="w-5 h-5" />,
      number: '01'
    },
    {
      title: 'Transporte Propio',
      desc: 'Logística y medios propios de transporte acondicionados para traslado seguro de carga.',
      icon: <Truck className="w-5 h-5" />,
      number: '02'
    },
    {
      title: 'Montaje y Posicionamiento',
      desc: 'Maniobras mecánicas seguras y medios de elevación adaptados a cada locación.',
      icon: <PlayCircle className="w-5 h-5" />,
      number: '03'
    },
    {
      title: 'Instalación Electromecánica',
      desc: 'Conexión reglamentaria, cuadro de transferencia ATS y puesta en marcha con carga.',
      icon: <ShieldCheck className="w-5 h-5" />,
      number: '04'
    },
    {
      title: 'Garantía Postventa',
      desc: 'Soporte directo sin intermediarios por el equipo de ingenieros propios de FKR.',
      icon: <Settings className="w-5 h-5" />,
      number: '05'
    },
    {
      title: 'Mantenimiento & Repuestos',
      desc: 'Planes preventivos y stock en tienda de aceites Repsol, baterías y filtros.',
      icon: <PackageCheck className="w-5 h-5" />,
      number: '06'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#2C353F] text-white border-b border-[#414D5C] relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-dark opacity-15 pointer-events-none" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Top Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14 pb-5 border-b border-[#414D5C]">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="bg-[#D20A11] text-white text-xs font-headline font-bold uppercase tracking-wider px-2.5 py-0.5">
                Soporte de Ciclo Completo
              </span>
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Ingeniería y Servicios Especializados
            </h2>
          </div>
          <button
            onClick={() => navigate('/servicios')}
            className="fkr-btn fkr-btn-outline-dark group shrink-0 text-sm sm:text-base py-3 px-5"
          >
            <span>Ver detalles del servicio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Services Grid - Horizontal & wide on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {services.map((srv) => (
            <div
              key={srv.number}
              onClick={() => navigate(`/servicios?step=${srv.number}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/servicios?step=${srv.number}`);
                }
              }}
              className="bg-[#222931] border border-[#414D5C] hover:border-[#D20A11] p-5 sm:p-6 transition-all hover:-translate-y-1 group cursor-pointer flex flex-col justify-between shadow-xs select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-[#D20A11] text-white flex items-center justify-center shadow-xs">
                    {srv.icon}
                  </div>
                  <span className="font-headline font-bold text-xs font-mono text-[#CBD5E1]">
                    {srv.number}
                  </span>
                </div>

                <h3 className="font-headline font-bold text-base sm:text-lg text-white group-hover:text-[#F87171] transition-colors mb-2 leading-snug">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#334155] text-xs font-bold text-white group-hover:text-[#F87171] uppercase tracking-wider transition-colors flex items-center justify-between">
                <span>Ver detalle</span>
                <span className="text-[#D20A11] group-hover:text-white">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gigantografia Banner graphic representation */}
        <div className="mt-12 p-6 sm:p-8 bg-[#222931] border border-[#414D5C] flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-block bg-[#D20A11] text-white text-xs font-headline font-bold uppercase tracking-wider px-2 py-0.5">
              Sede Central en La Lisa
            </span>
            <h4 className="font-headline font-bold text-xl sm:text-2xl text-white">
              Taller Central y Tienda de Insumos en La Lisa, La Habana
            </h4>
            <p className="text-sm sm:text-base text-[#CBD5E1]">
              Atención presencial para compra de aceites Repsol, filtros, baterías y coordinación de maniobras.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigate('/contacto')}
              className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-6"
            >
              <span>Solicitar asistencia técnica</span>
              <span className="text-sm">↗</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
