const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1";

const DEFAULT_OPTIONS: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
}

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers = { ...DEFAULT_OPTIONS.headers, ...options?.headers } as Record<string, string>;

  // Don't set Content-Type if body is FormData (let the browser set it with boundary)
  if (options?.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const res = await fetch(url, {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: headers as HeadersInit,
  });

  if (res.status === 401 && !path.includes("/auth/login") && !path.includes("/auth/refresh")) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
          method: "POST",
          ...DEFAULT_OPTIONS,
        });
        if (refreshRes.ok) {
          const text = await refreshRes.text();
          const data = text && text.trim() ? (JSON.parse(text) as { accessToken?: string }) : {};
          onRefreshed(data.accessToken ?? "");
          isRefreshing = false;
          // Retry the original request
          return fetchApi<T>(path, options);
        } else {
          onRefreshed(""); // Release others even if it failed
        }
      } catch (err) {
        onRefreshed("");
      } finally {
        isRefreshing = false;
      }
    } else {
      // Wait for refresh to complete then retry
      return new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(fetchApi<T>(path, options));
        });
      });
    }
  }

  if (!res.ok) {
    const text = await res.text();
    let err: { message?: string } = { message: res.statusText };
    if (text && text.trim()) {
      try {
        err = JSON.parse(text) as { message?: string };
      } catch {
        // use default err
      }
    }
    throw new Error(err.message ?? res.statusText);
  }
  const text = await res.text();
  if (!text || text.trim() === "") {
    return null as T;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Invalid JSON response from server");
  }
}

