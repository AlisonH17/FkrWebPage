import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, CheckCircle, Clock, Upload, FileText, X, AlertCircle } from 'lucide-react';
import { Product, Category, SpecificationItem } from '../../types';
import { api } from '../../services/api';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  onRefresh: () => void;
  editingProduct: Product | null;
  setEditingProduct: (p: Product | null) => void;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({
  products,
  categories,
  onRefresh,
  editingProduct,
  setEditingProduct,
}) => {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [nameEs, setNameEs] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'cat-generadores');
  const [shortEs, setShortEs] = useState('');
  const [shortEn, setShortEn] = useState('');
  const [fullEs, setFullEs] = useState('');
  const [fullEn, setFullEn] = useState('');
  const [primaryImage, setPrimaryImage] = useState(asset('/assets/products/himoinsa-hsy25-forklift.jpg'));
  const [technicalSheetUrl, setTechnicalSheetUrl] = useState('');
  const [available, setAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [specs, setSpecs] = useState<SpecificationItem[]>([
    { key: 'Modelo', value: '' },
    { key: 'Combustible', value: 'Diesel industrial' },
  ]);

  // Open modal for Create or Edit
  const openCreateModal = () => {
    setEditingProduct(null);
    setNameEs('');
    setNameEn('');
    setSlug('');
    setCategory(categories[0]?.id || 'cat-generadores');
    setShortEs('');
    setShortEn('');
    setFullEs('');
    setFullEn('');
    setPrimaryImage(asset('/assets/products/himoinsa-hsy25-forklift.jpg'));
    setTechnicalSheetUrl(asset('/assets/specs/HIMOINSA-HSY25-Ficha-Tecnica.pdf'));
    setAvailable(true);
    setFeatured(false);
    setPublished(true);
    setSpecs([
      { key: 'Modelo', value: '' },
      { key: 'Combustible', value: 'Diesel industrial' },
      { key: 'Insonorización', value: 'Canopy acústico' },
    ]);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setNameEs(p.name.es);
    setNameEn(p.name.en || p.name.es);
    setSlug(p.slug);
    setCategory(p.category);
    setShortEs(p.shortDescription.es);
    setShortEn(p.shortDescription.en || p.shortDescription.es);
    setFullEs(p.fullDescription?.es || '');
    setFullEn(p.fullDescription?.en || '');
    setPrimaryImage(p.primaryImage);
    setTechnicalSheetUrl(p.technicalSheetUrl || '');
    setAvailable(p.available);
    setFeatured(p.featured);
    setPublished(p.published);
    setSpecs(p.specifications && p.specifications.length > 0 ? [...p.specifications] : [{ key: '', value: '' }]);
    setError(null);
    setIsModalOpen(true);
  };

  // Instant Availability Toggle directly from the table row
  const handleQuickToggleAvailability = async (product: Product) => {
    setTogglingId(product.id);
    const newStatus = !product.available;
    try {
      await api.updateProduct(product.id, { available: newStatus });
      setSuccessMsg(`Disponibilidad de "${product.name.es}" actualizada a: ${newStatus ? 'Disponible' : 'Bajo pedido'}`);
      onRefresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert('Error al actualizar disponibilidad: ' + (err?.message || 'Error'));
    } finally {
      setTogglingId(null);
    }
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  // Image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'image' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: file.name,
            data: base64Data,
            type: target,
          }),
        });
        const data = await res.json();
        if (target === 'image') {
          setPrimaryImage(data.url);
          setSuccessMsg('Fotografía subida correctamente');
          setTimeout(() => setSuccessMsg(null), 3000);
        } else {
          setTechnicalSheetUrl(data.url);
        }
      } catch (err) {
        alert('Error al subir archivo');
      }
    };
    reader.readAsDataURL(file);
  };

  // Save product
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      slug: slug || nameEs.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      featured,
      published,
      available,
      name: { es: nameEs, en: nameEn || nameEs },
      shortDescription: { es: shortEs, en: shortEn || shortEs },
      fullDescription: { es: fullEs, en: fullEn || fullEs },
      primaryImage,
      gallery: editingProduct?.gallery || [primaryImage],
      technicalSheetUrl: technicalSheetUrl || undefined,
      specifications: specs.filter((s) => s.key.trim() && s.value.trim()),
    };

    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, payload);
        setSuccessMsg('Producto y disponibilidad guardados correctamente');
      } else {
        await api.createProduct(payload);
        setSuccessMsg('Nuevo producto creado en el catálogo');
      }
      setIsModalOpen(false);
      onRefresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setError(err?.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    try {
      await api.deleteProduct(deleteCandidate.id);
      setDeleteCandidate(null);
      setSuccessMsg('Producto eliminado');
      onRefresh();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err?.message || 'Error al eliminar');
    }
  };

  // Filter products
  const filtered = products.filter((p) => {
    if (filterCat !== 'all' && p.category !== filterCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.es.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Header with Enlarged Typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-widest block mb-1">
            Gestión de Inventario
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#101317]">
            Fotos de Productos y Disponibilidad
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] mt-1.5">
            Haga clic en el botón de disponibilidad para alternar el estado en tiempo real.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-5 shrink-0 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Subir Fotos / Nuevo Producto</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-sm sm:text-base text-emerald-800 flex items-center gap-2.5 shadow-xs font-medium">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar with Larger Inputs and Labels */}
      <div className="bg-white border border-[#E5E7EB] p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o modelo..."
            className="w-full pl-11 pr-4 py-3 text-sm sm:text-base bg-[#F9FAFB] border border-[#D1D5DB] focus:outline-none focus:border-[#D20A11]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-sm sm:text-base text-[#374151] shrink-0 font-bold">Categoría:</span>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 text-sm sm:text-base bg-white border border-[#D1D5DB] focus:outline-none font-medium"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name.es}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table with Enhanced Fonts, High Visibility */}
      <div className="bg-white border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#374151] font-headline font-bold uppercase tracking-wider text-xs sm:text-sm">
              <tr>
                <th className="py-4 px-5">Fotografía</th>
                <th className="py-4 px-5">Equipo / Modelo</th>
                <th className="py-4 px-5">Categoría</th>
                <th className="py-4 px-5">Disponibilidad (Clic para cambiar)</th>
                <th className="py-4 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filtered.map((p) => {
                const cat = categories.find((c) => c.id === p.category);
                const isToggling = togglingId === p.id;

                return (
                  <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors">
                    {/* Photo Thumbnail */}
                    <td className="py-4 px-5">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F4F5F7] border border-[#D1D5DB] p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                        <img
                          src={p.primaryImage}
                          alt={p.name.es}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
                          }}
                        />
                      </div>
                    </td>

                    {/* Name & Slug with Increased Font Sizes */}
                    <td className="py-4 px-5">
                      <strong className="block text-base sm:text-lg text-[#101317] font-bold leading-snug">
                        {p.name.es}
                      </strong>
                      <span className="text-xs sm:text-sm text-[#6B7280] font-mono block mt-0.5">
                        {p.slug}
                      </span>
                      {p.featured && (
                        <span className="inline-block mt-1 text-[10px] sm:text-xs bg-[#FFF0F1] text-[#D20A11] border border-[#D20A11]/30 px-2 py-0.5 font-headline font-bold uppercase tracking-wider">
                          Destacado en portada
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-5 text-sm sm:text-base font-medium text-[#374151]">
                      {cat?.name.es || p.category}
                    </td>

                    {/* ONE-CLICK INSTANT AVAILABILITY TOGGLE with Large Touch Area */}
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleQuickToggleAvailability(p)}
                        disabled={isToggling}
                        className={`inline-flex items-center gap-2.5 px-4 py-2.5 border text-xs sm:text-sm font-headline font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                          p.available
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-400 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-900 border-amber-400 hover:bg-amber-100'
                        } ${isToggling ? 'opacity-50 pointer-events-none' : ''}`}
                        title="Haga clic para alternar disponibilidad"
                      >
                        <span
                          className={`w-3 h-3 rounded-full shrink-0 ${
                            p.available ? 'bg-emerald-600' : 'bg-amber-600'
                          }`}
                        />
                        <span>{p.available ? '● En Stock / Disponible' : '● Bajo Pedido'}</span>
                        <span className="text-xs text-[#6B7280] lowercase font-normal ml-1">
                          (cambiar ⇄)
                        </span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => openEditModal(p)}
                        className="fkr-btn fkr-btn-outline text-xs sm:text-sm py-2 px-3.5"
                        title="Editar foto y características"
                      >
                        <Edit2 className="w-4 h-4 inline mr-1" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => setDeleteCandidate(p)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar producto"
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

      {/* Create / Edit Modal with Generous Font Sizes */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-[#2F3131] max-w-3xl w-full p-6 sm:p-10 my-8 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-[#6B7280] hover:text-[#101317]"
            >
              <X className="w-7 h-7" />
            </button>

            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-[#101317] mb-1">
              {editingProduct ? 'Editar Producto y Fotos' : 'Nuevo Producto en Catálogo'}
            </h3>
            <p className="text-sm text-[#4B5563] mb-6">
              Suba las fotos del equipo y defina su disponibilidad para entrega.
            </p>

            {error && (
              <div className="p-4 mb-5 bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              
              {/* PRIMARY HIGHLIGHT: PHOTO UPLOAD AND PREVIEW */}
              <div className="p-5 sm:p-6 bg-[#F4F5F7] border-2 border-dashed border-[#D1D5DB] flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 bg-white border border-[#D1D5DB] p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                  <img
                    src={primaryImage}
                    alt="Vista previa de la foto"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
                    }}
                  />
                </div>

                <div className="flex-1 w-full text-center sm:text-left space-y-2.5">
                  <div className="font-headline font-bold text-sm sm:text-base uppercase text-[#101317]">
                    Subir Fotografía del Producto
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B5563]">
                    Seleccione un archivo PNG o JPG desde su dispositivo.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start pt-1">
                    <label className="fkr-btn fkr-btn-primary text-xs sm:text-sm py-2.5 px-4 cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4" />
                      <span>Examinar y Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'image')}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* AVAILABILITY TOGGLE CARD */}
              <div className="p-4 sm:p-5 bg-white border border-[#D1D5DB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-headline font-bold text-sm sm:text-base uppercase text-[#101317] block">
                    Estado de Disponibilidad
                  </span>
                  <span className="text-xs sm:text-sm text-[#4B5563]">
                    {available ? 'El equipo se mostrará como Disponible / En Stock' : 'El equipo se mostrará como Bajo Pedido'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setAvailable(!available)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-headline font-bold uppercase tracking-wider border cursor-pointer shrink-0 shadow-xs ${
                    available
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                      : 'bg-amber-50 text-amber-900 border-amber-400'
                  }`}
                >
                  {available ? '● En Stock / Disponible' : '● Bajo Pedido'} (Cambiar)
                </button>
              </div>

              {/* Product Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                    Nombre del Equipo *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameEs}
                    onChange={(e) => setNameEs(e.target.value)}
                    placeholder="Ej. Grupo Electrógeno HSY-25"
                    className="w-full px-4 py-3 border text-sm sm:text-base focus:outline-none focus:border-[#D20A11]"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                    Categoría *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border text-sm sm:text-base focus:outline-none focus:border-[#D20A11]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name.es}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-headline font-bold uppercase text-[#101317] mb-1.5">
                  Descripción Breve *
                </label>
                <textarea
                  rows={2}
                  required
                  value={shortEs}
                  onChange={(e) => setShortEs(e.target.value)}
                  placeholder="Resumen del equipo, potencia o características clave..."
                  className="w-full px-4 py-3 border text-sm sm:text-base focus:outline-none focus:border-[#D20A11] resize-none"
                />
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-headline font-bold uppercase text-[#101317]">
                    Especificaciones Técnicas
                  </span>
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="text-xs sm:text-sm text-[#D20A11] font-bold hover:underline"
                  >
                    + Añadir Parámetro
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-2.5 p-3 border border-[#E5E7EB]">
                  {specs.map((s, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Parámetro (ej. Potencia)"
                        value={s.key}
                        onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                        className="w-1/2 px-3 py-2 text-sm border"
                      />
                      <input
                        type="text"
                        placeholder="Valor (ej. 25 kVA)"
                        value={s.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                        className="w-1/2 px-3 py-2 text-sm border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="text-red-500 hover:text-red-700 px-2 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2 text-sm sm:text-base font-semibold">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-5 h-5 accent-[#D20A11]"
                  />
                  <span>Destacar en Portada</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-5 h-5 accent-[#D20A11]"
                  />
                  <span>Publicado en la Web</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="fkr-btn fkr-btn-outline text-xs sm:text-sm py-2.5 px-4"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="fkr-btn fkr-btn-primary text-xs sm:text-sm py-2.5 px-5 disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar Producto y Foto'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-[#2F3131] max-w-md w-full p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h4 className="font-headline font-bold text-xl text-[#101317]">
              ¿Confirmar eliminación?
            </h4>
            <p className="text-sm text-[#4B5563]">
              ¿Desea eliminar definitivamente el producto <strong>{deleteCandidate.name.es}</strong>?
            </p>
            <div className="flex items-center justify-center gap-4 pt-3">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="fkr-btn fkr-btn-outline text-sm py-2.5 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="fkr-btn bg-[#D20A11] text-white hover:bg-red-800 text-sm py-2.5 px-5"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
