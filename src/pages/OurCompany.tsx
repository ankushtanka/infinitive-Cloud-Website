import { Helmet } from "react-helmet";
import { useEffect, useRef, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronDown, Cpu, Globe2, Sparkles, Zap } from "lucide-react";

/**
 * "Our Company" — cinematic, scroll-driven, scene-by-scene experience.
 * Each section is a full-viewport "scene" that snaps into view. As the
 * user scrolls, the previous scene fades / scales out and the next one
 * dissolves in with parallax + blur — like a film cut between pages.
 */

const projects = [
  {
    title: "GeoCore Datalake",
    tag: "Private Cloud · Bare-metal",
    blurb: "Petabyte-scale analytics platform migrated to our Mumbai region with sub-ms storage fabric.",
    hue: "from-amber-400/30 via-rose-400/15 to-transparent",
    accent: "hsla(38, 90%, 60%, 0.35)",
  },
  {
    title: "Atlas Commerce",
    tag: "Managed Hosting · Edge",
    blurb: "Headless commerce stack serving 14M sessions/month across India, EU and APAC edges.",
    hue: "from-sky-400/30 via-indigo-400/15 to-transparent",
    accent: "hsla(210, 90%, 60%, 0.35)",
  },
  {
    title: "Northwind AI",
    tag: "GPU Cluster · LLM Ops",
    blurb: "H100 cluster with private model serving, observability and fine-tune pipelines.",
    hue: "from-emerald-400/30 via-teal-400/15 to-transparent",
    accent: "hsla(160, 90%, 55%, 0.35)",
  },
  {
    title: "Sigma Trade Desk",
    tag: "Low-latency · FinOps",
    blurb: "Co-located trading infra with deterministic networking and 24×7 NOC handover.",
    hue: "from-fuchsia-400/30 via-purple-400/15 to-transparent",
    accent: "hsla(300, 90%, 65%, 0.35)",
  },
];

const capabilities = [
  { icon: Cpu, label: "Private Cloud Engineering", desc: "Bare-metal, hypervisors, storage fabrics." },
  { icon: Globe2, label: "Global Edge Delivery", desc: "12+ PoPs, anycast, smart routing." },
  { icon: Sparkles, label: "AI & GPU Infrastructure", desc: "H100 clusters, private LLM ops." },
  { icon: Zap, label: "Performance & Reliability", desc: "99.99% SLA, 24×7 NOC, deterministic." },
];

/**
 * Cinematic scene wrapper: tracks its own scroll progress and drives
 * opacity / scale / blur / translate for a film-cut feel.
 */
const Scene = ({
  children,
  index,
  total,
  className = "",
  bg,
}: {
  children: (p: { progress: number; entering: number; leaving: number }) => ReactNode;
  index: number;
  total: number;
  className?: string;
  bg?: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 -> 1 across scene

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when section just enters bottom, 1 when it exits top
        const p = 1 - (r.top + r.height) / (vh + r.height);
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Entering: 0 -> 1 in first 35% of scroll. Leaving: 0 -> 1 in last 35%.
  const entering = Math.min(1, Math.max(0, progress / 0.35));
  const leaving = Math.min(1, Math.max(0, (progress - 0.65) / 0.35));
  const visible = entering * (1 - leaving);

  return (
    <section
      ref={ref}
      className={`relative h-screen w-full snap-start overflow-hidden ${className}`}
      data-scene={index}
    >
      {bg}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          opacity: visible,
          transform: `scale(${0.94 + visible * 0.06}) translateY(${(1 - entering) * 40 - leaving * 40}px)`,
          filter: `blur(${(1 - visible) * 8}px)`,
          transition: "opacity 120ms linear",
        }}
      >
        {children({ progress, entering, leaving })}
      </div>
      {/* film-cut vignette during transitions */}
      <div
        className="pointer-events-none absolute inset-0 bg-black"
        style={{ opacity: leaving * 0.85 }}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/30 uppercase">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </section>
  );
};

