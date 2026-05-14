import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X, Star, Mail, Shield, Zap, Globe, Clock, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Period = "1" | "12" | "24" | "48";

const PERIODS = [
  { key: "1" as Period, label: "1 month" },
  { key: "12" as Period, label: "12 months" },
  { key: "24" as Period, label: "24 months" },
  { key: "48" as Period, label: "48 months — Best value" },
];

type FeatureType = "check" | "cross" | "star";

interface Feature {
  label: string;
  type: FeatureType;
}

interface PlanPricing {
  price: number;
  originalPrice?: number;
  savePct?: number;
  upfront?: number;
  renewPrice: number;
}

interface Plan {
  name: string;
  subtitle: string;
  storage: string;
  bw: string;
  popular?: boolean;
  pricing: Record<Period, PlanPricing>;
  features: Feature[];
  ctaLink: string;
}

const EMAIL_PLANS: Plan[] = [
  {
    name: "Email Lite",
    subtitle: "For freelancers & solopreneurs",
    storage: "5 GB/account",
    bw: "Unmetered BW",
    pricing: {
      "1":  { price: 99,  renewPrice: 99 },
      "12": { price: 59,  originalPrice: 99, savePct: 40, upfront: 708,   renewPrice: 99 },
      "24": { price: 49,  originalPrice: 99, savePct: 51, upfront: 1176,  renewPrice: 99 },
      "48": { price: 29,  originalPrice: 99, savePct: 71, upfront: 1392,  renewPrice: 99 },
    },
    features: [
      { label: "5 email accounts",       type: "check" },
      { label: "5 GB storage per account", type: "check" },
      { label: "Custom domain email",    type: "check" },
      { label: "Spam + virus protection",type: "check" },
      { label: "IMAP / POP3 / SMTP",     type: "check" },
      { label: "Webmail access",         type: "check" },
      { label: "Better email delivery",  type: "check" },
      { label: "Free migrations",        type: "check" },
      { label: "24/7 support",           type: "star"  },
      { label: "Email aliases",          type: "cross" },
      { label: "Priority routing",       type: "cross" },
    ],
    ctaLink: "/contact",
  },
  {
    name: "Email Business",
    subtitle: "For small teams & offices",
    storage: "15 GB/account",
    bw: "Unmetered BW",
    popular: true,
    pricing: {
      "1":  { price: 249, renewPrice: 249 },
      "12": { price: 129, originalPrice: 249, savePct: 48, upfront: 1548,  renewPrice: 249 },
      "24": { price: 99,  originalPrice: 249, savePct: 60, upfront: 2376,  renewPrice: 249 },
      "48": { price: 59,  originalPrice: 249, savePct: 76, upfront: 2832,  renewPrice: 249 },
    },
    features: [
      { label: "25 email accounts",          type: "check" },
      { label: "15 GB storage per account",  type: "check" },
      { label: "Custom domain email",        type: "check" },
      { label: "Advanced spam filter",       type: "check" },
      { label: "IMAP / POP3 / SMTP",         type: "check" },
      { label: "Webmail + email aliases",    type: "check" },
      { label: "Better email delivery",      type: "check" },
      { label: "Free email migration",       type: "check" },
      { label: "24/7 support",               type: "star"  },
      { label: "Priority routing",           type: "cross" },
    ],
    ctaLink: "/contact",
  },
  {
    name: "Email Pro",
    subtitle: "For growing companies",
    storage: "30 GB/account",
    bw: "Unmetered BW",
    pricing: {
      "1":  { price: 399, renewPrice: 399 },
      "12": { price: 229, originalPrice: 399, savePct: 43, upfront: 2748,  renewPrice: 399 },
      "24": { price: 179, originalPrice: 399, savePct: 55, upfront: 4296,  renewPrice: 399 },
      "48": { price: 99,  originalPrice: 399, savePct: 75, upfront: 4752,  renewPrice: 399 },
    },
    features: [
      { label: "Unlimited email accounts",       type: "check" },
      { label: "30 GB storage per account",      type: "check" },
      { label: "Custom domain email",            type: "check" },
      { label: "Advanced spam filter",           type: "check" },
      { label: "IMAP / POP3 / SMTP",             type: "check" },
      { label: "Webmail + unlimited aliases",    type: "check" },
      { label: "Better email delivery",          type: "check" },
      { label: "Free email migration",           type: "check" },
      { label: "24/7 priority support",          type: "star"  },
      { label: "Priority email routing",         type: "check" },
    ],
    ctaLink: "/contact",
  },
];

