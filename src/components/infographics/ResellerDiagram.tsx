import { motion } from "framer-motion";
import { Users, Briefcase, BarChart3, Tag } from "lucide-react";

/**
 * Premium reseller hosting diagram — central reseller node distributing
 * white-labeled accounts to clients with billing flow.
 */
const ResellerDiagram = () => {
  const clients = [
    { angle: -120 }, { angle: -75 }, { angle: -30 },
    { angle: 30 }, { angle: 75 }, { angle: 120 },
  ];
  const cx = 380;
  const cy = 200;
  const r = 130;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5 text-primary" />
          White-label reseller architecture
        </div>

        <svg viewBox="0 0 760 380" className="w-full h-auto" role="img" aria-label="Reseller hosting topology">
          <defs>
            <radialGradient id="rs-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Orbit */}
          <circle cx={cx} cy={cy} r={r} fill="none"
            stroke="hsl(var(--primary)/0.3)" strokeDasharray="3 6" />
          <circle cx={cx} cy={cy} r={r + 30} fill="none"
            stroke="hsl(var(--accent)/0.2)" strokeDasharray="2 10" />

          {/* Core glow */}
          <circle cx={cx} cy={cy} r="80" fill="url(#rs-core)" />

          {/* Reseller core */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <rect x={cx - 70} y={cy - 32} width="140" height="64" rx="14"
              fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.6)" strokeWidth="1.5" />
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize="9" letterSpacing="2" className="fill-muted-foreground">YOUR BRAND</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontSize="14" fontWeight="700" className="fill-foreground">Reseller Hub</text>
            <text x={cx} y={cy + 24} textAnchor="middle" fontSize="8" className="fill-muted-foreground">WHM · cPanel · DNS</text>
          </motion.g>

          {/* Clients */}
          {clients.map((c, i) => {
            const rad = (c.angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * r;
            const y = cy + Math.sin(rad) * r;
            const path = `M ${cx} ${cy} L ${x} ${y}`;
            return (
              <g key={i}>
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="hsl(var(--primary)/0.2)" strokeWidth="1" />
                <circle r="2.5" fill="hsl(var(--primary))">
                  <animateMotion dur={`${2 + i * 0.2}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>
                <motion.g initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07 }}>
                  <circle cx={x} cy={y} r="22" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.45)" strokeWidth="1.5" />
                  <circle cx={x} cy={y - 4} r="4" fill="hsl(var(--primary))" />
                  <path d={`M ${x - 10} ${y + 8} Q ${x} ${y + 2} ${x + 10} ${y + 8}`}
                    fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
                  <text x={x} y={y + 38} textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">Client {i + 1}</text>
                </motion.g>
              </g>
            );
          })}

          {/* Billing pulse */}
          <g>
            <rect x="40" y="40" width="120" height="50" rx="10"
              fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" strokeWidth="1.2" />
            <text x="100" y="58" textAnchor="middle" fontSize="9" letterSpacing="1.5" className="fill-muted-foreground">AUTO-BILLING</text>
            <text x="100" y="76" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-foreground">WHMCS · INR</text>
            <line x1="160" y1="65" x2={cx - 70} y2={cy - 16}
              stroke="hsl(var(--primary)/0.3)" strokeDasharray="3 4" />
            <circle r="2.5" fill="hsl(var(--accent))">
              <animateMotion dur="3s" repeatCount="indefinite" path={`M 160 65 L ${cx - 70} ${cy - 16}`} />
            </circle>
          </g>

          {/* SLA pulse */}
          <g>
            <rect x="600" y="40" width="120" height="50" rx="10"
              fill="hsl(var(--card))" stroke="hsl(var(--accent)/0.5)" strokeWidth="1.2" />
            <text x="660" y="58" textAnchor="middle" fontSize="9" letterSpacing="1.5" className="fill-muted-foreground">SLA</text>
            <text x="660" y="76" textAnchor="middle" fontSize="11" fontWeight="700" className="fill-foreground">99.99% uptime</text>
          </g>
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Tag, v: "White", l: "Labeled" },
            { icon: Users, v: "Unlimited", l: "Clients" },
            { icon: BarChart3, v: "WHMCS", l: "Billing" },
            { icon: Briefcase, v: "WHM", l: "Control" },
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

export default ResellerDiagram;
