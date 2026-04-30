import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, BarChart3, Clock, HardDrive, Headphones, RefreshCw, Server, Settings, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import UniversalOrbitDiagram from "@/components/infographics/UniversalOrbitDiagram";

const services = [
  { icon: Settings, title: "Server Setup & Configuration", description: "Complete server provisioning including OS installation, security hardening, firewall setup, and performance optimization." },
  { icon: Shield, title: "Security & Patch Management", description: "Regular security audits, OS patching, vulnerability scanning, and intrusion detection to keep your server protected." },
  { icon: Activity, title: "24/7 Server Monitoring", description: "Real-time monitoring of CPU, RAM, disk, and network usage with instant alerts and proactive issue resolution." },
  { icon: RefreshCw, title: "Backup & Disaster Recovery", description: "Automated daily backups with offsite storage and tested disaster recovery procedures for business continuity." },
  { icon: Zap, title: "Performance Optimization", description: "Server tuning, caching configuration, database optimization, and load balancing for maximum speed." },
  { icon: Headphones, title: "Dedicated Support Team", description: "A named technical account manager and priority escalation for critical issues affecting your infrastructure." },
];

const ServerManagement = () => {
  return (
    <>
      <Helmet>
        <title>Managed Server Services India | 24/7 Server Management - Infinitive Cloud</title>
        <meta name="description" content="Expert managed server services in India. 24/7 monitoring, security patching, performance optimization, backups, and dedicated support for VPS and dedicated servers." />
        <meta name="keywords" content="managed server India, server management, 24/7 server monitoring, server security, server optimization" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/server-management" />
        <meta property="og:title" content="Managed Server Services India | 24/7 Management" />
        <meta property="og:description" content="Expert managed server services. 24/7 monitoring, security patching, performance optimization." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/server-management" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Managed Server Services India | 24/7 Management" />
        <meta name="twitter:description" content="Expert managed server services. 24/7 monitoring, security patching, performance optimization." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">Managed Server</span> Services
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Let our expert team handle your server infrastructure so you can focus on growing your business. From setup to security to 24/7 monitoring — we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/contact"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get a Quote</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
              </div>
            </div>
          </section>
          {/* Premium animated infographic */}
          <section className="section-container -mt-8 mb-20">
            <div className="max-w-5xl mx-auto animate-fade-in">
              <UniversalOrbitDiagram
                CenterIcon={Settings}
                centerTitle="NOC Operations"
                centerSubtitle="24×7 Monitoring"
                statusLabel="Engineers · on-call"
                metric="24×7"
                badge="Proactive Care"
                uid="serverma"
                nodes={[
                  { icon: Activity, label: "Monitor", angle: 0 },
                  { icon: Shield, label: "Harden", angle: 60 },
                  { icon: RefreshCw, label: "Patch", angle: 120 },
                  { icon: HardDrive, label: "Backup", angle: 180 },
                  { icon: AlertTriangle, label: "Incident", angle: 240 },
                  { icon: BarChart3, label: "Reports", angle: 300 },
                ]}
              />
            </div>
          </section>


          <section className="section-container mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((f, i) => {
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
                <h2 className="mb-4">Need Expert Server Management?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our certified engineers manage your infrastructure with enterprise-grade tools and processes.
                </p>
                <Link to="/contact"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get Custom Quote</Button></Link>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ServerManagement;
