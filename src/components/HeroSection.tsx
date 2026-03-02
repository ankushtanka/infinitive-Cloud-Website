import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones, Server, Cloud, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";
import { useRef, useEffect, useState } from "react";

// Only two items for alternating marquee
const MARQUEE_ITEMS = [
  {
    icon: <Percent className="inline w-5 h-5 mr-2 text-primary" />,
    text: (
      <>
        <b>Get 50% OFF</b> on first 3 months – Use Code: <span className="font-mono px-2 rounded bg-accent text-background">WELCOME50</span>
      </>
    ),
    to: "/pricing",
  },
  {
    icon: <ArrowRight className="inline w-5 h-5 mr-2 text-primary" />,
    text: (
      <>
        <b>Start your 7-day Free Trial</b> – No credit card required
      </>
    ),
    to: "/free-trial",
  },
];

const HeroSection = () => {
  const parallaxRef = useParallax(0.3);

  // Marquee index to alternate items
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    // Auto-advance every 4200ms
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % MARQUEE_ITEMS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background pt-24 md:pt-32">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background will-change-transform"
      >
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      </div>

      <div className="section-container w-full relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full flex flex-col items-center text-center animate-fade-in">
          <h1 className="mb-6 font-extrabold leading-tight text-3xl md:text-5xl lg:text-6xl tracking-tight drop-shadow-xl">
            Premium <span className="gradient-text">Cloud & Web Hosting</span>{" "}
            <span className="block mt-2 text-primary">Solutions in India</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8 max-w-3xl mx-auto leading-snug drop-shadow">
            Limitless solutions for cloud and web hostings
          </p>
          <p className="text-lg md:text-2xl text-foreground/70 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
            Managed VPS, dedicated servers, shared hosting, and enterprise infrastructure &mdash; built for speed, security, and scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full mb-16">
            <Link to="/quote">
              <Button
                size="lg"
                className="btn-gradient glow-effect text-lg md:text-xl px-12 h-16 rounded-2xl group font-bold shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: "var(--shadow-medium)" }}
              >
                Get Started
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/free-trial">
              <Button
                size="lg"
                variant="outline"
                className="text-lg md:text-xl px-12 h-16 rounded-2xl border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all font-semibold"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 lg:mt-16 flex flex-wrap gap-6 sm:gap-8 md:gap-10 items-center justify-center text-sm md:text-base text-muted-foreground">
            <div className="flex items-center gap-2 sm:gap-3">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-medium">99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Headphones className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-medium">24/7 Expert Support</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Server className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-medium">Free Migration</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Cloud className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-medium">cPanel & WHM</span>
            </div>
          </div>
        </div>

        {/* Animated (marquee type) bar with single visible item at a time */}
        <div className="relative w-full max-w-3xl mt-12">
          <style>{`
            @keyframes marquee-in {
              0% { transform: translateY(50%); opacity: 0; }
              15% { transform: translateY(0); opacity: 1; }
              85% { transform: translateY(0); opacity: 1; }
              100% { transform: translateY(-50%); opacity: 0; }
            }
            .marquee-animate {
              animation: marquee-in 4.2s cubic-bezier(0.33, 1, 0.68, 1) both;
              will-change: opacity,transform;
            }
          `}</style>
          <div
            className="overflow-hidden rounded-xl bg-gradient-to-l from-background/80 via-accent/5 to-background/80 border border-accent/20 shadow-md relative h-16 flex items-center justify-center"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 13%, black 87%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 13%, black 87%, transparent 100%)",
              minHeight: "4rem",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none select-none" aria-hidden="true">
              {/* spacer for size stabilization */}
            </div>
            <div key={activeIdx} className="absolute w-full left-0 top-0 h-full flex items-center justify-center marquee-animate">
              <Link
                to={MARQUEE_ITEMS[activeIdx].to}
                className="flex items-center gap-3 text-lg md:text-xl font-semibold px-16 py-2 transition hover:text-primary focus:outline-none focus-visible:ring whitespace-nowrap"
                tabIndex={0}
                style={{
                  opacity: 0.92,
                  transition: "background .35s",
                }}
              >
                {MARQUEE_ITEMS[activeIdx].icon}
                <span className="whitespace-nowrap">{MARQUEE_ITEMS[activeIdx].text}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;