import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useState } from "react";
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
  Mail,
  HardDrive,
  Video,
  FileText,
  Calendar as CalendarIcon,
  MessageSquare,
  ClipboardList,
  Globe2,
  Sheet,
  Presentation,
  Shield,
  Lock,
  Users,
  ArrowRight,
  Check,
  Sparkles,
  Star,
  Smartphone,
  HeadphonesIcon,
  Zap,
  Award,
  Wallet,
  Layers,
  UserCheck,
  ShieldCheck,
  KeyRound,
  Eye,
  Archive,
  Briefcase,
} from "lucide-react";
import workspaceHero from "@/assets/google-workspace-hero-premium.jpg";

type BillingCycle = "monthly" | "annual";

const apps = [
  { icon: Mail, name: "Gmail", desc: "Professional email at your domain", color: "text-[#EA4335]" },
  { icon: HardDrive, name: "Drive", desc: "Cloud storage with smart search", color: "text-[#34A853]" },
  { icon: Video, name: "Meet", desc: "HD video calls up to 500 people", color: "text-[#4285F4]" },
  { icon: FileText, name: "Docs", desc: "Real-time collaborative writing", color: "text-[#4285F4]" },
  { icon: Sheet, name: "Sheets", desc: "Spreadsheets with shared editing", color: "text-[#34A853]" },
  { icon: Presentation, name: "Slides", desc: "Beautiful decks, built together", color: "text-[#FBBC04]" },
  { icon: CalendarIcon, name: "Calendar", desc: "Smart scheduling for teams", color: "text-[#4285F4]" },
  { icon: MessageSquare, name: "Chat", desc: "Direct messages & spaces", color: "text-[#34A853]" },
  { icon: ClipboardList, name: "Forms", desc: "Surveys, quizzes & feedback", color: "text-[#673AB7]" },
  { icon: Globe2, name: "Sites", desc: "Internal portals, no code needed", color: "text-[#EA4335]" },
];

const reasons = [
  { icon: Zap, title: "Easier setup & onboarding", desc: "We configure DNS, MX records, user accounts and your custom domain — all in one go." },
  { icon: Wallet, title: "Local billing in INR", desc: "Pay in rupees, get GST invoices, and forget about international transaction fees." },
  { icon: Layers, title: "Bundle with hosting", desc: "Already on Infinitive Cloud? Add Workspace to your existing plan and consolidate billing." },
  { icon: UserCheck, title: "Dedicated account manager", desc: "A real human who knows your account — not a ticketing queue. Reach out anytime." },
  { icon: HeadphonesIcon, title: "24/7 expert support", desc: "Email, chat, phone — in your timezone, in your language. Average response under 3 minutes." },
  { icon: ShieldCheck, title: "Free migration assistance", desc: "Moving from Outlook, Zoho, cPanel mail or legacy G Suite? We handle it — zero downtime." },
];

const plans = [
  {
    name: "Business Starter",
    tag: "Perfect for small teams",
    monthly: 136,
    annual: 125,
    storage: "30 GB",
    meet: "100 participants",
    features: [
      "Custom email at your domain",
      "30 GB pooled cloud storage",
      "Google Meet up to 100 participants",
      "Standard support included",
      "Security & management controls",
    ],
    highlight: false,
  },
  {
    name: "Business Standard",
    tag: "Most teams choose this",
    monthly: 736,
    annual: 672,
    storage: "2 TB",
    meet: "150 participants",
    features: [
      "Everything in Starter",
      "2 TB pooled cloud storage",
      "Meet recording + noise cancellation",
      "150 participants + breakout rooms",
      "eSignature with Docs & PDFs",
    ],
    highlight: true,
  },
  {
    name: "Business Plus",
    tag: "For growing companies",
    monthly: 1380,
    annual: 1260,
    storage: "5 TB",
    meet: "500 participants",
    features: [
      "Everything in Standard",
      "5 TB pooled cloud storage",
      "Meet attendance tracking",
      "Vault for retention & eDiscovery",
      "Advanced endpoint management",
    ],
    highlight: false,
  },
  {
    name: "Enterprise",
    tag: "For large organisations",
    monthly: null as number | null,
    annual: null as number | null,
    storage: "5 TB+",
    meet: "1,000 participants",
    features: [
      "Everything in Business Plus",
      "Unlimited pooled storage*",
      "Meet noise cancellation + live streams",
      "S/MIME encrypted email",
      "Premium 24/7 support & SLA",
    ],
    highlight: false,
  },
];

