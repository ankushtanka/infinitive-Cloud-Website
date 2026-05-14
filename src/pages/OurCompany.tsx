import { Helmet } from "react-helmet";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Cpu, Globe2, Zap } from "lucide-react";

/**
 * "Our Company" — a cinematic, scroll-driven brand page.
 * Visual direction inspired by creative-studio sites: dark canvas, oversized
 * editorial type, animated gradient orb, marquee, project carousel and a bold
 * contact close. All content is original to INFINITIVE CLOUD.
 */

const projects = [
  {
    title: "GeoCore Datalake",
    tag: "Private Cloud · Bare-metal",
    blurb: "Petabyte-scale analytics platform migrated to our Mumbai region with sub-ms storage fabric.",
    accent: "from-amber-300/40 via-rose-300/20 to-transparent",
  },
  {
    title: "Atlas Commerce",
    tag: "Managed Hosting · Edge",
    blurb: "Headless commerce stack serving 14M sessions/month across India, EU and APAC edges.",
    accent: "from-sky-300/40 via-indigo-300/20 to-transparent",
  },
  {
    title: "Northwind AI",
    tag: "GPU Cluster · LLM Ops",
    blurb: "H100 cluster with private model serving, observability and fine-tune pipelines.",
    accent: "from-emerald-300/40 via-teal-300/20 to-transparent",
  },
  {
    title: "Sigma Trade Desk",
    tag: "Low-latency · FinOps",
    blurb: "Co-located trading infra with deterministic networking and 24×7 NOC handover.",
    accent: "from-fuchsia-300/40 via-purple-300/20 to-transparent",
  },
];

