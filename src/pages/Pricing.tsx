import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star, Zap, Globe, Server, Cpu, Mail, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";
import { useState, useMemo } from "react";
import { useWhmcsProducts, WhmcsProduct } from "@/hooks/use-whmcs-products";
import { PRODUCT_CATEGORIES, PlanConfig } from "@/config/whmcs-products";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "web-hosting": Globe,
  "cloud-hosting": Zap,
  "vps-hosting": Server,
  "wordpress-hosting": Palette,
  "email-hosting": Mail,
  "reseller-hosting": Cpu,
};

function getWhmcsMonthlyPrice(product: WhmcsProduct | undefined): number | null {
  const raw = product?.pricing?.INR?.monthly;
  const n = parseFloat(raw ?? "");
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function getWhmcsAnnualPrice(product: WhmcsProduct | undefined): number | null {
  const raw = product?.pricing?.INR?.annually;
  const n = parseFloat(raw ?? "");
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

function buildCartUrl(
  pid: number,
  name: string,
  cartType: string,
  monthly: number,
  annually: number
): string {
  return `/cart?product=${pid}&name=${encodeURIComponent(name)}&type=${encodeURIComponent(cartType)}&price=${monthly}&annualPrice=${annually}`;
}

interface PlanCardProps {
  plan: PlanConfig;
  whmcsProduct: WhmcsProduct | undefined;
  cartType: string;
  index: number;
}

const PlanCard = ({ plan, whmcsProduct, cartType, index }: PlanCardProps) => {
  const liveMonthly = getWhmcsMonthlyPrice(whmcsProduct);
  const liveAnnual = getWhmcsAnnualPrice(whmcsProduct);

  const monthly = liveMonthly ?? plan.fallbackMonthly;
  const annually = liveAnnual ?? plan.fallbackAnnually;
  const isLive = liveMonthly !== null;

  const cartUrl =
    plan.pid !== null
      ? buildCartUrl(plan.pid, plan.name, cartType, monthly, annually)
      : "/contact";

  const savePct = Math.round(100 - (annually / (monthly * 12)) * 100);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up ${
        plan.popular ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
      )}
      {plan.popular && (
        <div className="absolute top-4 right-4">
          <span className="text-[9px] md:text-[10px] font-bold bg-badge text-badge-foreground px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
            <Star className="w-2.5 h-2.5" /> Most Popular
          </span>
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <span className="text-sm text-muted-foreground line-through">
            {formatINR(plan.originalPrice)}/mo
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-4xl font-black gradient-text">{formatINR(monthly)}</span>
            <span className="text-muted-foreground">/mo</span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {savePct > 0 && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Save {savePct}% annually
              </span>
            )}
            {isLive && (
              <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                Live price
              </span>
            )}
          </div>
        </div>

        {plan.specs && (
          <div className="flex flex-wrap gap-2 mb-4">
            {plan.specs.map((spec, i) => (
              <span key={i} className="text-xs font-medium bg-muted px-2 py-1 rounded-md">
                {spec}
              </span>
            ))}
          </div>
        )}

        <ul className="space-y-2 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to={cartUrl}>
          <Button
            className={`w-full ${plan.popular ? "btn-gradient" : ""}`}
            variant={plan.popular ? "default" : "outline"}
          >
            {plan.pid !== null ? "Get Started" : "Contact Us"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState("web-hosting");

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Pricing", url: "https://infinitivecloud.com/pricing" },
  ]);

  const allPids = useMemo(
    () =>
      PRODUCT_CATEGORIES.flatMap((c) => c.plans.map((p) => p.pid)).filter(
        (pid): pid is number => pid !== null
      ),
    []
  );

  const { products } = useWhmcsProducts(allPids);

  const productMap = useMemo(() => {
    const map = new Map<number, WhmcsProduct>();
    products.forEach((p) => map.set(p.pid, p));
    return map;
  }, [products]);

  const currentCategory = PRODUCT_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Pricing - Affordable Cloud Hosting, VPS, WordPress & Reseller Hosting India</title>
        <meta
          name="description"
          content="India's most affordable hosting plans. Web hosting from ₹129/mo, Cloud from ₹469/mo, VPS from ₹335/mo, WordPress from ₹129/mo. 99.9% uptime, 24/7 support."
        />
        <meta
          name="keywords"
          content="web hosting pricing India, cloud hosting plans, VPS hosting cost, WordPress hosting price, reseller hosting India, cheap hosting India"
        />
        <link rel="canonical" href="https://infinitivecloud.com/pricing" />
        <meta property="og:title" content="Affordable Hosting Plans - Infinitive Cloud" />
        <meta property="og:description" content="Web hosting from ₹129/mo, Cloud from ₹469/mo, VPS from ₹335/mo. Enterprise features at India's best prices." />
        <meta property="og:url" content="https://infinitivecloud.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing - Infinitive Cloud" />
        <meta name="twitter:description" content="Affordable cloud, VPS, WordPress & reseller hosting in India." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>

      <StructuredData data={breadcrumbSchema} />

      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-12">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade hosting at India's most competitive prices. All plans include free SSL, 24/7 support & 99.9% uptime guarantee.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="section-container mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {PRODUCT_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? Server;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.title}
                </button>
              );
            })}
          </div>
        </section>

        {/* Plans Grid */}
        <section className="section-container mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{currentCategory.title}</h2>
            <p className="text-muted-foreground">{currentCategory.description}</p>
          </div>

          <div
            className={`grid grid-cols-1 gap-8 ${
              currentCategory.plans.length === 2
                ? "md:grid-cols-2 max-w-3xl mx-auto"
                : currentCategory.plans.length === 4
                ? "md:grid-cols-2 lg:grid-cols-4"
                : "md:grid-cols-3"
            }`}
          >
            {currentCategory.plans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                whmcsProduct={plan.pid !== null ? productMap.get(plan.pid) : undefined}
                cartType={currentCategory.cartType}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Features Banner */}
        <section className="section-container mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "99.9% Uptime", desc: "Guaranteed SLA" },
              { label: "24/7 Support", desc: "Expert Help Always" },
              { label: "Free SSL", desc: "On All Plans" },
              { label: "30-Day Refund", desc: "Money-Back Guarantee" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-muted/50">
                <div className="text-lg font-bold text-foreground">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Quote CTA */}
        <section className="section-container">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="mb-4">Need a Custom Solution?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every business is unique. Get a tailored hosting plan with custom resources, managed services, and dedicated support.
              </p>
              <Link to="/contact">
                <Button size="lg" className="btn-gradient font-semibold px-8">
                  Request Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
