import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';
import { Category } from '../../types';

interface SolutionsGridProps {
  categories: Category[];
  navigate: (path: string) => void;
}

export const SolutionsGrid: React.FC<SolutionsGridProps> = ({ categories, navigate }) => {
  const { t } = useLanguage();

  // 4 Featured Horizontal Panels under hero matching the exact reference layout from imagen.png
  const panels = [
    {
      id: 'panel-generadores',
      title: 'Grupos Electrógenos Diésel',
      subtitle: 'Plantas eléctricas insonorizadas para respaldo continuo residencial, comercial e industrial en Cuba.',
      image: '/assets/solutions/sol-generadores-720x540.webp',
      link: '/catalogo?category=cat-generadores',
      actionText: 'Ver generadores',
    },
    {
      id: 'panel-solar',
      title: 'Sistemas Solares Fotovoltaicos',
      subtitle: 'Inversores híbridos y módulos de acumulación con baterías de litio para respaldo y autonomía.',
      image: '/assets/solutions/sol-solar-720x540.webp',
      link: '/catalogo?category=cat-solar',
      actionText: 'Ver sistemas solares',
    },
    {
      id: 'panel-baterias',
      title: 'Baterías y Repuestos',
      subtitle: 'Baterías JET JEX95D de 95Ah (710A CCA), lubricantes Repsol y repuestos para generadores.',
      image: '/assets/solutions/sol-baterias-720x540.webp',
      link: '/catalogo?category=cat-baterias',
      actionText: 'Ver baterías y repuestos',
    },
    {
      id: 'panel-transporte',
      title: 'Transporte e Instalación',
      subtitle: 'Logística y medios propios para izaje, traslado seguro y maniobras de montaje en toda La Habana.',
      image: '/assets/solutions/sol-transporte-720x540.webp',
      link: '/servicios?step=02',
      actionText: 'Conocer servicios técnicos',
    },
  ];

  return (
    <section className="pt-8 sm:pt-12 pb-14 sm:pb-16 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Section Header */}
        <div className="mb-8 sm:mb-10 pb-4 border-b border-[#E5E7EB]">
          <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1C1C] tracking-tight">
            Líneas de Suministro y Respaldo Eléctrico
          </h2>
        </div>

        {/* 4 Cards Grid - Dimensioned in exact 720x540 format provided */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {panels.map((panel) => {
            return (
              <article
                key={panel.id}
                onClick={() => navigate(panel.link)}
                className="group cursor-pointer bg-white border border-[#D1D5DB] hover:border-[#D20A11] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                {/* 720x540 aspect ratio matching provided asset dimensions */}
                <div className="relative aspect-[720/540] bg-white overflow-hidden flex items-center justify-center">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/facility/fkr-gigantografia.png';
                    }}
                  />
                  {/* Red top line accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D20A11] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-headline font-bold text-lg sm:text-xl text-[#1A1C1C] group-hover:text-[#D20A11] transition-colors leading-snug">
                      {panel.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed mt-2">
                      {panel.subtitle}
                    </p>
                  </div>

                  {/* Clean text link with arrow */}
                  <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-wider">
                    <span>{panel.actionText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
