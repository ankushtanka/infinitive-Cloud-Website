import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Star, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
  name: string;
  tagline: string;
  popular?: boolean;
  specs: { ram: string; nvme: string; vcpu: string; bw: string };
  periods: Record<Period, PeriodData>;
  features: PlanFeature[];
}

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for beginners & portfolios",
    popular: false,
    specs: { ram: "512 MB RAM", nvme: "10 GB NVMe", vcpu: "0.5 vCPU", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 199, noCommit: true, renewsAt: 199 },
      "12": { price: 119, originalPrice: 199, saving: "Save 40% vs monthly", upfront: 1428, renewsAt: 199 },
      "24": { price: 89,  originalPrice: 199, saving: "Save 55% vs monthly", upfront: 2136, renewsAt: 199 },
      "48": { price: 49,  originalPrice: 199, saving: "Save 75% vs monthly", upfront: 2352, renewsAt: 199 },
    },
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
    name: "Premium",
    tagline: "Best for growing websites & blogs",
    popular: true,
    specs: { ram: "1 GB RAM", nvme: "30 GB NVMe", vcpu: "1 vCPU", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 349, noCommit: true, renewsAt: 349 },
      "12": { price: 219, originalPrice: 349, saving: "Save 37% vs monthly", upfront: 2628, renewsAt: 349 },
      "24": { price: 169, originalPrice: 349, saving: "Save 52% vs monthly", upfront: 4056, renewsAt: 349 },
      "48": { price: 99,  originalPrice: 349, saving: "Save 72% vs monthly", upfront: 4752, renewsAt: 349 },
    },
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
    name: "Business",
    tagline: "For professionals & small businesses",
    popular: false,
    specs: { ram: "2 GB RAM", nvme: "100 GB NVMe", vcpu: "2 vCPUs", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 549, noCommit: true, renewsAt: 549 },
      "12": { price: 349, originalPrice: 549, saving: "Save 36% vs monthly", upfront: 4188, renewsAt: 549 },
      "24": { price: 279, originalPrice: 549, saving: "Save 49% vs monthly", upfront: 6696, renewsAt: 549 },
      "48": { price: 169, originalPrice: 549, saving: "Save 69% vs monthly", upfront: 8112, renewsAt: 549 },
    },
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
    name: "Enterprise",
    tagline: "For agencies & high-traffic sites",
    popular: false,
    specs: { ram: "2 GB RAM", nvme: "Unlimited NVMe", vcpu: "2 vCPUs", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 799, noCommit: true, renewsAt: 799 },
      "12": { price: 499, originalPrice: 799, saving: "Save 38% vs monthly", upfront: 5988, renewsAt: 799 },
      "24": { price: 399, originalPrice: 799, saving: "Save 50% vs monthly", upfront: 9576, renewsAt: 799 },
      "48": { price: 249, originalPrice: 799, saving: "Save 69% vs monthly", upfront: 11952, renewsAt: 799 },
    },
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

const HomePricingSection = () => {
  const [period, setPeriod] = useState<Period>("48");

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

        {/* Commitment period selector */}
        <div className="mb-8">
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

                  {/* Popular badge */}
                  <div className="text-center mb-3 h-4">
                    {plan.popular ? (
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
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

                  {/* Saving / upfront info */}
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
                    to={`/cart?product=${plan.id}&period=${period}&name=${encodeURIComponent(plan.name)}&type=shared-hosting`}
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

        <p className="text-xs text-center text-muted-foreground mt-6">
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
