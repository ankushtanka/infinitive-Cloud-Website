import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Star, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { whmcsCartUrl } from "@/config/whmcs-links";
import { useWhmcsProducts } from "@/hooks/use-whmcs-products";

type Period = "1" | "12" | "24" | "48";
type FeatureType = "check" | "cross" | "star";

interface PeriodData {
  price: number;
  originalPrice?: number;
  saving?: string;
  upfront?: number;
  noCommit?: boolean;
  renewsAt: number;
}

interface PlanFeature {
  label: string;
  type: FeatureType;
}

interface Plan {
  id: string;
  whmcsPid: number | null;
  name: string;
  tagline: string;
  popular?: boolean;
  specs: { ram: string; nvme: string; vcpu: string; bw: string };
  features: PlanFeature[];
}

const PLANS: Plan[] = [
  {
    id: "starter",
    whmcsPid: 1,
    name: "Starter",
    tagline: "Perfect for beginners & portfolios",
    popular: false,
    specs: { ram: "512 MB RAM", nvme: "10 GB NVMe", vcpu: "0.5 vCPU", bw: "Unmetered BW" },
    features: [
      { label: "1 website",                  type: "check" },
      { label: "10 GB NVMe SSD",             type: "check" },
      { label: "1 official cPanel license",  type: "check" },
      { label: "Free SSL certificate",       type: "check" },
      { label: "2 email accounts",           type: "check" },
      { label: "LiteSpeed web server",       type: "check" },
      { label: "Imunify360 malware scanner", type: "check" },
      { label: "Daily automatic backups",    type: "check" },
      { label: "Custom nameservers",         type: "check" },
      { label: "Free migrations",            type: "check" },
      { label: "24/7 support",               type: "star"  },
      { label: "Free domain",                type: "cross" },
      { label: "CDN",                        type: "cross" },
      { label: "Staging",                    type: "cross" },
    ],
  },
  {
    id: "premium",
    whmcsPid: 2,
    name: "Premium",
    tagline: "Best for growing websites & blogs",
    popular: true,
    specs: { ram: "1 GB RAM", nvme: "30 GB NVMe", vcpu: "1 vCPU", bw: "Unmetered BW" },
    features: [
      { label: "5 websites",                 type: "check" },
      { label: "30 GB NVMe SSD",             type: "check" },
      { label: "1 official cPanel license",  type: "check" },
      { label: "Free SSL certificate",       type: "check" },
      { label: "25 email accounts",          type: "check" },
      { label: "LiteSpeed web server",       type: "check" },
      { label: "Imunify360 malware scanner", type: "check" },
      { label: "Daily automatic backups",    type: "check" },
      { label: "Custom nameservers",         type: "check" },
      { label: "Free migrations",            type: "check" },
      { label: "24/7 support",               type: "star"  },
      { label: "Free domain (1 yr)",         type: "check" },
      { label: "Free CDN",                   type: "check" },
      { label: "Staging",                    type: "cross" },
    ],
  },
  {
    id: "business",
    whmcsPid: 3,
    name: "Business",
    tagline: "For professionals & small businesses",
    popular: false,
    specs: { ram: "2 GB RAM", nvme: "100 GB NVMe", vcpu: "2 vCPUs", bw: "Unmetered BW" },
    features: [
      { label: "Unlimited websites",         type: "check" },
      { label: "100 GB NVMe SSD",            type: "check" },
      { label: "1 official cPanel license",  type: "check" },
      { label: "Free SSL certificate",       type: "check" },
      { label: "Unlimited email accounts",   type: "check" },
      { label: "LiteSpeed web server",       type: "check" },
      { label: "Imunify360 malware scanner", type: "check" },
      { label: "Daily automatic backups",    type: "check" },
      { label: "Custom nameservers",         type: "check" },
      { label: "Free migrations",            type: "check" },
      { label: "24/7 priority support",      type: "star"  },
      { label: "Free domain (1 yr)",         type: "check" },
      { label: "Free CDN",                   type: "check" },
      { label: "Staging environment",        type: "check" },
    ],
  },
  {
    id: "enterprise",
    whmcsPid: null,
    name: "Enterprise",
    tagline: "For agencies & high-traffic sites",
    popular: false,
    specs: { ram: "2 GB RAM", nvme: "Unlimited NVMe", vcpu: "2 vCPUs", bw: "Unmetered BW" },
    features: [
      { label: "Unlimited websites",         type: "check" },
      { label: "Unlimited NVMe SSD",         type: "check" },
      { label: "1 official cPanel license",  type: "check" },
      { label: "Free SSL certificate",       type: "check" },
      { label: "Unlimited email accounts",   type: "check" },
      { label: "LiteSpeed web server",       type: "check" },
      { label: "Imunify360 malware scanner", type: "check" },
      { label: "Daily automatic backups",    type: "check" },
      { label: "Custom nameservers",         type: "check" },
      { label: "Free migrations",            type: "check" },
      { label: "24/7 priority support",      type: "star"  },
      { label: "Free domain (1 yr)",         type: "check" },
      { label: "Free CDN",                   type: "check" },
      { label: "Staging environment",        type: "check" },
    ],
  },
];

