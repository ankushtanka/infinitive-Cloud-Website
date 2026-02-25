import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Server, Shield, Zap, Globe, HardDrive, Headphones, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const plans = [
  {
    name: "Monthly Starter",
    price: "₹49",
    period: "/mo",
    originalPrice: "₹99",
    popular: false,
    features: ["1 Website", "200 MB SSD Storage", "Unlimited Bandwidth", "1 Email Account", "Free SSL Certificate", "cPanel Access", "Weekly Backups"],
  },
  {
    name: "Single Domain",
    price: "₹549",
    period: "/yr",
    originalPrice: "₹999",
    popular: false,
    features: ["1 Website", "1 GB NVMe Storage", "Unlimited Bandwidth", "5 Email Accounts", "Free SSL Certificate", "cPanel Access", "Daily Backups"],
  },
  {
    name: "Multi Domain",
    price: "₹999",
    period: "/yr",
    originalPrice: "₹1,999",
    popular: true,
    features: ["Up to 3 Websites", "3 GB NVMe Storage", "Unlimited Bandwidth", "10 Email Accounts", "Free SSL & CDN", "cPanel Access", "Daily Backups"],
  },
  {
    name: "Unlimited",
    price: "₹1,499",
    period: "/yr",
    originalPrice: "₹2,999",
    popular: false,
    features: ["Unlimited Websites", "20 GB NVMe Storage", "Unlimited Bandwidth", "Unlimited Email Accounts", "Free SSL, CDN & IP", "cPanel Access", "Real-time Backups"],
  },
];

const features = [
  { icon: HardDrive, title: "NVMe SSD Storage", description: "Lightning-fast NVMe drives deliver up to 10x faster read/write speeds for superior website performance." },
  { icon: Zap, title: "LiteSpeed Web Server", description: "Industry-leading LiteSpeed technology with built-in caching for maximum page load speed and better SEO." },
  { icon: Shield, title: "Imunify360 Security", description: "Enterprise-level protection with automated malware scanning, DDoS protection, and real-time threat detection." },
  { icon: Server, title: "cPanel Control Panel", description: "The world's most trusted hosting control panel for easy management of files, databases, domains, and emails." },
  { icon: Globe, title: "Free SSL Certificates", description: "Every domain gets a free SSL certificate automatically for enhanced security and improved search rankings." },
  { icon: Headphones, title: "24/7 Expert Support", description: "Our dedicated support team is available around the clock to help with any technical issues or questions." },
];

const SharedHosting = () => {
  return (
    <>
      <Helmet>
        <title>Shared Hosting India | Affordable cPanel Hosting from ₹49/mo - Infinitive Cloud</title>
        <meta name="description" content="Best shared hosting plans in India starting at ₹49/mo. NVMe SSD, free SSL, LiteSpeed servers, cPanel, and 99.99% uptime. Perfect for WordPress, blogs, and business websites." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/shared-hosting" />
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

          {/* Plans */}
          <section className="section-container mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <div className="mb-6">
                      <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black gradient-text">{plan.price}</span>
                        <span className="text-base text-muted-foreground">{plan.period}</span>
                      </div>
                      <p className="text-xs text-primary font-medium mt-1">15 Days Free Trial</p>
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
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                  Try any shared hosting plan free for 15 days. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/free-trial"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Start Free Trial</Button></Link>
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
