import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Star, Shield, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts, type Product } from "@/lib/whmcs";

// Fallback static plans used only if API fails
const fallbackPlans = [
  { pid: 1, name: "Starter", price: "₹79", period: "/mo", popular: false, features: ["1 Website", "10 GB SSD Storage", "Free SSL Certificate", "Weekly Backups"] },
  { pid: 2, name: "Business", price: "₹199", period: "/mo", popular: true, features: ["Unlimited Websites", "50 GB NVMe Storage", "Free SSL & CDN", "Daily Backups"] },
  { pid: 3, name: "Enterprise", price: "₹399", period: "/mo", popular: false, features: ["Unlimited Websites", "100 GB NVMe Storage", "Priority Support", "Real-time Backups"] },
];

const HomePricingSection = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");

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
            description: (p as any).short_description || p.description || "",
            price_monthly: p.price_monthly ? parseFloat(p.price_monthly) : null,
            price_annually: p.price_annually ? parseFloat(p.price_annually) : null,
            popular: i === 1, // middle plan
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
    <section className="py-12 md:py-20 bg-muted/30" id="pricing">
      <div className="section-container">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Hosting Plans That <span className="gradient-text">Scale With You</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure at India's most competitive prices. All plans include free SSL, 24/7 support & 99.99% uptime SLA.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 bg-muted rounded-xl p-1 mt-6">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                billing === "monthly" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annually")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                billing === "annually" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
              }`}
            >
              Annually
              <span className="ml-1.5 text-[10px] font-bold bg-emerald-500/15 text-emerald-600 px-1.5 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-3 pt-8 px-8"><Skeleton className="h-6 w-24" /></CardHeader>
                <CardContent className="px-8 pb-8 space-y-4">
                  <Skeleton className="h-12 w-32" />
                  {[1, 2, 3, 4].map((j) => <Skeleton key={j} className="h-8 w-full" />)}
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {plans.map((plan, index) => {
              const price = billing === "annually" ? plan.price_annually : plan.price_monthly;
              const displayPrice = plan.price_monthly ? formatPrice(price) : plan.price;
              const period = billing === "annually" ? "/yr" : "/mo";

              return (
                <Card
                  key={plan.pid || index}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    plan.popular ? "border-primary/50 shadow-primary/10 shadow-lg ring-2 ring-primary/20 md:scale-[1.02]" : "hidden md:block"
                  }`}
                >
                  {plan.popular && <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />}
                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[9px] md:text-[10px] font-bold bg-badge text-badge-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-2 md:pb-3 pt-6 md:pt-8 px-5 md:px-8">
                    <CardTitle className="text-lg md:text-xl font-bold">{plan.name}</CardTitle>
                    {plan.tagline && <p className="text-xs text-muted-foreground">{plan.tagline}</p>}
                  </CardHeader>
                  <CardContent className="px-5 md:px-8 pb-5 md:pb-8">
                    <div className="mb-4 md:mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-5xl font-black gradient-text">{displayPrice}</span>
                        <span className="text-sm md:text-base text-muted-foreground">{period}</span>
                      </div>
                      <p className="text-xs text-primary font-medium mt-1">14-Day Free Trial · 30-Day Money-Back</p>
                    </div>
                    <ul className="space-y-2 md:space-y-3 mb-5 md:mb-8">
                      {(plan.features || []).slice(0, 6).map((feature: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 md:gap-3 bg-muted/50 rounded-lg px-2.5 md:px-3 py-1.5 md:py-2">
                          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                          </div>
                          <span className="text-xs md:text-sm font-medium text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={plan.pid ? `/cart?product=${plan.pid}&name=${encodeURIComponent(plan.name)}&type=shared-hosting` : "/contact"}>
                      <Button
                        className={`w-full h-11 md:h-12 text-sm font-bold ${plan.popular ? "btn-gradient" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8 md:mt-14">
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="group text-sm md:text-base">
              View All Plans & Compare
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePricingSection;
