import { useEffect, useState, useCallback } from "react";
import { apiFetchContent, apiSaveContent } from "@/lib/api";
import { useAdmin } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Search, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ── Field & page definitions ──────────────────────────────────────────────────

type FieldType = "text" | "textarea" | "toggle";
interface FieldDef { key: string; label: string; type: FieldType; }
interface PageDef  { key: string; label: string; group: string; fields: FieldDef[]; }

const seo   = (): FieldDef[] => [
  { key: "meta_title",       label: "Meta Title",          type: "text"     },
  { key: "meta_description", label: "Meta Description",    type: "textarea" },
  { key: "og_title",         label: "OG / Social Title",   type: "text"     },
  { key: "og_description",   label: "OG / Social Desc",    type: "textarea" },
];
const hero  = (): FieldDef[] => [
  { key: "hero_heading", label: "Hero Heading", type: "text"     },
  { key: "hero_subtext", label: "Hero Subtext", type: "textarea" },
];

const PAGES: PageDef[] = [
  // ── Main pages ──
  {
    key: "home", label: "Homepage", group: "Main Pages",
    fields: [
      ...seo(),
      ...hero(),
      { key: "hero_cta_primary",      label: "CTA Primary Button",    type: "text"     },
      { key: "hero_cta_secondary",    label: "CTA Secondary Button",  type: "text"     },
      { key: "announcement_enabled",  label: "Announcement Banner",   type: "toggle"   },
      { key: "announcement_text",     label: "Announcement Text",     type: "text"     },
      { key: "domain_title",          label: "Domain Section Title",  type: "text"     },
      { key: "domain_subtitle",       label: "Domain Section Subtitle", type: "textarea"},
      { key: "testimonials_title",    label: "Testimonials Title",    type: "text"     },
      { key: "testimonials_subtitle", label: "Testimonials Subtitle", type: "text"     },
      { key: "faq_title",             label: "FAQ Title",             type: "text"     },
      { key: "faq_subtitle",          label: "FAQ Subtitle",          type: "text"     },
    ],
  },
  {
    key: "about", label: "About", group: "Main Pages",
    fields: [
      ...seo(), ...hero(),
      { key: "mission_title", label: "Mission Title",  type: "text"     },
      { key: "mission_text",  label: "Mission Text",   type: "textarea" },
      { key: "vision_title",  label: "Vision Title",   type: "text"     },
      { key: "vision_text",   label: "Vision Text",    type: "textarea" },
      { key: "values_title",  label: "Values Title",   type: "text"     },
    ],
  },
  {
    key: "pricing", label: "Pricing", group: "Main Pages",
    fields: [...seo(), ...hero()],
  },
  {
    key: "contact", label: "Contact", group: "Main Pages",
    fields: [
      ...seo(), ...hero(),
      { key: "form_title",    label: "Form Title",    type: "text" },
      { key: "form_subtitle", label: "Form Subtitle", type: "text" },
    ],
  },
  {
    key: "careers", label: "Careers", group: "Main Pages",
    fields: [
      ...seo(), ...hero(),
      { key: "perks_title", label: "Perks Section Title", type: "text" },
    ],
  },
  {
    key: "blog",          label: "Blog",          group: "Main Pages", fields: [...seo(), ...hero()],
  },
  {
    key: "solutions",     label: "Solutions",     group: "Main Pages", fields: [...seo(), ...hero()],
  },
  {
    key: "knowledgebase", label: "Knowledgebase", group: "Main Pages",
    fields: [
      ...seo(), ...hero(),
      { key: "search_placeholder", label: "Search Placeholder", type: "text" },
    ],
  },
  {
    key: "quote", label: "Get a Quote", group: "Main Pages", fields: [...seo(), ...hero()],
  },
  // ── Legal pages ──
  {
    key: "privacy", label: "Privacy Policy", group: "Legal Pages",
    fields: [
      ...seo(),
      { key: "page_title",           label: "Page Title",            type: "text"     },
      { key: "last_updated",         label: "Last Updated",          type: "text"     },
      { key: "intro",                label: "Introduction",          type: "textarea" },
      { key: "data_collection_title",label: "Data Collection Title", type: "text"     },
    ],
  },
  {
    key: "terms", label: "Terms of Service", group: "Legal Pages",
    fields: [
      ...seo(),
      { key: "page_title",   label: "Page Title",   type: "text"     },
      { key: "last_updated", label: "Last Updated", type: "text"     },
      { key: "intro",        label: "Introduction", type: "textarea" },
      { key: "usage_title",  label: "Usage Title",  type: "text"     },
    ],
  },
  {
    key: "sla", label: "SLA", group: "Legal Pages",
    fields: [
      ...seo(),
      { key: "page_title",        label: "Page Title",        type: "text"     },
      { key: "last_updated",      label: "Last Updated",      type: "text"     },
      { key: "intro",             label: "Introduction",      type: "textarea" },
      { key: "uptime_guarantee",  label: "Uptime Guarantee",  type: "text"     },
    ],
  },
  {
    key: "refund", label: "Refund Policy", group: "Legal Pages",
    fields: [
      ...seo(),
      { key: "page_title",   label: "Page Title",   type: "text"     },
      { key: "last_updated", label: "Last Updated", type: "text"     },
      { key: "intro",        label: "Introduction", type: "textarea" },
    ],
  },
  // ── Hosting pages ──
  {
    key: "shared-hosting",    label: "Shared Hosting",    group: "Hosting",
    fields: [
      ...seo(), ...hero(),
      { key: "features_title",    label: "Features Title",    type: "text" },
      { key: "features_subtitle", label: "Features Subtitle", type: "text" },
    ],
  },
  { key: "vps-hosting",        label: "VPS Hosting",        group: "Hosting", fields: [...seo(), ...hero()] },
  { key: "cloud-hosting",      label: "Cloud Hosting",      group: "Hosting", fields: [...seo(), ...hero()] },
  { key: "reseller-hosting",   label: "Reseller Hosting",   group: "Hosting", fields: [...seo(), ...hero()] },
  { key: "wordpress-hosting",  label: "WordPress Hosting",  group: "Hosting", fields: [...seo(), ...hero()] },
  { key: "woocommerce-hosting",label: "WooCommerce Hosting",group: "Hosting", fields: [...seo(), ...hero()] },
  { key: "nodejs-hosting",     label: "Node.js Hosting",    group: "Hosting", fields: seo() },
  { key: "n8n-hosting",        label: "n8n Hosting",        group: "Hosting", fields: seo() },
  { key: "openclaw",           label: "Openclaw",           group: "Hosting", fields: seo() },
  // ── Servers ──
  {
    key: "dedicated-servers", label: "Dedicated Servers", group: "Servers",
    fields: [
      ...seo(), ...hero(),
      { key: "features_title", label: "Features Title", type: "text" },
    ],
  },
  { key: "vps-server",        label: "VPS Server",        group: "Servers", fields: seo() },
  { key: "gpu-server",        label: "GPU Server",        group: "Servers", fields: [...seo(), { key: "hero_heading", label: "Hero Heading", type: "text" }] },
  { key: "streaming-servers", label: "Streaming Servers", group: "Servers", fields: [...seo(), ...hero()] },
  { key: "server-management", label: "Server Management", group: "Servers", fields: [...seo(), { key: "hero_heading", label: "Hero Heading", type: "text" }] },
  { key: "server-licenses",   label: "Server Licenses",   group: "Servers", fields: [...seo(), ...hero()] },
  // ── Domains & Security ──
  { key: "domains",         label: "Domains",           group: "Domains & Security", fields: [...seo(), ...hero()] },
  { key: "ssl-certificates",label: "SSL Certificates",  group: "Domains & Security", fields: [...seo(), ...hero()] },
  { key: "email-security",  label: "Email Security",    group: "Domains & Security", fields: [...seo(), ...hero()] },
  { key: "google-workspace",label: "Google Workspace",  group: "Domains & Security", fields: seo() },
  // ── Cloud & Dev ──
  { key: "cloud-migration", label: "Cloud Migration",   group: "Cloud & Dev", fields: [...seo(), ...hero()] },
  { key: "web-development", label: "Web Development",   group: "Cloud & Dev", fields: [...seo(), ...hero()] },
  { key: "mobile-apps",     label: "Mobile Apps",       group: "Cloud & Dev", fields: [...seo(), ...hero()] },
  { key: "ai-solutions",    label: "AI Solutions",      group: "Cloud & Dev", fields: [...seo(), ...hero()] },
  { key: "odoo-solutions",  label: "Odoo Solutions",    group: "Cloud & Dev", fields: [...seo(), ...hero()] },
];

