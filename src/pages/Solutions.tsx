import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Server, Globe, Shield, Zap, Database, Lock, HardDrive, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Solutions = () => {
  const solutions = [
    {
      icon: Server,
      title: "Shared Hosting",
      description: "Affordable cPanel hosting with NVMe SSD, free SSL, and LiteSpeed for blogs and small businesses.",
      link: "/solutions/shared-hosting",
    },
    {
      icon: Zap,
      title: "VPS Hosting",
      description: "Full root access with dedicated resources, NVMe storage, and DDoS protection.",
      link: "/solutions/vps-hosting",
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Auto-scaling cloud infrastructure with dedicated IP, load balancing, and multi-zone failover.",
      link: "/solutions/cloud-hosting",
    },
    {
      icon: HardDrive,
      title: "Dedicated Servers",
      description: "Enterprise-grade bare metal servers with Intel Xeon processors and full IPMI access.",
      link: "/solutions/dedicated-servers",
    },
    {
      icon: Database,
      title: "Reseller Hosting",
      description: "White-label hosting to start your own hosting business with WHM/cPanel access.",
      link: "/solutions/reseller-hosting",
    },
    {
      icon: Globe,
      title: "WordPress Hosting",
      description: "Managed WordPress hosting optimized for speed, security, and seamless performance.",
      link: "/solutions/wordpress-hosting",
    },
    {
      icon: Lock,
      title: "SSL Certificates",
      description: "Free and premium SSL certificates with 256-bit encryption for complete website security.",
      link: "/solutions/ssl-certificates",
    },
    {
      icon: Globe,
      title: "Domain Registration",
      description: "Register .com, .in, and 500+ domain extensions with free WHOIS privacy protection.",
      link: "/solutions/domains",
    },
    {
      icon: Server,
      title: "GPU Dedicated Servers",
      description: "High-performance GPU servers for AI, rendering, and compute-heavy workloads.",
      link: "/solutions/gpu-dedicated-server",
    },
    {
      icon: Zap,
      title: "Streaming Servers",
      description: "Unlimited streaming servers for flawless live and on-demand video delivery.",
      link: "/solutions/streaming-servers",
    },
    {
      icon: Shield,
      title: "Server Management",
      description: "24/7 managed services with monitoring, security patching, and performance optimization.",
      link: "/solutions/server-management",
    },
    {
      icon: Cloud,
      title: "Cloud Migration",
      description: "Free zero-downtime migration from any hosting provider with dedicated support.",
      link: "/solutions/cloud-migration",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hosting Solutions | Cloud, VPS, Dedicated & Shared Hosting - Infinitive Cloud</title>
        <meta name="description" content="Complete hosting solutions including shared hosting, VPS, cloud hosting, dedicated servers, domain registration, SSL certificates, and managed services. Enterprise-grade infrastructure in India." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions" />
      </Helmet>
      
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                Complete <span className="gradient-text">Hosting Solutions</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Everything you need to launch, grow, and scale your online presence. From shared hosting to enterprise dedicated servers — all backed by 99.99% uptime and 24/7 expert support.
              </p>
            </div>
          </section>

          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.title}
                    className="card-hover animate-fade-in-up group"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
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

          <section className="section-container mt-20">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="mb-4">Not Sure Which Solution Is Right for You?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Our hosting experts will recommend the perfect plan based on your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-8">
                      Talk to an Expert
                    </Button>
                  </Link>
                  <Link to="/free-trial">
                    <Button size="lg" variant="outline" className="h-14 px-8 font-semibold">
                      Start Free Trial
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
