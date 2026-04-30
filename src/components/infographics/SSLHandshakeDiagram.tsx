import { motion } from "framer-motion";
import { Lock, Shield, Globe, Server, Key, CheckCircle2 } from "lucide-react";

/**
 * Premium animated SSL handshake infographic.
 * Shows browser → encrypted tunnel → server with key exchange & certificate seal.
 */
const SSLHandshakeDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-[var(--shadow-strong)] ring-1 ring-primary/10">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      {/* Status header */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-primary" />
          TLS 1.3 · 256-bit · handshake live
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          SECURE
        </div>
      </div>

      <svg
        viewBox="0 0 720 360"
        className="relative z-10 w-full h-auto"
        role="img"
        aria-label="SSL/TLS handshake architecture"
      >
        <defs>
          <linearGradient id="ssl-tunnel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="ssl-tunnel-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="ssl-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <pattern id="ssl-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.06" strokeWidth="0.5" />
          </pattern>
          <filter id="ssl-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <rect width="720" height="360" fill="url(#ssl-grid)" />

        {/* Encrypted tunnel — outer glow */}
        <path
          d="M 150 180 Q 360 110, 570 180 Q 360 250, 150 180 Z"
          fill="url(#ssl-glow)"
          filter="url(#ssl-soft)"
          opacity="0.5"
        />

        {/* Tunnel body (hex segments) */}
        <g>
          {Array.from({ length: 8 }).map((_, i) => {
            const x = 170 + i * 50;
            return (
              <motion.path
                key={i}
                d={`M ${x} 165 L ${x + 18} 155 L ${x + 38} 165 L ${x + 38} 195 L ${x + 18} 205 L ${x} 195 Z`}
                fill="hsl(var(--card))"
                stroke="hsl(var(--primary) / 0.5)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
              >
                <animate attributeName="stroke-opacity" values="0.3;0.9;0.3" dur={`${2 + i * 0.15}s`} repeatCount="indefinite" />
              </motion.path>
            );
          })}
        </g>

        {/* Tunnel rails */}
        <line x1="150" y1="180" x2="570" y2="180" stroke="url(#ssl-tunnel)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Flowing encrypted packets — left to right */}
        {[0, 1, 2].map((i) => (
          <g key={`pkt-r${i}`}>
            <rect width="14" height="8" rx="2" fill="hsl(var(--primary))">
              <animate attributeName="x" values="150;570" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
              <animate attributeName="y" values="176;176" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
            </rect>
          </g>
        ))}
        {/* Right to left ack */}
        {[0, 1].map((i) => (
          <g key={`pkt-l${i}`}>
            <rect width="10" height="6" rx="2" fill="hsl(var(--accent))">
              <animate attributeName="x" values="570;150" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.8 + 0.3}s`} />
              <animate attributeName="y" values="190;190" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.8 + 0.3}s`} />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${2.8 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.8 + 0.3}s`} />
            </rect>
          </g>
        ))}

        {/* Browser node (left) */}
        <motion.g
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <circle cx="100" cy="180" r="58" fill="url(#ssl-glow)" />
          <rect x="58" y="140" width="84" height="80" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />
          <rect x="58" y="140" width="84" height="18" rx="12" fill="hsl(var(--muted))" />
          <circle cx="68" cy="149" r="2.5" fill="hsl(var(--primary))" />
          <circle cx="76" cy="149" r="2.5" fill="hsl(var(--accent))" opacity="0.7" />
          <circle cx="84" cy="149" r="2.5" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          <foreignObject x="58" y="158" width="84" height="62">
            <div className="flex h-full w-full flex-col items-center justify-center gap-1">
              <Globe className="h-6 w-6 text-primary" strokeWidth={2} />
              <div className="text-[9px] font-semibold text-foreground">Browser</div>
              <div className="flex items-center gap-0.5 text-[8px] text-primary">
                <Lock className="h-2 w-2" />
                <span className="font-mono">https://</span>
              </div>
            </div>
          </foreignObject>
        </motion.g>

        {/* Server node (right) */}
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <circle cx="620" cy="180" r="58" fill="url(#ssl-glow)" />
          <rect x="578" y="140" width="84" height="80" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />
          <foreignObject x="578" y="140" width="84" height="80">
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
              <Server className="h-6 w-6 text-primary" strokeWidth={2} />
              <div className="text-[9px] font-semibold text-foreground">Origin</div>
              <div className="text-[8px] font-mono text-muted-foreground">:443 / TLS</div>
            </div>
          </foreignObject>
        </motion.g>

        {/* Center certificate seal */}
        <motion.g
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="360" cy="180" r="48" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1" strokeDasharray="3 4">
            <animateTransform attributeName="transform" type="rotate" from="0 360 180" to="360 360 180" dur="18s" repeatCount="indefinite" />
          </circle>
          <circle cx="360" cy="180" r="34" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <foreignObject x="338" y="158" width="44" height="44">
            <div className="flex h-full w-full items-center justify-center">
              <Shield className="h-7 w-7 text-primary" strokeWidth={2} fill="hsl(var(--primary) / 0.15)" />
            </div>
          </foreignObject>
          {/* Verified badge */}
          <g>
            <circle cx="388" cy="152" r="9" fill="hsl(var(--primary))" />
            <foreignObject x="379" y="143" width="18" height="18">
              <div className="flex h-full w-full items-center justify-center">
                <CheckCircle2 className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
              </div>
            </foreignObject>
          </g>
        </motion.g>

        {/* Key icons exchanging */}
        <g opacity="0.85">
          <foreignObject x="220" y="98" width="22" height="22">
            <div className="flex h-full w-full items-center justify-center">
              <Key className="h-4 w-4 text-accent" />
            </div>
          </foreignObject>
          <foreignObject x="478" y="240" width="22" height="22">
            <div className="flex h-full w-full items-center justify-center">
              <Key className="h-4 w-4 text-primary" />
            </div>
          </foreignObject>
        </g>

        {/* Labels */}
        <text x="360" y="108" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="600" letterSpacing="2">
          ENCRYPTED TUNNEL
        </text>
        <text x="360" y="240" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontFamily="monospace">
          AES-256-GCM · ECDHE · SHA-384
        </text>
      </svg>

      {/* Bottom feature pills */}
      <div className="relative z-10 mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: Lock, v: "256-bit", l: "Encryption" },
          { icon: Shield, v: "$1M", l: "Warranty" },
          { icon: CheckCircle2, v: "EV / OV", l: "Validation" },
          { icon: Globe, v: "Wildcard", l: "Subdomains" },
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

export default SSLHandshakeDiagram;