const GROUPS = Array.from(new Set(PAGES.map((p) => p.group)));

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldRow({
  def, value, onChange,
}: { def: FieldDef; value: string; onChange: (v: string) => void }) {
  if (def.type === "toggle") {
    const enabled = value === "true";
    return (
      <div className="flex items-center justify-between py-1">
        <Label className="text-slate-300 text-xs font-medium">{def.label}</Label>
        <button
          type="button"
          onClick={() => onChange(enabled ? "false" : "true")}
          className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-slate-600"}`}
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-0.5 ${enabled ? "translate-x-4" : "translate-x-0.5"}`} />
        </button>
      </div>
    );
  }
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-xs font-medium">{def.label}</Label>
      {def.type === "textarea" ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white text-sm resize-none min-h-[72px]"
          placeholder={`Enter ${def.label.toLowerCase()}…`}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm"
          placeholder={`Enter ${def.label.toLowerCase()}…`}
        />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AdminContent() {
  const { token } = useAdmin();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [selectedKey, setSelectedKey] = useState("home");
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedPage = PAGES.find((p) => p.key === selectedKey)!;

  // Load content whenever selected page changes
  useEffect(() => {
    setLoading(true);
    apiFetchContent(selectedKey)
      .then((data) => setContent(data ?? {}))
      .catch(() => setContent({}))
      .finally(() => setLoading(false));
  }, [selectedKey]);

  const updateField = useCallback((key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      await apiSaveContent(selectedKey, content, token);
      toast({ title: `"${selectedPage.label}" saved!` });
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const filteredPages = PAGES.filter((p) =>
    p.label.toLowerCase().includes(search.toLowerCase()) ||
    p.key.toLowerCase().includes(search.toLowerCase())
  );
  const filteredGroups = GROUPS.filter((g) => filteredPages.some((p) => p.group === g));

  return (
    <div className="flex gap-0 h-full min-h-[calc(100vh-8rem)]">
      {/* ── Sidebar ── */}
      <aside className="w-56 flex-shrink-0 border-r border-slate-700 flex flex-col">
        <div className="p-3 border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages…"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {filteredGroups.map((group) => (
            <div key={group} className="mb-1">
              <p className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">{group}</p>
              {filteredPages.filter((p) => p.group === group).map((page) => (
                <button
                  key={page.key}
                  onClick={() => setSelectedKey(page.key)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                    selectedKey === page.key
                      ? "bg-primary/15 text-primary border-r-2 border-primary"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {page.label}
                  {selectedKey === page.key && <ChevronRight className="w-3 h-3" />}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Editor panel ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 flex-shrink-0">
          <div>
            <h2 className="text-white font-bold text-base">{selectedPage.label}</h2>
            <p className="text-slate-500 text-xs mt-0.5 font-mono">pageKey: {selectedKey}</p>
          </div>
          <Button onClick={handleSave} disabled={saving || loading} className="btn-gradient font-bold h-9 text-sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="max-w-2xl space-y-5">
              {selectedPage.fields.map((field) => (
                <FieldRow
                  key={field.key}
                  def={field}
                  value={content[field.key] ?? ""}
                  onChange={(v) => updateField(field.key, v)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
