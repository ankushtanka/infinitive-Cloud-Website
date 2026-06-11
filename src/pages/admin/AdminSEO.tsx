import { useEffect, useState, useCallback } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import {
  apiGetSEOGlobal, apiSaveSEOGlobal,
  apiGetRobots, apiSaveRobots,
  apiGetSitemap, SitemapResult,
  apiGetSchemas, apiSaveSchemas,
  apiGetSEOMonitor,
  SEOGlobal, SEOSchemas, SEOMonitorResult,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2, Save, Globe, FileText, Map, Code2, BarChart3,
  CheckCircle2, AlertTriangle, XCircle, RefreshCw, Plus, Trash2,
  Copy, Check,
} from "lucide-react";

// ── Tab types ─────────────────────────────────────────────────────────────────
type Tab = "global" | "robots" | "sitemap" | "schema" | "monitor";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "global",  label: "Global SEO",  icon: Globe     },
  { id: "robots",  label: "Robots.txt",  icon: FileText  },
  { id: "sitemap", label: "Sitemap",     icon: Map       },
  { id: "schema",  label: "Schema",      icon: Code2     },
  { id: "monitor", label: "SEO Monitor", icon: BarChart3 },
];

// ── Field helper ──────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string; hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-300 text-xs font-medium">{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} className="bg-slate-700/50 border-slate-600 text-white text-sm resize-none min-h-[80px]" />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm" />
      )}
      {hint && <p className="text-slate-500 text-xs">{hint}</p>}
    </div>
  );
}

