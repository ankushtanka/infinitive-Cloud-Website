import { motion } from "framer-motion";
import { Brain, Lock, Database, Cpu, Sparkles, Shield, KeyRound } from "lucide-react";

/**
 * Premium animated hero diagram for the Openclaw (Open WebUI) page.
 * - Center: a private AI chat console with streaming response
 * - Around: model providers + RAG knowledge feeding the console
 * - All data flows are visualised as pulses moving into the encrypted core
 */
const OpenclawHeroDiagram = () => {
  const cx = 300;
  const cy = 230;

  const sources = [
    { icon: Brain, label: "GPT-5", x: 70, y: 90, hue: "262 83% 70%" },
    { icon: Cpu, label: "Llama", x: 530, y: 90, hue: "20 90% 62%" },
    { icon: Sparkles, label: "Gemini", x: 70, y: 380, hue: "210 90% 65%" },
    { icon: Database, label: "Your Docs", x: 530, y: 380, hue: "var(--primary)" },
  ];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <div className="absolute top-0 left-1/3 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div
        className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/20 p-5 sm:p-8 ring-1 ring-primary/10 backdrop-blur-xl"
        style={{ boxShadow: "var(--shadow-strong)" }}
      >
        {/* Top status bar */}
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Private · Encrypted · On your VPS
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono">
            <Lock className="h-3 w-3 text-primary" />
            <span>AES-256 · TLS 1.3</span>
          </div>
        </div>

        <svg viewBox="0 0 600 460" className="w-full h-auto" role="img" aria-label="Private AI workspace with multiple model providers feeding into an encrypted chat console">
          <defs>
            <radialGradient id="ow-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ow-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.7)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.05)" />
            </linearGradient>
            <pattern id="ow-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" />
            </pattern>
            <filter id="ow-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <rect width="600" height="460" fill="url(#ow-grid)" />
          <circle cx={cx} cy={cy} r="190" fill="url(#ow-core)" filter="url(#ow-soft)" />

          {/* Slow rotating dashed orbits */}
          <g>
            <circle cx={cx} cy={cy} r="180" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1" strokeDasharray="2 8">
              <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="210" fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="0.8" strokeDasharray="1 14">
              <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Connecting curves with pulses from sources -> core */}
          {sources.map((s, i) => {
            const mx = (s.x + cx) / 2;
            const my = (s.y + cy) / 2 - 30;
            const path = `M ${s.x} ${s.y} Q ${mx} ${my} ${cx} ${cy}`;
            return (
              <g key={`edge-${i}`}>
                <path d={path} fill="none" stroke="url(#ow-edge)" strokeWidth="1.2" opacity="0.7" />
                <circle r="2.6" fill={`hsl(${s.hue})`}>
                  <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* CENTER: Chat console */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Console window */}
            <rect x={cx - 140} y={cy - 90} width="280" height="180" rx="16"
              fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />

            {/* Title bar */}
            <rect x={cx - 140} y={cy - 90} width="280" height="32" rx="16" fill="hsl(var(--muted) / 0.6)" />
            <rect x={cx - 140} y={cy - 68} width="280" height="10" fill="hsl(var(--muted) / 0.6)" />
            <circle cx={cx - 124} cy={cy - 74} r="3.2" fill="#EA4335" />
            <circle cx={cx - 112} cy={cy - 74} r="3.2" fill="#FBBC04" />
            <circle cx={cx - 100} cy={cy - 74} r="3.2" fill="#34A853" />
            {/* Lock + label */}
            <g transform={`translate(${cx - 30}, ${cy - 84})`}>
              <rect width="160" height="20" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
              <text x="80" y="13" textAnchor="middle" className="fill-foreground" fontSize="9" fontFamily="monospace" letterSpacing="1">
                ⬢ chat.yourcompany.ai
              </text>
            </g>

            {/* User message (right) */}
            <g>
              <rect x={cx + 8} y={cy - 46} width="124" height="22" rx="11" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary) / 0.4)" />
              <rect x={cx + 18} y={cy - 39} width="80" height="3" rx="1.5" fill="hsl(var(--foreground) / 0.8)" />
              <rect x={cx + 18} y={cy - 33} width="60" height="3" rx="1.5" fill="hsl(var(--foreground) / 0.55)" />
            </g>

            {/* AI response (left) — streaming */}
            <g>
              <rect x={cx - 132} y={cy - 14} width="200" height="58" rx="12" fill="hsl(var(--muted) / 0.55)" stroke="hsl(var(--border))" />
              {/* Avatar */}
              <circle cx={cx - 120} cy={cy + 0} r="7" fill="hsl(var(--primary))" />
              <text x={cx - 120} y={cy + 3} textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="8" fontWeight="700">AI</text>

              {/* Streaming lines (animated widths) */}
              <rect x={cx - 108} y={cy - 6} height="3" rx="1.5" fill="hsl(var(--foreground) / 0.85)">
                <animate attributeName="width" values="20;160;160" dur="3s" repeatCount="indefinite" />
              </rect>
              <rect x={cx - 108} y={cy + 2} height="3" rx="1.5" fill="hsl(var(--foreground) / 0.65)">
                <animate attributeName="width" values="0;130;130" dur="3s" begin="0.3s" repeatCount="indefinite" />
              </rect>
              <rect x={cx - 108} y={cy + 10} height="3" rx="1.5" fill="hsl(var(--foreground) / 0.5)">
                <animate attributeName="width" values="0;100;100" dur="3s" begin="0.6s" repeatCount="indefinite" />
              </rect>
              {/* Caret */}
              <rect x={cx - 108} y={cy + 18} width="6" height="9" fill="hsl(var(--primary))">
                <animate attributeName="opacity" values="0;1;0" dur="0.9s" repeatCount="indefinite" />
              </rect>
            </g>

            {/* Input bar */}
            <g>
              <rect x={cx - 132} y={cy + 56} width="264" height="26" rx="13" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
              <text x={cx - 122} y={cy + 73} className="fill-muted-foreground" fontSize="9" fontFamily="monospace">
                Ask anything…
              </text>
              <circle cx={cx + 116} cy={cy + 69} r="9" fill="hsl(var(--primary))" />
              <path d={`M ${cx + 112} ${cy + 69} L ${cx + 120} ${cy + 65} L ${cx + 120} ${cy + 73} Z`} fill="hsl(var(--primary-foreground))" />
            </g>
          </motion.g>

          {/* Source nodes */}
          {sources.map((s, i) => (
            <motion.g
              key={s.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <circle cx={s.x} cy={s.y} r="22" fill={`hsl(${s.hue} / 0.2)`}>
                <animate attributeName="r" values="18;28;18" dur={`${2.4 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.4 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <rect x={s.x - 22} y={s.y - 22} width="44" height="44" rx="12"
                fill="hsl(var(--card))" stroke={`hsl(${s.hue} / 0.6)`} strokeWidth="1.5" />
              <foreignObject x={s.x - 22} y={s.y - 22} width="44" height="44">
                <div className="flex h-full w-full items-center justify-center">
                  <s.icon className="h-5 w-5" style={{ color: `hsl(${s.hue})` }} />
                </div>
              </foreignObject>
              <text x={s.x} y={s.y + 38} textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600" letterSpacing="0.4">
                {s.label}
              </text>
            </motion.g>
          ))}

          {/* Encryption shield badge top-right of console */}
          <g transform={`translate(${cx + 90}, ${cy - 110})`}>
            <circle r="18" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.5)" />
            <foreignObject x="-10" y="-10" width="20" height="20">
              <div className="flex h-full w-full items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
            </foreignObject>
          </g>

          {/* Sparkles accents */}
          <g opacity="0.7">
            <circle cx="80" cy="240" r="1.5" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="540" cy="240" r="1.5" fill="hsl(var(--accent))">
              <animate attributeName="opacity" values="1;0.2;1" dur="3.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Bottom highlight chips */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {[
            { icon: Lock, label: "Self-hosted" },
            { icon: KeyRound, label: "Bring any LLM" },
            { icon: Database, label: "RAG-ready" },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2 backdrop-blur">
              <c.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-semibold tracking-wide text-foreground">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -right-5 hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl">
        <Shield className="w-5 h-5 text-accent" />
        <span className="text-sm font-medium">100% on your VPS</span>
      </div>
    </div>
  );
};

export default OpenclawHeroDiagram;
