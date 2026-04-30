import { motion } from "framer-motion";
import { Mail, Calendar, Video, FileText, HardDrive, Users, Shield, CheckCircle2, Sparkles } from "lucide-react";

/**
 * Premium animated hero diagram for Google Workspace.
 * - Center: stylised inbox card on a custom domain
 * - Around: orbiting app glyphs with data pulses flowing into the inbox
 * - Theme: dark navy + muted gold; uses semantic tokens only
 */
const WorkspaceHeroDiagram = () => {
  // Google brand palette (used sparingly as accents only)
  const G = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC04",
    green: "#34A853",
  };

  const cx = 300;
  const cy = 230;

  const apps = [
    { icon: Mail, label: "Gmail", color: G.red, x: 90, y: 90 },
    { icon: Calendar, label: "Calendar", color: G.blue, x: 510, y: 90 },
    { icon: Video, label: "Meet", color: G.green, x: 90, y: 370 },
    { icon: FileText, label: "Docs", color: G.blue, x: 510, y: 370 },
    { icon: HardDrive, label: "Drive", color: G.yellow, x: 50, y: 230 },
    { icon: Users, label: "Chat", color: G.green, x: 550, y: 230 },
  ];

  return (
    <div className="relative">
      {/* Multi-color ambient glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <div className="absolute top-0 left-1/4 h-56 w-56 rounded-full bg-[#4285F4]/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-[#EA4335]/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FBBC04]/20 blur-3xl" />
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
            Workspace · Synced
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono">
            <Shield className="h-3 w-3 text-primary" />
            <span>2-step · DKIM · SPF</span>
          </div>
        </div>

        <svg
          viewBox="0 0 600 460"
          className="w-full h-auto"
          role="img"
          aria-label="Google Workspace ecosystem with custom-domain inbox at the center"
        >
          <defs>
            <radialGradient id="ws-hero-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ws-hero-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.7)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.05)" />
            </linearGradient>
            <pattern id="ws-hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" />
            </pattern>
            <filter id="ws-hero-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <rect width="600" height="460" fill="url(#ws-hero-grid)" />
          <circle cx={cx} cy={cy} r="180" fill="url(#ws-hero-core)" filter="url(#ws-hero-soft)" />

          {/* Slow rotating dashed orbits */}
          <g>
            <circle cx={cx} cy={cy} r="170" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1" strokeDasharray="2 8">
              <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="200" fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="0.8" strokeDasharray="1 14">
              <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Connecting curves + flowing pulses from each app to the inbox */}
          {apps.map((app, i) => {
            const mx = (app.x + cx) / 2;
            const my = (app.y + cy) / 2 - 30;
            const path = `M ${app.x} ${app.y} Q ${mx} ${my} ${cx} ${cy}`;
            return (
              <g key={`edge-${i}`}>
                <path d={path} fill="none" stroke="url(#ws-hero-edge)" strokeWidth="1.2" opacity="0.7" />
                <circle r="2.5" fill={app.color}>
                  <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2.6 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* CENTER: Inbox card */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Card */}
            <rect x={cx - 120} y={cy - 80} width="240" height="160" rx="16"
              fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />

            {/* Header bar */}
            <rect x={cx - 120} y={cy - 80} width="240" height="34" rx="16" fill="hsl(var(--muted) / 0.6)" />
            <rect x={cx - 120} y={cy - 56} width="240" height="10" fill="hsl(var(--muted) / 0.6)" />
            {/* Traffic dots */}
            <circle cx={cx - 104} cy={cy - 63} r="3.2" fill={G.red} />
            <circle cx={cx - 92} cy={cy - 63} r="3.2" fill={G.yellow} />
            <circle cx={cx - 80} cy={cy - 63} r="3.2" fill={G.green} />
            {/* Domain pill */}
            <rect x={cx - 50} y={cy - 72} width="160" height="18" rx="9" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
            <text x={cx + 30} y={cy - 59} textAnchor="middle" className="fill-foreground" fontSize="10" fontFamily="monospace" letterSpacing="1">
              you@yourbrand.com
            </text>

            {/* Inbox rows */}
            {[0, 1, 2].map((i) => {
              const ry = cy - 36 + i * 30;
              return (
                <g key={`row-${i}`}>
                  <circle cx={cx - 100} cy={ry + 10} r="7" fill={[G.blue, G.green, G.yellow][i]} opacity="0.85" />
                  <rect x={cx - 86} y={ry + 4} width={140 - i * 20} height="5" rx="2.5" fill="hsl(var(--foreground) / 0.75)" />
                  <rect x={cx - 86} y={ry + 13} width={170 - i * 30} height="4" rx="2" fill="hsl(var(--muted-foreground) / 0.55)" />
                  {i === 0 && (
                    <g>
                      <circle cx={cx + 100} cy={ry + 10} r="6" fill={G.blue} />
                      <text x={cx + 100} y={ry + 13} textAnchor="middle" fill="white" fontSize="7" fontWeight="700">3</text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* "Verified" footer chip */}
            <g transform={`translate(${cx - 60}, ${cy + 56})`}>
              <rect width="120" height="20" rx="10" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.35)" />
              <circle cx="14" cy="10" r="4" fill={G.green} />
              <text x="60" y="14" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600" letterSpacing="0.5">
                DOMAIN VERIFIED
              </text>
            </g>
          </motion.g>

          {/* App nodes */}
          {apps.map((app, i) => (
            <motion.g
              key={app.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pulsing halo */}
              <circle cx={app.x} cy={app.y} r="22" fill={`${app.color}33`}>
                <animate attributeName="r" values="18;28;18" dur={`${2.4 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur={`${2.4 + (i % 3) * 0.4}s`} repeatCount="indefinite" />
              </circle>
              {/* App tile */}
              <rect x={app.x - 22} y={app.y - 22} width="44" height="44" rx="12"
                fill="hsl(var(--card))" stroke={`${app.color}99`} strokeWidth="1.5" />
              <foreignObject x={app.x - 22} y={app.y - 22} width="44" height="44">
                <div className="flex h-full w-full items-center justify-center">
                  <app.icon className="h-5 w-5" style={{ color: app.color }} />
                </div>
              </foreignObject>
              <text x={app.x} y={app.y + 38} textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600" letterSpacing="0.4">
                {app.label}
              </text>
            </motion.g>
          ))}

          {/* Tiny floating sparkle accents */}
          <g opacity="0.7">
            <circle cx="80" cy="240" r="1.5" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="540" cy="160" r="1.5" fill="hsl(var(--accent))">
              <animate attributeName="opacity" values="1;0.2;1" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="520" cy="320" r="1.5" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2.7s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Bottom highlight chips */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {[
            { icon: CheckCircle2, label: "30+ Apps" },
            { icon: Shield, label: "2FA · DKIM" },
            { icon: Sparkles, label: "AI · Gemini" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2 backdrop-blur"
            >
              <c.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-[11px] font-semibold tracking-wide text-foreground">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating "live" badge */}
      <div className="absolute -bottom-5 -left-5 hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-sm font-medium">Live: 4,200+ teams onboarded</span>
      </div>
    </div>
  );
};

export default WorkspaceHeroDiagram;
