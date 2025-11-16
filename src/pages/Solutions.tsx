import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Server, Globe, Code, Smartphone, Database, Lock, Sparkles, Zap, Shield } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      division: "Infinitive Cloud",
      icon: Cloud,
      color: "from-primary to-primary-hover",
      services: [
        {
          icon: Server,
          title: "Cloud Servers",
          description: "Scalable cloud infrastructure with automated deployment and management.",
        },
        {
          icon: Database,
          title: "VPS & Dedicated Hosting",
          description: "High-performance virtual and dedicated servers for demanding workloads.",
        },
        {
          icon: Globe,
          title: "Domain Solutions",
          description: "Domain registration, DNS management, and premium domain acquisition.",
        },
        {
          icon: Lock,
          title: "Security & SSL",
          description: "Enterprise-grade SSL certificates and advanced security features.",
        },
      ],
    },
    {
      division: "Hostensity",
      icon: Globe,
      color: "from-accent to-primary",
      services: [
        {
          icon: Zap,
          title: "Profession-Optimized Hosting",
          description: "16+ specialized hosting categories tailored for specific industries.",
        },
        {
          icon: Shield,
          title: "Industry-Specific Security",
          description: "Compliance-ready hosting with industry-specific security protocols.",
        },
        {
          icon: Server,
          title: "High-Performance Infrastructure",
          description: "SSD NVMe storage with Tier-IV data center reliability.",
        },
        {
          icon: Database,
          title: "Managed Services",
          description: "Fully managed hosting with automatic updates and optimizations.",
        },
      ],
    },
    {
      division: "Infinitive DevWorks",
      icon: Code,
      color: "from-primary to-accent",
      services: [
        {
          icon: Globe,
          title: "Website Development",
          description: "Custom websites and web applications built with modern frameworks.",
        },
        {
          icon: Smartphone,
          title: "Mobile App Development",
          description: "Native and cross-platform mobile apps for iOS and Android.",
        },
        {
          icon: Code,
          title: "Custom Software",
          description: "Tailored software solutions for unique business requirements.",
        },
        {
          icon: Database,
          title: "API Integration",
          description: "Seamless third-party integrations and custom API development.",
        },
      ],
    },
    {
      division: "Infinitive AI Labs",
      icon: Sparkles,
      color: "from-accent to-primary-hover",
      services: [
        {
          icon: Sparkles,
          title: "AI Chatbots",
          description: "Intelligent chatbots for customer support and engagement.",
        },
        {
          icon: Zap,
          title: "AI Automation",
          description: "Workflow automation and business process optimization.",
        },
        {
          icon: Globe,
          title: "AI Website Builder",
          description: "AI-powered website creation and content generation.",
        },
        {
          icon: Database,
          title: "Custom AI Models",
          description: "Bespoke AI solutions and machine learning implementations.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Complete <span className="gradient-text">Digital Solutions</span> Ecosystem
            </h1>
            <p className="text-xl text-muted-foreground">
              From infrastructure to innovation—everything your business needs to thrive in the digital age.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <div className="section-container space-y-20">
          {solutions.map((division, divIndex) => {
            const DivIcon = division.icon;
            return (
              <section key={division.division} className="animate-fade-in-up" style={{ animationDelay: `${divIndex * 0.1}s` }}>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${division.color} flex items-center justify-center`}>
                      <DivIcon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="gradient-text">{division.division}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {division.services.map((service, svcIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <Card 
                        key={service.title} 
                        className="card-hover animate-fade-in-up"
                        style={{ animationDelay: `${(divIndex * 0.1) + (svcIndex * 0.05)}s` }}
                      >
                        <CardHeader>
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                            <ServiceIcon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{service.description}</CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <section className="section-container mt-20">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="mb-4">Ready to Transform Your Digital Infrastructure?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how our solutions can accelerate your business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact">
                  <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    Schedule Consultation
                  </button>
                </a>
                <a href="/contact">
                  <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                    Get Custom Quote
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
