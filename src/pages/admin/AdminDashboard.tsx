import React from 'react';
import { Package, CheckCircle, Clock, FolderTree, Plus, ArrowRight, ExternalLink, Image } from 'lucide-react';
import { DashboardStats, Product, Category } from '../../types';

interface AdminDashboardProps {
  stats: DashboardStats | null;
  products: Product[];
  categories: Category[];
  setTab: (tab: string) => void;
  onEditProduct: (product: Product) => void;
  navigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  products,
  categories,
  setTab,
  onEditProduct,
  navigate,
}) => {
  const availableCount = products.filter(p => p.available).length;
  const onOrderCount = products.filter(p => !p.available).length;

  return (
    <div className="space-y-10">
      
      {/* Top Banner with Generous Typography */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-xs sm:text-sm font-headline font-bold text-[#D20A11] uppercase tracking-widest block mb-1.5">
            Panel de Administración
          </span>
          <h2 className="font-headline font-bold text-3xl sm:text-4xl text-[#101317]">
            Fotos de Productos y Disponibilidad
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] mt-2">
            Gestione las fotografías oficiales de cada equipo y active o desactive el estado de disponibilidad en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab('products')}
            className="fkr-btn fkr-btn-primary text-sm sm:text-base py-3 px-5 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Subir Fotos / Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid with Large Numbers and Clear Labels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-[#4B5563]">
            <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider">
              Total Productos
            </span>
            <Package className="w-6 h-6 text-[#D20A11]" />
          </div>
          <div className="text-4xl sm:text-5xl font-headline font-bold text-[#101317] font-mono-num">
            {products.length}
          </div>
          <span className="text-xs sm:text-sm text-[#6B7280] mt-1.5 block">
            Equipos registrados con fotos
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-[#4B5563]">
            <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider">
              En Stock / Disponibles
            </span>
            <CheckCircle className="w-6 h-6 text-[#15803D]" />
          </div>
          <div className="text-4xl sm:text-5xl font-headline font-bold text-[#15803D] font-mono-num">
            {availableCount}
          </div>
          <span className="text-xs sm:text-sm text-[#15803D] font-semibold mt-1.5 block">
            Listos para entrega inmediata
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-[#4B5563]">
            <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider">
              Bajo Pedido / Agotado
            </span>
            <Clock className="w-6 h-6 text-[#B45309]" />
          </div>
          <div className="text-4xl sm:text-5xl font-headline font-bold text-[#B45309] font-mono-num">
            {onOrderCount}
          </div>
          <span className="text-xs sm:text-sm text-[#B45309] font-semibold mt-1.5 block">
            Requieren importación / encargo
          </span>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-[#4B5563]">
            <span className="text-xs sm:text-sm font-headline font-bold uppercase tracking-wider">
              Líneas de Negocio
            </span>
            <FolderTree className="w-6 h-6 text-[#101317]" />
          </div>
          <div className="text-4xl sm:text-5xl font-headline font-bold text-[#101317] font-mono-num">
            {categories.length}
          </div>
          <span className="text-xs sm:text-sm text-[#6B7280] mt-1.5 block">
            Generadores, Solar, Baterías, Repuestos
          </span>
        </div>

      </div>

      {/* Recent Products Table with Enhanced Fonts */}
      <div className="bg-white border border-[#E5E7EB] shadow-sm">
        <div className="p-6 sm:p-7 border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#101317]">
              Fotografías y Estado de Disponibilidad
            </h3>
            <p className="text-sm text-[#6B7280] mt-1">
              Revise las imágenes del producto y actualice si está disponible o bajo pedido.
            </p>
          </div>

          <button
            onClick={() => setTab('products')}
            className="text-sm font-headline font-bold text-[#D20A11] hover:underline uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Gestionar catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#374151] font-headline font-bold uppercase tracking-wider text-xs sm:text-sm">
              <tr>
                <th className="py-4 px-5">Foto Principal</th>
                <th className="py-4 px-5">Nombre del Equipo</th>
                <th className="py-4 px-5">Categoría</th>
                <th className="py-4 px-5">Estado de Disponibilidad</th>
                <th className="py-4 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {products.slice(0, 6).map((p) => {
                const cat = categories.find((c) => c.id === p.category);
                return (
                  <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="w-16 h-16 bg-[#F4F5F7] border border-[#D1D5DB] p-1.5 flex items-center justify-center overflow-hidden shadow-xs">
                        <img
                          src={p.primaryImage}
                          alt=""
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = asset('/assets/facility/fkr-gigantografia.png');
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <strong className="block text-base sm:text-lg text-[#101317] font-bold leading-snug">
                        {p.name.es}
                      </strong>
                      <span className="text-xs sm:text-sm text-[#6B7280] font-mono block mt-0.5">
                        {p.slug}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-sm sm:text-base font-medium text-[#374151]">
                      {cat?.name.es || 'General'}
                    </td>
                    <td className="py-4 px-5">
                      {p.available ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-bold">
                          <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                          <span>Disponible / En Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 text-xs sm:text-sm font-bold">
                          <span className="w-2.5 h-2.5 bg-amber-600 rounded-full" />
                          <span>Bajo Pedido</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right space-x-2 shrink-0">
                      <button
                        onClick={() => onEditProduct(p)}
                        className="fkr-btn fkr-btn-outline text-xs sm:text-sm py-1.5 px-3"
                      >
                        Cambiar foto / datos
                      </button>
                      <button
                        onClick={() => navigate(`/catalogo/${p.slug}`)}
                        className="text-xs sm:text-sm text-[#6B7280] hover:text-[#101317] p-1.5"
                        title="Ver en la web pública"
                      >
                        <ExternalLink className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Shortcuts with Large Fonts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          onClick={() => setTab('products')}
          className="p-7 bg-white border border-[#E5E7EB] hover:border-[#D20A11] transition-all cursor-pointer group shadow-sm flex items-start gap-5"
        >
          <div className="w-14 h-14 bg-[#FFF0F1] text-[#D20A11] flex items-center justify-center shrink-0">
            <Image className="w-7 h-7" />
          </div>
          <div>
            <strong className="block font-headline font-bold text-lg sm:text-xl text-[#101317] group-hover:text-[#D20A11] transition-colors mb-1.5">
              Subir Fotografías y Crear Productos →
            </strong>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Suba imágenes en alta resolución desde su dispositivo o seleccione fotos locales de grupos electrógenos, inversores y baterías.
            </p>
          </div>
        </div>

        <div
          onClick={() => setTab('products')}
          className="p-7 bg-white border border-[#E5E7EB] hover:border-[#D20A11] transition-all cursor-pointer group shadow-sm flex items-start gap-5"
        >
          <div className="w-14 h-14 bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <strong className="block font-headline font-bold text-lg sm:text-xl text-[#101317] group-hover:text-[#D20A11] transition-colors mb-1.5">
              Actualizar Disponibilidad Inmediata →
            </strong>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Marque qué equipos están disponibles de inmediato para entrega en La Habana y cuáles quedan bajo encargo con un solo clic.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
