import { Shield, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyTrustUsSection = () => {
  const proofPoints = [
    {
      icon: Shield,
      metric: "99.99%",
      title: "Reliable Infrastructure",
      description: "Enterprise-grade uptime with automatic failover and monitoring. Your services stay online even when issues arise."
    },
    {
      icon: Clock,
      metric: "24/7",
      title: "Always Here to Help",
      description: "Round-the-clock expert support with fast response times. Real people who understand your business needs."
    },
    {
      icon: TrendingUp,
      metric: "5+ Years",
      title: "Proven Track Record",
      description: "Successfully serving businesses across India with scalable solutions that grow alongside your success."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/10 relative">
      <div className="section-container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            Trusted by businesses for reliable infrastructure and expert support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={point.title}
                className="card-premium text-center group hover:border-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-7">
                  {/* Icon */}
                  <div className="inline-flex mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-primary/10 mb-4">
                    <span className="text-sm font-semibold text-primary">{point.metric}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {point.description}
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
