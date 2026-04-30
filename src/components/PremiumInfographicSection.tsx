import { motion } from "framer-motion";
import { Globe2, Zap, Shield, Activity } from "lucide-react";

/**
 * Premium minimalist animated SVG infographic for the homepage.
 * Theme: dark navy + muted gold accents. Pure SVG + framer-motion.
 *
 * Concept: a single elegant orbital "infrastructure pulse" — a refined globe
 * with edges connecting global PoPs, slow rotating rings, and quiet data
 * pulses. Negative space, hairline strokes, restrained motion.
 */
const PremiumInfographicSection = () => {
  // Points of Presence (relative coords on viewBox 800x500)
  const pops = [
    { x: 160, y: 220, label: "USA" },
    { x: 320, y: 170, label: "Europe" },
    { x: 360, y: 240, label: "India" },
    { x: 440, y: 220, label: "Singapore" },
    { x: 560, y: 180, label: "Tokyo" },
    { x: 240, y: 320, label: "São Paulo" },
    { x: 380, y: 340, label: "Johannesburg" },
    { x: 600, y: 310, label: "Sydney" },
  ];

  // Edges between PoPs (sparse for minimalism)
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 2],
    [1, 3], [0, 5], [5, 6], [3, 7], [4, 7], [6, 3],
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" aria-hidden />

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold tracking-[0.18em] uppercase">
            <Activity className="h-3.5 w-3.5" />
            The Network
          </span>
          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight">
            A quiet, global <span className="gradient-text">backbone.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Anycast routing across hand-picked Tier-IV facilities. Every packet
            takes the shortest path — invisibly, reliably, in milliseconds.
          </p>
        </motion.div>

        {/* Infographic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Floating glow accents */}
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-primary/15 rounded-full blur-3xl -z-10" aria-hidden />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-accent/15 rounded-full blur-3xl -z-10" aria-hidden />

          <div
            className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 ring-1 ring-primary/10"
            style={{ boxShadow: "var(--shadow-strong)" }}
          >
            {/* Top meta row */}
            <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live · {pops.length} regions
              </div>
              <div className="hidden sm:flex items-center gap-4 font-mono">
                <span className="text-primary">RTT 12ms</span>
                <span>BGP · Anycast</span>
              </div>
            </div>

            <svg
              viewBox="0 0 800 500"
              className="w-full h-auto"
              role="img"
              aria-label="Global infrastructure network with active PoPs"
            >
              <defs>
                <radialGradient id="infg-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="infg-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
                  <stop offset="50%" stopColor="hsl(var(--primary) / 0.85)" />
                  <stop offset="100%" stopColor="hsl(var(--accent) / 0.05)" />
                </linearGradient>
                <pattern id="infg-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" />
                </pattern>
                <filter id="infg-soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              {/* Hairline grid */}
              <rect width="800" height="500" fill="url(#infg-grid)" />

              {/* Soft ambient glow behind globe */}
              <circle cx="400" cy="250" r="220" fill="url(#infg-glow)" filter="url(#infg-soft)" />

              {/* Globe — concentric hairline rings (latitude) */}
              <g stroke="hsl(var(--primary) / 0.25)" fill="none" strokeWidth="1">
                <ellipse cx="400" cy="250" rx="190" ry="190" />
                <ellipse cx="400" cy="250" rx="190" ry="60" opacity="0.55" />
                <ellipse cx="400" cy="250" rx="190" ry="120" opacity="0.4" />
                <ellipse cx="400" cy="250" rx="190" ry="170" opacity="0.3" />
              </g>
              {/* Longitude lines */}
              <g stroke="hsl(var(--primary) / 0.18)" fill="none" strokeWidth="1">
                <ellipse cx="400" cy="250" rx="60" ry="190" />
                <ellipse cx="400" cy="250" rx="120" ry="190" opacity="0.7" />
                <ellipse cx="400" cy="250" rx="170" ry="190" opacity="0.4" />
              </g>

              {/* Slow rotating outer ring */}
              <g>
                <circle
                  cx="400"
                  cy="250"
                  r="218"
                  fill="none"
                  stroke="hsl(var(--primary) / 0.45)"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 400 250"
                    to="360 400 250"
                    dur="40s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="400"
                  cy="250"
                  r="232"
                  fill="none"
                  stroke="hsl(var(--accent) / 0.35)"
                  strokeWidth="0.8"
                  strokeDasharray="1 14"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="360 400 250"
                    to="0 400 250"
                    dur="60s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* Edges with flowing pulses */}
              {edges.map(([a, b], i) => {
                const p1 = pops[a];
                const p2 = pops[b];
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2 - 40;
                const path = `M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`;
                return (
                  <g key={i}>
                    <path d={path} fill="none" stroke="url(#infg-edge)" strokeWidth="1.2" opacity="0.7" />
                    <circle r="2.5" fill="hsl(var(--primary))">
                      <animateMotion dur={`${3 + (i % 3) * 0.6}s`} repeatCount="indefinite" path={path} />
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        dur={`${3 + (i % 3) * 0.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* PoP nodes */}
              {pops.map((p, i) => (
                <motion.g
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Pulsing halo */}
                  <circle cx={p.x} cy={p.y} r="14" fill="hsl(var(--primary) / 0.18)">
                    <animate
                      attributeName="r"
                      values="6;18;6"
                      dur={`${2.4 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur={`${2.4 + (i % 3) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Outer ring */}
                  <circle cx={p.x} cy={p.y} r="6" fill="none" stroke="hsl(var(--primary) / 0.55)" strokeWidth="1" />
                  {/* Core dot */}
                  <circle cx={p.x} cy={p.y} r="3" fill="hsl(var(--primary))" />
                  {/* Label */}
                  <text
                    x={p.x}
                    y={p.y - 14}
                    textAnchor="middle"
                    className="fill-foreground"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.5"
                  >
                    {p.label}
                  </text>
                </motion.g>
              ))}

              {/* Subtle center wordmark */}
              <text
                x="400"
                y="468"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="10"
                fontFamily="monospace"
                letterSpacing="3"
              >
                INFINITIVE · GLOBAL EDGE
              </text>
            </svg>

            {/* Bottom minimalist stat strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Globe2, v: `${pops.length}+`, l: "Edge regions" },
                { icon: Zap, v: "10ms", l: "Avg. RTT" },
                { icon: Shield, v: "Tier IV", l: "Datacenters" },
                { icon: Activity, v: "99.998%", l: "90-day uptime" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3 backdrop-blur"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-foreground">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumInfographicSection;
