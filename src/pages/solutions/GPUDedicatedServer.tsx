import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Server, Globe, Clock, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const GPUDedicatedServer = () => {
  const features = [
    { icon: Cpu, title: "High-End GPU Power", description: "Intel Xeon processors with NVIDIA GPUs for AI training, rendering, and compute-intensive tasks." },
    { icon: Shield, title: "DDoS Protection", description: "Enterprise-grade DDoS mitigation keeps your server safe from attacks around the clock." },
    { icon: Globe, title: "Up to 100 TB Bandwidth", description: "Massive bandwidth allocation so your applications never hit a ceiling." },
    { icon: Server, title: "Up to 96 GB RAM", description: "Handle demanding workloads with generous memory for databases, VMs, and more." },
    { icon: Clock, title: "99.9% Uptime Guarantee", description: "Tier-IV data centers ensure your server stays online when it matters most." },
    { icon: Zap, title: "Instant Setup", description: "Your GPU dedicated server is provisioned and ready within minutes, not days." },
  ];

  return (
    <>
      <Helmet>
        <title>GPU Dedicated Server | High-Performance Computing - Infinitive Cloud</title>
        <meta name="description" content="High-performance GPU dedicated servers with 99.9% uptime, DDoS protection, up to 96 GB RAM and 100 TB bandwidth. Ideal for AI, rendering, and compute-heavy workloads." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/gpu-dedicated-server" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">GPU Dedicated</span> Servers
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                High-performance GPU servers built for AI training, 3D rendering, video processing, and any workload that demands raw computing power. No shared resources — the entire server is yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/quote">
                  <Button className="btn-gradient glow-effect font-bold h-14 px-8">Get a Quote</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="section-container mb-16">
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
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GPUDedicatedServer;
