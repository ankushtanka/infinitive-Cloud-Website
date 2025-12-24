import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Server, Globe, Code, Smartphone, Database, Lock, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

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
          link: "/solutions/cloud-hosting"
        },
        {
          icon: Database,
          title: "VPS & Dedicated Hosting",
          description: "High-performance virtual and dedicated servers for demanding workloads.",
          link: "/solutions/vps-hosting"
        },
        {
          icon: Globe,
          title: "Domain Solutions",
          description: "Domain registration, DNS management, and premium domain acquisition.",
          link: "/solutions/cloud-hosting"
        },
        {
          icon: Lock,
          title: "Security & SSL",
          description: "Enterprise-grade SSL certificates and advanced security features.",
          link: "/solutions/cloud-hosting"
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
          link: "/solutions/cloud-hosting"
        },
        {
          icon: Shield,
          title: "Industry-Specific Security",
          description: "Compliance-ready hosting with industry-specific security protocols.",
          link: "/solutions/vps-hosting"
        },
        {
          icon: Server,
          title: "High-Performance Infrastructure",
          description: "SSD NVMe storage with Tier-IV data center reliability.",
          link: "/solutions/cloud-hosting"
        },
        {
          icon: Database,
          title: "Managed Services",
          description: "Fully managed hosting with automatic updates and optimizations.",
          link: "/solutions/vps-hosting"
        },
      ],
    },
    {
      division: "Codesway",
      icon: Code,
      color: "from-primary to-accent",
      services: [
        {
          icon: Globe,
          title: "Website Development",
          description: "Custom websites and web applications built with modern frameworks.",
          link: "/solutions/web-development"
        },
        {
          icon: Smartphone,
          title: "Mobile App Development",
          description: "Native and cross-platform mobile apps for iOS and Android.",
          link: "/solutions/mobile-apps"
        },
        {
          icon: Code,
          title: "Custom Software",
          description: "Tailored software solutions for unique business requirements.",
          link: "/solutions/web-development"
        },
        {
          icon: Database,
          title: "API Integration",
          description: "Seamless third-party integrations and custom API development.",
          link: "/solutions/web-development"
        },
      ],
    },
    {
      division: "CodinAI",
      icon: Sparkles,
      color: "from-accent to-primary-hover",
      services: [
        {
          icon: Sparkles,
          title: "AI Chatbots",
          description: "Intelligent chatbots for customer support and engagement.",
          link: "/solutions/ai-solutions"
        },
        {
          icon: Zap,
          title: "AI Automation",
          description: "Workflow automation and business process optimization.",
          link: "/solutions/ai-solutions"
        },
        {
          icon: Globe,
          title: "AI Website Builder",
          description: "AI-powered website creation and content generation.",
          link: "/solutions/ai-solutions"
        },
        {
          icon: Database,
          title: "Custom AI Models",
          description: "Bespoke AI solutions and machine learning implementations.",
          link: "/solutions/ai-solutions"
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>IT Solutions & Services India | Cloud, Hosting, Web & AI Development</title>
        <meta name="description" content="Comprehensive IT solutions including cloud hosting, VPS servers, web development, mobile apps, and AI services. Enterprise-grade infrastructure and expert support for businesses in India." />
        <meta name="keywords" content="IT solutions India, cloud hosting, VPS hosting, web development, mobile app development, AI solutions, software development company, hosting services India" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions" />
        <meta property="og:title" content="Complete IT Solutions & Services for Modern Businesses" />
        <meta property="og:description" content="Cloud infrastructure, hosting, development, and AI solutions to power your digital transformation." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Solutions - Infinitive Cloud" />
        <meta name="twitter:description" content="Cloud, hosting, development, and AI solutions for businesses." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                Complete <span className="gradient-text">Digital Solutions</span> Ecosystem
              </h1>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                From infrastructure to innovation—everything your business needs to thrive in the digital age. 
                Explore our comprehensive suite of cloud, hosting, development, and AI solutions.
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
                        className="card-hover animate-fade-in-up group"
                        style={{ animationDelay: `${(divIndex * 0.1) + (svcIndex * 0.05)}s` }}
                      >
                        <CardHeader>
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                            <ServiceIcon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
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
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <section className="section-container mt-20">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="mb-4">Ready to Transform Your Digital Infrastructure?</h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                Let's discuss how our solutions can accelerate your business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-8">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link to="/quote">
                  <Button size="lg" variant="outline" className="h-14 px-8 font-semibold">
                    Get Custom Quote
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  </>
  );
};

export default Solutions;
