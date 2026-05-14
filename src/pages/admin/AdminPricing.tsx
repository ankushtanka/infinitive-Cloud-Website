import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save, RefreshCw, Globe, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TldRow {
  ext: string;
  label: string;
  price: number;
  original: number;
  renew: number;
}

const DEFAULT_TLDS: TldRow[] = [
  { ext: ".com",    label: ".com",    price: 799,  original: 1199, renew: 999  },
  { ext: ".in",     label: ".in",     price: 449,  original: 699,  renew: 549  },
  { ext: ".co.in",  label: ".co.in",  price: 299,  original: 499,  renew: 399  },
  { ext: ".net",    label: ".net",    price: 899,  original: 1299, renew: 1099 },
  { ext: ".org",    label: ".org",    price: 749,  original: 1099, renew: 899  },
  { ext: ".online", label: ".online", price: 199,  original: 599,  renew: 399  },
  { ext: ".site",   label: ".site",   price: 199,  original: 499,  renew: 299  },
  { ext: ".xyz",    label: ".xyz",    price: 99,   original: 299,  renew: 199  },
  { ext: ".store",  label: ".store",  price: 299,  original: 699,  renew: 499  },
  { ext: ".tech",   label: ".tech",   price: 399,  original: 799,  renew: 599  },
  { ext: ".io",     label: ".io",     price: 2499, original: 3499, renew: 2999 },
  { ext: ".dev",    label: ".dev",    price: 999,  original: 1499, renew: 1199 },
];

const AdminPricing = () => {
  const { toast } = useToast();
  const [tlds, setTlds] = useState<TldRow[]>(DEFAULT_TLDS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadPrices = async () => {
    setLoading(true);
    try {
      const { data } = await (supabase as any)
        .from("admin_settings")
        .select("value")
        .eq("key", "domain_prices")
        .maybeSingle();

      if (data?.value) {
        const saved: Record<string, { price: number; original: number; renew: number }> = data.value;
        setTlds(DEFAULT_TLDS.map((t) => ({
          ...t,
          price: saved[t.ext]?.price ?? t.price,
          original: saved[t.ext]?.original ?? t.original,
          renew: saved[t.ext]?.renew ?? t.renew,
        })));
      }
    } catch {
      // table may not exist yet — use defaults
    }
    setLoading(false);
  };

  useEffect(() => { loadPrices(); }, []);

  const updateField = (ext: string, field: keyof TldRow, value: string) => {
    const num = parseInt(value, 10);
    if (field === "ext" || field === "label") return;
    setTlds((prev) =>
      prev.map((t) => t.ext === ext ? { ...t, [field]: isNaN(num) ? 0 : num } : t)
    );
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, { price: number; original: number; renew: number }> = {};
      tlds.forEach((t) => {
        payload[t.ext] = { price: t.price, original: t.original, renew: t.renew };
      });

      const { error } = await (supabase as any)
        .from("admin_settings")
        .upsert({ key: "domain_prices", value: payload, updated_at: new Date().toISOString() }, { onConflict: "key" });

      if (error) throw error;

      setSaved(true);
      toast({ title: "Prices saved!", description: "Domain prices updated successfully." });
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err?.message?.includes("relation")
          ? "Run the SQL migration in Supabase first. See admin/migration.sql"
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
          <h1 className="text-2xl font-black text-white">Domain Pricing</h1>
          <p className="text-slate-400 text-sm mt-1">Set custom prices for all domain extensions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadPrices}
            disabled={loading}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Reload
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving || loading}
            className="btn-gradient font-bold"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : saved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Prices"}
          </Button>
        </div>
      </div>

      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="p-4 flex gap-3">
          <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-300 text-xs leading-relaxed">
            These prices override WHMCS prices on your website. Save changes here and the website will show the updated prices automatically.
            Make sure you have run the <code className="bg-slate-800 px-1 rounded text-blue-200">admin_settings</code> table migration in Supabase first.
          </p>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tlds.map((tld) => (
            <Card key={tld.ext} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
              <CardHeader className="pb-3 pt-4 px-5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <CardTitle className="text-white text-base font-black">{tld.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-slate-400 text-[10px] uppercase tracking-wider">Register ₹</Label>
                    <Input
                      type="number"
                      value={tld.price}
                      onChange={(e) => updateField(tld.ext, "price", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-slate-400 text-[10px] uppercase tracking-wider">Renew ₹</Label>
                    <Input
                      type="number"
                      value={tld.renew}
                      onChange={(e) => updateField(tld.ext, "renew", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-slate-400 text-[10px] uppercase tracking-wider">MRP ₹</Label>
                    <Input
                      type="number"
                      value={tld.original}
                      onChange={(e) => updateField(tld.ext, "original", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-slate-300 h-9 text-sm"
                    />
                  </div>
                </div>
                <div className="text-[10px] text-slate-500">
                  Preview: <span className="line-through text-slate-600">₹{tld.original.toLocaleString("en-IN")}</span>{" "}
                  <span className="text-primary font-bold">₹{tld.price.toLocaleString("en-IN")}/yr</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving || loading}
          className="btn-gradient font-bold px-8"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          {saving ? "Saving..." : "Save All Prices"}
        </Button>
      </div>
    </div>
  );
};

export default AdminPricing;
