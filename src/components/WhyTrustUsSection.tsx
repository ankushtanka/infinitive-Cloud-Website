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
      title: "Reliability & 99.99% Uptime",
      description: "Our infrastructure is built for zero downtime. Enterprise-grade hardware with automatic failover ensures your site is always online.",
      gradient: "from-primary to-accent",
    },
    {
      icon: Headphones,
      title: "Customer-First Support",
      description: "Average response time under 15 minutes. When something breaks at 2 AM, our team of certified engineers is there to fix it.",
      gradient: "from-accent to-secondary",
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Start small and grow big. Upgrade resources instantly without migration or downtime — your hosting grows with your business.",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Eye,
      title: "Proactive Monitoring",
      description: "24/7 server monitoring with automated alerts. We detect and resolve issues before they affect your website visitors.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: Clock,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprise charges. What you see is what you pay. Cancel anytime with our hassle-free refund policy.",
      gradient: "from-accent to-primary",
    },
    {
      icon: Server,
      title: "Green Hosting Infrastructure",
      description: "Our data centres are powered by energy-efficient hardware. Sustainable hosting without compromising on performance.",
      gradient: "from-secondary to-accent",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden" ref={ref}>
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Infinitive Cloud</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by 1,000+ businesses across India. Here's why companies choose us for their hosting needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <CardContent className="p-8 text-center">
                    <div className="relative inline-flex mb-5">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} style={{ boxShadow: 'var(--shadow-medium)' }}>
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
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
