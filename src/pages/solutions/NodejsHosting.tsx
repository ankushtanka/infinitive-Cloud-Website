import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Code, Zap, Shield, Terminal, Server, Globe, ArrowRight, Check } from "lucide-react";

const features = [
  { icon: Code, title: "Node.js Ready", desc: "Pre-installed Node.js with npm/yarn support and version management" },
  { icon: Terminal, title: "SSH & CLI Access", desc: "Full terminal access for deploying and managing your apps" },
  { icon: Zap, title: "Auto-Scaling", desc: "Scale resources automatically based on traffic demands" },
  { icon: Shield, title: "Free SSL & DDoS Protection", desc: "Enterprise-grade security included with every plan" },
  { icon: Server, title: "Git Deployment", desc: "Push to deploy with Git integration and CI/CD pipelines" },
  { icon: Globe, title: "Global Edge Network", desc: "Low-latency delivery with servers across multiple regions" },
];

const plans = [
  { name: "Developer", price: "₹399", period: "/mo", ram: "1 GB RAM", cpu: "1 vCPU", storage: "25 GB SSD", highlight: false },
  { name: "Professional", price: "₹799", period: "/mo", ram: "2 GB RAM", cpu: "2 vCPU", storage: "50 GB SSD", highlight: true },
  { name: "Business", price: "₹1,599", period: "/mo", ram: "4 GB RAM", cpu: "4 vCPU", storage: "100 GB NVMe", highlight: false },
];

const NodejsHosting = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Node.js Hosting India | Deploy Node Apps | Infinitive Cloud</title>
        <meta name="description" content="Fast Node.js hosting with SSH access, Git deployment, auto-scaling & free SSL. Deploy your Node.js applications with Infinitive Cloud." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/nodejs-hosting" />
      </Helmet>

      <Navigation />

      <main>
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="section-container text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Code className="w-4 h-4" /> Node.js Hosting — New
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Deploy <span className="gradient-text">Node.js Apps</span> in Seconds
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Purpose-built hosting for Node.js with SSH access, Git deployment, process managers, and enterprise-grade security. Build and ship faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-gradient text-white font-bold px-8">
                  Start 14-Day Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="font-bold px-8">View Plans</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="section-container">
            <h2 className="text-3xl font-black text-center mb-12">Built for Node.js Developers</h2>
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
            <h2 className="text-3xl font-black text-center mb-12">Node.js Hosting Plans</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.highlight ? "border-primary shadow-lg scale-105" : ""}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="pt-8 text-center">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-black text-primary mb-1">{plan.price}<span className="text-base font-normal text-muted-foreground">{plan.period}</span></div>
                    <div className="space-y-3 mt-6 text-sm text-left">
                      {[plan.ram, plan.cpu, `${plan.storage} Storage`, "Free SSL Certificate", "Git Deployment", "SSH Access", "24/7 Support"].map((f) => (
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

export default NodejsHosting;