const PERIODS: { key: Period; label: string; maxSave?: string; best?: boolean }[] = [
  { key: "1",  label: "Monthly" },
  { key: "12", label: "12 Months", maxSave: "40%" },
  { key: "24", label: "24 Months", maxSave: "55%" },
  { key: "48", label: "48 Months", maxSave: "75%", best: true },
];

const FeatureIcon = ({ type }: { type: FeatureType }) => {
  if (type === "check") return <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />;
  if (type === "cross") return <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />;
  return <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-500" />;
};

function resolvePeriod(inr: Record<string, string> | undefined, period: Period): PeriodData | null {
  if (!inr) return null;
  const monthly = parseFloat(inr.monthly || "0");
  const annually = parseFloat(inr.annually || "0");
  const biennially = parseFloat(inr.biennially || "0");
  const triennially = parseFloat(inr.triennially || "0");
  const r = (n: number) => Math.round(n);

  if (period === "1" && monthly > 0)
    return { price: r(monthly), noCommit: true, renewsAt: r(monthly) };
  if (period === "12" && annually > 0 && monthly > 0)
    return { price: r(annually / 12), originalPrice: r(monthly), saving: `Save ${r(100 - (annually / 12 / monthly) * 100)}% vs monthly`, upfront: r(annually), renewsAt: r(monthly) };
  if (period === "24" && biennially > 0 && monthly > 0)
    return { price: r(biennially / 24), originalPrice: r(monthly), saving: `Save ${r(100 - (biennially / 24 / monthly) * 100)}% vs monthly`, upfront: r(biennially), renewsAt: r(monthly) };
  if (period === "48" && triennially > 0 && monthly > 0)
    return { price: r(triennially / 36), originalPrice: r(monthly), saving: `Save ${r(100 - (triennially / 36 / monthly) * 100)}% vs monthly`, upfront: r(triennially), renewsAt: r(monthly) };

  // Fallback: show best available period when requested one has no WHMCS data
  if (annually > 0 && monthly > 0)
    return { price: r(annually / 12), originalPrice: r(monthly), saving: `Save ${r(100 - (annually / 12 / monthly) * 100)}% vs monthly`, upfront: r(annually), renewsAt: r(monthly) };
  if (monthly > 0)
    return { price: r(monthly), noCommit: true, renewsAt: r(monthly) };

  return null;
}