const collab = [
  { icon: Video, title: "Meet — face to face, anywhere", desc: "HD video calls with up to 500 participants. Background blur, live captions, recording — built in." },
  { icon: FileText, title: "Docs — co-edit in real time", desc: "Watch teammates' cursors, leave comments, suggest edits. No more emailing v17_FINAL.docx." },
  { icon: HardDrive, title: "Drive — share without thinking", desc: "Smart sharing with link controls, expiry dates and audit trails. Files find themselves." },
];

const security = [
  { icon: KeyRound, label: "2-step verification" },
  { icon: Smartphone, label: "Device management" },
  { icon: Eye, label: "Phishing protection" },
  { icon: Briefcase, label: "Admin console" },
  { icon: Archive, label: "Vault archiving" },
  { icon: Lock, label: "Encrypted at rest & transit" },
];

const migrationSteps = [
  { num: "01", title: "Share your current setup", desc: "Tell us where your email lives today — Outlook, Zoho, legacy G Suite, cPanel — and how many users." },
  { num: "02", title: "We plan the migration", desc: "Our team maps your accounts, aliases and folders, then schedules the cutover during your quiet hours." },
  { num: "03", title: "Zero-downtime switch", desc: "We sync historical mail, flip MX records, and your team keeps working without missing a single message." },
];

const testimonials = [
  {
    quote: "Setting up @welkinmedia.in took an afternoon, including migration of 14 mailboxes. Our clients finally take our emails seriously.",
    name: "Aanya R.",
    role: "Founder, Welkin Media",
    rating: 5,
  },
  {
    quote: "Switching from cPanel mail was overdue. Drive saves us from emailing massive PDFs, and Meet replaced our paid Zoom plan instantly.",
    name: "Karthik V.",
    role: "Director, retail group",
    rating: 5,
  },
  {
    quote: "INR billing, GST invoices, and a real human on WhatsApp when I had a DNS question at 11 pm. That's the part Google can't give us directly.",
    name: "Devika P.",
    role: "Co-founder, SaaS startup",
    rating: 5,
  },
];

const faqs = [
  { q: "What's included in Google Workspace?", a: "Custom email at your domain (Gmail), Drive cloud storage, Meet video conferencing, Docs / Sheets / Slides for collaboration, Calendar, Chat, Forms, Sites, plus admin and security controls — all in one subscription." },
  { q: "Can I use my existing domain?", a: "Yes. We'll connect your existing domain, configure the MX and verification records for you, and migrate your team to professional email at your-name@yourcompany.com — usually within 24 hours." },
  { q: "What happens after the free trial?", a: "If you love it, we move you to your chosen plan with INR billing. If not, just cancel — no charges, no data lock-in. You can export everything at any time." },
  { q: "Is there a minimum number of users?", a: "Just one. Whether you're a solo founder or a 500-person company, the same Workspace plans are available — and you only pay for the seats you use." },
  { q: "How is billing handled?", a: "Monthly or annual, in INR, with proper GST invoices. Annual plans save you ~10%. You can add or remove users anytime — billing prorates automatically." },
  { q: "Can I switch plans later?", a: "Anytime. Upgrade from Starter to Standard or Plus in one click — your storage, features and Meet limits update instantly with no service interruption." },
  { q: "Do you offer migration from G Suite or legacy plans?", a: "Yes — and it's free. We handle migrations from legacy G Suite, Outlook / Microsoft 365, Zoho Mail, cPanel mailboxes and IMAP/POP servers. Zero downtime, full mail history preserved." },
];

const trustBadges = [
  { icon: Award, label: "Google Cloud Partner" },
  { icon: Shield, label: "99.9% uptime SLA" },
  { icon: HeadphonesIcon, label: "24/7 expert support" },
  { icon: Check, label: "14-day money back" },
];

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

