import React, { createContext, useContext, useState, useEffect } from 'react';
import { es } from './es';
import { en } from './en';
import { LocalizedString } from '../types';

type Language = 'es' | 'en';
type Translations = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  localize: (item?: LocalizedString | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fkr_language');
    return (saved === 'en' || saved === 'es') ? saved : 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fkr_language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = language === 'es' ? es : en;

  const localize = (item?: LocalizedString | string): string => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    return item[language] || item.es || item.en || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