async function postApi<T>(path: string, body: unknown): Promise<T> {
  return fetchApi<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function patchApi<T>(path: string, body: unknown): Promise<T> {
  return fetchApi<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

async function deleteApi<T = void>(path: string): Promise<T> {
  return fetchApi<T>(path, { method: "DELETE" });
}

async function putApi<T>(path: string, body: unknown): Promise<T> {
  return fetchApi<T>(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

// Types matching backend
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  email?: string | null;
  linkedin?: string | null;
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
export interface NavbarLinkItem {
  label: string;
  href: string;
}

export interface NavbarDropdown {
  label: string;
  href: string;
  items: NavbarLinkItem[];
}

export interface NavbarContent {
  siteName: string;
  tagline: string;
  mainLinks?: NavbarLinkItem[];
  dropdowns?: NavbarDropdown[];
  trailingLinks?: NavbarLinkItem[];
  resourcesDropdown?: NavbarDropdown;
  languages?: string[];
}

export interface HomeHero {
  headline: string;
  tagline: string;
  badge: string;
  badgeIcon?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface AboutHistory {
  paragraphs: string[];
}

export interface FooterSocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterLinksContent {
  quickLinks?: FooterLinkItem[];
  resourceLinks?: FooterLinkItem[];
}

export interface FooterContact {
  companyName: string;
  description: string;
  address: string;
  email: string;
  phone: string;
}

export interface ServicesHeroContent {
  title: string;
  description: string;
  image: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  supportEmail: string;
  phone: string;
  hours: string;
}

export interface ValueItem {
  icon?: string;
  title: string;
  description: string;
}

export interface ValuesContent {
  title: string;
  description: string;
  items: ValueItem[];
}

export interface StatItem {
  icon?: string;
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
  image?: string;
}

export interface ContactCTAContent {
  title: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryLink: string;
}

export interface ContactSubjectItem {
  value: string;
  label: string;
}

export interface ContactSubjectsContent {
  items: ContactSubjectItem[];
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

export interface ServicesHeroContent {
  title: string;
  description: string;
  image: string;
}

export interface TradeSectionContent {
  hero?: { badge?: string; title?: string; description?: string; image?: string };
  section?: { title?: string; description?: string; items?: string[]; image?: string };
  services?: string[];
  features?: { icon: string; title: string; description: string }[];
  cta?: { title?: string; description?: string; buttonText?: string };
}

export interface LegalSectionCard {
  title: string;
  description: string;
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  content?: string;
  cards?: LegalSectionCard[];
}

export interface CookiesPolicyContent {
  lastUpdated?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  dateLabel?: string;
  infoRight?: string;
  sections?: LegalSection[];
  note?: { heading?: string; content?: string };
  contactEmail?: string;
}

export interface PrivacyPolicyContent {
  lastUpdated?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  dateLabel?: string;
  version?: string;
  infoRight?: string;
  sections?: LegalSection[];
  contactBlock?: { companyName?: string; address?: string; email?: string };
}

export interface TermsOfServiceContent {
  lastUpdated?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  dateLabel?: string;
  infoRight?: string;
  sections?: LegalSection[];
  callouts?: { heading?: string; content?: string; variant?: string }[];
}

export interface DownloadsHeroContent {
  title?: string;
  description?: string;
}

export interface FooterCopyrightContent {
  companyName?: string;
  links?: { label: string; href: string }[];
}

export interface AboutSectionsContent {
  historyTitle?: string;
  leadershipTitle?: string;
  leadershipDescription?: string;
}

export interface QuoteLabelsContent {
  importExport?: string;
  supplyChain?: string;
  partnerships?: string;
  requestQuote?: string;
}

export interface TradeMainSection {
  id: string;
  badge: string;
  title: string;
  description: string;
  bulletItems: string[];
  link: string;
  image?: string;
}

export interface TradeMainContent {
  hero: { title: string; description: string; image?: string };
  sections: TradeMainSection[];
}

export interface ResourcesHeroContent {
  badge: string;
  title: string;
  description: string;
  image: string;
}

export interface TradeExpertiseIndustry {
  image: string;
  title: string;
  description: string;
}

export interface TradeExpertiseExtended {
  hero: { badge?: string; title: string; description: string; image?: string };
  section?: { title: string; description: string; items: string[] };
  services?: string[];
  industries?: TradeExpertiseIndustry[];
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

export interface QuoteRequest {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  productServiceInterest: string;
  quantity?: string | null;
  additionalDetails?: string | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export type QuoteRequestStatus = "pending" | "reviewing" | "quoted" | "rejected";

export interface CreateNewsDto {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  author?: string;
  category?: string;
  image?: string;
  content?: string;
}

export interface UpdateNewsDto {
  slug?: string;
  title?: string;
  excerpt?: string;
  date?: string;
  author?: string;
  category?: string;
  image?: string;
  content?: string;
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

  // Auth
  getMe: () => fetchApi<{ user: AuthUser }>("/auth/me"),
  login: (dto: LoginRequest) =>
    postApi<LoginResponse>("/auth/login", dto),
  logout: () =>
    postApi<{ message: string }>("/auth/logout", {}),
  refresh: () =>
    postApi<LoginResponse>("/auth/refresh", {}),
  forgotPassword: (email: string) =>
    postApi<{ message: string }>("/auth/forgot-password", { email }),
  resetPassword: (token: string, newPassword: string) =>
    postApi<{ message: string }>("/auth/reset-password", { token, newPassword }),

  // Admin - News (ADMIN + NEWS_MANAGER)
  adminNews: {
    list: () => fetchApi<NewsArticle[]>("/admin/news"),
    get: (id: number) => fetchApi<NewsArticle>(`/admin/news/${id}`),
    create: (dto: CreateNewsDto) => postApi<NewsArticle>("/admin/news", dto),
    update: (id: number, dto: UpdateNewsDto) =>
      patchApi<NewsArticle>(`/admin/news/${id}`, dto),
    delete: (id: number) => deleteApi(`/admin/news/${id}`),
  },

  // Admin - Orders (ADMIN only)
  adminOrders: {
    list: () => fetchApi<QuoteRequest[]>("/admin/orders"),
    updateStatus: (id: number, status: QuoteRequestStatus) =>
      patchApi<QuoteRequest>(`/admin/orders/${id}`, { status }),
  },

  // Admin - Content (ADMIN only)
  adminContent: {
    getAll: () => fetchApi<Record<string, unknown>>("/admin/content"),
    getByKey: (key: string) =>
      fetchApi<unknown>(`/admin/content/${encodeURIComponent(key)}`),
    set: (key: string, content: unknown) =>
      putApi<unknown>(`/admin/content/${encodeURIComponent(key)}`, { content }),
  },

  // Admin - Team (ADMIN only)
  adminTeam: {
    list: () => fetchApi<TeamMember[]>("/admin/team"),
    get: (id: number) => fetchApi<TeamMember>(`/admin/team/${id}`),
    create: (body: Record<string, unknown>) =>
      postApi<TeamMember>("/admin/team", body),
    update: (id: number, body: Record<string, unknown>) =>
      patchApi<TeamMember>(`/admin/team/${id}`, body),
    delete: (id: number) => deleteApi(`/admin/team/${id}`),
  },

  // Admin - Projects (ADMIN only)
  adminProjects: {
    list: () => fetchApi<Project[]>("/admin/projects"),
    get: (id: number) => fetchApi<Project>(`/admin/projects/${id}`),
    create: (body: Record<string, unknown>) =>
      postApi<Project>("/admin/projects", body),
    update: (id: number, body: Record<string, unknown>) =>
      patchApi<Project>(`/admin/projects/${id}`, body),
    delete: (id: number) => deleteApi(`/admin/projects/${id}`),
  },

  // Admin - Products (ADMIN only)
  adminProducts: {
    list: () => fetchApi<Product[]>("/admin/products"),
    get: (id: number) => fetchApi<Product>(`/admin/products/${id}`),
    create: (body: Record<string, unknown>) =>
      postApi<Product>("/admin/products", body),
    update: (id: number, body: Record<string, unknown>) =>
      patchApi<Product>(`/admin/products/${id}`, body),
    delete: (id: number) => deleteApi(`/admin/products/${id}`),
  },

  // Admin - Community Engagement (ADMIN only)
  adminEngagement: {
    list: () => fetchApi<EngagementPost[]>("/admin/community-engagement"),
    get: (id: number) =>
      fetchApi<EngagementPost>(`/admin/community-engagement/${id}`),
    create: (body: Record<string, unknown>) =>
      postApi<EngagementPost>("/admin/community-engagement", body),
    update: (id: number, body: Record<string, unknown>) =>
      patchApi<EngagementPost>(`/admin/community-engagement/${id}`, body),
    delete: (id: number) => deleteApi(`/admin/community-engagement/${id}`),
  },

  adminResources: {
    list: () => fetchApi<ResourceItem[]>("/admin/resources"),
    get: (id: number) => fetchApi<ResourceItem>(`/admin/resources/${id}`),
    create: (body: Record<string, unknown>) =>
      postApi<ResourceItem>("/admin/resources", body),
    update: (id: number, body: Record<string, unknown>) =>
      patchApi<ResourceItem>(`/admin/resources/${id}`, body),
    delete: (id: number) => deleteApi(`/admin/resources/${id}`),
  },
  uploads: {
    upload: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return fetchApi<{ url: string }>("/uploads", {
        method: "POST",
        body: formData,
        headers: {}, // Let fetch set the boundary and content-type
      });
    },
  },
};
