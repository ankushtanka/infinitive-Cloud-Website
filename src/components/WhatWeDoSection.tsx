import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Server, Globe, Shield, Zap, Database, Lock, HardDrive, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Server,
    title: "Web Hosting",
    description: "Reliable web hosting solutions with fast SSD storage, free SSL, and 99.99% uptime – ideal for websites of all sizes.",
    link: "/solutions/shared-hosting",
  },
  {
    icon: HardDrive,
    title: "Servers",
    description: "Enterprise-grade dedicated and VPS servers featuring robust security, scalable resources, and managed hardware.",
    link: "/solutions/dedicated-servers",
  },
  {
    icon: Lock,
    title: "Email & Security",
    description: "Professional business email, anti-spam protection, advanced firewalls, DDoS protection, and SSL certificates for complete security.",
    link: "/solutions/email-security",
  },
  {
    icon: Globe,
    title: "WordPress Hosting",
    description: "Optimized managed WordPress hosting with one-click installs, blazing speed, and automated security updates.",
    link: "/solutions/wordpress-hosting",
  },
  {
    icon: Shield,
    title: "Server Management",
    description: "24/7 server management, monitoring, updates, and proactive support by certified engineers for seamless performance.",
    link: "/solutions/server-management",
  },
  {
    icon: Database,
    title: "Reseller Hosting",
    description: "Launch your hosting business with powerful, white-label reseller plans complete with WHM/cPanel and priority support.",
    link: "/solutions/reseller-hosting",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Flexible cloud solutions with high availability, auto-scaling, and secure multi-zone infrastructure for every workload.",
    link: "/solutions/cloud-hosting",
  },
  {
    icon: Server,
    title: "GPU Servers",
    description: "Accelerated GPU servers tailored for AI, ML, scientific computing, and high-performance workloads.",
    link: "/solutions/gpu-dedicated-server",
  },
  {
    icon: Globe,
    title: "Domain Registration",
    description: "Register your domain from 500+ extensions with free WHOIS privacy, DNS management, and instant activation.",
    link: "/solutions/domains",
  },
];

const WhatWeDoSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to launch, grow, and scale your online presence — all backed by 99.99% uptime and 24/7 expert support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="card-hover group"
              >
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
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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
