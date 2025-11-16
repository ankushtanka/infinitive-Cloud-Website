import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Globe, Code, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DivisionsSection = () => {
  const divisions = [
    {
      icon: Cloud,
      name: "Infinitive Cloud",
      tagline: "Cloud & Hosting Division",
      description: "Enterprise-grade cloud servers, VPS, dedicated hosting, domains, SSL, and managed infrastructure.",
      features: ["Cloud Servers", "VPS & Dedicated", "Managed Hosting", "Domain Solutions"],
      color: "from-primary to-primary-hover",
    },
    {
      icon: Globe,
      name: "Hostensity",
      tagline: "Profession-Based Hosting",
      description: "Specialized hosting optimized for 16+ professions with tailored performance and security.",
      features: ["16 Categories", "Optimized Performance", "Industry Security", "Custom Integrations"],
      color: "from-accent to-primary",
    },
    {
      icon: Code,
      name: "Codesway",
      tagline: "Full Development Studio",
      description: "Custom websites, web apps, mobile apps, software development, and API integrations.",
      features: ["Web Development", "Mobile Apps", "Custom Software", "UX/UI Design"],
      color: "from-primary to-accent",
    },
    {
      icon: Sparkles,
      name: "CodinAI",
      tagline: "AI Solutions & Automation",
      description: "AI-powered chatbots, website builders, automation tools, and custom AI model development.",
      features: ["AI Chatbots", "AI Automation", "Custom Models", "Data Analytics"],
      color: "from-accent to-primary-hover",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="mb-4">
            <span className="gradient-text">One Ecosystem</span>, Four Powerhouse Divisions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From infrastructure to innovation, we deliver complete digital transformation under one unified brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {divisions.map((division, index) => {
            const Icon = division.icon;
            return (
              <Card 
                key={division.name} 
                className="card-hover group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${division.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{division.name}</CardTitle>
                  <CardDescription className="text-base">{division.tagline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{division.description}</p>
                  <ul className="space-y-2 mb-4">
                    {division.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center animate-fade-in">
          <Link to="/solutions">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 group">
              Explore All Solutions
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
