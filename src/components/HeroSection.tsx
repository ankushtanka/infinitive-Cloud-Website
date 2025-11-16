import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const uspBadges = [
    "99.99% Uptime",
    "24/7 India Support",
    "Zero-Downtime Migration",
    "Eco-Friendly Infrastructure",
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-background -z-10" />
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-glow -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float -z-10" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary-end/10 rounded-full blur-3xl animate-pulse-glow -z-10" />

      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Limitless Solution for Cloud and Web Hostings</span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 leading-tight">
            <span className="gradient-text">Future-Ready Cloud</span>, Hosting & AI Solutions
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            End-to-end cloud, hosting, development & AI services built for zero downtime and infinite scalability.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/contact">
              <Button size="lg" className="btn-gradient text-white group text-base font-semibold px-8">
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary/10 text-base font-semibold px-8"
              >
                Talk to Sales
              </Button>
            </Link>
          </div>

          {/* USP Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {uspBadges.map((badge, index) => (
              <div
                key={badge}
                className="flex items-center justify-center gap-2 bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-primary/20 hover:border-primary/50 transition-all card-hover glow-effect animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
