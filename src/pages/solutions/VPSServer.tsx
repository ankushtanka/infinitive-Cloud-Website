import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import vpsDatacenterPremium from "@/assets/vps-datacenter-premium.jpg";
import PremiumServerDiagram from "@/components/infographics/PremiumServerDiagram";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import {
  HardDrive,
  Zap,
  Shield,
  Clock,
  Server,
  Globe,
  ArrowRight,
  Check,
  Cpu,
  Lock,
  Activity,
  Gauge,
  Headphones,
  Star,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const features = [
  { icon: Cpu, title: "Dedicated vCPU Cores", desc: "Guaranteed compute power. No noisy neighbours, no shared bottlenecks." },
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "Up to 10× faster than SATA SSDs for blazing fast database & app performance." },
  { icon: Lock, title: "Full Root Access", desc: "Complete control with SSH root access. Install anything, configure everything." },
  { icon: Shield, title: "Enterprise DDoS Shield", desc: "Always-on protection up to 1 Tbps mitigation, included free with every plan." },
  { icon: Globe, title: "Global Data Centers", desc: "Deploy in India, US, Europe & Singapore. Pick the region closest to your users." },
  { icon: Activity, title: "99.99% Uptime SLA", desc: "Backed by a written guarantee with monthly credits if we ever fall short." },
  { icon: Zap, title: "Instant Provisioning", desc: "Your VPS is ready in 60 seconds. No paperwork, no waiting." },
  { icon: Headphones, title: "24/7 Expert Support", desc: "Real engineers on chat & ticket — average first response under 3 minutes." },
];

