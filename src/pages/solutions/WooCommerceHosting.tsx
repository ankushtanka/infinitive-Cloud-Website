import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ShoppingCart, Zap, Shield, Clock, Server, Globe, ArrowRight, Check } from "lucide-react";

const features = [
  { icon: ShoppingCart, title: "WooCommerce Optimized", desc: "Pre-configured servers tuned for WooCommerce performance" },
  { icon: Zap, title: "LiteSpeed Cache", desc: "Built-in caching for blazing fast store load times" },
  { icon: Shield, title: "Free SSL & Security", desc: "PCI-ready environment with malware scanning" },
  { icon: Clock, title: "Auto Backups", desc: "Daily automated backups with one-click restore" },
  { icon: Server, title: "Scalable Resources", desc: "Easily scale CPU, RAM & storage as your store grows" },
  { icon: Globe, title: "Global CDN", desc: "Deliver content fast to customers worldwide" },
];

const plans = [
  { name: "Starter", price: "₹299", period: "/mo", storage: "30 GB SSD", bandwidth: "Unlimited", products: "Up to 500", highlight: false },
  { name: "Business", price: "₹599", period: "/mo", storage: "80 GB SSD", bandwidth: "Unlimited", products: "Up to 5,000", highlight: true },
  { name: "Enterprise", price: "₹1,499", period: "/mo", storage: "200 GB NVMe", bandwidth: "Unlimited", products: "Unlimited", highlight: false },
];

const WooCommerceHosting = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>WooCommerce Hosting India | Fast & Secure | Infinitive Cloud</title>
        <meta name="description" content="High-performance WooCommerce hosting with LiteSpeed cache, free SSL, daily backups & 99.99% uptime. Start your online store with Infinitive Cloud." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/woocommerce-hosting" />
      </Helmet>

      <Navigation />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="section-container text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <ShoppingCart className="w-4 h-4" /> WooCommerce Hosting
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Launch Your <span className="gradient-text">Online Store</span> with Blazing Speed
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Purpose-built WooCommerce hosting with LiteSpeed servers, free SSL, automatic backups, and expert 24/7 support. Start selling in minutes.
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

        {/* Features */}
        <section className="py-20">
          <div className="section-container">
            <h2 className="text-3xl font-black text-center mb-12">Why Choose Our WooCommerce Hosting?</h2>
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

        {/* Pricing */}
        <section className="py-20 bg-muted/30">
          <div className="section-container">
            <h2 className="text-3xl font-black text-center mb-12">WooCommerce Hosting Plans</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.highlight ? "border-primary shadow-lg scale-105" : ""}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-badge text-badge-foreground text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="pt-8 text-center">
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-black text-primary mb-1">{plan.price}<span className="text-base font-normal text-muted-foreground">{plan.period}</span></div>
                    <div className="space-y-3 mt-6 text-sm text-left">
                      {[`${plan.storage} Storage`, `${plan.bandwidth} Bandwidth`, `${plan.products} Products`, "Free SSL Certificate", "Daily Backups", "24/7 Support"].map((f) => (
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

export default WooCommerceHosting;
