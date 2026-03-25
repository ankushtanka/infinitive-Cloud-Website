import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full flex items-center overflow-hidden min-h-[90vh] md:min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* Subtle abstract shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px] hidden md:block" />

      <div className="section-container w-full relative z-10 py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] text-primary-foreground leading-[1.1]">
              Infrastructure for{" "}
              <span className="text-accent italic">the Ambitious.</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-primary-foreground/70 mb-8 md:mb-10 max-w-xl leading-relaxed">
              Private cloud, enterprise-grade hardware, and a support team that treats your business like their own. Built for founders, developers, and agencies who refuse to compromise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/pricing">
                <Button className="btn-gold h-12 md:h-14 px-8 md:px-10 text-sm">
                  Explore Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="btn-gold-outline h-12 md:h-14 px-8 md:px-10 text-sm border-primary-foreground/30 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Talk to an Engineer
                </Button>
              </Link>
            </div>

            <p className="text-xs md:text-sm text-primary-foreground/40 leading-relaxed">
              Trusted by 1,000+ Indian businesses · No setup fees · 15‑day risk‑free trial
            </p>
          </motion.div>

          {/* Right - Abstract visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Abstract geometric shapes */}
              <div className="absolute inset-0 rounded-full border border-accent/20 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-accent/15 animate-[spin_45s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full border border-accent/10 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-accent/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20" />
                </div>
              </div>
              {/* Floating dots */}
              <div className="absolute top-1/4 right-0 w-3 h-3 rounded-full bg-accent/40" />
              <div className="absolute bottom-1/3 left-4 w-2 h-2 rounded-full bg-accent/30" />
              <div className="absolute top-8 left-1/3 w-2 h-2 rounded-full bg-accent/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