const plans = [
  {
    name: "Starter",
    tag: "Best for side projects",
    price: "₹499",
    period: "/mo",
    specs: ["2 GB RAM", "1 vCPU Core", "40 GB NVMe SSD", "1 TB Bandwidth", "1 Dedicated IPv4", "Free SSL & Backups", "DDoS Protection", "24/7 Support"],
    highlight: false,
  },
  {
    name: "Business",
    tag: "Most teams pick this",
    price: "₹999",
    period: "/mo",
    specs: ["4 GB RAM", "2 vCPU Cores", "80 GB NVMe SSD", "2 TB Bandwidth", "1 Dedicated IPv4", "Free SSL & Daily Backups", "DDoS Protection", "Priority Support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    tag: "For high-traffic apps",
    price: "₹3,999",
    period: "/mo",
    specs: ["16 GB RAM", "8 vCPU Cores", "320 GB NVMe SSD", "8 TB Bandwidth", "2 Dedicated IPv4", "Snapshot Backups", "Advanced DDoS Shield", "Dedicated Account Manager"],
    highlight: false,
  },
];

const stats = [
  { value: "99.99%", label: "Uptime SLA", icon: Activity },
  { value: "<10 ms", label: "Avg Response", icon: Gauge },
  { value: "60 s", label: "Provisioning", icon: Zap },
  { value: "10 Gbps", label: "Network Port", icon: TrendingUp },
];

const whyUs = [
  { icon: Server, title: "Built on Latest AMD EPYC", desc: "Modern processors deliver up to 3× better performance per core than older Xeon hardware." },
  { icon: Shield, title: "Hardened by Default", desc: "Firewall rules, fail2ban, and brute-force protection enabled out of the box." },
  { icon: Sparkles, title: "Zero Hidden Fees", desc: "What you see is what you pay. No setup fees, no overage surprises." },
  { icon: Clock, title: "30-Day Money Back", desc: "Try us risk-free. Not happy? Get a full refund — no questions asked." },
];

const testimonials = [
  {
    quote: "We migrated 14 production sites to Infinitive Cloud VPS. Page loads dropped from 2.1s to 480ms. Support actually knows their stuff.",
    name: "Rohan Kapoor",
    role: "CTO, Studio Mint",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "After two outages with our previous host, we moved to Infinitive. Six months in — zero downtime, predictable billing, friendly humans.",
    name: "Aisha Verma",
    role: "Founder, ledgerly.in",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "The NVMe disks are absurdly fast. Our Postgres queries run 4× quicker. Honestly the best price/performance we've found in India.",
    name: "Karthik Iyer",
    role: "Lead Engineer, FreightHQ",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
  },
];

const faqs = [
  { q: "Can I upgrade or downgrade my plan later?", a: "Absolutely. You can scale up or down at any time from your dashboard with zero downtime — we handle the migration in seconds." },
  { q: "Do I get full root / administrator access?", a: "Yes. Every VPS comes with full root SSH access on Linux distros (Ubuntu, Debian, AlmaLinux, Rocky) and Administrator on Windows Server." },
  { q: "What's included in the 24/7 support?", a: "Real human engineers respond on chat, email and tickets — typically within 3 minutes. We help with server setup, troubleshooting, and migrations free of charge." },
  { q: "Is there a money-back guarantee?", a: "Yes. We offer a 30-day no-questions-asked refund if you're not satisfied for any reason." },
  { q: "Will you help me migrate from my current host?", a: "Yes — free white-glove migration. Our team copies your sites, databases, emails and DNS at no extra cost." },
  { q: "What if I exceed my bandwidth?", a: "We'll never cut you off. We'll send a friendly heads-up and help you upgrade to a better-fit plan with prorated billing." },
];

const VPSServer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>VPS Server Hosting India | NVMe SSD & Root Access | Infinitive Cloud</title>
        <meta
          name="description"
          content="Premium VPS hosting with full root access, NVMe SSD, dedicated resources, free DDoS protection and 99.99% uptime SLA. Starting at ₹499/mo."
        />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/vps-server" />
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
                  New AMD EPYC servers — now live in Mumbai
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-[1.05]">
                  VPS hosting that just{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    works.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Dedicated resources, NVMe SSD, full root access and 99.99% uptime — backed by engineers who actually pick up the phone.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <Link to="/cart">
                    <Button size="lg" className="h-12 px-7 text-base font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20">
                      Get started — ₹499/mo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
                      Talk to an expert
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />30-day money back</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />Free migration</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />No setup fees</div>
                </div>
              </div>

              <div className="relative animate-fade-in">
                {/* Multi-layer premium glow */}
                <div className="absolute -inset-10 bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-[80px] rounded-full" aria-hidden />
                <div className="absolute -inset-4 bg-gradient-to-bl from-secondary/20 to-primary/10 blur-2xl rounded-3xl opacity-70" aria-hidden />

                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-2xl ring-1 ring-primary/10">
                  <img
                    src={vpsHeroPremium}
                    alt="Premium VPS server with glowing circuit lines"
                    loading="eager"
                    width={1600}
                    height={1200}
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" aria-hidden />
                  {/* Subtle grid overlay */}
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

                {/* Floating live-uptime card */}
                <div className="hidden md:flex absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl p-4 shadow-2xl items-center gap-3 ring-1 ring-primary/10">
                  <div className="relative w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary animate-pulse ring-2 ring-card" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Live uptime</div>
                    <div className="text-base font-bold text-foreground tracking-tight">99.998%<span className="text-xs text-muted-foreground font-medium ml-1">(90d)</span></div>
                  </div>
                </div>

                {/* Floating perf chip */}
                <div className="hidden md:flex absolute -top-5 -right-5 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl px-4 py-3 shadow-2xl items-center gap-2.5 ring-1 ring-primary/10">
                  <Zap className="w-4 h-4 text-primary" />
                  <div className="text-xs">
                    <span className="font-bold text-foreground">NVMe SSD</span>
                    <span className="text-muted-foreground"> · 10 Gbps</span>
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
                    <div className="text-3xl md:text-4xl font-black text-foreground tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
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
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Simple plans, serious power.</h2>
              <p className="text-muted-foreground text-lg">No hidden fees, no contracts. Switch or cancel any time.</p>
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
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Everything you need. Nothing you don't.</h2>
              <p className="text-muted-foreground text-lg">A thoughtful set of features that genuinely move the needle for your apps.</p>
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

        {/* PERFORMANCE / WHY US */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent blur-3xl rounded-full" aria-hidden />
                <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-2xl ring-1 ring-primary/10">
                  <img
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1000&h=800&fit=crop&q=80"
                    alt="Engineer monitoring server performance dashboards"
                    loading="lazy"
                    className="w-full aspect-[5/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" aria-hidden />
                </div>
                {/* Floating metric pill */}
                <div className="hidden md:flex absolute -bottom-5 -right-5 bg-card/90 backdrop-blur-xl border border-border/60 rounded-2xl p-4 shadow-2xl items-center gap-3 ring-1 ring-primary/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg latency</div>
                    <div className="text-base font-bold text-foreground tracking-tight">&lt; 8 ms</div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="text-primary text-sm font-semibold mb-3">Why teams choose us</div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
                  Built by engineers, for engineers.
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  We obsess over the details so you can ship faster. From the silicon to the support inbox — every layer is tuned for performance and trust.
                </p>
                <div className="space-y-5">
                  {whyUs.map((w) => {
                    const Icon = w.icon;
                    return (
                      <div key={w.title} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1">{w.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Loved by 12,000+ teams</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Real words from real customers.</h2>
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
        <section className="py-20 lg:py-28">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <div className="inline-block text-primary text-sm font-semibold mb-3">FAQ</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Questions, answered.</h2>
              <p className="text-muted-foreground text-lg">Still curious? Our team is one click away.</p>
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

        {/* FINAL CTA — Premium */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="relative">
              {/* Outer ambient glow */}
              <div
                aria-hidden
                className="absolute -inset-8 bg-gradient-to-br from-primary/40 via-secondary/30 to-primary/20 blur-3xl rounded-[3rem] opacity-60"
              />

              {/* Main card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 shadow-2xl shadow-primary/20">
                {/* Deep gradient base */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-[hsl(220_60%_8%)] via-[hsl(210_50%_12%)] to-[hsl(200_55%_10%)]"
                />
                {/* Aurora glows */}
                <div
                  aria-hidden
                  className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-3xl"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-gradient-to-tl from-secondary/40 to-transparent rounded-full blur-3xl"
                />
                {/* Dot grid */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Top hairline */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                />
                {/* Bottom hairline */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent"
                />

                <div className="relative p-10 md:p-16 lg:p-20 text-center">
                  {/* Eyebrow chip */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md text-white/90 text-xs font-semibold mb-7">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                      <span className="relative rounded-full bg-primary w-2 h-2" />
                    </span>
                    Ready in 60 seconds · No setup fees
                  </div>

                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5 max-w-3xl mx-auto leading-[1.05] tracking-tight">
                    Ready for a VPS that{" "}
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_linear_infinite]">
                      doesn't let you down?
                    </span>
                  </h2>
                  <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                    Spin up your server in 60 seconds. Free migration, full root access, and engineers on call — round the clock.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                    <Link to="/cart">
                      <Button
                        size="lg"
                        className="group relative h-12 px-8 text-base font-semibold bg-white text-[hsl(220_60%_10%)] hover:bg-white/95 shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5"
                      >
                        Start your VPS
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-8 text-base font-semibold bg-white/[0.04] backdrop-blur-md border-white/20 text-white hover:bg-white/[0.1] hover:border-white/30"
                      >
                        Chat with sales
                      </Button>
                    </Link>
                  </div>

                  {/* Trust strip */}
                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      30-day money back
                    </div>
                    <span aria-hidden className="hidden sm:inline w-1 h-1 rounded-full bg-white/30" />
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Free white-glove migration
                    </div>
                    <span aria-hidden className="hidden sm:inline w-1 h-1 rounded-full bg-white/30" />
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      99.99% uptime SLA
                    </div>
                  </div>
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

export default VPSServer;
