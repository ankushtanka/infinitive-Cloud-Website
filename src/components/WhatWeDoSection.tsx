import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Server, Globe, Shield, Zap, Database, Lock, HardDrive, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  {
    icon: Server,
    title: "Web Hosting",
    description: "Reliable hosting with fast SSD, free SSL, and 99.99% uptime.",
    link: "/solutions/shared-hosting",
  },
  {
    icon: HardDrive,
    title: "Servers",
    description: "Enterprise-grade dedicated and VPS servers with managed hardware.",
    link: "/solutions/dedicated-servers",
  },
  {
    icon: Lock,
    title: "Email & Security",
    description: "Professional email, SSL certificates, and advanced security.",
    link: "/solutions/email-security",
  },
  {
    icon: Globe,
    title: "WordPress Hosting",
    description: "Optimized WordPress hosting with one-click installs and speed.",
    link: "/solutions/wordpress-hosting",
  },
  {
    icon: Shield,
    title: "Server Management",
    description: "24/7 monitoring, updates, and proactive support by engineers.",
    link: "/solutions/server-management",
  },
  {
    icon: Database,
    title: "Reseller Hosting",
    description: "White-label reseller plans with WHM/cPanel and priority support.",
    link: "/solutions/reseller-hosting",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Auto-scaling cloud with high availability and secure infrastructure.",
    link: "/solutions/cloud-hosting",
  },
  {
    icon: Server,
    title: "GPU Servers",
    description: "GPU servers for AI, ML, and high-performance workloads.",
    link: "/solutions/gpu-dedicated-server",
  },
  {
    icon: Globe,
    title: "Domain Registration",
    description: "500+ extensions with free WHOIS privacy and instant activation.",
    link: "/solutions/domains",
  },
];

const WhatWeDoSection = () => {
  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to launch, grow, and scale your online presence.
          </p>
        </div>

        {/* Mobile: compact list, Desktop: card grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="card-hover group">
                <CardHeader>
                  <Link to={service.link} className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform cursor-pointer">
                    <Icon className="w-6 h-6 text-white" />
                  </Link>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <Link to={service.link}>
                    <Button variant="ghost" className="w-full justify-between group/btn">
                      Learn More About {service.title}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile: compact list */}
        <div className="md:hidden space-y-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} to={service.link}>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground">{service.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{service.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;