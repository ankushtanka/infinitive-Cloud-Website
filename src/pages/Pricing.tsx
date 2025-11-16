import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingCards = [
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure for growing businesses",
      startingFrom: "₹499",
      period: "/month",
      features: [
        "Cloud Servers",
        "VPS & Dedicated Hosting",
        "Auto-scaling",
        "24/7 Support",
        "99.99% Uptime SLA",
      ],
    },
    {
      title: "Web Hosting",
      description: "High-performance hosting optimized for your profession",
      startingFrom: "₹149",
      period: "/month",
      features: [
        "SSD NVMe Storage",
        "Free SSL Certificate",
        "Tier-IV Data Center",
        "Daily Backups",
        "India-based Support",
      ],
    },
    {
      title: "Development Services",
      description: "Custom web and mobile app development",
      startingFrom: "₹25,000",
      period: "/project",
      features: [
        "Website Development",
        "Mobile Apps (iOS/Android)",
        "Custom Software",
        "API Integration",
        "Ongoing Maintenance",
      ],
    },
    {
      title: "AI Solutions",
      description: "Intelligent automation and AI-powered tools",
      startingFrom: "₹999",
      period: "/month",
      features: [
        "AI Chatbots",
        "Workflow Automation",
        "AI Website Builder",
        "Custom AI Models",
        "Analytics Dashboard",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include our commitment to quality, support, and uptime.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section-container mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingCards.map((card, index) => (
              <Card
                key={index}
                className="card-hover animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                <CardHeader>
                  <CardTitle className="text-2xl">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-sm text-muted-foreground">Starting from</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold gradient-text">{card.startingFrom}</span>
                      <span className="text-muted-foreground">{card.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact">
                    <Button className="w-full btn-gradient text-white">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Custom Quote CTA */}
        <section className="section-container">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="mb-4">Need a Custom Solution?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every business is unique. Let's discuss a tailored plan that fits your specific requirements and budget.
              </p>
              <Link to="/contact">
                <Button size="lg" className="btn-gradient text-white font-semibold px-8">
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
