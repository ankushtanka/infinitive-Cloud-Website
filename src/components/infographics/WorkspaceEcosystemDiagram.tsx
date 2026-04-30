import { motion } from "framer-motion";
import { Mail, Calendar, FileText, Video, HardDrive, Users, Shield } from "lucide-react";

/**
 * Premium animated ecosystem diagram for the Google Workspace page.
 * Shows the apps orbiting a secure custom-domain core.
 */
const WorkspaceEcosystemDiagram = () => {
  const apps = [
    { icon: Mail, label: "Gmail", angle: -90 },
    { icon: Calendar, label: "Calendar", angle: -30 },
    { icon: Video, label: "Meet", angle: 30 },
    { icon: FileText, label: "Docs", angle: 90 },
    { icon: HardDrive, label: "Drive", angle: 150 },
    { icon: Users, label: "Chat", angle: 210 },
  ];

  const cx = 460;
  const cy = 190;
  const r = 130;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10 shadow-[var(--shadow-medium)]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Shield className="h-3.5 w-3.5 text-primary" />
          Unified workspace · your domain at the core
        </div>

        <svg viewBox="0 0 920 380" className="w-full h-auto" role="img" aria-label="Google Workspace ecosystem">
          <defs>
            <radialGradient id="ws-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ws-orbit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.5)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.3)" />
            </linearGradient>
          </defs>

          {/* Orbit rings */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#ws-orbit)" strokeWidth="1" strokeDasharray="3 5" />
          <circle cx={cx} cy={cy} r={r + 40} fill="none" stroke="url(#ws-orbit)" strokeWidth="1" strokeDasharray="2 8" opacity="0.5" />

          {/* Core glow */}
          <circle cx={cx} cy={cy} r="80" fill="url(#ws-core)" />

          {/* Center: domain */}
          <g>
            <rect x={cx - 78} y={cy - 30} width="156" height="60" rx="14" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" />
            <foreignObject x={cx - 78} y={cy - 30} width="156" height="60">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Custom domain</div>
                <div className="text-base font-bold text-foreground">@yourbrand.com</div>
              </div>
            </foreignObject>
          </g>

          {/* App nodes */}
          {apps.map((app, i) => {
            const rad = (app.angle * Math.PI) / 180;
            const x = cx + Math.cos(rad) * r;
            const y = cy + Math.sin(rad) * r;
            return (
              <g key={app.label}>
                {/* Connecting line with flow */}
                <line x1={cx} y1={cy} x2={x} y2={y} stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />
                <circle r="3" fill="hsl(var(--primary))">
                  <animate
                    attributeName="cx"
                    values={`${cx};${x}`}
                    dur={`${2 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${cy};${y}`}
                    dur={`${2 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2 + i * 0.2}s`} repeatCount="indefinite" />
                </circle>

                <motion.g
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <circle cx={x} cy={y} r="30" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.45)" strokeWidth="1.5" />
                  <foreignObject x={x - 30} y={y - 30} width="60" height="60">
                    <div className="flex h-full w-full items-center justify-center">
                      <app.icon className="h-6 w-6 text-primary" />
                    </div>
                  </foreignObject>
                  <text x={x} y={y + 50} textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
                    {app.label}
                  </text>
                </motion.g>
              </g>
            );
          })}
        </svg>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: "30+", l: "Apps included" },
            { v: "99.9%", l: "Uptime SLA" },
            { v: "2-step", l: "Verification" },
            { v: "24/7", l: "Admin support" },
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

export default WorkspaceEcosystemDiagram;
