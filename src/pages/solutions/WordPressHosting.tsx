import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Globe, RefreshCw, HardDrive, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const WordPressHosting = () => {
  const features = [
    { icon: Zap, title: "Optimized for Speed", description: "NVMe SSD storage and server-level caching deliver blazing-fast WordPress load times." },
    { icon: Shield, title: "Built-In Security", description: "Malware scanning, firewall protection, and free SSL certificates keep your site safe." },
    { icon: RefreshCw, title: "Automatic Updates", description: "WordPress core, theme, and plugin updates handled automatically so you stay current." },
    { icon: HardDrive, title: "Daily Backups", description: "Automated daily backups with one-click restore — never lose your content." },
    { icon: Globe, title: "Free Migration", description: "We move your existing WordPress site over with zero downtime and no hassle." },
    { icon: Headphones, title: "WordPress Experts on Call", description: "24/7 support from a team that knows WordPress inside and out." },
  ];

  const plans = [
    { name: "QuickWP", sites: "5 websites", storage: "80 GB NVMe", desc: "Perfect for freelancers and personal projects." },
    { name: "XceedWP", sites: "50 websites", storage: "100 GB NVMe", desc: "Scale up with dedicated speed and security." },
    { name: "KickOffWP", sites: "100 websites", storage: "150 GB NVMe", desc: "For agencies handling multiple client sites." },
  ];

  return (
    <>
      <Helmet>
        <title>Managed WordPress Hosting | Fast & Secure - Infinitive Cloud</title>
        <meta name="description" content="Managed WordPress hosting with NVMe storage, automatic updates, daily backups, free SSL, and 24/7 expert support. Plans starting from 5 to 100 websites." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/wordpress-hosting" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                Managed <span className="gradient-text">WordPress Hosting</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                WordPress hosting optimized for speed, security, and hassle-free management. Focus on your content — we handle everything else.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/quote"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get Started</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
              </div>
            </div>
          </section>

          <section className="section-container mb-16">
            <h2 className="text-center mb-12">Why Choose Our <span className="gradient-text">WordPress Hosting</span></h2>
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

          <section className="section-container mb-16">
            <h2 className="text-center mb-12">Hosting <span className="gradient-text">Plans</span></h2>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <Card key={plan.name} className="card-hover animate-fade-in-up text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2 gradient-text">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.desc}</p>
                    <ul className="space-y-2 text-sm text-foreground/80 mb-6">
                      <li>✓ {plan.sites}</li>
                      <li>✓ {plan.storage} storage</li>
                      <li>✓ Free SSL & migration</li>
                      <li>✓ Managed WordPress</li>
                    </ul>
                    <Link to="/quote"><Button className="btn-gradient w-full">Get Quote</Button></Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WordPressHosting;
