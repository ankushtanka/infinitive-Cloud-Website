import { motion } from "framer-motion";
import { Cpu, HardDrive, Network, Shield } from "lucide-react";

/**
 * Premium 3D isometric dedicated server rack — cinematic floating motion,
 * stacked 1U units, animated airflow, fiber link, and refined typography.
 */
const DedicatedServerDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-background to-card p-6 sm:p-10 shadow-[var(--shadow-strong)]">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      {/* Subtle perspective grid floor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-25 [mask-image:linear-gradient(to_top,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)/0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.25) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          transform: "perspective(700px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
            <span className="h-px w-6 bg-primary/40" />
            Bare metal · Tier-IV
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Online
          </div>
        </div>

        <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="3D dedicated server rack">
          <defs>
            <linearGradient id="ds-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="50%" stopColor="hsl(var(--muted))" />
              <stop offset="100%" stopColor="hsl(var(--card))" />
            </linearGradient>
            <linearGradient id="ds-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>
            <linearGradient id="ds-side" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0.45)" />
              <stop offset="100%" stopColor="hsl(var(--primary)/0.12)" />
            </linearGradient>
            <linearGradient id="ds-airflow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0)" />
              <stop offset="50%" stopColor="hsl(var(--primary)/0.7)" />
              <stop offset="100%" stopColor="hsl(var(--primary)/0)" />
            </linearGradient>
            <radialGradient id="ds-orb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <filter id="ds-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Floor reflection */}
          <ellipse cx="400" cy="420" rx="240" ry="14" fill="hsl(var(--primary)/0.22)" filter="url(#ds-glow)">
            <animate attributeName="rx" values="240;200;240" dur="6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.25;0.5" dur="6s" repeatCount="indefinite" />
          </ellipse>

          {/* === MAIN RIG: drift + tilt + float === */}
          <g>
            <animateTransform attributeName="transform" type="translate"
              values="-10 0; 10 0; -10 0" dur="10s" repeatCount="indefinite" additive="sum" />
            <animateTransform attributeName="transform" type="rotate"
              values="-1.5 400 240; 1.5 400 240; -1.5 400 240" dur="8s" repeatCount="indefinite" additive="sum" />

            <motion.g
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* === STACKED 1U UNITS (3 units, isometric) === */}
              {[0, 1, 2].map((i) => {
                const yOffset = i * 56;
                const baseY = 200 + yOffset;
                return (
                  <g key={i}>
                    {/* Right side face */}
                    <path
                      d={`M 640 ${baseY + 30} L 700 ${baseY - 10} L 700 ${baseY + 28} L 640 ${baseY + 68} Z`}
                      fill="url(#ds-side)"
                      stroke="hsl(var(--primary)/0.55)"
                      strokeWidth="1"
                    />
                    {/* Top face */}
                    <path
                      d={`M 160 ${baseY - 10} L 700 ${baseY - 10} L 640 ${baseY + 30} L 100 ${baseY + 30} Z`}
                      fill="url(#ds-top)"
                      stroke="hsl(var(--primary)/0.55)"
                      strokeWidth="1"
                    />
                    {/* Front face */}
                    <path
                      d={`M 100 ${baseY + 30} L 640 ${baseY + 30} L 640 ${baseY + 68} L 100 ${baseY + 68} Z`}
                      fill="url(#ds-front)"
                      stroke="hsl(var(--primary)/0.55)"
                      strokeWidth="1"
                    />

                    {/* Front bezel detail */}
                    <text x="118" y={baseY + 50} fontSize="8" fontWeight="700" letterSpacing="3" className="fill-foreground" opacity="0.85">
                      INFINITIVE
                    </text>
                    <text x="118" y={baseY + 62} fontSize="6" letterSpacing="2" className="fill-muted-foreground">
                      1U · BARE METAL · DUAL XEON
                    </text>

                    {/* Drive bays (front face) */}
                    {Array.from({ length: 8 }).map((_, j) => (
                      <g key={j}>
                        <rect
                          x={250 + j * 38}
                          y={baseY + 38}
                          width="32"
                          height="22"
                          rx="2"
                          fill="hsl(var(--background))"
                          stroke="hsl(var(--primary)/0.5)"
                          strokeWidth="0.8"
                        />
                        <rect
                          x={254 + j * 38}
                          y={baseY + 42}
                          width="24"
                          height="2"
                          fill="hsl(var(--primary)/0.4)"
                        />
                        <circle cx={278 + j * 38} cy={baseY + 56} r="1.5" fill="hsl(var(--primary))">
                          <animate
                            attributeName="opacity"
                            values="0.2;1;0.2"
                            dur={`${0.7 + j * 0.13}s`}
                            repeatCount="indefinite"
                            begin={`${i * 0.2 + j * 0.08}s`}
                          />
                        </circle>
                      </g>
                    ))}

                    {/* Power LEDs on right of front */}
                    {[0, 1, 2].map((k) => (
                      <circle key={k} cx={580 + k * 14} cy={baseY + 50} r="2" fill="hsl(var(--primary))" filter="url(#ds-glow)">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="1.6s"
                          repeatCount="indefinite"
                          begin={`${k * 0.3 + i * 0.4}s`}
                        />
                      </circle>
                    ))}

                    {/* Airflow shimmer on top */}
                    <rect x="180" y={baseY - 6} width="440" height="3" fill="url(#ds-airflow)">
                      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                    </rect>

                    {/* Vent slots on top */}
                    {Array.from({ length: 18 }).map((_, k) => (
                      <line
                        key={k}
                        x1={200 + k * 22}
                        y1={baseY + 8}
                        x2={195 + k * 22}
                        y2={baseY + 18}
                        stroke="hsl(var(--primary)/0.25)"
                        strokeWidth="0.8"
                      />
                    ))}
                  </g>
                );
              })}

              {/* === FIBER UPLINK (top of stack) === */}
              <path
                d="M 700 190 Q 740 170 740 130 L 740 80"
                fill="none"
                stroke="hsl(var(--primary)/0.4)"
                strokeWidth="1.2"
                strokeDasharray="3 4"
              />
              <circle r="2.5" fill="hsl(var(--primary))" filter="url(#ds-glow)">
                <animateMotion dur="2.8s" repeatCount="indefinite" path="M 740 80 L 740 130 Q 740 170 700 190" />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle r="2" fill="hsl(var(--accent))" filter="url(#ds-glow)">
                <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.4s" path="M 700 190 Q 740 170 740 130 L 740 80" />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" begin="1.4s" />
              </circle>

              {/* Cloud node label */}
              <g transform="translate(740 70)">
                <circle r="20" fill="url(#ds-orb)">
                  <animate attributeName="r" values="18;24;18" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.2" />
                <circle r="3" fill="hsl(var(--primary))">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
              <text x="740" y="48" textAnchor="middle" fontSize="8" letterSpacing="3" className="fill-muted-foreground" fontWeight="600">
                10 GbE
              </text>
            </motion.g>

            {/* === HOVERING SPEC ORB (left) === */}
            <motion.g
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <g transform="translate(70 110)">
                <circle r="32" fill="url(#ds-orb)">
                  <animate attributeName="r" values="28;36;28" dur="4s" repeatCount="indefinite" />
                </circle>
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
                  <circle r="22" fill="none" stroke="hsl(var(--primary)/0.4)" strokeWidth="1" strokeDasharray="1 5" />
                </g>
                <circle r="14" fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.6)" strokeWidth="1" />
                <text textAnchor="middle" y="3" fontSize="9" fontWeight="700" className="fill-primary">CPU</text>
              </g>
              <text x="70" y="170" textAnchor="middle" fontSize="8" letterSpacing="2" className="fill-muted-foreground" fontWeight="600">
                DUAL XEON
              </text>
            </motion.g>
          </g>

          {/* Hairline frame */}
          <rect x="20" y="20" width="760" height="420" rx="20" fill="none" stroke="hsl(var(--border))" strokeOpacity="0.6" strokeWidth="1" />

          {/* Scanline */}
          <rect x="0" y="0" width="800" height="2" fill="hsl(var(--primary)/0.25)" filter="url(#ds-glow)">
            <animate attributeName="y" values="60;420;60" dur="7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.5;0" dur="7s" repeatCount="indefinite" />
          </rect>
        </svg>

        {/* Stat strip */}
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {[
            { icon: Cpu, v: "Dual Xeon", l: "Bare metal" },
            { icon: HardDrive, v: "RAID-10", l: "NVMe SSD" },
            { icon: Network, v: "10 GbE", l: "Network" },
            { icon: Shield, v: "IPMI", l: "Out-of-band" },
          ].map((s) => (
            <div key={s.l} className="flex items-start gap-3">
              <div className="mt-1 h-px w-5 bg-primary/50 shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <s.icon className="h-3.5 w-3.5 text-primary" />
                  <div className="text-base font-semibold text-foreground tracking-tight">{s.v}</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DedicatedServerDiagram;
