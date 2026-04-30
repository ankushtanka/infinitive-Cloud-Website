import { motion } from "framer-motion";
import { Cpu, HardDrive, Shield, Zap } from "lucide-react";

/**
 * Premium bare-metal server rack diagram with animated thermal flow,
 * RAID disks, network ports, and power LEDs.
 */
const DedicatedServerDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Cpu className="h-3.5 w-3.5 text-primary" />
          Bare metal · dedicated rack unit
        </div>

        <svg viewBox="0 0 760 360" className="w-full h-auto" role="img" aria-label="Dedicated server rack">
          <defs>
            <linearGradient id="ds-chassis" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--card))" />
              <stop offset="100%" stopColor="hsl(var(--muted))" />
            </linearGradient>
            <linearGradient id="ds-heat" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0)" />
              <stop offset="50%" stopColor="hsl(var(--primary)/0.7)" />
              <stop offset="100%" stopColor="hsl(var(--primary)/0)" />
            </linearGradient>
          </defs>

          {/* Rack U lines */}
          {[60, 130, 200, 270].map((y) => (
            <line key={y} x1="40" y1={y} x2="720" y2={y}
              stroke="hsl(var(--foreground)/0.05)" strokeWidth="0.5" strokeDasharray="2 4" />
          ))}

          {/* 1U Chassis */}
          <motion.g
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <rect x="60" y="80" width="640" height="180" rx="8"
              fill="url(#ds-chassis)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />
            <rect x="60" y="80" width="640" height="22" rx="8" fill="hsl(var(--background))" />
            <text x="80" y="96" fontSize="9" fontWeight="700" letterSpacing="2" className="fill-foreground">INFINITIVE · 1U</text>
            <text x="690" y="96" textAnchor="end" fontSize="8" className="fill-muted-foreground" letterSpacing="1">SN: ICX-7842</text>

            {/* Power LEDs */}
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={580 + i * 14} cy="91" r="2.5" fill="hsl(var(--primary))">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
            ))}

            {/* CPU sockets */}
            {[0, 1].map((i) => (
              <g key={i}>
                <rect x={100 + i * 90} y="120" width="70" height="70" rx="4"
                  fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.6)" strokeWidth="1.5" />
                <rect x={108 + i * 90} y="128" width="54" height="54" rx="2"
                  fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.4)" />
                {/* Pins */}
                {Array.from({ length: 6 }).map((_, j) => (
                  <line key={j} x1={108 + i * 90 + j * 9} y1="128" x2={108 + i * 90 + j * 9} y2="182"
                    stroke="hsl(var(--primary)/0.15)" strokeWidth="0.5" />
                ))}
                <text x={135 + i * 90} y="158" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">XEON</text>
                <text x={135 + i * 90} y="170" textAnchor="middle" fontSize="7" className="fill-muted-foreground">CPU {i + 1}</text>
                {/* Heat shimmer */}
                <rect x={100 + i * 90} y="110" width="70" height="6" fill="url(#ds-heat)">
                  <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                </rect>
              </g>
            ))}

            {/* RAM slots */}
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i}>
                <rect x={290 + i * 14} y="120" width="10" height="70" rx="2"
                  fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.4)" />
                <rect x={291 + i * 14} y="180" width="8" height="2" fill="hsl(var(--primary))">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.1}s`} repeatCount="indefinite" />
                </rect>
              </g>
            ))}
            <text x="346" y="208" textAnchor="middle" fontSize="8" className="fill-muted-foreground" letterSpacing="1">DDR4 ECC · 64GB</text>

            {/* NVMe / RAID */}
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={430 + i * 50} y="120" width="42" height="70" rx="4"
                  fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.5)" strokeWidth="1" />
                <rect x={436 + i * 50} y="130" width="30" height="3" fill="hsl(var(--primary)/0.6)" />
                <rect x={436 + i * 50} y="138" width="30" height="3" fill="hsl(var(--primary)/0.4)" />
                <circle cx={451 + i * 50} cy="178" r="2" fill="hsl(var(--primary))">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" />
                </circle>
                <text x={451 + i * 50} y="160" textAnchor="middle" fontSize="7" className="fill-muted-foreground">NVMe</text>
              </g>
            ))}
            <text x="500" y="208" textAnchor="middle" fontSize="8" className="fill-muted-foreground" letterSpacing="1">RAID-10 · 4× NVMe</text>

            {/* Network ports */}
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={640} y={118 + i * 14} width="40" height="10" rx="1"
                  fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.5)" />
                <circle cx="678" cy={123 + i * 14} r="1.5" fill="hsl(var(--primary))">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                </circle>
              </g>
            ))}
            <text x="660" y="208" textAnchor="middle" fontSize="8" className="fill-muted-foreground" letterSpacing="1">10 GbE × 4</text>
          </motion.g>

          {/* Data flow out */}
          <path d="M 700 170 Q 730 170 730 220 L 730 320" fill="none"
            stroke="hsl(var(--primary)/0.4)" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle r="3" fill="hsl(var(--primary))">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 700 170 Q 730 170 730 220 L 730 320" />
          </circle>
        </svg>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Cpu, v: "Dual Xeon", l: "Bare metal" },
            { icon: HardDrive, v: "RAID-10", l: "NVMe SSD" },
            { icon: Zap, v: "10 GbE", l: "Network" },
            { icon: Shield, v: "IPMI", l: "Out-of-band" },
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

export default DedicatedServerDiagram;
