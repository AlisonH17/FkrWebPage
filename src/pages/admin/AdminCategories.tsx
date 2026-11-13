import { asset } from '../../utils/asset';
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle, X } from 'lucide-react';
import { Category, Product } from '../../types';
import { api } from '../../services/api';

interface AdminCategoriesProps {
  categories: Category[];
  products: Product[];
  onRefresh: () => void;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({
  categories,
  products,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [nameEs, setNameEs] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [descEs, setDescEs] = useState('');
  const [descEn, setDescEn] = useState('');
  const [icon, setIcon] = useState('Zap');
  const [image, setImage] = useState(asset('/assets/products/himoinsa-hsy25-960x720.webp'));
  const [order, setOrder] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const openCreate = () => {
    setEditingCategory(null);
    setNameEs('');
    setNameEn('');
    setSlug('');
    setDescEs('');
    setDescEn('');
    setIcon('Zap');
    setImage(asset('/assets/products/himoinsa-hsy25-960x720.webp'));
    setOrder(categories.length + 1);
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setNameEs(cat.name.es);
    setNameEn(cat.name.en || cat.name.es);
    setSlug(cat.slug);
    setDescEs(cat.description.es);
    setDescEn(cat.description.en || cat.description.es);
    setIcon(cat.icon);
    setImage(cat.image);
    setOrder(cat.order);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug: slug || nameEs.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: { es: nameEs, en: nameEn || nameEs },
      description: { es: descEs, en: descEn || descEs },
      icon,
      image,
      order: Number(order),
      published: true,
    };

    try {
      if (editingCategory) {
        await api.updateCategory(editingCategory.id, payload);
        setSuccess('Categoría actualizada con éxito');
      } else {
        await api.createCategory(payload);
        setSuccess('Categoría creada con éxito');
      }
      setIsModalOpen(false);
      onRefresh();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err?.message || 'Error al guardar la categoría');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    const hasProducts = products.some((p) => p.category === cat.id);
    if (hasProducts) {
      alert(`No se puede eliminar la categoría "${cat.name.es}" porque tiene productos asociados en el catálogo. Reasigne o elimine primero dichos productos.`);
      return;
    }

    if (!window.confirm(`¿Confirma eliminar la categoría "${cat.name.es}"?`)) return;

    try {
      await api.deleteCategory(cat.id);
      setSuccess('Categoría eliminada');
      onRefresh();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      alert(err?.message || 'Error al eliminar');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-widest block mb-1.5">
            Organización del Catálogo
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#101317]">
            Gestión de Categorías
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] mt-1.5">
            Organice las líneas de generación, solar, baterías y repuestos en Cuba.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-5 shrink-0 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Crear Categoría</span>
        </button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-sm sm:text-base text-emerald-800 flex items-center gap-2.5 font-medium">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Categories Grid Table with Large Fonts */}
      <div className="bg-white border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#374151] font-headline font-bold uppercase tracking-wider text-xs sm:text-sm">
              <tr>
                <th className="py-4 px-5">Orden</th>
                <th className="py-4 px-5">Categoría</th>
                <th className="py-4 px-5">Slug</th>
                <th className="py-4 px-5">Equipos Asociados</th>
                <th className="py-4 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.id).length;
                return (
                  <tr key={c.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-base text-[#6B7280]">
                      #{c.order}
                    </td>
                    <td className="py-4 px-5 font-semibold text-[#101317] flex items-center gap-4">
                      <img
                        src={c.image}
                        alt=""
                        className="w-12 h-12 object-cover border border-[#E5E7EB] shrink-0"
                      />
                      <div>
                        <span className="block font-headline font-bold text-base sm:text-lg text-[#101317]">
                          {c.name.es}
                        </span>
                        <span className="text-xs sm:text-sm text-[#4B5563] line-clamp-1">
                          {c.description.es}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs sm:text-sm text-[#4B5563]">
                      {c.slug}
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-mono-num font-bold text-sm sm:text-base text-[#101317] bg-[#F4F5F7] px-3 py-1 border border-[#E5E7EB]">
                        {count} equipos
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => openEdit(c)}
                        className="fkr-btn fkr-btn-outline text-xs sm:text-sm py-2 px-3.5"
                        title="Editar categoría"
                      >
                        <Edit2 className="w-4 h-4 inline mr-1" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar categoría"
                      >
                        <Trash2 className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Create/Edit with Large Inputs */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-[#2F3131] max-w-xl w-full p-6 sm:p-10 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#6B7280] hover:text-[#101317]"
            >
              <X className="w-7 h-7" />
            </button>

            <h3 className="font-headline font-bold text-2xl text-[#101317] mb-5">
              {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
            </h3>

            {error && (
              <div className="p-4 mb-5 bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                    Nombre (Español) *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameEs}
                    onChange={(e) => setNameEs(e.target.value)}
                    className="w-full px-4 py-3 border text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                    Nombre (Inglés)
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    className="w-full px-4 py-3 border text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="grupos-electrogenos"
                    className="w-full px-4 py-3 border text-sm sm:text-base font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                    Orden de Visualización
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-3 border text-sm sm:text-base font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                  Descripción (Español) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={descEs}
                  onChange={(e) => setDescEs(e.target.value)}
                  className="w-full px-4 py-3 border text-sm sm:text-base resize-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                  Ruta de Imagen
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-3 border text-sm sm:text-base font-mono"
                />
              </div>

              <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="fkr-btn fkr-btn-outline text-sm py-2.5 px-4"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="fkr-btn fkr-btn-primary text-sm py-2.5 px-5 disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar Categoría'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
