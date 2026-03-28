import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { HardDrive, Zap, Shield, Clock, Server, Globe, ArrowRight, Check } from "lucide-react";

const features = [
  { icon: HardDrive, title: "Full Root Access", desc: "Complete control with root SSH access and custom OS choices" },
  { icon: Zap, title: "NVMe SSD Storage", desc: "Ultra-fast NVMe drives for maximum I/O performance" },
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade DDoS mitigation included free" },
  { icon: Clock, title: "Instant Provisioning", desc: "Your VPS is ready within minutes of order" },
  { icon: Server, title: "Dedicated Resources", desc: "Guaranteed CPU, RAM & bandwidth — no overselling" },
  { icon: Globe, title: "Multiple Locations", desc: "Data centers in India, US, Europe & Singapore" },
];

const plans = [
  { name: "VPS 1", price: "₹499", period: "/mo", ram: "2 GB RAM", cpu: "1 vCPU", storage: "40 GB NVMe", bandwidth: "1 TB", highlight: false },
  { name: "VPS 2", price: "₹999", period: "/mo", ram: "4 GB RAM", cpu: "2 vCPU", storage: "80 GB NVMe", bandwidth: "2 TB", highlight: true },
  { name: "VPS 3", price: "₹1,999", period: "/mo", ram: "8 GB RAM", cpu: "4 vCPU", storage: "160 GB NVMe", bandwidth: "4 TB", highlight: false },
  { name: "VPS 4", price: "₹3,999", period: "/mo", ram: "16 GB RAM", cpu: "8 vCPU", storage: "320 GB NVMe", bandwidth: "8 TB", highlight: false },
];

const VPSServer = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>VPS Server India | Managed VPS Hosting | Infinitive Cloud</title>
        <meta name="description" content="High-performance VPS servers with full root access, NVMe SSD, DDoS protection & 99.99% uptime. Starting at ₹499/mo. Infinitive Cloud." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/vps-server" />
      </Helmet>

      <Navigation />

      <main>
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="section-container text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <HardDrive className="w-4 h-4" /> VPS Server
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Powerful <span className="gradient-text">VPS Servers</span> with Full Control
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Enterprise-grade virtual private servers with dedicated resources, NVMe SSD, root access, and 99.99% uptime guarantee. Scale your business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-gradient text-white font-bold px-8">
                  Start 14-Day Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="font-bold px-8">Compare Plans</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="section-container">
            <h2 className="text-3xl font-black text-center mb-12">Why Our VPS Servers?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="card-hover">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground text-sm">{f.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="section-container">
            <h2 className="text-3xl font-black text-center mb-12">VPS Server Plans</h2>
            <div className="grid md:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.highlight ? "border-primary shadow-lg scale-105" : ""}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      Best Value
                    </div>
                  )}
                  <CardContent className="pt-8 text-center">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-black text-primary mb-1">{plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span></div>
                    <div className="space-y-2.5 mt-6 text-sm text-left">
                      {[plan.ram, plan.cpu, plan.storage, `${plan.bandwidth} Bandwidth`, "Free SSL", "DDoS Protection", "24/7 Support"].map((f) => (
                        <div key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0" />{f}</div>
                      ))}
                    </div>
                    <Link to="/contact" className="block mt-6">
                      <Button className={`w-full font-bold ${plan.highlight ? "btn-gradient" : ""}`} variant={plan.highlight ? "default" : "outline"}>
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VPSServer;
