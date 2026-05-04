import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, Zap, Settings, Activity, RefreshCw, Headphones,
  ArrowRight, CheckCircle2, Server, Database, Lock, Cloud,
  Terminal, GitBranch, Bell, Gauge, Clock, Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import NOCMonitoringDiagram from "@/components/infographics/NOCMonitoringDiagram";
import LazyVisible from "@/components/LazyVisible";

const services = [
  { icon: Settings, title: "Server Setup & Configuration", description: "OS provisioning, kernel tuning, firewall, fail2ban, and a CIS-aligned hardening baseline applied on day zero." },
  { icon: Shield, title: "Security & Patch Management", description: "Continuous vulnerability scanning, scheduled patch windows, audit logs, and rollback-ready change control." },
  { icon: Activity, title: "24 / 7 Server Monitoring", description: "Granular telemetry on CPU, RAM, disk I/O, and network with paged on-call response under 60 seconds." },
  { icon: RefreshCw, title: "Backup & Disaster Recovery", description: "Encrypted offsite backups, immutable snapshots, and DR runbooks rehearsed every quarter." },
  { icon: Zap, title: "Performance Optimization", description: "Caching layers, database tuning, NGINX / PHP-FPM optimization, and load-balanced capacity planning." },
  { icon: Headphones, title: "Dedicated Support Team", description: "Named technical account manager, Slack / Teams bridge, and priority escalation for production-critical issues." },
];

const slas = [
  { v: "< 60 s", l: "First response on P1 alerts", icon: Bell },
  { v: "< 4 min", l: "Mean time to remediate", icon: Clock },
  { v: "99.99 %", l: "Operational uptime target", icon: Gauge },
  { v: "ISO 27001", l: "Aligned operating procedures", icon: Award },
];

const scope = [
  { cat: "Operating System", items: ["Ubuntu / Debian", "AlmaLinux / Rocky", "Windows Server", "Custom kernels"] },
  { cat: "Web & App Stack", items: ["NGINX / Apache / LiteSpeed", "PHP-FPM, Node, Python", "WordPress / WooCommerce", "Docker & Compose"] },
  { cat: "Databases", items: ["MySQL / MariaDB", "PostgreSQL", "Redis / Memcached", "MongoDB"] },
  { cat: "Security", items: ["Firewall (UFW / firewalld / CSF)", "fail2ban / ModSecurity", "ImunifyAV / ClamAV", "TLS / Let's Encrypt"] },
  { cat: "Backup & DR", items: ["Restic / BorgBackup", "Snapshot replication", "Offsite cold storage", "Quarterly DR drills"] },
  { cat: "Observability", items: ["Prometheus + Grafana", "Loki / Elastic logs", "HetrixTools uptime", "PagerDuty escalation"] },
];

const process = [
  { step: "01", title: "Audit & Baseline", desc: "We inventory every service, port, cron, and dependency, then publish a hardening report with prioritized actions." },
  { step: "02", title: "Onboard & Harden", desc: "Apply the CIS-aligned baseline, deploy monitoring agents, install backup tooling, and document runbooks." },
  { step: "03", title: "Operate & Monitor", desc: "24/7 NOC keeps watch. Alerts trigger paged engineers, never bots — with auto-remediation where safe." },
  { step: "04", title: "Improve Continuously", desc: "Monthly performance review, capacity forecast, and security posture report delivered to your inbox." },
];

const faqs = [
  { q: "Do you manage servers we host elsewhere?", a: "Yes. We support Infinitive Cloud servers and any VPS or dedicated server you host with another provider — AWS, DigitalOcean, Hetzner, OVH, and more." },
  { q: "What is your response time for emergencies?", a: "P1 incidents are paged to an on-call engineer with a first-response target under 60 seconds and a 4-minute mean time to remediate." },
  { q: "Will I have a single point of contact?", a: "Every managed plan includes a named technical account manager plus a shared Slack or Teams channel for direct collaboration." },
  { q: "Do you handle migrations as part of management?", a: "Lift-and-shift migrations of up to one mid-size workload are included on annual plans. Larger migrations are scoped separately." },
];

