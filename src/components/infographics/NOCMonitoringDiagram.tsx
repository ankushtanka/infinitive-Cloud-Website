import { motion } from "framer-motion";
import { Activity, Cpu, Shield, Zap } from "lucide-react";

/**
 * Premium NOC monitoring infographic — a live operations console
 * with vitals, threat shield, and engineer-driven response pulses.
 */
const NOCMonitoringDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-card p-6 sm:p-10 shadow-[var(--shadow-strong)]">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-primary" />
            NOC · 24 / 7 / 365 · Live
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            All systems healthy
          </div>
        </div>

        <svg viewBox="0 0 800 420" className="w-full h-auto" role="img" aria-label="Server management NOC console">
          <defs>
            <linearGradient id="noc-screen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>
            <linearGradient id="noc-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0)" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary)/0)" />
            </linearGradient>
            <radialGradient id="noc-shield-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <filter id="noc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* === MAIN CONSOLE PANEL === */}
          <motion.g
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <rect x="40" y="40" width="720" height="320" rx="18"
              fill="url(#noc-screen)" stroke="hsl(var(--primary)/0.45)" strokeWidth="1.5" />
            <rect x="40" y="40" width="720" height="34" rx="18" fill="hsl(var(--card))" />
            <rect x="40" y="68" width="720" height="6" fill="hsl(var(--card))" />
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={64 + i * 16} cy="57" r="4"
                fill={i === 0 ? "hsl(var(--destructive))" : i === 1 ? "hsl(var(--badge))" : "hsl(var(--primary))"} />
            ))}
            <text x="120" y="61" fontSize="10" fontWeight="700" letterSpacing="3" className="fill-foreground">
              INFINITIVE · NOC CONSOLE
            </text>
            <text x="740" y="61" textAnchor="end" fontSize="9" className="fill-muted-foreground" letterSpacing="1">
              uptime 99.99 %
            </text>
          </motion.g>

          {/* === LEFT PANEL: live vitals graph === */}
          <g>
            <rect x="64" y="98" width="320" height="160" rx="10"
              fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.25)" />
            <text x="78" y="118" fontSize="9" letterSpacing="2" className="fill-muted-foreground" fontWeight="700">
              CPU · MEM · NET
            </text>

            {/* Grid */}
            {[140, 170, 200, 230].map((y) => (
              <line key={y} x1="64" y1={y} x2="384" y2={y}
                stroke="hsl(var(--foreground)/0.05)" strokeDasharray="2 4" />
            ))}

            {/* CPU line */}
            <path d="M 70 220 L 110 200 L 150 210 L 190 175 L 230 190 L 270 155 L 310 170 L 350 145 L 380 160"
              fill="none" stroke="hsl(var(--primary))" strokeWidth="2" filter="url(#noc-glow)">
              <animate attributeName="d"
                values="
                  M 70 220 L 110 200 L 150 210 L 190 175 L 230 190 L 270 155 L 310 170 L 350 145 L 380 160;
                  M 70 210 L 110 195 L 150 175 L 190 200 L 230 165 L 270 180 L 310 150 L 350 175 L 380 150;
                  M 70 220 L 110 200 L 150 210 L 190 175 L 230 190 L 270 155 L 310 170 L 350 145 L 380 160"
                dur="6s" repeatCount="indefinite" />
            </path>
            {/* MEM line */}
            <path d="M 70 240 L 110 232 L 150 235 L 190 220 L 230 225 L 270 210 L 310 215 L 350 205 L 380 210"
              fill="none" stroke="hsl(var(--accent))" strokeWidth="1.6" opacity="0.85">
              <animate attributeName="d"
                values="
                  M 70 240 L 110 232 L 150 235 L 190 220 L 230 225 L 270 210 L 310 215 L 350 205 L 380 210;
                  M 70 235 L 110 225 L 150 230 L 190 215 L 230 220 L 270 205 L 310 218 L 350 200 L 380 215;
                  M 70 240 L 110 232 L 150 235 L 190 220 L 230 225 L 270 210 L 310 215 L 350 205 L 380 210"
                dur="6s" repeatCount="indefinite" />
            </path>
            {/* Sweeping scan */}
            <line x1="70" y1="100" x2="70" y2="256" stroke="url(#noc-line)" strokeWidth="2">
              <animate attributeName="x1" values="70;380;70" dur="5s" repeatCount="indefinite" />
              <animate attributeName="x2" values="70;380;70" dur="5s" repeatCount="indefinite" />
            </line>

            {/* legend */}
            <g transform="translate(78 248)" fontSize="8" letterSpacing="1">
              <circle r="3" fill="hsl(var(--primary))" />
              <text x="8" y="3" className="fill-muted-foreground">CPU 42%</text>
              <circle cx="80" r="3" fill="hsl(var(--accent))" />
              <text x="88" y="3" className="fill-muted-foreground">MEM 61%</text>
              <circle cx="170" r="3" fill="hsl(var(--secondary))" />
              <text x="178" y="3" className="fill-muted-foreground">NET 1.2 Gbps</text>
            </g>
          </g>

          {/* === LEFT BOTTOM: server fleet === */}
          <g>
            <rect x="64" y="270" width="320" height="76" rx="10"
              fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.25)" />
            <text x="78" y="290" fontSize="9" letterSpacing="2" className="fill-muted-foreground" fontWeight="700">
              FLEET · 248 NODES
            </text>
            {Array.from({ length: 36 }).map((_, i) => {
              const col = i % 18;
              const row = Math.floor(i / 18);
              const states = ["primary", "primary", "primary", "primary", "primary", "accent"];
              const c = states[i % states.length];
              return (
                <rect key={i} x={78 + col * 16} y={300 + row * 16} width="10" height="10" rx="2"
                  fill={`hsl(var(--${c}))`} opacity={0.55 + (i % 3) * 0.15}>
                  <animate attributeName="opacity"
                    values="0.4;1;0.4" dur={`${1.4 + (i % 5) * 0.3}s`} repeatCount="indefinite" />
                </rect>
              );
            })}
          </g>

          {/* === RIGHT PANEL: shield === */}
          <g>
            <rect x="404" y="98" width="336" height="184" rx="10"
              fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.25)" />
            <text x="418" y="118" fontSize="9" letterSpacing="2" className="fill-muted-foreground" fontWeight="700">
              THREAT MITIGATION
            </text>

            {/* Outer pulse ring */}
            <circle cx="572" cy="194" r="80" fill="url(#noc-shield-glow)">
              <animate attributeName="r" values="70;90;70" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Rotating dashed ring */}
            <g transform="translate(572 194)">
              <animateTransform attributeName="transform" type="rotate"
                from="0 0 0" to="360 0 0" dur="14s" repeatCount="indefinite" additive="sum" />
              <circle r="62" fill="none" stroke="hsl(var(--primary)/0.5)" strokeWidth="1" strokeDasharray="3 6" />
            </g>

            {/* Shield body */}
            <path d="M 572 154 L 608 168 L 608 198 Q 608 222 572 234 Q 536 222 536 198 L 536 168 Z"
              fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.8" filter="url(#noc-glow)" />
            <path d="M 555 196 L 568 209 L 590 184" fill="none"
              stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Incoming threat pulses absorbed by shield */}
            {[
              "M 420 130 Q 500 160 540 180",
              "M 730 130 Q 650 150 605 175",
              "M 420 270 Q 510 230 545 215",
              "M 730 270 Q 660 240 605 215",
            ].map((path, i) => (
              <g key={i}>
                <path d={path} fill="none" stroke="hsl(var(--destructive)/0.3)" strokeWidth="0.8" strokeDasharray="2 3" />
                <circle r="2.5" fill="hsl(var(--destructive))" filter="url(#noc-glow)">
                  <animateMotion dur={`${2 + i * 0.4}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="1;1;0" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}

            {/* Stats */}
            <g transform="translate(418 244)" fontSize="9" letterSpacing="1">
              <text className="fill-muted-foreground">BLOCKED 24h</text>
              <text x="0" y="14" fontSize="14" fontWeight="900" className="fill-foreground">12,847</text>
              <text x="120" className="fill-muted-foreground">PATCHES APPLIED</text>
              <text x="120" y="14" fontSize="14" fontWeight="900" className="fill-foreground">38</text>
              <text x="248" className="fill-muted-foreground">MTTR</text>
              <text x="248" y="14" fontSize="14" fontWeight="900" className="fill-foreground">4 min</text>
            </g>
          </g>

          {/* === RIGHT BOTTOM: alert ticker === */}
          <g>
            <rect x="404" y="294" width="336" height="52" rx="10"
              fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.25)" />
            <text x="418" y="312" fontSize="9" letterSpacing="2" className="fill-muted-foreground" fontWeight="700">
              EVENT STREAM
            </text>
            <g fontSize="9" fontFamily="monospace">
              <text x="418" y="330" className="fill-primary">
                ✓ 02:14  patched openssl on icx-prod-04
                <animate attributeName="opacity" values="1;0;1" dur="6s" repeatCount="indefinite" />
              </text>
              <text x="418" y="330" className="fill-foreground">
                ⚡ 02:18  scaled web tier +2 nodes
                <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" />
              </text>
            </g>
          </g>

          {/* Connecting flow */}
          <line x1="384" y1="178" x2="404" y2="178" stroke="hsl(var(--primary)/0.5)" strokeDasharray="3 3" />
          <circle r="2.5" fill="hsl(var(--primary))" filter="url(#noc-glow)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 384 178 L 404 178" />
          </circle>
        </svg>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Activity, v: "< 60 s", l: "Alert response" },
            { icon: Shield, v: "CIS L2", l: "Hardening baseline" },
            { icon: Cpu, v: "1-min", l: "Telemetry interval" },
            { icon: Zap, v: "4 min", l: "Mean time to repair" },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-3 py-2.5 backdrop-blur">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
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
    </div>
  );
};

export default NOCMonitoringDiagram;
