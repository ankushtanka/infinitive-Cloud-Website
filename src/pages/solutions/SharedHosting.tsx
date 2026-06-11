import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Star, Server, Shield, Zap, Globe, HardDrive, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { usePageContent } from "@/hooks/use-page-content";
import { whmcsCartUrl } from "@/config/whmcs-links";
import { useWhmcsProducts } from "@/hooks/use-whmcs-products";

// ─── Features section ────────────────────────────────────────────────────────
const whyFeatures = [
  { icon: HardDrive, title: "NVMe SSD Storage", description: "Lightning-fast NVMe drives deliver up to 10x faster read/write speeds for superior website performance." },
  { icon: Zap, title: "LiteSpeed Web Server", description: "Industry-leading LiteSpeed technology with built-in caching for maximum page load speed and better SEO." },
  { icon: Shield, title: "Imunify360 Security", description: "Enterprise-level protection with automated malware scanning, DDoS protection, and real-time threat detection." },
  { icon: Server, title: "cPanel Control Panel", description: "The world's most trusted hosting control panel for easy management of files, databases, domains, and emails." },
  { icon: Globe, title: "Free SSL Certificates", description: "Every domain gets a free SSL certificate automatically for enhanced security and improved search rankings." },
  { icon: Headphones, title: "24/7 Expert Support", description: "Our dedicated support team is available around the clock to help with any technical issues or questions." },
];

// ─── Pricing data ────────────────────────────────────────────────────────────
type Period = "1" | "12" | "24" | "36";
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
      { label: "1 official cPanel license", type: "check" },
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
      { label: "1 official cPanel license", type: "check" },
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
      { label: "1 official cPanel license", type: "check" },
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
      { label: "1 official cPanel license", type: "check" },
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

const PERIODS: { key: Period; label: string }[] = [
  { key: "1",  label: "1 month" },
  { key: "12", label: "12 months" },
  { key: "24", label: "24 months" },
  { key: "36", label: "36 months — Best value" },
];

// ─── Feature icon ─────────────────────────────────────────────────────────────
const FeatureIcon = ({ type }: { type: FeatureType }) => {
  if (type === "check") return <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />;
  if (type === "cross") return <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />;
  return <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-500" />;
};

// ─── Live price resolver — returns null only if no WHMCS data at all ─────────
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
  if (period === "36" && triennially > 0 && monthly > 0)
    return { price: r(triennially / 36), originalPrice: r(monthly), saving: `Save ${r(100 - (triennially / 36 / monthly) * 100)}% vs monthly`, upfront: r(triennially), renewsAt: r(monthly) };

  // Fallback: show best available period when requested one has no WHMCS data
  if (annually > 0 && monthly > 0)
    return { price: r(annually / 12), originalPrice: r(monthly), saving: `Save ${r(100 - (annually / 12 / monthly) * 100)}% vs monthly`, upfront: r(annually), renewsAt: r(monthly) };
  if (monthly > 0)
    return { price: r(monthly), noCommit: true, renewsAt: r(monthly) };

  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────
const SharedHosting = () => {
  const { c } = usePageContent("shared-hosting");
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
    <>
      <Helmet>
        <title>{c("meta_title", "Shared Hosting India | Affordable cPanel Hosting from ₹49/mo - Infinitive Cloud")}</title>
        <meta name="description" content={c("meta_description", "Best shared hosting plans in India starting at ₹49/mo. NVMe SSD, free SSL, LiteSpeed servers, cPanel, and 99.99% uptime. Perfect for WordPress, blogs, and business websites.")} />
        <meta name="keywords" content="shared hosting India, cheap web hosting, cPanel hosting, NVMe hosting, LiteSpeed hosting, WordPress hosting India, affordable hosting" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/shared-hosting" />
        <meta property="og:title" content={c("og_title", "Shared Hosting India | cPanel Hosting from ₹49/mo")} />
        <meta property="og:description" content={c("og_description", "Best shared hosting in India. NVMe SSD, free SSL, LiteSpeed, cPanel, 99.99% uptime.")} />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/shared-hosting" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">

          {/* ── Hero ── */}
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                {c("hero_heading") || <><span className="gradient-text">Shared Hosting</span> Plans India</>}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {c("hero_subtext", "Affordable, reliable, and blazing-fast shared hosting powered by NVMe SSD and LiteSpeed technology. Perfect for personal websites, blogs, small businesses, and WordPress sites.")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm font-semibold text-primary">
                {["Free SSL", "NVMe SSD", "LiteSpeed", "cPanel", "99.99% Uptime"].map((t) => (
                  <span key={t} className="flex items-center gap-1"><Check className="w-4 h-4" /> {t}</span>
                ))}
              </div>
            </div>
          </section>

          {/* ── Pricing ── */}
          <section className="section-container mb-20">

            {/* Commitment period selector */}
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Commitment Period
              </p>
              <div className="relative max-w-xs">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as Period)}
                  className="w-full h-11 pl-4 pr-10 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  {PERIODS.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.label}
                    </option>
                  ))}
                </select>
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
                    {/* Popular gradient bar */}
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                    )}

                    <CardContent className="p-6 pt-7 flex flex-col flex-1">

                      {/* Popular badge — always reserves space for alignment */}
                      <div className="text-center mb-3 h-4">
                        {plan.popular ? (
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                            ★ Most popular
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-wider invisible">
                            placeholder
                          </span>
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
                        <a
                          href={whmcsCartUrl(plan.whmcsPid)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-6 block"
                        >
                          <Button
                            className={`w-full h-10 font-bold ${plan.popular ? "btn-gradient" : ""}`}
                            variant={plan.popular ? "default" : "outline"}
                          >
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
                      <div className="flex-1 flex flex-col">
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

            <p className="text-xs text-center text-muted-foreground mt-6">
              All prices are in INR. Taxes may apply. Plans renew at regular monthly rate after commitment period.
            </p>
          </section>

          {/* ── Why Choose ── */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">
              {c("features_title") || <>Why Choose Our <span className="gradient-text">Shared Hosting</span></>}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {c("features_subtitle", "Enterprise-grade features at the most affordable prices. Every plan is designed for speed, security, and reliability.")}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="py-12 text-center">
                <h2 className="mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Try any shared hosting plan free for 14 days. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={whmcsCartUrl(1)} target="_blank" rel="noopener noreferrer">
                    <Button className="btn-gradient glow-effect font-bold h-14 px-8">Get Started</Button>
                  </a>
                  <Link to="/contact">
                    <Button variant="outline" className="h-14 px-8 font-semibold">Talk to Sales</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default SharedHosting;
