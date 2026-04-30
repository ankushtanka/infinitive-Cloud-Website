import { motion } from "framer-motion";
import { Zap, Shield, RefreshCw, HardDrive } from "lucide-react";

/**
 * Premium WordPress hosting stack — animated request flow through
 * CDN → cache → PHP-FPM → MySQL with auto-update + backup ribbons.
 */
const WordPressStackDiagram = () => {
  const layers = [
    { y: 70, label: "CDN · Edge cache", sub: "Global · 300+ POPs", color: "hsl(var(--primary))" },
    { y: 140, label: "Object & page cache", sub: "Redis · LiteSpeed", color: "hsl(var(--primary))" },
    { y: 210, label: "PHP 8 · OPcache", sub: "FPM · NVMe-backed", color: "hsl(var(--accent))" },
    { y: 280, label: "MySQL 8 · Replicated", sub: "Daily snapshots", color: "hsl(var(--primary))" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Optimised WordPress stack
        </div>

        <svg viewBox="0 0 760 360" className="w-full h-auto" role="img" aria-label="WordPress stack">
          <defs>
            <linearGradient id="wp-flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0.05)" />
              <stop offset="50%" stopColor="hsl(var(--primary)/0.85)" />
              <stop offset="100%" stopColor="hsl(var(--accent)/0.05)" />
            </linearGradient>
          </defs>

          {/* Browser */}
          <g>
            <rect x="40" y="160" width="100" height="60" rx="8"
              fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />
            <circle cx="55" cy="173" r="2.5" fill="hsl(var(--primary)/0.6)" />
            <circle cx="63" cy="173" r="2.5" fill="hsl(var(--primary)/0.4)" />
            <circle cx="71" cy="173" r="2.5" fill="hsl(var(--primary)/0.3)" />
            <line x1="48" y1="183" x2="132" y2="183" stroke="hsl(var(--primary)/0.2)" />
            <text x="90" y="205" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">VISITOR</text>
          </g>

          {/* Stack layers */}
          {layers.map((l, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <rect x="220" y={l.y - 22} width="380" height="44" rx="10"
                fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.35)" strokeWidth="1.2" />
              <rect x="220" y={l.y - 22} width="6" height="44" rx="3" fill={l.color} />
              <text x="240" y={l.y - 4} fontSize="11" fontWeight="700" className="fill-foreground">{l.label}</text>
              <text x="240" y={l.y + 12} fontSize="9" className="fill-muted-foreground">{l.sub}</text>
              {/* Layer indicator dot */}
              <circle cx="585" cy={l.y} r="4" fill={l.color}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              </circle>
            </motion.g>
          ))}

          {/* Animated request flow */}
          {layers.map((l, i) => {
            const path = `M 140 190 Q 180 ${l.y} 220 ${l.y}`;
            return (
              <g key={`p-${i}`}>
                <path d={path} fill="none" stroke="url(#wp-flow)" strokeWidth="1" />
                <circle r="2.5" fill="hsl(var(--primary))">
                  <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={path} begin={`${i * 0.2}s`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.2}s`} />
                </circle>
              </g>
            );
          })}

          {/* Auto-update ribbon */}
          <g>
            <rect x="640" y="130" width="100" height="48" rx="8"
              fill="hsl(var(--background))" stroke="hsl(var(--primary)/0.5)" strokeDasharray="3 3" />
            <text x="690" y="148" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">AUTO</text>
            <text x="690" y="162" textAnchor="middle" fontSize="8" className="fill-muted-foreground">Updates · SSL</text>
            <circle cx="690" cy="172" r="2" fill="hsl(var(--primary))">
              <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Backup ribbon */}
          <g>
            <rect x="640" y="200" width="100" height="48" rx="8"
              fill="hsl(var(--background))" stroke="hsl(var(--accent)/0.5)" strokeDasharray="3 3" />
            <text x="690" y="218" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">DAILY</text>
            <text x="690" y="232" textAnchor="middle" fontSize="8" className="fill-muted-foreground">Snapshots</text>
            <circle cx="690" cy="242" r="2" fill="hsl(var(--accent))">
              <animate attributeName="r" values="2;5;2" dur="2.4s" repeatCount="indefinite" begin="0.6s" />
              <animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite" begin="0.6s" />
            </circle>
          </g>
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Zap, v: "<200ms", l: "TTFB" },
            { icon: HardDrive, v: "NVMe", l: "Storage" },
            { icon: RefreshCw, v: "Auto", l: "Core updates" },
            { icon: Shield, v: "Free", l: "SSL · WAF" },
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

export default WordPressStackDiagram;
