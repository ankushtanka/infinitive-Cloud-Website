import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
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
  Workflow,
  Zap,
  Shield,
  Server,
  HardDrive,
  Lock,
  ArrowRight,
  Check,
  Sparkles,
  Star,
  Gauge,
  Database,
  Terminal,
  GitBranch,
  RefreshCw,
  Cpu,
} from "lucide-react";
import n8nHero from "@/assets/n8n-hero-premium.jpg";

const features = [
  { icon: Workflow, title: "Pre-installed n8n", desc: "Latest stable n8n is configured, secured and ready — no Docker, no YAML files, no headaches." },
  { icon: Server, title: "Dedicated VPS", desc: "Your own KVM-virtualized server. Your workflows, credentials and data never share resources." },
  { icon: RefreshCw, title: "Automatic Backups", desc: "Daily snapshots of your workflows, executions and database. One-click restore, always." },
  { icon: Terminal, title: "Full Root Access", desc: "SSH in, install Python nodes, custom binaries, anything you need. It's your machine." },
  { icon: Gauge, title: "99.9% Uptime SLA", desc: "Enterprise-grade infrastructure with redundant power, network and storage. Guaranteed." },
  { icon: Lock, title: "Free SSL + Dedicated IP", desc: "HTTPS out of the box via Let's Encrypt. Static IP for webhooks and IP-allowlist integrations." },
  { icon: Cpu, title: "NVMe + LiteSpeed", desc: "Sub-millisecond disk I/O for fast workflow executions and snappy editor performance." },
  { icon: Shield, title: "Hardened by Default", desc: "Firewalled, fail2ban-protected, auto-updated OS. Security patches applied while you sleep." },
];

const steps = [
  { num: "01", title: "Choose your plan", desc: "Pick the VPS size that fits your workflow volume — upgrade anytime, zero downtime." },
  { num: "02", title: "Deploy in one click", desc: "We provision the VPS, install n8n, configure SSL and hand you the editor URL." },
  { num: "03", title: "Start automating", desc: "Open n8n, log in, and build your first workflow. Done in under two minutes." },
];

const plans = [
  {
    name: "Starter",
    tag: "Solo builders & side projects",
    price: "₹599",
    period: "/mo",
    specs: ["1 vCPU", "4 GB RAM", "50 GB NVMe SSD", "4 TB Bandwidth", "n8n latest", "Free SSL & Daily Backups", "Community Support"],
    highlight: false,
  },
  {
    name: "Growth",
    tag: "Production teams",
    price: "₹799",
    period: "/mo",
    specs: ["2 vCPU", "8 GB RAM", "100 GB NVMe SSD", "8 TB Bandwidth", "n8n latest + queue mode", "Free SSL & Daily Backups", "Priority Email Support"],
    highlight: true,
  },
  {
    name: "Scale",
    tag: "High-volume automation",
    price: "₹1,099",
    period: "/mo",
    specs: ["4 vCPU", "16 GB RAM", "200 GB NVMe SSD", "16 TB Bandwidth", "n8n + Redis queue", "Free SSL & Hourly Backups", "24/7 Premium Support"],
    highlight: false,
  },
];

const comparison = [
  { feature: "Pricing model", us: "Flat monthly", zapier: "Per-task billing", make: "Per-operation" },
  { feature: "Workflow limit", us: "Unlimited", zapier: "Tiered", make: "Tiered" },
  { feature: "Data ownership", us: "100% yours", zapier: "Their cloud", make: "Their cloud" },
  { feature: "Custom code nodes", us: "Yes — JS & Python", zapier: "Limited", make: "Limited" },
  { feature: "Self-hosted", us: "Yes", zapier: "No", make: "No" },
  { feature: "API rate limits", us: "None", zapier: "Yes", make: "Yes" },
];

const integrations = [
  "Slack", "Google Sheets", "Notion", "GitHub", "OpenAI", "Airtable",
  "Discord", "Gmail", "PostgreSQL", "Stripe", "HubSpot", "Telegram",
  "AWS S3", "Webhooks", "MySQL", "Twilio",
];

