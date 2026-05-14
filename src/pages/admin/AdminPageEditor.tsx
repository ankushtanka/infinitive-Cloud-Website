import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ExternalLink, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FieldDef {
  key: string;
  label: string;
  multiline?: boolean;
  type?: string;
  section?: string;
}

interface PageConfig {
  name: string;
  route: string;
  sections: { key: string; label: string; fields: FieldDef[] }[];
}

// --- Standard field groups ---
const SEO_FIELDS: FieldDef[] = [
  { key: "meta_title", label: "SEO Meta Title", section: "seo" },
  { key: "meta_description", label: "SEO Meta Description", multiline: true, section: "seo" },
  { key: "og_title", label: "OG / Social Title", section: "seo" },
  { key: "og_description", label: "OG / Social Description", multiline: true, section: "seo" },
];

const HERO_FIELDS: FieldDef[] = [
  { key: "hero_badge", label: "Hero Badge Text" },
  { key: "hero_heading", label: "Hero Main Heading" },
  { key: "hero_subtext", label: "Hero Subtext / Tagline", multiline: true },
  { key: "hero_cta_primary", label: "Primary CTA Button Text" },
  { key: "hero_cta_secondary", label: "Secondary CTA Button Text" },
];

const SOLUTION_SECTIONS = (name: string) => [
  {
    key: "hero", label: "Hero Section",
    fields: HERO_FIELDS,
  },
  {
    key: "features", label: "Features Section",
    fields: [
      { key: "features_title", label: "Section Title" },
      { key: "features_subtitle", label: "Section Subtitle", multiline: true },
    ],
  },
  {
    key: "pricing", label: "Pricing Section",
    fields: [
      { key: "pricing_title", label: "Section Title" },
      { key: "pricing_subtitle", label: "Section Subtitle", multiline: true },
    ],
  },
  {
    key: "faq", label: "FAQ Section",
    fields: [
      { key: "faq_title", label: "Section Title" },
      { key: "faq_subtitle", label: "Section Subtitle", multiline: true },
    ],
  },
  {
    key: "seo", label: "SEO / Meta Tags",
    fields: SEO_FIELDS,
  },
];

