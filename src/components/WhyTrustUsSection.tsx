import { Shield, Clock, Award } from "lucide-react";

const WhyTrustUsSection = () => {
  const proofPoints = [
    {
      icon: Clock,
      title: "Support within 15 min",
      description: "Our 24/7 Indian support desk answers within 15 minutes. Real people, not bots. Based in Ahmedabad with technical expertise to solve hosting issues fast."
    },
    {
      icon: Shield,
      title: "30+ migrations, zero data loss",
      description: "We've migrated 30+ businesses in the last 12 months without losing a single file. Every migration includes verification testing and rollback insurance."
    },
    {
      icon: Award,
      title: "Zero-downtime commitment",
      description: "We guarantee your site stays live during migrations. If we cause downtime, you get 3 months of hosting free. That's how confident we are in our process."
    }
  ];

  return (
    <section className="section-container py-20 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-[36px] md:text-[40px] mb-4">
            Why trust us with your business
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We back our promises with real accountability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {proofPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="text-center p-8 bg-background rounded-xl border border-border hover:border-primary/50 transition-all card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUsSection;