const testimonials = [
  {
    quote: "We migrated 40 workflows off Zapier in a weekend. Same automations, ₹18,000/month saved, and our PII never leaves our server.",
    name: "Aarav M.",
    role: "Head of Ops, Fintech Startup",
  },
  {
    quote: "Self-hosted n8n on Infinitive is the cleanest dev experience we've had. Root access, sub-second editor, and backups that just work.",
    name: "Priya S.",
    role: "Senior Engineer, SaaS",
  },
  {
    quote: "Compliance signed off in two days because the data stays on our VPS. That alone justified the switch from a hosted tool.",
    name: "Rahul K.",
    role: "CTO, HealthTech",
  },
];

const faqs = [
  { q: "Is n8n really pre-installed?", a: "Yes — when your VPS is provisioned, n8n is already running with SSL, a reverse proxy, and a secured admin URL. Just log in and start building." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. Scale RAM, CPU and storage at any time from the dashboard. Migrations are zero-downtime — your workflows keep running." },
  { q: "Do I need coding skills?", a: "No. n8n's editor is fully visual. If you do know JavaScript or Python, you can drop into Code nodes for custom logic — but it's optional." },
  { q: "What happens to my data?", a: "Everything — credentials, workflow definitions, execution logs — lives on your dedicated VPS. We don't see it, store it, or share it. Backups stay in your account." },
  { q: "Can I install community nodes?", a: "Yes. You have full root access, so any community node from npm or any custom Python package works exactly as it would on your laptop." },
  { q: "How long does deployment take?", a: "Under 2 minutes from checkout to a live n8n editor URL. Honestly faster than installing Docker on your own machine." },
];

const N8nHosting = () => {
  return (
    <>
      <Helmet>
        <title>Self-Hosted n8n Hosting — Own Your Automation | INFINITIVE CLOUD</title>
        <meta name="description" content="Deploy production-ready, self-hosted n8n on a dedicated VPS in under 2 minutes. Pre-installed, pre-configured, with full root access. From ₹599/mo." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/n8n-hosting" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

            <div className="section-container relative pt-20 pb-16 lg:pt-28 lg:pb-24">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div className="space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">One-click n8n. Production-ready.</span>
                  </div>

                  <h1 className="font-serif text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                    Self-Hosted{" "}
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      n8n
                    </span>
                    <br />
                    on your terms
                  </h1>

                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                    Pre-configured, pre-installed, production-ready from day one. Your workflows, your data, your dedicated VPS — no vendor lock-in, no per-task billing, no surprises.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/cart?product=n8n-growth">
                      <Button size="lg" className="btn-gradient glow-effect h-14 px-8 font-semibold text-base">
                        Deploy n8n Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <a href="#pricing">
                      <Button size="lg" variant="outline" className="h-14 px-8 font-semibold text-base">
                        See Pricing
                      </Button>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Ready in 2 minutes
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      99.9% uptime SLA
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Cancel anytime
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 blur-3xl opacity-40" />
                  <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                    <img
                      src={n8nHero}
                      alt="n8n self-hosted automation workflow canvas"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-medium">Live: 12,847 workflows running</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURE GRID */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                Why self-host n8n with us
              </h2>
              <p className="text-lg text-muted-foreground">
                Engineered for teams that take privacy, performance and control seriously.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <Card
                  key={i}
                  className="group relative overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <f.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* DEPLOY STEPS */}
          <section className="relative py-20 lg:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Ready in under 2 minutes</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">One-click deployment</h2>
                <p className="text-lg text-muted-foreground">From zero to running automation faster than your morning coffee.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((s, i) => (
                  <div key={i} className="relative">
                    <Card className="border-border/60 bg-card/70 backdrop-blur-sm h-full hover:border-primary/40 transition-all">
                      <CardContent className="p-8">
                        <div className="text-5xl font-serif font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-4">
                          {s.num}
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                      </CardContent>
                    </Card>
                    {i < steps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-primary/40 -translate-y-1/2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section id="pricing" className="section-container py-20 lg:py-28">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Simple, flat pricing</h2>
              <p className="text-lg text-muted-foreground">No per-task fees. No execution caps. Run as many workflows as you want.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((p, i) => (
                <Card
                  key={i}
                  className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                    p.highlight
                      ? "border-2 border-primary shadow-2xl shadow-primary/20 scale-[1.02]"
                      : "border-border/60 hover:border-primary/40 hover:shadow-xl"
                  }`}
                >
                  {p.highlight && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-xs font-semibold text-primary-foreground">
                        Most Popular
                      </div>
                    </>
                  )}
                  <CardContent className="relative p-8">
                    <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{p.tag}</p>

                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-serif font-bold">{p.price}</span>
                      <span className="text-muted-foreground">{p.period}</span>
                    </div>

                    <Link to="/cart?product=n8n">
                      <Button
                        className={`w-full h-12 font-semibold mb-8 ${p.highlight ? "btn-gradient glow-effect" : ""}`}
                        variant={p.highlight ? "default" : "outline"}
                      >
                        Deploy now
                      </Button>
                    </Link>

                    <ul className="space-y-3">
                      {p.specs.map((s, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* COMPARISON */}
          <section className="relative py-20 lg:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">n8n vs Zapier vs Make</h2>
                <p className="text-lg text-muted-foreground">Why teams move to self-hosted automation.</p>
              </div>

              <Card className="overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/60 bg-muted/30">
                        <th className="text-left p-5 font-semibold">Feature</th>
                        <th className="text-left p-5 font-semibold">
                          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Self-hosted n8n</span>
                        </th>
                        <th className="text-left p-5 font-semibold text-muted-foreground">Zapier</th>
                        <th className="text-left p-5 font-semibold text-muted-foreground">Make</th>
                      </tr>
                    </thead>
                    <tbody>
                  {comparison.map((row, i) => (
                        <tr key={i} className="border-b border-border/40 last:border-0">
                          <td className="p-5 font-medium">{row.feature}</td>
                          <td className="p-5 text-primary font-semibold">{row.us}</td>
                          <td className="p-5 text-muted-foreground">{row.zapier}</td>
                          <td className="p-5 text-muted-foreground">{row.make}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </section>

          {/* INTEGRATIONS */}
          <section className="section-container py-20 lg:py-28">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">All your favourite apps</h2>
              <p className="text-lg text-muted-foreground">Native integrations to every tool your team already uses — plus webhooks, HTTP nodes and custom code.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {integrations.map((name, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm flex items-center justify-center text-center px-3 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-sm font-medium">{name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="relative py-20 lg:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Built for serious teams</h2>
                <p className="text-lg text-muted-foreground">From solo developers to engineering teams running thousands of workflows.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <Card key={i} className="border-border/60 bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all">
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-foreground/90 leading-relaxed mb-6 italic">"{t.quote}"</p>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="section-container pb-20 lg:pb-28">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Frequently asked questions</h2>
                <p className="text-lg text-muted-foreground">Everything teams ask before they switch.</p>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border border-border/60 rounded-xl px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/40"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
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
          <section className="section-container pb-20 lg:pb-28">
            <div className="relative rounded-3xl border border-cyan-500/30 bg-[#0A1A2F] dark:bg-[#0A1A2F] px-6 py-16 sm:py-20 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(198,164,63,0.1),transparent_60%)] pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm font-medium text-cyan-100">Ready in 60 seconds</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5">
                  Start automating on{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    your own terms
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                  Deploy a dedicated VPS with n8n pre-installed, SSL configured, and backups running — in less time than it takes to make tea.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/cart?product=n8n-growth">
                    <Button
                      size="lg"
                      className="h-14 px-8 font-semibold text-white border-0 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 shadow-[0_8px_30px_-8px_rgba(34,211,238,0.5)]"
                    >
                      Deploy n8n Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 font-semibold bg-transparent text-white border-slate-700 hover:bg-slate-800/60 hover:text-white"
                    >
                      Talk to an Expert
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 30-day money back</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 99.9% uptime SLA</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Cancel anytime</div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default N8nHosting;
