import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Server, HardDrive, Cpu, Shield, Zap, Lock,
  CheckCircle2, ArrowRight, Network, Settings
} from "lucide-react";

const VPSHosting = () => {
  const features = [
    {
      icon: Cpu,
      title: "Dedicated Resources",
      description: "Guaranteed CPU, RAM, and storage resources exclusively for your applications with no sharing."
    },
    {
      icon: Shield,
      title: "Full Root Access",
      description: "Complete server control with root access to install any software and customize configurations."
    },
    {
      icon: Zap,
      title: "High Performance SSD",
      description: "Ultra-fast NVMe SSD storage delivering exceptional I/O performance for demanding workloads."
    },
    {
      icon: Network,
      title: "Premium Bandwidth",
      description: "Unmetered bandwidth with 1Gbps port speed for seamless data transfer and fast loading."
    },
    {
      icon: Lock,
      title: "Advanced Security",
      description: "DDoS protection, firewall management, and automated security patches for total peace of mind."
    },
    {
      icon: Settings,
      title: "Easy Management",
      description: "Intuitive control panel for server management, monitoring, and one-click application installs."
    }
  ];

  const plans = [
    {
      name: "VPS Starter",
      price: "₹799",
      specs: ["2 vCPU Cores", "4GB RAM", "80GB NVMe SSD", "2TB Bandwidth", "1 IPv4 Address", "Full Root Access"]
    },
    {
      name: "VPS Professional",
      price: "₹1,499",
      specs: ["4 vCPU Cores", "8GB RAM", "160GB NVMe SSD", "4TB Bandwidth", "1 IPv4 Address", "Priority Support"],
      popular: true
    },
    {
      name: "VPS Enterprise",
      price: "₹2,999",
      specs: ["8 vCPU Cores", "16GB RAM", "320GB NVMe SSD", "8TB Bandwidth", "2 IPv4 Addresses", "Dedicated Support"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>VPS Hosting India | Virtual Private Server Hosting - Infinitive Cloud</title>
        <meta name="description" content="Best VPS hosting in India with SSD NVMe storage, full root access, and 99.99% uptime. Powerful virtual private servers starting at ₹799/month. Linux & Windows VPS available." />
        <meta name="keywords" content="VPS hosting India, virtual private server, Linux VPS, Windows VPS, managed VPS, SSD VPS, cheap VPS India, dedicated VPS hosting" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/vps-hosting" />
        <meta property="og:title" content="VPS Hosting India | Virtual Private Server Solutions" />
        <meta property="og:description" content="High-performance VPS hosting with NVMe SSD, full root access, and expert support. Starting at ₹799/month." />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Server className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Virtual Private Servers</span>
              </div>
              <h1 className="mb-6">
                Premium <span className="gradient-text">VPS Hosting</span> India
              </h1>
              <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                High-Performance Virtual Private Servers with Complete Control
              </p>
              <p className="text-base md:text-lg text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience the power of dedicated resources with the flexibility of cloud infrastructure. 
                Our VPS hosting solutions deliver exceptional performance, security, and scalability for 
                businesses requiring more control than shared hosting but without the cost of dedicated servers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-8">
                    Get Started Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="h-14 px-8 font-semibold">
                    Compare Plans
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                VPS <span className="gradient-text">Features</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Enterprise-grade features designed for performance, security, and complete control.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 glow-effect">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Pricing */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                VPS <span className="gradient-text">Pricing Plans</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`card-hover relative ${plan.popular ? 'border-2 border-primary shadow-xl' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full">
                      <span className="text-sm font-bold text-white">Best Value</span>
                    </div>
                  )}
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-black gradient-text">{plan.price}</span>
                      <span className="text-foreground/70">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground/80">{spec}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote">
                      <Button className={`w-full h-12 font-bold ${plan.popular ? 'btn-gradient' : ''}`}>
                        Order Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Understanding VPS Hosting: Your Complete Guide
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Virtual Private Server (VPS) hosting provides a perfect middle ground between shared hosting 
                and dedicated servers. With VPS hosting, you get dedicated resources including CPU, RAM, and 
                storage within a virtualized environment, giving you the power and control of a dedicated 
                server at a fraction of the cost.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 mt-8">
                Who Needs VPS Hosting?
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                VPS hosting is ideal for growing businesses, e-commerce websites, SaaS applications, 
                development environments, and resource-intensive websites that have outgrown shared hosting. 
                If you need guaranteed resources, root access, or the ability to install custom software, 
                VPS hosting is your solution.
              </p>

              <h3 className="text-2xl font-bold mb-4 mt-8">
                Why Choose Infinitive Cloud VPS?
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Our VPS hosting solutions in India combine enterprise-grade hardware, premium network 
                connectivity, and expert 24/7 support. With NVMe SSD storage, you get up to 10x faster 
                performance compared to traditional SATA drives. Plus, our Indian data centers ensure 
                low latency for local audiences while maintaining global accessibility.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="mb-4">Ready to Upgrade to VPS?</h2>
                <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Get started with powerful VPS hosting today. Free server setup and migration included.
                </p>
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-10">
                    Launch Your VPS
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default VPSHosting;
