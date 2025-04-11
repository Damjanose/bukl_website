export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  niche: string;
  category: string;
}

export interface Website {
  id: string;
  domain: string;
  niche: string;
  category: string;
  template: string;
  status: 'active' | 'pending' | 'failed';
  hosting: 'self' | 'bulkweb';
  createdAt: string;
}

export type Niche = 'landing' | 'ecommerce' | 'sport-fantasy' | 'social-casino';

export interface Category {
  id: string;
  name: string;
  niche: Niche;
}

export interface WebsiteData {
  website_id: number;
  domain: string;
  selectedNiche: string | null;
  selectedCategories: string[];
  selectedTemplate: string | null;
  selectedHosting: string | null;
  selectedPaymentMethod: string | null;
  paymentDetails: Record<string, any>;
}

export interface BulkWebsiteData extends WebsiteData {
  domains: string[];
}


