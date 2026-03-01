import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones, Server, Cloud, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";

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

  return (
    // Added pt-24 md:pt-32 for top padding, shifting content down for better spacing
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background pt-24 md:pt-32">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background will-change-transform"
      >
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      </div>

      {/* Added gap-y-8 for separation, or mt-6 in inner wrapper for even more top space */}
      <div className="section-container w-full relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full flex flex-col items-center text-center animate-fade-in">
          {/* Logo or Illustration could go here for more fullness */}
          <h1 className="mb-6 font-extrabold leading-tight text-3xl md:text-5xl lg:text-6xl tracking-tight drop-shadow-xl">
            Premium <span className="gradient-text">Cloud & Web Hosting</span> <span className="block mt-2 text-primary">Solutions in India</span>
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
        {/* Animated marquee bar */}
        <div className="relative w-full max-w-3xl mt-12">
          <div
            className="overflow-hidden rounded-xl bg-gradient-to-l from-background/80 via-accent/5 to-background/80 border border-accent/20 shadow-md"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}
          >
            <div
              className="flex whitespace-nowrap animate-marquee-fade pointer-events-auto"
              style={{
                animation: "marquee-fade 18s linear infinite",
                minHeight: "3rem",
              }}
              role="presentation"
              aria-label="Special promo and free trial"
            >
              {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, i) => (
                <Link
                  to={item.to}
                  key={i}
                  className={`flex items-center gap-2 text-lg md:text-xl font-semibold px-8 py-2 transition hover:text-primary focus:outline-none focus-visible:ring`}
                  tabIndex={0}
                  style={{
                    opacity: 0.8,
                  }}
                >
                  {item.icon}
                  <span className="">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Custom marquee animation using Tailwind. The fade at the edges is set by the mask above. */}
          <style>
            {`
              @keyframes marquee-fade {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-fade {
                animation: marquee-fade 18s linear infinite;
              }
            `}
          </style>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;