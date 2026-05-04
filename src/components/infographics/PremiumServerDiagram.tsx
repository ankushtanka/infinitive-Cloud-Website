import { motion } from "framer-motion";
import { Cpu, HardDrive, Network, Shield, Layers, Activity } from "lucide-react";

/**
 * Premium VPS virtualization infographic.
 * Visualizes the core VPS concept: a physical host running a hypervisor
 * that partitions resources into isolated virtual private servers.
 * Theme-aware via CSS tokens. Pure SVG + framer-motion.
 */
const PremiumServerDiagram = () => {
  const vmPositions = [
    { x: 60, y: 60, label: "VPS-01", os: "Ubuntu" },
    { x: 230, y: 60, label: "VPS-02", os: "Debian" },
    { x: 400, y: 60, label: "VPS-03", os: "CentOS" },
    { x: 60, y: 170, label: "VPS-04", os: "AlmaLinux" },
    { x: 230, y: 170, label: "VPS-05", os: "Rocky" },
    { x: 400, y: 170, label: "VPS-06", os: "Windows" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/40 p-6 sm:p-8 shadow-[var(--shadow-strong)] ring-1 ring-primary/10">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      {/* Top status bar */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          KVM Hypervisor · Isolated · Guaranteed
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono">99.998%</span>
        </div>
      </div>

      <svg
        viewBox="0 0 600 540"
        className="relative z-10 w-full h-auto"
        role="img"
        aria-label="VPS virtualization architecture: hypervisor partitioning isolated virtual servers"
      >
        <defs>
          <linearGradient id="vps-host" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>
          <linearGradient id="vps-hyper" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.15)" />
            <stop offset="50%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent) / 0.4)" />
          </linearGradient>
          <linearGradient id="vps-vm" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--background))" />
          </linearGradient>
          <radialGradient id="vps-coreglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <filter id="vps-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <pattern id="vps-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.05" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Background grid */}
        <rect width="600" height="540" fill="url(#vps-grid)" />

        {/* === VM Layer (Top) === */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <text x="40" y="40" fontSize="10" fill="hsl(var(--muted-foreground))" letterSpacing="3" fontFamily="ui-monospace, monospace">
            ISOLATED VIRTUAL PRIVATE SERVERS
          </text>
        </motion.g>

        {/* VM cards */}
        {vmPositions.map((vm, i) => (
          <motion.g
            key={vm.label}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* VM container */}
            <rect
              x={vm.x}
              y={vm.y}
              width="140"
              height="90"
              rx="10"
              fill="url(#vps-vm)"
              stroke="hsl(var(--border))"
              strokeWidth="1"
            />
            {/* Inner highlight */}
            <rect
              x={vm.x + 1}
              y={vm.y + 1}
              width="138"
              height="2"
              rx="1"
              fill="hsl(var(--primary) / 0.5)"
            />

            {/* Window dots */}
            <circle cx={vm.x + 12} cy={vm.y + 14} r="2.5" fill="hsl(var(--destructive) / 0.5)" />
            <circle cx={vm.x + 22} cy={vm.y + 14} r="2.5" fill="hsl(var(--accent) / 0.6)" />
            <circle cx={vm.x + 32} cy={vm.y + 14} r="2.5" fill="hsl(var(--primary) / 0.6)" />

            {/* Label */}
            <text x={vm.x + 12} y={vm.y + 38} fontSize="11" fontWeight="700" fill="hsl(var(--foreground))" fontFamily="ui-monospace, monospace">
              {vm.label}
            </text>
            <text x={vm.x + 12} y={vm.y + 52} fontSize="9" fill="hsl(var(--muted-foreground))">
              {vm.os}
            </text>

            {/* Mini resource bars */}
            <rect x={vm.x + 12} y={vm.y + 62} width="90" height="3" rx="1.5" fill="hsl(var(--muted))" />
            <rect x={vm.x + 12} y={vm.y + 62} width={30 + (i * 9) % 50} height="3" rx="1.5" fill="hsl(var(--primary))">
              <animate attributeName="width" values={`${20 + i * 5};${60 + i * 4};${20 + i * 5}`} dur={`${4 + i * 0.4}s`} repeatCount="indefinite" />
            </rect>

            <rect x={vm.x + 12} y={vm.y + 70} width="90" height="3" rx="1.5" fill="hsl(var(--muted))" />
            <rect x={vm.x + 12} y={vm.y + 70} width={20 + (i * 7) % 60} height="3" rx="1.5" fill="hsl(var(--accent))">
              <animate attributeName="width" values={`${30 + i * 4};${70 + i * 3};${30 + i * 4}`} dur={`${5 + i * 0.3}s`} repeatCount="indefinite" />
            </rect>

            {/* Activity LED */}
            <circle cx={vm.x + 128} cy={vm.y + 14} r="2.5" fill="hsl(var(--primary))">
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" />
            </circle>

            {/* Connection line to hypervisor */}
            <line
              x1={vm.x + 70}
              y1={vm.y + 90}
              x2={vm.x + 70}
              y2={vm.y === 60 ? 290 : 290}
              stroke="hsl(var(--primary) / 0.18)"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          </motion.g>
        ))}

        {/* === Hypervisor Layer (Middle) === */}
        <motion.g
          initial={{ opacity: 0, scaleX: 0.9 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ transformOrigin: "300px 310px" }}
        >
          {/* Hypervisor band */}
          <rect x="40" y="290" width="520" height="50" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1" />
          <rect x="40" y="290" width="520" height="3" rx="1.5" fill="url(#vps-hyper)" />
          <rect x="40" y="337" width="520" height="3" rx="1.5" fill="url(#vps-hyper)" opacity="0.7" />

          {/* Hypervisor label */}
          <foreignObject x="56" y="302" width="28" height="28">
            <div className="flex h-full w-full items-center justify-center rounded-md bg-primary/10">
              <Layers className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
          </foreignObject>
          <text x="92" y="312" fontSize="12" fontWeight="700" fill="hsl(var(--foreground))" letterSpacing="1">
            HYPERVISOR
          </text>
          <text x="92" y="326" fontSize="9" fill="hsl(var(--muted-foreground))" letterSpacing="1.5">
            KVM · RESOURCE ISOLATION · LIVE MIGRATION
          </text>

          {/* Right side core glow */}
          <circle cx="510" cy="315" r="20" fill="url(#vps-coreglow)" />
          <circle cx="510" cy="315" r="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.2" />
          <circle cx="510" cy="315" r="12" fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.8" strokeDasharray="2 3">
            <animateTransform attributeName="transform" type="rotate" from="0 510 315" to="360 510 315" dur="12s" repeatCount="indefinite" />
          </circle>

          {/* Flowing data dots along the band */}
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} r="2" fill="hsl(var(--primary))">
              <animate attributeName="cx" from="50" to="500" dur={`${4 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
              <animate attributeName="cy" values="291;291" dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${4 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
            </circle>
          ))}
        </motion.g>

        {/* === Physical Host Layer (Bottom) === */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <text x="40" y="375" fontSize="10" fill="hsl(var(--muted-foreground))" letterSpacing="3" fontFamily="ui-monospace, monospace">
            BARE-METAL HOST · ENTERPRISE HARDWARE
          </text>

          {/* Server chassis */}
          <rect x="40" y="390" width="520" height="120" rx="14" fill="url(#vps-host)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <rect x="50" y="400" width="500" height="100" rx="8" fill="hsl(var(--background))" opacity="0.5" stroke="hsl(var(--primary) / 0.18)" strokeWidth="0.8" />

          {/* CPU sockets */}
          {[0, 1].map((i) => (
            <g key={`cpu${i}`}>
              <rect x={70 + i * 90} y={415} width="70" height="70" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.8" />
              <rect x={78 + i * 90} y={423} width="54" height="54" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.6" />
              {/* CPU pins pattern */}
              {[0, 1, 2, 3, 4].map((r) =>
                [0, 1, 2, 3, 4].map((c) => (
                  <circle key={`${r}-${c}`} cx={86 + i * 90 + c * 10} cy={431 + r * 10} r="1" fill="hsl(var(--primary) / 0.5)" />
                ))
              )}
              <text x={105 + i * 90} y={497} fontSize="8" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontFamily="ui-monospace, monospace">
                EPYC
              </text>
            </g>
          ))}

          {/* RAM slots */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={`ram${i}`}>
              <rect x={260 + i * 18} y={415} width="13" height="70" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.6" />
              <rect x={262 + i * 18} y={420} width="9" height="60" rx="1" fill="hsl(var(--primary) / 0.15)" />
              {[0, 1, 2, 3, 4, 5, 6].map((c) => (
                <line key={c} x1={262 + i * 18} y1={425 + c * 8} x2={271 + i * 18} y2={425 + c * 8} stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.4" />
              ))}
            </g>
          ))}
          <text x="315" y="497" fontSize="8" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontFamily="ui-monospace, monospace">
            DDR5 ECC
          </text>

          {/* NVMe drives */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`nvme${i}`}>
              <rect x={385 + i * 38} y={415} width="32" height="70" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.6" />
              <rect x={388 + i * 38} y={420} width="26" height="3" rx="1" fill="hsl(var(--primary))">
                <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
              </rect>
              <rect x={388 + i * 38} y={428} width="26" height="50" rx="1" fill="hsl(var(--muted))" opacity="0.5" />
              <circle cx={401 + i * 38} cy={480} r="1.5" fill="hsl(var(--accent))">
                <animate attributeName="opacity" values="1;0.2;1" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          <text x="448" y="497" fontSize="8" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontFamily="ui-monospace, monospace">
            NVMe Gen4
          </text>
        </motion.g>

        {/* Floor reflection */}
        <ellipse cx="300" cy="525" rx="240" ry="8" fill="hsl(var(--primary))" opacity="0.12" filter="url(#vps-glow)" />
      </svg>

      {/* Bottom feature pills */}
      <div className="relative z-10 mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: Cpu, v: "Dedicated vCPU", l: "AMD EPYC" },
          { icon: HardDrive, v: "NVMe Gen4", l: "Storage" },
          { icon: Network, v: "10 Gbps", l: "Network" },
          { icon: Shield, v: "Full Root", l: "Isolation" },
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

export default PremiumServerDiagram;
