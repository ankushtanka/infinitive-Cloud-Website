import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Server, Globe, Clock, Cpu, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import GPUServerDiagram from "@/components/infographics/GPUServerDiagram";
import LazyVisible from "@/components/LazyVisible";

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
        <meta name="keywords" content="GPU server India, GPU dedicated server, AI server, machine learning server, NVIDIA GPU server" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/gpu-dedicated-server" />
        <meta property="og:title" content="GPU Dedicated Server | AI & High-Performance Computing" />
        <meta property="og:description" content="GPU dedicated servers for AI, rendering, and compute-heavy workloads. NVIDIA GPUs, 99.9% uptime." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/gpu-dedicated-server" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GPU Dedicated Server | AI & High-Performance Computing" />
        <meta name="twitter:description" content="GPU dedicated servers for AI, rendering, and compute-heavy workloads. NVIDIA GPUs, 99.9% uptime." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} aria-hidden />
            <div className="section-container relative z-10 pb-12 lg:pb-20">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold tracking-[0.18em] uppercase">
                    <Cpu className="h-3.5 w-3.5" />
                    Accelerated Compute
                  </span>
                  <h1 className="tracking-tight text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
                    <span className="gradient-text">GPU Dedicated</span> Servers
                    <br />
                    <span className="text-foreground">built for AI at scale.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                    NVIDIA-powered bare-metal GPUs for AI training, inference, 3D rendering, and any workload that needs raw compute. No noisy neighbours — the silicon is yours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact?topic=gpu-dedicated">
                      <Button className="btn-gradient glow-effect h-14 px-8 font-semibold text-base">
                        Get a Quote
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" className="h-14 px-8 font-semibold text-base">Talk to an Expert</Button>
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-sm text-muted-foreground">
                    {[
                      "NVIDIA H100 / A100 / L40S",
                      "Tier-IV Datacenters",
                      "99.9% Uptime SLA",
                      "Setup in minutes",
                    ].map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LazyVisible minHeight={400}><GPUServerDiagram /></LazyVisible>
                </motion.div>
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
