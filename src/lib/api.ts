const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") || "http://localhost:3001";

// ── Auth ──────────────────────────────────────────────────────────────────────
export async function apiLogin(id: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return (await res.json() as { token: string }).token;
}

// ── Content (existing pages) ──────────────────────────────────────────────────
export async function apiFetchContent(pageKey: string): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${BASE}/api/content/${pageKey}`);
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export async function apiSaveContent(
  pageKey: string,
  content: Record<string, string>,
  token: string,
): Promise<void> {
  const res = await fetch(`${BASE}/api/content/${pageKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(content),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" })) as { error: string };
    throw new Error(err.error || "Failed to save");
  }
}

export async function apiResetContent(pageKey: string, token: string): Promise<void> {
  const res = await fetch(`${BASE}/api/content/${pageKey}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to reset");
}

// ── Pages (CMS) ───────────────────────────────────────────────────────────────
export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  scheduledAt: string | null;
  template: string;
  sections: CMSSection[];
  seo: CMSSeo;
  createdAt: string;
  updatedAt: string;
}

export interface CMSSection {
  id: string;
  type: "hero" | "cta" | "services" | "testimonials" | "pricing" | "faq" | "stats" | "text" | "custom";
  order: number;
  visible: boolean;
  data: Record<string, unknown>;
}

export interface CMSSeo {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  canonical?: string;
}

export async function apiGetPageBySlug(slug: string): Promise<CMSPage> {
  const res = await fetch(`${BASE}/api/pages/slug/${slug}`);
  if (!res.ok) throw new Error("Page not found");
  return res.json();
}

export async function apiGetAllPages(token: string): Promise<CMSPage[]> {
  const res = await fetch(`${BASE}/api/pages/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch pages");
  return res.json();
}

export async function apiGetPage(id: string, token: string): Promise<CMSPage> {
  const res = await fetch(`${BASE}/api/pages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Page not found");
  return res.json();
}

export async function apiCreatePage(data: Partial<CMSPage>, token: string): Promise<CMSPage> {
  const res = await fetch(`${BASE}/api/pages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" })) as { error: string };
    throw new Error(err.error);
  }
  return res.json();
}

export async function apiUpdatePage(id: string, data: Partial<CMSPage>, token: string): Promise<CMSPage> {
  const res = await fetch(`${BASE}/api/pages/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update page");
  return res.json();
}

export async function apiUpdatePageSections(id: string, sections: CMSSection[], token: string): Promise<CMSPage> {
  const res = await fetch(`${BASE}/api/pages/${id}/sections`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ sections }),
  });
  if (!res.ok) throw new Error("Failed to save sections");
  return res.json();
}

export async function apiSetPageStatus(id: string, status: "draft" | "published", token: string): Promise<CMSPage> {
  const res = await fetch(`${BASE}/api/pages/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export async function apiDuplicatePage(id: string, token: string): Promise<CMSPage> {
  const res = await fetch(`${BASE}/api/pages/${id}/duplicate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to duplicate page");
  return res.json();
}

export async function apiDeletePage(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE}/api/pages/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete page");
}

// ── Blogs ─────────────────────────────────────────────────────────────────────
export interface CMSBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  status: "draft" | "published";
  scheduledAt: string | null;
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  seo: CMSSeo;
  createdAt: string;
  updatedAt: string;
}

export async function apiGetAllBlogs(token: string): Promise<CMSBlog[]> {
  const res = await fetch(`${BASE}/api/blogs/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function apiGetBlog(id: string, token: string): Promise<CMSBlog> {
  const res = await fetch(`${BASE}/api/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}

export async function apiCreateBlog(data: Partial<CMSBlog>, token: string): Promise<CMSBlog> {
  const res = await fetch(`${BASE}/api/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" })) as { error: string };
    throw new Error(err.error);
  }
  return res.json();
}

export async function apiUpdateBlog(id: string, data: Partial<CMSBlog>, token: string): Promise<CMSBlog> {
  const res = await fetch(`${BASE}/api/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update blog");
  return res.json();
}

export async function apiSetBlogStatus(id: string, status: "draft" | "published", token: string): Promise<CMSBlog> {
  const res = await fetch(`${BASE}/api/blogs/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export async function apiDeleteBlog(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE}/api/blogs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete blog");
}

// ── Menus ─────────────────────────────────────────────────────────────────────
export interface CMSMenuItem {
  id: string;
  label: string;
  url: string;
  target: "_self" | "_blank";
  children: CMSMenuItem[];
}

export interface CMSMenu {
  id: string;
  name: string;
  location: "header" | "footer" | "mega";
  items: CMSMenuItem[];
  updatedAt: string;
}

export async function apiGetAllMenus(token: string): Promise<CMSMenu[]> {
  const res = await fetch(`${BASE}/api/menus`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch menus");
  return res.json();
}

export async function apiSaveMenu(menu: CMSMenu, token: string): Promise<CMSMenu> {
  const method = menu.id ? "PUT" : "POST";
  const url = menu.id ? `${BASE}/api/menus/${menu.id}` : `${BASE}/api/menus`;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(menu),
  });
  if (!res.ok) throw new Error("Failed to save menu");
  return res.json();
}

export async function apiDeleteMenu(id: string, token: string): Promise<void> {
  const res = await fetch(`${BASE}/api/menus/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete menu");
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export interface SEOGlobal {
  siteTitle: string; titleSeparator: string; defaultDescription: string;
  defaultKeywords: string; googleAnalyticsId: string; googleSearchConsoleId: string;
  bingVerification: string; canonicalBase: string;
}

export interface SEOSchemaOrg {
  name: string; url: string; logo: string; description: string;
  email: string; phone: string; address: string; sameAs: string[];
}
export interface SEOSchemas {
  organization: SEOSchemaOrg;
  faqs: { question: string; answer: string }[];
  products: { name: string; description: string; price: string; currency: string }[];
  blogs: { name: string; description: string; url: string }[];
  reviews: { author: string; rating: number; text: string; itemName: string }[];
}
export interface SEOMonitorResult {
  score: number;
  missingMeta: { page: string; missing: string[] }[];
  duplicateTitles: { title: string; pages: string[] }[];
  noIndexPages: string[];
  totalPages: number;
  totalIssues: number;
}

export async function apiGetSEOGlobal(): Promise<SEOGlobal> {
  return fetch(`${BASE}/api/seo/global`).then((r) => r.json());
}
export async function apiSaveSEOGlobal(data: SEOGlobal, token: string): Promise<SEOGlobal> {
  const res = await fetch(`${BASE}/api/seo/global`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save");
  return res.json();
}
export async function apiGetRobots(): Promise<string> {
  return fetch(`${BASE}/api/seo/robots`).then((r) => r.text());
}
export async function apiSaveRobots(content: string, token: string): Promise<void> {
  await fetch(`${BASE}/api/seo/robots`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content }),
  });
}
export interface SitemapResult { xml: string; stats: { total: number; staticPages: number; cmsPages: number; blogPages: number } }
export async function apiGetSitemap(): Promise<SitemapResult> {
  const res = await fetch(`${BASE}/api/seo/sitemap`, { headers: { Accept: "application/json" } });
  return res.json();
}
export async function apiGetSchemas(): Promise<SEOSchemas> {
  return fetch(`${BASE}/api/seo/schemas`).then((r) => r.json());
}
export async function apiSaveSchemas(data: SEOSchemas, token: string): Promise<SEOSchemas> {
  const res = await fetch(`${BASE}/api/seo/schemas`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save");
  return res.json();
}
export async function apiGetSEOMonitor(token: string): Promise<SEOMonitorResult> {
  const res = await fetch(`${BASE}/api/seo/monitor`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error("Failed to fetch monitor");
  return res.json();
}