const ServerManagement = () => {
  return (
    <>
      <Helmet>
        <title>Managed Server Services India | 24/7 NOC - Infinitive Cloud</title>
        <meta name="description" content="Enterprise-grade managed server services. 24/7 NOC, sub-minute alert response, CIS hardening, patch management, backups, and a named technical account manager." />
        <meta name="keywords" content="managed server India, server management, 24/7 NOC, server security, server optimization, managed VPS, managed dedicated" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/server-management" />
        <meta property="og:title" content="Managed Server Services | 24/7 NOC" />
        <meta property="og:description" content="Engineer-led managed server operations with sub-minute response and a named TAM." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/server-management" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Managed Server Services | 24/7 NOC" />
        <meta name="twitter:description" content="Engineer-led managed server operations with sub-minute response and a named TAM." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* HERO */}
          <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} aria-hidden />
            <div className="section-container relative z-10 pb-12 lg:pb-20">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold tracking-[0.18em] uppercase">
                    <Activity className="h-3.5 w-3.5" />
                    Engineer-led NOC · 24 / 7
                  </span>
                  <h1 className="tracking-tight text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
                    <span className="gradient-text">Managed Server</span>
                    <br />
                    <span className="text-foreground">operations, on autopilot.</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                    Hand off the pager. Our certified engineers run, harden, patch, and tune your servers — Linux or Windows, anywhere they live — with sub-minute alert response and a named account lead.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact?topic=managed-servers">
                      <Button className="btn-gradient glow-effect h-14 px-8 font-semibold text-base">
                        Get a Custom Quote
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" className="h-14 px-8 font-semibold text-base">Talk to an Engineer</Button>
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-sm text-muted-foreground">
                    {[
                      "RHCE / LPIC engineers",
                      "ISO 27001 procedures",
                      "Works with any provider",
                      "Sub-minute response",
                    ].map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LazyVisible minHeight={400}><NOCMonitoringDiagram /></LazyVisible>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SLA STRIP */}
          <section className="section-container mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {slas.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-2xl border border-border bg-card/50 backdrop-blur px-5 py-6 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">SLA</span>
                    </div>
                    <div className="text-3xl font-extrabold text-foreground">{s.v}</div>
                    <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* SERVICES */}
          <section className="section-container mb-20">
            <div className="max-w-3xl mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">What we run for you</span>
              <h2 className="mt-3">Operations as a discipline, not an afterthought.</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Every plan is engineered around six pillars. No upsells, no tier games — just senior operators on call.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Card className="card-hover h-full">
                      <CardContent className="p-7">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-[var(--shadow-medium)]">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{f.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* SCOPE OF WORK MATRIX */}
          <section className="section-container mb-20">
            <div className="max-w-3xl mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Scope of work</span>
              <h2 className="mt-3">A stack we know down to the kernel.</h2>
              <p className="mt-4 text-muted-foreground text-lg">
                We cover the layers most teams cobble together from three vendors. One contract, one team, full ownership.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {scope.map((s, i) => {
                const icons = [Server, Cloud, Database, Lock, RefreshCw, Activity];
                const Icon = icons[i];
                return (
                  <div key={s.cat} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-base font-bold">{s.cat}</h3>
                    </div>
                    <ul className="space-y-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PROCESS TIMELINE */}
          <section className="section-container mb-20">
            <div className="max-w-3xl mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">How onboarding works</span>
              <h2 className="mt-3">From audit to autopilot in under 72 hours.</h2>
            </div>
            <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              {process.map((p, i) => {
                const icons = [Terminal, Lock, Activity, GitBranch];
                const Icon = icons[i];
                return (
                  <motion.div
                    key={p.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative rounded-2xl border border-border bg-card p-6"
                  >
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-medium)] mb-4">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-[11px] font-bold tracking-[0.25em] text-primary mb-1">STEP {p.step}</div>
                    <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="section-container mb-20">
            <div className="max-w-3xl mb-10">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">FAQ</span>
              <h2 className="mt-3">Questions teams usually ask first.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-bold mb-2">{f.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="section-container">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-accent/10 to-background border-2 border-primary/20">
              <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <CardContent className="relative py-14 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-6">
                  <Headphones className="h-3.5 w-3.5" />
                  Ready when you are
                </span>
                <h2 className="mb-4">Hand the pager to engineers who answer it.</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Tell us about your environment. We'll send a scoped proposal — fixed-price, no surprises — within one business day.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact?topic=managed-servers">
                    <Button className="btn-gradient glow-effect h-14 px-8 font-semibold">
                      Get Custom Quote
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" className="h-14 px-8 font-semibold">Schedule a Call</Button>
                  </Link>
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

export default ServerManagement;
