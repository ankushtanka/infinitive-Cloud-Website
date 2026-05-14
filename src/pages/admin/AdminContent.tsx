import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save, CheckCircle2, AlertCircle, Home, Globe, Phone, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentData {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  announcement_banner: string;
  announcement_enabled: boolean;
  domain_section_title: string;
  domain_section_subtitle: string;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_address: string;
  footer_tagline: string;
  about_title: string;
  about_description: string;
}

const DEFAULT_CONTENT: ContentData = {
  hero_title: "Enterprise Cloud Infrastructure for India",
  hero_subtitle: "Deploy your applications on blazing-fast NVMe servers with 99.99% uptime SLA, free SSL, and 24/7 expert support.",
  hero_cta_primary: "Get Started Free",
  hero_cta_secondary: "View Pricing",
  announcement_banner: "",
  announcement_enabled: false,
  domain_section_title: "Find Your Perfect Domain Name",
  domain_section_subtitle: "Register your domain at India's lowest prices. Free WHOIS privacy & SSL included with every domain.",
  contact_email: "support@infinitivecloud.com",
  contact_phone: "+91 XXXXX XXXXX",
  contact_whatsapp: "+91 XXXXX XXXXX",
  contact_address: "India",
  footer_tagline: "Enterprise cloud infrastructure for India's growing businesses.",
  about_title: "Powering India's Digital Future",
  about_description: "Infinitive Cloud delivers enterprise-grade cloud infrastructure, hosting, and domain services at India's most competitive prices.",
};

const SECTIONS = [
  { key: "homepage", label: "Homepage", icon: Home },
  { key: "domain", label: "Domains Section", icon: Globe },
  { key: "contact", label: "Contact Info", icon: Phone },
  { key: "about", label: "About / Footer", icon: Star },
];

const Field = ({
  label, value, onChange, multiline = false, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string;
}) => (
  <div className="space-y-1.5">
    <Label className="text-slate-300 text-xs font-medium">{label}</Label>
    {multiline ? (
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 resize-none min-h-[80px] text-sm"
      />
    ) : (
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 h-9 text-sm"
      />
    )}
  </div>
);

const AdminContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState<ContentData>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("homepage");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await (supabase as any)
          .from("admin_settings")
          .select("value")
          .eq("key", "site_content")
          .maybeSingle();
        if (data?.value) {
          setContent({ ...DEFAULT_CONTENT, ...data.value });
        }
      } catch { /* table not yet created */ }
      setLoading(false);
    })();
  }, []);

  const update = (field: keyof ContentData) => (value: string | boolean) => {
    setContent((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await (supabase as any)
        .from("admin_settings")
        .upsert({ key: "site_content", value: content, updated_at: new Date().toISOString() }, { onConflict: "key" });
      if (error) throw error;
      setSaved(true);
      toast({ title: "Content saved!", description: "Website content updated successfully." });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Website Content</h1>
          <p className="text-slate-400 text-sm mt-1">Edit text shown across the entire website</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving || loading}
          className="btn-gradient font-bold"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : saved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="p-4 flex gap-3">
          <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-300 text-xs leading-relaxed">
            Changes saved here update the website content stored in Supabase.
            Make sure the <code className="bg-slate-800 px-1 rounded">admin_settings</code> table migration has been run.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        {/* Section tabs */}
        <div className="hidden md:flex flex-col gap-1 w-48 flex-shrink-0">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all
                ${activeSection === s.key
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Mobile section tabs */}
        <div className="flex md:hidden gap-2 flex-wrap mb-2 w-full">
          {SECTIONS.map((s) => (
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

        {/* Content */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-5 space-y-4">

                {activeSection === "homepage" && (
                  <>
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-white text-base">Homepage</CardTitle>
                    </CardHeader>
                    <Field label="Hero Title" value={content.hero_title} onChange={update("hero_title")} />
                    <Field label="Hero Subtitle" value={content.hero_subtitle} onChange={update("hero_subtitle")} multiline />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Primary CTA Button" value={content.hero_cta_primary} onChange={update("hero_cta_primary")} />
                      <Field label="Secondary CTA Button" value={content.hero_cta_secondary} onChange={update("hero_cta_secondary")} />
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Label className="text-slate-300 text-xs font-medium">Announcement Banner</Label>
                        <button
                          onClick={() => update("announcement_enabled")(!content.announcement_enabled)}
                          className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${content.announcement_enabled ? "bg-primary" : "bg-slate-600"}`}
                        >
                          <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform mt-0.5 ${content.announcement_enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                        </button>
                        <span className="text-slate-500 text-xs">{content.announcement_enabled ? "Enabled" : "Disabled"}</span>
                      </div>
                      <Field label="Banner Text" value={content.announcement_banner} onChange={update("announcement_banner")} />
                    </div>
                  </>
                )}

                {activeSection === "domain" && (
                  <>
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-white text-base">Domains Section</CardTitle>
                    </CardHeader>
                    <Field label="Section Title" value={content.domain_section_title} onChange={update("domain_section_title")} />
                    <Field label="Section Subtitle" value={content.domain_section_subtitle} onChange={update("domain_section_subtitle")} multiline />
                  </>
                )}

                {activeSection === "contact" && (
                  <>
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-white text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <Field label="Support Email" value={content.contact_email} onChange={update("contact_email")} type="email" />
                    <Field label="Phone Number" value={content.contact_phone} onChange={update("contact_phone")} />
                    <Field label="WhatsApp Number" value={content.contact_whatsapp} onChange={update("contact_whatsapp")} />
                    <Field label="Office Address" value={content.contact_address} onChange={update("contact_address")} multiline />
                  </>
                )}

                {activeSection === "about" && (
                  <>
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-white text-base">About / Footer</CardTitle>
                    </CardHeader>
                    <Field label="About Title" value={content.about_title} onChange={update("about_title")} />
                    <Field label="About Description" value={content.about_description} onChange={update("about_description")} multiline />
                    <Field label="Footer Tagline" value={content.footer_tagline} onChange={update("footer_tagline")} />
                  </>
                )}

              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