const OurCompany = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [scrollHint, setScrollHint] = useState(true);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    const onScroll = () => setScrollHint(window.scrollY < 200);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // total scenes for counter
  const total = 4 + projects.length; // hero, manifesto, capabilities, stats, projects, contact... compute below
  const scenes: Array<{ kind: string; data?: any }> = [
    { kind: "hero" },
    { kind: "manifesto" },
    ...projects.map((p) => ({ kind: "project", data: p })),
    { kind: "capabilities" },
    { kind: "stats" },
    { kind: "contact" },
  ];

  return (
    <div className="bg-[#070708] text-white">
      <Helmet>
        <title>Our Company — INFINITIVE CLOUD | Infrastructure for the Ambitious</title>
        <meta
          name="description"
          content="Step into INFINITIVE CLOUD — a cinematic tour of the private-cloud, edge and AI studio engineering platforms for ambitious teams."
        />
        <link rel="canonical" href="https://infinitivecloud.com/our-company" />
      </Helmet>

      <Navigation />

      {/* Cinematic scroll container with snap */}
      <main
        className="relative h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {/* Persistent grain + cursor orb across all scenes */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: `radial-gradient(50rem 50rem at ${mouse.x * 100}% ${mouse.y * 100}%, hsla(38, 70%, 55%, 0.12), transparent 60%)`,
            transition: "background 500ms ease",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {scenes.map((scene, i) => {
          if (scene.kind === "hero") {
            return (
              <Scene
                key={i}
                index={i}
                total={scenes.length}
                bg={
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(60rem 60rem at 50% 60%, hsla(38, 80%, 55%, 0.18), transparent 60%), #070708",
                    }}
                  />
                }
              >
                {({ entering }) => (
                  <div className="relative z-10 h-full flex flex-col justify-center section-container">
                    <div
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/70 backdrop-blur"
                      style={{ opacity: entering, transform: `translateY(${(1 - entering) * 20}px)` }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                      Our Company
                    </div>
                    <h1
                      className="mt-8 font-serif font-light leading-[0.95] tracking-tight"
                      style={{
                        fontSize: "clamp(3rem, 9vw, 9rem)",
                        opacity: entering,
                        transform: `translateY(${(1 - entering) * 60}px)`,
                        textShadow: "0 0 80px hsla(38, 90%, 60%, 0.25)",
                      }}
                    >
                      An infrastructure studio,
                      <br />
                      <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200">
                        engineered for the ambitious.
                      </span>
                    </h1>
                    <p
                      className="mt-10 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed"
                      style={{ opacity: entering * 0.9, transform: `translateY(${(1 - entering) * 40}px)` }}
                    >
                      Scroll. Each section is a scene — private cloud, edge, AI, the people behind the racks.
                    </p>
                  </div>
                )}
              </Scene>
            );
          }

          if (scene.kind === "manifesto") {
            return (
              <Scene
                key={i}
                index={i}
                total={scenes.length}
                bg={
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(50rem 50rem at 20% 30%, hsla(220, 80%, 50%, 0.15), transparent 60%), #07080d",
                    }}
                  />
                }
              >
                {({ entering, progress }) => (
                  <div className="relative z-10 h-full flex items-center section-container max-w-5xl">
                    <div>
                      <div
                        className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8"
                        style={{ opacity: entering }}
                      >
                        What we believe
                      </div>
                      <p
                        className="font-serif font-light text-3xl md:text-5xl leading-[1.15] text-white/90"
                        style={{
                          opacity: entering,
                          transform: `translateY(${(1 - entering) * 40}px) translateX(${progress * -20}px)`,
                        }}
                      >
                        Infrastructure should disappear. The best platforms are the ones nobody talks
                        about — they just keep working, year after year, while the product team ships.
                      </p>
                    </div>
                  </div>
                )}
              </Scene>
            );
          }

          if (scene.kind === "project") {
            const p = scene.data;
            return (
              <Scene
                key={i}
                index={i}
                total={scenes.length}
                bg={
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(60rem 60rem at 70% 50%, ${p.accent}, transparent 60%), #070708`,
                      }}
                    />
                    <div
                      aria-hidden
                      className={`absolute inset-0 bg-gradient-to-br ${p.hue} opacity-60`}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                      }}
                    />
                  </>
                }
              >
                {({ entering, progress }) => (
                  <div className="relative z-10 h-full flex items-end section-container pb-32">
                    <div>
                      <div
                        className="text-xs uppercase tracking-[0.3em] text-white/60 mb-4"
                        style={{ opacity: entering }}
                      >
                        {p.tag}
                      </div>
                      <h3
                        className="font-serif font-light leading-[0.95]"
                        style={{
                          fontSize: "clamp(3rem, 8vw, 8rem)",
                          opacity: entering,
                          transform: `translateY(${(1 - entering) * 80}px) scale(${0.95 + entering * 0.05})`,
                          textShadow: `0 0 60px ${p.accent}`,
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="mt-6 max-w-xl text-white/80 text-lg md:text-xl"
                        style={{
                          opacity: entering * 0.9,
                          transform: `translateY(${(1 - entering) * 40}px)`,
                        }}
                      >
                        {p.blurb}
                      </p>
                    </div>
                    {/* parallax floating tag */}
                    <div
                      className="absolute top-10 right-10 text-white/30 text-[10px] tracking-[0.4em] uppercase"
                      style={{ transform: `translateY(${progress * -40}px)` }}
                    >
                      Selected work
                    </div>
                  </div>
                )}
              </Scene>
            );
          }

          if (scene.kind === "capabilities") {
            return (
              <Scene
                key={i}
                index={i}
                total={scenes.length}
                bg={
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(60rem 60rem at 50% 50%, hsla(160, 70%, 40%, 0.12), transparent 60%), #070a09",
                    }}
                  />
                }
              >
                {({ entering }) => (
                  <div className="relative z-10 h-full flex items-center section-container">
                    <div className="w-full">
                      <div
                        className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6"
                        style={{ opacity: entering }}
                      >
                        Capabilities
                      </div>
                      <h2
                        className="font-serif font-light text-5xl md:text-7xl leading-[1] mb-16 max-w-3xl"
                        style={{
                          opacity: entering,
                          transform: `translateY(${(1 - entering) * 50}px)`,
                        }}
                      >
                        Quiet platforms behind <span className="italic">loud</span> businesses.
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {capabilities.map(({ icon: Icon, label, desc }, idx) => (
                          <div
                            key={label}
                            style={{
                              opacity: Math.min(1, entering * 1.2 - idx * 0.1),
                              transform: `translateY(${Math.max(0, 60 - entering * 80 + idx * 10)}px)`,
                              transition: "opacity 200ms",
                            }}
                          >
                            <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center mb-4">
                              <Icon className="w-5 h-5 text-amber-200" />
                            </div>
                            <div className="text-sm font-semibold text-white/90 mb-2">{label}</div>
                            <div className="text-xs text-white/50 leading-relaxed">{desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Scene>
            );
          }

          if (scene.kind === "stats") {
            const stats = [
              { k: "99.99%", v: "Uptime SLA" },
              { k: "12+", v: "Global PoPs" },
              { k: "<30s", v: "NOC response" },
              { k: "10y+", v: "Engineering craft" },
            ];
            return (
              <Scene
                key={i}
                index={i}
                total={scenes.length}
                bg={
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(50rem 50rem at 80% 70%, hsla(38, 80%, 50%, 0.12), transparent 60%), #08080a",
                    }}
                  />
                }
              >
                {({ entering }) => (
                  <div className="relative z-10 h-full flex items-center section-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full">
                      {stats.map((s, idx) => (
                        <div
                          key={s.k}
                          style={{
                            opacity: Math.min(1, entering * 1.3 - idx * 0.15),
                            transform: `translateY(${Math.max(0, 80 - entering * 100 + idx * 12)}px)`,
                          }}
                        >
                          <div
                            className="font-serif font-light text-6xl md:text-8xl"
                            style={{ textShadow: "0 0 60px hsla(38, 90%, 60%, 0.3)" }}
                          >
                            {s.k}
                          </div>
                          <div className="mt-3 text-xs uppercase tracking-[0.3em] text-white/50">
                            {s.v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Scene>
            );
          }

          // contact
          return (
            <Scene
              key={i}
              index={i}
              total={scenes.length}
              bg={
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(60rem 60rem at 50% 100%, hsla(20, 90%, 55%, 0.18), transparent 60%), #060608",
                  }}
                />
              }
            >
              {({ entering }) => (
                <div className="relative z-10 h-full flex items-center section-container max-w-5xl">
                  <div>
                    <div
                      className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8"
                      style={{ opacity: entering }}
                    >
                      Let's interface
                    </div>
                    <h2
                      className="font-serif font-light leading-[0.95] tracking-tight"
                      style={{
                        fontSize: "clamp(3rem, 8vw, 8rem)",
                        opacity: entering,
                        transform: `translateY(${(1 - entering) * 60}px)`,
                        textShadow: "0 0 80px hsla(20, 90%, 60%, 0.3)",
                      }}
                    >
                      Bring us the
                      <br />
                      <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200">
                        hard problems.
                      </span>
                    </h2>
                    <div
                      className="mt-12 flex flex-wrap gap-4"
                      style={{ opacity: entering, transform: `translateY(${(1 - entering) * 30}px)` }}
                    >
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
                  </div>
                </div>
              )}
            </Scene>
          );
        })}

        {/* Footer rendered as a final non-snap section so it doesn't break flow */}
        <div className="snap-start">
          <Footer />
        </div>
      </main>

      {/* Persistent scroll hint */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/50 transition-opacity duration-500 pointer-events-none ${
          scrollHint ? "opacity-100" : "opacity-0"
        }`}
      >
        Scroll to enter the next scene
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </div>
  );
};

export default OurCompany;
