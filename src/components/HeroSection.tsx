import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      {/* Promo Banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-2.5 text-center text-sm font-medium">
        <span className="text-primary font-bold">🚀 Hosting starting at just ₹129/mo</span>
        <span className="text-muted-foreground mx-2">—</span>
        <span className="text-muted-foreground">15-Day Free Trial, No credit card required</span>
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(222,47%,11%)]">
        {/* Subtle glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[hsl(186,100%,53%/0.06)] blur-[120px]" />
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-32">
          <h1 className="mb-6 leading-[1.1] font-black text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white">
            Premium Hosting
            <br />
            <span className="text-[hsl(186,100%,53%)]">Scale Without Limits</span>
          </h1>

          <p className="text-lg md:text-xl text-[hsl(215,20%,65%)] mb-4 max-w-3xl mx-auto leading-relaxed">
            Infinitive Cloud is India's premium hosting platform.
          </p>
          <p className="text-base md:text-lg text-[hsl(215,20%,55%)] mb-12 max-w-2xl mx-auto leading-relaxed">
            Start your project with Managed VPS, Dedicated Servers, Cloud Hosting,
            SSL Certificates, Domain Registration, and 24/7 Expert Support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button
                size="lg"
                className="bg-[hsl(186,100%,53%)] hover:bg-[hsl(186,100%,45%)] text-[hsl(222,47%,11%)] text-base md:text-lg px-10 h-14 rounded-lg group font-bold transition-all">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/free-trial">
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg px-10 h-14 rounded-lg border border-[hsl(215,20%,30%)] text-white hover:border-[hsl(186,100%,53%)] hover:bg-[hsl(186,100%,53%/0.1)] transition-all font-semibold bg-transparent">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Trust logos */}
          <div className="mt-24 pt-12 border-t border-[hsl(215,20%,20%)]">
            <div className="flex flex-wrap gap-10 items-center justify-center text-[hsl(215,20%,45%)] text-sm font-semibold tracking-wider uppercase">
              <span>99.99% Uptime</span>
              <span className="hidden sm:inline text-[hsl(215,20%,25%)]">•</span>
              <span>NVMe SSD</span>
              <span className="hidden sm:inline text-[hsl(215,20%,25%)]">•</span>
              <span>Free SSL</span>
              <span className="hidden sm:inline text-[hsl(215,20%,25%)]">•</span>
              <span>24/7 Support</span>
              <span className="hidden sm:inline text-[hsl(215,20%,25%)]">•</span>
              <span>Free Migration</span>
            </div>
            <p className="text-[hsl(215,20%,40%)] text-xs mt-4">Trusted by businesses across India & worldwide</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;