// --- Page configs ---
const PAGE_CONFIGS: Record<string, PageConfig> = {
  home: {
    name: "Home Page",
    route: "/",
    sections: [
      {
        key: "hero", label: "Hero Section",
        fields: [
          { key: "hero_badge", label: "Hero Badge Text" },
          { key: "hero_heading", label: "Hero Main Heading" },
          { key: "hero_subtext", label: "Hero Subtext", multiline: true },
          { key: "hero_cta_primary", label: "Primary CTA Button" },
          { key: "hero_cta_secondary", label: "Secondary CTA Button" },
          { key: "announcement_text", label: "Announcement Banner Text" },
          { key: "announcement_enabled", label: "Announcement Enabled (true/false)" },
        ],
      },
      {
        key: "domain", label: "Domain Search Section",
        fields: [
          { key: "domain_title", label: "Section Title" },
          { key: "domain_subtitle", label: "Section Subtitle", multiline: true },
          { key: "domain_placeholder", label: "Search Input Placeholder" },
        ],
      },
      {
        key: "features", label: "Features / Why Us Section",
        fields: [
          { key: "features_title", label: "Section Title" },
          { key: "features_subtitle", label: "Section Subtitle", multiline: true },
        ],
      },
      {
        key: "testimonials", label: "Testimonials Section",
        fields: [
          { key: "testimonials_title", label: "Section Title" },
          { key: "testimonials_subtitle", label: "Section Subtitle", multiline: true },
        ],
      },
      {
        key: "faq", label: "FAQ Section",
        fields: [
          { key: "faq_title", label: "Section Title" },
          { key: "faq_subtitle", label: "Section Subtitle", multiline: true },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  about: {
    name: "About Page",
    route: "/about",
    sections: [
      {
        key: "hero", label: "Hero Section",
        fields: HERO_FIELDS,
      },
      {
        key: "mission", label: "Mission & Vision",
        fields: [
          { key: "mission_title", label: "Mission Title" },
          { key: "mission_text", label: "Mission Text", multiline: true },
          { key: "vision_title", label: "Vision Title" },
          { key: "vision_text", label: "Vision Text", multiline: true },
          { key: "values_title", label: "Values Section Title" },
          { key: "values_subtitle", label: "Values Section Subtitle", multiline: true },
        ],
      },
      {
        key: "team", label: "Team Section",
        fields: [
          { key: "team_title", label: "Team Section Title" },
          { key: "team_subtitle", label: "Team Section Subtitle", multiline: true },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  pricing: {
    name: "Pricing Page",
    route: "/pricing",
    sections: [
      {
        key: "hero", label: "Hero Section",
        fields: HERO_FIELDS,
      },
      {
        key: "sections", label: "Pricing Sections",
        fields: [
          { key: "web_hosting_title", label: "Web Hosting Tab Label" },
          { key: "vps_title", label: "VPS Hosting Tab Label" },
          { key: "cloud_title", label: "Cloud Tab Label" },
          { key: "dedicated_title", label: "Dedicated Servers Tab Label" },
          { key: "domains_title", label: "Domains Tab Label" },
          { key: "pricing_note", label: "Pricing Note / Disclaimer", multiline: true },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  contact: {
    name: "Contact Page",
    route: "/contact",
    sections: [
      {
        key: "hero", label: "Page Header",
        fields: [
          { key: "hero_heading", label: "Page Heading" },
          { key: "hero_subtext", label: "Page Subtext", multiline: true },
        ],
      },
      {
        key: "info", label: "Contact Information",
        fields: [
          { key: "email", label: "Support Email", type: "email" },
          { key: "phone", label: "Phone Number" },
          { key: "whatsapp", label: "WhatsApp Number" },
          { key: "address", label: "Office Address", multiline: true },
          { key: "hours", label: "Business Hours" },
        ],
      },
      {
        key: "form", label: "Contact Form",
        fields: [
          { key: "form_title", label: "Form Section Title" },
          { key: "form_subtitle", label: "Form Section Subtitle", multiline: true },
          { key: "form_success_message", label: "Success Message After Submit", multiline: true },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  blog: {
    name: "Blog Page",
    route: "/blog",
    sections: [
      {
        key: "hero", label: "Blog Header",
        fields: [
          { key: "hero_heading", label: "Blog Page Title" },
          { key: "hero_subtext", label: "Blog Page Subtitle", multiline: true },
          { key: "hero_cta_primary", label: "CTA Button Text" },
        ],
      },
      {
        key: "categories", label: "Category Labels",
        fields: [
          { key: "cat_all", label: "All Posts Label" },
          { key: "cat_cloud", label: "Cloud Category Label" },
          { key: "cat_hosting", label: "Hosting Category Label" },
          { key: "cat_dev", label: "Development Category Label" },
          { key: "cat_ai", label: "AI Category Label" },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  careers: {
    name: "Careers Page",
    route: "/careers",
    sections: [
      {
        key: "hero", label: "Hero Section",
        fields: [
          { key: "hero_heading", label: "Page Heading" },
          { key: "hero_subtext", label: "Page Subtext", multiline: true },
          { key: "hero_cta_primary", label: "Apply CTA Button Text" },
        ],
      },
      {
        key: "perks", label: "Perks & Benefits",
        fields: [
          { key: "perks_title", label: "Section Title" },
          { key: "perks_subtitle", label: "Section Subtitle", multiline: true },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  solutions: {
    name: "Solutions Overview",
    route: "/solutions",
    sections: [
      {
        key: "hero", label: "Hero Section",
        fields: HERO_FIELDS,
      },
      {
        key: "categories", label: "Category Descriptions",
        fields: [
          { key: "hosting_title", label: "Hosting Category Title" },
          { key: "hosting_desc", label: "Hosting Category Description", multiline: true },
          { key: "cloud_title", label: "Cloud Category Title" },
          { key: "cloud_desc", label: "Cloud Category Description", multiline: true },
          { key: "dev_title", label: "Development Category Title" },
          { key: "dev_desc", label: "Development Category Description", multiline: true },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  knowledgebase: {
    name: "Knowledgebase",
    route: "/knowledgebase",
    sections: [
      {
        key: "hero", label: "Hero Section",
        fields: [
          { key: "hero_heading", label: "Page Heading" },
          { key: "hero_subtext", label: "Page Subtext", multiline: true },
          { key: "search_placeholder", label: "Search Placeholder" },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  quote: {
    name: "Get a Quote",
    route: "/quote",
    sections: [
      {
        key: "hero", label: "Hero Section",
        fields: [
          { key: "hero_heading", label: "Page Heading" },
          { key: "hero_subtext", label: "Page Subtext", multiline: true },
        ],
      },
      {
        key: "form", label: "Quote Form",
        fields: [
          { key: "form_title", label: "Form Title" },
          { key: "form_note", label: "Form Note / Instructions", multiline: true },
          { key: "submit_button", label: "Submit Button Text" },
          { key: "success_message", label: "Success Message", multiline: true },
        ],
      },
      {
        key: "seo", label: "SEO / Meta Tags",
        fields: SEO_FIELDS,
      },
    ],
  },
  privacy: {
    name: "Privacy Policy",
    route: "/privacy",
    sections: [
      {
        key: "content", label: "Page Content",
        fields: [
          { key: "page_title", label: "Page Title" },
          { key: "last_updated", label: "Last Updated Date" },
          { key: "intro", label: "Introduction Paragraph", multiline: true },
          { key: "data_collection_title", label: "Data Collection Section Title" },
          { key: "data_collection_text", label: "Data Collection Text", multiline: true },
          { key: "cookies_title", label: "Cookies Section Title" },
          { key: "cookies_text", label: "Cookies Text", multiline: true },
          { key: "contact_section", label: "Contact Us Section Text", multiline: true },
        ],
      },
      { key: "seo", label: "SEO / Meta Tags", fields: SEO_FIELDS },
    ],
  },
  terms: {
    name: "Terms of Service",
    route: "/terms",
    sections: [
      {
        key: "content", label: "Page Content",
        fields: [
          { key: "page_title", label: "Page Title" },
          { key: "last_updated", label: "Last Updated Date" },
          { key: "intro", label: "Introduction Paragraph", multiline: true },
          { key: "usage_title", label: "Acceptable Use Title" },
          { key: "usage_text", label: "Acceptable Use Text", multiline: true },
          { key: "liability_title", label: "Liability Section Title" },
          { key: "liability_text", label: "Liability Text", multiline: true },
        ],
      },
      { key: "seo", label: "SEO / Meta Tags", fields: SEO_FIELDS },
    ],
  },
  sla: {
    name: "SLA Agreement",
    route: "/sla",
    sections: [
      {
        key: "content", label: "Page Content",
        fields: [
          { key: "page_title", label: "Page Title" },
          { key: "uptime_guarantee", label: "Uptime Guarantee %" },
          { key: "last_updated", label: "Last Updated Date" },
          { key: "intro", label: "Introduction", multiline: true },
          { key: "compensation_text", label: "Compensation / Credits Policy", multiline: true },
        ],
      },
      { key: "seo", label: "SEO / Meta Tags", fields: SEO_FIELDS },
    ],
  },
  refund: {
    name: "Refund Policy",
    route: "/refund",
    sections: [
      {
        key: "content", label: "Page Content",
        fields: [
          { key: "page_title", label: "Page Title" },
          { key: "last_updated", label: "Last Updated Date" },
          { key: "intro", label: "Introduction Paragraph", multiline: true },
          { key: "money_back_days", label: "Money Back Guarantee Days" },
          { key: "eligible_text", label: "Eligible Services Text", multiline: true },
          { key: "non_refundable_text", label: "Non-Refundable Items Text", multiline: true },
          { key: "process_text", label: "Refund Process Text", multiline: true },
        ],
      },
      { key: "seo", label: "SEO / Meta Tags", fields: SEO_FIELDS },
    ],
  },
};

// Generic solution page config
const SOLUTION_PAGE_ROUTES: Record<string, { name: string; route: string }> = {
  "shared-hosting": { name: "Shared Hosting", route: "/solutions/shared-hosting" },
  "vps-hosting": { name: "VPS Hosting", route: "/solutions/vps-hosting" },
  "cloud-hosting": { name: "Cloud Hosting", route: "/solutions/cloud-hosting" },
  "dedicated-servers": { name: "Dedicated Servers", route: "/solutions/dedicated-servers" },
  "reseller-hosting": { name: "Reseller Hosting", route: "/solutions/reseller-hosting" },
  "wordpress-hosting": { name: "WordPress Hosting", route: "/solutions/wordpress-hosting" },
  "woocommerce-hosting": { name: "WooCommerce Hosting", route: "/solutions/woocommerce-hosting" },
  "nodejs-hosting": { name: "Node.js Hosting", route: "/solutions/nodejs-hosting" },
  "gpu-server": { name: "GPU Dedicated Server", route: "/solutions/gpu-dedicated-server" },
  "streaming-servers": { name: "Streaming Servers", route: "/solutions/streaming-servers" },
  "ssl-certificates": { name: "SSL Certificates", route: "/solutions/ssl-certificates" },
  "domains": { name: "Domain Registration", route: "/solutions/domains" },
  "server-management": { name: "Server Management", route: "/solutions/server-management" },
  "cloud-migration": { name: "Cloud Migration", route: "/solutions/cloud-migration" },
  "server-licenses": { name: "Server Licenses", route: "/solutions/server-licenses" },
  "web-development": { name: "Web Development", route: "/solutions/web-development" },
  "mobile-apps": { name: "Mobile Apps", route: "/solutions/mobile-apps" },
  "ai-solutions": { name: "AI Solutions", route: "/solutions/ai-solutions" },
  "odoo-solutions": { name: "Odoo Solutions", route: "/solutions/odoo-solutions" },
  "email-security": { name: "Email Security", route: "/solutions/email-security" },
  "n8n-hosting": { name: "N8n Hosting", route: "/solutions/n8n-hosting" },
  "openclaw": { name: "Open WebUI Hosting", route: "/solutions/openclaw" },
  "google-workspace": { name: "Google Workspace", route: "/solutions/google-workspace" },
  "vps-server": { name: "VPS Server", route: "/solutions/vps-server" },
};

const USER_PAGE_ROUTES: Record<string, { name: string; route: string }> = {
  login: { name: "Login Page", route: "/login" },
  dashboard: { name: "User Dashboard", route: "/dashboard" },
  cart: { name: "Cart / Checkout", route: "/cart" },
  "free-trial": { name: "Free Trial", route: "/free-trial" },
  "domain-transfer": { name: "Domain Transfer", route: "/domain-transfer" },
  "domain-management": { name: "Domain Management", route: "/domain-management" },
  "order-confirmation": { name: "Order Confirmation", route: "/order-confirmation" },
  "live-chat": { name: "Live Chat", route: "/live-chat" },
};

function getConfig(pageKey: string): PageConfig {
  if (PAGE_CONFIGS[pageKey]) return PAGE_CONFIGS[pageKey];
  if (SOLUTION_PAGE_ROUTES[pageKey]) {
    const info = SOLUTION_PAGE_ROUTES[pageKey];
    return { name: info.name, route: info.route, sections: SOLUTION_SECTIONS(info.name) };
  }
  if (USER_PAGE_ROUTES[pageKey]) {
    const info = USER_PAGE_ROUTES[pageKey];
    return {
      name: info.name,
      route: info.route,
      sections: [
        { key: "hero", label: "Page Header", fields: HERO_FIELDS },
        { key: "seo", label: "SEO / Meta Tags", fields: SEO_FIELDS },
      ],
    };
  }
  return {
    name: pageKey,
    route: "/",
    sections: [
      { key: "hero", label: "Page Content", fields: HERO_FIELDS },
      { key: "seo", label: "SEO / Meta Tags", fields: SEO_FIELDS },
    ],
  };
}

const AdminPageEditor = () => {
  const { pageKey = "" } = useParams<{ pageKey: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const config = getConfig(pageKey);
  const supabaseKey = `page_content_${pageKey}`;

  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState(config.sections[0]?.key ?? "");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await (supabase as any)
          .from("admin_settings")
          .select("value")
          .eq("key", supabaseKey)
          .maybeSingle();
        if (data?.value) setContent(data.value as Record<string, string>);
      } catch { /* table might not exist yet */ }
      setLoading(false);
    })();
  }, [supabaseKey]);

  const update = (field: string) => (value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from("admin_settings")
        .upsert({ key: supabaseKey, value: content, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) throw error;
      setSaved(true);
      toast({ title: "Saved!", description: `${config.name} content updated.` });
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err?.message?.includes("relation")
          ? "Run the admin_settings migration in Supabase first."
          : err?.message ?? "Unknown error",
        variant: "destructive",
      });
    }
    setSaving(false);
  };

  const currentSection = config.sections.find((s) => s.key === activeSection);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/pages")}
            className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white">{config.name}</h1>
            <a
              href={config.route}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 text-xs hover:text-primary flex items-center gap-1 mt-0.5 transition-colors"
            >
              <span className="font-mono">{config.route}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={config.route}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Preview
          </a>
          <Button
            onClick={handleSave}
            disabled={saving || loading}
            className="btn-gradient font-bold h-9 text-sm"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : saved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Info banner */}
      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="p-3 flex gap-2.5">
          <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-300 text-xs leading-relaxed">
            Content is saved to Supabase under the key <code className="bg-slate-800 px-1 rounded">{supabaseKey}</code>. Each page must be updated to read from Supabase to reflect changes live.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        {/* Section sidebar */}
        <div className="hidden md:flex flex-col gap-1 w-48 flex-shrink-0">
          {config.sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all
                ${activeSection === s.key
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
            >
              <span className="truncate">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile section tabs */}
        <div className="flex md:hidden gap-2 flex-wrap w-full">
          {config.sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border
                ${activeSection === s.key
                  ? "bg-primary/20 text-primary border-primary/40"
                  : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="pb-2 pt-5 px-5">
                <CardTitle className="text-white text-base">{currentSection?.label}</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                {currentSection?.fields.map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <Label className="text-slate-300 text-xs font-medium">{field.label}</Label>
                    {field.multiline ? (
                      <Textarea
                        value={content[field.key] ?? ""}
                        onChange={(e) => update(field.key)(e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}…`}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 resize-none min-h-[80px] text-sm"
                      />
                    ) : (
                      <Input
                        type={field.type ?? "text"}
                        value={content[field.key] ?? ""}
                        onChange={(e) => update(field.key)(e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}…`}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 h-9 text-sm"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPageEditor;
