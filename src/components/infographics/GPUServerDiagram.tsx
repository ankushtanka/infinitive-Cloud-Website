import { motion } from "framer-motion";
import { Cpu, Gauge, Thermometer, Zap } from "lucide-react";

/**
 * Premium cinematic GPU diagram — a single hero GPU card floating in 3D space
 * with isometric depth, animated tensor core, glowing fans, and parallax light.
 */
const GPUServerDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-card p-6 sm:p-10 shadow-[var(--shadow-strong)]">
      {/* Ambient environment glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      {/* Animated grid floor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)/0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <Cpu className="h-3.5 w-3.5 text-primary" />
            NVIDIA · Tensor Core · Live
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Inference
          </div>
        </div>

        <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="GPU dedicated server">
          <defs>
            {/* PCB gradients */}
            <linearGradient id="gpu-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="50%" stopColor="hsl(var(--muted))" />
              <stop offset="100%" stopColor="hsl(var(--card))" />
            </linearGradient>
            <linearGradient id="gpu-side" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0.5)" />
              <stop offset="100%" stopColor="hsl(var(--primary)/0.15)" />
            </linearGradient>
            <linearGradient id="gpu-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>
            <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="60%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="fan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0.9)" />
              <stop offset="100%" stopColor="hsl(var(--accent)/0.6)" />
            </linearGradient>
            <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="12" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Floor reflection / shadow — synced with float */}
          <ellipse cx="400" cy="410" rx="240" ry="14" fill="hsl(var(--primary)/0.25)" filter="url(#soft-glow)">
            <animate attributeName="rx" values="240;200;240" dur="5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.25;0.5" dur="5s" repeatCount="indefinite" />
          </ellipse>

          {/* === MAIN RIG: drift + tilt + float === */}
          <g>
            {/* Lateral drift */}
            <animateTransform attributeName="transform" type="translate"
              values="-12 0; 12 0; -12 0" dur="9s" repeatCount="indefinite" additive="sum" />
            {/* 3D tilt rocking */}
            <animateTransform attributeName="transform" type="rotate"
              values="-2 400 230; 2 400 230; -2 400 230" dur="7s" repeatCount="indefinite" additive="sum" />

            <motion.g
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* === ISOMETRIC GPU CARD === */}
              {/* Front face (long edge of card) */}
              <path d="M 140 280 L 660 280 L 660 320 L 140 320 Z" fill="url(#gpu-front)"
                stroke="hsl(var(--primary)/0.5)" strokeWidth="1" />
              {/* Top face */}
              <path d="M 140 280 L 200 220 L 720 220 L 660 280 Z" fill="url(#gpu-top)"
                stroke="hsl(var(--primary)/0.6)" strokeWidth="1.2" />
              {/* Right side face */}
              <path d="M 660 280 L 720 220 L 720 260 L 660 320 Z" fill="url(#gpu-side)"
                stroke="hsl(var(--primary)/0.6)" strokeWidth="1" />

              {/* Backplate accent line */}
              <path d="M 200 220 L 720 220" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.7" />

              {/* Brand engraving on top */}
              <text x="225" y="252" fontSize="11" fontWeight="900" letterSpacing="6" className="fill-foreground" opacity="0.85">
                INFINITIVE
              </text>
              <text x="225" y="265" fontSize="7" letterSpacing="3" className="fill-muted-foreground">
                TENSOR · GPU · 80GB HBM3
              </text>

              {/* === TWIN COOLING FANS (top face) === */}
              {[
                { cx: 360, cy: 248, r: 36 },
                { cx: 560, cy: 248, r: 36 },
              ].map((fan, idx) => (
                <g key={idx}>
                  {/* Fan housing ring */}
                  <ellipse cx={fan.cx} cy={fan.cy} rx={fan.r} ry={fan.r * 0.45}
                    fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.7)" strokeWidth="1.5" />
                  <ellipse cx={fan.cx} cy={fan.cy} rx={fan.r - 4} ry={(fan.r - 4) * 0.45}
                    fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.4)" strokeWidth="0.8" />

                  {/* Spinning blades (squashed for isometric) */}
                  <g transform={`translate(${fan.cx} ${fan.cy})`}>
                    <animateTransform attributeName="transform" type="rotate"
                      from="0" to={idx % 2 === 0 ? "360" : "-360"} dur="1.4s" repeatCount="indefinite" additive="sum" />
                    <g transform={`scale(1, 0.45)`}>
                      {[0, 60, 120, 180, 240, 300].map((deg) => (
                        <path
                          key={deg}
                          d={`M 0 0 Q ${fan.r * 0.4} ${-fan.r * 0.15} ${fan.r * 0.85} ${-fan.r * 0.05} L ${fan.r * 0.85} ${fan.r * 0.05} Q ${fan.r * 0.4} ${fan.r * 0.15} 0 0 Z`}
                          fill="url(#fan-grad)"
                          opacity="0.85"
                          transform={`rotate(${deg})`}
                        />
                      ))}
                    </g>
                  </g>

                  {/* Center hub with pulsing LED */}
                  <ellipse cx={fan.cx} cy={fan.cy} rx="8" ry="3.6" fill="hsl(var(--background))"
                    stroke="hsl(var(--primary))" strokeWidth="1" />
                  <circle cx={fan.cx} cy={fan.cy} r="2.5" fill="hsl(var(--primary))" filter="url(#soft-glow)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                </g>
              ))}

              {/* Center NVLink bridge with pulsing data */}
              <path d="M 396 248 L 524 248" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
              <circle r="2.5" fill="hsl(var(--accent))" filter="url(#soft-glow)">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 396 248 L 524 248" />
              </circle>
              <circle r="2.5" fill="hsl(var(--primary))" filter="url(#soft-glow)">
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 524 248 L 396 248" />
              </circle>

              {/* === FRONT FACE: PCIe edge connector + RGB strip === */}
              {Array.from({ length: 28 }).map((_, i) => (
                <rect key={i} x={170 + i * 16} y="312" width="10" height="6"
                  fill="hsl(var(--primary)/0.7)" />
              ))}

              {/* Animated RGB strip on front face */}
              <rect x="150" y="285" width="500" height="3" fill="hsl(var(--primary))" opacity="0.3" />
              <rect x="150" y="285" width="120" height="3" fill="url(#fan-grad)" filter="url(#soft-glow)">
                <animate attributeName="x" values="150;530;150" dur="4s" repeatCount="indefinite" />
              </rect>

              {/* Display port cluster on right side face */}
              {[0, 1, 2].map((i) => (
                <rect key={i} x="668" y={285 + i * 10} width="24" height="6" rx="1"
                  fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.6)" strokeWidth="0.8" />
              ))}
            </motion.g>

            {/* === LEVITATING TENSOR CORE (separate float) === */}
            <motion.g
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              {/* Outer rotating ring */}
              <g transform="translate(400 140)">
                <animateTransform attributeName="transform" type="rotate"
                  from="0 0 0" to="360 0 0" dur="14s" repeatCount="indefinite" additive="sum" />
                <circle r="58" fill="none" stroke="hsl(var(--primary)/0.5)" strokeWidth="1" strokeDasharray="3 6" />
                <circle cx="58" cy="0" r="3" fill="hsl(var(--primary))" filter="url(#soft-glow)" />
              </g>
              {/* Middle counter-rotating ring */}
              <g transform="translate(400 140)">
                <animateTransform attributeName="transform" type="rotate"
                  from="360 0 0" to="0 0 0" dur="9s" repeatCount="indefinite" additive="sum" />
                <ellipse rx="46" ry="18" fill="none" stroke="hsl(var(--accent)/0.7)" strokeWidth="1.2" strokeDasharray="4 4" />
              </g>
              {/* Inner ring */}
              <circle cx="400" cy="140" r="32" fill="none" stroke="hsl(var(--primary)/0.6)" strokeWidth="1.2">
                <animate attributeName="r" values="32;36;32" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Glowing core */}
              <circle cx="400" cy="140" r="44" fill="url(#core-glow)" filter="url(#strong-glow)">
                <animate attributeName="r" values="40;52;40" dur="2.4s" repeatCount="indefinite" />
              </circle>

              {/* Hexagonal tensor core */}
              <g transform="translate(400 140)" filter="url(#soft-glow)">
                <animateTransform attributeName="transform" type="rotate"
                  from="0 0 0" to="60 0 0" dur="6s" repeatCount="indefinite" additive="sum" />
                <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10"
                  fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1.5" />
                <polygon points="0,-12 10,-6 10,6 0,12 -10,6 -10,-6"
                  fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
              </g>

              {/* Energy beam down to GPU */}
              <line x1="400" y1="184" x2="400" y2="248" stroke="hsl(var(--primary))" strokeWidth="1.5"
                opacity="0.5" filter="url(#soft-glow)">
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="1.5s" repeatCount="indefinite" />
              </line>
              <circle r="3" fill="hsl(var(--primary))" filter="url(#soft-glow)">
                <animateMotion dur="1.5s" repeatCount="indefinite" path="M 400 184 L 400 248" />
              </circle>
            </motion.g>
          </g>

          {/* Ambient orbiting particles (outside the rig, parallax) */}
          {[
            { d: "M 80 360 Q 400 300 720 360", dur: "8s" },
            { d: "M 100 200 Q 400 130 700 200", dur: "11s" },
            { d: "M 60 420 Q 400 380 740 420", dur: "13s" },
          ].map((p, i) => (
            <g key={i}>
              <path d={p.d} fill="none" stroke="hsl(var(--primary)/0.08)" strokeWidth="0.8" strokeDasharray="2 6" />
              <circle r="2" fill="hsl(var(--primary))" filter="url(#soft-glow)">
                <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} />
                <animate attributeName="opacity" values="0;1;1;0" dur={p.dur} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* Scanline */}
          <rect x="0" y="0" width="800" height="2" fill="hsl(var(--primary)/0.3)" filter="url(#soft-glow)">
            <animate attributeName="y" values="80;420;80" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.6;0" dur="6s" repeatCount="indefinite" />
          </rect>
        </svg>

        {/* Stat strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Gauge, v: "1.2 PFLOPs", l: "FP16 Compute" },
            { icon: Cpu, v: "80 GB HBM3", l: "Tensor Memory" },
            { icon: Zap, v: "700 W", l: "TDP Capacity" },
            { icon: Thermometer, v: "62 °C", l: "Liquid-cooled" },
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

export default GPUServerDiagram;
