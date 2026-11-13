import { Product, Category, SiteContent, Inquiry, DashboardStats } from '../types';

const API_BASE = '/api';

// Lee datos estáticos de /data/ cuando no hay servidor (por ejemplo, en Netlify)
async function loadStatic<T>(file: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`/data/${file}`);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

export const api = {
  // Products
  async getProducts(params?: { category?: string; query?: string; onlyAvailable?: boolean }): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.category && params.category !== 'all') searchParams.append('category', params.category);
      if (params?.query) searchParams.append('query', params.query);
      if (params?.onlyAvailable) searchParams.append('onlyAvailable', 'true');

      const res = await fetch(`${API_BASE}/products?${searchParams.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch {
      // Sin servidor: lee /data/products.json y aplica los filtros en el navegador
      const saved = localStorage.getItem('fkr_local_products');
      let products: any[] = saved
        ? JSON.parse(saved)
        : await loadStatic<any[]>('products.json', []);

      if (params?.category && params.category !== 'all') {
        products = products.filter(p => p.category === params.category);
      }
      if (params?.query) {
        const q = params.query.toLowerCase().trim();
        products = products.filter(p =>
          p.name?.es?.toLowerCase().includes(q) ||
          p.name?.en?.toLowerCase().includes(q) ||
          p.shortDescription?.es?.toLowerCase().includes(q) ||
          p.shortDescription?.en?.toLowerCase().includes(q) ||
          p.specifications?.some((s: any) =>
            s.value?.toLowerCase().includes(q) || s.key?.toLowerCase().includes(q))
        );
      }
      if (params?.onlyAvailable) {
        products = products.filter(p => p.available);
      }
      return products as Product[];
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE}/products/${slug}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch {
      const products = await api.getProducts();
      return products.find(p => p.slug === slug || p.id === slug) || null;
    }
  },

  async createProduct(product: Omit<Product, 'id' | 'updatedAt'>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Error al crear producto');
    return await res.json();
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Error al actualizar producto');
    return await res.json();
  },

  async deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar producto');
    return true;
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch {
      const saved = localStorage.getItem('fkr_local_categories');
      if (saved) return JSON.parse(saved);
      return await loadStatic<Category[]>('categories.json', []);
    }
  },

  async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error('Error al crear categoría');
    return await res.json();
  },

  async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!res.ok) throw new Error('Error al actualizar categoría');
    return await res.json();
  },

  async deleteCategory(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'No se puede eliminar la categoría');
    }
    return true;
  },

  // Content
  async getContent(): Promise<SiteContent> {
    try {
      const res = await fetch(`${API_BASE}/content`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return await res.json();
    } catch {
      const saved = localStorage.getItem('fkr_local_content');
      if (saved) return JSON.parse(saved);
      const content = await loadStatic<SiteContent | null>('content.json', null);
      if (content) return content;
      throw new Error('No content available');
    }
  },

  async updateContent(content: Partial<SiteContent>): Promise<SiteContent> {
    const res = await fetch(`${API_BASE}/content`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    if (!res.ok) throw new Error('Error al actualizar contenido');
    return await res.json();
  },

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    try {
      const res = await fetch(`${API_BASE}/inquiries`);
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      return await res.json();
    } catch {
      return [];
    }
  },

  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
    if (!res.ok) throw new Error('Error al enviar la consulta');
    return await res.json();
  },

  async updateInquiryStatus(id: string, status: 'nuevo' | 'en_proceso' | 'atendido'): Promise<Inquiry> {
    const res = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Error al actualizar estado');
    return await res.json();
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return await res.json();
    } catch {
      const [products, categories, inquiries] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getInquiries(),
      ]);
      return {
        totalProducts: products.length,
        availableProducts: products.filter(p => p.available).length,
        unavailableProducts: products.filter(p => !p.available).length,
        totalCategories: categories.length,
        totalInquiries: inquiries.length,
        pendingInquiries: inquiries.filter(i => i.status === 'nuevo').length,
        recentProducts: products.slice(0, 5),
      };
    }
  },

  // Company Gallery (Administrable)
  async getCompanyGallery(): Promise<import('../types').CompanyGalleryItem[]> {
    try {
      const res = await fetch(`${API_BASE}/company-gallery`);
      if (!res.ok) throw new Error('Failed to fetch gallery');
      return await res.json();
    } catch {
      // Sin servidor: lee /data/company-gallery.json y ordena por "order"
      const gallery = await loadStatic<import('../types').CompanyGalleryItem[]>('company-gallery.json', []);
      return [...gallery].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    }
  },

  async createCompanyGalleryItem(item: Omit<import('../types').CompanyGalleryItem, 'id'>): Promise<import('../types').CompanyGalleryItem> {
    const res = await fetch(`${API_BASE}/company-gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Error al agregar imagen a la galería');
    return await res.json();
  },

  async reorderCompanyGallery(items: import('../types').CompanyGalleryItem[]): Promise<import('../types').CompanyGalleryItem[]> {
    const res = await fetch(`${API_BASE}/company-gallery/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (!res.ok) throw new Error('Error al reordenar galería');
    return await res.json();
  },

  async updateCompanyGalleryItem(id: string, item: Partial<import('../types').CompanyGalleryItem>): Promise<import('../types').CompanyGalleryItem> {
    const res = await fetch(`${API_BASE}/company-gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!res.ok) throw new Error('Error al actualizar imagen de galería');
    return await res.json();
  },

  async deleteCompanyGalleryItem(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/company-gallery/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar imagen de galería');
    return true;
  },

  // Upload file (Image or PDF) via base64
  async uploadFile(file: File, type: 'image' | 'spec'): Promise<{ url: string; filename: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name,
              data: base64Data,
              type,
            }),
          });
          if (!res.ok) throw new Error('Error al subir archivo');
          const data = await res.json();
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsDataURL(file);
    });
  },

  // Auth
  async login(user: string, pass: string): Promise<{ success: boolean; token?: string; error?: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass }),
    });
    return await res.json();
  }
};