import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { SiteContent } from '../types';
import { useLanguage } from '../locales/LanguageContext';

interface FAQProps {
  content: SiteContent | null;
  navigate: (path: string) => void;
}

export const FAQ: React.FC<FAQProps> = ({ content, navigate }) => {
  const { t, localize } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs = content?.faqs || [];
  const categories = ['all', ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter((f) => f.category === activeCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-[#E5E7EB] pb-8">
          <div className="flex items-center gap-2.5 text-[#D20A11] text-sm sm:text-base font-headline font-bold uppercase tracking-widest mb-2">
            <span className="w-6 h-[2.5px] bg-[#D20A11]" />
            <span>{t.faqPage.eyebrow}</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#101317] tracking-tight">
            {t.faqPage.title}
          </h1>
          <p className="text-base sm:text-lg text-[#374151] mt-2.5">
            {t.faqPage.subtitle}
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2.5 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-headline font-bold uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#D20A11] text-white'
                    : 'bg-white border border-[#E5E7EB] text-[#374151] hover:text-[#101317]'
                }`}
              >
                {cat === 'all' ? 'Todas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#E5E7EB] shadow-sm transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none hover:bg-[#F9FAFB] transition-colors"
                >
                  <span className="font-headline font-bold text-lg sm:text-xl text-[#101317]">
                    {localize(faq.question)}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-[#6B7280] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#D20A11]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-7 pt-2 text-base sm:text-lg text-[#374151] leading-relaxed border-t border-[#F3F4F6] bg-[#FDFDFD]">
                    <p>{localize(faq.answer)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact bridge with Direct WhatsApp and Authentic Icon */}
        <div className="p-8 bg-white border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-headline font-bold text-xl sm:text-2xl text-[#101317]">
              ¿Tiene una consulta técnica específica?
            </h4>
            <p className="text-base text-[#4B5563] mt-1.5">
              Comuníquese directamente con nuestros ingenieros por WhatsApp o consulte nuestra ubicación en La Lisa.
            </p>
          </div>
          <a
            href="https://wa.me/5350998801?text=Hola%20FKR%20SURL,%20tengo%20una%20consulta%20t%C3%A9cnica%20sobre%20sus%20soluciones%20energ%C3%A9ticas."
            target="_blank"
            rel="noopener noreferrer"
            className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white shrink-0 flex items-center gap-2.5 text-base font-bold py-3.5 px-6 shadow-xs transition-all"
          >
            <MessageCircle className="w-5 h-5 text-current" />
            <span>Contactar por WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
