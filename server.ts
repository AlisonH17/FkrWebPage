import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Ensure data and upload directories exist
const dataDir = path.resolve(__dirname, 'data');
const uploadsDir = path.resolve(__dirname, 'public/uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Body parsers with generous limits for images and PDF data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Helper functions for reading/writing JSON files
const readJson = (filename: string, fallback: any = []) => {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return fallback;
  }
};

const writeJson = (filename: string, data: any) => {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// ======================== API ROUTES ========================

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { user, pass } = req.body;
  // Secure administrative credentials with fallback demo identification
  // User: admin@fkr.cu or fkr_admin, Pass: FKR_Energia_2026!
  if (
    (user === 'admin@fkr.cu' || user === 'fkr_admin' || user === 'admin') &&
    (pass === 'FKR_Energia_2026!' || pass === 'admin123')
  ) {
    const token = 'fkr_session_' + Date.now() + '_' + Math.random().toString(36).substring(2);
    return res.json({
      success: true,
      token,
      user: { name: 'Administrador FKR', email: 'admin@fkr.cu', role: 'admin' }
    });
  }
  return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
});

// Products
app.get('/api/products', (req, res) => {
  let products = readJson('products.json', []);
  const { category, query, onlyAvailable } = req.query;

  if (category && category !== 'all') {
    products = products.filter((p: any) => p.category === category);
  }

  if (query && typeof query === 'string') {
    const q = query.toLowerCase().trim();
    products = products.filter((p: any) => 
      p.name?.es?.toLowerCase().includes(q) ||
      p.name?.en?.toLowerCase().includes(q) ||
      p.shortDescription?.es?.toLowerCase().includes(q) ||
      p.shortDescription?.en?.toLowerCase().includes(q) ||
      p.specifications?.some((s: any) => s.value?.toLowerCase().includes(q) || s.key?.toLowerCase().includes(q))
    );
  }

  if (onlyAvailable === 'true') {
    products = products.filter((p: any) => p.available);
  }

  res.json(products);
});

