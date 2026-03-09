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
    "15 Days Free Cloud Hosting",
    "30-Day Money-Back Guarantee",
    "No Setup Fees or Hidden Charges",
    "No Credit Card Required",
    "Full Feature Access",
    "Free Migration Included",
  ];

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-14 text-center" style={{ boxShadow: "var(--shadow-strong)" }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              No Credit Card Required
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Try Before You Buy — <span className="gradient-text">15 Days Free</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Experience premium cloud hosting risk-free. Full access, zero commitments, zero catch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{b}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/contact">
              <Button
                size="lg"
                className="btn-gradient glow-effect text-lg px-12 h-16 rounded-xl group font-bold"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                Start Free Trial Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <p className="text-xs text-muted-foreground mt-4">
              15-day free trial + 30-day money-back guarantee · Join 1,000+ businesses on Infinitive Cloud
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeTrialSection;
