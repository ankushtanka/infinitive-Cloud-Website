import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden min-h-[85vh] flex items-center">
      <div className="section-container w-full">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Main Headline - Massive Typography */}
          <h1 className="mb-8 leading-[0.95] font-black text-foreground">
            Helping businesses{" "}
            <span className="inline-block bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              win
            </span>{" "}
            online
          </h1>

          {/* Subheadline - Simple and Clear */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl">
            Limitless solution for cloud and web hosting
          </p>

          {/* Single Bold CTA */}
          <div className="flex gap-4">
            <Link to="/quote">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-bold text-base px-10 h-14 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