app.get('/api/products/:slugOrId', (req, res) => {
  const products = readJson('products.json', []);
  const { slugOrId } = req.params;
  const product = products.find((p: any) => p.slug === slugOrId || p.id === slugOrId);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const products = readJson('products.json', []);
  const newProduct = {
    ...req.body,
    id: 'prod-' + Date.now(),
    slug: req.body.slug || (req.body.name?.es || 'producto').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    updatedAt: new Date().toISOString()
  };
  products.unshift(newProduct);
  writeJson('products.json', products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const products = readJson('products.json', []);
  const { id } = req.params;
  const index = products.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  products[index] = {
    ...products[index],
    ...req.body,
    id,
    updatedAt: new Date().toISOString()
  };
  writeJson('products.json', products);
  res.json(products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  let products = readJson('products.json', []);
  const { id } = req.params;
  products = products.filter((p: any) => p.id !== id);
  writeJson('products.json', products);
  res.json({ success: true });
});

// Categories
app.get('/api/categories', (req, res) => {
  const categories = readJson('categories.json', []);
  res.json(categories);
});

app.post('/api/categories', (req, res) => {
  const categories = readJson('categories.json', []);
  const newCat = {
    ...req.body,
    id: 'cat-' + Date.now(),
    slug: req.body.slug || (req.body.name?.es || 'categoria').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    order: categories.length + 1,
    published: true
  };
  categories.push(newCat);
  writeJson('categories.json', categories);
  res.status(201).json(newCat);
});

app.put('/api/categories/:id', (req, res) => {
  const categories = readJson('categories.json', []);
  const { id } = req.params;
  const index = categories.findIndex((c: any) => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Categoría no encontrada' });
  categories[index] = { ...categories[index], ...req.body, id };
  writeJson('categories.json', categories);
  res.json(categories[index]);
});

app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const products = readJson('products.json', []);
  const hasProducts = products.some((p: any) => p.category === id);
  if (hasProducts) {
    return res.status(400).json({ error: 'No se puede eliminar la categoría porque tiene productos asociados.' });
  }
  let categories = readJson('categories.json', []);
  categories = categories.filter((c: any) => c.id !== id);
  writeJson('categories.json', categories);
  res.json({ success: true });
});

// Institutional Content
app.get('/api/content', (req, res) => {
  const content = readJson('content.json', {});
  res.json(content);
});

app.put('/api/content', (req, res) => {
  const current = readJson('content.json', {});
  const updated = { ...current, ...req.body };
  writeJson('content.json', updated);
  res.json(updated);
});

// Company Gallery (Administrable)
app.get('/api/company-gallery', (req, res) => {
  const gallery = readJson('company-gallery.json', []);
  gallery.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  res.json(gallery);
});

app.post('/api/company-gallery', (req, res) => {
  const gallery = readJson('company-gallery.json', []);
  const newItem = {
    ...req.body,
    id: 'gal-' + Date.now(),
    order: req.body.order ?? (gallery.length + 1)
  };
  gallery.push(newItem);
  writeJson('company-gallery.json', gallery);
  res.status(201).json(newItem);
});

app.put('/api/company-gallery/reorder', (req, res) => {
  const { items } = req.body;
  if (Array.isArray(items)) {
    writeJson('company-gallery.json', items);
    return res.json(items);
  }
  res.status(400).json({ error: 'Array de items requerido' });
});

app.put('/api/company-gallery/:id', (req, res) => {
  const gallery = readJson('company-gallery.json', []);
  const { id } = req.params;
  const index = gallery.findIndex((item: any) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Imagen no encontrada' });
  gallery[index] = { ...gallery[index], ...req.body, id };
  writeJson('company-gallery.json', gallery);
  res.json(gallery[index]);
});

app.delete('/api/company-gallery/:id', (req, res) => {
  let gallery = readJson('company-gallery.json', []);
  const { id } = req.params;
  gallery = gallery.filter((item: any) => item.id !== id);
  writeJson('company-gallery.json', gallery);
  res.json({ success: true });
});

// Inquiries / Leads
app.get('/api/inquiries', (req, res) => {
  const inquiries = readJson('inquiries.json', []);
  res.json(inquiries);
});

app.post('/api/inquiries', (req, res) => {
  const inquiries = readJson('inquiries.json', []);
  const newInq = {
    ...req.body,
    id: 'inq-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'nuevo'
  };
  inquiries.unshift(newInq);
  writeJson('inquiries.json', inquiries);
  res.status(201).json(newInq);
});

app.put('/api/inquiries/:id', (req, res) => {
  const inquiries = readJson('inquiries.json', []);
  const { id } = req.params;
  const index = inquiries.findIndex((i: any) => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Consulta no encontrada' });
  inquiries[index] = { ...inquiries[index], ...req.body, id };
  writeJson('inquiries.json', inquiries);
  res.json(inquiries[index]);
});

app.delete('/api/inquiries/:id', (req, res) => {
  let inquiries = readJson('inquiries.json', []);
  const { id } = req.params;
  inquiries = inquiries.filter((i: any) => i.id !== id);
  writeJson('inquiries.json', inquiries);
  res.json({ success: true });
});

// Dashboard Stats
app.get('/api/stats', (req, res) => {
  const products = readJson('products.json', []);
  const categories = readJson('categories.json', []);
  const inquiries = readJson('inquiries.json', []);

  res.json({
    totalProducts: products.length,
    availableProducts: products.filter((p: any) => p.available).length,
    unavailableProducts: products.filter((p: any) => !p.available).length,
    totalCategories: categories.length,
    totalInquiries: inquiries.length,
    pendingInquiries: inquiries.filter((i: any) => i.status === 'nuevo').length,
    recentProducts: products.slice(0, 5)
  });
});

// File upload endpoint (supports base64 payload for image or PDF)
app.post('/api/upload', (req, res) => {
  const { name, data, type } = req.body;
  if (!data || !name) {
    return res.status(400).json({ error: 'Datos de archivo incompletos' });
  }

  // Extract base64
  const matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  let buffer: Buffer;
  let ext = path.extname(name);

  if (matches && matches.length === 3) {
    buffer = Buffer.from(matches[2], 'base64');
  } else {
    buffer = Buffer.from(data, 'base64');
  }

  const cleanName = path.basename(name, ext).replace(/[^a-zA-Z0-9_-]/g, '_') + '_' + Date.now() + ext;
  const targetPath = path.join(uploadsDir, cleanName);

  fs.writeFileSync(targetPath, buffer);
  res.json({
    url: `/uploads/${cleanName}`,
    filename: cleanName
  });
});

// Static assets
app.use('/assets', express.static(path.resolve(__dirname, 'public/assets')));
app.use('/uploads', express.static(uploadsDir));

// Vite Middleware for Full-Stack development
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FKR SURL Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