const FeatureIcon = ({ type }: { type: FeatureType }) => {
  if (type === "check") return <Check className="w-4 h-4 text-green-500 flex-shrink-0" />;
  if (type === "cross") return <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />;
  return <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />;
};

const BusinessEmail = () => {
  const [period, setPeriod] = useState<Period>("48");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="section-container text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-5 border border-primary/20">
            <Mail className="w-4 h-4" /> Business Email Hosting
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            Professional <span className="text-primary">Business Email</span> for Your Domain
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Custom domain email with enterprise-grade security, spam protection, and 99.9% uptime. Trusted by thousands of businesses.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm font-semibold text-muted-foreground">
            {[
              { icon: <Shield className="w-4 h-4 text-primary" />, text: "256-bit Encryption" },
              { icon: <Zap className="w-4 h-4 text-primary" />, text: "99.9% Uptime" },
              { icon: <Globe className="w-4 h-4 text-primary" />, text: "Free Migration" },
              { icon: <Clock className="w-4 h-4 text-primary" />, text: "24/7 Support" },
            ].map((b) => (
              <span key={b.text} className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full border border-border">
                {b.icon} {b.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="section-container">
          {/* Period selector */}
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-3">Commitment Period</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EMAIL_PLANS.map((plan) => {
              const pr = plan.pricing[period];
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border bg-card p-6 flex flex-col transition-all duration-200 ${
                    plan.popular
                      ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.3),0_8px_24px_rgba(0,0,0,0.12)]"
                      : "border-border hover:border-primary/40 hover:shadow-md"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                      Most popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-xl font-black text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{plan.subtitle}</p>
                  </div>

                  {/* Specs */}
                  <div className="flex gap-4 mb-5">
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Shared</p>
                      <p className="text-sm font-bold text-foreground">{plan.storage}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Shared</p>
                      <p className="text-sm font-bold text-foreground">{plan.bw}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-1">
                    {pr.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">₹{pr.originalPrice}/mo</p>
                    )}
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-foreground">₹{pr.price}</span>
                      <span className="text-muted-foreground text-sm mb-1">/month</span>
                    </div>
                    {pr.savePct ? (
                      <>
                        <p className="text-green-500 text-sm font-bold mt-0.5">Save {pr.savePct}% vs monthly</p>
                        <p className="text-muted-foreground text-xs mt-0.5">Pay ₹{pr.upfront?.toLocaleString("en-IN")} upfront · {period} months</p>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-xs mt-0.5">No commitment · cancel anytime</p>
                    )}
                    <p className="text-muted-foreground text-xs italic mt-0.5">Renews at ₹{pr.renewPrice}/mo</p>
                  </div>

                  <Link to={plan.ctaLink} className="mt-5 mb-6">
                    <Button
                      className={`w-full font-bold ${plan.popular ? "btn-gradient" : "variant-outline border-primary text-primary hover:bg-primary/10"}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get started <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 pt-4 border-t border-border">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-2.5 text-sm text-foreground">
                        <FeatureIcon type={f.type} />
                        <span className={f.type === "cross" ? "text-muted-foreground/60" : ""}>{f.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Business Email */}
      <section className="py-16 bg-muted/30">
        <div className="section-container">
          <h2 className="text-3xl font-black text-center mb-10">Why Choose Our Business Email?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Enterprise Security", desc: "256-bit SSL encryption, advanced spam & virus protection on every account." },
              { icon: <Globe className="w-6 h-6" />, title: "Custom Domain", desc: "yourname@yourcompany.com — professional email on your own domain." },
              { icon: <Zap className="w-6 h-6" />, title: "IMAP / POP3 / SMTP", desc: "Works with Outlook, Thunderbird, Apple Mail, and any email client." },
              { icon: <Mail className="w-6 h-6" />, title: "Webmail Access", desc: "Access your email from any browser — no software needed." },
              { icon: <Check className="w-6 h-6" />, title: "Free Migration", desc: "We migrate your existing emails from any provider at no extra cost." },
              { icon: <Clock className="w-6 h-6" />, title: "99.9% Uptime SLA", desc: "Guaranteed uptime with redundant infrastructure and 24/7 monitoring." },
            ].map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">Set up your business email in minutes. No technical knowledge required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-gradient glow-effect px-8 h-12 font-bold text-base">
                Get Business Email <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="px-8 h-12 font-bold text-base border-primary text-primary hover:bg-primary/10">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BusinessEmail;
