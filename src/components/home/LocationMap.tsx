import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Clock, Building2, Compass, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const LocationMap: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Exact real location provided by user: Plus Code 2GWX+Q5G, La Habana, Cuba
  const plusCodeLocation = '2GWX+Q5G, La Habana, Cuba';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=2GWX%2BQ5G,+La+Habana,+Cuba';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=2GWX%2BQ5G,+La+Habana,+Cuba';
  const embedMapUrl = 'https://maps.google.com/maps?q=2GWX%2BQ5G,+La+Habana,+Cuba&t=&z=16&ie=UTF8&iwloc=&output=embed';

  useEffect(() => {
    // Initial skeleton display duration
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Elevated Font Sizes */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 pb-5 border-b border-[#D1D5DB]">
          <div>
            <div className="flex items-center gap-2.5 text-[#D20A11] text-sm sm:text-base font-headline font-bold uppercase tracking-widest mb-1.5">
              <span className="w-6 h-[2.5px] bg-[#D20A11]" />
              <span>Sede Operativa Principal</span>
            </div>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#101317] tracking-tight">
              Instalaciones Centrales de FKR SURL
            </h2>
          </div>
          <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#101317] font-semibold bg-[#F9FAFB] px-4 py-2.5 border border-[#D1D5DB] shadow-xs">
            <Compass className="w-5 h-5 text-[#D20A11] shrink-0" />
            <span>La Lisa, La Habana · <strong className="text-[#D20A11] font-mono">Ref. Maps: 2GWX+Q5G</strong></span>
          </div>
        </div>

        {/* Loading Screen State: Red square and 'Cargando' */}
        {initialLoading ? (
          <div className="min-h-[400px] bg-white border border-[#E5E7EB] flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-[#D20A11] animate-pulse" />
              <span className="font-headline font-bold text-base uppercase tracking-widest text-[#101317]">
                Cargando
              </span>
            </div>
          </div>
        ) : (
          /* Actual Interactive Map Container */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#E5E7EB] shadow-sm overflow-hidden">
            
            {/* Left Column: Interactive Google Maps Iframe (Span 8) */}
            <div className="lg:col-span-8 relative min-h-[420px] sm:min-h-[500px] bg-[#E5E7EB] overflow-hidden">
              
              {/* Iframe Loading placeholder until iframe is ready */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-[#F4F5F7] flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 bg-[#D20A11] animate-pulse" />
                    <span className="font-headline font-bold text-sm uppercase tracking-widest text-[#101317]">
                      Cargando
                    </span>
                  </div>
                </div>
              )}

              <iframe
                title={`Ubicación real de FKR SURL: ${plusCodeLocation}`}
                src={embedMapUrl}
                className="w-full h-full min-h-[420px] sm:min-h-[500px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />

              {/* Prominent Highlighted Location Pin Overlay */}
              <div className="absolute top-4 left-4 z-20 bg-[#101317]/95 backdrop-blur-md text-white px-4 py-3 border border-white/20 shadow-2xl flex items-center gap-3.5">
                <div className="relative flex items-center justify-center">
                  <span className="absolute -inset-1 bg-[#D20A11] opacity-75 animate-ping" />
                  <div className="relative w-10 h-10 bg-[#D20A11] flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-6 h-6 fill-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="font-headline uppercase tracking-wider text-base text-white">
                      FKR SURL
                    </strong>
                    <span className="text-xs font-bold bg-[#D20A11] px-2 py-0.5 text-white uppercase">
                      Taller Central
                    </span>
                  </div>
                  <span className="text-sm text-[#E5E7EB] block mt-0.5">
                    La Lisa, La Habana · Ref: 2GWX+Q5G
                  </span>
                </div>
              </div>

              {/* Bottom Quick-badge for Map Interactivity */}
              <div
                className={`absolute bottom-3 right-3 z-20 backdrop-blur-sm px-4 py-2.5 text-sm font-headline font-bold border shadow-md hidden sm:flex items-center gap-2.5 ${
                  isDark
                    ? 'bg-[#1D232A]/95 text-[#F8FAFC] border-[#384553]'
                    : 'bg-[#FFFFFF]/95 text-[#101317] border-[#D1D5DB]'
                }`}
              >
                <span className="w-2.5 h-2.5 bg-[#D20A11] inline-block" />
                <span>Mapa Interactivo de Google Maps · Con zoom y vista satelital</span>
              </div>
            </div>

            {/* Right Column: Facility details and Google Maps Actions (Span 4) */}
            <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
              
              <div className="space-y-5">
                <div>
                  <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-widest text-[#D20A11] block mb-1">
                    Atención Presencial y Logística
                  </span>
                  <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#101317]">
                    Taller y Almacén Central
                  </h3>
                  <p className="text-base sm:text-lg text-[#374151] leading-relaxed mt-2">
                    Punto central de operaciones técnicas para la preparación, calibración, pruebas de carga y despacho de grupos electrógenos y componentes solares hacia toda La Habana.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#F3F4F6]">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 bg-[#FFF0F1] text-[#D20A11] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-[#101317] font-bold text-base">Ubicación y Referencia:</strong>
                      <span className="text-[#374151] text-base font-semibold block">Municipio La Lisa, La Habana, Cuba</span>
                      <span className="text-xs text-[#64748B] font-mono block mt-0.5">Coordenadas Maps: 2GWX+Q5G</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 bg-[#FFF0F1] text-[#D20A11] flex items-center justify-center shrink-0 mt-0.5 p-1.5">
                      <MessageCircle className="w-5 h-5 text-[#D20A11]" />
                    </div>
                    <div>
                      <strong className="block text-[#101317] font-bold text-base">Atención Telefónica / WhatsApp:</strong>
                      <span className="text-[#374151] font-mono font-bold text-lg sm:text-xl">+53 50998801</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 bg-[#FFF0F1] text-[#D20A11] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-[#101317] font-bold text-base">Horario de Operaciones:</strong>
                      <span className="text-[#374151] text-base">Lunes a Viernes · Soporte de emergencia activo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Google Maps Action Buttons with Larger Text */}
              <div className="space-y-3 pt-5 border-t border-[#E5E7EB]">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fkr-btn fkr-btn-primary w-full justify-center text-sm sm:text-base font-headline font-bold py-3.5"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Abrir en Google Maps (2GWX+Q5G)</span>
                </a>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fkr-btn fkr-btn-outline w-full justify-center text-sm sm:text-base font-headline font-bold py-3.5"
                >
                  <Navigation className="w-5 h-5 text-[#D20A11]" />
                  <span>Cómo llegar (Ruta en Maps)</span>
                </a>

                <a
                  href="https://wa.me/5350998801?text=Hola%20FKR%20SURL,%20deseo%20coordinar%20una%20visita%20a%20sus%20instalaciones%20en%202GWX%2BQ5G,%20La%20Habana."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fkr-btn border-2 border-[#D20A11] text-[#D20A11] bg-white hover:bg-[#D20A11] hover:text-white w-full justify-center text-sm sm:text-base font-headline font-bold py-3.5 flex items-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-current" />
                  <span>Coordinar visita por WhatsApp →</span>
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
