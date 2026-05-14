import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Pencil, Search, Home, Globe, Users, FileText, ShoppingBag, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Category = "all" | "main" | "solutions" | "user" | "legal";

interface PageEntry {
  key: string;
  name: string;
  route: string;
  category: Exclude<Category, "all">;
}

const ALL_PAGES: PageEntry[] = [
  // Main
  { key: "home", name: "Home", route: "/", category: "main" },
  { key: "about", name: "About", route: "/about", category: "main" },
  { key: "pricing", name: "Pricing", route: "/pricing", category: "main" },
  { key: "blog", name: "Blog", route: "/blog", category: "main" },
  { key: "contact", name: "Contact", route: "/contact", category: "main" },
  { key: "careers", name: "Careers", route: "/careers", category: "main" },
  { key: "solutions", name: "Solutions Overview", route: "/solutions", category: "main" },
  { key: "knowledgebase", name: "Knowledgebase", route: "/knowledgebase", category: "main" },
  { key: "quote", name: "Get a Quote", route: "/quote", category: "main" },
  // Legal
  { key: "privacy", name: "Privacy Policy", route: "/privacy", category: "legal" },
  { key: "terms", name: "Terms of Service", route: "/terms", category: "legal" },
  { key: "sla", name: "SLA Agreement", route: "/sla", category: "legal" },
  { key: "refund", name: "Refund Policy", route: "/refund", category: "legal" },
  // Solutions
  { key: "shared-hosting", name: "Shared Hosting", route: "/solutions/shared-hosting", category: "solutions" },
  { key: "vps-hosting", name: "VPS Hosting", route: "/solutions/vps-hosting", category: "solutions" },
  { key: "cloud-hosting", name: "Cloud Hosting", route: "/solutions/cloud-hosting", category: "solutions" },
  { key: "dedicated-servers", name: "Dedicated Servers", route: "/solutions/dedicated-servers", category: "solutions" },
  { key: "reseller-hosting", name: "Reseller Hosting", route: "/solutions/reseller-hosting", category: "solutions" },
  { key: "wordpress-hosting", name: "WordPress Hosting", route: "/solutions/wordpress-hosting", category: "solutions" },
  { key: "woocommerce-hosting", name: "WooCommerce Hosting", route: "/solutions/woocommerce-hosting", category: "solutions" },
  { key: "nodejs-hosting", name: "Node.js Hosting", route: "/solutions/nodejs-hosting", category: "solutions" },
  { key: "gpu-server", name: "GPU Dedicated Server", route: "/solutions/gpu-dedicated-server", category: "solutions" },
  { key: "streaming-servers", name: "Streaming Servers", route: "/solutions/streaming-servers", category: "solutions" },
  { key: "ssl-certificates", name: "SSL Certificates", route: "/solutions/ssl-certificates", category: "solutions" },
  { key: "domains", name: "Domain Registration", route: "/solutions/domains", category: "solutions" },
  { key: "server-management", name: "Server Management", route: "/solutions/server-management", category: "solutions" },
  { key: "cloud-migration", name: "Cloud Migration", route: "/solutions/cloud-migration", category: "solutions" },
  { key: "server-licenses", name: "Server Licenses", route: "/solutions/server-licenses", category: "solutions" },
  { key: "web-development", name: "Web Development", route: "/solutions/web-development", category: "solutions" },
  { key: "mobile-apps", name: "Mobile Apps", route: "/solutions/mobile-apps", category: "solutions" },
  { key: "ai-solutions", name: "AI Solutions", route: "/solutions/ai-solutions", category: "solutions" },
  { key: "odoo-solutions", name: "Odoo Solutions", route: "/solutions/odoo-solutions", category: "solutions" },
  { key: "email-security", name: "Email Security", route: "/solutions/email-security", category: "solutions" },
  { key: "n8n-hosting", name: "N8n Hosting", route: "/solutions/n8n-hosting", category: "solutions" },
  { key: "openclaw", name: "Open WebUI Hosting", route: "/solutions/openclaw", category: "solutions" },
  { key: "google-workspace", name: "Google Workspace", route: "/solutions/google-workspace", category: "solutions" },
  { key: "vps-server", name: "VPS Server", route: "/solutions/vps-server", category: "solutions" },
  // User
  { key: "login", name: "Login", route: "/login", category: "user" },
  { key: "dashboard", name: "User Dashboard", route: "/dashboard", category: "user" },
  { key: "cart", name: "Cart / Checkout", route: "/cart", category: "user" },
  { key: "free-trial", name: "Free Trial", route: "/free-trial", category: "user" },
  { key: "domain-transfer", name: "Domain Transfer", route: "/domain-transfer", category: "user" },
  { key: "domain-management", name: "Domain Management", route: "/domain-management", category: "user" },
  { key: "order-confirmation", name: "Order Confirmation", route: "/order-confirmation", category: "user" },
  { key: "live-chat", name: "Live Chat", route: "/live-chat", category: "user" },
];

