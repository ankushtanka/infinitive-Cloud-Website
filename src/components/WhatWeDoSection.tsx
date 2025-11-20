import { Cloud, Server, Globe, Code, Sparkles, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useParallax } from "@/hooks/use-parallax";

const WhatWeDoSection = () => {
  const parallaxOffset = useParallax(0.15);
  const services = [
    {
      icon: Globe,
      title: "Domain",
      description: "Domain registration and management without the headaches.",
      details: [
        "One-click DNS setup — no technical knowledge needed",
        "Free SSL certificates included with every domain"
      ]
    },
    {
      icon: Server,
      title: "Hosting",
      description: "Managed hosting that keeps your site running while you focus on your business.",
      details: [
        "We moved Ajay's retail site to our managed cloud and cut page load time in half",
        "Automatic daily backups — restore any version from the last 30 days"
      ]
    },
    {
      icon: Cloud,
      title: "Cloud",
      description: "We run your apps on infrastructure that scales automatically when traffic spikes.",
      details: [
        "Zero-downtime migrations — we migrate live sites with no business interruption",
        "Auto-scaling handled — your site stays fast during traffic surges"
      ]
    },
    {
      icon: Code,
      title: "Development",
      description: "We build custom web and mobile apps that solve real business problems.",
      details: [
        "Built a booking system for a Surat clinic that cut appointment no-shows by 40%",
        "Fixed deployment workflow for an agency — now they ship updates in minutes, not hours"
      ]
    },
    {
      icon: Mail,
      title: "Email",
      description: "Targeted email campaigns that convert subscribers into customers.",
      details: [
        "Automated drip campaigns — nurture leads while you sleep",
        "A/B testing built-in — optimize subject lines and content for maximum engagement"
      ]
    },
    {
      icon: Sparkles,
      title: "AI",
      description: "Practical AI tools that improve how your team works, not science fiction.",
      details: [
        "Added smart search to an e-commerce site — customers find products 3x faster",
        "Automated support responses for common questions — support team handles 60% fewer tickets"
      ]
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative glow effects with parallax */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" style={{ transform: `translateY(${parallaxOffset}px)` }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" style={{ transform: `translateY(${-parallaxOffset}px)` }} />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="mb-6">
            What <span className="gradient-text">We Do</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
            End-to-end cloud, hosting, development, and AI solutions for businesses ready to scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="card-premium group hover:border-primary/30 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  {/* Icon with gradient background and glow */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center" style={{ boxShadow: 'var(--shadow-medium)' }}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                    {service.description}
                  </p>
                  
                  {/* Premium detail list */}
                  <ul className="space-y-3">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm">
                        <span className="text-primary mt-1 font-bold text-lg">•</span>
                        <span className="text-foreground/80 font-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
