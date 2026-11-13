import React from 'react';
import { LayoutDashboard, Package, FolderTree, FileEdit, LogOut, ExternalLink, Shield, Image } from 'lucide-react';

interface AdminSidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onLogout: () => void;
  navigate: (path: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  setTab,
  onLogout,
  navigate,
}) => {
  const menuItems = [
    { id: 'products', label: 'Productos y Disponibilidad', icon: <Package className="w-5 h-5" /> },
    { id: 'gallery', label: 'Galería de la Empresa', icon: <Image className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Resumen General', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'categories', label: 'Categorías', icon: <FolderTree className="w-5 h-5" /> },
    { id: 'content', label: 'Textos y Datos Web', icon: <FileEdit className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-72 bg-[#2C353F] border-r border-[#414D5C] text-[#CBD5E1] flex flex-col justify-between shrink-0 min-h-screen">
      
      {/* Top Brand Banner with Enlarged Typography */}
      <div>
        <div className="p-6 border-b border-[#414D5C] flex items-center gap-3.5 bg-[#222931]">
          <div className="w-10 h-10 bg-[#D20A11] flex items-center justify-center text-white font-headline font-bold text-base shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-headline font-bold text-white text-lg block leading-none">
              FKR ADMIN
            </span>
            <span className="text-[11px] font-headline font-bold text-[#D20A11] tracking-widest uppercase mt-1 block">
              CATÁLOGO Y DISPONIBILIDAD
            </span>
          </div>
        </div>

        {/* Navigation links with Enhanced Font Size and comfortable touch padding */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-sm sm:text-base font-headline font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#D20A11] text-white shadow-md'
                    : 'text-[#CBD5E1] hover:bg-[#37424E] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions with Larger Text */}
      <div className="p-5 border-t border-[#414D5C] bg-[#222931] space-y-2.5">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-between px-4 py-3 text-sm text-[#CBD5E1] hover:text-white hover:bg-[#37424E] transition-colors font-medium"
        >
          <span className="flex items-center gap-2.5">
            <ExternalLink className="w-4 h-4" />
            <span>Ver sitio público</span>
          </span>
          <span className="text-sm font-bold">↗</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors font-headline font-bold uppercase tracking-wider"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

    </aside>
  );
};