// ── Global SEO tab ────────────────────────────────────────────────────────────
function GlobalTab({ token }: { token: string }) {
  const { toast } = useToast();
  const [data, setData] = useState<SEOGlobal | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { apiGetSEOGlobal().then(setData); }, []);

  const up = (key: keyof SEOGlobal) => (v: string) =>
    setData((prev) => prev ? { ...prev, [key]: v } : prev);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    try { await apiSaveSEOGlobal(data, token); toast({ title: "Global SEO saved!" }); }
    catch { toast({ title: "Save failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  if (!data) return <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Global SEO Settings</h2>
          <p className="text-slate-400 text-xs mt-0.5">Default meta applied site-wide when page-level SEO is empty</p>
        </div>
        <Button onClick={save} disabled={saving} className="btn-gradient font-bold h-9">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Site Identity</p>
        <Field label="Site Title" value={data.siteTitle} onChange={up("siteTitle")} placeholder="Infinitive Cloud" hint="Used as the base for all page titles" />
        <Field label="Title Separator" value={data.titleSeparator} onChange={up("titleSeparator")} placeholder=" | " hint='e.g. " | " or " - " shown between page title and site title' />
        <Field label="Default Meta Description" value={data.defaultDescription} onChange={up("defaultDescription")} multiline placeholder="Premium cloud & web hosting solutions…" hint="Fallback for pages without a custom description" />
        <Field label="Default Keywords" value={data.defaultKeywords} onChange={up("defaultKeywords")} placeholder="cloud hosting, VPS, India" hint="Comma-separated keywords" />
        <Field label="Canonical Base URL" value={data.canonicalBase} onChange={up("canonicalBase")} placeholder="https://infinitivecloud.com" hint="Used for sitemap and canonical tags" />
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Verification & Analytics</p>
        <Field label="Google Analytics ID" value={data.googleAnalyticsId} onChange={up("googleAnalyticsId")} placeholder="G-XXXXXXXXXX" />
        <Field label="Google Search Console Verification" value={data.googleSearchConsoleId} onChange={up("googleSearchConsoleId")} placeholder="Verification meta content value" />
        <Field label="Bing Webmaster Verification" value={data.bingVerification} onChange={up("bingVerification")} placeholder="Bing verification content value" />
      </div>
    </div>
  );
}

// ── Robots.txt tab ────────────────────────────────────────────────────────────
function RobotsTab({ token }: { token: string }) {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetRobots().then((t) => { setContent(t); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    try { await apiSaveRobots(content, token); toast({ title: "Robots.txt saved!" }); }
    catch { toast({ title: "Save failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Robots.txt Editor</h2>
          <p className="text-slate-400 text-xs mt-0.5">Controls which pages search engines can crawl</p>
        </div>
        <Button onClick={save} disabled={saving} className="btn-gradient font-bold h-9">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 space-y-3">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Editor</p>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-slate-900 border-slate-600 text-green-400 font-mono text-sm min-h-[320px] resize-none"
            spellCheck={false}
          />
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 space-y-3">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Quick Templates</p>
          <div className="space-y-2">
            {[
              { label: "Allow All", content: "User-agent: *\nAllow: /\n\nSitemap: https://infinitivecloud.com/sitemap.xml" },
              { label: "Block All", content: "User-agent: *\nDisallow: /" },
              { label: "Block Admin + API", content: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: https://infinitivecloud.com/sitemap.xml" },
              { label: "Googlebot Only", content: "User-agent: Googlebot\nAllow: /\n\nUser-agent: *\nDisallow: /" },
            ].map((t) => (
              <button key={t.label} onClick={() => setContent(t.content)}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-primary/50 transition-all text-sm text-slate-300 hover:text-white">
                {t.label}
              </button>
            ))}
          </div>
          <div className="mt-4 bg-slate-900/50 rounded-xl p-3">
            <p className="text-slate-500 text-xs font-semibold mb-2">RULES GUIDE</p>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <p><span className="text-blue-400">User-agent: *</span> → all bots</p>
              <p><span className="text-green-400">Allow: /</span> → allow path</p>
              <p><span className="text-red-400">Disallow: /admin</span> → block path</p>
              <p><span className="text-yellow-400">Sitemap: url</span> → sitemap location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sitemap tab ───────────────────────────────────────────────────────────────
function SitemapTab() {
  const [result, setResult] = useState<SitemapResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    setLoading(true);
    apiGetSitemap().then((r) => { setResult(r); setLoading(false); });
  }, []);

  useEffect(() => { generate(); }, [generate]);

  const xml = result?.xml ?? "";
  const urlCount = result?.stats.total ?? 0;

  const copy = () => {
    navigator.clipboard.writeText(xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Sitemap Generator</h2>
          <p className="text-slate-400 text-xs mt-0.5">Auto-generated from static routes + CMS pages + blog posts</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={copy} variant="outline" className="h-9 border-slate-600 text-slate-300 hover:text-white">
            {copied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy XML"}
          </Button>
          <Button onClick={generate} disabled={loading} className="btn-gradient font-bold h-9">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Regenerate
          </Button>
        </div>
      </div>

      {urlCount > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total URLs",    value: result?.stats.total      ?? 0 },
            { label: "Static Pages",  value: result?.stats.staticPages ?? 0 },
            { label: "CMS + Blogs",   value: (result?.stats.cmsPages ?? 0) + (result?.stats.blogPages ?? 0) },
          ].map((s) => (
            <div key={s.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-primary">{s.value}</div>
              <div className="text-slate-400 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">XML Preview</p>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : (
          <pre className="text-xs text-green-400 font-mono overflow-auto max-h-[400px] whitespace-pre-wrap bg-slate-900/50 rounded-xl p-4">
            {xml}
          </pre>
        )}
      </div>
    </div>
  );
}

// ── Schema tab ────────────────────────────────────────────────────────────────
type SchemaTab = "organization" | "faq" | "product" | "review";

function SchemaManagement({ token }: { token: string }) {
  const { toast } = useToast();
  const [schemas, setSchemas] = useState<SEOSchemas | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSchema, setActiveSchema] = useState<SchemaTab>("organization");

  useEffect(() => { apiGetSchemas().then(setSchemas); }, []);

  const save = async () => {
    if (!schemas) return;
    setSaving(true);
    try { await apiSaveSchemas(schemas, token); toast({ title: "Schemas saved!" }); }
    catch { toast({ title: "Save failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  if (!schemas) return <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  const org = schemas.organization;

  const previewOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name, url: org.url, logo: org.logo,
    description: org.description, email: org.email,
    telephone: org.phone, address: { "@type": "PostalAddress", addressLocality: org.address },
    sameAs: org.sameAs,
  }, null, 2);

  const previewFAQ = schemas.faqs.length ? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schemas.faqs.map((f) => ({
      "@type": "Question", name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }, null, 2) : "";

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Schema Management</h2>
          <p className="text-slate-400 text-xs mt-0.5">Structured data for rich search results</p>
        </div>
        <Button onClick={save} disabled={saving} className="btn-gradient font-bold h-9">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving…" : "Save All"}
        </Button>
      </div>

      {/* Schema type tabs */}
      <div className="flex gap-1 bg-slate-800/50 border border-slate-700 rounded-xl p-1 w-fit">
        {(["organization","faq","product","review"] as SchemaTab[]).map((s) => (
          <button key={s} onClick={() => setActiveSchema(s)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeSchema === s ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white"}`}>
            {s === "organization" ? "🏢 Organization" : s === "faq" ? "❓ FAQ" : s === "product" ? "📦 Product" : "⭐ Review"}
          </button>
        ))}
      </div>

      {/* Organization */}
      {activeSchema === "organization" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4">
            <Field label="Organization Name" value={org.name} onChange={(v) => setSchemas((p) => p ? { ...p, organization: { ...p.organization, name: v } } : p)} />
            <Field label="Website URL" value={org.url} onChange={(v) => setSchemas((p) => p ? { ...p, organization: { ...p.organization, url: v } } : p)} />
            <Field label="Logo URL" value={org.logo} onChange={(v) => setSchemas((p) => p ? { ...p, organization: { ...p.organization, logo: v } } : p)} />
            <Field label="Description" value={org.description} onChange={(v) => setSchemas((p) => p ? { ...p, organization: { ...p.organization, description: v } } : p)} multiline />
            <Field label="Email" value={org.email} onChange={(v) => setSchemas((p) => p ? { ...p, organization: { ...p.organization, email: v } } : p)} />
            <Field label="Phone" value={org.phone} onChange={(v) => setSchemas((p) => p ? { ...p, organization: { ...p.organization, phone: v } } : p)} />
            <Field label="Address" value={org.address} onChange={(v) => setSchemas((p) => p ? { ...p, organization: { ...p.organization, address: v } } : p)} />
            <div className="space-y-2">
              <Label className="text-slate-300 text-xs font-medium">Social Profiles (sameAs)</Label>
              {org.sameAs.map((url, i) => (
                <div key={i} className="flex gap-2">
                  <Input value={url} onChange={(e) => {
                    const a = [...org.sameAs]; a[i] = e.target.value;
                    setSchemas((p) => p ? { ...p, organization: { ...p.organization, sameAs: a } } : p);
                  }} className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs" placeholder="https://twitter.com/..." />
                  <button onClick={() => {
                    const a = org.sameAs.filter((_, j) => j !== i);
                    setSchemas((p) => p ? { ...p, organization: { ...p.organization, sameAs: a } } : p);
                  }} className="text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => setSchemas((p) => p ? { ...p, organization: { ...p.organization, sameAs: [...p.organization.sameAs, ""] } } : p)}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add Social Profile
              </button>
            </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">JSON-LD Preview</p>
            <pre className="text-xs text-green-400 font-mono overflow-auto max-h-[480px] whitespace-pre-wrap bg-slate-900/50 rounded-xl p-3">{previewOrg}</pre>
          </div>
        </div>
      )}

      {/* FAQ */}
      {activeSchema === "faq" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4">
            <p className="text-slate-300 text-sm font-semibold">FAQ Items ({schemas.faqs.length})</p>
            {schemas.faqs.map((item, i) => (
              <div key={i} className="bg-slate-700/40 rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-xs">FAQ #{i + 1}</span>
                  <button onClick={() => setSchemas((p) => p ? { ...p, faqs: p.faqs.filter((_, j) => j !== i) } : p)}
                    className="text-slate-500 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <Input value={item.question} onChange={(e) => {
                  const f = [...schemas.faqs]; f[i] = { ...f[i], question: e.target.value };
                  setSchemas((p) => p ? { ...p, faqs: f } : p);
                }} placeholder="Question?" className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs" />
                <Textarea value={item.answer} onChange={(e) => {
                  const f = [...schemas.faqs]; f[i] = { ...f[i], answer: e.target.value };
                  setSchemas((p) => p ? { ...p, faqs: f } : p);
                }} placeholder="Answer…" className="bg-slate-700/50 border-slate-600 text-white text-xs min-h-[60px] resize-none" />
              </div>
            ))}
            <button onClick={() => setSchemas((p) => p ? { ...p, faqs: [...p.faqs, { question: "", answer: "" }] } : p)}
              className="w-full py-2 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary/50 hover:text-primary text-sm flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add FAQ Item
            </button>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">JSON-LD Preview</p>
            <pre className="text-xs text-green-400 font-mono overflow-auto max-h-[480px] whitespace-pre-wrap bg-slate-900/50 rounded-xl p-3">
              {previewFAQ || "// Add FAQ items to see preview"}
            </pre>
          </div>
        </div>
      )}

      {/* Product */}
      {activeSchema === "product" && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4">
          <p className="text-slate-300 text-sm font-semibold">Product Schemas ({schemas.products.length})</p>
          {schemas.products.map((item, i) => (
            <div key={i} className="bg-slate-700/40 rounded-xl p-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Product #{i + 1}</span>
                <button onClick={() => setSchemas((p) => p ? { ...p, products: p.products.filter((_, j) => j !== i) } : p)}
                  className="text-slate-500 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={item.name} onChange={(e) => {
                  const a = [...schemas.products]; a[i] = { ...a[i], name: e.target.value };
                  setSchemas((p) => p ? { ...p, products: a } : p);
                }} placeholder="Product name" className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs" />
                <div className="flex gap-1">
                  <Input value={item.price} onChange={(e) => {
                    const a = [...schemas.products]; a[i] = { ...a[i], price: e.target.value };
                    setSchemas((p) => p ? { ...p, products: a } : p);
                  }} placeholder="Price" className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs" />
                  <Input value={item.currency} onChange={(e) => {
                    const a = [...schemas.products]; a[i] = { ...a[i], currency: e.target.value };
                    setSchemas((p) => p ? { ...p, products: a } : p);
                  }} placeholder="INR" className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs w-20" />
                </div>
              </div>
              <Textarea value={item.description} onChange={(e) => {
                const a = [...schemas.products]; a[i] = { ...a[i], description: e.target.value };
                setSchemas((p) => p ? { ...p, products: a } : p);
              }} placeholder="Description…" className="bg-slate-700/50 border-slate-600 text-white text-xs min-h-[56px] resize-none" />
            </div>
          ))}
          <button onClick={() => setSchemas((p) => p ? { ...p, products: [...p.products, { name: "", description: "", price: "", currency: "INR" }] } : p)}
            className="w-full py-2 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary/50 hover:text-primary text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      )}

      {/* Review */}
      {activeSchema === "review" && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4">
          <p className="text-slate-300 text-sm font-semibold">Review Schemas ({schemas.reviews.length})</p>
          {schemas.reviews.map((item, i) => (
            <div key={i} className="bg-slate-700/40 rounded-xl p-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Review #{i + 1}</span>
                <button onClick={() => setSchemas((p) => p ? { ...p, reviews: p.reviews.filter((_, j) => j !== i) } : p)}
                  className="text-slate-500 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Input value={item.author} onChange={(e) => {
                  const a = [...schemas.reviews]; a[i] = { ...a[i], author: e.target.value };
                  setSchemas((p) => p ? { ...p, reviews: a } : p);
                }} placeholder="Author" className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs" />
                <Input value={item.itemName} onChange={(e) => {
                  const a = [...schemas.reviews]; a[i] = { ...a[i], itemName: e.target.value };
                  setSchemas((p) => p ? { ...p, reviews: a } : p);
                }} placeholder="Product name" className="bg-slate-700/50 border-slate-600 text-white h-8 text-xs" />
                <select value={item.rating} onChange={(e) => {
                  const a = [...schemas.reviews]; a[i] = { ...a[i], rating: Number(e.target.value) };
                  setSchemas((p) => p ? { ...p, reviews: a } : p);
                }} className="bg-slate-700/50 border border-slate-600 text-white h-8 text-xs rounded-lg px-2">
                  {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <Textarea value={item.text} onChange={(e) => {
                const a = [...schemas.reviews]; a[i] = { ...a[i], text: e.target.value };
                setSchemas((p) => p ? { ...p, reviews: a } : p);
              }} placeholder="Review text…" className="bg-slate-700/50 border-slate-600 text-white text-xs min-h-[56px] resize-none" />
            </div>
          ))}
          <button onClick={() => setSchemas((p) => p ? { ...p, reviews: [...p.reviews, { author: "", rating: 5, text: "", itemName: "" }] } : p)}
            className="w-full py-2 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-primary/50 hover:text-primary text-sm flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Add Review
          </button>
        </div>
      )}
    </div>
  );
}

// ── SEO Monitor tab ───────────────────────────────────────────────────────────
function MonitorTab({ token }: { token: string }) {
  const [data, setData] = useState<SEOMonitorResult | null>(null);
  const [loading, setLoading] = useState(false);

  const run = useCallback(() => {
    setLoading(true);
    apiGetSEOMonitor(token).then(setData).finally(() => setLoading(false));
  }, [token]);

  useEffect(() => { run(); }, [run]);

  const scoreColor = !data ? "text-slate-400" : data.score >= 80 ? "text-green-400" : data.score >= 50 ? "text-yellow-400" : "text-red-400";
  const scoreLabel = !data ? "" : data.score >= 80 ? "Good" : data.score >= 50 ? "Needs Work" : "Poor";

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">SEO Monitor</h2>
          <p className="text-slate-400 text-xs mt-0.5">Scan all pages for SEO issues</p>
        </div>
        <Button onClick={run} disabled={loading} className="btn-gradient font-bold h-9">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
          {loading ? "Scanning…" : "Re-scan"}
        </Button>
      </div>

      {loading && !data && (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      )}

      {data && (
        <>
          {/* Score card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center col-span-2 md:col-span-1">
              <div className={`text-5xl font-black ${scoreColor}`}>{data.score}</div>
              <div className={`text-sm font-semibold mt-1 ${scoreColor}`}>{scoreLabel}</div>
              <div className="text-slate-500 text-xs mt-0.5">SEO Score</div>
            </div>
            {[
              { label: "Total Pages",  value: data.totalPages,             icon: Globe,         color: "text-blue-400" },
              { label: "Issues Found", value: data.totalIssues,            icon: AlertTriangle,  color: data.totalIssues > 0 ? "text-yellow-400" : "text-green-400" },
              { label: "Missing Meta", value: data.missingMeta.length,     icon: XCircle,        color: data.missingMeta.length > 0 ? "text-red-400" : "text-green-400" },
            ].map((s) => (
              <div key={s.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
                <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Missing meta */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-white font-semibold text-sm">Missing Meta Tags ({data.missingMeta.length})</span>
            </div>
            {data.missingMeta.length === 0 ? (
              <div className="px-5 py-4 flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle2 className="w-4 h-4" /> All pages have meta tags
              </div>
            ) : (
              <div className="divide-y divide-slate-700/50 max-h-64 overflow-y-auto">
                {data.missingMeta.map((item, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-mono">{item.page}</span>
                    <div className="flex gap-1">
                      {item.missing.map((m) => (
                        <span key={m} className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-xs border border-red-500/20">{m}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Duplicate titles */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-semibold text-sm">Duplicate Titles ({data.duplicateTitles.length})</span>
            </div>
            {data.duplicateTitles.length === 0 ? (
              <div className="px-5 py-4 flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle2 className="w-4 h-4" /> No duplicate titles found
              </div>
            ) : (
              <div className="divide-y divide-slate-700/50">
                {data.duplicateTitles.map((item, i) => (
                  <div key={i} className="px-5 py-3">
                    <p className="text-yellow-400 text-sm font-medium mb-1">"{item.title}"</p>
                    <p className="text-slate-400 text-xs">Used by: {item.pages.join(", ")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* No-index pages */}
          {data.noIndexPages.length > 0 && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span className="text-white font-semibold text-sm">No-Index Pages ({data.noIndexPages.length})</span>
              </div>
              <div className="px-5 py-3 flex flex-wrap gap-2">
                {data.noIndexPages.map((p) => (
                  <span key={p} className="px-2 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-xs border border-orange-500/20">{p}</span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminSEO() {
  const { token } = useAdmin();
  const [tab, setTab] = useState<Tab>("global");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">SEO Management</h1>
        <p className="text-slate-400 text-sm mt-1">Global settings, robots.txt, sitemap, schemas and monitoring</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 border border-slate-700 rounded-xl p-1 w-fit flex-wrap">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tab === t.id ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white"}`}>
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {token && (
        <>
          {tab === "global"  && <GlobalTab   token={token} />}
          {tab === "robots"  && <RobotsTab   token={token} />}
          {tab === "sitemap" && <SitemapTab />}
          {tab === "schema"  && <SchemaManagement token={token} />}
          {tab === "monitor" && <MonitorTab  token={token} />}
        </>
      )}
    </div>
  );
}
