import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../locales/LanguageContext';

interface HeroVideoProps {
  navigate: (path: string) => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // Autoplay fallback
    });

    const handleEnded = () => {
      video.pause();
      if (video.duration) {
        video.currentTime = Math.max(0, video.duration - 0.04);
      }
      setVideoEnded(true);
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="w-full bg-white">
      
      {/* 
        1. Panoramic Widescreen Banner
        Unobstructed so the 3D animation and official logo are 100% visible on mobile, tablet, and desktop.
      */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[2.4/1] md:aspect-[2.74/1] min-h-[200px] sm:min-h-[300px] md:min-h-[380px] max-h-[540px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#A60008] via-[#8E0409] to-[#600105] border-b border-[#2C353F]">
        
        <video
          ref={videoRef}
          src={asset('/assets/video/fkr_logo.mp4')}
          poster={asset('/assets/video/fkr-hero-poster.jpg')}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover object-center pointer-events-none"
          aria-label="FKR SURL Presentación Audiovisual e Identidad de Marca"
        />

        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.25)]" />
      </div>

      {/* 
        2. Action Direct Bar: Placed in the section right below the video.
        Uses the new bluish-gray industrial tone (#2C353F) sampled from imagen.png.
        Ensures the video is never covered on mobile or tablet screens.
      */}
      <div className="bg-white py-4 sm:py-6 border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 bg-[#2C353F] border border-[#414D5C] px-6 sm:px-8 py-5 sm:py-6 shadow-md">
            
            <div className="flex items-center gap-4 text-center lg:text-left">
              <span className="w-3.5 h-3.5 bg-[#D20A11] shrink-0 hidden sm:inline-block" />
              <div>
                <span className="font-headline font-bold text-lg sm:text-2xl text-white tracking-wide block uppercase">
                  FKR SURL · Soluciones Energéticas Integrales
                </span>
                <span className="text-sm sm:text-base text-[#E2E8F0] font-normal mt-0.5 block">
                  Suministro de plantas eléctricas, energía solar fotovoltaica, transporte especializado y respaldo técnico en Cuba.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 shrink-0 w-full sm:w-auto justify-center sm:justify-end">
              <button
                onClick={() => navigate('/catalogo')}
                className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-6 shadow flex-1 sm:flex-none justify-center"
              >
                <span>{t.common.exploreCatalog}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/contacto')}
                className="fkr-btn fkr-btn-outline-dark text-sm sm:text-base py-3 px-6 flex-1 sm:flex-none justify-center"
              >
                <span>{t.common.contactFKR}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
