import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones, Server, Cloud, Zap, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const useCountUp = (end: number, duration: number = 2000, suffix: string = "") => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, value: count, suffix };
};

const HeroSection = () => {
  const [activeOffer, setActiveOffer] = useState(0);
  const { scrollY } = useScroll();
  const tickerOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const tickerHeight = useTransform(scrollY, [0, 80], ["auto", "0px"]);

  const offers = [
    { text: "50% OFF first 3 months", code: "WELCOME50", icon: BadgePercent },
    { text: "15-day free trial — no card required", code: null, icon: Clock },
    { text: "Plans from ₹79/mo", code: null, icon: Gem },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveOffer((p) => (p + 1) % offers.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const stat1 = useCountUp(50, 2500, "+");
  const stat2 = useCountUp(99, 2000, ".9%");
  const stat3 = useCountUp(5, 1500, "x");
  const stat4 = useCountUp(100, 1500, "%");

  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-background pt-16 lg:pt-24 min-h-[85vh] md:min-h-screen">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-float hidden md:block" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] animate-float hidden md:block" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] hidden md:block" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Top offer ticker */}
      <motion.div 
        style={{ opacity: tickerOpacity, height: tickerHeight, overflow: "hidden" }}
        className="relative z-10 w-full max-w-lg mx-auto px-3 sm:px-4 mt-2 md:mt-4 mb-4 md:mb-8"
      >
        <Link to="/contact" className="block group">
          <div className="rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-md bg-primary/5 hover:bg-primary/10 shadow-sm hover:shadow-md" style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.05)" }}>
            <div className="flex items-center justify-center h-10 sm:h-11 px-5 sm:px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOffer}
                  initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-medium"
                >
                  {(() => { const Icon = offers[activeOffer].icon; return <Icon className="w-3.5 h-3.5 text-primary" />; })()}
                  <span className="text-foreground/80">{offers[activeOffer].text}</span>
                  {offers[activeOffer].code && (
                    <span className="font-mono px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] sm:text-xs font-bold tracking-widest border border-primary/20">
                      {offers[activeOffer].code}
                    </span>
                  )}
                  <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Main hero content */}
      <div className="section-container w-full relative z-10 flex flex-col items-center justify-center flex-1">
        <div className="max-w-5xl w-full flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 to-secondary/15 text-primary font-semibold text-xs sm:text-sm px-5 py-2 sm:py-2.5 rounded-full mb-5 md:mb-8 border border-primary/25 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            India's Fastest Growing Cloud Hosting
          </motion.div>

          {/* Heading with staggered animation */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-5 md:mb-7 font-extrabold leading-[1.15] md:leading-[1.2] text-2xl sm:text-3xl md:text-[clamp(2.5rem,4.5vw,4.5rem)] tracking-tight"
          >
            <span className="whitespace-nowrap">Premium{" "}
            <span className="gradient-text">Cloud & Web Hosting</span></span>
            <br />
            <span className="text-primary">Built for Speed & Scale</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted-foreground mb-5 md:mb-7 max-w-3xl mx-auto leading-relaxed px-2"
          >
            Managed VPS, dedicated servers, shared hosting & enterprise infrastructure — powered by NVMe SSD, LiteSpeed, and 24/7 expert support.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="hidden sm:flex flex-wrap items-center justify-center gap-2.5 mb-10"
          >
            {[
              "NVMe SSD Storage",
              "Free SSL & CDN",
              "cPanel Included",
              "Free Migration",
            ].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/40 hover:border-primary/30 hover:text-foreground/90 transition-all duration-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full mb-7 md:mb-10 px-2"
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="btn-gradient glow-effect text-base md:text-xl px-8 md:px-12 h-12 md:h-16 rounded-xl md:rounded-2xl group font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-xl px-8 md:px-12 h-12 md:h-16 rounded-xl md:rounded-2xl border-2 border-foreground/15 hover:border-primary/50 hover:bg-primary/5 transition-all font-semibold w-full sm:w-auto backdrop-blur-sm"
              >
                View Plans — From ₹79/mo
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground mb-8 md:mb-10"
          >
            {[
              { icon: Shield, label: "99.99% Uptime" },
              { icon: Headphones, label: "24/7 Support" },
              { icon: Cloud, label: "15-Day Free Trial" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 md:gap-2">
                <Icon className="w-4 h-4 md:w-[18px] md:h-[18px] text-primary/70" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
            <div className="hidden sm:flex items-center gap-2">
              <Server className="w-[18px] h-[18px] text-primary/70" />
              <span className="font-medium">Free Migration</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-[18px] h-[18px] text-primary/70" />
              <span className="font-medium">30-Day Money-Back</span>
            </div>
          </motion.div>
        </div>

        {/* Animated stats counter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="w-full max-w-4xl grid grid-cols-4 gap-2 sm:gap-4 md:gap-5 mb-6 md:mb-8 px-1 sm:px-0"
        >
          {[
            { ...stat1, label: "Data Centers", fullLabel: "Global Data Centers", icon: "🌍" },
            { ...stat2, label: "Satisfaction", fullLabel: "Client Satisfaction", icon: "⭐" },
            { ...stat3, label: "Faster Speed", fullLabel: "Faster Load Speeds", icon: "⚡" },
            { ...stat4, label: "Free SSL", fullLabel: "Free SSL & Security", icon: "🔒" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              ref={stat.ref}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative group bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-5 md:p-6 text-center hover:border-primary/25 transition-all duration-300"
              style={{ boxShadow: "0 4px 20px -4px hsl(var(--primary) / 0.06)" }}
            >
              <div className="text-sm sm:text-2xl mb-0.5 sm:mb-2">{stat.icon}</div>
              <div className="text-base sm:text-3xl md:text-4xl font-black gradient-text tabular-nums leading-tight">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-[8px] sm:text-xs text-muted-foreground font-medium mt-0.5 sm:mt-1.5 leading-tight uppercase tracking-wider">
                <span className="sm:hidden">{stat.label}</span>
                <span className="hidden sm:inline">{stat.fullLabel}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
