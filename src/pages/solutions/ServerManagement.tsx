import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Server, Shield, Zap, Clock, Settings, Activity, RefreshCw, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

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
        <link rel="canonical" href="https://infinitivecloud.com/solutions/server-management" />
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
                <Link to="/quote"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get a Quote</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
              </div>
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
                <Link to="/quote"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get Custom Quote</Button></Link>
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
