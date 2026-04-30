import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Layers, Thermometer, Gauge } from "lucide-react";

/**
 * Premium animated SVG infographic for the GPU Dedicated Server page.
 * - Center: a stylised GPU board with rotating tensor core + heat plate
 * - Around: parallel CUDA core columns with pulsing data lanes feeding the GPU
 * - Side rails: VRAM/PCIe/Cooling indicators
 */
const GPUServerDiagram = () => {
  const cx = 300;
  const cy = 220;

  // CUDA "lanes" feeding the GPU
  const lanes = Array.from({ length: 6 }).map((_, i) => ({
    y: 100 + i * 40,
    delay: i * 0.25,
  }));

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <div className="absolute top-0 left-1/4 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />
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
            GPU · Online · 312 TFLOPS
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono">
            <span className="text-primary">PCIe Gen4 ×16</span>
            <span>NVLink</span>
          </div>
        </div>

        <svg viewBox="0 0 600 440" className="w-full h-auto" role="img" aria-label="GPU server with CUDA core lanes feeding a tensor core">
          <defs>
            <radialGradient id="gpu-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gpu-lane" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.85)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.05)" />
            </linearGradient>
            <linearGradient id="gpu-board" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="100%" stopColor="hsl(var(--muted))" />
            </linearGradient>
            <pattern id="gpu-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" />
            </pattern>
            <filter id="gpu-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <rect width="600" height="440" fill="url(#gpu-grid)" />

          {/* Soft halo behind GPU */}
          <circle cx={cx} cy={cy} r="180" fill="url(#gpu-core)" filter="url(#gpu-soft)" />

          {/* Slow rotating dashed orbits around GPU */}
          <g>
            <circle cx={cx} cy={cy} r="170" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1" strokeDasharray="2 8">
              <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="36s" repeatCount="indefinite" />
            </circle>
            <circle cx={cx} cy={cy} r="200" fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="0.8" strokeDasharray="1 14">
              <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="56s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* CUDA lanes - left feeding into GPU */}
          {lanes.map((l, i) => {
            const path = `M 30 ${l.y} L 200 ${l.y} L 240 ${cy}`;
            return (
              <g key={`lane-${i}`}>
                <path d={path} fill="none" stroke="url(#gpu-lane)" strokeWidth="1.4" opacity="0.65" />
                <circle r="2.6" fill="hsl(var(--primary))">
                  <animateMotion dur={`${1.8 + (i % 3) * 0.4}s`} repeatCount="indefinite" path={path} begin={`${l.delay}s`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${1.8 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${l.delay}s`} />
                </circle>
                {/* Lane label */}
                <text x="36" y={l.y - 6} className="fill-muted-foreground" fontSize="8" fontFamily="monospace" letterSpacing="1">
                  CUDA {String(i * 1024).padStart(4, "0")}
                </text>
              </g>
            );
          })}

          {/* CUDA lanes - right output */}
          {lanes.map((l, i) => {
            const path = `M 360 ${cy} L 400 ${l.y} L 570 ${l.y}`;
            return (
              <g key={`out-${i}`}>
                <path d={path} fill="none" stroke="url(#gpu-lane)" strokeWidth="1.4" opacity="0.55" />
                <circle r="2.4" fill="hsl(var(--accent))">
                  <animateMotion dur={`${2 + (i % 3) * 0.4}s`} repeatCount="indefinite" path={path} begin={`${l.delay + 0.3}s`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${l.delay + 0.3}s`} />
                </circle>
              </g>
            );
          })}

          {/* GPU board */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* PCB */}
            <rect x={cx - 130} y={cy - 80} width="260" height="160" rx="14"
              fill="url(#gpu-board)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />
            {/* Top heatsink fins */}
            {Array.from({ length: 18 }).map((_, i) => (
              <rect key={`fin-${i}`} x={cx - 120 + i * 13} y={cy - 70} width="3" height="40" rx="1" fill="hsl(var(--primary) / 0.25)" />
            ))}
            {/* VRAM modules around heatsink */}
            {[-110, -90, 90, 110].map((dx, i) => (
              <rect key={`vram-${i}`} x={cx + dx - 8} y={cy + 42} width="16" height="22" rx="2"
                fill="hsl(var(--muted))" stroke="hsl(var(--primary) / 0.5)" />
            ))}

            {/* Tensor core (center) */}
            <g>
              <circle cx={cx} cy={cy + 5} r="42" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.7)" strokeWidth="1.5" />
              {/* Rotating dashed ring */}
              <circle cx={cx} cy={cy + 5} r="52" fill="none" stroke="hsl(var(--primary) / 0.6)" strokeWidth="1" strokeDasharray="3 5">
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy + 5}`} to={`360 ${cx} ${cy + 5}`} dur="14s" repeatCount="indefinite" />
              </circle>
              {/* Inner pulsing ring */}
              <circle cx={cx} cy={cy + 5} r="30" fill="none" stroke="hsl(var(--accent) / 0.7)" strokeWidth="1.2">
                <animate attributeName="r" values="26;34;26" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.4s" repeatCount="indefinite" />
              </circle>
              {/* Icon */}
              <foreignObject x={cx - 14} y={cy - 9} width="28" height="28">
                <div className="flex h-full w-full items-center justify-center">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
              </foreignObject>
              {/* GPU label */}
              <text x={cx} y={cy + 78} textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700" letterSpacing="2">
                NVIDIA · TENSOR
              </text>
            </g>

            {/* Activity LEDs (right side) */}
            {[0, 1, 2].map((i) => (
              <g key={`led-${i}`}>
                <circle cx={cx + 110} cy={cy - 60 + i * 10} r="2.2" fill={["#34A853", "#FBBC04", "#4285F4"][i]}>
                  <animate attributeName="opacity" values="0.3;1;0.3" dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </motion.g>

          {/* Bottom wordmark */}
          <text x={cx} y="420" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontFamily="monospace" letterSpacing="3">
            INFINITIVE · ACCELERATED COMPUTE
          </text>
        </svg>

        {/* Bottom stat strip */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { icon: Gauge, v: "312", l: "TFLOPS" },
            { icon: Layers, v: "96 GB", l: "VRAM" },
            { icon: Zap, v: "PCIe 4.0", l: "×16 Lanes" },
            { icon: Thermometer, v: "62°C", l: "Cooling" },
          ].map((s) => (
            <div key={s.l} className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-3 py-2.5 backdrop-blur">
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
        <Activity className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium">Inference: 1.4M tokens/min</span>
      </div>
    </div>
  );
};

export default GPUServerDiagram;
