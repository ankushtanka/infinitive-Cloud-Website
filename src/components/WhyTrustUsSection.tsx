import { Shield, Clock, TrendingUp, Server, Headphones, Eye } from "lucide-react";
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
      description: "Enterprise-grade hardware with automatic failover ensures your site is always online.",
      gradient: "from-primary to-accent",
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      description: "Average response time under 15 minutes. Certified engineers available round the clock.",
      gradient: "from-accent to-secondary",
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Start small and grow big. Upgrade resources instantly without migration or downtime.",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Eye,
      title: "Proactive Monitoring",
      description: "24/7 server monitoring with automated alerts. Issues resolved before they affect you.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Clock,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprise charges. Cancel anytime with hassle-free refund.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Server,
      title: "Green Hosting",
      description: "Energy-efficient data centres. Sustainable hosting without compromising performance.",
      gradient: "from-secondary to-accent",
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
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Why Choose <span className="gradient-text">Infinitive Cloud</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by 1,000+ businesses across India.
          </p>
        </motion.div>

        {/* Mobile: 2-col compact grid, Desktop: 3-col cards */}
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
                  <CardContent className="p-4 md:p-8 text-center">
                    <div className="relative inline-flex mb-3 md:mb-5">
                      <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{ boxShadow: 'var(--shadow-medium)' }}>
                        <Icon className="w-5 h-5 md:w-8 md:h-8 text-primary-foreground" />
                      </div>
                    </div>
                    <h3 className="text-xs md:text-lg font-bold mb-1 md:mb-3 group-hover:text-primary transition-colors">
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
      </div>
    </section>
  );
};

export default WhyTrustUsSection;