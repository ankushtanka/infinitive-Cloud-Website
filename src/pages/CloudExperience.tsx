import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Environment, Sparkles, Html, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Database, Globe2, Shield, Zap, Activity, Cloud, Lock, ServerIcon } from "lucide-react";
import Scene3D from "@/components/cloud-experience/Scene3D";
import "@/components/cloud-experience/cursor.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * /experience — cinematic, scroll-driven WebGL journey through a futuristic
 * cloud infrastructure. Fixed full-viewport <Canvas/> renders the 3D world
 * while overlay sections drive camera + scene state via a shared scroll
 * progress ref.
 */

type SectionKey = "hero" | "infra" | "network" | "security" | "performance" | "cta";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "hero", label: "Origin" },
  { key: "infra", label: "Infrastructure" },
  { key: "network", label: "Network" },
  { key: "security", label: "Security" },
  { key: "performance", label: "Performance" },
  { key: "cta", label: "Deploy" },
];

const CloudExperience = () => {
  const scrollProgress = useRef(0); // 0..1 across the page
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // global mouse tracking (parallax + custom cursor)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP ScrollTriggers for section detection + UI reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach(({ key }) => {
        ScrollTrigger.create({
          trigger: `#section-${key}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(key);
          },
        });
      });

      // Reveal text blocks on scroll
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-stagger > *").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="cursor-none-area relative bg-[#02030a] text-white">
      <Helmet>
        <title>Cloud Experience — INFINITIVE CLOUD | Cinematic Infrastructure Tour</title>
        <meta
          name="description"
          content="A cinematic, scroll-driven WebGL journey through INFINITIVE CLOUD's next-generation infrastructure: servers, network, security and performance."
        />
        <link rel="canonical" href="https://infinitivecloud.com/experience" />
      </Helmet>

      {/* ===== Custom futuristic cursor ===== */}
      <div
        className="ce-cursor pointer-events-none fixed z-[100] hidden md:block"
        style={{ transform: `translate3d(${cursorPos.x - 16}px, ${cursorPos.y - 16}px, 0)` }}
      >
        <div className="ce-cursor-dot" />
        <div className="ce-cursor-ring" />
      </div>

      {/* ===== Fixed 3D Canvas ===== */}
      <div className="fixed inset-0 z-0">
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 200 }}
        >
          <color attach="background" args={["#02030a"]} />
          <fog attach="fog" args={["#02030a", 12, 60]} />
          <Suspense fallback={null}>
            <Scene3D scrollRef={scrollProgress} mouse={mouse} active={activeSection} />
          </Suspense>
        </Canvas>

        {/* Vignette + grain overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* ===== Floating Navbar ===== */}
      <FloatingNav active={activeSection} />

      {/* ===== Scroll progress rail ===== */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() =>
              document.getElementById(`section-${s.key}`)?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-3"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`block h-px transition-all duration-500 ${
                activeSection === s.key ? "w-10 bg-cyan-300" : "w-5 bg-white/30 group-hover:bg-white/60"
              }`}
            />
            <span
              className={`text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${
                activeSection === s.key ? "text-cyan-300" : "text-white/40 group-hover:text-white/70"
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* ===== Sections (overlay UI) ===== */}
      <main className="relative z-10">
        <HeroSection />
        <InfraSection />
        <NetworkSection />
        <SecuritySection />
        <PerformanceSection />
        <CTASection />
        <FooterMini />
      </main>
    </div>
  );
};

/* ============================================================
 * UI: Floating navigation
 * ============================================================ */
const FloatingNav = ({ active }: { active: SectionKey }) => (
  <header className="fixed top-0 inset-x-0 z-50">
    <div className="mx-auto mt-4 max-w-6xl px-4">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(0,200,255,0.4)]">
        <a href="/" className="flex items-center gap-2 group">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400 to-purple-500 blur-md opacity-70 group-hover:opacity-100 transition" />
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-300 to-purple-400 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-black" />
            </div>
          </div>
          <span className="font-semibold tracking-wide text-sm">INFINITIVE<span className="text-cyan-300"> CLOUD</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-white/60">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => document.getElementById(`section-${s.key}`)?.scrollIntoView({ behavior: "smooth" })}
              className={`hover:text-white transition ${active === s.key ? "text-cyan-300" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <a
          href="/contact"
          className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(0,200,255,0.45)] hover:shadow-[0_0_36px_rgba(160,100,255,0.6)] transition"
        >
          Deploy
        </a>
      </div>
    </div>
  </header>
);

/* ============================================================
 * SECTION 1 — HERO
 * ============================================================ */
const HeroSection = () => (
  <section id="section-hero" className="relative min-h-[110vh] flex items-center">
    <div className="mx-auto max-w-6xl px-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-cyan-200 backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_#22d3ee]" />
          Live infrastructure tour
        </div>
        <h1
          className="mt-8 font-light tracking-tight leading-[0.95]"
          style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)", fontFamily: "'Instrument Serif', serif" }}
        >
          Next Generation
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 italic">
            Cloud Infrastructure
          </span>
        </h1>
        <p className="mt-8 text-lg md:text-2xl text-white/70 max-w-xl leading-relaxed">
          Scalable. Secure. Lightning fast. Step inside the platform powering the world's most ambitious teams.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="#section-infra"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("section-infra")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-3.5 font-semibold text-sm shadow-[0_0_40px_rgba(0,200,255,0.4)] hover:shadow-[0_0_60px_rgba(0,200,255,0.7)] transition"
          >
            Deploy Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
          <a
            href="#section-infra"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("section-infra")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur px-7 py-3.5 font-semibold text-sm hover:bg-white/10 transition"
          >
            Explore Infrastructure
          </a>
        </div>
      </motion.div>
    </div>
    <ScrollHint />
  </section>
);

/* ============================================================
 * SECTION 2 — INFRASTRUCTURE
 * ============================================================ */
const InfraSection = () => {
  const features = [
    { icon: Cpu, title: "Dedicated Compute", desc: "Bare-metal cores reserved per tenant, zero noisy-neighbours." },
    { icon: Database, title: "Ultra-Fast SSD Storage", desc: "NVMe RAID with sub-ms latency and 7GB/s throughput." },
    { icon: Zap, title: "GPU-Powered Servers", desc: "H100 / L40S clusters for AI training and inference at scale." },
    { icon: Globe2, title: "Global Network", desc: "Anycast backbone with 12+ PoPs across four continents." },
  ];
  return (
    <section id="section-infra" className="relative min-h-[120vh] flex items-center py-32">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <SectionLabel>02 — Infrastructure</SectionLabel>
        <h2 className="reveal-up mt-6 max-w-3xl text-5xl md:text-7xl font-light leading-[1.05]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Enterprise grade <span className="italic text-cyan-300">infrastructure</span>, engineered to disappear.
        </h2>
        <p className="reveal-up mt-6 max-w-2xl text-white/60 text-lg">
          A hallway of racks built for predictability. Hardware we own, network we control, software we tune.
        </p>
        <div className="reveal-stagger mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <GlassCard key={title}>
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/30 to-purple-500/30 border border-white/15 flex items-center justify-center shadow-[0_0_30px_rgba(0,200,255,0.25)]">
                  <Icon className="w-5 h-5 text-cyan-200" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{title}</div>
                  <div className="mt-1.5 text-sm text-white/60 leading-relaxed">{desc}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
 * SECTION 3 — NETWORK
 * ============================================================ */
const NetworkSection = () => {
  const cards = [
    { k: "99.99%", v: "Uptime SLA" },
    { k: "Multi-Region", v: "Deployment" },
    { k: "Edge", v: "Optimization" },
    { k: "AI", v: "Optimized Routing" },
  ];
  return (
    <section id="section-network" className="relative min-h-[120vh] flex items-center py-32">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <SectionLabel>03 — Network</SectionLabel>
        <h2 className="reveal-up mt-6 max-w-3xl text-5xl md:text-7xl font-light leading-[1.05]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          A <span className="italic text-purple-300">global cloud</span> network, alive with traffic.
        </h2>
        <p className="reveal-up mt-6 max-w-2xl text-white/60 text-lg">
          Nodes connect, packets flow, routes recalculate in real time. Watch the topology breathe as you scroll.
        </p>
        <div className="reveal-stagger mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c) => (
            <GlassCard key={c.k}>
              <div className="text-3xl md:text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                {c.k}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">{c.v}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
 * SECTION 4 — SECURITY
 * ============================================================ */
const SecuritySection = () => {
  const features = [
    { icon: Lock, title: "End-to-End Encryption", desc: "TLS 1.3 in flight, AES-256 at rest, customer-managed keys." },
    { icon: Shield, title: "DDoS Protection", desc: "Always-on scrubbing across the edge, 10 Tbps mitigation capacity." },
    { icon: Activity, title: "AI Threat Detection", desc: "Behavioural anomaly engine with sub-second response." },
    { icon: ServerIcon, title: "Automated Backups", desc: "Snapshots, geo-replication and point-in-time recovery." },
  ];
  return (
    <section id="section-security" className="relative min-h-[120vh] flex items-center py-32">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <SectionLabel>04 — Security</SectionLabel>
        <h2 className="reveal-up mt-6 max-w-3xl text-5xl md:text-7xl font-light leading-[1.05]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          <span className="italic text-cyan-300">Military-grade</span> security, layered like armour.
        </h2>
        <div className="reveal-stagger mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <GlassCard key={title} glow="purple">
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/30 to-cyan-400/30 border border-white/15 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <Icon className="w-5 h-5 text-purple-200" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{title}</div>
                  <div className="mt-1.5 text-sm text-white/60 leading-relaxed">{desc}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
 * SECTION 5 — PERFORMANCE
 * ============================================================ */
const PerformanceSection = () => {
  const stats = [
    { k: "<10ms", v: "Latency", bar: 92 },
    { k: "100Gbps", v: "Network", bar: 86 },
    { k: "AI", v: "Accelerated Compute", bar: 78 },
    { k: "∞", v: "Unlimited Scaling", bar: 99 },
  ];
  return (
    <section id="section-performance" className="relative min-h-[120vh] flex items-center py-32">
      <div className="mx-auto max-w-6xl px-6 w-full">
        <SectionLabel>05 — Performance</SectionLabel>
        <h2 className="reveal-up mt-6 max-w-3xl text-5xl md:text-7xl font-light leading-[1.05]" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Extreme <span className="italic text-cyan-300">performance</span>, measured in milliseconds.
        </h2>
        <div className="reveal-stagger mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {stats.map((s) => (
            <GlassCard key={s.v}>
              <div className="flex items-baseline justify-between">
                <div className="text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                  {s.k}
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">{s.v}</div>
              </div>
              <div className="mt-6 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.bar}%` }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-purple-400 shadow-[0_0_20px_rgba(0,200,255,0.6)]"
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
 * SECTION 6 — CTA
 * ============================================================ */
const CTASection = () => (
  <section id="section-cta" className="relative min-h-[110vh] flex items-center py-32">
    <div className="mx-auto max-w-5xl px-6 w-full text-center">
      <SectionLabel center>06 — Deploy</SectionLabel>
      <h2
        className="reveal-up mt-6 font-light leading-[0.95]"
        style={{ fontSize: "clamp(3rem, 9vw, 8rem)", fontFamily: "'Instrument Serif', serif" }}
      >
        Build the future
        <br />
        on <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300">our cloud</span>.
      </h2>
      <p className="reveal-up mt-8 max-w-xl mx-auto text-white/60 text-lg">
        Provision in minutes. Scale to millions. Sleep at night.
      </p>
      <div className="reveal-stagger mt-12 flex flex-wrap justify-center gap-4">
        <a
          href="/cart"
          className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 text-sm font-semibold text-black shadow-[0_0_50px_rgba(0,200,255,0.5)] hover:shadow-[0_0_70px_rgba(160,100,255,0.7)] transition"
        >
          Start Deployment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </a>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur px-8 py-4 text-sm font-semibold hover:bg-white/10 transition"
        >
          Contact Sales
        </a>
      </div>
    </div>
  </section>
);

const FooterMini = () => (
  <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
    <div className="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-between gap-6 text-xs text-white/50">
      <div>© {new Date().getFullYear()} INFINITIVE CLOUD PVT LTD — Infrastructure for the Ambitious.</div>
      <div className="flex gap-6">
        <a href="/privacy" className="hover:text-cyan-300 transition">Privacy</a>
        <a href="/terms" className="hover:text-cyan-300 transition">Terms</a>
        <a href="/contact" className="hover:text-cyan-300 transition">Contact</a>
      </div>
    </div>
  </footer>
);

/* ============================================================
 * Reusable bits
 * ============================================================ */
const SectionLabel = ({ children, center }: { children: React.ReactNode; center?: boolean }) => (
  <div className={`reveal-up text-[10px] uppercase tracking-[0.4em] text-cyan-300/80 ${center ? "text-center" : ""}`}>
    <span className="inline-flex items-center gap-3">
      {!center && <span className="w-8 h-px bg-cyan-300/60" />}
      {children}
      {center && <span className="w-8 h-px bg-cyan-300/60" />}
    </span>
  </div>
);

const GlassCard = ({ children, glow = "cyan" }: { children: React.ReactNode; glow?: "cyan" | "purple" }) => (
  <div
    className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-7 overflow-hidden transition-all duration-500 hover:border-white/25 hover:-translate-y-0.5"
    style={{
      boxShadow:
        glow === "cyan"
          ? "0 0 40px -20px rgba(0,200,255,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 0 40px -20px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
    }}
  >
    <div
      aria-hidden
      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"
      style={{
        background:
          glow === "cyan"
            ? "radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(0,200,255,0.18), transparent 40%)"
            : "radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(168,85,247,0.18), transparent 40%)",
      }}
    />
    {children}
  </div>
);

const ScrollHint = () => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/40">
    Scroll
    <div className="w-px h-12 bg-gradient-to-b from-cyan-300/80 to-transparent animate-pulse" />
  </div>
);

export default CloudExperience;
