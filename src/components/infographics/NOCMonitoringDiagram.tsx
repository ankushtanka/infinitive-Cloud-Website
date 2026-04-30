import { motion } from "framer-motion";
import { Activity, Cpu, Shield, Zap } from "lucide-react";

/**
 * Minimal, premium NOC monitoring infographic.
 * Single focal server with breathing pulse, clean vitals graph,
 * subtle threat shield, and refined typographic hierarchy.
 */
const NOCMonitoringDiagram = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-[var(--shadow-strong)]">
      {/* Single ambient glow, very soft */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
            <span className="h-px w-6 bg-primary/40" />
            NOC · Live
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Healthy
          </div>
        </div>

        <svg viewBox="0 0 800 400" className="w-full h-auto" role="img" aria-label="Server management NOC console">
          <defs>
            <linearGradient id="nm-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nm-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="nm-orb" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Hairline frame */}
          <rect x="40" y="40" width="720" height="320" rx="20"
            fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

          {/* === LEFT: TYPOGRAPHIC METRIC === */}
          <g>
            <text x="80" y="100" fontSize="9" letterSpacing="4" className="fill-muted-foreground" fontWeight="600">
              UPTIME
            </text>
            <text x="80" y="148" fontSize="48" fontWeight="200" letterSpacing="-1" className="fill-foreground">
              99.99
              <tspan fontSize="20" className="fill-muted-foreground">%</tspan>
            </text>
            <line x1="80" y1="170" x2="120" y2="170" stroke="hsl(var(--primary))" strokeWidth="1" />

            {/* Vitals label */}
            <text x="80" y="210" fontSize="9" letterSpacing="4" className="fill-muted-foreground" fontWeight="600">
              VITALS
            </text>

            {/* Minimal sparkline */}
            <g>
              {/* baseline */}
              <line x1="80" y1="290" x2="340" y2="290" stroke="hsl(var(--border))" strokeWidth="0.8" />

              {/* fill area */}
              <path d="M 80 280 L 110 270 L 140 274 L 170 258 L 200 264 L 230 248 L 260 254 L 290 240 L 320 246 L 340 238 L 340 290 L 80 290 Z"
                fill="url(#nm-fill)">
                <animate attributeName="d"
                  values="
                    M 80 280 L 110 270 L 140 274 L 170 258 L 200 264 L 230 248 L 260 254 L 290 240 L 320 246 L 340 238 L 340 290 L 80 290 Z;
                    M 80 274 L 110 264 L 140 252 L 170 268 L 200 244 L 230 256 L 260 242 L 290 252 L 320 238 L 340 246 L 340 290 L 80 290 Z;
                    M 80 280 L 110 270 L 140 274 L 170 258 L 200 264 L 230 248 L 260 254 L 290 240 L 320 246 L 340 238 L 340 290 L 80 290 Z"
                  dur="8s" repeatCount="indefinite" />
              </path>

              {/* line */}
              <path d="M 80 280 L 110 270 L 140 274 L 170 258 L 200 264 L 230 248 L 260 254 L 290 240 L 320 246 L 340 238"
                fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <animate attributeName="d"
                  values="
                    M 80 280 L 110 270 L 140 274 L 170 258 L 200 264 L 230 248 L 260 254 L 290 240 L 320 246 L 340 238;
                    M 80 274 L 110 264 L 140 252 L 170 268 L 200 244 L 230 256 L 260 242 L 290 252 L 320 238 L 340 246;
                    M 80 280 L 110 270 L 140 274 L 170 258 L 200 264 L 230 248 L 260 254 L 290 240 L 320 246 L 340 238"
                  dur="8s" repeatCount="indefinite" />
              </path>

              {/* trailing dot */}
              <circle cx="340" cy="238" r="3" fill="hsl(var(--primary))">
                <animate attributeName="cy" values="238;246;238" dur="8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Tiny stats row */}
            <g transform="translate(80 318)" fontSize="9" letterSpacing="2" fontWeight="500">
              <text className="fill-muted-foreground">CPU</text>
              <text x="0" y="14" fontSize="13" fontWeight="600" className="fill-foreground">42%</text>

              <text x="90" className="fill-muted-foreground">MEM</text>
              <text x="90" y="14" fontSize="13" fontWeight="600" className="fill-foreground">61%</text>

              <text x="180" className="fill-muted-foreground">NET</text>
              <text x="180" y="14" fontSize="13" fontWeight="600" className="fill-foreground">1.2G</text>
            </g>
          </g>

          {/* === RIGHT: FOCAL SHIELD ORB === */}
          <g transform="translate(580 200)">
            {/* Soft outer halo */}
            <circle r="120" fill="url(#nm-orb)">
              <animate attributeName="r" values="110;125;110" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="6s" repeatCount="indefinite" />
            </circle>

            {/* Concentric breathing rings */}
            <circle r="92" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.15" strokeWidth="1">
              <animate attributeName="r" values="86;96;86" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle r="74" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.25" strokeWidth="1">
              <animate attributeName="r" values="70;78;70" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Slowly rotating dashed ring */}
            <g>
              <animateTransform attributeName="transform" type="rotate"
                from="0" to="360" dur="40s" repeatCount="indefinite" />
              <circle r="58" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.4"
                strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
            </g>

            {/* Core disc */}
            <circle r="44" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeOpacity="0.5" strokeWidth="1" />

            {/* Minimal shield mark */}
            <motion.g
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <path d="M 0 -22 L 18 -14 L 18 6 Q 18 22 0 28 Q -18 22 -18 6 L -18 -14 Z"
                fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M -8 2 L -2 8 L 10 -6"
                fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>

            {/* Single elegant orbiting dot */}
            <g>
              <animateTransform attributeName="transform" type="rotate"
                from="0" to="360" dur="12s" repeatCount="indefinite" />
              <circle cx="58" cy="0" r="2.5" fill="hsl(var(--primary))" />
            </g>
            <g>
              <animateTransform attributeName="transform" type="rotate"
                from="180" to="540" dur="18s" repeatCount="indefinite" />
              <circle cx="74" cy="0" r="1.5" fill="hsl(var(--accent))" opacity="0.8" />
            </g>
          </g>

          {/* Subtle connector between metric and shield */}
          <line x1="350" y1="200" x2="500" y2="200" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 6" />
          <circle r="2" fill="hsl(var(--primary))">
            <animateMotion dur="4s" repeatCount="indefinite" path="M 350 200 L 500 200" />
            <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Stat strip — refined */}
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {[
            { icon: Activity, v: "< 60s", l: "Alert response" },
            { icon: Shield, v: "CIS L2", l: "Hardening" },
            { icon: Cpu, v: "1-min", l: "Telemetry" },
            { icon: Zap, v: "4 min", l: "MTTR" },
          ].map((s) => (
            <div key={s.l} className="flex items-start gap-3">
              <div className="mt-1 h-px w-5 bg-primary/50 shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <s.icon className="h-3.5 w-3.5 text-primary" />
                  <div className="text-base font-semibold text-foreground tracking-tight">{s.v}</div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NOCMonitoringDiagram;
