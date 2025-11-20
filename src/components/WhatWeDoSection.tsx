import { Cloud, Server, Globe, Code, Sparkles, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhatWeDoSection = () => {
  const services = [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud servers that grow with your business. Auto-scaling, load balancing, and managed services included."
    },
    {
      icon: Server,
      title: "Web Hosting",
      description: "Fast, reliable hosting with 99.99% uptime. SSD storage, daily backups, and free SSL certificates for all sites."
    },
    {
      icon: Globe,
      title: "Domain Services",
      description: "Simple domain registration and management. One-click DNS setup, domain transfers, and renewal reminders."
    },
    {
      icon: Code,
      title: "Development",
      description: "Custom websites and mobile apps built for your business needs. Modern tech stack with ongoing maintenance."
    },
    {
      icon: Database,
      title: "VPS Servers",
      description: "Dedicated resources with full control. Perfect for growing sites that need more power than shared hosting."
    },
    {
      icon: Sparkles,
      title: "AI Solutions",
      description: "Practical AI tools for automation and insights. Chatbots, content generation, and workflow optimization."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/10 to-background relative">
      <div className="section-container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="mb-4">
            What <span className="gradient-text">We Do</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
            Complete infrastructure and development solutions to power your business online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="card-premium group hover:border-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CardContent className="p-6 md:p-7">
                  <div className="mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {service.description}
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

export default WhatWeDoSection;
