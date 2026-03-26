import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const FreeTrialSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    "14 Days Free Cloud Hosting",
    "30-Day Money-Back Guarantee",
    "No Setup Fees or Hidden Charges",
    "No Credit Card Required",
    "Full Feature Access",
    "Free Migration Included",
  ];

  return (
    <section className="py-12 md:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl hidden md:block" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/80 border border-border rounded-2xl md:rounded-3xl p-5 md:p-14 text-center" style={{ boxShadow: "var(--shadow-strong)" }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs md:text-sm px-4 py-1.5 rounded-full mb-4 md:mb-6">
              <Sparkles className="w-4 h-4" />
              No Credit Card Required
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Try Before You Buy — <span className="gradient-text">14 Days Free</span>
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-10 max-w-xl mx-auto">
              Experience premium cloud hosting risk-free. Full access, zero commitments.
            </p>

            <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-lg mx-auto mb-6 md:mb-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{b}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/contact">
              <Button
                size="lg"
                className="btn-gradient glow-effect text-sm md:text-lg px-8 md:px-12 h-12 md:h-16 rounded-xl group font-bold"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                Start Free Trial Now
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <p className="text-[10px] md:text-xs text-muted-foreground mt-3 md:mt-4">
              14-day free trial + 30-day money-back guarantee · Join 1,000+ businesses
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeTrialSection;