import React, { useState } from 'react';
import { Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate, isAdminLoggedIn }) => {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.catalog, path: '/catalogo' },
    { label: t.nav.company, path: '/empresa' },
    { label: t.nav.services, path: '/servicios' },
    { label: t.nav.faq, path: '/preguntas-frecuentes' },
    { label: t.nav.contact, path: '/contacto' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/98 backdrop-blur-md shadow-sm transition-colors border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-22 sm:h-24">
          
          {/* Zone 1: Brand Wordmark (logo.png) */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center focus:outline-none group shrink-0 py-1"
            aria-label="FKR SURL - Inicio"
          >
            <img 
              src="/assets/logo/logo.png" 
              alt="FKR SURL" 
              className="h-11 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </button>

          {/* Zone 2: Navigation Links with Distinct Red Active Indicator */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-base xl:text-lg font-bold font-headline text-[#1A1C1C]">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`transition-colors whitespace-nowrap py-3 relative tracking-tight font-headline font-bold text-base xl:text-lg ${
                    isActive 
                      ? 'text-[#D20A11]' 
                      : 'hover:text-[#D20A11] text-[#1F242C]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#D20A11] shadow-xs" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Language toggle + Prominent Light/Dark Theme toggle + Primary CTA) */}
          <div className="hidden sm:flex items-center gap-3.5 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center border border-[#D1D5DB] bg-[#F4F5F7] p-0.5">
              <button
                onClick={() => setLanguage('es')}
                className={`px-3.5 py-2 text-sm font-headline font-bold transition-colors ${
                  language === 'es' ? 'bg-[#101317] dark:bg-[#D20A11] text-white' : 'text-[#374151] hover:text-[#101317]'
                }`}
                title="Español"
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3.5 py-2 text-sm font-headline font-bold transition-colors ${
                  language === 'en' ? 'bg-[#101317] dark:bg-[#D20A11] text-white' : 'text-[#374151] hover:text-[#101317]'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Prominent Light / Dark Theme Toggle (replaces previous icon slot) */}
            <button
              onClick={toggleTheme}
              type="button"
              className={`flex items-center gap-2 px-3 py-2.5 border-2 transition-all cursor-pointer shadow-xs group ${
                isDark
                  ? 'bg-[#2C353F] text-[#FBBF24] border-[#FBBF24]/60 hover:border-[#FBBF24] hover:bg-[#37424E]'
                  : 'bg-[#101317] text-white border-[#101317] hover:bg-[#D20A11] hover:border-[#D20A11]'
              }`}
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[#FBBF24] group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-[#93C5FD] group-hover:-rotate-12 transition-transform" />
              )}
              <span className="hidden xl:inline text-xs font-headline font-bold uppercase tracking-wider">
                {isDark ? 'Claro' : 'Oscuro'}
              </span>
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => handleNav('/catalogo')}
              className="fkr-btn fkr-btn-primary text-base font-headline font-bold py-3 px-6 shadow-sm"
            >
              <span>{t.common.exploreCatalog}</span>
            </button>
          </div>

          {/* Mobile actions: Theme toggle + Language + Hamburger */}
          <div className="flex sm:hidden items-center gap-2.5">
            <button
              onClick={toggleTheme}
              type="button"
              className={`p-2 border-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#2C353F] text-[#FBBF24] border-[#FBBF24]/60'
                  : 'bg-[#101317] text-white border-[#101317]'
              }`}
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[#FBBF24]" />
              ) : (
                <Moon className="w-5 h-5 text-[#93C5FD]" />
              )}
            </button>
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="px-3 py-1.5 text-sm font-headline font-bold border border-[#D1D5DB] bg-[#F4F5F7]"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 border border-[#D1D5DB] text-[#101317] hover:text-[#D20A11] focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#D1D5DB] bg-[#FFFFFF] px-5 pt-3 pb-8 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`text-left px-5 py-4 text-lg sm:text-xl font-headline font-bold border-b border-[#F3F4F6] transition-colors ${
                    isActive ? 'text-[#D20A11] bg-[#FFF0F1]' : 'text-[#1F242C] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav('/admin')}
              className="text-left px-5 py-4 text-lg font-headline font-bold text-[#374151] flex items-center justify-between border-b border-[#F3F4F6]"
            >
              <span className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#D20A11]" />
                {t.nav.admin}
              </span>
              <span className="text-xs uppercase font-mono text-[#9CA3AF]">
                {isAdminLoggedIn ? 'Panel' : 'Acceso'}
              </span>
            </button>
            <div className="pt-4">
              <button
                onClick={() => handleNav('/catalogo')}
                className="fkr-btn fkr-btn-primary w-full justify-center text-lg py-4"
              >
                {t.common.exploreCatalog}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Very thin red bottom dividing bar distinguishing menu from page body */}
      <div className="h-[2px] bg-[#D20A11] w-full shadow-xs" />
    </header>
  );
};
