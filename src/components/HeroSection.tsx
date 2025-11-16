import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const uspBadges = [
    "Enterprise-Grade Infrastructure",
    "24×7 Expert Support",
    "Zero-Downtime Commitment",
    "Eco-Friendly Green Hosting",
    "All-in-One Tech Ecosystem",
    "Custom Cloud Architectures",
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Main Headline */}
          <h1 className="mb-6 leading-tight">
            <span className="gradient-text">Future-Ready Cloud</span>, Hosting & AI Solutions
            <br />
            for a Smarter Digital World
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            End-to-end cloud, hosting, development & AI services built for zero downtime and infinite scalability.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/solutions">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 group">
                Explore Solutions
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2">
                Book Cloud Consultation
              </Button>
            </Link>
          </div>

          {/* USP Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {uspBadges.map((badge, index) => (
              <div
                key={badge}
                className="flex items-center gap-2 bg-card p-3 rounded-lg border border-border hover:border-primary/50 transition-all card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
