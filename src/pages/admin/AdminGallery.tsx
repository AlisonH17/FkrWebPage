import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  AlertCircle,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { CompanyGalleryItem } from '../../types';
import { api } from '../../services/api';

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<CompanyGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // New item form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('instalaciones');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // Editing state
  const [editingItem, setEditingItem] = useState<CompanyGalleryItem | null>(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await api.getCompanyGallery();
      setItems(data || []);
    } catch (err: any) {
      setError('Error al cargar la galería de empresa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const res = await api.uploadFile(file, 'image');
      setImageUrl(res.url);
      setPreviewUrl(res.url);
      setSuccess('Imagen subida y guardada localmente con éxito.');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Error al subir la imagen al servidor');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveNewItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !title) {
      setError('Debe seleccionar o subir una imagen y especificar un título');
      return;
    }

    try {
      setError(null);
      await api.createCompanyGalleryItem({
        title,
        description,
        imageUrl,
        category,
        order: items.length + 1,
      });
      setSuccess('Imagen añadida a la galería de la empresa.');
      setShowAddForm(false);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setPreviewUrl('');
      fetchGallery();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Error al guardar la imagen en la galería');
    }
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      setError(null);
      await api.updateCompanyGalleryItem(editingItem.id, editingItem);
      setSuccess('Imagen actualizada correctamente.');
      setEditingItem(null);
      fetchGallery();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Error al actualizar el elemento');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('¿Desea eliminar esta imagen de la galería de empresa?')) return;

    try {
      setError(null);
      await api.deleteCompanyGalleryItem(id);
      setSuccess('Imagen eliminada de la galería.');
      fetchGallery();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError('Error al eliminar la imagen');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Update orders
    const reordered = newItems.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));

    setItems(reordered);
    try {
      await api.reorderCompanyGallery(reordered);
    } catch (err: any) {
      setError('Error al guardar el nuevo orden de imágenes');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header with Large Font */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-widest block mb-1">
            Gestión Institucional
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#1A1C1C]">
            Galería de Imágenes de la Empresa
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] mt-1.5">
            Suba, ordene y elimine las imágenes oficiales de instalaciones, flota y operaciones de FKR SURL. Guardadas en local.
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingItem(null);
          }}
          className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-5 shadow-sm shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>{showAddForm ? 'Cancelar' : 'Subir Nueva Imagen'}</span>
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-sm sm:text-base flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm sm:text-base flex items-center gap-3">
          <Check className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {/* Add New Image Form */}
      {showAddForm && (
        <form onSubmit={handleSaveNewItem} className="bg-white border-2 border-[#2C353F] p-6 sm:p-8 space-y-6 shadow-md">
          <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#1A1C1C]">
            Subir Imagen a la Galería de la Empresa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* File Upload / Image Picker */}
            <div className="space-y-4">
              <label className="block text-sm font-headline font-bold text-[#1A1C1C] uppercase tracking-wider">
                Archivo de Imagen (Local)
              </label>
              
              <div className="border-2 border-dashed border-[#D1D5DB] p-6 text-center bg-[#F9FAFB] hover:border-[#D20A11] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="gallery-file-input"
                />
                <label htmlFor="gallery-file-input" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-[#D20A11]" />
                  <span className="text-sm font-bold text-[#1A1C1C]">
                    {uploading ? 'Subiendo y guardando en local...' : 'Haga clic para seleccionar foto de su dispositivo'}
                  </span>
                  <span className="text-xs text-[#6B7280]">
                    JPG, PNG o WEBP. Se guardará localmente en /public/uploads/
                  </span>
                </label>
              </div>

              {/* Or manual local path */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#6B7280]">
                  O use una ruta local existente:
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  placeholder="/assets/facility/..."
                  className="w-full p-2.5 border border-[#D1D5DB] text-sm font-mono"
                />
              </div>

              {previewUrl && (
                <div className="relative aspect-[16/10] bg-[#101317] border border-[#D1D5DB] overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Title, description, category */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-headline font-bold text-[#1A1C1C] uppercase tracking-wider mb-1">
                  Título de la Imagen *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Patio de maniobras y transporte especializado en La Lisa"
                  className="w-full p-3 border border-[#D1D5DB] text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-headline font-bold text-[#1A1C1C] uppercase tracking-wider mb-1">
                  Descripción / Contexto
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explique qué operación o instalación se muestra..."
                  className="w-full p-3 border border-[#D1D5DB] text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-headline font-bold text-[#1A1C1C] uppercase tracking-wider mb-1">
                  Categoría
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-[#D1D5DB] text-base bg-white"
                >
                  <option value="instalaciones">Instalaciones & Sede</option>
                  <option value="tienda">Tienda en La Lisa</option>
                  <option value="logistica">Logística & Camión Grúa</option>
                  <option value="operaciones">Operaciones en Azoteas</option>
                  <option value="mantenimiento">Mantenimiento & Taller</option>
                  <option value="equipos">Flota de Generadores</option>
                </select>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={uploading || !imageUrl || !title}
                  className="fkr-btn fkr-btn-primary text-base py-3 px-6 shadow-sm disabled:opacity-50"
                >
                  Guardar en Galería Local
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="fkr-btn fkr-btn-outline text-base py-3 px-5"
                >
                  Cancelar
                </button>
              </div>
            </div>

          </div>
        </form>
      )}

      {/* Edit Modal / Inline Form */}
      {editingItem && (
        <form onSubmit={handleUpdateItem} className="bg-white border-2 border-[#D20A11] p-6 sm:p-8 space-y-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#1A1C1C]">
              Editar Elemento de Galería
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="text-sm text-[#6B7280] hover:text-[#1A1C1C]"
            >
              Cerrar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1C1C] mb-1">Título</label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full p-3 border border-[#D1D5DB] text-base"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1A1C1C] mb-1">Categoría</label>
              <input
                type="text"
                value={editingItem.category || ''}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                className="w-full p-3 border border-[#D1D5DB] text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1A1C1C] mb-1">Descripción</label>
            <textarea
              rows={2}
              value={editingItem.description}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              className="w-full p-3 border border-[#D1D5DB] text-base"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="fkr-btn fkr-btn-primary text-sm py-2.5 px-6">
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="fkr-btn fkr-btn-outline text-sm py-2.5 px-5"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Gallery Items List Table & Cards */}
      <div className="bg-white border border-[#D1D5DB] shadow-sm">
        <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#1A1C1C]">
              Imágenes Activas en la Web Pública ({items.length})
            </h3>
            <p className="text-sm text-[#4B5563] mt-1">
              Use las flechas para cambiar el orden de visualización en la página de Empresa.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-12 text-center text-[#6B7280]">
            No hay imágenes en la galería aún. Haga clic en "Subir Nueva Imagen".
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 hover:bg-[#F9FAFB] transition-colors"
              >
                {/* Left: Thumbnail & Order Badge */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 border border-[#D1D5DB] hover:bg-white dark:hover:bg-[#27303A] disabled:opacity-20 text-[#1A1C1C]"
                      title="Mover arriba"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-[#6B7280]">
                      #{index + 1}
                    </span>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === items.length - 1}
                      className="p-1.5 border border-[#D1D5DB] hover:bg-white dark:hover:bg-[#27303A] disabled:opacity-20 text-[#1A1C1C]"
                      title="Mover abajo"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-24 h-16 sm:w-32 sm:h-20 bg-[#F4F5F7] border border-[#D1D5DB] overflow-hidden shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#D20A11] uppercase tracking-wider block">
                      {item.category || 'General'}
                    </span>
                    <h4 className="font-headline font-bold text-base sm:text-lg text-[#1A1C1C] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] mt-1 line-clamp-1 max-w-xl">
                      {item.description}
                    </p>
                    <span className="text-[11px] text-[#6B7280] font-mono block mt-1">
                      {item.imageUrl}
                    </span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowAddForm(false);
                    }}
                    className="fkr-btn fkr-btn-outline text-xs sm:text-sm py-2 px-3"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                    title="Eliminar de galería"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
