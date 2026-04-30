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
  Brain,
  Shield,
  Lock,
  Code2,
  ArrowRight,
  Check,
  Sparkles,
  Star,
  Gauge,
  Server,
  Users,
  Scale,
  Database,
  Cpu,
  GitBranch,
  KeyRound,
  Globe,
} from "lucide-react";
import openwebuiHero from "@/assets/openwebui-hero-premium.jpg";

const features = [
  { icon: Lock, title: "Private by default", desc: "Self-hosted on a dedicated VPS — your prompts, documents and embeddings never leave your server." },
  { icon: Brain, title: "Bring any model", desc: "OpenAI, Anthropic, Llama, Mistral, local Ollama — connect any model via API or run them locally." },
  { icon: Code2, title: "Open-source core", desc: "Inspect every line, fork it, extend it. No black boxes, no proprietary lock-in, ever." },
  { icon: Server, title: "One-click deploy", desc: "Provisioned, configured, and SSL-secured on our infrastructure in under 2 minutes." },
  { icon: Users, title: "Role-based access", desc: "Granular permissions for teams. Workspaces, model allowlists, API key scopes — all built-in." },
  { icon: KeyRound, title: "API-first architecture", desc: "REST + WebSocket APIs for every action. Integrate with your stack in minutes." },
  { icon: Database, title: "RAG-ready storage", desc: "Upload PDFs, contracts, datasets. Chat with your knowledge base, securely indexed on your VPS." },
  { icon: Gauge, title: "GPU-optional", desc: "Run on CPU for cloud-API workflows or upgrade to GPU plans for fully local inference." },
];

const steps = [
  { num: "01", title: "Deploy", desc: "Pick a plan and we provision your dedicated VPS with Openclaw pre-installed and SSL configured." },
  { num: "02", title: "Configure", desc: "Add your API keys (or local model), invite teammates, and set role permissions." },
  { num: "03", title: "Use immediately", desc: "Start chatting, building agents, or processing documents — all on infrastructure you control." },
];

const useCases = [
  {
    icon: Scale,
    title: "Legal teams",
    desc: "Review contracts, summarize case law and search internal documents — without sending data to a third party.",
  },
  {
    icon: Code2,
    title: "Dev teams",
    desc: "Self-hosted Copilot-style assistants connected to your private repos and internal docs.",
  },
  {
    icon: Database,
    title: "Data analysts",
    desc: "Chat with sensitive datasets and CSVs locally. Build reproducible analysis workflows without exposing PII.",
  },
  {
    icon: Server,
    title: "Enterprises",
    desc: "Deploy a compliant AI workspace your security team will actually approve — GDPR, HIPAA, SOC 2 friendly.",
  },
];

