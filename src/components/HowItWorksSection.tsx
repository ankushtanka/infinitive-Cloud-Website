import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Settings, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  { number: "01", icon: Search, title: "Choose Your Plan", description: "Pick from shared, cloud, VPS, or dedicated hosting. Every plan includes free SSL and 24/7 support." },
  { number: "02", icon: Settings, title: "We Set Everything Up", description: "Our team handles migration, DNS, and optimisation — all free, with zero downtime." },
  { number: "03", icon: Rocket, title: "Go Live", description: "Your website is live on enterprise-grade hardware with 99.99% uptime." },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Get Started in <span className="gradient-text">Three Steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-4xl mx-auto mb-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="text-center"
              >
                <div className="inline-flex mb-4 md:mb-6 relative">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg border border-accent/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-[10px] font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-sm md:text-lg font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed hidden sm:block">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/contact">
            <Button className="btn-gold h-12 px-8 text-sm">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
