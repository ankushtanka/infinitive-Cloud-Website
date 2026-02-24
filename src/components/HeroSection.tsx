import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Headphones, Server, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const parallaxRef = useParallax(0.3);
  
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background will-change-transform"
      >
        <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      </div>

      
      <div className="section-container w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="mb-6 leading-tight font-black text-3xl md:text-4xl lg:text-5xl">
            Premium <span className="gradient-text">Cloud & Web Hosting</span> Solutions in India
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto font-semibold">
            99.99% Uptime • 24×7 Expert Support • 15 Days Free Trial
          </p>
          
          <p className="text-sm md:text-base text-foreground/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Limitless solutions for cloud and web hosting. Managed VPS, dedicated servers, shared hosting, and enterprise infrastructure — built for speed, security, and scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button 
                size="lg" 
                className="btn-gradient glow-effect text-base md:text-lg px-10 h-14 rounded-xl group font-bold shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: 'var(--shadow-medium)' }}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/free-trial">
              <Button 
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-10 h-14 rounded-xl border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all font-semibold"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap gap-8 items-center justify-center text-sm text-muted-foreground">
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
              <span className="font-medium">cPanel & WHM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
