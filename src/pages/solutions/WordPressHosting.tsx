import { useState } from "react";
import LazyVisible from "@/components/LazyVisible";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Star, Zap, Shield, Globe, RefreshCw, HardDrive, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import WordPressStackDiagram from "@/components/infographics/WordPressStackDiagram";

// ─── Why features ─────────────────────────────────────────────────────────────
const whyFeatures = [
  { icon: Zap,        title: "Optimized for Speed",          description: "NVMe SSD storage and server-level caching deliver blazing-fast WordPress load times." },
  { icon: Shield,     title: "Built-In Security",            description: "Malware scanning, firewall protection, and free SSL certificates keep your site safe." },
  { icon: RefreshCw,  title: "Automatic Updates",            description: "WordPress core, theme, and plugin updates handled automatically so you stay current." },
  { icon: HardDrive,  title: "Daily Backups",                description: "Automated daily backups with one-click restore — never lose your content." },
  { icon: Globe,      title: "Free Migration",               description: "We move your existing WordPress site over with zero downtime and no hassle." },
  { icon: Headphones, title: "WordPress Experts on Call",    description: "24/7 support from a team that knows WordPress inside and out." },
];

// ─── Pricing data ─────────────────────────────────────────────────────────────
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

interface PlanFeature { label: string; type: FeatureType; }

interface Plan {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  specs: { ram: string; nvme: string; vcpu: string; bw: string };
  periods: Record<Period, PeriodData>;
  features: PlanFeature[];
}

const PLANS: Plan[] = [
  {
    id: "wp-starter",
    name: "WP Starter",
    tagline: "Launch your first WordPress site",
    popular: false,
    specs: { ram: "512 MB RAM", nvme: "15 GB NVMe", vcpu: "0.5 vCPU", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 229, noCommit: true, renewsAt: 229 },
      "12": { price: 149, originalPrice: 229, saving: "Save 35% vs monthly", upfront: 1788,  renewsAt: 229 },
      "24": { price: 119, originalPrice: 229, saving: "Save 48% vs monthly", upfront: 2856,  renewsAt: 229 },
      "48": { price: 69,  originalPrice: 229, saving: "Save 70% vs monthly", upfront: 3312,  renewsAt: 229 },
    },
    features: [
      { label: "1 WordPress site",          type: "check" },
      { label: "15 GB NVMe SSD",            type: "check" },
      { label: "2 email accounts",          type: "check" },
      { label: "AI website builder",        type: "check" },
      { label: "LiteSpeed cache plugin",    type: "check" },
      { label: "One-click WP install",      type: "check" },
      { label: "Free SSL + Imunify360",     type: "check" },
      { label: "Daily automatic backups",   type: "check" },
      { label: "Free migrations",           type: "check" },
      { label: "24/7 support",              type: "star"  },
      { label: "Free domain",               type: "cross" },
      { label: "Staging",                   type: "cross" },
      { label: "Multisite",                 type: "cross" },
    ],
  },
  {
    id: "wp-business",
    name: "WP Business",
    tagline: "Scale your WordPress presence",
    popular: true,
    specs: { ram: "1 GB RAM", nvme: "50 GB NVMe", vcpu: "1 vCPU", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 449, noCommit: true, renewsAt: 449 },
      "12": { price: 279, originalPrice: 449, saving: "Save 38% vs monthly", upfront: 3348,  renewsAt: 449 },
      "24": { price: 219, originalPrice: 449, saving: "Save 51% vs monthly", upfront: 5256,  renewsAt: 449 },
      "48": { price: 139, originalPrice: 449, saving: "Save 69% vs monthly", upfront: 6672,  renewsAt: 449 },
    },
    features: [
      { label: "5 WordPress sites",         type: "check" },
      { label: "50 GB NVMe SSD",            type: "check" },
      { label: "25 email accounts",         type: "check" },
      { label: "AI website builder",        type: "check" },
      { label: "LiteSpeed cache plugin",    type: "check" },
      { label: "One-click WP install",      type: "check" },
      { label: "Free SSL + CDN",            type: "check" },
      { label: "Daily automatic backups",   type: "check" },
      { label: "Free migrations",           type: "check" },
      { label: "24/7 support",              type: "star"  },
      { label: "Free domain (1 yr)",        type: "check" },
      { label: "Staging environment",       type: "check" },
      { label: "Multisite",                 type: "cross" },
    ],
  },
  {
    id: "wp-pro",
    name: "WP Pro",
    tagline: "For developers & power users",
    popular: false,
    specs: { ram: "2 GB RAM", nvme: "150 GB NVMe", vcpu: "2 vCPUs", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 799, noCommit: true, renewsAt: 799 },
      "12": { price: 499, originalPrice: 799, saving: "Save 38% vs monthly", upfront: 5988,  renewsAt: 799 },
      "24": { price: 399, originalPrice: 799, saving: "Save 50% vs monthly", upfront: 9576,  renewsAt: 799 },
      "48": { price: 229, originalPrice: 799, saving: "Save 71% vs monthly", upfront: 10992, renewsAt: 799 },
    },
    features: [
      { label: "Unlimited WP sites",        type: "check" },
      { label: "150 GB NVMe SSD",           type: "check" },
      { label: "Unlimited email accounts",  type: "check" },
      { label: "AI website builder",        type: "check" },
      { label: "LiteSpeed cache plugin",    type: "check" },
      { label: "One-click WP install",      type: "check" },
      { label: "Free SSL + CDN",            type: "check" },
      { label: "Daily automatic backups",   type: "check" },
      { label: "Free migrations",           type: "check" },
      { label: "24/7 priority support",     type: "star"  },
      { label: "Free domain (1 yr)",        type: "check" },
      { label: "Staging + multisite",       type: "check" },
    ],
  },
];

