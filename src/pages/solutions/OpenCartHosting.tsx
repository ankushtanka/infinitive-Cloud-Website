import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Check,
  CreditCard,
  Package,
  Truck,
  Languages,
  BarChart3,
  Lock,
  Layers,
  Sparkles,
  Star,
  Gauge,
  Headphones,
  Database,
  Users,
} from "lucide-react";
import opencartHero from "@/assets/opencart-hero-premium.jpg";
import opencartStorefront from "@/assets/opencart-storefront-premium.jpg";

const features = [
  { icon: Zap, title: "1-Click OpenCart Install", desc: "Pre-configured OpenCart 4.x — your store is up in under 60 seconds, no setup wizards." },
  { icon: Gauge, title: "LiteSpeed + NVMe", desc: "Hardware-accelerated PHP and NVMe SSD storage for catalogue pages that load in <500 ms." },
  { icon: CreditCard, title: "Secure Payment Gateways", desc: "Razorpay, Stripe, PayPal, CCAvenue — all PCI-DSS hardened, all included." },
  { icon: Languages, title: "Multi-Currency & Language", desc: "Sell globally out of the box. ₹, $, €, £ and 40+ locales supported natively." },
  { icon: Lock, title: "Free SSL + WAF", desc: "Automatic HTTPS, Web Application Firewall and bot protection — included on every plan." },
  { icon: Database, title: "Daily Backups", desc: "Automated daily snapshots with one-click restore. Your products, orders and customers — safe." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time revenue, conversion and traffic metrics — built right into your control panel." },
  { icon: Headphones, title: "OpenCart Experts 24/7", desc: "Real engineers who know OpenCart inside-out. Average response under 3 minutes." },
];

const ecommerceFeatures = [
  { icon: Package, title: "Unlimited Products", desc: "Catalogue as much as you want — no per-SKU limits, no hidden caps." },
  { icon: Truck, title: "Smart Shipping Modules", desc: "Shiprocket, Delhivery, FedEx and 30+ carriers — pre-integrated." },
  { icon: Users, title: "Customer Accounts", desc: "Wishlists, order history, reviews and loyalty out of the box." },
  { icon: Layers, title: "Multi-Store Setup", desc: "Run multiple storefronts from a single OpenCart admin panel." },
];

const plans = [
  {
    name: "Starter Store",
    tag: "Launching your first shop",
    price: "₹599",
    period: "/mo",
    specs: [
      "1 OpenCart Install",
      "50 GB NVMe SSD",
      "Unmetered Bandwidth",
      "Free SSL & CDN",
      "Daily Backups",
      "1 Free .com Domain",
      "Razorpay & Stripe",
      "24/7 Support",
    ],
    highlight: false,
  },
  {
    name: "Growth Store",
    tag: "Most-loved by retailers",
    price: "₹1,199",
    period: "/mo",
    specs: [
      "Unlimited OpenCart Sites",
      "100 GB NVMe SSD",
      "LiteSpeed Cache Pro",
      "Free SSL, CDN & WAF",
      "Daily Backups + Staging",
      "Priority Support",
      "Free Migration",
      "Multi-Store Manager",
    ],
    highlight: true,
  },
  {
    name: "Enterprise Store",
    tag: "High-traffic brands",
    price: "₹2,999",
    period: "/mo",
    specs: [
      "Unlimited OpenCart Sites",
      "300 GB NVMe SSD",
      "Dedicated CPU & RAM",
      "Advanced DDoS Shield",
      "Hourly Backups",
      "Dedicated Account Manager",
      "Custom SLA",
      "1-on-1 Onboarding",
    ],
    highlight: false,
  },
];

const stats = [
  { value: "<500ms", label: "Page Load", icon: Gauge },
  { value: "99.99%", label: "Uptime SLA", icon: Shield },
  { value: "60s", label: "Auto Install", icon: Zap },
  { value: "40+", label: "Currencies", icon: Globe },
];

const steps = [
  { num: "01", title: "Pick a plan", desc: "Choose the OpenCart plan that fits your catalogue size and traffic." },
  { num: "02", title: "1-click install", desc: "We provision OpenCart, SSL and your free domain — fully automated in ~60 seconds." },
  { num: "03", title: "Customize your store", desc: "Pick a theme, add products, connect payment gateways from a friendly dashboard." },
  { num: "04", title: "Go live & sell", desc: "Launch in minutes. Our team handles migration if you're moving from another host." },
];

const testimonials = [
  {
    quote: "We migrated our 4,200-SKU OpenCart store from a budget host. Checkout times dropped 3x and our Razorpay drop-offs nearly disappeared.",
    name: "Aarav Mehta",
    role: "Founder, Threadwell",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "The 1-click install is real — and the LiteSpeed Cache module made our category pages feel instant. Support actually understands OpenCart.",
    name: "Neha Sinha",
    role: "Co-founder, Bloom & Beyond",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "Diwali traffic peaked at 18× our daily average. Zero downtime, zero alerts. Honestly couldn't ask for more from an e-commerce host.",
    name: "Vikram Shah",
    role: "Director, Kettle & Co.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
  },
];

const faqs = [
  { q: "Which OpenCart versions do you support?", a: "All currently maintained releases — including OpenCart 4.x and 3.x. We auto-patch security updates and offer 1-click major version upgrades from your dashboard." },
  { q: "Can you migrate my existing OpenCart store?", a: "Yes — free white-glove migration. Our engineers move your products, customers, orders, themes and extensions with zero downtime." },
  { q: "Will my extensions and themes work?", a: "Every paid OpenCart extension and theme runs perfectly on our stack. We also offer a curated library of vetted free extensions." },
  { q: "Do you support Razorpay and Indian payment gateways?", a: "Absolutely. Razorpay, CCAvenue, PayU, Instamojo and PayTM are all supported — with installation guides if you'd like to self-configure." },
  { q: "What about GST invoicing for India?", a: "Yes. We offer pre-built OpenCart GST extensions and our billing system issues fully compliant GST invoices for your hosting itself." },
  { q: "Is there a money-back guarantee?", a: "Yes — 30-day no-questions-asked refund. If OpenCart Hosting isn't a fit, you walk away with a full refund." },
];

const OpenCartHosting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>OpenCart Hosting India | 1-Click Install, Free SSL & Razorpay | Infinitive Cloud</title>
        <meta
          name="description"
          content="Premium OpenCart hosting with 1-click install, NVMe SSD, LiteSpeed cache, free SSL, Razorpay & Stripe, daily backups and 24/7 expert support. Plans from ₹599/mo."
        />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/opencart-hosting" />
      </Helmet>

      <Navigation />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  Optimised for OpenCart 4.x
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-[1.05]">
                  OpenCart hosting,{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    built to sell.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  1-click install, LiteSpeed-powered speed, free SSL, Razorpay-ready and 24/7 OpenCart engineers — everything your store needs to scale.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <Link to="/cart">
                    <Button size="lg" className="h-12 px-7 text-base font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20">
                      Launch your store — ₹599/mo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
                      Free migration
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />30-day money back</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />Free .com domain</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />No setup fees</div>
                </div>
              </div>

              {/* Premium hero visual */}
              <div className="relative animate-fade-in">
                <div className="absolute -inset-10 bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-[80px] rounded-full" aria-hidden />
                <div className="absolute -inset-4 bg-gradient-to-bl from-secondary/20 to-primary/10 blur-2xl rounded-3xl opacity-70" aria-hidden />

                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-2xl ring-1 ring-primary/10">
                  <img
                    src={opencartHero}
                    alt="Premium 3D visualization of an e-commerce shopping cart with floating product UI panels"
                    loading="eager"
                    width={1600}
                    height={1200}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" aria-hidden />
                  <div
                    className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
                    aria-hidden
                    style={{
                      backgroundImage:
                        "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                </div>

                {/* Floating revenue card */}
                <div className="hidden md:flex absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl p-4 shadow-2xl items-center gap-3 ring-1 ring-primary/10">
                  <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary animate-pulse ring-2 ring-card" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Live orders today</div>
                    <div className="text-base font-bold text-foreground tracking-tight">+1,284</div>
                  </div>
                </div>

                {/* Floating perf chip */}
                <div className="hidden md:flex absolute -top-5 -right-5 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl px-4 py-3 shadow-2xl items-center gap-2.5 ring-1 ring-primary/10">
                  <Zap className="w-4 h-4 text-primary" />
                  <div className="text-xs">
                    <span className="font-bold text-foreground">LiteSpeed</span>
                    <span className="text-muted-foreground"> · NVMe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="relative py-14 border-y border-border bg-gradient-to-b from-muted/40 via-muted/20 to-muted/40 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]"
          />
          <div className="container relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border/60 shadow-sm">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-background/60 backdrop-blur p-6 md:p-8 text-center hover:bg-background transition-colors">
                    <div className="inline-flex w-10 h-10 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1.5 font-medium uppercase tracking-wider">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Pricing</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Plans that grow with your store.</h2>
              <p className="text-muted-foreground text-lg">Transparent pricing. No hidden fees. Switch plans any time, zero downtime.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.name} className="relative group">
                  {plan.highlight && (
                    <div
                      aria-hidden
                      className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary opacity-70 blur-md group-hover:opacity-100 transition-opacity"
                    />
                  )}
                  <Card
                    className={`relative h-full transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden ${
                      plan.highlight
                        ? "border-primary/40 shadow-2xl shadow-primary/20 bg-gradient-to-b from-card via-card to-primary/[0.03]"
                        : "hover:shadow-xl hover:border-primary/30"
                    }`}
                  >
                    {plan.highlight && (
                      <>
                        <div
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                        />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-lg shadow-primary/30 uppercase tracking-wider">
                          Recommended
                        </div>
                      </>
                    )}
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.tag}</p>
                      </div>
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className={`text-5xl font-black tracking-tight ${plan.highlight ? "bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent" : "text-foreground"}`}>
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <Link to="/cart" className="block mb-8">
                        <Button
                          className={`w-full h-11 font-semibold ${
                            plan.highlight
                              ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
                              : ""
                          }`}
                          variant={plan.highlight ? "default" : "outline"}
                        >
                          Choose {plan.name}
                        </Button>
                      </Link>
                      <ul className="space-y-3">
                        {plan.specs.map((s) => (
                          <li key={s} className="flex items-start gap-2.5 text-sm text-foreground">
                            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary" />
                            </span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Features</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Everything your OpenCart store needs.</h2>
              <p className="text-muted-foreground text-lg">A platform tuned end-to-end for speed, security and conversions.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PREMIUM SHOWCASE */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent blur-3xl rounded-full" aria-hidden />
                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-2xl ring-1 ring-primary/10">
                  <img
                    src={opencartStorefront}
                    alt="Premium minimal OpenCart storefront on a laptop screen"
                    loading="lazy"
                    width={1600}
                    height={1280}
                    className="w-full aspect-[5/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" aria-hidden />
                </div>
                <div className="hidden md:flex absolute -bottom-5 -right-5 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl p-4 shadow-2xl items-center gap-3 ring-1 ring-primary/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg conv. lift</div>
                    <div className="text-base font-bold text-foreground tracking-tight">+27%</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">Built for serious sellers</div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-[1.1]">
                  Faster stores.{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">More sales.</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Every millisecond off your page load is a percent on your conversion rate. Our LiteSpeed + NVMe stack is tuned specifically for OpenCart's catalogue and checkout flows — not a generic LAMP setup.
                </p>
                <div className="space-y-4">
                  {ecommerceFeatures.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-card/60 border border-border/60 backdrop-blur">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GET STARTED */}
        <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Get started</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">From signup to selling — in minutes.</h2>
              <p className="text-muted-foreground text-lg">Four simple steps to your live OpenCart store.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {steps.map((s, i) => (
                <div key={s.num} className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all">
                  <div className="text-5xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-3">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 w-5 h-5 text-border" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Trusted by 5,000+ stores</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Real growth from real merchants.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="p-7 rounded-2xl bg-card border border-border hover:shadow-lg transition-all"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-block text-primary text-sm font-semibold mb-3">FAQ</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Questions, answered.</h2>
              <p className="text-muted-foreground text-lg">Still curious? Our OpenCart team is one click away.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 lg:py-24">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 md:p-16 text-center">
              <div
                className="absolute inset-0 opacity-20"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4 max-w-2xl mx-auto leading-tight">
                  Open your store. We'll handle the rest.
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
                  Free domain, free SSL, free migration. 30-day money-back. No credit card needed to start.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/cart">
                    <Button size="lg" className="h-12 px-8 text-base font-semibold bg-background text-foreground hover:bg-background/90">
                      Launch your OpenCart store
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                      Talk to sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OpenCartHosting;
