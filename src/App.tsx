/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './locales/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Company } from './pages/Company';
import { Services } from './pages/Services';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminGallery } from './pages/admin/AdminGallery';
import { api } from './services/api';
import { Product, Category, SiteContent, DashboardStats } from './types';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const readPath = () => {
  let p = window.location.pathname || '/';
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || '/';
  return p + (window.location.search || '');
};

function MainApp() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return readPath();
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Admin state (Defaults to products tab for immediate photo and availability management)
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('fkr_admin_token');
  });
  const [adminTab, setAdminTab] = useState<string>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Synchronize browser history and path changes
  const navigate = (path: string) => {
    window.history.pushState({}, '', BASE + path)
    setCurrentPath(path);
    if (!path.includes('step=')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(readPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [prods, cats, cnt, st] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getContent().catch(() => null),
        api.getDashboardStats().catch(() => null),
      ]);
      setProducts(prods);
      setCategories(cats);
      setContent(cnt);
      setStats(st);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fkr_admin_token');
    setAdminToken(null);
    navigate('/');
  };

  // Determine current route
  const renderContent = () => {
    // Required Loading Screen: Red square and only saying "Cargando"
    if (loading) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-[#D20A11] animate-pulse" />
            <span className="font-headline font-bold text-sm tracking-widest uppercase text-[#101317]">
              Cargando
            </span>
          </div>
        </div>
      );
    }

    // Admin Routes
    if (currentPath.startsWith('/admin')) {
      if (!adminToken) {
        return (
          <AdminLogin
            onLoginSuccess={(token) => setAdminToken(token)}
            navigate={navigate}
          />
        );
      }

      return (
        <div className="min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row">
          <AdminSidebar
            currentTab={adminTab}
            setTab={(tab) => {
              setAdminTab(tab);
              if (tab === 'products') setEditingProduct(null);
            }}
            onLogout={handleLogout}
            navigate={navigate}
          />

          <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-x-hidden">
            {adminTab === 'products' && (
              <AdminProducts
                products={products}
                categories={categories}
                onRefresh={fetchData}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
              />
            )}

            {adminTab === 'gallery' && (
              <AdminGallery />
            )}

            {adminTab === 'dashboard' && (
              <AdminDashboard
                stats={stats}
                products={products}
                categories={categories}
                setTab={(tab) => setAdminTab(tab)}
                onEditProduct={(p) => {
                  setEditingProduct(p);
                  setAdminTab('products');
                }}
                navigate={navigate}
              />
            )}

            {adminTab === 'categories' && (
              <AdminCategories
                categories={categories}
                products={products}
                onRefresh={fetchData}
              />
            )}

            {adminTab === 'content' && (
              <AdminContent
                content={content}
                onRefresh={fetchData}
              />
            )}
          </main>
        </div>
      );
    }

    const [pathOnly, searchPart] = currentPath.split('?');
    const queryParams = new URLSearchParams(
      searchPart !== undefined ? searchPart : (typeof window !== 'undefined' ? window.location.search : '')
    );

    // Public Product Detail: /catalogo/:slug
    if (pathOnly.startsWith('/catalogo/') && pathOnly !== '/catalogo') {
      const slug = pathOnly.replace('/catalogo/', '');
      return (
        <ProductDetail
          slug={slug}
          products={products}
          categories={categories}
          navigate={navigate}
        />
      );
    }

    // Public Catalog
    if (pathOnly === '/catalogo') {
      const initialCat = queryParams.get('category') || undefined;
      return (
        <Catalog
          products={products}
          categories={categories}
          navigate={navigate}
          initialCategory={initialCat}
        />
      );
    }

    // Public Company Page
    if (pathOnly === '/empresa') {
      return <Company content={content} navigate={navigate} />;
    }

    // Public Services Page
    if (pathOnly === '/servicios') {
      const initialStep = queryParams.get('step') || undefined;
      return <Services content={content} navigate={navigate} initialStep={initialStep} />;
    }

    // Public FAQ Page
    if (pathOnly === '/preguntas-frecuentes') {
      return <FAQ content={content} navigate={navigate} />;
    }

    // Public Contact Page
    if (pathOnly === '/contacto') {
      return <Contact />;
    }

    // Public Home Page (default)
    return (
      <Home
        products={products}
        categories={categories}
        navigate={navigate}
      />
    );
  };

  const isAdminArea = currentPath.startsWith('/admin') && adminToken;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9] text-[#1A1C1C]">
      {/* Show header on public pages */}
      {!isAdminArea && (
        <Header
          currentPath={currentPath}
          navigate={navigate}
          isAdminLoggedIn={Boolean(adminToken)}
        />
      )}

      {/* Main Page Area */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Show footer and floating actions on public pages */}
      {!isAdminArea && !currentPath.startsWith('/admin') && (
        <>
          <Footer navigate={navigate} />
          <FloatingActions />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
