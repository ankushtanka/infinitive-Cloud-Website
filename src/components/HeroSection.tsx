import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Code, Cloud, Database, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/use-parallax";
import logo from "@/assets/logo-icon.png";

const MiniAnimatedOrbit = () => {
  const [activeService, setActiveService] = useState(0);
  const services = [
    { icon: Code, color: "from-cyan-500 to-blue-500" },
    { icon: Database, color: "from-blue-500 to-purple-500" },
    { icon: Cloud, color: "from-purple-500 to-pink-500" },
    { icon: Cpu, color: "from-pink-500 to-cyan-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '15s' }} />
      {services.map((service, index) => {
        const angle = (index * 360) / services.length;
        const Icon = service.icon;
        return (
          <div
            key={index}
            className="absolute w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
            style={{
              transform: `rotate(${angle}deg) translateX(80px) rotate(-${angle}deg)`,
              transition: 'all 0.5s ease',
            }}
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 border ${
              activeService === index
                ? 'bg-gradient-to-br ' + service.color + ' scale-125 shadow-xl border-transparent'
                : 'bg-background/80 border-primary/30'
            }`}>
              <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-500 ${
                activeService === index ? 'text-white' : 'text-primary'
              }`} />
            </div>
          </div>
        );
      })}
      <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
        <div className="absolute inset-0 bg-background rounded-full" />
        <img src={logo} alt="Infinitive Cloud" className="relative z-10 w-18 h-18 md:w-24 md:h-24 object-contain" />
      </div>
    </div>
  );
};

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
        <div className="max-w-6xl mx-auto animate-fade-in flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            {/* Main Headline */}
            <h1 className="mb-8 leading-[0.95] font-black text-5xl md:text-7xl lg:text-8xl">
              Helping businesses{" "}
              <span className="gradient-text inline-block">win</span>{" "}
              <span className="text-foreground">online</span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-foreground mb-6 max-w-2xl font-semibold leading-tight">
              Limitless Solution for Cloud and Web Hosting
            </p>
            
            <p className="text-base md:text-lg lg:text-xl text-foreground/70 mb-12 max-w-xl leading-relaxed">
              Enterprise-grade infrastructure with zero-downtime guarantee. Scale infinitely with our premium cloud solutions.
            </p>

            {/* CTAs */}
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

            {/* Trust Badges */}
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

          {/* Mini animated orbit on bottom-right */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0">
            <MiniAnimatedOrbit />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
