import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Cpu, MemoryStick, HardDrive, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    tagline: "Best for small websites",
    price: "₹79",
    period: "/mo",
    popular: false,
    specs: { cpu: "1 vCPU", ram: "1 GB", storage: "20 GB NVMe", bandwidth: "1 TB" },
    features: ["Free SSL Certificate", "99.99% Uptime SLA", "Email Support"],
  },
  {
    name: "Business",
    tagline: "Best for growing companies",
    price: "₹399",
    period: "/mo",
    popular: true,
    specs: { cpu: "2 vCPU", ram: "4 GB", storage: "80 GB NVMe", bandwidth: "4 TB" },
    features: ["Free SSL & CDN", "Priority Support", "Free Migration"],
  },
  {
    name: "Enterprise",
    tagline: "Best for large applications",
    price: "₹1,199",
    period: "/mo",
    popular: false,
    specs: { cpu: "4 vCPU", ram: "8 GB", storage: "200 GB NVMe", bandwidth: "Unlimited" },
    features: ["Dedicated IP", "24/7 Priority Support", "Custom Configuration"],
  },
];

const specIcons = [
  { key: "cpu", icon: Cpu, label: "CPU" },
  { key: "ram", icon: MemoryStick, label: "RAM" },
  { key: "storage", icon: HardDrive, label: "Storage" },
  { key: "bandwidth", icon: Wifi, label: "Bandwidth" },
] as const;

const HomePricingSection = () => {
  return (
    <section className="py-20 bg-muted/40" id="pricing">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">Pricing Plans</p>
          <h2 className="font-bold mb-3">
            Flexible Hosting Plans for Every Business
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transparent pricing with no hidden fees. All plans include free SSL, 24/7 support, and 99.99% uptime SLA.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/10 scale-[1.02]"
                  : "border-border"
              }`}
              style={{ boxShadow: plan.popular ? "var(--shadow-strong)" : "var(--shadow-soft)" }}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-center text-xs font-bold py-1.5 tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <div className="p-7">
                <h3 className="text-xl font-bold font-heading">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-5">{plan.tagline}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-foreground font-heading">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>

                {/* Specs table */}
                <div className="space-y-2.5 mb-6 p-4 rounded-lg bg-muted/60 border border-border/50">
                  {specIcons.map(({ key, icon: Icon, label }) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="w-3.5 h-3.5 text-primary/60" />
                        {label}
                      </span>
                      <span className="font-semibold text-foreground">{plan.specs[key]}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button
                    className={`w-full h-11 text-sm rounded-lg font-semibold ${
                      plan.popular ? "btn-primary" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Deploy Server
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/pricing">
            <Button variant="ghost" className="group text-sm text-muted-foreground hover:text-foreground">
              View all plans & compare
              <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePricingSection;
