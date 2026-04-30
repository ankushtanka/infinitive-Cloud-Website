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
  Code2,
  Zap,
  Shield,
  Terminal,
  GitBranch,
  Globe,
  ArrowRight,
  Check,
  Rocket,
  Layers,
  Settings2,
  RefreshCw,
  Star,
  Sparkles,
  Cpu,
} from "lucide-react";

const features = [
  { icon: Rocket, title: "One-Click Deploy", desc: "Push to Git or click deploy — your Node.js app is live in seconds." },
  { icon: RefreshCw, title: "PM2 Auto-Restart", desc: "Crashes recover instantly. Zero-downtime restarts, baked in." },
  { icon: Layers, title: "Auto-Scaling", desc: "Traffic spike? We scale CPU & RAM on the fly. No alerts at 3am." },
  { icon: GitBranch, title: "Git Integration", desc: "Connect GitHub, GitLab or Bitbucket. Every push triggers a clean build." },
  { icon: Settings2, title: "Env Variables UI", desc: "Manage secrets and configs from a friendly dashboard — never in code." },
  { icon: Terminal, title: "SSH & Web Terminal", desc: "Full shell access. Run npm scripts, debug, tail logs — all from the browser." },
  { icon: Shield, title: "Free SSL + DDoS", desc: "Automatic HTTPS via Let's Encrypt. Enterprise DDoS shield included." },
  { icon: Cpu, title: "Multiple Node Versions", desc: "Run Node 18, 20, 22 or LTS. Switch versions per app, not per server." },
];

const frameworks = [
  { name: "Express", color: "bg-emerald-500/10 text-emerald-500" },
  { name: "NestJS", color: "bg-rose-500/10 text-rose-500" },
  { name: "Next.js", color: "bg-foreground/10 text-foreground" },
  { name: "Fastify", color: "bg-sky-500/10 text-sky-500" },
  { name: "Koa", color: "bg-violet-500/10 text-violet-500" },
  { name: "Nuxt", color: "bg-emerald-500/10 text-emerald-500" },
  { name: "Remix", color: "bg-blue-500/10 text-blue-500" },
  { name: "Hono", color: "bg-orange-500/10 text-orange-500" },
];

const steps = [
  { num: "01", title: "Connect your repo", desc: "Link GitHub, GitLab or Bitbucket. We detect Node.js automatically." },
  { num: "02", title: "Configure your app", desc: "Pick your Node version, set env variables, choose a region." },
  { num: "03", title: "Hit deploy", desc: "We build, run npm install, and start your app with PM2 — done in under a minute." },
  { num: "04", title: "Ship updates instantly", desc: "Every git push auto-deploys with zero-downtime rollouts." },
];

const plans = [
  {
    name: "Developer",
    tag: "Hobby projects & APIs",
    price: "₹399",
    period: "/mo",
    specs: ["1 GB RAM", "1 vCPU", "25 GB SSD", "100 GB Bandwidth", "1 Node.js App", "Free SSL", "Git Deploy", "Community Support"],
    highlight: false,
  },
  {
    name: "Professional",
    tag: "Production-ready apps",
    price: "₹799",
    period: "/mo",
    specs: ["2 GB RAM", "2 vCPU", "50 GB SSD", "500 GB Bandwidth", "5 Node.js Apps", "Free SSL & Daily Backups", "Auto-Scaling", "Priority Support"],
    highlight: true,
  },
  {
    name: "Business",
    tag: "Scaling startups",
    price: "₹1,599",
    period: "/mo",
    specs: ["4 GB RAM", "4 vCPU", "100 GB NVMe", "Unmetered Bandwidth", "Unlimited Apps", "Snapshot Backups", "Advanced Auto-Scaling", "24/7 Phone Support"],
    highlight: false,
  },
];

const testimonials = [
  {
    quote: "We replaced our DIY EC2 setup with Infinitive. Deploys went from 25 minutes to 40 seconds. The PM2 + log streaming combo is chef's kiss.",
    name: "Devanshi Rao",
    role: "Senior Backend Engineer, Quill",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "Auto-scaling actually works. We hit 80k req/min during a launch and didn't lift a finger. Bill was reasonable too.",
    name: "Marcus Johnson",
    role: "CTO, RoutePilot",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote: "I'm a solo founder. The dashboard is so clean I never need to ssh. It's like Vercel for Node.js — but with proper persistent backends.",
    name: "Priya Nair",
    role: "Founder, formstack.dev",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces",
  },
];

