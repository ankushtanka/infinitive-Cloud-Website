import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones, Server, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const parallaxRef = useParallax(0.3);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background will-change-transform"
      >
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      </div>

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
          <div className="mt-10 lg:mt-16 flex flex-wrap gap-10 items-center justify-center text-base md:text-lg text-muted-foreground">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-medium">99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="w-6 h-6 text-primary" />
              <span className="font-medium">24/7 Expert Support</span>
            </div>
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-primary" />
              <span className="font-medium">Free Migration</span>
            </div>
            <div className="flex items-center gap-3">
              <Cloud className="w-6 h-6 text-primary" />
              <span className="font-medium">cPanel & WHM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;