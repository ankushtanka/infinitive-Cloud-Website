import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Server, HardDrive, Cloud, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: Globe,
    title: "Shared Hosting",
    description: "Reliable hosting for small websites and startups.",
    link: "/solutions/shared-hosting",
  },
  {
    icon: HardDrive,
    title: "VPS Servers",
    description: "High performance virtual servers with dedicated resources.",
    link: "/solutions/vps-hosting",
  },
  {
    icon: Server,
    title: "Dedicated Servers",
    description: "Powerful infrastructure for high traffic websites and enterprise applications.",
    link: "/solutions/dedicated-servers",
  },
  {
    icon: Cloud,
    title: "Cloud Servers",
    description: "Scalable cloud computing resources for modern applications.",
    link: "/solutions/cloud-hosting",
  },
];

const HostingSolutionsSection = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">Our Solutions</p>
          <h2 className="font-bold mb-3">
            Cloud & Hosting Solutions for Every Stage of Growth
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From small websites to enterprise infrastructure — find the right plan for your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Card
                key={solution.title}
                className="card-premium group hover:border-primary/30 overflow-hidden"
              >
                <CardContent className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-heading">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {solution.description}
                  </p>
                  <Link to={solution.link}>
                    <Button variant="ghost" size="sm" className="group/btn text-sm px-0 text-primary hover:text-primary-hover">
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
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

export default HostingSolutionsSection;