const HomePricingSection = () => {
  const [period, setPeriod] = useState<Period>("12");
  const { products, loading: priceLoading } = useWhmcsProducts([1, 2, 3]);

  const livePricing = useMemo(() => {
    const map = new Map<number, Record<string, string>>();
    products.forEach((p) => {
      if (p.pricing && Object.keys(p.pricing).length > 0) map.set(p.pid, p.pricing);
    });
    return map;
  }, [products]);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="section-container relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-primary">Engineered Hosting Plans</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight mb-5">
            Hosting that grows
            <br />
            <span className="gradient-text italic font-extralight">with your ambition.</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-loose tracking-wide">
            Enterprise-grade NVMe infrastructure. Free SSL, 24/7 expert support,<br className="hidden md:block" /> and a 99.99% uptime SLA — on every plan, at India's best prices.
          </p>
        </div>

        {/* Commitment period selector — pill tabs */}
        <div className="mb-10 flex flex-col items-center gap-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Choose your plan duration
          </p>
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-muted/50 border border-border/60 backdrop-blur-sm">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  period === p.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {p.best && (
                  <span className="absolute -top-2.5 -right-1 text-[9px] font-extrabold bg-orange-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                    BEST
                  </span>
                )}
                {p.label}
                {p.maxSave && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    period === p.key
                      ? "bg-white/20 text-white"
                      : "bg-green-500/15 text-green-600 dark:text-green-400"
                  }`}>
                    -{p.maxSave}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PLANS.map((plan) => {
            const inr = plan.whmcsPid !== null ? livePricing.get(plan.whmcsPid) : undefined;
            const pd = resolvePeriod(inr, period);
            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.popular
                    ? "border-primary/50 ring-2 ring-primary/20 shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                )}

                {/* Savings badge — top right */}
                {pd && !pd.noCommit && pd.saving && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-green-500 text-white text-[10px] font-extrabold px-2 py-1 rounded-full shadow-sm leading-none">
                      {pd.saving.match(/Save (\d+)%/)?.[1]}% OFF
                    </span>
                  </div>
                )}

                <CardContent className="p-6 pt-7 flex flex-col flex-1">

                  {/* Popular badge */}
                  <div className="text-center mb-3 h-5">
                    {plan.popular ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        ★ Most popular
                      </span>
                    ) : (
                      <span className="invisible text-[10px]">placeholder</span>
                    )}
                  </div>

                  {/* Plan name & tagline */}
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-5 text-xs text-muted-foreground">
                    <span>{plan.specs.ram}</span>
                    <span>{plan.specs.vcpu}</span>
                    <span>{plan.specs.nvme}</span>
                    <span>{plan.specs.bw}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-1 min-h-[52px]">
                    {priceLoading ? (
                      <div className="animate-pulse space-y-2">
                        <div className="h-4 w-16 bg-muted rounded" />
                        <div className="h-9 w-24 bg-muted rounded" />
                      </div>
                    ) : pd ? (
                      <>
                        {pd.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{pd.originalPrice}/mo
                          </span>
                        )}
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-foreground">₹{pd.price}</span>
                          <span className="text-sm text-muted-foreground">/month</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-muted-foreground/40">—</span>
                      </div>
                    )}
                  </div>

                  {/* Saving / upfront info */}
                  <div className="min-h-[56px] mb-4 text-sm">
                    {pd?.noCommit ? (
                      <p className="text-muted-foreground text-xs">
                        No commitment · cancel anytime
                        <br />
                        <em>Renews at ₹{pd.renewsAt}/mo</em>
                      </p>
                    ) : pd ? (
                      <>
                        <p className="text-green-600 dark:text-green-400 font-medium text-xs">{pd.saving}</p>
                        <p className="text-muted-foreground text-xs">
                          Pay ₹{pd.upfront?.toLocaleString("en-IN")} upfront · {period} months
                          <br />
                          <em>Renews at ₹{pd.renewsAt}/mo</em>
                        </p>
                      </>
                    ) : null}
                  </div>

                  {/* CTA */}
                  {plan.whmcsPid !== null ? (
                    <a href={whmcsCartUrl(plan.whmcsPid)} target="_blank" rel="noopener noreferrer" className="mb-6 block">
                      <Button className={`w-full h-10 font-bold ${plan.popular ? "btn-gradient" : ""}`} variant={plan.popular ? "default" : "outline"}>
                        Get started <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </a>
                  ) : (
                    <Link to="/contact" className="mb-6 block">
                      <Button className="w-full h-10 font-bold" variant="outline">
                        Contact Us <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                  )}

                  {/* Divider */}
                  <div className="border-t border-border mb-4" />

                  {/* Feature list */}
                  <div className="flex-1">
                    <ul className="space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f.label} className="flex items-start gap-2.5">
                          <FeatureIcon type={f.type} />
                          <span className={`text-sm leading-snug ${f.type === "cross" ? "text-muted-foreground/50" : "text-foreground/80"}`}>
                            {f.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All plans include bar — inspired by Hostinger */}
        <div className="mt-10 py-5 px-6 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm">
          <p className="text-[11px] font-bold uppercase tracking-widest text-center text-muted-foreground mb-4">
            Every plan includes
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2.5">
            {[
              "Free SSL Certificate",
              "LiteSpeed Web Server",
              "cPanel Control Panel",
              "Free Website Migration",
              "99.99% Uptime SLA",
              "24/7 Expert Support",
              "Daily Automatic Backups",
              "Imunify360 Security",
            ].map((feature) => (
              <span key={feature} className="flex items-center gap-1.5 text-xs text-foreground/70 font-medium">
                <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                {feature}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          All prices are in INR. Taxes may apply. Plans renew at regular monthly rate after commitment period.
        </p>

        {/* Compare all plans link */}
        <div className="text-center mt-8">
          <Link to="/solutions/shared-hosting">
            <Button size="lg" variant="outline" className="group rounded-xl text-sm md:text-base h-12 px-7 border-border/70 hover:border-primary/60 hover:bg-primary/5">
              View All Shared Hosting Plans
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HomePricingSection;
