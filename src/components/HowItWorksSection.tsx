import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Settings, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choose Your Plan",
    description: "Pick from shared, cloud, VPS, or dedicated hosting. Every plan includes free SSL, cPanel, and 24/7 support.",
  },
  {
    number: "02",
    icon: Settings,
    title: "We Set Everything Up",
    description: "Our team handles migration, DNS config, and server optimization — all free, with zero downtime.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Go Live in Minutes",
    description: "Your website is live on blazing-fast NVMe servers with 99.99% uptime and enterprise-grade security.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 to-background" />
      <div className="section-container relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Get Started in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            From signup to launch — we make hosting effortless.
          </p>
        </div>

        {/* Mobile: horizontal compact, Desktop: grid */}
        <div className="grid grid-cols-3 md:gap-8 gap-3 max-w-5xl mx-auto mb-8 md:mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="relative text-center group"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                
                <div className="relative inline-flex mb-3 md:mb-6">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ boxShadow: "var(--shadow-medium)" }}>
                    <Icon className="w-6 h-6 md:w-10 md:h-10 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] md:text-xs font-black">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm md:text-xl font-bold mb-1 md:mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-[10px] md:text-sm leading-relaxed max-w-xs mx-auto hidden sm:block">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/contact">
            <Button size="lg" className="btn-gradient glow-effect text-sm md:text-lg px-8 md:px-10 h-12 md:h-14 rounded-xl group font-bold">
              Start Your Free Trial Today
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;