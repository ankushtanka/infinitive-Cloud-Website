import { Shield, Clock, TrendingUp, Server, Headphones, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyTrustUsSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: "Reliability & 99.99% Uptime",
      description: "Our infrastructure is built for zero downtime. Enterprise-grade hardware with automatic failover ensures your site is always online.",
    },
    {
      icon: Headphones,
      title: "Customer-First Support",
      description: "Average response time under 15 minutes. When something breaks at 2 AM, our team of certified engineers is there to fix it.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Start small and grow big. Upgrade resources instantly without migration or downtime — your hosting grows with your business.",
    },
    {
      icon: Eye,
      title: "Proactive Monitoring",
      description: "24/7 server monitoring with automated alerts. We detect and resolve issues before they affect your website visitors.",
    },
    {
      icon: Clock,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprise charges. What you see is what you pay. Cancel anytime with our hassle-free refund policy.",
    },
    {
      icon: Server,
      title: "Green Hosting Infrastructure",
      description: "Our data centres are powered by energy-efficient hardware. Sustainable hosting without compromising on performance.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Infinitive Cloud</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by 1,000+ businesses across India. Here's why companies choose us for their hosting needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="card-premium group hover:border-primary/30 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="relative inline-flex mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center" style={{ boxShadow: 'var(--shadow-medium)' }}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUsSection;