const faqs = [
  { q: "Which Node.js versions do you support?", a: "All currently maintained LTS and Current versions — Node 18, 20, 22 and the latest. You can switch versions per app from the dashboard." },
  { q: "Can I run TypeScript apps?", a: "Yes. We detect tsconfig.json and run your build script automatically. Frameworks like NestJS and Next.js work out of the box." },
  { q: "Do you support background workers and cron jobs?", a: "Yes — define worker processes and scheduled tasks in your dashboard. We run them with PM2 and full log streaming." },
  { q: "What about WebSockets?", a: "Fully supported. Our edge layer keeps long-lived connections alive without idle timeouts that break Socket.io / SSE." },
  { q: "Can I bring my own domain?", a: "Of course. Point your DNS to us, and we'll auto-issue and renew SSL via Let's Encrypt — no config needed." },
  { q: "Is there a free trial?", a: "Yes — try any plan free for 14 days. No credit card required to start." },
];

const codeSnippet = `# Deploy your Node.js app in 3 commands
$ git remote add cloud git@infinitivecloud.com:my-app.git
$ git push cloud main

→ Building app...
→ Installing dependencies (npm ci)
→ Starting with PM2 ecosystem
✓ Deployed to https://my-app.infinitivecloud.app`;

const NodejsHosting = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Node.js Hosting India | Deploy Express, NestJS, Next.js | Infinitive Cloud</title>
        <meta
          name="description"
          content="Premium Node.js hosting with Git deploy, PM2, auto-scaling, free SSL and 24/7 expert support. Deploy Express, NestJS, Next.js apps in seconds."
        />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/nodejs-hosting" />
      </Helmet>

      <Navigation />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)/0.12),transparent_55%)]"
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
                  Now with Node 22 LTS & edge regions
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-[1.05]">
                  Node.js hosting,{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    deploy in seconds.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                  Push to Git. We build, scale and keep your app online — with PM2, auto-scaling, free SSL, and engineers on call.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <Link to="/cart">
                    <Button size="lg" className="h-12 px-7 text-base font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20">
                      Start free 14-day trial
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="h-12 px-7 text-base font-semibold">
                      Book a demo
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />No credit card</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />Free migration</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" />Cancel any time</div>
                </div>
              </div>

              {/* Code/terminal visual */}
              <div className="relative animate-fade-in">
                <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-secondary/10 to-transparent blur-3xl rounded-full" aria-hidden />
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
                  <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-destructive/60" />
                      <span className="w-3 h-3 rounded-full bg-primary/60" />
                      <span className="w-3 h-3 rounded-full bg-secondary/60" />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono ml-2">~ deploy.sh</div>
                  </div>
                  <pre className="p-5 md:p-6 text-xs md:text-sm font-mono text-foreground leading-relaxed overflow-x-auto bg-card">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
                <div className="hidden md:flex absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-xl items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg deploy time</div>
                    <div className="text-base font-bold text-foreground">38 seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ONE-CLICK HIGHLIGHT */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg">One-click Node.js deploy</div>
                  <div className="text-sm text-muted-foreground">From code to live URL in under 60 seconds — no server config required.</div>
                </div>
              </div>
              <Link to="/cart">
                <Button variant="outline" className="font-semibold">
                  Try it now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Built for developers</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">A platform that gets out of your way.</h2>
              <p className="text-muted-foreground text-lg">All the platform features you'd build yourself — but without the YAML files.</p>
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

        {/* FRAMEWORKS */}
        <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Frameworks</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Bring any framework. We'll handle the rest.</h2>
              <p className="text-muted-foreground text-lg">Auto-detected build commands and runtime config for the entire Node ecosystem.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {frameworks.map((fw) => (
                <div
                  key={fw.name}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm border border-border bg-card hover:-translate-y-0.5 transition-transform ${fw.color}`}
                >
                  {fw.name}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              ...and dozens more. If it runs on Node, it runs here.
            </p>
          </div>
        </section>

        {/* GET STARTED IN MINUTES */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Get started</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Live in minutes, not afternoons.</h2>
              <p className="text-muted-foreground text-lg">Four simple steps from your laptop to a public URL.</p>
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

        {/* PRICING */}
        <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Pricing</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Pay for what you ship.</h2>
              <p className="text-muted-foreground text-lg">Transparent pricing. Upgrade or downgrade in one click.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative transition-all duration-300 hover:-translate-y-1 ${
                    plan.highlight
                      ? "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/30"
                      : "hover:shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      Recommended
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.tag}</p>
                    </div>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-5xl font-black text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <Link to="/cart" className="block mb-8">
                      <Button
                        className={`w-full h-11 font-semibold ${
                          plan.highlight
                            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
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
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 lg:py-28">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block text-primary text-sm font-semibold mb-3">Trusted by 8,000+ developers</div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">What developers are saying.</h2>
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
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Everything else you might ask.</h2>
              <p className="text-muted-foreground text-lg">Can't find your answer? Our team replies in minutes.</p>
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
                  Ship your Node.js app today.
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
                  14 days free. No credit card. No commitment. Just code.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/cart">
                    <Button size="lg" className="h-12 px-8 text-base font-semibold bg-background text-foreground hover:bg-background/90">
                      Start free trial
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                      Talk to us
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

export default NodejsHosting;
