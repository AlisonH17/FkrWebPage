import React from 'react';
import { MessageCircle } from 'lucide-react';
import { HeroVideo } from '../components/home/HeroVideo';
import { SolutionsGrid } from '../components/home/SolutionsGrid';
import { ServicesBanner } from '../components/home/ServicesBanner';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { IndustrialProof } from '../components/home/IndustrialProof';
import { LocationMap } from '../components/home/LocationMap';
import { Product, Category } from '../types';
import { useLanguage } from '../locales/LanguageContext';

interface HomeProps {
  products: Product[];
  categories: Category[];
  navigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ products, categories, navigate }) => {
  const { t } = useLanguage();

  return (
    <div>
      {/* 1. Hero with Video & Clean Panoramic Banner */}
      <HeroVideo navigate={navigate} />

      {/* 2. Solutions / Categories Grid (with 970x720 aspect ratio) */}
      <SolutionsGrid categories={categories} navigate={navigate} />

      {/* 3. Official Services Banner (swapped before Featured Products as requested) */}
      <ServicesBanner navigate={navigate} />

      {/* 4. Featured Products (Equipos destacados) */}
      <FeaturedProducts
        products={products}
        categories={categories}
        navigate={navigate}
      />

      {/* 5. Industrial Proof & Authentic Gallery in Cuba */}
      <IndustrialProof navigate={navigate} />

      {/* 6. Google Maps Location View in La Lisa */}
      <LocationMap />

      {/* 7. Quick Direct Contact Bridge with Minimalist White/Red Outline Button */}
      <section className="py-16 sm:py-20 bg-[#2C353F] text-white relative overflow-hidden border-t border-[#414D5C]">
        <div className="absolute inset-0 bg-blueprint-dark opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#222931] border border-[#414D5C] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <span className="inline-block bg-[#D20A11] text-white text-xs sm:text-sm font-headline font-bold uppercase tracking-wider px-3 py-1 shadow-xs">
                Asesoría Técnica Directa
              </span>
              <h2 className="font-headline font-bold text-2xl sm:text-4xl lg:text-5xl text-white">
                ¿Necesita evaluar la potencia o el tipo de respaldo para su instalación?
              </h2>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                Nuestros ingenieros en La Lisa, La Habana le orientan en la selección del grupo electrógeno, inversor solar o banco de baterías ideal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => navigate('/contacto')}
                className="fkr-btn fkr-btn-primary w-full sm:w-auto text-base sm:text-lg py-3.5 px-6"
              >
                <span>Ver canales y mapa</span>
                <span className="text-sm">↗</span>
              </button>
              
              <a
                href="https://wa.me/5350998801?text=Hola%20FKR%20SURL,%20deseo%20asesor%C3%ADa%20t%C3%A9cnica%20sobre%20soluciones%20energ%C3%A9ticas."
                target="_blank"
                rel="noopener noreferrer"
                className="fkr-btn border-2 border-white text-white hover:bg-[#D20A11] hover:border-[#D20A11] hover:text-white w-full sm:w-auto flex items-center justify-center gap-3 text-base sm:text-lg py-3.5 px-6 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5 text-current shrink-0" />
                <span>WhatsApp: +53 50998801</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
