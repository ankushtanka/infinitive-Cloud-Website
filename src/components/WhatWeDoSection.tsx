import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Server, Globe, Shield, Zap, Database, Lock, HardDrive, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Server, title: "Shared Hosting", description: "Affordable cPanel hosting with NVMe SSD, free SSL, and LiteSpeed.", link: "/solutions/shared-hosting" },
  { icon: Zap, title: "VPS Hosting", description: "Full root access with dedicated resources and DDoS protection.", link: "/solutions/vps-hosting" },
  { icon: Cloud, title: "Cloud Hosting", description: "Auto-scaling cloud with dedicated IP and multi-zone failover.", link: "/solutions/cloud-hosting" },
  { icon: HardDrive, title: "Dedicated Servers", description: "Enterprise bare metal servers with Intel Xeon and IPMI access.", link: "/solutions/dedicated-servers" },
  { icon: Database, title: "Reseller Hosting", description: "White-label hosting to start your own business with WHM/cPanel.", link: "/solutions/reseller-hosting" },
  { icon: Globe, title: "WordPress Hosting", description: "Managed WordPress optimized for speed and security.", link: "/solutions/wordpress-hosting" },
  { icon: Lock, title: "SSL Certificates", description: "Free and premium SSL with 256-bit encryption.", link: "/solutions/ssl-certificates" },
  { icon: Globe, title: "Domain Registration", description: "Register .com, .in, and 500+ extensions with free WHOIS privacy.", link: "/solutions/domains" },
  { icon: Server, title: "GPU Dedicated Servers", description: "High-performance GPU servers for AI and rendering workloads.", link: "/solutions/gpu-dedicated-server" },
  { icon: Zap, title: "Streaming Servers", description: "Unlimited streaming for flawless live and on-demand delivery.", link: "/solutions/streaming-servers" },
  { icon: Shield, title: "Server Management", description: "24/7 managed services with monitoring and security patching.", link: "/solutions/server-management" },
  { icon: Cloud, title: "Cloud Migration", description: "Free zero-downtime migration from any hosting provider.", link: "/solutions/cloud-migration" },
];

const WhatWeDoSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Hosting <span className="gradient-text">Services</span>
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
