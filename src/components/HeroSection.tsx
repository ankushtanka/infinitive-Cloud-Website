import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones, Server, Cloud, Zap, CheckCircle2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

  const offers = [
    { text: "🔥 Limited Time: Get 50% OFF on first 3 months", code: "WELCOME50" },
    { text: "🚀 Start your 15-day Free Trial — No credit card required", code: null },
    { text: "⚡ Hosting starting at just ₹79/mo — Launch today!", code: null },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveOffer((p) => (p + 1) % offers.length), 3500);
    return () => clearInterval(timer);
  }, []);

  const stat1 = useCountUp(10000, 2500, "+");
  const stat2 = useCountUp(99, 2000, ".99%");
  const stat3 = useCountUp(24, 1500, "/7");
  const stat4 = useCountUp(30, 1500, "-Day");

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background pt-16 lg:pt-24">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
        {/* Floating orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Top offer ticker */}
      {/* Top offer ticker */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-4 mt-4 mb-8">
        <Link to="/contact" className="block">
          <div className="overflow-hidden rounded-xl sm:rounded-2xl md:rounded-full bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer">
            <div className="flex items-center justify-center min-h-[44px] sm:min-h-[48px] md:h-12 px-3 sm:px-5 md:px-6 py-2 md:py-0">
              <motion.div
                key={activeOffer}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-3 text-[11px] sm:text-xs md:text-base font-semibold text-center leading-snug"
              >
                <span className="text-foreground">{offers[activeOffer].text}</span>
                {offers[activeOffer].code && (
                  <span className="font-mono px-2 sm:px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold whitespace-nowrap">
                    {offers[activeOffer].code}
                  </span>
                )}
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              </motion.div>
            </div>
          </div>
        </Link>
      </div>

      {/* Main hero content */}
      <div className="section-container w-full relative z-10 flex flex-col items-center justify-center flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl w-full flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-5 py-2 rounded-full mb-8 border border-primary/20"
          >
            <Zap className="w-4 h-4" />
            India's Fastest Growing Cloud Hosting
          </motion.div>

          <h1 className="mb-6 font-extrabold leading-[1.1] text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
            Premium{" "}
            <span className="gradient-text">Cloud & Web Hosting</span>
            <br />
            <span className="text-primary">Built for Speed & Scale</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
            Managed VPS, dedicated servers, shared hosting & enterprise infrastructure — powered by NVMe SSD, LiteSpeed, and 24/7 expert support.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              "NVMe SSD Storage",
              "Free SSL & CDN",
              "cPanel Included",
              "Free Migration",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full mb-10">
            <Link to="/contact">
              <Button
                size="lg"
                className="btn-gradient glow-effect text-lg md:text-xl px-12 h-16 rounded-2xl group font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="text-lg md:text-xl px-12 h-16 rounded-2xl border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all font-semibold w-full sm:w-auto"
              >
                View Plans — From ₹79/mo
              </Button>
            </Link>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-muted-foreground mb-10">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-medium">99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-primary" />
              <span className="font-medium">24/7 Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              <span className="font-medium">Free Migration</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              <span className="font-medium">15-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium">30-Day Money-Back</span>
            </div>
          </div>
        </motion.div>

        {/* Animated stats counter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          {[
            { ...stat1, label: "Websites Hosted", icon: "🌐" },
            { ...stat2, label: "Uptime Guaranteed", icon: "🛡️" },
            { ...stat3, label: "Support Available", icon: "🎧" },
            { ...stat4, label: "Money-Back Guarantee", icon: "💰" },
          ].map((stat, i) => (
            <div
              key={i}
              ref={stat.ref}
              className="relative group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-5 md:p-6 text-center hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black gradient-text tabular-nums">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
