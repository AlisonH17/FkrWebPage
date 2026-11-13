import { asset } from '../utils/asset';
import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Navigation, Building2, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../locales/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  // Exact real location provided by the user: Plus Code 2GWX+Q5G, La Habana, Cuba
  const plusCodeLocation = '2GWX+Q5G, La Habana, Cuba';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=2GWX%2BQ5G,+La+Habana,+Cuba';
  const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=2GWX%2BQ5G,+La+Habana,+Cuba';
  const embedMapUrl = 'https://maps.google.com/maps?q=2GWX%2BQ5G,+La+Habana,+Cuba&t=&z=16&ie=UTF8&iwloc=&output=embed';

  useEffect(() => {
    // Skeleton screen simulation for smooth initial render
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-10 sm:py-14 bg-[#F9F9F9] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header with Enhanced Typography */}
        <div className="border-b border-[#E5E7EB] pb-6">
          <div className="flex items-center gap-2.5 text-[#D20A11] text-sm sm:text-base font-headline font-bold uppercase tracking-widest mb-2">
            <span className="w-6 h-[2.5px] bg-[#D20A11]" />
            <span>Canales Oficiales de Atención</span>
          </div>
          <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-[#101317] tracking-tight">
            Contacto Directo y Ubicación Real
          </h1>
          <p className="text-base sm:text-lg text-[#374151] mt-2.5 max-w-2xl leading-relaxed">
            Comuníquese directamente con nuestros ingenieros y taller por WhatsApp, redes sociales oficiales, correo electrónico o visítenos en La Habana.
          </p>
        </div>

        {/* Loading Screen: Red Square and 'Cargando' */}
        {loading ? (
          <div className="min-h-[450px] bg-white border border-[#E5E7EB] flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-[#D20A11] animate-pulse" />
              <span className="font-headline font-bold text-base uppercase tracking-widest text-[#101317]">
                Cargando
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN (Span 7): Interactive Google Maps View with Real Location */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 sm:p-5 border-b border-[#E5E7EB] bg-[#F9FAFB] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 bg-[#D20A11] shrink-0" />
                  <strong className="font-headline uppercase text-base sm:text-lg text-[#101317] font-bold">
                    FKR SURL · Taller y Almacén Central
                  </strong>
                </div>
                <span className="text-sm sm:text-base text-[#D20A11] font-mono font-bold bg-[#FFF0F1] px-3 py-1 border border-[#D20A11]/20">
                  Plus Code: 2GWX+Q5G
                </span>
              </div>

              {/* Interactive Iframe with exact location */}
              <div className="relative w-full h-[420px] sm:h-[500px] bg-[#E5E7EB]">
                <iframe
                  title={`Ubicación real de FKR SURL: ${plusCodeLocation}`}
                  src={embedMapUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Highlighted Location Pin Overlay */}
                <div className="absolute top-4 left-4 z-20 bg-[#101317]/95 backdrop-blur-md text-white px-4 py-3 border border-white/20 shadow-2xl flex items-center gap-3.5">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute -inset-1 bg-[#D20A11] opacity-75 animate-ping" />
                    <div className="relative w-10 h-10 bg-[#D20A11] flex items-center justify-center text-white shrink-0">
                      <MapPin className="w-6 h-6 fill-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-base uppercase block text-white tracking-wide">
                        FKR SURL
                      </span>
                      <span className="text-xs font-bold bg-[#D20A11] px-2 py-0.5 text-white uppercase">
                        Sede Real
                      </span>
                    </div>
                    <span className="text-sm text-[#E5E7EB] block font-mono mt-0.5">
                      {plusCodeLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Actions Bar with Larger Text */}
              <div className="p-4 sm:p-5 bg-white border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4 text-base">
                <div className="text-[#374151] font-medium">
                  <strong className="text-[#101317]">Ubicación:</strong> 2GWX+Q5G, La Habana, Cuba
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fkr-btn fkr-btn-outline text-sm sm:text-base py-2.5 px-4"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Abrir en Maps</span>
                  </a>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fkr-btn fkr-btn-primary text-sm sm:text-base py-2.5 px-4"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Cómo llegar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (Span 5): Direct Contact Channel Cards with User's Uploaded Icons */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/5350998801?text=Hola%20FKR%20SURL,%20deseo%20comunicarme%20para%20consultar%20sobre%20sus%20soluciones%20energéticas."
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border-2 border-[#E5E7EB] hover:border-[#D20A11] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 bg-[#FFF0F1] text-[#D20A11] flex items-center justify-center shrink-0 p-3 transition-transform group-hover:scale-105">
                    <MessageCircle className="w-8 h-8 text-[#D20A11]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider text-[#D20A11] block">
                      Canal Prioritario
                    </span>
                    <strong className="font-headline font-bold text-xl sm:text-2xl text-[#101317] group-hover:text-[#D20A11] transition-colors block mt-0.5">
                      WhatsApp Oficial
                    </strong>
                    <span className="text-lg sm:text-xl font-mono font-bold text-[#1F242C] block mt-0.5">
                      +53 50998801
                    </span>
                    <p className="text-sm sm:text-base text-[#4B5563] mt-1">
                      Respuesta directa para cotizaciones y pedidos urgentes.
                    </p>
                  </div>
                  <span className="text-sm sm:text-base font-headline font-bold text-[#D20A11] uppercase tracking-wider group-hover:translate-x-1 transition-transform shrink-0">
                    Chatear ↗
                  </span>
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href="https://instagram.com/fkr_energia_surl"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border-2 border-[#E5E7EB] hover:border-[#E1306C] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 bg-[#E1306C]/10 flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-105">
                    <img 
                      src={asset('/assets/icons/instagram.png')} 
                      alt="Instagram FKR SURL" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider text-[#E1306C] block">
                      Red Social Oficial
                    </span>
                    <strong className="font-headline font-bold text-xl sm:text-2xl text-[#101317] group-hover:text-[#E1306C] transition-colors block mt-0.5">
                      Instagram
                    </strong>
                    <span className="text-lg sm:text-xl font-bold text-[#1F242C] block mt-0.5">
                      @fkr_energia_surl
                    </span>
                    <p className="text-sm sm:text-base text-[#4B5563] mt-1">
                      Vea fotos y videos de instalaciones en tiempo real.
                    </p>
                  </div>
                  <span className="text-sm sm:text-base font-headline font-bold text-[#E1306C] uppercase tracking-wider group-hover:translate-x-1 transition-transform shrink-0">
                    Ver perfil ↗
                  </span>
                </div>
              </a>

              {/* Facebook Card */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border-2 border-[#E5E7EB] hover:border-[#1877F2] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 bg-[#1877F2]/10 flex items-center justify-center shrink-0 p-3 transition-transform group-hover:scale-105">
                    <img 
                      src={asset('/assets/icons/facebook.png')} 
                      alt="Facebook FKR SURL" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider text-[#1877F2] block">
                      Comunidad y Noticias
                    </span>
                    <strong className="font-headline font-bold text-xl sm:text-2xl text-[#101317] group-hover:text-[#1877F2] transition-colors block mt-0.5">
                      Facebook
                    </strong>
                    <span className="text-lg sm:text-xl font-bold text-[#1F242C] block mt-0.5">
                      FKR Energía SURL
                    </span>
                    <p className="text-sm sm:text-base text-[#4B5563] mt-1">
                      Novedades de equipamiento y disponibilidad en Cuba.
                    </p>
                  </div>
                  <span className="text-sm sm:text-base font-headline font-bold text-[#1877F2] uppercase tracking-wider group-hover:translate-x-1 transition-transform shrink-0">
                    Visitar ↗
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:contacto@fkr.cu"
                className="block bg-white border-2 border-[#E5E7EB] hover:border-[#D20A11] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 bg-[#D20A11]/10 flex items-center justify-center shrink-0 p-2.5 transition-transform group-hover:scale-105">
                    <img 
                      src={asset('/assets/icons/email.png')} 
                      alt="Email Corporativo FKR SURL" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider text-[#D20A11] block">
                      Correo Corporativo
                    </span>
                    <strong className="font-headline font-bold text-xl sm:text-2xl text-[#101317] group-hover:text-[#D20A11] transition-colors block mt-0.5">
                      Atención por Email
                    </strong>
                    <span className="text-lg sm:text-xl font-medium text-[#1F242C] block mt-0.5">
                      contacto@fkr.cu
                    </span>
                    <p className="text-sm sm:text-base text-[#4B5563] mt-1">
                      Envío de pliegos técnicos y solicitudes formales.
                    </p>
                  </div>
                  <span className="text-sm sm:text-base font-headline font-bold text-[#D20A11] uppercase tracking-wider group-hover:translate-x-1 transition-transform shrink-0">
                    Escribir ↗
                  </span>
                </div>
              </a>

              {/* Workshop Hours & Real Address Card */}
              <div className="p-6 bg-[#F4F5F7] border border-[#D1D5DB] text-base text-[#374151] space-y-2.5">
                <div className="flex items-center gap-3 font-headline font-bold text-[#101317] text-lg sm:text-xl uppercase">
                  <Clock className="w-6 h-6 text-[#D20A11]" />
                  <span>Horario de Atención en Taller</span>
                </div>
                <p className="leading-relaxed text-base">
                  Lunes a Viernes de 8:30 AM a 5:30 PM. Guardia técnica activa para soporte y emergencias energéticas en toda La Habana.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
