import React, { useState } from 'react';
import { Save, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { SiteContent, FAQItem } from '../../types';
import { api } from '../../services/api';

interface AdminContentProps {
  content: SiteContent | null;
  onRefresh: () => void;
}

export const AdminContent: React.FC<AdminContentProps> = ({ content, onRefresh }) => {
  const [whatsapp, setWhatsapp] = useState(content?.company?.whatsapp || '+53 50998801');
  const [instagram, setInstagram] = useState(content?.company?.instagram || '@fkr_energia_surl');
  const [location, setLocation] = useState(content?.company?.location || '2GWX+Q5G, La Habana, Cuba');
  const [descEs, setDescEs] = useState(content?.company?.description?.es || '');
  const [descEn, setDescEn] = useState(content?.company?.description?.en || '');
  const [missionEs, setMissionEs] = useState(content?.company?.mission?.es || '');
  const [visionEs, setVisionEs] = useState(content?.company?.vision?.es || '');
  const [faqs, setFaqs] = useState<FAQItem[]>(content?.faqs || []);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddFaq = () => {
    setFaqs([
      ...faqs,
      {
        category: 'Equipos',
        question: { es: 'Nueva pregunta', en: 'New question' },
        answer: { es: 'Respuesta explicativa', en: 'Detailed answer' },
      },
    ]);
  };

  const handleFaqChange = (index: number, field: 'category' | 'question' | 'answer', value: string) => {
    const updated = [...faqs];
    if (field === 'category') {
      updated[index].category = value;
    } else {
      updated[index][field] = {
        ...updated[index][field],
        es: value,
        en: updated[index][field]?.en || value,
      };
    }
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const updatedPayload: Partial<SiteContent> = {
        company: {
          name: 'FKR SURL',
          activity: {
            es: 'Soluciones Energéticas en Cuba',
            en: 'Energy Solutions in Cuba',
          },
          location,
          whatsapp,
          instagram,
          description: { es: descEs, en: descEn || descEs },
          mission: { es: missionEs, en: missionEs },
          vision: { es: visionEs, en: visionEs },
          values: content?.company?.values || [],
        },
        services: content?.services || [],
        faqs,
      };

      await api.updateContent(updatedPayload);
      setSaved(true);
      onRefresh();
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err?.message || 'Error al guardar el contenido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-widest block mb-1.5">
            Información Corporativa
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#101317]">
            Gestión de Contenido Institucional
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] mt-1.5">
            Edite datos de contacto oficiales, misión, visión y preguntas frecuentes.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-6 shrink-0 shadow-sm"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Guardando...' : 'Guardar Todo'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-sm sm:text-base text-emerald-800 flex items-center gap-2.5 font-medium shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Contenido institucional guardado correctamente en la base de datos persistente.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-sm sm:text-base text-red-700 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Contact Info Section */}
        <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-headline font-bold text-lg sm:text-xl text-[#101317] border-b border-[#F3F4F6] pb-3">
            Datos de Contacto Confirmados
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                WhatsApp Oficial
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 border text-sm sm:text-base font-mono bg-[#F9FAFB]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                Instagram Oficial
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-3 border text-sm sm:text-base font-mono bg-[#F9FAFB]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                Ubicación Real (Plus Code)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border text-sm sm:text-base font-mono bg-[#F9FAFB]"
              />
            </div>
          </div>
        </div>

        {/* Presentation & Mission Section */}
        <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-sm space-y-5">
          <h3 className="font-headline font-bold text-lg sm:text-xl text-[#101317] border-b border-[#F3F4F6] pb-3">
            Presentación de la Empresa, Misión y Visión
          </h3>

          <div>
            <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
              Descripción Institucional (Español)
            </label>
            <textarea
              rows={4}
              value={descEs}
              onChange={(e) => setDescEs(e.target.value)}
              className="w-full px-4 py-3 border text-sm sm:text-base resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                Misión Corporativa
              </label>
              <textarea
                rows={3}
                value={missionEs}
                onChange={(e) => setMissionEs(e.target.value)}
                className="w-full px-4 py-3 border text-sm sm:text-base resize-none"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                Visión Corporativa
              </label>
              <textarea
                rows={3}
                value={visionEs}
                onChange={(e) => setVisionEs(e.target.value)}
                className="w-full px-4 py-3 border text-sm sm:text-base resize-none"
              />
            </div>
          </div>
        </div>

        {/* FAQs Management Section */}
        <div className="bg-white border border-[#E5E7EB] p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
            <h3 className="font-headline font-bold text-lg sm:text-xl text-[#101317]">
              Preguntas Frecuentes (FAQ)
            </h3>
            <button
              type="button"
              onClick={handleAddFaq}
              className="fkr-btn fkr-btn-outline text-xs sm:text-sm py-2 px-3.5"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Pregunta</span>
            </button>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(idx)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  title="Eliminar pregunta"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-headline font-bold uppercase text-[#6B7280] mb-1">
                      Categoría
                    </label>
                    <input
                      type="text"
                      value={faq.category}
                      onChange={(e) => handleFaqChange(idx, 'category', e.target.value)}
                      className="w-full px-3 py-2 text-sm border bg-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-headline font-bold uppercase text-[#6B7280] mb-1">
                      Pregunta (Español)
                    </label>
                    <input
                      type="text"
                      value={faq.question.es}
                      onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                      className="w-full px-3 py-2 text-sm sm:text-base border bg-white font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-headline font-bold uppercase text-[#6B7280] mb-1">
                    Respuesta (Español)
                  </label>
                  <textarea
                    rows={2}
                    value={faq.answer.es}
                    onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                    className="w-full px-3 py-2 text-sm sm:text-base border bg-white resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={saving}
            className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-6"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Guardando...' : 'Guardar Todos los Cambios'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
