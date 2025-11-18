import { Shield, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useParallax } from "@/hooks/use-parallax";

const WhyTrustUsSection = () => {
  const parallaxOffset = useParallax(0.2);
  const proofPoints = [
    {
      icon: Shield,
      metric: "30+ migrations",
      title: "We've Done This Before",
      description: "30+ cloud migrations completed with zero data loss. We know the exact steps to move your business without breaking things."
    },
    {
      icon: Clock,
      metric: "15 min response",
      title: "Support When You Need It",
      description: "Average response time under 15 minutes. When something breaks at 2 AM, we're there to fix it."
    },
    {
      icon: TrendingUp,
      metric: "99.99% uptime",
      title: "Infrastructure That Works",
      description: "99.99% uptime guaranteed with automatic failover. Your site stays online even when servers fail."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Premium background effects with parallax */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.1),transparent_50%)]" 
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]" 
        style={{ transform: `translateY(${-parallaxOffset}px)` }}
      />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="mb-6">
            Why <span className="gradient-text">Trust Us</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Proven track record delivering enterprise-grade solutions to businesses worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={point.title}
                className="card-premium text-center group hover:border-primary/30 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  {/* Premium Icon */}
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center" style={{ boxShadow: 'var(--shadow-medium)' }}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Metric badge */}
                  <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <span className="text-sm font-bold text-primary">{point.metric}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
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
