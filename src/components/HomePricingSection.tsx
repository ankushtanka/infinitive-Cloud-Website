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
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {category.plans.map((plan, planIndex) => (
                <Card
                  key={planIndex}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    plan.popular ? "border-primary/50 shadow-primary/10 shadow-md" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                  )}
                  {plan.popular && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-base">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="mb-3">
                      <span className="text-xs text-muted-foreground line-through">{plan.originalPrice}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black gradient-text">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote">
                      <Button
                        size="sm"
                        className={`w-full ${plan.popular ? "btn-gradient" : "variant-outline"}`}
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
