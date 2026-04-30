import { motion } from "framer-motion";
import { Cloud, Server, Database, Shield, Zap, Globe } from "lucide-react";

/**
 * Premium animated cloud hosting topology — auto-scaling tiers
 * with load balancer, app nodes, and replicated DB. Hairlines + soft glows.
 */
const CloudHostingDiagram = () => {
  const nodes = [
    { x: 230, y: 200 }, { x: 320, y: 200 }, { x: 410, y: 200 }, { x: 500, y: 200 },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Cloud className="h-3.5 w-3.5 text-primary" />
          Auto-scaling cloud topology
        </div>

        <svg viewBox="0 0 760 380" className="w-full h-auto" role="img" aria-label="Cloud hosting architecture">
          <defs>
            <linearGradient id="ch-flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.05)" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.85)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.05)" />
            </linearGradient>
            <radialGradient id="ch-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Edge / users */}
          <g>
            <circle cx="80" cy="100" r="6" fill="hsl(var(--primary))" />
            <circle cx="80" cy="100" r="14" fill="none" stroke="hsl(var(--primary)/0.4)" />
            <text x="80" y="80" textAnchor="middle" fontSize="10" fontWeight="600" className="fill-foreground">Users</text>
            <circle cx="80" cy="200" r="6" fill="hsl(var(--primary))" />
            <circle cx="80" cy="200" r="14" fill="none" stroke="hsl(var(--primary)/0.4)" />
            <circle cx="80" cy="300" r="6" fill="hsl(var(--primary))" />
            <circle cx="80" cy="300" r="14" fill="none" stroke="hsl(var(--primary)/0.4)" />
          </g>

          {/* Lines to LB */}
          {[100, 200, 300].map((y, i) => {
            const path = `M 90 ${y} Q 140 ${y} 180 200`;
            return (
              <g key={i}>
                <path d={path} fill="none" stroke="url(#ch-flow)" strokeWidth="1.2" />
                <circle r="2.5" fill="hsl(var(--primary))">
                  <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* Load balancer */}
          <circle cx="180" cy="200" r="48" fill="url(#ch-glow)" />
          <rect x="148" y="178" width="64" height="44" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.6)" strokeWidth="1.5" />
          <text x="180" y="195" textAnchor="middle" fontSize="9" className="fill-muted-foreground" letterSpacing="1">LOAD</text>
          <text x="180" y="208" textAnchor="middle" fontSize="10" fontWeight="700" className="fill-foreground">BALANCER</text>
          <text x="180" y="218" textAnchor="middle" fontSize="8" className="fill-muted-foreground">Anycast</text>

          {/* App tier nodes */}
          {nodes.map((n, i) => (
            <g key={i}>
              <line x1="212" y1="200" x2={n.x - 22} y2={n.y} stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
              <circle r="2.3" fill="hsl(var(--accent))">
                <animateMotion dur={`${1.8 + i * 0.25}s`} repeatCount="indefinite"
                  path={`M 212 200 L ${n.x - 22} ${n.y}`} />
              </circle>
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <rect x={n.x - 22} y={n.y - 22} width="44" height="44" rx="8"
                  fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" strokeWidth="1.5" />
                <circle cx={n.x} cy={n.y} r="3" fill="hsl(var(--primary))">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                </circle>
                <text x={n.x} y={n.y + 38} textAnchor="middle" fontSize="9" fontWeight="600" className="fill-foreground">node-0{i + 1}</text>
              </motion.g>
            </g>
          ))}

          {/* Auto-scale indicator (extra ghost node) */}
          <motion.g
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <rect x="568" y="178" width="44" height="44" rx="8"
              fill="none" stroke="hsl(var(--primary)/0.5)" strokeDasharray="3 3" strokeWidth="1.2" />
            <text x="590" y="170" textAnchor="middle" fontSize="8" className="fill-primary" letterSpacing="1">+ AUTO</text>
          </motion.g>

          {/* Lines to DB */}
          {nodes.map((n, i) => {
            const path = `M ${n.x} ${n.y + 22} Q ${n.x} 290 380 320`;
            return (
              <g key={`db-${i}`}>
                <path d={path} fill="none" stroke="hsl(var(--primary)/0.18)" strokeWidth="1" />
                <circle r="2" fill="hsl(var(--primary))">
                  <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* DB cluster */}
          <g>
            <ellipse cx="380" cy="320" rx="80" ry="14" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.5)" strokeWidth="1.5" />
            <ellipse cx="380" cy="335" rx="80" ry="14" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.2" />
            <ellipse cx="380" cy="350" rx="80" ry="14" fill="hsl(var(--card))" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
            <text x="380" y="324" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground" letterSpacing="1">REPLICATED DB</text>
          </g>

          {/* Hairline grid backdrop */}
          <g stroke="hsl(var(--foreground)/0.04)" strokeWidth="0.5">
            <line x1="0" y1="100" x2="760" y2="100" />
            <line x1="0" y1="200" x2="760" y2="200" />
            <line x1="0" y1="300" x2="760" y2="300" />
          </g>
        </svg>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Zap, v: "10ms", l: "Avg. RTT" },
            { icon: Server, v: "Auto", l: "Horizontal scale" },
            { icon: Database, v: "3×", l: "DB replicas" },
            { icon: Shield, v: "DDoS", l: "Mitigated" },
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

export default CloudHostingDiagram;
