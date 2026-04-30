import { motion } from "framer-motion";
import { Webhook, Database, Mail, Bot, GitBranch, Zap } from "lucide-react";

/**
 * Premium animated workflow diagram for the n8n Hosting page.
 * Pure SVG + framer-motion. Theme-aware via CSS tokens.
 */
const N8nWorkflowDiagram = () => {
  const nodes = [
    { id: "trigger", label: "Webhook", sub: "Trigger", icon: Webhook, x: 80, y: 180 },
    { id: "logic", label: "Branch", sub: "Conditional", icon: GitBranch, x: 320, y: 80 },
    { id: "ai", label: "AI Agent", sub: "OpenAI · Claude", icon: Bot, x: 320, y: 280 },
    { id: "db", label: "Database", sub: "Postgres", icon: Database, x: 580, y: 180 },
    { id: "out", label: "Notify", sub: "Email · Slack", icon: Mail, x: 820, y: 180 },
  ];

  const edges = [
    { from: "trigger", to: "logic" },
    { from: "trigger", to: "ai" },
    { from: "logic", to: "db" },
    { from: "ai", to: "db" },
    { from: "db", to: "out" },
  ];

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Live workflow · executing now
        </div>

        <svg
          viewBox="0 0 920 380"
          className="w-full h-auto"
          role="img"
          aria-label="n8n workflow architecture diagram"
        >
          <defs>
            <linearGradient id="n8n-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="n8n-node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <filter id="n8n-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Grid */}
          <g opacity="0.08" stroke="hsl(var(--foreground))" strokeWidth="0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 92} y1="0" x2={i * 92} y2="380" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 76} x2="920" y2={i * 76} />
            ))}
          </g>

          {/* Edges with flowing data */}
          {edges.map((e, i) => {
            const a = getNode(e.from);
            const b = getNode(e.to);
            const midX = (a.x + b.x) / 2;
            const path = `M ${a.x + 36} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x - 36} ${b.y}`;
            return (
              <g key={i}>
                <path d={path} fill="none" stroke="url(#n8n-edge)" strokeWidth="2" strokeLinecap="round" />
                <circle r="3.5" fill="hsl(var(--primary))">
                  <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={path} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n, i) => (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="48" fill="url(#n8n-node-glow)" filter="url(#n8n-soft)" />
              <motion.g
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <rect
                  x={n.x - 36}
                  y={n.y - 28}
                  width="72"
                  height="56"
                  rx="14"
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--primary) / 0.4)"
                  strokeWidth="1.5"
                />
                <foreignObject x={n.x - 36} y={n.y - 28} width="72" height="56">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-foreground">
                    <n.icon className="h-5 w-5 text-primary" strokeWidth={2} />
                    <span className="text-[9px] font-semibold leading-none">{n.label}</span>
                  </div>
                </foreignObject>
                <text
                  x={n.x}
                  y={n.y + 50}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  fontSize="10"
                  fontWeight="500"
                >
                  {n.sub}
                </text>
              </motion.g>
            </g>
          ))}
        </svg>

        {/* Stat strip */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "400+", l: "Integrations" },
            { v: "<50ms", l: "Node latency" },
            { v: "24/7", l: "Always-on" },
            { v: "100%", l: "Self-hosted" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-background/40 px-4 py-3 backdrop-blur">
              <div className="text-xl font-bold text-foreground">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default N8nWorkflowDiagram;