const PERIODS: { key: Period; label: string }[] = [
  { key: "1",  label: "1 month" },
  { key: "12", label: "12 months" },
  { key: "24", label: "24 months" },
  { key: "48", label: "48 months — Best value" },
];

const FeatureIcon = ({ type }: { type: FeatureType }) => {
  if (type === "check") return <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />;
  if (type === "cross") return <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />;
  return <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5 fill-yellow-500" />;
};

// ─── Component ────────────────────────────────────────────────────────────────
const WordPressHosting = () => {
  const [period, setPeriod] = useState<Period>("48");

  return (
    <>
      <Helmet>
        <title>Managed WordPress Hosting India | From ₹69/mo - Infinitive Cloud</title>
        <meta name="description" content="Managed WordPress hosting with NVMe storage, automatic updates, daily backups, free SSL, AI website builder, and 24/7 expert support. Plans from ₹69/mo." />
        <meta name="keywords" content="managed WordPress hosting India, fast WordPress hosting, secure WordPress hosting, WP hosting plans" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/wordpress-hosting" />
        <meta property="og:title" content="Managed WordPress Hosting | Fast & Secure" />
        <meta property="og:description" content="Managed WordPress hosting with NVMe, auto updates, daily backups, free SSL." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/wordpress-hosting" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Managed WordPress Hosting | Fast & Secure" />
        <meta name="twitter:description" content="Managed WordPress hosting with NVMe, auto updates, daily backups, free SSL." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">

          {/* ── Hero ── */}
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                Managed <span className="gradient-text">WordPress Hosting</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                WordPress hosting optimized for speed, security, and hassle-free management. Focus on your content — we handle everything else.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm font-semibold text-primary">
                {["Free SSL", "NVMe SSD", "LiteSpeed", "One-click WP", "AI Builder"].map((t) => (
                  <span key={t} className="flex items-center gap-1"><Check className="w-4 h-4" /> {t}</span>
                ))}
              </div>
            </div>
          </section>

          {/* ── Infographic ── */}
          <section className="section-container mb-16">
            <div className="max-w-5xl mx-auto">
              <LazyVisible minHeight={400}><WordPressStackDiagram /></LazyVisible>
            </div>
          </section>

          {/* ── Pricing ── */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-2">WordPress Hosting <span className="gradient-text">Plans</span></h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Choose the plan that fits your WordPress needs. Save more with longer commitment periods.
            </p>

            {/* Commitment period selector */}
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Commitment Period
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                {PERIODS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPeriod(p.key)}
                    className={`relative px-5 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                      period === p.key
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-border hover:border-foreground/40"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary whitespace-nowrap">
                        {p.badge}
                      </span>
                    )}
                    {p.label}{p.icon ? ` ${p.icon}` : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {PLANS.map((plan) => {
                const pd = plan.periods[period];
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

                    <CardContent className="p-6 pt-7 flex flex-col flex-1">

                      {plan.popular && (
                        <div className="text-center mb-3">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Most popular
                          </span>
                        </div>
                      )}

                      {/* Name & tagline */}
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
                      <div className="mb-1">
                        {pd.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{pd.originalPrice}/mo
                          </span>
                        )}
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-foreground">₹{pd.price}</span>
                          <span className="text-sm text-muted-foreground">/month</span>
                        </div>
                      </div>

                      {/* Saving / commitment info */}
                      <div className="min-h-[56px] mb-4 text-sm">
                        {pd.noCommit ? (
                          <p className="text-muted-foreground text-xs">
                            No commitment · cancel anytime
                            <br />
                            <em>Renews at ₹{pd.renewsAt}/mo</em>
                          </p>
                        ) : (
                          <>
                            <p className="text-green-600 dark:text-green-400 font-medium text-xs">{pd.saving}</p>
                            <p className="text-muted-foreground text-xs">
                              Pay ₹{pd.upfront?.toLocaleString("en-IN")} upfront · {period} months
                              <br />
                              <em>Renews at ₹{pd.renewsAt}/mo</em>
                            </p>
                          </>
                        )}
                      </div>

                      {/* CTA */}
                      <Link
                        to={`/cart?product=${plan.id}&period=${period}&name=${encodeURIComponent(plan.name)}&type=wordpress-hosting`}
                        className="mb-6"
                      >
                        <Button
                          className={`w-full h-10 font-bold ${plan.popular ? "btn-gradient" : ""}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get started <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                      </Link>

                      {/* Divider */}
                      <div className="border-t border-border mb-4" />

                      {/* Feature list */}
                      <ul className="space-y-2.5 flex-1">
                        {plan.features.map((f) => (
                          <li key={f.label} className="flex items-start gap-2.5">
                            <FeatureIcon type={f.type} />
                            <span className={`text-sm leading-snug ${f.type === "cross" ? "text-muted-foreground/50" : "text-foreground/80"}`}>
                              {f.label}
                            </span>
                          </li>
                        ))}
                      </ul>

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
          <section className="section-container mb-16">
            <h2 className="text-center mb-12">
              Why Choose Our <span className="gradient-text">WordPress Hosting</span>
            </h2>
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
                <h2 className="mb-4">Ready to Launch Your WordPress Site?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Get started today with managed WordPress hosting. Free migration included.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/cart?product=wp-starter&period=12&name=WP+Starter&type=wordpress-hosting">
                    <Button className="btn-gradient glow-effect font-bold h-14 px-8">Get Started Now</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button>
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

export default WordPressHosting;
