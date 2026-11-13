import React from 'react';
import { MapPin, Shield, ExternalLink, MessageCircle, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <footer className="bg-[#2C353F] text-[#CBD5E1] border-t border-[#414D5C] transition-colors">
      {/* Top red accent */}
      <div className="h-[3px] bg-[#D20A11] w-full" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#222931] border border-[#414D5C] flex items-center justify-center p-2 shadow-xs">
                <img 
                  src="/assets/logo/logo.png" 
                  alt="FKR Logo" 
                  className="w-full h-auto max-h-8 object-contain"
                />
              </div>
              <div>
                <span className="font-headline font-bold text-2xl text-white tracking-tight leading-none block">
                  FKR SURL
                </span>
                <span className="text-xs font-headline font-bold text-[#F87171] tracking-widest uppercase mt-1 block">
                  SOLUCIONES ENERGÉTICAS
                </span>
              </div>
            </div>
            <p className="text-base leading-relaxed text-[#D1D5DB]">
              Soluciones integrales de generación y almacenamiento eléctrico en Cuba. Equipos industriales, instalación y respaldo postventa garantizado.
            </p>
            <div className="pt-2 flex items-center gap-2 text-sm sm:text-base text-[#E2E8F0]">
              <span className="font-semibold text-white">Sede Central:</span>
              <span className="text-[#D1D5DB]">La Lisa, La Habana (Ref: 2GWX+Q5G)</span>
            </div>
          </div>

          {/* Col 2: Solutions / Catalog */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-base sm:text-lg text-white tracking-wider uppercase">
              Catálogo de Equipos
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <button 
                  onClick={() => navigate('/catalogo?category=cat-generadores')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Grupos Electrógenos Diesel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/catalogo?category=cat-solar')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Sistemas Solares e Inversores
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/catalogo?category=cat-baterias')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Baterías JET JEX95D (12V 95Ah)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/catalogo?category=cat-repuestos')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Lubricantes Repsol y Repuestos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional links */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-base sm:text-lg text-white tracking-wider uppercase">
              Institucional
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <button onClick={() => navigate('/empresa')} className="hover:text-white transition-colors text-left">
                  {t.nav.company}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/servicios')} className="hover:text-white transition-colors text-left">
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/preguntas-frecuentes')} className="hover:text-white transition-colors text-left">
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contacto')} className="hover:text-white transition-colors text-left">
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="text-[#F87171] hover:text-white flex items-center gap-2 font-bold transition-colors">
                  <Shield className="w-5 h-5 text-[#F87171]" />
                  <span>Panel Administrativo</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact channels with Authentic Uploaded Icons */}
          <div className="space-y-4">
            <h4 className="font-headline font-bold text-base sm:text-lg text-white tracking-wider uppercase">
              Contacto Directo
            </h4>
            <div className="space-y-3.5 text-base">
              <a 
                href="https://wa.me/5350998801" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D1D5DB] hover:text-[#D20A11] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0 border border-white/20 group-hover:border-[#D20A11] text-[#D1D5DB] group-hover:text-[#D20A11] transition-colors">
                  <MessageCircle className="w-4 h-4 text-current" />
                </div>
                <span className="font-mono font-bold">+53 50998801</span>
              </a>

              <a 
                href="https://instagram.com/fkr_energia_surl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D1D5DB] hover:text-[#E1306C] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <img src="/assets/icons/instagram.png" alt="Instagram" className="w-7 h-7 object-contain" />
                </div>
                <span className="font-semibold">@fkr_energia_surl</span>
              </a>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D1D5DB] hover:text-[#1877F2] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <img src="/assets/icons/facebook.png" alt="Facebook" className="w-7 h-7 object-contain" />
                </div>
                <span className="font-semibold">FKR Energía SURL</span>
              </a>

              <a 
                href="mailto:contacto@fkr.cu" 
                className="flex items-center gap-3 text-[#D1D5DB] hover:text-[#D20A11] transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <img src="/assets/icons/email.png" alt="Email" className="w-7 h-7 object-contain" />
                </div>
                <span className="font-semibold">contacto@fkr.cu</span>
              </a>

              <div className="flex items-center gap-3 text-[#CBD5E1] pt-1">
                <div className="w-8 h-8 flex items-center justify-center shrink-0 text-[#F87171]">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-sm sm:text-base">Taller Central: La Lisa, La Habana</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom divider, copyright, and dark mode toggle */}
        <div className="pt-8 border-t border-[#414D5C] flex flex-col md:flex-row items-center justify-between gap-5 text-sm sm:text-base text-[#D1D5DB]">
          <div>
            © {new Date().getFullYear()} FKR SURL. {t.footer.rights}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[#CBD5E1]">
            <span>Sede Central: La Lisa, La Habana</span>
            <span>·</span>
            <span>Ref. Satelital: 2GWX+Q5G</span>
          </div>

          {/* Theme Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            className="flex items-center gap-2.5 px-3.5 py-2 border border-[#414D5C] hover:border-[#D20A11] bg-[#222931] hover:bg-[#2C353F] text-white transition-all text-xs font-headline font-bold uppercase tracking-wider group cursor-pointer shadow-xs select-none"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-[#FBBF24] group-hover:rotate-45 transition-transform" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#93C5FD] group-hover:-rotate-12 transition-transform" />
                <span>Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
