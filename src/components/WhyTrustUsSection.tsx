import { Shield, Clock, TrendingUp, Headphones, Eye, Server } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const WhyTrustUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const reasons = [
    { icon: Shield, title: "99.99% Uptime", description: "Enterprise-grade hardware with automatic failover. Backed by a real service credit SLA." },
    { icon: Headphones, title: "Senior Engineers Only", description: "When you reach out, you speak to someone who knows your environment — not a scripted agent." },
    { icon: TrendingUp, title: "Genuinely Scalable", description: "Start small and grow. Upgrade resources instantly without migration or downtime." },
    { icon: Eye, title: "Proactive Monitoring", description: "24/7 server monitoring with automated alerts. Issues resolved before they affect you." },
    { icon: Clock, title: "Transparent Pricing", description: "No hidden fees, no surprise charges. What you see is what you pay." },
    { icon: Server, title: "Genuine Licenses", description: "cPanel, LiteSpeed, CloudLinux — all running on enterprise hardware. We don't cut corners." },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Why Choose <span className="gradient-text">Infinitive Cloud</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Infrastructure you can trust, support you can count on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="text-center md:text-left"
              >
                <div className="inline-flex mb-4">
                  <div className="w-10 h-10 rounded-lg border border-accent/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUsSection;
