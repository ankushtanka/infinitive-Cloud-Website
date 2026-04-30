import { motion } from "framer-motion";
import { Cpu, Lock, Server, Brain, MessageSquare, ShieldCheck } from "lucide-react";

/**
 * Premium animated AI architecture diagram for the Openclaw page.
 * Shows: User → Encrypted edge → Openclaw UI → LLM runtime on private VPS.
 */
const OpenclawArchitectureDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 right-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Zero-egress architecture · your data never leaves
        </div>

        <svg viewBox="0 0 920 380" className="w-full h-auto" role="img" aria-label="Openclaw private AI architecture">
          <defs>
            <linearGradient id="oc-flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="oc-perimeter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.5)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.3)" />
            </linearGradient>
            <radialGradient id="oc-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Private perimeter box */}
          <motion.rect
            x="280"
            y="40"
            width="600"
            height="300"
            rx="24"
            fill="hsl(var(--muted) / 0.2)"
            stroke="url(#oc-perimeter)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          <text x="300" y="62" className="fill-muted-foreground" fontSize="10" fontWeight="600" letterSpacing="2">
            YOUR PRIVATE VPS
          </text>

          {/* Edges */}
          {[
            "M 110 190 C 200 190, 230 190, 320 190",
            "M 460 190 C 520 190, 540 190, 600 130",
            "M 460 190 C 520 190, 540 190, 600 250",
          ].map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="url(#oc-flow)" strokeWidth="2" strokeLinecap="round" />
              <circle r="3.5" fill="hsl(var(--primary))">
                <animateMotion dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" dur={`${2.6 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* User node */}
          <g>
            <circle cx="80" cy="190" r="44" fill="url(#oc-core)" />
            <rect x="50" y="160" width="60" height="60" rx="14" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />
            <foreignObject x="50" y="160" width="60" height="60">
              <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="text-[9px] font-semibold">You</span>
              </div>
            </foreignObject>
          </g>

          {/* TLS lock badge mid-pipe */}
          <g>
            <circle cx="220" cy="190" r="14" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <foreignObject x="206" y="176" width="28" height="28">
              <div className="flex h-full w-full items-center justify-center">
                <Lock className="h-3.5 w-3.5 text-primary" />
              </div>
            </foreignObject>
          </g>

          {/* Openclaw UI core */}
          <g>
            <circle cx="390" cy="190" r="56" fill="url(#oc-core)" />
            <rect x="346" y="146" width="88" height="88" rx="18" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />
            <foreignObject x="346" y="146" width="88" height="88">
              <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
                <Brain className="h-7 w-7 text-primary" />
                <span className="text-[10px] font-bold text-foreground">Openclaw</span>
                <span className="text-[8px] text-muted-foreground">Web UI</span>
              </div>
            </foreignObject>
          </g>

          {/* LLM runtime + Vector DB */}
          {[
            { x: 660, y: 130, icon: Cpu, label: "LLM", sub: "Llama · Mistral" },
            { x: 660, y: 250, icon: Server, label: "Vectors", sub: "Embeddings" },
          ].map((n, i) => (
            <g key={i}>
              <rect x={n.x - 44} y={n.y - 28} width="88" height="56" rx="14" fill="hsl(var(--card))" stroke="hsl(var(--accent) / 0.4)" strokeWidth="1.5" />
              <foreignObject x={n.x - 44} y={n.y - 28} width="88" height="56">
                <div className="flex h-full w-full items-center gap-2 px-3">
                  <n.icon className="h-5 w-5 text-accent" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-bold text-foreground">{n.label}</span>
                    <span className="text-[8px] text-muted-foreground">{n.sub}</span>
                  </div>
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "0", l: "Data sent out" },
            { v: "TLS 1.3", l: "Encrypted edge" },
            { v: "GPU", l: "Optional accel" },
            { v: "RAG", l: "Vector ready" },
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

export default OpenclawArchitectureDiagram;
