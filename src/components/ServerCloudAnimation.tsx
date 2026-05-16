import { motion } from "framer-motion";
import { Cloud, Server, Database, Globe, Shield, Zap } from "lucide-react";

/**
 * Premium animated visualization: cloud at center exchanging data packets
 * with server racks, globe, database and security nodes around it.
 * Pure SVG + framer-motion + CSS. Themed via design tokens.
 */
const ServerCloudAnimation = () => {
  const nodes = [
    { icon: Server, label: "VPS Cluster", angle: -150, color: "primary" },
    { icon: Database, label: "NVMe Storage", angle: -90, color: "secondary" },
    { icon: Globe, label: "Global CDN", angle: -30, color: "accent" },
    { icon: Shield, label: "DDoS Shield", angle: 30, color: "primary" },
    { icon: Zap, label: "LiteSpeed", angle: 90, color: "secondary" },
    { icon: Server, label: "Dedicated", angle: 150, color: "accent" },
  ];

  const radius = 200;

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-background">
      {/* Background grid + glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 sc-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.25), transparent 70%)" }} />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">
              Live Infrastructure
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Cloud Network</span> in Motion
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time visualization of our global cloud fabric — servers, storage, and security nodes orchestrated in perfect harmony.
          </p>
        </motion.div>

        {/* Animation stage */}
        <div className="relative mx-auto h-[480px] md:h-[560px] max-w-[640px] flex items-center justify-center">
          {/* Orbit rings */}
          {[1, 1.25, 1.55].map((scale, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{
                width: radius * 2 * scale,
                height: radius * 2 * scale,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            </motion.div>
          ))}

          {/* Connection beams (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="-320 -280 640 560"
          >
            <defs>
              <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="hubGlow">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="0" cy="0" r="120" fill="url(#hubGlow)" />

            {nodes.map((n, i) => {
              const rad = (n.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <g key={i}>
                  <line
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke="hsl(var(--primary) / 0.25)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  {/* Data packet */}
                  <circle r="4" fill="hsl(var(--primary))" className="sc-packet">
                    <animateMotion
                      dur={`${3 + i * 0.4}s`}
                      repeatCount="indefinite"
                      path={`M0,0 L${x},${y}`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      dur={`${3 + i * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle r="3" fill="hsl(var(--secondary))" className="sc-packet">
                    <animateMotion
                      dur={`${3 + i * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${1.5 + i * 0.2}s`}
                      path={`M${x},${y} L0,0`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      dur={`${3 + i * 0.4}s`}
                      repeatCount="indefinite"
                      begin={`${1.5 + i * 0.2}s`}
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Center cloud hub */}
          <motion.div
            className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--secondary) / 0.2))",
              boxShadow: "0 0 60px hsl(var(--primary) / 0.5), inset 0 0 30px hsl(var(--primary) / 0.2)",
              border: "1px solid hsl(var(--primary) / 0.4)",
              backdropFilter: "blur(12px)",
            }}
            animate={{
              boxShadow: [
                "0 0 60px hsl(var(--primary) / 0.4), inset 0 0 30px hsl(var(--primary) / 0.2)",
                "0 0 90px hsl(var(--primary) / 0.7), inset 0 0 40px hsl(var(--primary) / 0.3)",
                "0 0 60px hsl(var(--primary) / 0.4), inset 0 0 30px hsl(var(--primary) / 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud className="w-14 h-14 md:w-20 md:h-20 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]" />
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-primary/40"
              animate={{ scale: [1, 1.3, 1.6], opacity: [0.6, 0.2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>

          {/* Orbit nodes */}
          {nodes.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            const Icon = n.icon;
            return (
              <motion.div
                key={i}
                className="absolute z-10"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 120 }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-card/90 border border-primary/30 backdrop-blur-md transition-all hover:scale-110 hover:border-primary cursor-pointer"
                    style={{ boxShadow: "0 8px 24px hsl(var(--primary) / 0.25)" }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-foreground/80 whitespace-nowrap bg-background/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {n.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {[
            { v: "1.2M+", l: "Requests / sec" },
            { v: "12ms", l: "Avg latency" },
            { v: "50+", l: "Edge locations" },
            { v: "99.99%", l: "Uptime SLA" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i }}
              className="text-center p-3 md:p-4 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm"
            >
              <div className="text-xl md:text-2xl font-bold gradient-text tabular-nums">{s.v}</div>
              <div className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .sc-grid {
          background-image:
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 80%);
        }
        .sc-packet {
          filter: drop-shadow(0 0 6px hsl(var(--primary)));
        }
        @media (prefers-reduced-motion: reduce) {
          .sc-packet { display: none; }
        }
      `}</style>
    </section>
  );
};

export default ServerCloudAnimation;