const CATEGORY_META: Record<Exclude<Category, "all">, { label: string; icon: React.ElementType; color: string }> = {
  main: { label: "Main Pages", icon: Home, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  solutions: { label: "Solutions", icon: Globe, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  user: { label: "User Pages", icon: Users, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  legal: { label: "Legal", icon: Shield, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
};

const TABS: { key: Category; label: string }[] = [
  { key: "all", label: "All Pages" },
  { key: "main", label: "Main" },
  { key: "solutions", label: "Solutions" },
  { key: "user", label: "User" },
  { key: "legal", label: "Legal" },
];

const AdminPages = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filtered = ALL_PAGES.filter((p) => {
    const matchCategory = activeTab === "all" || p.category === activeTab;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.route.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const counts: Record<Category, number> = {
    all: ALL_PAGES.length,
    main: ALL_PAGES.filter((p) => p.category === "main").length,
    solutions: ALL_PAGES.filter((p) => p.category === "solutions").length,
    user: ALL_PAGES.filter((p) => p.category === "user").length,
    legal: ALL_PAGES.filter((p) => p.category === "legal").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">All Pages</h1>
        <p className="text-slate-400 text-sm mt-1">
          View and edit content for every page on the website ({ALL_PAGES.length} pages total)
        </p>
      </div>

      {/* Search + Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 h-9 text-sm"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border
                ${activeTab === tab.key
                  ? "bg-primary/20 text-primary border-primary/40"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white hover:border-slate-600"
                }`}
            >
              {tab.label}
              <span className="ml-1.5 opacity-60">{counts[tab.key]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-slate-500 text-sm text-center py-16">
            No pages found matching "{search}"
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider">Page</th>
                  <th className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider hidden sm:table-cell">URL</th>
                  <th className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-right text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((page) => {
                  const meta = CATEGORY_META[page.category];
                  return (
                    <tr
                      key={page.key}
                      className="border-b border-slate-800 last:border-0 hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-700/80 flex items-center justify-center flex-shrink-0">
                            <meta.icon className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <span className="text-white font-medium text-sm">{page.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        <span className="text-slate-400 font-mono text-xs">{page.route}</span>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${meta.color}`}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={page.route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-transparent hover:border-slate-600"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="hidden sm:inline">Preview</span>
                          </a>
                          <Link
                            to={`/admin/pages/edit/${page.key}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/20 transition-all border border-primary/30 hover:border-primary/50"
                          >
                            <Pencil className="w-3 h-3" />
                            <span className="hidden sm:inline">Edit</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-slate-600 text-xs">
        Edits are saved to Supabase and loaded by each page at runtime. Make sure the <code className="bg-slate-800 px-1 rounded text-slate-400">admin_settings</code> table migration has been run.
      </p>
    </div>
  );
};

export default AdminPages;
