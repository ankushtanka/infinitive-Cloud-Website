import { Shield, TrendingUp, Headphones, Eye, Star, Zap, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WhyTrustUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const reasons = [
    {
      icon: Shield,
      title: "99.99% Uptime",
      stat: "99.99%",
      description: "Enterprise-grade hardware with automatic failover. Your site stays online, always.",
      gradient: "from-primary to-accent",
    },
    {
      icon: Headphones,
      title: "< 15 Min Response",
      stat: "24/7",
      description: "Certified engineers respond in under 15 minutes — round the clock, every day.",
      gradient: "from-accent to-secondary",
    },
    {
      icon: Zap,
      title: "3x Faster Speeds",
      stat: "3×",
      description: "NVMe SSD + LiteSpeed delivers pages 3x faster than traditional shared hosting.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Instant Scaling",
      stat: "0s",
      description: "Upgrade RAM, storage, or vCPUs instantly — zero migration, zero downtime.",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Lock,
      title: "Zero Hidden Fees",
      stat: "₹0",
      description: "No setup fees, no surprise charges. Transparent billing with hassle-free refunds.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Eye,
      title: "Proactive Monitoring",
      stat: "24/7",
      description: "Automated alerts and issue resolution before problems ever reach you.",
      gradient: "from-primary to-secondary",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 hidden md:block" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2 hidden md:block" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Why Choose <span className="gradient-text">Infinitive Cloud</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-5">
            Trusted by 1,000+ businesses across India.
          </p>

          {/* Trustpilot-style rating bar */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/60 text-yellow-400/60"}`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">4.8 / 5</span>
            <span className="text-xs text-muted-foreground">from 1,200+ businesses</span>
          </div>
        </motion.div>

        {/* Feature cards — 2-col mobile, 3-col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="card-premium group hover:border-primary/30 h-full relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="p-4 md:p-7">
                    {/* Icon + stat side by side on desktop */}
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className={`w-10 h-10 md:w-13 md:h-13 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`} style={{ boxShadow: 'var(--shadow-medium)' }}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                      </div>
                      <span className="hidden md:block text-2xl font-black text-foreground/10 group-hover:text-foreground/20 transition-colors select-none">
                        {item.stat}
                      </span>
                    </div>
                    <h3 className="text-xs md:text-base font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-[10px] md:text-sm leading-relaxed hidden sm:block">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust strip — like SiteGround/Hostinger */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10 text-center"
        >
          {[
            { label: "30-Day Money Back", sub: "No questions asked" },
            { label: "Free Migration", sub: "We move your site for free" },
            { label: "India Data Centres", sub: "Low latency for Indian traffic" },
            { label: "No Lock-in", sub: "Cancel anytime" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span className="text-sm font-bold text-foreground">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustUsSection;
