import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    tagline: "Best for small websites",
    price: "₹79",
    period: "/mo",
    popular: false,
    features: ["1 vCPU Core", "1 GB RAM", "20 GB NVMe Storage", "1 TB Bandwidth", "Free SSL Certificate", "99.99% Uptime SLA"],
  },
  {
    name: "Business",
    tagline: "Best for growing companies",
    price: "₹399",
    period: "/mo",
    popular: true,
    features: ["2 vCPU Cores", "4 GB RAM", "80 GB NVMe Storage", "4 TB Bandwidth", "Free SSL & CDN", "Priority Support"],
  },
  {
    name: "Enterprise",
    tagline: "Best for large applications",
    price: "₹1,199",
    period: "/mo",
    popular: false,
    features: ["4 vCPU Cores", "8 GB RAM", "200 GB NVMe Storage", "Unlimited Bandwidth", "Dedicated IP", "24/7 Priority Support"],
  },
];

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

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary ring-1 ring-primary/20"
                  : "border-border"
              }`}
              style={{ boxShadow: plan.popular ? "var(--shadow-medium)" : "var(--shadow-soft)", borderRadius: "12px" }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
              )}
              <CardContent className="p-7">
                {plan.popular && (
                  <span className="inline-block text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold font-heading">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-foreground font-heading">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-7">
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
                    className={`w-full h-10 text-sm rounded-lg ${
                      plan.popular ? "btn-primary" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Deploy Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
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
