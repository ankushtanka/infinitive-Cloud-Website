import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight, Sparkles, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts, type Product } from "@/lib/whmcs";

const fallbackPlans = [
  { pid: 1, name: "Starter", price_monthly: 79, price_annually: 790, popular: false, features: ["1 Website", "10 GB NVMe Storage", "Free SSL Certificate", "Weekly Backups", "Free Migration", "24/7 Support"] },
  { pid: 2, name: "Business", price_monthly: 199, price_annually: 1990, popular: true, features: ["Unlimited Websites", "50 GB NVMe Storage", "Free SSL & Global CDN", "Daily Backups", "Priority Support", "LiteSpeed Cache"] },
  { pid: 3, name: "Enterprise", price_monthly: 399, price_annually: 3990, popular: false, features: ["Unlimited Websites", "100 GB NVMe Storage", "Dedicated Resources", "Real-time Backups", "White-glove Onboarding", "99.99% Uptime SLA"] },
];

type Billing = "monthly" | "annually" | "4year";

const planIcons = [Sparkles, Crown, Zap];

const HomePricingSection = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<Billing>("4year");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchProducts();
        if (!cancelled && res.result === "success" && Array.isArray(res.products) && res.products.length > 0) {
          const mapped = res.products.map((p: Product, i: number) => ({
            pid: p.pid,
            name: p.name,
            tagline: (p as any).tagline || "",
            price_monthly: p.price_monthly ? parseFloat(p.price_monthly) : null,
            price_annually: p.price_annually ? parseFloat(p.price_annually) : null,
            popular: i === 1,
            features: p.description
              ? p.description.replace(/<[^>]*>/g, "").split(/\n|,|•|✓/).map((s: string) => s.trim()).filter(Boolean).slice(0, 6)
              : [],
          }));
          setPlans(mapped);
        } else {
          setPlans(fallbackPlans);
        }
      } catch {
        setPlans(fallbackPlans);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const formatPrice = (num: number | null) => {
    if (!num || isNaN(num)) return "—";
    return `₹${Math.round(num).toLocaleString("en-IN")}`;
  };

  return (
    <section className="relative py-16 md:py-28 overflow-hidden" id="pricing">
      {/* Premium ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-primary">Engineered Hosting Plans</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-4">
            Premium performance.
            <br />
            <span className="gradient-text italic font-light">Built to scale with you.</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade NVMe infrastructure at India's most competitive prices. Free SSL, 24/7 expert support, and a 99.99% uptime SLA — included with every plan.
          </p>

          {/* Premium billing toggle */}
          <div className="inline-flex items-center gap-1 mt-8 p-1 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-lg flex-wrap justify-center">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 ${
                billing === "monthly"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annually")}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2 ${
                billing === "annually"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annually
              <span className="text-[9px] md:text-[10px] font-bold bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full tracking-wide">SAVE 20%</span>
            </button>
            <button
              onClick={() => setBilling("4year")}
              className={`relative px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 inline-flex items-center gap-2 ${
                billing === "4year"
                  ? "bg-foreground text-background shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              4 Years
              <span className="text-[9px] md:text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full tracking-wide">BEST VALUE</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-8 space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-14 w-32" />
                  {[1, 2, 3, 4].map((j) => <Skeleton key={j} className="h-8 w-full" />)}
                  <Skeleton className="h-12 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = planIcons[index % planIcons.length];
              const price =
                billing === "4year"
                  ? plan.price_annually ? Math.round((plan.price_annually * 0.65) / 12) : null
                  : billing === "annually"
                  ? plan.price_annually
                  : plan.price_monthly;
              const displayPrice = formatPrice(price);
              const period = billing === "annually" ? "/yr" : "/mo";
              const isPopular = plan.popular;

              return (
                <div
                  key={plan.pid || index}
                  className={`group relative ${isPopular ? "md:-my-4" : ""} ${!isPopular ? "hidden md:block" : ""}`}
                >
                  {/* Animated gradient border for popular */}
                  {isPopular && (
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary via-accent to-primary opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />
                  )}

                  <Card
                    className={`relative h-full overflow-hidden rounded-2xl transition-all duration-500 ${
                      isPopular
                        ? "bg-card border-transparent shadow-2xl shadow-primary/20 group-hover:-translate-y-1"
                        : "bg-card/60 backdrop-blur-sm border-border/60 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                    }`}
                  >
                    {/* Most popular ribbon */}
                    {isPopular && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                    )}

                    {/* Inner glow for popular */}
                    {isPopular && (
                      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                    )}

                    <CardContent className="relative p-6 md:p-8">
                      {/* Header with icon + popular badge */}
                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                          isPopular
                            ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30"
                            : "bg-primary/10 text-primary"
                        }`}>
                          <Icon className="w-5 h-5" strokeWidth={2.2} />
                        </div>
                        {isPopular && (
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase bg-foreground text-background px-3 py-1 rounded-full">
                            Most Popular
                          </span>
                        )}
                      </div>

                      {/* Plan name */}
                      <h3 className="font-serif text-2xl md:text-3xl font-bold mb-1 tracking-tight">{plan.name}</h3>
                      {plan.tagline && (
                        <p className="text-xs text-muted-foreground mb-5">{plan.tagline}</p>
                      )}
                      {!plan.tagline && (
                        <p className="text-xs text-muted-foreground mb-5">
                          {index === 0 ? "Perfect to launch your first site" : index === 1 ? "For growing teams & agencies" : "For traffic-heavy & critical apps"}
                        </p>
                      )}

                      {/* Price */}
                      <div className="mb-6 pb-6 border-b border-border/60">
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-5xl md:text-6xl font-black tracking-tighter ${isPopular ? "gradient-text" : "text-foreground"}`}>
                            {displayPrice}
                          </span>
                          <span className="text-base text-muted-foreground font-medium">{period}</span>
                        </div>
                        <p className="text-[11px] md:text-xs text-primary font-semibold mt-2 tracking-wide">
                          {billing === "4year" ? "✦ BILLED EVERY 4 YEARS · BEST VALUE" : "✦ 14-DAY FREE TRIAL · 30-DAY MONEY-BACK"}
                        </p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                        {(plan.features || []).slice(0, 6).map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isPopular ? "bg-gradient-to-br from-primary to-accent" : "bg-primary/15"
                            }`}>
                              <Check className={`w-3 h-3 ${isPopular ? "text-white" : "text-primary"}`} strokeWidth={3} />
                            </div>
                            <span className="text-sm text-foreground/90 leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        to={plan.pid ? `/cart?product=${plan.pid}&name=${encodeURIComponent(plan.name)}&type=shared-hosting&period=${billing === "4year" ? "48" : billing === "annually" ? "12" : "1"}&price=${plan.price_monthly || ''}&annualPrice=${plan.price_annually || ''}` : "/contact"}
                      >
                        <Button
                          className={`w-full h-12 text-sm font-bold rounded-xl group/btn transition-all ${
                            isPopular
                              ? "btn-gradient shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
                              : "bg-foreground text-background hover:bg-foreground/90"
                          }`}
                        >
                          Get Started
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* Trust strip */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> No setup fees</div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Cancel anytime</div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Free migration</div>
          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> 99.99% uptime SLA</div>
        </div>

        <div className="text-center mt-10">
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="group rounded-xl text-sm md:text-base h-12 px-7 border-border/70 hover:border-primary/60 hover:bg-primary/5">
              Compare All Plans & Features
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePricingSection;