const capabilities = [
  { icon: Cpu, label: "Private Cloud Engineering" },
  { icon: Globe2, label: "Global Edge Delivery" },
  { icon: Sparkles, label: "AI & GPU Infrastructure" },
  { icon: Zap, label: "Performance & Reliability" },
];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${
        shown ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-[6px]"
      }`}
    >
      {children}
    </div>
  );
};

const OurCompany = () => {
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const next = () => setActive((i) => (i + 1) % projects.length);
  const prev = () => setActive((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
      <Helmet>
        <title>Our Company — INFINITIVE CLOUD | Infrastructure for the Ambitious</title>
        <meta
          name="description"
          content="Meet INFINITIVE CLOUD — a private-cloud and infrastructure studio engineering high-performance hosting, edge delivery and AI platforms for ambitious teams."
        />
        <link rel="canonical" href="https://infinitivecloud.com/our-company" />
      </Helmet>

      <Navigation />

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24">
        {/* animated gradient orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(60rem 60rem at ${mouse.x * 100}% ${mouse.y * 100}%, hsla(38, 70%, 55%, 0.18), transparent 60%), radial-gradient(40rem 40rem at 80% 20%, hsla(220, 80%, 50%, 0.18), transparent 60%), #0A0A0B`,
            transition: "background 600ms ease",
          }}
        />
        {/* grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <div className="section-container relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/70 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              Our Company
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1
              className="mt-8 font-serif font-light leading-[0.95] tracking-tight text-white"
              style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}
            >
              An infrastructure studio,
              <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200">
                engineered for the ambitious.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-10 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
              We build private cloud, edge and AI platforms for teams that refuse to compromise on
              performance. Serious engineering, calm operations, and a craft mindset behind every rack.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 px-7 h-12 font-bold">
                  Start a project <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/solutions">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/25 text-white bg-transparent hover:bg-white/10 hover:text-white px-7 h-12 font-bold"
                >
                  Explore capabilities
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center text-[10px] uppercase tracking-[0.4em] text-white/40">
          Scroll to explore
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <section className="relative border-y border-white/10 bg-white/[0.02] py-6 overflow-hidden">
        <div className="flex gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap text-white/40 text-sm uppercase tracking-[0.3em]">
          {[...Array(2)].map((_, r) => (
            <div key={r} className="flex gap-16 shrink-0">
              {[
                "Private Cloud",
                "Bare-metal",
                "GPU Clusters",
                "Edge CDN",
                "Managed Kubernetes",
                "24×7 NOC",
                "ISO 27001",
                "Tier-IV DC",
                "Zero-downtime",
                "FinOps",
              ].map((t) => (
                <span key={t + r} className="flex items-center gap-16">
                  {t}
                  <span className="w-1 h-1 rounded-full bg-amber-300/60" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* ===================== SELECTED WORK ===================== */}
      <section className="relative py-32">
        <div className="section-container">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">Selected Work</div>
                <h2 className="font-serif font-light text-5xl md:text-7xl leading-[1] max-w-3xl">
                  Quiet platforms behind <span className="italic">loud</span> businesses.
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border border-white/20 hover:bg-white hover:text-black transition flex items-center justify-center"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full border border-white/20 hover:bg-white hover:text-black transition flex items-center justify-center"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative h-[60vh] min-h-[420px] rounded-3xl border border-white/10 overflow-hidden bg-white/[0.02]">
              {projects.map((p, i) => (
                <div
                  key={p.title}
                  className={`absolute inset-0 transition-all duration-[900ms] ease-out ${
                    i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04] pointer-events-none"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />
                  <div className="relative h-full flex flex-col justify-end p-8 md:p-14">
                    <div className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">{p.tag}</div>
                    <h3 className="font-serif text-4xl md:text-6xl font-light leading-tight mb-4">{p.title}</h3>
                    <p className="max-w-xl text-white/70 text-base md:text-lg">{p.blurb}</p>
                  </div>
                </div>
              ))}
              <div className="absolute top-6 right-6 text-xs tracking-[0.3em] text-white/50">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
            </div>
          </Reveal>

          <div className="mt-6 flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all ${i === active ? "w-12 bg-white" : "w-6 bg-white/20"}`}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MANIFESTO ===================== */}
      <section className="relative py-32 border-t border-white/10">
        <div className="section-container max-w-5xl">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">What we believe</div>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-serif font-light text-3xl md:text-5xl leading-[1.15] text-white/90">
              Infrastructure should disappear. The best platforms are the ones nobody talks about —
              they just keep working, year after year, while the product team ships.
              <br />
              <br />
              We obsess over the boring parts: redundancy, latency budgets, cost models, runbooks.
              We treat hardware like a craft and software like a discipline. We answer the phone at
              <span className="italic"> 3 a.m.</span> because that's the job.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {capabilities.map(({ icon: Icon, label }) => (
                <div key={label} className="group">
                  <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center mb-4 group-hover:border-amber-300/60 transition">
                    <Icon className="w-5 h-5 text-amber-200" />
                  </div>
                  <div className="text-sm font-semibold text-white/80">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="relative py-24 border-t border-white/10 bg-white/[0.02]">
        <div className="section-container grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { k: "99.99%", v: "Uptime SLA" },
            { k: "12+", v: "Global PoPs" },
            { k: "<30s", v: "NOC response" },
            { k: "10y+", v: "Engineering craft" },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 90}>
              <div>
                <div className="font-serif font-light text-5xl md:text-6xl text-white">{s.k}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section className="relative py-40 border-t border-white/10">
        <div className="section-container max-w-5xl">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">Let's interface</div>
          </Reveal>
          <Reveal delay={120}>
            <h2
              className="font-serif font-light leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
            >
              Bring us the
              <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200">
                hard problems.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-14 grid md:grid-cols-2 gap-10 text-white/70">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">New business</div>
                <a href="mailto:hello@infinitivecloud.com" className="text-2xl text-white hover:text-amber-200 transition">
                  hello@infinitivecloud.com
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">Visit us</div>
                <p className="text-lg text-white">INFINITIVE CLOUD PVT LTD</p>
                <p>India · Global operations</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={380}>
            <div className="mt-14 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 px-7 h-12 font-bold">
                  Book a call <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/quote">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/25 text-white bg-transparent hover:bg-white/10 hover:text-white px-7 h-12 font-bold"
                >
                  Request a quote
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurCompany;
