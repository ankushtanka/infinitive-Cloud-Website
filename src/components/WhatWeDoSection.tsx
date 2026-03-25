import { Cloud, Server, Globe, Shield, Database, Lock, HardDrive, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Server, title: "Web Hosting", link: "/solutions/shared-hosting" },
  { icon: Cloud, title: "Cloud Hosting", link: "/solutions/cloud-hosting" },
  { icon: HardDrive, title: "Dedicated Servers", link: "/solutions/dedicated-servers" },
  { icon: Globe, title: "WordPress Hosting", link: "/solutions/wordpress-hosting" },
  { icon: Lock, title: "SSL & Security", link: "/solutions/ssl-certificates" },
  { icon: Shield, title: "Server Management", link: "/solutions/server-management" },
  { icon: Database, title: "Reseller Hosting", link: "/solutions/reseller-hosting" },
  { icon: Server, title: "GPU Servers", link: "/solutions/gpu-dedicated-server" },
  { icon: Globe, title: "Domain Registration", link: "/solutions/domains" },
];

const WhatWeDoSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Our <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Everything you need to launch, grow, and scale your online presence.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} to={service.link} className="group">
                <div className="p-6 md:p-8 rounded-lg border border-border bg-card hover:border-accent/30 transition-all text-center group-hover:-translate-y-1 duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent mx-auto mb-3" />
                  <p className="text-xs md:text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{service.title}</p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
