import { motion } from "framer-motion";
import { Activity, type LucideIcon } from "lucide-react";

export interface OrbitNode {
  icon: LucideIcon;
  label: string;
  /** Angle in degrees; 0 = right, 90 = bottom, 180 = left, 270 = top */
  angle: number;
}

interface UniversalOrbitDiagramProps {
  CenterIcon: LucideIcon;
  centerTitle: string;
  centerSubtitle: string;
  statusLabel: string;
  metric?: string;
  nodes: OrbitNode[];
  badge?: string;
  uid?: string;
}

/**
 * Premium animated orbit infographic.
 * Multi-layer glassmorphism, gradient strokes, rotating shimmer ring,
 * traveling photon pulses, idle node breathing, soft conic sweep.
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
  const cy = 250;
  const r1 = 145; // inner orbit (nodes)
  const r2 = 200; // mid dashed orbit
  const r3 = 235; // outer faint orbit

  const positioned = nodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return {
      ...n,
      x: cx + Math.cos(rad) * r1,
      y: cy + Math.sin(rad) * r1,
    };
  });

  // Build a sweeping arc path on the mid orbit for the shimmer highlight
  const arcLen = 80; // degrees
  const a0 = 0;
  const a1 = a0 + arcLen;
  const toXY = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + Math.cos(rad) * r, cy + Math.sin(rad) * r];
  };
  const [sx0, sy0] = toXY(a0, r2);
  const [sx1, sy1] = toXY(a1, r2);
  const sweepPath = `M ${sx0} ${sy0} A ${r2} ${r2} 0 0 1 ${sx1} ${sy1}`;

  return (
    <div className="group relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-card via-card to-muted/30 p-5 sm:p-7 shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.35)] ring-1 ring-primary/15">
      {/* Layered ambient glows */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/30 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/25 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.18),transparent_60%)]" />
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Specular top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Top bar */}
      <div className="relative z-10 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {statusLabel}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-3 py-1 backdrop-blur-md">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[11px] text-foreground/90">{metric}</span>
        </div>
      </div>

      <svg
        viewBox="0 0 600 520"
        className="relative z-10 w-full h-auto"
        role="img"
        aria-label={`${centerTitle} architecture`}
      >
        <defs>
          {/* Core radial glow */}
          <radialGradient id={`${uid}-coreGlow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.65" />
            <stop offset="55%" stopColor="hsl(var(--accent))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          {/* Card glass fill */}
          <linearGradient id={`${uid}-card`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--card))" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.85" />
          </linearGradient>
          {/* Gradient stroke */}
          <linearGradient id={`${uid}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.95" />
          </linearGradient>
          {/* Connector gradient (transparent at center, glow at node) */}
          <linearGradient id={`${uid}-conn`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
          </linearGradient>
          {/* Shimmer along arc */}
          <linearGradient id={`${uid}-shimmer`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
          </linearGradient>
          {/* Node glass */}
          <radialGradient id={`${uid}-node`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="hsl(var(--card))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.85" />
          </radialGradient>
          {/* Soft blur */}
          <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer faint orbit */}
        <circle
          cx={cx}
          cy={cy}
          r={r3}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeOpacity="0.08"
          strokeWidth="1"
        />

        {/* Mid dashed rotating orbit (counter-clockwise) */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r2}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeDasharray="2 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "fill-box" } as React.CSSProperties}
        />

        {/* Sweeping shimmer arc */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "fill-box" } as React.CSSProperties}
        >
          <path
            d={sweepPath}
            fill="none"
            stroke={`url(#${uid}-shimmer)`}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter={`url(#${uid}-glow)`}
          />
        </motion.g>

        {/* Inner orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r1}
          fill="none"
          stroke="hsl(var(--border))"
          strokeOpacity="0.45"
          strokeWidth="1"
        />

        {/* Connectors center -> nodes (with traveling photon pulses) */}
        {positioned.map((n, i) => {
          const path = `M ${cx} ${cy} L ${n.x} ${n.y}`;
          const dur = 2.6 + (i % 3) * 0.5;
          return (
            <g key={`conn-${i}`}>
              <path
                d={path}
                stroke={`url(#${uid}-conn)`}
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Photon */}
              <circle r="3.6" fill="hsl(var(--primary))" filter={`url(#${uid}-glow)`}>
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  path={path}
                  begin={`${i * 0.35}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.35}s`}
                />
              </circle>
              {/* Trailing fainter pulse */}
              <circle r="2" fill="hsl(var(--accent))" opacity="0.7">
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  path={path}
                  begin={`${i * 0.35 + 0.25}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.7;0.7;0"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.35 + 0.25}s`}
                />
              </circle>
            </g>
          );
        })}

        {/* Core ambient glow */}
        <circle cx={cx} cy={cy} r="130" fill={`url(#${uid}-coreGlow)`} filter={`url(#${uid}-soft)`} />

        {/* Pulsing core halo ring */}
        <motion.circle
          cx={cx}
          cy={cy}
          r="80"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          animate={{ r: [80, 100, 80], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Central card */}
        <g>
          {/* Card outer glow */}
          <rect
            x={cx - 102}
            y={cy - 62}
            width="204"
            height="124"
            rx="22"
            fill="hsl(var(--primary))"
            opacity="0.18"
            filter={`url(#${uid}-soft)`}
          />
          <rect
            x={cx - 95}
            y={cy - 55}
            width="190"
            height="110"
            rx="20"
            fill={`url(#${uid}-card)`}
            stroke={`url(#${uid}-stroke)`}
            strokeWidth="1.5"
          />
          {/* Top inner highlight */}
          <rect
            x={cx - 92}
            y={cy - 52}
            width="184"
            height="2"
            rx="1"
            fill="hsl(var(--foreground))"
            opacity="0.18"
          />
          <foreignObject x={cx - 90} y={cy - 50} width="180" height="100">
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 text-center">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[0_8px_24px_-4px_hsl(var(--primary)/0.6)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                <CenterIcon className="relative h-5 w-5 text-white" strokeWidth={2.2} />
              </div>
              <div className="text-[12px] font-bold leading-tight text-foreground">
                {centerTitle}
              </div>
              <div className="text-[9.5px] uppercase tracking-[0.2em] text-muted-foreground">
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
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Node soft glow */}
              <circle
                cx={n.x}
                cy={n.y}
                r="38"
                fill="hsl(var(--primary))"
                opacity="0.18"
                filter={`url(#${uid}-soft)`}
              />
              {/* Idle breathing aura */}
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="34"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                animate={{ r: [34, 40, 34], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
              />
              {/* Glass body */}
              <circle
                cx={n.x}
                cy={n.y}
                r="30"
                fill={`url(#${uid}-node)`}
                stroke={`url(#${uid}-stroke)`}
                strokeWidth="1.2"
              />
              {/* Inner top highlight */}
              <ellipse
                cx={n.x}
                cy={n.y - 14}
                rx="18"
                ry="5"
                fill="hsl(var(--foreground))"
                opacity="0.08"
              />
              {/* Rotating dashed ring */}
              <circle
                cx={n.x}
                cy={n.y}
                r="34"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeOpacity="0.45"
                strokeWidth="1"
                strokeDasharray="3 5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${n.x} ${n.y}`}
                  to={`360 ${n.x} ${n.y}`}
                  dur={`${12 + i}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <foreignObject x={n.x - 28} y={n.y - 28} width="56" height="56">
                <div className="flex h-full w-full items-center justify-center">
                  <Icon className="h-5 w-5 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]" strokeWidth={2.2} />
                </div>
              </foreignObject>
              {/* Label chip */}
              <rect
                x={n.x - 36}
                y={n.y + 40}
                width="72"
                height="18"
                rx="9"
                fill="hsl(var(--card))"
                stroke="hsl(var(--border))"
                strokeOpacity="0.6"
                strokeWidth="1"
              />
              <text
                x={n.x}
                y={n.y + 52}
                textAnchor="middle"
                className="fill-foreground"
                style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}
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
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 px-4 py-1.5 text-[10px] uppercase tracking-[0.24em] text-primary backdrop-blur-md shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.4)]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
            {badge}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalOrbitDiagram;
