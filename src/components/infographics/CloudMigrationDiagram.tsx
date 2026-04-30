import { motion } from "framer-motion";
import { Server, Cloud, ShieldCheck, Clock } from "lucide-react";

/**
 * Premium animated migration flow: legacy → encrypted pipeline → Infinitive Cloud.
 */
const CloudMigrationDiagram = () => {
  const stages = [
    { x: 240, label: "Audit", sub: "Inventory" },
    { x: 360, label: "Sync", sub: "Encrypted rsync" },
    { x: 480, label: "Verify", sub: "Checksums" },
    { x: 600, label: "Cutover", sub: "Zero downtime" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Cloud className="h-3.5 w-3.5 text-primary" />
          Zero-downtime migration pipeline
        </div>

        <svg viewBox="0 0 760 320" className="w-full h-auto" role="img" aria-label="Cloud migration flow">
          <defs>
            <linearGradient id="mg-pipe" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0.05)" />
              <stop offset="50%" stopColor="hsl(var(--primary)/0.85)" />
              <stop offset="100%" stopColor="hsl(var(--accent)/0.85)" />
            </linearGradient>
          </defs>

          {/* Legacy server */}
          <motion.g initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <rect x="60" y="120" width="120" height="100" rx="10"
              fill="hsl(var(--card))" stroke="hsl(var(--muted-foreground)/0.4)" strokeWidth="1.5" />
            {[0, 1, 2].map((i) => (
              <line key={i} x1="76" y1={140 + i * 18} x2="164" y2={140 + i * 18}
                stroke="hsl(var(--muted-foreground)/0.3)" strokeWidth="3" strokeLinecap="round" />
            ))}
            <text x="120" y="210" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-muted-foreground" letterSpacing="1">LEGACY</text>
          </motion.g>

          {/* Pipe */}
          <rect x="180" y="158" width="440" height="24" rx="12"
            fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
          <rect x="180" y="158" width="440" height="24" rx="12" fill="url(#mg-pipe)" opacity="0.15" />

          {/* Animated packets */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} r="3" fill="hsl(var(--primary))">
              <animate attributeName="cx" values="180;620" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
              <animate attributeName="cy" values="170;170" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
            </circle>
          ))}

          {/* Stage markers */}
          {stages.map((s, i) => (
            <motion.g key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}>
              <circle cx={s.x} cy="170" r="12" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.6)" strokeWidth="1.5" />
              <circle cx={s.x} cy="170" r="4" fill="hsl(var(--primary))">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <text x={s.x} y="200" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">{s.label}</text>
              <text x={s.x} y="214" textAnchor="middle" fontSize="8" className="fill-muted-foreground">{s.sub}</text>
            </motion.g>
          ))}

          {/* Lock badge over pipe */}
          <g transform="translate(380, 130)">
            <rect x="-32" y="-14" width="64" height="22" rx="11" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" />
            <text x="0" y="1" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground" letterSpacing="1.5">AES-256</text>
          </g>

          {/* Infinitive Cloud target */}
          <motion.g initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <rect x="630" y="100" width="100" height="140" rx="14"
              fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.6)" strokeWidth="1.5" />
            <circle cx="680" cy="150" r="22" fill="none" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5">
              <animate attributeName="r" values="18;28;18" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="680" cy="150" r="10" fill="hsl(var(--primary))" />
            <text x="680" y="195" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground" letterSpacing="1">INFINITIVE</text>
            <text x="680" y="208" textAnchor="middle" fontSize="8" className="fill-muted-foreground" letterSpacing="1">CLOUD</text>
          </motion.g>
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Clock, v: "0 min", l: "Downtime" },
            { icon: ShieldCheck, v: "AES-256", l: "Encrypted" },
            { icon: Server, v: "Any", l: "Source platform" },
            { icon: Cloud, v: "Free", l: "Migration" },
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

export default CloudMigrationDiagram;
