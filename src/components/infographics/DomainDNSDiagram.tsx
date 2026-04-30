import { motion } from "framer-motion";
import { Globe, Lock, Search, Zap } from "lucide-react";

/**
 * Premium DNS resolution flow — root → TLD → authoritative → site,
 * with animated query packets and DNSSEC seal.
 */
const DomainDNSDiagram = () => {
  const hops = [
    { x: 200, y: 180, label: "ROOT", sub: "." },
    { x: 340, y: 100, label: "TLD", sub: ".com / .in" },
    { x: 480, y: 180, label: "AUTH NS", sub: "Infinitive" },
    { x: 620, y: 100, label: "SITE", sub: "yourbrand" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Globe className="h-3.5 w-3.5 text-primary" />
          Anycast DNS resolution
        </div>

        <svg viewBox="0 0 760 320" className="w-full h-auto" role="img" aria-label="DNS resolution flow">
          <defs>
            <linearGradient id="dn-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary)/0.05)" />
              <stop offset="50%" stopColor="hsl(var(--primary)/0.85)" />
              <stop offset="100%" stopColor="hsl(var(--accent)/0.05)" />
            </linearGradient>
          </defs>

          {/* User */}
          <g>
            <circle cx="80" cy="180" r="22" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" strokeWidth="1.5" />
            <circle cx="80" cy="174" r="6" fill="hsl(var(--primary))" />
            <path d="M 64 196 Q 80 184 96 196" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x="80" y="222" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">USER</text>
          </g>

          {/* Hops */}
          {hops.map((h, i) => {
            const prev = i === 0 ? { x: 80, y: 180 } : hops[i - 1];
            const path = `M ${prev.x} ${prev.y} Q ${(prev.x + h.x) / 2} ${(prev.y + h.y) / 2 - 30} ${h.x} ${h.y}`;
            return (
              <g key={i}>
                <path d={path} fill="none" stroke="url(#dn-edge)" strokeWidth="1.2" />
                <circle r="3" fill="hsl(var(--primary))">
                  <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <motion.g initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}>
                  <circle cx={h.x} cy={h.y} r="26" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" strokeWidth="1.5" />
                  <circle cx={h.x} cy={h.y} r="14" fill="none" stroke="hsl(var(--primary)/0.3)" />
                  <text x={h.x} y={h.y + 3} textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground" letterSpacing="1">{h.label}</text>
                  <text x={h.x} y={h.y + 44} textAnchor="middle" fontSize="9" className="fill-muted-foreground">{h.sub}</text>
                </motion.g>
              </g>
            );
          })}

          {/* DNSSEC seal */}
          <g transform="translate(380, 250)">
            <rect x="-58" y="-14" width="116" height="28" rx="14"
              fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" />
            <circle cx="-40" cy="0" r="5" fill="hsl(var(--primary))" />
            <text x="-28" y="4" fontSize="10" fontWeight="700" className="fill-foreground" letterSpacing="1">DNSSEC SIGNED</text>
          </g>

          {/* Hairlines */}
          <g stroke="hsl(var(--foreground)/0.04)" strokeWidth="0.5">
            <line x1="0" y1="100" x2="760" y2="100" />
            <line x1="0" y1="180" x2="760" y2="180" />
          </g>
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Search, v: "<20ms", l: "Lookup" },
            { icon: Globe, v: "Anycast", l: "Global" },
            { icon: Lock, v: "DNSSEC", l: "Signed" },
            { icon: Zap, v: "Free", l: "WHOIS privacy" },
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

export default DomainDNSDiagram;
