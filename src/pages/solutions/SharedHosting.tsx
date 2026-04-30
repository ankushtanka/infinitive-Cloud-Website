import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Database, Globe, HardDrive, Headphones, Loader2, Mail, Server, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import UniversalOrbitDiagram from "@/components/infographics/UniversalOrbitDiagram";
import { useWhmcsProducts } from "@/hooks/use-whmcs-products";
import { useMemo } from "react";

const SHARED_HOSTING_PIDS = [1, 2, 3];

const features = [
  { icon: HardDrive, title: "NVMe SSD Storage", description: "Lightning-fast NVMe drives deliver up to 10x faster read/write speeds for superior website performance." },
  { icon: Zap, title: "LiteSpeed Web Server", description: "Industry-leading LiteSpeed technology with built-in caching for maximum page load speed and better SEO." },
  { icon: Shield, title: "Imunify360 Security", description: "Enterprise-level protection with automated malware scanning, DDoS protection, and real-time threat detection." },
  { icon: Server, title: "cPanel Control Panel", description: "The world's most trusted hosting control panel for easy management of files, databases, domains, and emails." },
  { icon: Globe, title: "Free SSL Certificates", description: "Every domain gets a free SSL certificate automatically for enhanced security and improved search rankings." },
  { icon: Headphones, title: "24/7 Expert Support", description: "Our dedicated support team is available around the clock to help with any technical issues or questions." },
];

// Fallback plans if API fails
const fallbackPlans = [
  {
    pid: 1, name: "Starter", popular: false,
    features: ["1 Website", "10 GB SSD Storage", "Free SSL Certificate", "Free Domain (1 yr)", "Weekly Backups", "99.99% Uptime SLA"],
    monthlyPrice: "₹79", annualPrice: "₹799",
  },
  {
    pid: 2, name: "Business", popular: true,
    features: ["Unlimited Websites", "50 GB NVMe Storage", "Free SSL & CDN", "Free Domain (1 yr)", "Daily Backups", "cPanel Control Panel"],
    monthlyPrice: "₹199", annualPrice: "₹1,999",
  },
  {
    pid: 3, name: "Enterprise", popular: false,
    features: ["Unlimited Websites", "100 GB NVMe Storage", "Free SSL, CDN & IP", "Priority Support", "Real-time Backups", "Staging Environment"],
    monthlyPrice: "₹399", annualPrice: "₹3,999",
  },
];

const SharedHosting = () => {
  const { products, loading, error } = useWhmcsProducts(SHARED_HOSTING_PIDS);

  const plans = useMemo(() => {
    if (!products.length) return fallbackPlans;

    return products.map((p) => {
      const inr = p.pricing?.INR;
      const monthly = inr ? `₹${parseFloat(inr.monthly).toLocaleString('en-IN')}` : '—';
      const annually = inr ? `₹${parseFloat(inr.annually).toLocaleString('en-IN')}` : '—';

      return {
        pid: p.pid,
        name: p.name,
        popular: p.pid === 2,
        features: p.features,
        monthlyPrice: monthly,
        annualPrice: annually,
      };
    });
  }, [products]);

  return (
    <>
      <Helmet>
        <title>Shared Hosting India | Affordable cPanel Hosting from ₹79/mo - Infinitive Cloud</title>
        <meta name="description" content="Best shared hosting plans in India starting at ₹79/mo. NVMe SSD, free SSL, LiteSpeed servers, cPanel, and 99.99% uptime. Perfect for WordPress, blogs, and business websites." />
        <meta name="keywords" content="shared hosting India, cheap web hosting, cPanel hosting, NVMe hosting, LiteSpeed hosting, WordPress hosting India, affordable hosting" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/shared-hosting" />
        <meta property="og:title" content="Shared Hosting India | cPanel Hosting from ₹79/mo" />
        <meta property="og:description" content="Best shared hosting in India. NVMe SSD, free SSL, LiteSpeed, cPanel, 99.99% uptime." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/shared-hosting" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">Shared Hosting</span> Plans India
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Affordable, reliable, and blazing-fast shared hosting powered by NVMe SSD and LiteSpeed technology. Perfect for personal websites, blogs, small businesses, and WordPress sites.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6 text-sm font-semibold text-primary">
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Free SSL</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> NVMe SSD</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> LiteSpeed</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> cPanel</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4" /> 99.99% Uptime</span>
              </div>
            </div>
          </section>
          {{/* Premium animated infographic */}}
          <section className="section-container -mt-8 mb-20">
            <div className="max-w-5xl mx-auto animate-fade-in">
              <UniversalOrbitDiagram
                CenterIcon={{Server}}
                centerTitle="Shared Hosting"
                centerSubtitle="LiteSpeed · cPanel"
                statusLabel="Node · ic-bom-sh-12 · ok"
                metric="99.9%"
                badge="NVMe Powered"
                uid="sharedho"
                nodes={{[
                  { icon: HardDrive, label: "NVMe", angle: 0 },
                  { icon: Zap, label: "LiteSpeed", angle: 60 },
                  { icon: Shield, label: "Imunify360", angle: 120 },
                  { icon: Globe, label: "Free SSL", angle: 180 },
                  { icon: Mail, label: "Email", angle: 240 },
                  { icon: Database, label: "MySQL", angle: 300 },
                ]}}
              />
            </div>
          </section>


          {/* Plans */}
          <section className="section-container mb-20">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading plans...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {plans.map((plan, i) => (
                  <Card
                    key={plan.pid}
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up ${
                      plan.popular ? "border-primary/50 shadow-primary/10 shadow-lg ring-2 ring-primary/20 scale-[1.02]" : ""
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {plan.popular && (
                      <>
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                        <div className="absolute top-4 right-4">
                          <span className="text-[9px] md:text-[10px] font-bold bg-badge text-badge-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">Most Popular</span>
                        </div>
                      </>
                    )}
                    <CardContent className="p-8 pt-10">
                      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                      <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black gradient-text">{plan.monthlyPrice}</span>
                          <span className="text-base text-muted-foreground">/mo</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          or {plan.annualPrice}/yr
                        </p>
                        <p className="text-xs text-primary font-medium mt-1">14 Days Free Trial</p>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-3">
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/cart?product=${plan.pid}&name=${encodeURIComponent(plan.name)}&type=shared-hosting`}>
                        <Button className={`w-full h-12 font-bold ${plan.popular ? "btn-gradient" : ""}`} variant={plan.popular ? "default" : "outline"}>
                          Get Started <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {error && !loading && (
              <p className="text-center text-xs text-muted-foreground mt-4">Showing cached pricing. Live prices will update shortly.</p>
            )}
          </section>

          {/* Features */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Why Choose Our <span className="gradient-text">Shared Hosting</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Enterprise-grade features at the most affordable prices. Every plan is designed for speed, security, and reliability.
            </p>
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

          {/* CTA */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="py-12 text-center">
                <h2 className="mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Try any shared hosting plan free for 14 days. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/cart?product=1&name=Starter&type=shared-hosting"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Start Free Trial</Button></Link>
                  <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to Sales</Button></Link>
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

export default SharedHosting;
