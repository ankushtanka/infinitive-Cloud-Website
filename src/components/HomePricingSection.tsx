import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Star,
    title: "Shared Hosting",
    description: "Perfect for personal websites & small businesses",
    plans: [
      {
        name: "Starter",
        originalPrice: "₹499",
        price: "₹79",
        period: "/mo",
        popular: false,
        features: ["1 Website", "10 GB SSD Storage", "Free SSL Certificate", "Free Domain (1 yr)", "Weekly Backups", "99.99% Uptime SLA"],
      },
      {
        name: "Business",
        originalPrice: "₹999",
        price: "₹199",
        period: "/mo",
        popular: true,
        features: ["Unlimited Websites", "50 GB NVMe Storage", "Free SSL & CDN", "Free Domain (1 yr)", "Daily Backups", "cPanel Control Panel"],
      },
      {
        name: "Enterprise",
        originalPrice: "₹1,999",
        price: "₹399",
        period: "/mo",
        popular: false,
        features: ["Unlimited Websites", "100 GB NVMe Storage", "Free SSL, CDN & IP", "Priority Support", "Real-time Backups", "Staging Environment"],
      },
    ],
  },
  {
    icon: Shield,
    title: "Cloud Hosting",
    description: "Auto-scaling cloud with dedicated resources",
    plans: [
      {
        name: "Cloud Basic",
        originalPrice: "₹2,499",
        price: "₹599",
        period: "/mo",
        popular: false,
        features: ["2 CPU Cores", "4 GB RAM", "80 GB NVMe", "Dedicated IP", "Free SSL & CDN", "Auto-scaling"],
      },
      {
        name: "Cloud Plus",
        originalPrice: "₹4,999",
        price: "₹1,199",
        period: "/mo",
        popular: true,
        features: ["4 CPU Cores", "8 GB RAM", "200 GB NVMe", "Dedicated IP", "Priority Support", "Load Balancer"],
      },
      {
        name: "Cloud Max",
        originalPrice: "₹9,999",
        price: "₹2,499",
        period: "/mo",
        popular: false,
        features: ["8 CPU Cores", "16 GB RAM", "400 GB NVMe", "Dedicated IP", "24/7 Priority Support", "Multi-zone Failover"],
      },
    ],
  },
];

const HomePricingSection = () => {
  return (
    <section className="py-20 bg-muted/30" id="pricing">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Hosting Plans That <span className="gradient-text">Scale With You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure at India's most competitive prices. All plans include free SSL, 24/7 support, 99.99% uptime SLA, and a 15-day free trial.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category, catIndex) => (
            <div key={catIndex}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/10">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.plans.map((plan, planIndex) => (
                  <Card
                    key={planIndex}
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                      plan.popular ? "border-primary/50 shadow-primary/10 shadow-lg ring-2 ring-primary/20 scale-[1.02]" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                    )}
                    {plan.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full uppercase tracking-wider">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="pb-3 pt-8 px-8">
                      <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <div className="mb-6">
                        <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl md:text-5xl font-black gradient-text">{plan.price}</span>
                          <span className="text-base text-muted-foreground">{plan.period}</span>
                        </div>
                        <p className="text-xs text-primary font-medium mt-1">15 Days Free Trial</p>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 bg-muted/50 rounded-lg px-3 py-2">
                            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/quote">
                        <Button
                          className={`w-full h-12 text-sm font-bold ${plan.popular ? "btn-gradient" : ""}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="group text-base">
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
