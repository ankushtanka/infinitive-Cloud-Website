import { Cloud, Server, Globe, Shield, HardDrive, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const WhatWeDoSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Shared Hosting",
      description: "Lightning-fast SSD hosting for websites of all sizes. Free SSL, daily backups, and one-click installers.",
      link: "/solutions/shared-hosting",
    },
    {
      icon: Server,
      title: "VPS Hosting",
      description: "Full root access with dedicated resources. Scale your server on demand with guaranteed performance.",
      link: "/solutions/vps-hosting",
    },
    {
      icon: Cloud,
      title: "Cloud Hosting",
      description: "Auto-scaling cloud infrastructure with load balancing, dedicated IPs, and multi-zone redundancy.",
      link: "/solutions/cloud-hosting",
    },
    {
      icon: HardDrive,
      title: "Dedicated Servers",
      description: "Enterprise-grade bare metal servers with full hardware control, IPMI access, and managed support.",
      link: "/solutions/dedicated-servers",
    },
    {
      icon: Shield,
      title: "SSL Certificates",
      description: "Secure your website with industry-standard SSL encryption. Free SSL with all hosting plans.",
      link: "/solutions/ssl-certificates",
    },
    {
      icon: Headphones,
      title: "Server Management",
      description: "Let our experts handle server security, updates, monitoring, and optimization — 24/7.",
      link: "/solutions/server-management",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Hosting <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build, launch, and scale your online presence — from shared hosting to enterprise dedicated servers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link to={service.link} key={service.title}>
                <Card
                  className="card-premium group hover:border-primary/30 h-full animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CardContent className="p-8">
                    <div className="relative mb-5">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center" style={{ boxShadow: 'var(--shadow-medium)' }}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
