import { motion } from "framer-motion";
import { Activity, type LucideIcon } from "lucide-react";

export interface OrbitNode {
  icon: LucideIcon;
  label: string;
  /** Angle in degrees; 0 = right, 90 = bottom, 180 = left, 270 = top */
  angle: number;
}

interface UniversalOrbitDiagramProps {
  /** Center icon */
  CenterIcon: LucideIcon;
  /** Title shown in the central card */
  centerTitle: string;
  /** Sub label under the title */
  centerSubtitle: string;
  /** Top status pill text */
  statusLabel: string;
  /** Right-side metric (e.g. "99.99%") */
  metric?: string;
  /** Orbit nodes (4-6 work best) */
  nodes: OrbitNode[];
  /** Badge under everything */
  badge?: string;
  /** Unique id for SVG defs (avoid collisions when multiple instances on page) */
  uid?: string;
}

/**
 * Universal premium animated orbit infographic.
 * Theme-aware (CSS tokens). Used as a hero diagram across solution pages
 * with a different center concept + nodes per page.
 */
const UniversalOrbitDiagram = ({
  CenterIcon,
  centerTitle,
  centerSubtitle,
  statusLabel,
  metric = "99.99%",
  nodes,
  badge,
  uid = "uod",
}: UniversalOrbitDiagramProps) => {
  const cx = 300;
  const cy = 240;
  const r1 = 140; // inner orbit
  const r2 = 195; // outer dashed orbit

  // Compute node positions
  const positioned = nodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return {
      ...n,
      x: cx + Math.cos(rad) * r1,
      y: cy + Math.sin(rad) * r1,
    };
  });

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 p-5 sm:p-7 shadow-[var(--shadow-strong)] ring-1 ring-primary/10">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      {/* Top status bar */}
      <div className="relative z-10 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {statusLabel}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono">{metric}</span>
        </div>
      </div>

      <svg
        viewBox="0 0 600 500"
        className="relative z-10 w-full h-auto"
        role="img"
        aria-label={`${centerTitle} architecture`}
      >
        <defs>
          <radialGradient id={`${uid}-coreGlow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-card`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>
          <linearGradient id={`${uid}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
          </linearGradient>
          <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Outer dashed rotating orbit */}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <motion.circle
            cx={cx}
            cy={cy}
            r={r2}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="2 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        </g>

        {/* Inner orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r1}
          fill="none"
          stroke="hsl(var(--border))"
          strokeOpacity="0.5"
          strokeWidth="1"
        />

        {/* Connectors center -> nodes (with traveling pulses) */}
        {positioned.map((n, i) => {
          const path = `M ${cx} ${cy} L ${n.x} ${n.y}`;
          return (
            <g key={`conn-${i}`}>
              <path d={path} stroke="hsl(var(--primary))" strokeOpacity="0.25" strokeWidth="1.2" />
              <circle r="3.2" fill="hsl(var(--primary))">
                <animateMotion
                  dur={`${2.4 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  path={path}
                  begin={`${i * 0.35}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${2.4 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.35}s`}
                />
              </circle>
            </g>
          );
        })}

        {/* Core glow */}
        <circle cx={cx} cy={cy} r="110" fill={`url(#${uid}-coreGlow)`} filter={`url(#${uid}-soft)`} />

        {/* Central card */}
        <g>
          <rect
            x={cx - 95}
            y={cy - 55}
            width="190"
            height="110"
            rx="18"
            fill={`url(#${uid}-card)`}
            stroke={`url(#${uid}-stroke)`}
            strokeWidth="1.5"
          />
          <foreignObject x={cx - 90} y={cy - 50} width="180" height="100">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
                <CenterIcon className="h-5 w-5 text-white" strokeWidth={2} />
              </div>
              <div className="text-[12px] font-bold leading-tight text-foreground">
                {centerTitle}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {centerSubtitle}
              </div>
            </div>
          </foreignObject>
        </g>

        {/* Nodes */}
        {positioned.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.g
              key={`node-${i}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r="32"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r="32"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="3 4"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${n.x} ${n.y}`}
                  to={`360 ${n.x} ${n.y}`}
                  dur={`${10 + i}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <foreignObject x={n.x - 28} y={n.y - 28} width="56" height="56">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  className="flex h-full w-full items-center justify-center"
                >
                  <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                </div>
              </foreignObject>
              <text
                x={n.x}
                y={n.y + 50}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Bottom badge */}
      {badge && (
        <div className="relative z-10 mt-3 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {badge}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalOrbitDiagram;
