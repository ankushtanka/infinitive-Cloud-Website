import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-glow)' }} />
      </div>
      
      <div className="section-container w-full relative z-10">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Main Headline - Massive Typography with Premium Gradient */}
          <h1 className="mb-8 leading-[0.95] font-black">
            Helping businesses{" "}
            <span className="gradient-text inline-block">
              win
            </span>{" "}
            <span className="text-foreground">online</span>
          </h1>

          {/* Subheadline - Premium Typography */}
          <p className="text-xl md:text-3xl text-foreground/80 mb-6 max-w-2xl font-semibold">
            Limitless Solution for Cloud and Web Hosting
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl">
            Enterprise-grade infrastructure with zero-downtime guarantee. Scale infinitely with our premium cloud solutions.
          </p>

          {/* Premium CTAs with glow effect */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/quote">
              <Button 
                size="lg" 
                className="btn-gradient glow-effect text-lg px-12 h-16 rounded-xl group"
                style={{ boxShadow: 'var(--shadow-medium)' }}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-12 h-16 rounded-xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
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
