import { motion } from "framer-motion";
import { Globe2, Zap, Shield, Activity, Sparkles } from "lucide-react";

/**
 * Premium minimalist animated SVG infographic for the homepage.
 * Theme: dark navy + muted gold accents. Pure SVG + framer-motion.
 *
 * Refined: layered orbital rings, gradient meridians, rotating gold ticks,
 * animated scanline sweep, premium PoP nodes with country codes, and a
 * floating legend. Negative space, hairline strokes, restrained motion.
 */
const PremiumInfographicSection = () => {
  // Points of Presence (relative coords on viewBox 800x500)
  // Tier-1 highlights: India (HQ), USA, Germany — plus key global PoPs.
  const pops = [
    { x: 210, y: 210, label: "India", code: "IN", tier: 1 },
    { x: 150, y: 180, label: "Ashburn", code: "US-E", tier: 1 },
    { x: 110, y: 240, label: "Los Angeles", code: "US-W", tier: 1 },
    { x: 320, y: 150, label: "Frankfurt", code: "DE", tier: 1 },
    { x: 295, y: 120, label: "Berlin", code: "DE", tier: 1 },
    { x: 270, y: 175, label: "London", code: "UK", tier: 2 },
    { x: 470, y: 215, label: "Singapore", code: "SG", tier: 2 },
    { x: 580, y: 165, label: "Tokyo", code: "JP", tier: 2 },
    { x: 380, y: 320, label: "São Paulo", code: "BR", tier: 2 },
    { x: 250, y: 305, label: "Johannesburg", code: "ZA", tier: 2 },
    { x: 620, y: 305, label: "Sydney", code: "AU", tier: 2 },
  ];

  // Indices: 0 Mumbai, 1 Ashburn, 2 LA, 3 Frankfurt, 4 Berlin, 5 London,
  //          6 Singapore, 7 Tokyo, 8 São Paulo, 9 JNB, 10 Sydney
  const edges: Array<[number, number]> = [
    // USA <-> Europe spine
    [1, 5], [1, 3], [2, 7],
    // Europe internal
    [3, 4], [3, 5], [4, 5],
    // Europe -> India
    [3, 0], [5, 0],
    // India -> Asia/Pacific
    [0, 6], [6, 7], [6, 10],
    // Americas <-> South America
    [1, 8], [2, 8],
    // Africa bridges
    [0, 9], [3, 9],
    // Trans-pacific
    [2, 7], [7, 10],
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-accent/10 blur-3xl" aria-hidden />

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
            <Sparkles className="h-3.5 w-3.5" />
            The Network
          </span>
          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight">
            A quiet, global <span className="gradient-text">backbone.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Anycast routing across hand-picked Tier-IV facilities in India, the United States, Germany and beyond.
            Every packet takes the shortest path — invisibly, reliably, in milliseconds.
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
          <div className="absolute -top-12 -left-12 w-52 h-52 bg-primary/15 rounded-full blur-3xl -z-10" aria-hidden />
          <div className="absolute -bottom-12 -right-12 w-52 h-52 bg-accent/15 rounded-full blur-3xl -z-10" aria-hidden />

          <div
            className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 ring-1 ring-primary/10 backdrop-blur-xl"
            style={{ boxShadow: "var(--shadow-strong)" }}
          >
            {/* Corner brackets — premium frame */}
            <div className="pointer-events-none absolute inset-3 rounded-[1.4rem]" aria-hidden>
              <div className="absolute top-0 left-0 h-6 w-6 border-l border-t border-primary/40 rounded-tl-lg" />
              <div className="absolute top-0 right-0 h-6 w-6 border-r border-t border-primary/40 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-l border-b border-primary/40 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 h-6 w-6 border-r border-b border-primary/40 rounded-br-lg" />
            </div>

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
                <span className="text-accent">BGP · Anycast</span>
                <span>IPv4 / IPv6</span>
              </div>
            </div>

            <svg
              viewBox="0 0 800 500"
              className="w-full h-auto"
              role="img"
              aria-label="Global infrastructure network with active PoPs across India, USA, Germany and more"
            >
              <defs>
                <radialGradient id="infg-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="infg-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="infg-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
                  <stop offset="50%" stopColor="hsl(var(--primary) / 0.9)" />
                  <stop offset="100%" stopColor="hsl(var(--accent) / 0.05)" />
                </linearGradient>
                <linearGradient id="infg-edge-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--accent) / 0.05)" />
                  <stop offset="50%" stopColor="hsl(var(--accent) / 0.95)" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0.05)" />
                </linearGradient>
                <linearGradient id="infg-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
                <pattern id="infg-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" />
                </pattern>
                <filter id="infg-soft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
                <filter id="infg-bloom" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.2" />
                </filter>
              </defs>

              {/* Hairline grid */}
              <rect width="800" height="500" fill="url(#infg-grid)" />

              {/* Soft ambient glow behind globe */}
              <circle cx="400" cy="250" r="240" fill="url(#infg-glow)" filter="url(#infg-soft)" />

              {/* Globe — concentric hairline rings (latitude) */}
              <g stroke="hsl(var(--primary) / 0.28)" fill="none" strokeWidth="1">
                <ellipse cx="400" cy="250" rx="190" ry="190" />
                <ellipse cx="400" cy="250" rx="190" ry="60" opacity="0.6" />
                <ellipse cx="400" cy="250" rx="190" ry="120" opacity="0.45" />
                <ellipse cx="400" cy="250" rx="190" ry="170" opacity="0.32" />
              </g>
              {/* Longitude lines */}
              <g stroke="hsl(var(--primary) / 0.2)" fill="none" strokeWidth="1">
                <ellipse cx="400" cy="250" rx="60" ry="190" />
                <ellipse cx="400" cy="250" rx="120" ry="190" opacity="0.7" />
                <ellipse cx="400" cy="250" rx="170" ry="190" opacity="0.45" />
              </g>

              {/* Slow rotating dashed orbits */}
              <g>
                <circle cx="400" cy="250" r="218" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" strokeDasharray="2 8">
                  <animateTransform attributeName="transform" type="rotate" from="0 400 250" to="360 400 250" dur="40s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="250" r="234" fill="none" stroke="hsl(var(--accent) / 0.45)" strokeWidth="0.8" strokeDasharray="1 14">
                  <animateTransform attributeName="transform" type="rotate" from="360 400 250" to="0 400 250" dur="60s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="250" r="252" fill="none" stroke="hsl(var(--primary) / 0.18)" strokeWidth="0.6" strokeDasharray="0.5 22">
                  <animateTransform attributeName="transform" type="rotate" from="0 400 250" to="360 400 250" dur="90s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Rotating gold tick marks (cardinal markers) */}
              <g>
                <g stroke="hsl(var(--accent) / 0.7)" strokeWidth="1.4" strokeLinecap="round">
                  <line x1="400" y1="20" x2="400" y2="32" />
                  <line x1="400" y1="468" x2="400" y2="480" />
                  <line x1="148" y1="250" x2="160" y2="250" />
                  <line x1="640" y1="250" x2="652" y2="250" />
                  <animateTransform attributeName="transform" type="rotate" from="0 400 250" to="360 400 250" dur="80s" repeatCount="indefinite" />
                </g>
              </g>

              {/* Animated radial scanline sweep */}
              <g style={{ mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"] }}>
                <rect x="398" y="60" width="4" height="190" fill="url(#infg-sweep)" opacity="0.7">
                  <animateTransform attributeName="transform" type="rotate" from="0 400 250" to="360 400 250" dur="14s" repeatCount="indefinite" />
                </rect>
              </g>

              {/* Edges with flowing pulses */}
              {edges.map(([a, b], i) => {
                const p1 = pops[a];
                const p2 = pops[b];
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2 - 42;
                const path = `M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`;
                const isGold = (p1.tier === 1 && p2.tier === 1);
                return (
                  <g key={i}>
                    <path
                      d={path}
                      fill="none"
                      stroke={isGold ? "url(#infg-edge-gold)" : "url(#infg-edge)"}
                      strokeWidth={isGold ? 1.4 : 1.1}
                      opacity={isGold ? 0.85 : 0.65}
                    />
                    <circle r={isGold ? 2.8 : 2.2} fill={isGold ? "hsl(var(--accent))" : "hsl(var(--primary))"} filter="url(#infg-bloom)">
                      <animateMotion dur={`${2.6 + (i % 4) * 0.5}s`} repeatCount="indefinite" path={path} begin={`${(i * 0.18) % 1.6}s`} />
                      <animate attributeName="opacity" values="0;1;1;0" dur={`${2.6 + (i % 4) * 0.5}s`} repeatCount="indefinite" begin={`${(i * 0.18) % 1.6}s`} />
                    </circle>
                  </g>
                );
              })}

              {/* PoP nodes */}
              {pops.map((p, i) => {
                const tier1 = p.tier === 1;
                return (
                  <motion.g
                    key={p.label}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Pulsing halo */}
                    <circle cx={p.x} cy={p.y} r="14" fill={tier1 ? "hsl(var(--accent) / 0.22)" : "hsl(var(--primary) / 0.18)"}>
                      <animate attributeName="r" values="6;20;6" dur={`${2.2 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.7;0;0.7" dur={`${2.2 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Outer ring */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={tier1 ? 7 : 5.5}
                      fill="none"
                      stroke={tier1 ? "hsl(var(--accent) / 0.85)" : "hsl(var(--primary) / 0.6)"}
                      strokeWidth="1.1"
                    />
                    {/* Core dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={tier1 ? 3.4 : 2.8}
                      fill={tier1 ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                      filter="url(#infg-bloom)"
                    />
                    {/* Label */}
                    <text
                      x={p.x}
                      y={p.y - 14}
                      textAnchor="middle"
                      className="fill-foreground"
                      fontSize="10"
                      fontWeight={tier1 ? 700 : 600}
                      letterSpacing="0.5"
                    >
                      {p.label}
                    </text>
                    {/* Country code chip */}
                    <text
                      x={p.x}
                      y={p.y + 18}
                      textAnchor="middle"
                      className={tier1 ? "fill-accent" : "fill-muted-foreground"}
                      fontSize="7.5"
                      fontFamily="monospace"
                      letterSpacing="1.4"
                    >
                      {p.code}
                    </text>
                  </motion.g>
                );
              })}

              {/* Center core sigil */}
              <g>
                <circle cx="400" cy="250" r="34" fill="url(#infg-core)" opacity="0.5" />
                <circle cx="400" cy="250" r="10" fill="hsl(var(--accent))" filter="url(#infg-bloom)">
                  <animate attributeName="r" values="8;12;8" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="250" r="3.2" fill="hsl(var(--background))" />
              </g>

              {/* Subtle center wordmark */}
              <text
                x="400"
                y="476"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="10"
                fontFamily="monospace"
                letterSpacing="3"
              >
                INFINITIVE · GLOBAL EDGE · IN / US / DE
              </text>
            </svg>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Tier-1 region (IN · US · DE)
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Edge PoP
              </span>
              <span className="flex items-center gap-2 font-mono">
                <span className="h-px w-6 bg-accent" />
                Premium backbone
              </span>
            </div>

            {/* Bottom minimalist stat strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Globe2, v: `${pops.length}+`, l: "Edge regions" },
                { icon: Zap, v: "10ms", l: "Avg. RTT" },
                { icon: Shield, v: "Tier IV", l: "IN · US · DE" },
                { icon: Activity, v: "99.998%", l: "90-day uptime" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3 backdrop-blur transition-all hover:border-primary/40 hover:bg-background/70"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20 transition-all group-hover:bg-accent/15 group-hover:ring-accent/30">
                    <s.icon className="h-4 w-4 text-primary transition-colors group-hover:text-accent" />
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
