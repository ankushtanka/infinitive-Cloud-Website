import { Cloud, Server, Globe, Code, Sparkles } from "lucide-react";

const WhatWeDoSection = () => {
  const services = [
    {
      icon: Cloud,
      title: "Cloud",
      description: "We run your apps on infrastructure that scales automatically when traffic spikes.",
      bullets: [
        "Zero-downtime migrations — we migrate live sites with no business interruption",
        "Auto-scaling handled — your site stays fast during traffic surges"
      ]
    },
    {
      icon: Server,
      title: "Hosting",
      description: "Managed hosting that keeps your site running while you focus on your business.",
      bullets: [
        "We moved Ajay's retail site to our managed cloud and cut page load time in half",
        "Automatic daily backups — restore any version from the last 30 days"
      ]
    },
    {
      icon: Globe,
      title: "Domains",
      description: "Domain registration and management without the headaches.",
      bullets: [
        "One-click DNS setup — no technical knowledge needed",
        "Free SSL certificates included with every domain"
      ]
    },
    {
      icon: Code,
      title: "Development",
      description: "We build custom web and mobile apps that solve real business problems.",
      bullets: [
        "Built a booking system for a Surat clinic that cut appointment no-shows by 40%",
        "Fixed deployment workflow for an agency — now they ship updates in minutes, not hours"
      ]
    },
    {
      icon: Sparkles,
      title: "AI",
      description: "Practical AI tools that improve how your team works, not science fiction.",
      bullets: [
        "Added smart search to an e-commerce site — customers find products 3x faster",
        "Automated support responses for common questions — support team handles 60% fewer tickets"
      ]
    }
  ];

  return (
    <section className="section-container py-20 bg-gradient-subtle">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-[36px] md:text-[40px] mb-4">
            What we do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five services. All designed to keep your business running smoothly.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
