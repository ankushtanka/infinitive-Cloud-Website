import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones, Server, Cloud, Percent } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import { useEffect, useState } from "react";

// Internal Contact Page Route
const CONTACT_ROUTE = "/contact";

// Only two items for alternating marquee, links simply redirect to contact page
const MARQUEE_ITEMS = [
  {
    icon: <Percent className="inline w-5 h-5 mr-2 text-primary" />,
    text: (
      <>
        <b>Get 50% OFF</b> on first 3 months – Use Code: <span className="font-mono px-2 rounded bg-accent text-background">WELCOME50</span>
      </>
    ),
  },
  {
    icon: <ArrowRight className="inline w-5 h-5 mr-2 text-primary" />,
    text: (
      <>
        <b>Start your 7-day Free Trial</b> – No credit card required
      </>
    ),
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

  // Handler for redirect to contact page
  const handleRedirect = () => {
    window.location.href = CONTACT_ROUTE;
  };

  // Marquee redirect handler for accessibility/keyboard
  const handleMarqueeClick = (e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>) => {
    if (
      (e as React.MouseEvent).type === 'click' ||
      (e as React.KeyboardEvent).key === 'Enter' ||
      (e as React.KeyboardEvent).key === ' '
    ) {
      e.preventDefault();
      window.location.href = CONTACT_ROUTE;
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background pt-20 md:pt-28 xl:pt-32">
      {/* Responsive utility: desktop (lg+) restores normal gap; tablet & below tightens spacing */}
      <style>
        {`
        /* Desktop (lg and up): Use normal vertical gaps */
        @media (min-width: 1024px) {
          .hero-h1 {
            margin-bottom: 1.5rem !important; /* mb-6 */
            line-height: 1.15 !important;
          }
          .hero-p-main {
            margin-bottom: 2rem !important;
            line-height: 1.2 !important;
          }
          .hero-p-support {
            margin-bottom: 3.5rem !important;
            line-height: 1.3 !important;
          }
          .hero-btns {
            gap: 1.25rem !important;
            margin-bottom: 1.75rem !important;
          }
          .hero-badges {
            margin-top: 1.5rem !important;
            gap: 1.25rem !important;
          }
          .hero-marquee {
            margin-top: 1.5rem !important;
          }
        }
        /* Tablet and down: tighter spacing */
        @media (max-width: 1023px) {
          .hero-h1 {
            margin-bottom: 1.25rem !important;
            line-height: 1.05 !important;
          }
          .hero-p-main {
            margin-bottom: 1.25rem !important;
            line-height: 1.1 !important;
          }
          .hero-p-support {
            margin-bottom: 2.5rem !important;
            line-height: 1.2 !important;
          }
          .hero-btns {
            gap: 0.75rem !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-badges {
            margin-top: 1rem !important;
            gap: 1rem !important;
          }
          .hero-marquee {
            margin-top: 1rem !important;
          }
        }
        /* Set base for any other case */
        .hero-btns {
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .hero-badges {
          margin-top: 1.5rem;
          gap: 1.25rem;
        }
        .hero-marquee {
          margin-top: 1.5rem;
        }
        `}
      </style>
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background will-change-transform"
      >
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      </div>

      <div className="section-container w-full relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full flex flex-col items-center text-center animate-fade-in">
          <h1 className="hero-h1 mb-6 font-extrabold leading-tight text-3xl md:text-4xl lg:text-5xl tracking-tight drop-shadow-xl">
            Premium <span className="gradient-text">Cloud & Web Hosting</span>{" "}
            <span className="block mt-2 text-primary">Solutions</span>
          </h1>
          <p className="hero-p-main text-xl md:text-2xl font-semibold text-muted-foreground mb-8 max-w-3xl mx-auto leading-snug drop-shadow">
            Limitless solutions for cloud and web hostings
          </p>
          <p className="hero-p-support text-base md:text-lg text-foreground/70 mb-14 max-w-2xl mx-auto font-medium leading-relaxed">
            Managed VPS, dedicated servers, shared hosting, and enterprise infrastructure &mdash; built for speed, security, and scale.
          </p>

          {/* Button group with CSS gaps controlled by media query above */}
          <div className="hero-btns flex flex-col sm:flex-row justify-center w-full mb-5">
            <Button
              size="lg"
              className="btn-gradient glow-effect text-base md:text-lg px-10 h-14 rounded-2xl group font-bold shadow-lg hover:shadow-xl transition-all"
              style={{ boxShadow: "var(--shadow-medium)" }}
              onClick={handleRedirect}
            >
              Get Started
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base md:text-lg px-10 h-14 rounded-2xl border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all font-semibold"
              onClick={handleRedirect}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Trust badges */}
          <div className="hero-badges flex flex-wrap items-center justify-center text-sm md:text-base text-muted-foreground">
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
        <div className="hero-marquee relative w-full max-w-3xl">
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
              {/* Use span with role=link to simulate a link; click/keyboard will redirect */}
              <span
                tabIndex={0}
                role="link"
                className="flex items-center gap-3 text-lg md:text-xl font-semibold px-16 py-2 transition hover:text-primary focus:outline-none focus-visible:ring whitespace-nowrap cursor-pointer"
                style={{
                  opacity: 0.92,
                  transition: "background .35s",
                }}
                onClick={handleMarqueeClick}
                onKeyDown={handleMarqueeClick}
                aria-label="Go to Contact page"
              >
                {MARQUEE_ITEMS[activeIdx].icon}
                <span className="whitespace-nowrap">{MARQUEE_ITEMS[activeIdx].text}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;