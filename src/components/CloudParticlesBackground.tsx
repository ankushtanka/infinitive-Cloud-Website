import { motion } from "framer-motion";
import { Cloud, Server, Database, Shield, Zap } from "lucide-react";

/**
 * Premium floating cloud & server particle background.
 * Subtle SVG icons drift across the hero with parallax depth layers.
 * GPU-optimized: only transforms, no blur filters during motion.
 */
const CloudParticlesBackground = () => {
  // Three depth layers for parallax feel
  const particles = [
    // Layer 1 — large slow clouds (back)
    { Icon: Cloud, x: "8%", y: "15%", size: 64, duration: 28, delay: 0, opacity: 0.06, layer: 1 },
    { Icon: Cloud, x: "75%", y: "22%", size: 80, duration: 34, delay: 4, opacity: 0.05, layer: 1 },
    { Icon: Cloud, x: "45%", y: "8%", size: 56, duration: 30, delay: 8, opacity: 0.04, layer: 1 },
    { Icon: Cloud, x: "90%", y: "55%", size: 72, duration: 32, delay: 2, opacity: 0.05, layer: 1 },

    // Layer 2 — medium servers (mid)
    { Icon: Server, x: "15%", y: "55%", size: 40, duration: 22, delay: 1, opacity: 0.07, layer: 2 },
    { Icon: Server, x: "60%", y: "65%", size: 36, duration: 26, delay: 5, opacity: 0.06, layer: 2 },
    { Icon: Database, x: "85%", y: "40%", size: 38, duration: 24, delay: 3, opacity: 0.06, layer: 2 },
    { Icon: Server, x: "30%", y: "78%", size: 34, duration: 28, delay: 7, opacity: 0.05, layer: 2 },

    // Layer 3 — small accent icons (front, faster)
    { Icon: Shield, x: "22%", y: "35%", size: 24, duration: 18, delay: 2, opacity: 0.08, layer: 3 },
    { Icon: Zap, x: "68%", y: "28%", size: 22, duration: 16, delay: 6, opacity: 0.08, layer: 3 },
    { Icon: Database, x: "50%", y: "48%", size: 20, duration: 20, delay: 4, opacity: 0.07, layer: 3 },
    { Icon: Shield, x: "5%", y: "70%", size: 26, duration: 19, delay: 9, opacity: 0.07, layer: 3 },
    { Icon: Zap, x: "92%", y: "75%", size: 24, duration: 17, delay: 0, opacity: 0.08, layer: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Soft ambient orbs — static, no animation cost */}
      <div className="absolute top-[10%] left-[20%] w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-[15%] right-[15%] w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute top-[40%] left-[60%] w-64 h-64 rounded-full bg-secondary/5 blur-3xl" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -18, 0, 14, 0],
            x: [0, 10, -6, 8, 0],
            rotate: [0, 6, -4, 3, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <p.Icon
            className="text-primary"
            style={{
              width: p.size,
              height: p.size,
              filter: `drop-shadow(0 0 ${p.layer * 4}px hsl(var(--primary) / ${p.opacity * 2}))`,
            }}
            strokeWidth={1.2}
          />
        </motion.div>
      ))}

      {/* Data packet dots traveling across */}
      {[...Array(6)].map((_, i) => {
        const top = 10 + i * 15;
        const duration = 12 + i * 2.5;
        return (
          <motion.div
            key={`packet-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
            style={{ top: `${top}%`, left: "-2%" }}
            animate={{ left: ["-2%", "102%"] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        );
      })}

      {/* Subtle horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default CloudParticlesBackground;
