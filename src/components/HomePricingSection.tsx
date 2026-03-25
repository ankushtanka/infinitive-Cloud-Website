import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Launch",
    tagline: "Everything you need to get started",
    price: "₹79",
    period: "/month",
    subtext: "Billed annually. Transparent, no surge pricing.",
    features: ["1 Website", "10 GB SSD Storage", "Free SSL Certificate", "cPanel Control Panel", "Weekly Backups", "99.99% Uptime SLA"],
    cta: "Start 15‑day trial",
    featured: false,
  },
  {
    name: "Cloud Plus",
    tagline: "Auto‑scaling cloud with dedicated resources and priority support",
    price: "₹1,199",
    period: "/month",
    subtext: "Billed annually. Transparent, no surge pricing.",
    features: ["4 CPU Cores", "8 GB RAM", "200 GB NVMe", "Dedicated IP", "Load Balancer", "Priority support within 2 hours"],
    cta: "Start 15‑day trial",
    featured: true,
  },
  {
    name: "Dedicated Infrastructure",
    tagline: "Bare-metal performance for mission-critical workloads",
    price: "Custom",
    period: "",
    subtext: "Tailored to your requirements.",
    features: ["Intel Xeon Processors", "64+ GB ECC RAM", "NVMe RAID Storage", "Full IPMI Access", "Hardware Firewall", "Dedicated Account Manager"],
    cta: "Talk to an Engineer",
    featured: false,
  },
];

const otherPlans = [
  { name: "Shared Hosting", specs: "From ₹79/mo · SSD · Free SSL", link: "/solutions/shared-hosting" },
  { name: "VPS Hosting", specs: "From ₹399/mo · Full root access", link: "/solutions/vps-hosting" },
  { name: "Cloud Hosting", specs: "From ₹599/mo · Auto-scaling", link: "/solutions/cloud-hosting" },
  { name: "GPU Servers", specs: "AI/ML workloads · NVIDIA GPUs", link: "/solutions/gpu-dedicated-server" },
];

const HomePricingSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background" id="pricing">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Hosting Plans That <span className="gradient-text">Scale With You</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure. All plans include free SSL, 24/7 support, and 99.99% uptime SLA. Annual billing: pay 11 months, get 1 month free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.featured ? "border-accent/40 shadow-lg ring-1 ring-accent/20" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
              )}
              <CardContent className="p-8 md:p-10">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{plan.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{plan.tagline}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{plan.subtext}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button
                    className={`w-full h-12 text-sm ${plan.featured ? "btn-gold" : "btn-gold-outline"}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other plans grid */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-6 font-medium">Also available</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherPlans.map((plan) => (
              <Link key={plan.name} to={plan.link} className="group">
                <div className="p-4 rounded-lg border border-border hover:border-accent/30 transition-colors text-center">
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{plan.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{plan.specs}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePricingSection;
