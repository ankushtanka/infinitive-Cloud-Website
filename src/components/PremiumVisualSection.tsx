import { motion } from "framer-motion";
import heroPremium from "@/assets/hero-premium-visual.jpg";

const PremiumVisualSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-32">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-semibold tracking-wider uppercase">
              Enterprise-Grade Infrastructure
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Engineered for{" "}
              <span className="gradient-text">performance.</span>
              <br />
              Designed for{" "}
              <span className="gradient-text">simplicity.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Every layer of our cloud — from bare metal to orchestration — is
              tuned for sub-second response times, zero-downtime deployments,
              and effortless scale. No noise. No compromise.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 max-w-md">
              <div>
                <div className="text-3xl md:text-4xl font-black gradient-text">10ms</div>
                <div className="text-sm text-muted-foreground mt-1">Avg. response</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black gradient-text">99.99%</div>
                <div className="text-sm text-muted-foreground mt-1">Uptime SLA</div>
              </div>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden border border-border/50 bg-card"
              style={{ boxShadow: "var(--shadow-strong)" }}
            >
              <img
                src={heroPremium}
                alt="Premium cloud infrastructure visualization showing translucent server architecture"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            </div>
            {/* Floating glow accents */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumVisualSection;
