import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const parallaxRef = useParallax(0.3);
  
  return (
    <section className="relative pt-40 pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Premium gradient background with parallax */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background will-change-transform"
      >
        <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      </div>
      
      <div className="section-container w-full relative z-10">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Main Headline - Massive Typography with Premium Gradient */}
          <h1 className="mb-8 leading-[0.95] font-black text-5xl md:text-7xl lg:text-8xl">
            Helping businesses{" "}
            <span className="gradient-text inline-block">
              win
            </span>{" "}
            <span className="text-foreground">online</span>
          </h1>

          {/* Subheadline - Premium Typography with better contrast */}
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground mb-6 max-w-2xl font-semibold leading-tight">
            Limitless Solution for Cloud and Web Hosting
          </p>
          
          <p className="text-base md:text-lg lg:text-xl text-foreground/70 mb-12 max-w-xl leading-relaxed">
            Enterprise-grade infrastructure with zero-downtime guarantee. Scale infinitely with our premium cloud solutions.
          </p>

          {/* Premium CTAs with glow effect - Better mobile experience */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/quote" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="btn-gradient glow-effect text-base md:text-lg px-8 md:px-12 h-14 md:h-16 rounded-xl group w-full sm:w-auto font-bold shadow-lg hover:shadow-xl transition-all"
                style={{ boxShadow: 'var(--shadow-medium)' }}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/solutions" className="w-full sm:w-auto">
              <Button 
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-8 md:px-12 h-14 md:h-16 rounded-xl border-2 border-foreground/20 hover:border-primary hover:bg-primary/10 transition-all w-full sm:w-auto font-semibold"
              >
                View Solutions
              </Button>
            </Link>
          </div>

          {/* Premium Trust Badges */}
          <div className="mt-16 flex flex-wrap gap-6 items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium">99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium">24/7 Expert Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium">Enterprise Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
