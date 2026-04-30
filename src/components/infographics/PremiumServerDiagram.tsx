import { motion } from "framer-motion";
import { Cpu, HardDrive, Network, Shield, Activity } from "lucide-react";

/**
 * Premium animated SVG server infographic.
 * Theme-aware via CSS tokens. Pure SVG + framer-motion.
 */
const PremiumServerDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-[var(--shadow-strong)] ring-1 ring-primary/10">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      {/* Top status bar */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Rack · ic-bom-01 · online
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono">99.998%</span>
        </div>
      </div>

      <svg
        viewBox="0 0 600 480"
        className="relative z-10 w-full h-auto"
        role="img"
        aria-label="Premium animated server architecture"
      >
        <defs>
          <linearGradient id="srv-chassis" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>
          <linearGradient id="srv-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
            <stop offset="50%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent) / 0.2)" />
          </linearGradient>
          <radialGradient id="srv-coreglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="srv-led" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
          <filter id="srv-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <pattern id="srv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.06" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect width="600" height="480" fill="url(#srv-grid)" />

        {/* Floor reflection */}
        <ellipse cx="300" cy="445" rx="220" ry="14" fill="hsl(var(--primary))" opacity="0.18" filter="url(#srv-glow)" />

        {/* Server rack chassis */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer chassis */}
          <rect x="90" y="80" width="420" height="340" rx="18" fill="url(#srv-chassis)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          {/* Inner bezel */}
          <rect x="104" y="94" width="392" height="312" rx="12" fill="hsl(var(--background))" opacity="0.6" stroke="hsl(var(--primary) / 0.25)" strokeWidth="1" />

          {/* Top edge gradient strip */}
          <rect x="104" y="94" width="392" height="2" fill="url(#srv-edge)" opacity="0.9" />
        </motion.g>

        {/* Server units (1U slots) */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 112 + i * 56;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              {/* Slot body */}
              <rect x="120" y={y} width="360" height="44" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />

              {/* Drive bays */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => (
                <rect
                  key={b}
                  x={132 + b * 22}
                  y={y + 8}
                  width="16"
                  height="28"
                  rx="2"
                  fill="hsl(var(--muted))"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.6"
                />
              ))}

              {/* Vent grille */}
              <rect x={320} y={y + 10} width="80" height="24" rx="3" fill="hsl(var(--background))" opacity="0.6" />
              {[0, 1, 2, 3, 4, 5, 6].map((v) => (
                <line
                  key={v}
                  x1={326 + v * 11}
                  y1={y + 13}
                  x2={326 + v * 11}
                  y2={y + 31}
                  stroke="hsl(var(--foreground))"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                />
              ))}

              {/* Activity LEDs */}
              <circle cx="420" cy={y + 14} r="2.4" fill="hsl(var(--primary))">
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx="430" cy={y + 14} r="2.4" fill="hsl(var(--accent))">
                <animate attributeName="opacity" values="1;0.3;1" dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx="440" cy={y + 14} r="2.4" fill="hsl(var(--primary))" opacity="0.5" />

              {/* Power LED */}
              <circle cx="460" cy={y + 22} r="3" fill="hsl(var(--primary))" filter="url(#srv-glow)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Bottom LED data line */}
              <rect x="120" y={y + 42} width="360" height="1.5" fill="url(#srv-led)" opacity="0.5">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </rect>
            </motion.g>
          );
        })}

        {/* Center core glow + emblem */}
        <g>
          <circle cx="300" cy="244" r="60" fill="url(#srv-coreglow)" />
          <motion.g
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <circle cx="300" cy="244" r="22" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <circle cx="300" cy="244" r="32" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1" strokeDasharray="3 4">
              <animateTransform attributeName="transform" type="rotate" from="0 300 244" to="360 300 244" dur="14s" repeatCount="indefinite" />
            </circle>
            <foreignObject x="282" y="226" width="36" height="36">
              <div className="flex h-full w-full items-center justify-center">
                <Cpu className="h-5 w-5 text-primary" strokeWidth={2} />
              </div>
            </foreignObject>
          </motion.g>
        </g>

        {/* Data flow streams (left & right of server) */}
        {[0, 1, 2].map((i) => {
          const yStart = 160 + i * 60;
          const path = `M 30 ${yStart} C 60 ${yStart}, 80 244, 120 244`;
          return (
            <g key={`l${i}`}>
              <path d={path} fill="none" stroke="hsl(var(--primary) / 0.25)" strokeWidth="1.2" />
              <circle r="3" fill="hsl(var(--primary))">
                <animateMotion dur={`${2.4 + i * 0.5}s`} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;1;0" dur={`${2.4 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
        {[0, 1, 2].map((i) => {
          const yEnd = 160 + i * 60;
          const path = `M 480 244 C 520 244, 540 ${yEnd}, 570 ${yEnd}`;
          return (
            <g key={`r${i}`}>
              <path d={path} fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="1.2" />
              <circle r="3" fill="hsl(var(--accent))">
                <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;1;0" dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Bottom feature pills */}
      <div className="relative z-10 mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: Cpu, v: "AMD EPYC", l: "vCPU" },
          { icon: HardDrive, v: "NVMe Gen4", l: "Storage" },
          { icon: Network, v: "10 Gbps", l: "Network" },
          { icon: Shield, v: "DDoS", l: "Protected" },
        ].map((s) => (
          <div key={s.l} className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/50 px-3 py-2 backdrop-blur">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold text-foreground">{s.v}</div>
              <div className="text-[10px] text-muted-foreground">{s.l}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumServerDiagram;
