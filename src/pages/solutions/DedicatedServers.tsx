import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Server, Shield, Zap, HardDrive, Globe, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const plans = [
  {
    name: "Entry",
    price: "₹3,999",
    period: "/mo",
    originalPrice: "₹7,999",
    popular: false,
    specs: "Intel Xeon E-2236 • 16 GB DDR4",
    features: ["6 Core / 12 Threads", "16 GB DDR4 ECC RAM", "500 GB NVMe SSD", "10 TB Bandwidth", "Free Setup & IPMI", "99.99% Uptime SLA"],
  },
  {
    name: "Business",
    price: "₹7,999",
    period: "/mo",
    originalPrice: "₹14,999",
    popular: true,
    specs: "Intel Xeon E-2288G • 32 GB DDR4",
    features: ["8 Core / 16 Threads", "32 GB DDR4 ECC RAM", "1 TB NVMe SSD", "Unlimited Bandwidth", "DDoS Protection", "Managed Support"],
  },
  {
    name: "Enterprise",
    price: "₹14,999",
    period: "/mo",
    originalPrice: "₹29,999",
    popular: false,
    specs: "Dual Xeon Gold • 64 GB DDR4",
    features: ["16+ Cores / 32 Threads", "64 GB DDR4 ECC RAM", "2x 1TB NVMe RAID-1", "Unlimited Bandwidth", "Hardware Firewall", "24/7 Fully Managed"],
  },
];

const features = [
  { icon: Server, title: "Bare Metal Performance", description: "Dedicated hardware with no virtualization overhead. Full CPU, RAM, and storage exclusively for your workloads." },
  { icon: Shield, title: "Enterprise Security", description: "Hardware firewalls, DDoS protection, and full IPMI/KVM access for complete server control." },
  { icon: Zap, title: "NVMe SSD Storage", description: "Ultra-fast NVMe drives with RAID options for maximum speed and data redundancy." },
  { icon: HardDrive, title: "Custom Configurations", description: "Need specific hardware? We offer fully customizable server configurations to match your exact requirements." },
  { icon: Globe, title: "Multiple Data Centers", description: "Choose from data center locations across India, US, and Europe for optimal latency and compliance." },
  { icon: Headphones, title: "Managed or Unmanaged", description: "Choose fully managed with 24/7 support, or unmanaged with full root access for maximum control." },
];

const DedicatedServers = () => {
  return (
    <>
      <Helmet>
        <title>Dedicated Servers India | Bare Metal from ₹3,999/mo - Infinitive Cloud</title>
        <meta name="description" content="Enterprise-grade dedicated servers in India starting at ₹3,999/mo. Intel Xeon processors, NVMe SSD, DDoS protection, 99.99% uptime SLA, and 24/7 managed support." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/dedicated-servers" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">Dedicated Servers</span> for Maximum Performance
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Enterprise-grade bare metal servers with full root access, NVMe SSD storage, and 99.99% uptime SLA. Built for high-traffic websites, applications, and compute-intensive workloads.
              </p>
            </div>
          </section>

          <section className="section-container mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <Card
                  key={plan.name}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up ${
                    plan.popular ? "border-primary/50 shadow-primary/10 shadow-lg ring-2 ring-primary/20 scale-[1.02]" : ""
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {plan.popular && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                      </div>
                    </>
                  )}
                  <CardContent className="p-8 pt-10">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{plan.specs}</p>
                    <div className="mb-6">
                      <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black gradient-text">{plan.price}</span>
                        <span className="text-base text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote">
                      <Button className={`w-full h-12 font-bold ${plan.popular ? "btn-gradient" : ""}`} variant={plan.popular ? "default" : "outline"}>
                        Configure Server
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="section-container mb-20">
            <h2 className="text-center mb-12">Why Our <span className="gradient-text">Dedicated Servers</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="py-12 text-center">
                <h2 className="mb-4">Need a Custom Server?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Tell us your requirements and we'll build a dedicated server configuration tailored to your workload.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/quote"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get Custom Quote</Button></Link>
                  <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
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

export default DedicatedServers;
