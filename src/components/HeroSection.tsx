import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const parallaxOffset = useParallax(0.2);
  
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden min-h-[85vh] flex items-center">
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      >
        <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-glow)' }} />
      </div>
      
      <div className="section-container w-full relative z-10">
        <div className="max-w-5xl mx-auto animate-fade-in">
          {/* Main Headline - Clean, powerful typography */}
          <h1 className="mb-6">
            Helping businesses{" "}
            <span className="gradient-text">
              win online
            </span>
          </h1>

          {/* Subheadline - Clear value proposition */}
          <p className="text-xl md:text-2xl text-foreground/90 mb-5 max-w-2xl font-medium">
            Powerful cloud infrastructure and hosting solutions built for modern businesses
          </p>
          
          <p className="text-base md:text-lg text-foreground/60 mb-10 max-w-xl">
            Enterprise-grade infrastructure with 99.99% uptime guarantee. 
            Scale effortlessly with our reliable cloud platform.
          </p>

          {/* Clear call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link to="/quote" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="btn-gradient text-base px-8 h-12 md:h-14 rounded-lg group w-full sm:w-auto font-semibold"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <Link to="/solutions" className="w-full sm:w-auto">
              <Button 
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 md:h-14 rounded-lg hover:bg-muted/50 transition-all w-full sm:w-auto font-medium"
              >
                Explore Solutions
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 items-center text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground/70">99.99% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground/70">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground/70">Enterprise Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
