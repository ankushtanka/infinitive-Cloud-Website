import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Layers, Thermometer, Gauge } from "lucide-react";

/**
 * Premium 3D-style isometric GPU infographic.
 * - Isometric GPU board with stacked depth layers
 * - Floating tensor core with rotating energy rings
 * - Animated CUDA data streams flowing through the board
 * - Holographic VRAM stacks rising in 3D
 */
const GPUServerDiagram = () => {
  // Isometric projection helpers (30° angles)
  const ISO_X = (x: number, y: number) => x * 0.866 - y * 0.866;
  const ISO_Y = (x: number, y: number) => x * 0.5 + y * 0.5;

  // CUDA data stream paths in 3D-ish curves
  const streams = Array.from({ length: 8 }).map((_, i) => ({
    delay: i * 0.18,
    speed: 2.2 + (i % 4) * 0.3,
    yOffset: i * 14,
  }));

  return (
    <div className="relative">
      {/* Cinematic ambient glow */}
      <div className="pointer-events-none absolute -inset-12 -z-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-primary/40 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent/30 blur-3xl" style={{ animation: "pulse 4s ease-in-out infinite" }} />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div
        className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/20 p-5 sm:p-8 ring-1 ring-primary/10 backdrop-blur-xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-strong)" }}
      >
        {/* Animated scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 4px)",
          }}
        />

        {/* Top status bar */}
        <div className="relative mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            GPU · Online · 312 TFLOPS
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono">
            <span className="text-primary">PCIe Gen4 ×16</span>
            <span>NVLink</span>
          </div>
        </div>

        <svg
          viewBox="0 0 600 460"
          className="w-full h-auto"
          role="img"
          aria-label="3D isometric GPU compute board with animated CUDA streams"
        >
          <defs>
            {/* PCB gradient with depth */}
            <linearGradient id="pcb-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.15)" />
              <stop offset="100%" stopColor="hsl(var(--muted))" />
            </linearGradient>
            <linearGradient id="pcb-side" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.4)" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>
            <linearGradient id="pcb-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent) / 0.3)" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>

            {/* Heatsink fin gradient */}
            <linearGradient id="fin-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.85)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.2)" />
            </linearGradient>

            {/* Tensor core energy */}
            <radialGradient id="tensor-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>

            {/* Stream gradient */}
            <linearGradient id="stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </linearGradient>

            {/* Iso grid floor */}
            <pattern id="iso-grid" width="40" height="23" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
              <path d="M 40 0 L 0 0 0 23" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.08" strokeWidth="0.5" />
            </pattern>

            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          {/* Iso floor grid */}
          <rect x="0" y="280" width="600" height="180" fill="url(#iso-grid)" opacity="0.6" />

          {/* Floor reflection halo */}
          <ellipse cx="300" cy="360" rx="240" ry="40" fill="hsl(var(--primary) / 0.25)" filter="url(#soft-glow)" />

          {/* === ISOMETRIC GPU BOARD === */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "300px 240px" }}
          >
            {/* Subtle floating animation */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Board front (depth) face */}
              <path
                d="M 120 290 L 120 310 L 480 310 L 480 290 Z"
                fill="url(#pcb-front)"
                stroke="hsl(var(--primary) / 0.4)"
                strokeWidth="0.8"
              />
              {/* Board side (right) face */}
              <path
                d="M 480 290 L 480 310 L 510 280 L 510 260 Z"
                fill="url(#pcb-side)"
                stroke="hsl(var(--primary) / 0.4)"
                strokeWidth="0.8"
              />
              {/* Board top */}
              <path
                d="M 120 290 L 480 290 L 510 260 L 150 260 Z"
                fill="url(#pcb-top)"
                stroke="hsl(var(--primary) / 0.6)"
                strokeWidth="1"
              />

              {/* Circuit traces on board top */}
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={`trace-${i}`}
                  d={`M ${160 + i * 30} 285 L ${200 + i * 30} 285 L ${210 + i * 30} 275 L ${260 + i * 30} 275`}
                  fill="none"
                  stroke="hsl(var(--primary) / 0.6)"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                >
                  <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="2s" repeatCount="indefinite" />
                </path>
              ))}

              {/* === HEATSINK FINS (3D stacked) === */}
              {Array.from({ length: 22 }).map((_, i) => {
                const x = 180 + i * 10;
                const yTop = 250;
                const fH = 30 + (i % 3) * 4;
                return (
                  <g key={`fin-${i}`}>
                    {/* Fin face */}
                    <path
                      d={`M ${x} ${yTop} L ${x} ${yTop - fH} L ${x + 4} ${yTop - fH - 4} L ${x + 4} ${yTop - 4} Z`}
                      fill="url(#fin-grad)"
                      stroke="hsl(var(--primary) / 0.6)"
                      strokeWidth="0.4"
                    />
                    {/* Fin top edge highlight */}
                    <line
                      x1={x}
                      y1={yTop - fH}
                      x2={x + 4}
                      y2={yTop - fH - 4}
                      stroke="hsl(var(--primary))"
                      strokeWidth="0.6"
                      opacity="0.9"
                    />
                  </g>
                );
              })}

              {/* === VRAM STACKS (front edge) === */}
              {[0, 1, 2, 3, 4].map((i) => {
                const x = 165 + i * 60;
                return (
                  <g key={`vram-${i}`}>
                    {/* Module body (3D) */}
                    <path
                      d={`M ${x} 285 L ${x + 24} 285 L ${x + 30} 279 L ${x + 6} 279 Z`}
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--primary) / 0.7)"
                      strokeWidth="0.6"
                    />
                    <path
                      d={`M ${x + 24} 285 L ${x + 24} 295 L ${x + 30} 289 L ${x + 30} 279 Z`}
                      fill="hsl(var(--background))"
                      stroke="hsl(var(--primary) / 0.5)"
                      strokeWidth="0.5"
                    />
                    {/* Activity LED */}
                    <circle cx={x + 12} cy={282} r="1.2" fill="hsl(var(--primary))">
                      <animate
                        attributeName="opacity"
                        values="0.2;1;0.2"
                        dur={`${1 + i * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}
            </motion.g>
          </motion.g>

          {/* === FLOATING TENSOR CORE (above board, levitating) === */}
          <motion.g
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Beam connecting to board */}
            <line
              x1="300"
              y1="180"
              x2="300"
              y2="255"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity="0.4"
              strokeDasharray="2 3"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
            </line>

            {/* Outer halo */}
            <circle cx="300" cy="160" r="70" fill="url(#tensor-glow)" opacity="0.7" />

            {/* Rotating outer ring */}
            <g style={{ transformOrigin: "300px 160px" }}>
              <circle
                cx="300"
                cy="160"
                r="55"
                fill="none"
                stroke="hsl(var(--primary) / 0.7)"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 300 160"
                  to="360 300 160"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx="300"
                cy="160"
                r="65"
                fill="none"
                stroke="hsl(var(--accent) / 0.5)"
                strokeWidth="0.8"
                strokeDasharray="1 12"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 300 160"
                  to="0 300 160"
                  dur="30s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Rotating tick markers */}
              <g>
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i * 30 * Math.PI) / 180;
                  return (
                    <line
                      key={`tick-${i}`}
                      x1={300 + Math.cos(a) * 75}
                      y1={160 + Math.sin(a) * 75}
                      x2={300 + Math.cos(a) * 80}
                      y2={160 + Math.sin(a) * 80}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                  );
                })}
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 300 160"
                  to="360 300 160"
                  dur="40s"
                  repeatCount="indefinite"
                />
              </g>
            </g>

            {/* Hexagonal tensor core (3D-ish) */}
            <g filter="url(#neon-glow)">
              <polygon
                points="300,125 330,142 330,178 300,195 270,178 270,142"
                fill="hsl(var(--card))"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
              {/* Inner hex */}
              <polygon
                points="300,138 320,150 320,170 300,182 280,170 280,150"
                fill="hsl(var(--primary) / 0.15)"
                stroke="hsl(var(--primary) / 0.8)"
                strokeWidth="1"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </polygon>
              {/* Pulsing core */}
              <circle cx="300" cy="160" r="10" fill="hsl(var(--primary))">
                <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="300" cy="160" r="5" fill="hsl(var(--background))" />
            </g>

            {/* Icon */}
            <foreignObject x="288" y="148" width="24" height="24">
              <div className="flex h-full w-full items-center justify-center">
                <Cpu className="h-5 w-5 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" />
              </div>
            </foreignObject>
          </motion.g>

          {/* === CUDA DATA STREAMS (left → tensor → right) === */}
          {streams.map((s, i) => {
            const yL = 70 + s.yOffset;
            const yR = 70 + s.yOffset;
            const pathIn = `M 20 ${yL} Q 150 ${yL + 20}, 250 160`;
            const pathOut = `M 350 160 Q 450 ${yR + 20}, 580 ${yR}`;
            return (
              <g key={`stream-${i}`}>
                {/* Faint guide path */}
                <path d={pathIn} fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.8" />
                <path d={pathOut} fill="none" stroke="hsl(var(--accent) / 0.15)" strokeWidth="0.8" />

                {/* Trail packet IN */}
                <circle r="2.6" fill="hsl(var(--primary))" filter="url(#neon-glow)">
                  <animateMotion dur={`${s.speed}s`} repeatCount="indefinite" path={pathIn} begin={`${s.delay}s`} />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${s.speed}s`}
                    repeatCount="indefinite"
                    begin={`${s.delay}s`}
                  />
                </circle>

                {/* Trail packet OUT */}
                <circle r="2.4" fill="hsl(var(--accent))" filter="url(#neon-glow)">
                  <animateMotion
                    dur={`${s.speed + 0.4}s`}
                    repeatCount="indefinite"
                    path={pathOut}
                    begin={`${s.delay + 0.5}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${s.speed + 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${s.delay + 0.5}s`}
                  />
                </circle>
              </g>
            );
          })}

          {/* CUDA labels (left edge) */}
          {[0, 2, 4, 6].map((i) => (
            <text
              key={`lbl-${i}`}
              x="22"
              y={66 + i * 14}
              className="fill-muted-foreground"
              fontSize="7.5"
              fontFamily="monospace"
              letterSpacing="1.2"
            >
              CUDA·{String(i * 1024).padStart(4, "0")}
            </text>
          ))}

          {/* Right output labels */}
          {[0, 2, 4, 6].map((i) => (
            <text
              key={`olbl-${i}`}
              x="540"
              y={66 + i * 14}
              className="fill-muted-foreground"
              fontSize="7.5"
              fontFamily="monospace"
              letterSpacing="1.2"
            >
              OUT·{String(i).padStart(2, "0")}
            </text>
          ))}

          {/* Tensor label */}
          <text
            x="300"
            y="218"
            textAnchor="middle"
            className="fill-foreground"
            fontSize="10"
            fontWeight="700"
            letterSpacing="3"
          >
            NVIDIA · TENSOR CORE
          </text>

          {/* Bottom wordmark */}
          <text
            x="300"
            y="445"
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="3"
          >
            INFINITIVE · ACCELERATED COMPUTE
          </text>
        </svg>

        {/* Bottom stat strip */}
        <div className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { icon: Gauge, v: "312", l: "TFLOPS" },
            { icon: Layers, v: "96 GB", l: "VRAM" },
            { icon: Zap, v: "PCIe 4.0", l: "×16 Lanes" },
            { icon: Thermometer, v: "62°C", l: "Cooling" },
          ].map((s) => (
            <div
              key={s.l}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-3 py-2.5 backdrop-blur"
            >
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

      {/* Floating live badge */}
      <div className="absolute -bottom-5 -left-5 hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-xl">
        <Activity className="w-5 h-5 text-primary animate-pulse" />
        <span className="text-sm font-medium">Inference: 1.4M tokens/min</span>
      </div>
    </div>
  );
};

export default GPUServerDiagram;