const GoogleWorkspace = () => {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <>
      <Helmet>
        <title>Google Workspace Hosting in India — INFINITIVE CLOUD</title>
        <meta
          name="description"
          content="Google Workspace for your business — custom email, Drive, Meet, Docs and more. INR billing, free migration, 24/7 support. Plans from ₹125/user/mo."
        />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/google-workspace" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#EA4335]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container relative pt-20 pb-16 lg:pt-28 lg:pb-24">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-8 animate-fade-in">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Authorised Google Workspace reseller
                    </span>
                  </div>

                  <h1 className="font-serif text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                    Your team's new home —{" "}
                    <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                      powered by Google
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                    All Google apps in one place. Custom email at your domain, 30+ GB per user, Meet,
                    Drive, Docs and more — set up by us, used by your team, starting at{" "}
                    <span className="font-semibold text-foreground">₹125/user/month</span>.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact?topic=google-workspace">
                      <Button
                        size="lg"
                        className="btn-gradient glow-effect h-14 px-8 font-semibold text-base"
                      >
                        Get Google Workspace
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <a href="#pricing">
                      <Button size="lg" variant="outline" className="h-14 px-8 font-semibold text-base">
                        Compare Plans
                      </Button>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-sm text-muted-foreground">
                    {trustBadges.map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <b.icon className="w-4 h-4 text-primary" />
                        <span>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4285F4]/30 via-[#EA4335]/20 to-[#FBBC04]/20 blur-3xl opacity-40" />
                  <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                    <img
                      src={workspaceHero}
                      alt="Gmail inbox with custom domain email surrounded by Google Workspace apps"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-medium">Live: 4,200+ teams onboarded</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* APPS SHOWCASE */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                One subscription. Every tool your team will ever need.
              </h2>
              <p className="text-lg text-muted-foreground">
                Email, storage, video calls, documents, calendars — all working together, all from one login.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {apps.map((app, i) => (
                <Card
                  key={i}
                  className="group relative overflow-hidden border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-background to-muted flex items-center justify-center mb-4 border border-border/60 group-hover:scale-110 transition-transform">
                      <app.icon className={`w-7 h-7 ${app.color}`} />
                    </div>
                    <h3 className="font-semibold text-base mb-1">{app.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* WHY THROUGH US */}
          <motion.section className="relative py-20 lg:py-28 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Why buy through us</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                  Same Google. Better experience.
                </h2>
                <p className="text-lg text-muted-foreground">
                  Identical product, identical pricing — but with the human support and local convenience you don't get
                  buying direct.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reasons.map((r, i) => (
                  <Card
                    key={i}
                    className="group border-border/60 bg-card/70 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <CardContent className="p-7">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <r.icon className="w-6 h-6 text-primary" />
                      </div>
       <h3 className="font-semibold text-lg mb-2">{r.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>

          {/* PRICING */}
          <motion.section id="pricing" className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                Simple, per-user pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Start with one user, scale to thousands. Upgrade, downgrade or cancel anytime.
              </p>
            </div>

            {/* Billing toggle */}
            <div className="flex justify-center mb-12">
              <div
                role="tablist"
                aria-label="Billing cycle"
                className="inline-flex items-center p-1 rounded-full border border-border/60 bg-card/70 backdrop-blur-sm"
              >
                <button
                  role="tab"
                  aria-selected={billing === "monthly"}
                  onClick={() => setBilling("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    billing === "monthly"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  role="tab"
                  aria-selected={billing === "annual"}
                  onClick={() => setBilling("annual")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                    billing === "annual"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Annual
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    Save 10%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((p, i) => {
                const price = billing === "annual" ? p.annual : p.monthly;
                return (
                  <Card
                    key={i}
                    className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                      p.highlight
                        ? "border-2 border-primary shadow-2xl shadow-primary/20 lg:scale-[1.03]"
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
                    <CardContent className="relative p-7 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{p.tag}</p>

                      <div className="mb-6 min-h-[80px]">
                        {price === null ? (
                          <div>
                            <div className="text-3xl font-serif font-bold">Custom</div>
                            <p className="text-xs text-muted-foreground mt-1">Tailored for your org</p>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-serif font-bold">₹{formatINR(price)}</span>
                              <span className="text-muted-foreground text-sm">/user/mo</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {billing === "annual"
                                ? `Billed annually · Save ₹${formatINR((p.monthly! - p.annual!) * 12)}/user/yr`
                                : "Billed monthly · Cancel anytime"}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-6 text-xs">
                        <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                          <div className="text-muted-foreground">Storage</div>
                          <div className="font-semibold">{p.storage}</div>
                        </div>
                        <div className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                          <div className="text-muted-foreground">Meet</div>
                          <div className="font-semibold">{p.meet}</div>
                        </div>
                      </div>

                      <Link to={price === null ? "/contact?topic=workspace-enterprise" : "/contact?topic=google-workspace"}>
                        <Button
                          className={`w-full h-11 font-semibold mb-6 ${
                            p.highlight ? "btn-gradient glow-effect" : ""
                          }`}
                          variant={p.highlight ? "default" : "outline"}
                        >
                          {price === null ? "Talk to sales" : "Start free trial"}
                        </Button>
                      </Link>

                      <ul className="space-y-2.5 flex-1">
                        {p.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
               </Card>
                );
              })}
            </div>

            <p className="text-center mt-10 text-sm text-muted-foreground">
              Need more than 10 users or custom requirements?{" "}
              <Link
                to="/contact?topic=workspace-enterprise"
                className="text-primary font-semibold hover:underline"
              >
                Get a custom quote →
              </Link>
            </p>
          </motion.section>

          {/* CUSTOM EMAIL FEATURE */}
          <motion.section className="relative py-20 lg:py-28 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="space-y-6 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">The star feature</span>
                  </div>

                  <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-tight">
                    Your name. Your brand.
                    <br />
                    <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
                      Your email — @yourcompany.com
                    </span>
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Stop sending business emails from a free Gmail address. Get the inbox you already
                    know — running on your custom domain, with all the polish your customers expect.
                  </p>

                  <ul className="space-y-3">
                    {[
                      "No more @gmail.com or @outlook.com",
                      "Looks instantly more professional to clients",
                      "Works on Gmail web, iOS, Android — and any IMAP client",
                      "30 GB+ per user with unified inbox & smart spam filtering",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact?topic=google-workspace">
                    <Button size="lg" className="btn-gradient glow-effect h-14 px-8 font-semibold mt-2">
                      Set up custom email
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                <div className="relative order-1 lg:order-2">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4285F4]/30 via-[#FBBC04]/20 to-[#34A853]/20 blur-3xl opacity-50" />
                  <div className="relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl">
                    <img
                      src={workspaceHero}
                      alt="Gmail inbox showing a professional email at custom company domain"
                      loading="lazy"
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* COLLABORATION */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                Built for the way your team actually works
              </h2>
              <p className="text-lg text-muted-foreground">
                HD video calls with up to 500 people. Co-edit docs in real time. Share files instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {collab.map((c, i) => (
                <Card
                  key={i}
                  className="group border-border/60 bg-card/70 backdrop-blur-sm hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <c.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* SECURITY */}
          <motion.section className="relative py-20 lg:py-28 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Security & admin</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                  Enterprise-grade security. Without the enterprise complexity.
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything your IT and compliance teams need — managed from one admin
                  console.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {security.map((s, i) => (
                  <div
                    key={i}
                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:-translate-y-1 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-center">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* MIGRATION */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium">Free migration assistance</span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                Already using another email provider? We'll move everything.
              </h2>
              <p className="text-lg text-muted-foreground">
                Outlook, Zoho, legacy G Suite, cPanel mail or anything else — we move every mailbox without losing a single message.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {migrationSteps.map((s, i) => (
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
                  {i < migrationSteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-primary/40 -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* TESTIMONIALS */}
          <motion.section className="relative py-20 lg:py-28 overflow-hidden" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="section-container relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                  Loved by teams across India
                </h2>
                <p className="text-lg text-muted-foreground">
                  Agencies, retailers, and startups — all running on Workspace through Infinitive Cloud.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <Card
                    key={i}
                    className="border-border/60 bg-card/70 backdrop-blur-sm hover:shadow-xl transition-all"
                  >
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-foreground/90 leading-relaxed mb-6 italic">"{t.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center font-semibold text-foreground">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{t.name}</div>
                          <div className="text-sm text-muted-foreground">{t.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section className="section-container py-20 lg:py-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-5">
                  Frequently asked questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything teams ask before switching. Still have a question? We're a click away.
                </p>
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
          </motion.section>

          {/* FINAL CTA */}
          <motion.section className="section-container pb-20 lg:pb-28" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative rounded-3xl border border-cyan-500/30 bg-[#0A1A2F] dark:bg-[#0A1A2F] px-6 py-16 sm:py-20 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(66,133,244,0.15),transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(234,67,53,0.12),transparent_60%)] pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-sm font-medium text-cyan-100">14-day free trial — no card needed</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5">
                  Give your team the{" "}
                  <span className="bg-gradient-to-r from-[#4285F4] via-[#FBBC04] to-[#EA4335] bg-clip-text text-transparent">
                    tools they deserve
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                  Set up in minutes. Cancel anytime. We handle migration, configuration and DNS — you just log in.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact?topic=google-workspace">
                    <Button
                      size="lg"
                      className="h-14 px-8 font-semibold text-white border-0 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 shadow-[0_8px_30px_-8px_rgba(34,211,238,0.5)]"
                    >
                      Start free trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 font-semibold bg-transparent text-white border-slate-700 hover:bg-slate-800/60 hover:text-white"
                    >
                      Talk to an expert
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> Free migration
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> 24/7 support
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400" /> 99.9% uptime SLA
                  </div>
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

export default GoogleWorkspace;
