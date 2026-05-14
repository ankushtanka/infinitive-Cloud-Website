import { motion } from "framer-motion";
import { Server, Fan, Activity, HardDrive, Cpu, Wifi } from "lucide-react";

/**
 * Premium animated server rack visualization.
 * Shows 4 server units with blinking LEDs, spinning fan indicators,
 * network activity bars, and thermal visualization.
 * Pure SVG + framer-motion for crisp rendering at any scale.
 */
const ServerRackAnimation = () => {
  const rackUnits = [
    { label: "WEB-01", status: "online", load: 72, temp: 42, icon: Server },
    { label: "DB-01", status: "online", load: 88, temp: 51, icon: HardDrive },
    { label: "CACHE-01", status: "online", load: 45, temp: 38, icon: Cpu },
    { label: "APP-01", status: "online", load: 91, temp: 55, icon: Server },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-28">
      {/* Ambient backdrop glows */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold tracking-[0.18em] uppercase">
            <Activity className="h-3.5 w-3.5" />
            Infrastructure
          </span>
          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight">
            Enterprise-grade <span className="gradient-text">hardware.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Bare-metal servers humming in Tier-IV facilities. Every second monitored,
            every watt optimized, every packet routed with precision.
          </p>
        </motion.div>

        {/* Server rack SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl"
        >
          <div
            className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 p-6 sm:p-10"
            style={{ boxShadow: "var(--shadow-strong)" }}
          >
            {/* Meta header */}
            <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                All systems operational
              </div>
              <div className="hidden sm:flex items-center gap-4 font-mono">
                <span className="text-primary">4 nodes</span>
                <span>NVMe RAID</span>
                <span>10Gbps uplink</span>
              </div>
            </div>

            <svg viewBox="0 0 720 520" className="w-full h-auto" role="img" aria-label="Server rack with live status indicators">
              <defs>
                <linearGradient id="rack-frame" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--muted))" />
                  <stop offset="50%" stopColor="hsl(var(--card))" />
                  <stop offset="100%" stopColor="hsl(var(--muted))" />
                </linearGradient>
                <linearGradient id="server-face" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--card))" />
                  <stop offset="100%" stopColor="hsl(var(--muted) / 0.6)" />
                </linearGradient>
                <filter id="led-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>
                <pattern id="rack-vent" width="6" height="4" patternUnits="userSpaceOnUse">
                  <rect width="4" height="2" rx="1" fill="hsl(var(--foreground) / 0.08)" />
                </pattern>
              </defs>

              {/* Rack frame */}
              <rect x="40" y="20" width="640" height="480" rx="12" fill="url(#rack-frame)" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <rect x="50" y="30" width="620" height="460" rx="8" fill="none" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="1" />

              {/* Rack ears / rails */}
              <rect x="55" y="40" width="4" height="440" rx="2" fill="hsl(var(--foreground) / 0.1)" />
              <rect x="661" y="40" width="4" height="440" rx="2" fill="hsl(var(--foreground) / 0.1)" />

              {/* Server units */}
              {rackUnits.map((unit, i) => {
                const y = 50 + i * 110;
                const ledStates = [
                  i % 3 === 0,
                  true,
                  i % 2 === 0,
                  true,
                  (i + 1) % 3 === 0,
                ];

                return (
                  <g key={unit.label}>
                    {/* Server chassis */}
                    <rect x="70" y={y} width="580" height="90" rx="6" fill="url(#server-face)" stroke="hsl(var(--border))" strokeWidth="1" />

                    {/* Vent pattern */}
                    <rect x="80" y={y + 12} width="120" height="66" rx="3" fill="url(#rack-vent)" />

                    {/* Fan spinners */}
                    {[0, 1].map((fi) => {
                      const fx = 110 + fi * 44;
                      const fy = y + 45;
                      return (
                        <g key={fi}>
                          <circle cx={fx} cy={fy} r="14" fill="none" stroke="hsl(var(--foreground) / 0.1)" strokeWidth="1.5" />
                          <g>
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from={`0 ${fx} ${fy}`}
                              to={`360 ${fx} ${fy}`}
                              dur={`${1.2 + i * 0.15 + fi * 0.05}s`}
                              repeatCount="indefinite"
                            />
                            <line x1={fx} y1={fy - 10} x2={fx} y2={fy + 10} stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" strokeLinecap="round" />
                            <line x1={fx - 10} y1={fy} x2={fx + 10} y2={fy} stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" strokeLinecap="round" />
                          </g>
                        </g>
                      );
                    })}

                    {/* Server label */}
                    <text x="240" y={y + 30} className="fill-foreground" fontSize="12" fontWeight="700" fontFamily="monospace" letterSpacing="1">
                      {unit.label}
                    </text>
                    <text x="240" y={y + 48} className="fill-muted-foreground" fontSize="9" fontFamily="monospace" letterSpacing="0.5">
                      {unit.status.toUpperCase()} · {unit.load}% LOAD
                    </text>

                    {/* Activity LEDs */}
                    {ledStates.map((on, li) => (
                      <g key={li}>
                        <circle
                          cx={240 + li * 14}
                          cy={y + 68}
                          r="3.5"
                          fill={on ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.08)"}
                          opacity={on ? 1 : 0.3}
                        >
                          {on && (
                            <animate
                              attributeName="opacity"
                              values="0.4;1;0.4"
                              dur={`${0.6 + (li * 0.15) + (i * 0.1)}s`}
                              repeatCount="indefinite"
                            />
                          )}
                        </circle>
                        {/* Glow for active LEDs */}
                        {on && (
                          <circle
                            cx={240 + li * 14}
                            cy={y + 68}
                            r="6"
                            fill="hsl(var(--primary))"
                            filter="url(#led-glow)"
                            opacity="0.3"
                          >
                            <animate
                              attributeName="opacity"
                              values="0.1;0.35;0.1"
                              dur={`${0.6 + (li * 0.15) + (i * 0.1)}s`}
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    ))}

                    {/* Load bar */}
                    <rect x="340" y={y + 60} width="160" height="8" rx="4" fill="hsl(var(--foreground) / 0.08)" />
                    <rect x="340" y={y + 60} width={160 * (unit.load / 100)} height="8" rx="4" fill="hsl(var(--primary) / 0.7)">
                      <animate
                        attributeName="width"
                        values={`${160 * (unit.load / 100)};${160 * ((unit.load + 8) / 100)};${160 * ((unit.load - 5) / 100)};${160 * (unit.load / 100)}`}
                        dur={`${3 + i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </rect>
                    <text x="510" y={y + 66} className="fill-muted-foreground" fontSize="9" fontFamily="monospace">
                      {unit.load}%
                    </text>

                    {/* Thermal indicator */}
                    <text x="560" y={y + 30} className="fill-muted-foreground" fontSize="9" fontFamily="monospace">
                      TEMP
                    </text>
                    <text x="560" y={y + 48} fill={unit.temp > 50 ? "hsl(var(--destructive))" : "hsl(var(--primary))"} fontSize="12" fontWeight="700" fontFamily="monospace">
                      {unit.temp}°C
                    </text>

                    {/* Network icon */}
                    <g transform={`translate(620, ${y + 35})`}>
                      <Wifi className="text-primary" width={20} height={20} strokeWidth={1.5} />
                      <circle cx="10" cy="10" r="12" fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1">
                        <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </g>
                );
              })}

              {/* Bottom status strip inside rack */}
              <rect x="70" y="495" width="580" height="1" fill="hsl(var(--primary) / 0.3)">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
              </rect>
            </svg>

            {/* Bottom stat cards */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Server, v: "Tier IV", l: "Datacenter" },
                { icon: HardDrive, v: "NVMe", l: "RAID-10 SSD" },
                { icon: Cpu, v: "AMD EPYC", l: "Processors" },
                { icon: Fan, v: "N+1", l: "Redundancy" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-4 py-3 backdrop-blur"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
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
        </motion.div>
      </div>
    </section>
  );
};

export default ServerRackAnimation;
