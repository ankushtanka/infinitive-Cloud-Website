import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Star, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Globe,
    title: "Web Hosting",
    description: "Lightning-fast SSD hosting for websites of all sizes",
    plans: [
      {
        name: "Premium",
        originalPrice: "₹1,091",
        price: "₹129",
        period: "/mo",
        popular: false,
        features: ["3 Websites", "20 GB SSD Storage", "Free SSL", "Free Domain", "Weekly Backups"],
      },
      {
        name: "Business",
        originalPrice: "₹1,595",
        price: "₹199",
        period: "/mo",
        popular: true,
        features: ["50 Websites", "50 GB NVMe Storage", "Free SSL & CDN", "Daily Backups", "AI Website Builder"],
      },
    ],
  },
  {
    icon: Zap,
    title: "Cloud Hosting",
    description: "20x more power with dedicated cloud resources",
    plans: [
      {
        name: "Startup",
        originalPrice: "₹2,351",
        price: "₹469",
        period: "/mo",
        popular: false,
        features: ["2 CPU Cores", "4 GB RAM", "100 GB NVMe", "100 Websites", "Dedicated IP"],
      },
      {
        name: "Professional",
        originalPrice: "₹3,527",
        price: "₹699",
        period: "/mo",
        popular: true,
        features: ["4 CPU Cores", "8 GB RAM", "200 GB NVMe", "200 Websites", "Priority Support"],
      },
    ],
  },
  {
    icon: Shield,
    title: "VPS Hosting",
    description: "Full root access with enterprise-grade hardware",
    plans: [
      {
        name: "KVM 1",
        originalPrice: "₹1,175",
        price: "₹335",
        period: "/mo",
        popular: false,
        features: ["1 vCPU Core", "4 GB RAM", "50 GB NVMe", "4 TB Bandwidth", "Free Backups"],
      },
      {
        name: "KVM 2",
        originalPrice: "₹1,511",
        price: "₹469",
        period: "/mo",
        popular: true,
        features: ["2 vCPU Cores", "8 GB RAM", "100 GB NVMe", "8 TB Bandwidth", "Free Snapshots"],
      },
    ],
  },
  {
    icon: Star,
    title: "WordPress Hosting",
    description: "Managed WordPress with AI-powered tools",
    plans: [
      {
        name: "Premium",
        originalPrice: "₹1,091",
        price: "₹129",
        period: "/mo",
        popular: false,
        features: ["3 Websites", "20 GB SSD", "Free SSL", "Auto Updates", "Site Migration"],
      },
      {
        name: "Business + AI",
        originalPrice: "₹1,595",
        price: "₹199",
        period: "/mo",
        popular: true,
        features: ["50 Websites", "50 GB NVMe", "AI Site Builder", "Staging Tool", "Free CDN"],
      },
    ],
  },
];

const HomePricingSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hosting & Cloud <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure at India's most competitive prices. All plans include 24/7 support and 99.9% uptime guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {category.plans.map((plan, planIndex) => (
                <Card
                  key={planIndex}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    plan.popular ? "border-primary/50 shadow-primary/10 shadow-lg ring-1 ring-primary/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                  )}
                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-3 pt-6 px-6">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black gradient-text">{plan.price}</span>
                        <span className="text-base text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote">
                      <Button
                        className={`w-full h-11 text-sm font-bold ${plan.popular ? "btn-gradient" : "variant-outline"}`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/pricing">
            <Button size="lg" variant="outline" className="group">
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
