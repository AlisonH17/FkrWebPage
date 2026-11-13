export interface LocalizedString {
  es: string;
  en: string;
}

export interface SpecificationItem {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  category: string;
  featured: boolean;
  published: boolean;
  available: boolean;
  name: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  primaryImage: string;
  gallery: string[];
  technicalSheetUrl?: string;
  specifications: SpecificationItem[];
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  image: string;
  order: number;
  published: boolean;
}

export interface ServiceItem {
  id: string;
  name: LocalizedString;
  desc: LocalizedString;
  icon: string;
  image?: string;
}

export interface FAQItem {
  category: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface CompanyValue {
  title: LocalizedString;
  desc: LocalizedString;
}

export interface CompanyInfo {
  name: string;
  activity: LocalizedString;
  location: string;
  whatsapp: string;
  instagram: string;
  description: LocalizedString;
  mission: LocalizedString;
  vision: LocalizedString;
  values: CompanyValue[];
}

export interface SiteContent {
  company: CompanyInfo;
  services: ServiceItem[];
  faqs: FAQItem[];
}

export interface Inquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  productName?: string;
  message: string;
  status: 'nuevo' | 'en_proceso' | 'atendido';
}

export interface DashboardStats {
  totalProducts: number;
  availableProducts: number;
  unavailableProducts: number;
  totalCategories: number;
  totalInquiries: number;
  pendingInquiries: number;
  recentProducts: Product[];
}

export interface CompanyGalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  order: number;
}