const plans = [
  {
    name: "Starter",
    tag: "Personal & small teams",
    price: "₹799",
    period: "/mo",
    specs: ["2 vCPU", "8 GB RAM", "100 GB NVMe SSD", "8 TB Bandwidth", "Up to 5 users", "Free SSL & Daily Backups", "Community Support"],
    highlight: false,
  },
  {
    name: "Professional",
    tag: "Growing teams & RAG",
    price: "₹1,099",
    period: "/mo",
    specs: ["4 vCPU", "16 GB RAM", "200 GB NVMe SSD", "16 TB Bandwidth", "Unlimited users", "Free SSL & Hourly Backups", "Priority Support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    tag: "Local LLMs & heavy workloads",
    price: "₹2,199",
    period: "/mo",
    specs: ["8 vCPU", "32 GB RAM", "400 GB NVMe SSD", "32 TB Bandwidth", "GPU upgrade available", "Free SSL & Hourly Backups", "24/7 Premium Support"],
    highlight: false,
  },
];

const security = [
  { icon: Lock, title: "Data never leaves your server", desc: "All inference, all embeddings, all chat history stays on your dedicated VPS." },
  { icon: Shield, title: "GDPR-ready setup", desc: "Self-hosted by design. EU data residency available. Audit logs included." },
  { icon: KeyRound, title: "Encrypted at rest & transit", desc: "AES-256 encrypted volumes, TLS 1.3 everywhere, and rotating SSH keys." },
];

const testimonials = [
  {
    quote: "Our compliance team approved Openclaw in a single review — because nothing leaves our infrastructure. That used to take months with hosted AI tools.",
    name: "Meera J.",
    role: "Head of Legal Tech, Law Firm",
  },
  {
    quote: "We're running it with local Llama 3 for sensitive research. Zero per-token costs and zero data exposure. It just works.",
    name: "Vikram T.",
    role: "Principal Researcher",
  },
];

const faqs = [
  { q: "What is Openclaw?", a: "Openclaw is a self-hosted, open-source AI workspace — a private alternative to ChatGPT-style interfaces. Connect any LLM (OpenAI, Anthropic, Llama, local models), give your team a unified UI, and keep all conversations and documents on infrastructure you own." },
  { q: "Is it truly open-source?", a: "Yes. The core platform is open-source under a permissive license. You can inspect the code, fork it, audit it, or extend it however you like — no proprietary modules required." },
  { q: "Do I need technical skills?", a: "Not for setup — we install and configure everything. To customize advanced behavior (custom plugins, local model fine-tuning), basic Linux + Python familiarity helps but isn't required." },
  { q: "Can I migrate later?", a: "Absolutely. Because everything runs on your VPS, you can export workspaces, prompts, and document indexes anytime. There's no lock-in to leave." },
  { q: "Which models are supported?", a: "OpenAI, Anthropic Claude, Google Gemini, Mistral, Cohere, plus any OpenAI-compatible endpoint. For local inference, Ollama, vLLM, and llama.cpp are all supported on our GPU plans." },
  { q: "How does role-based access work?", a: "Admins can create workspaces, invite users, assign roles (admin / member / viewer), and restrict which models or document collections each role can access." },
];

const OpenWebUIHosting = () => {
  return (
    <>
      <Helmet>
        <title>Openclaw — Self-Hosted Open-Source AI Workspace | INFINITIVE CLOUD</title>
        <meta name="description" content="Deploy Openclaw — a private, self-hosted, open-source AI platform — on a dedicated VPS in 2 minutes. Bring any LLM, own your data. From ₹799/mo." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/openclaw" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none animate-float" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

            <div className="section-container relative pt-20 pb-16 lg:pt-28 lg:pb-24">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div className="space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Open-source. Self-hosted. Yours.</span>
                  </div>

                  <h1 className="font-serif text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                    Your private{" "}
                    <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                      AI workspace
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                    Openclaw is a self-hosted, open-source AI platform. Bring any model, host any document, and give your team a private alternative to public chatbots — all on infrastructure you control.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/cart?product=openclaw-pro">
                      <Button size="lg" className="btn-gradient glow-effect h-14 px-8 font-semibold text-base">
                        Get Started
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <a href="#how-it-works">
                      <Button size="lg" variant="outline" className="h-14 px-8 font-semibold text-base">
                        Learn More
                      </Button>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      Open-source core
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      GDPR-ready
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent" />
                      Bring any LLM
                    </div>
                  </div>
                </motion.div>

                <motion.div className="relative" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-primary/30 blur-3xl opacity-40" />
                  <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                    <img
                      src={openwebuiHero}
                      alt="Openclaw self-hosted AI workspace dashboard"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl">
                    <Shield className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">100% on your VPS</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* WHAT IS IT */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6">What is Openclaw?</h2>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12">
                A complete, open-source AI platform you run on your own VPS. Think of it as a private ChatGPT for your team — except you choose the models, you own the data, and you decide who has access. Connect cloud LLMs, run local models, chat with your documents, and build agents — all from one beautiful interface.
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: Brain, label: "Multi-model AI" },
                  { icon: Lock, label: "Self-hosted" },
                  { icon: Code2, label: "Open-source" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* FEATURES */}
          <motion.section className="relative py-20 lg:py-28 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Everything you need, nothing you don't</h2>
                <p className="text-lg text-muted-foreground">Production features built for real teams — not yet another wrapper around an API.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((f, i) => (
                  <Card
                    key={i}
                    className="group relative overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <f.icon className="w-6 h-6 text-accent" />
                      </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>

          {/* HOW IT WORKS */}
          <motion.section id="how-it-works" className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">How it works</h2>
              <p className="text-lg text-muted-foreground">Three steps. No DevOps team required.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="relative">
                  <Card className="border-border/60 bg-card/70 backdrop-blur-sm h-full hover:border-accent/40 transition-all">
                    <CardContent className="p-8">
                      <div className="text-5xl font-serif font-bold bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent mb-4">
                        {s.num}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </CardContent>
                  </Card>
                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-accent/40 -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* USE CASES */}
          <motion.section className="relative py-20 lg:py-28 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Built for the teams who can't compromise on privacy</h2>
                <p className="text-lg text-muted-foreground">If your data is sensitive, regulated, or just plain valuable — Openclaw is for you.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((u, i) => (
                  <Card
                    key={i}
                    className="group border-border/60 bg-card/70 backdrop-blur-sm hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <CardContent className="p-7">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        <u.icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{u.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{u.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>

          {/* PRICING */}
          <motion.section id="pricing" className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Hosting tailored for AI workloads</h2>
              <p className="text-lg text-muted-foreground">NVMe storage, generous RAM, and an optional GPU upgrade — sized for real model inference.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((p, i) => (
                <Card
                  key={i}
                  className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                    p.highlight
                      ? "border-2 border-accent shadow-2xl shadow-accent/20 scale-[1.02]"
                      : "border-border/60 hover:border-accent/40 hover:shadow-xl"
                  }`}
                >
                  {p.highlight && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-transparent pointer-events-none" />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-accent to-primary text-xs font-semibold text-accent-foreground">
                        Recommended
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

                    <Link to="/cart?product=openclaw">
          <Button
                        className={`w-full h-12 font-semibold mb-8 ${p.highlight ? "btn-gradient glow-effect" : ""}`}
                        variant={p.highlight ? "default" : "outline"}
                      >
                        Get started
                      </Button>
                    </Link>

                    <ul className="space-y-3">
                      {p.specs.map((s, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* SECURITY */}
          <motion.section className="relative py-20 lg:py-28 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-5">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Security & compliance</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Your data, your perimeter</h2>
                <p className="text-lg text-muted-foreground">Built so your security and compliance teams can sign off without a fight.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {security.map((s, i) => (
                  <Card key={i} className="border-border/60 bg-card/70 backdrop-blur-sm hover:border-accent/40 transition-all">
                    <CardContent className="p-7">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4">
                        <s.icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>

          {/* TESTIMONIALS */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Trusted by teams who can't risk leaks</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <Card key={i} className="border-border/60 bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground/90 leading-relaxed mb-6 italic text-lg">"{t.quote}"</p>
                    <div>
                      <div className="font-semibold">{t.name}</div>
           <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">Frequently asked questions</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border border-border/60 rounded-xl px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-accent/40"
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
          </motion.section>

          {/* FINAL CTA */}
          <motion.section className="section-container pb-20 lg:pb-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative rounded-3xl border border-cyan-500/30 bg-[#0A1A2F] dark:bg-[#0A1A2F] px-6 py-16 sm:py-20 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,164,63,0.15),transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.1),transparent_60%)] pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                  <span className="text-sm font-medium text-amber-100">Live in 2 minutes</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5">
                  Deploy Openclaw —{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-cyan-300 bg-clip-text text-transparent">
                    own your data, own your workflow
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                  A private AI workspace for the teams who refuse to send their data to someone else's cloud.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/cart?product=openclaw-pro">
                    <Button
                      size="lg"
                      className="h-14 px-8 font-semibold text-white border-0 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-[0_8px_30px_-8px_rgba(245,158,11,0.5)]"
                    >
                      Deploy Openclaw
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 font-semibold bg-transparent text-white border-slate-700 hover:bg-slate-800/60 hover:text-white"
                    >
                      Talk to a Specialist
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-400">
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 30-day money back</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> GDPR-ready</div>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Cancel anytime</div>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default OpenWebUIHosting;
