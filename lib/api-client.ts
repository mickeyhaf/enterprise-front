const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1";

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as { message?: string }).message ?? res.statusText);
  }
  return res.json();
}

async function postApi<T>(path: string, body: unknown): Promise<T> {
  return fetchApi<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Types matching backend
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  overview: string;
  highlights: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  icon: string;
  challenge: string;
  solution: string;
  impact: string;
  location?: string;
  year?: string;
  client?: string;
}

export interface EngagementPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
}

export interface SubmitQuoteRequest {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  productServiceInterest: string;
  quantity?: string;
  additionalDetails?: string;
}

// Content block types
export interface HomeHero {
  headline: string;
  tagline: string;
  badge: string;
}

export interface AboutHistory {
  paragraphs: string[];
}

export interface FooterContact {
  companyName: string;
  description: string;
  address: string;
  email: string;
  phone: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  supportEmail: string;
  phone: string;
  hours: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface ValuesContent {
  title: string;
  description: string;
  items: ValueItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AwardItem {
  year: string;
  title: string;
  issuer: string;
  description: string;
}

export interface AchievementsContent {
  title: string;
  description: string;
  stats: StatItem[];
  awards: AwardItem[];
}

export interface PartnerItem {
  name: string;
  description: string;
  image: string;
  link?: string;
  logoOnly?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

export interface OrgDepartment {
  icon: string;
  name: string;
  description: string;
}

export interface OrgStructureContent {
  title: string;
  description: string;
  departments: OrgDepartment[];
  hierarchy?: { label: string }[];
}

export interface PortfolioStats {
  projectsCompleted: string;
  yearsExperience: string;
  globalPartners: string;
  valueGenerated: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface HomeHeritage {
  sectionTitle: string;
  sectionDescription: string;
  mission: { title: string; description: string; icon: string };
  vision: { title: string; description: string; icon: string };
  image: string;
  badge: { value: string; label: string };
}

export interface HomeLeadership {
  title: string;
  description: string;
}

export interface TrustBadgeItem {
  icon: string;
  label: string;
  value: string;
}

export interface HomeTrust {
  title: string;
  description: string;
  badges: TrustBadgeItem[];
}

export interface AboutHeroContent {
  title: string;
  description: string;
}

export interface ContactCTAContent {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryLink: string;
}

export interface ResourcesCategoryItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface ResourcesCategoriesContent {
  items: ResourcesCategoryItem[];
}

export interface TradeSectionContent {
  hero: { badge?: string; title: string; description: string };
  section: { title: string; description: string; items: string[] };
  services?: string[];
  features?: { icon: string; title: string; description: string }[];
}

export interface TradeMainSection {
  id: string;
  badge: string;
  title: string;
  description: string;
  bulletItems: string[];
  link: string;
}

export interface TradeMainContent {
  hero: { title: string; description: string };
  sections: TradeMainSection[];
}

export interface ResourceItem {
  id: number;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileSize?: string;
  updatedAt?: string;
}

// API functions
export const api = {
  // Content
  getContent: () => fetchApi<Record<string, unknown>>("/content"),
  getContentByKey: <T = unknown>(key: string) =>
    fetchApi<T>(`/content/${encodeURIComponent(key)}`),

  // News
  getNews: () => fetchApi<NewsArticle[]>("/news"),
  getNewsBySlug: (slug: string) =>
    fetchApi<NewsArticle | null>(`/news/${encodeURIComponent(slug)}`),

  // Products
  getProducts: () => fetchApi<Product[]>("/products"),
  getProductBySlug: (slug: string) =>
    fetchApi<Product | null>(`/products/${encodeURIComponent(slug)}`),

  // Projects
  getProjects: () => fetchApi<Project[]>("/projects"),
  getProjectBySlug: (slug: string) =>
    fetchApi<Project | null>(`/projects/${encodeURIComponent(slug)}`),

  // Team
  getTeam: () => fetchApi<TeamMember[]>("/team"),

  // Engagement
  getEngagement: () => fetchApi<EngagementPost[]>("/community-engagement"),
  getEngagementBySlug: (slug: string) =>
    fetchApi<EngagementPost | null>(
      `/community-engagement/${encodeURIComponent(slug)}`
    ),

  // Orders (quote requests)
  submitQuote: (data: SubmitQuoteRequest) =>
    postApi<{ id: number }>("/orders", data),

  // Resources
  getResources: (category?: string) =>
    fetchApi<ResourceItem[]>(
      category ? `/resources?category=${encodeURIComponent(category)}` : "/resources"
    ),
};
