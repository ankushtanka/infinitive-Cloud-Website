import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Headphones, Server, Cloud, Database } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]" style={{ background: "hsl(228 100% 52% / 0.3)" }} />

      <div className="section-container w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-2xl">
            <div className="section-label" style={{ background: "hsl(228 100% 52% / 0.15)", color: "hsl(0 0% 100% / 0.9)" }}>
              <Zap className="w-4 h-4" />
              Enterprise-Grade Infrastructure
            </div>

            <h1 className="text-primary-foreground mb-6 font-extrabold" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
              Enterprise-Grade Cloud & Web Hosting Infrastructure
            </h1>

            <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed max-w-xl">
              Deploy websites, applications and servers on high-performance cloud infrastructure with scalable resources and 24×7 expert support.
            </p>

            {/* Benefit highlights */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
              {[
                { icon: Shield, label: "99.99% Uptime Infrastructure" },
                { icon: Zap, label: "Instant Server Deployment" },
                { icon: Headphones, label: "24×7 Expert Support" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/pricing">
                <Button size="lg" className="btn-primary h-12 px-8 text-base rounded-xl group">
                  View Hosting Plans
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base rounded-xl border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/30"
                >
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Infrastructure illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Central server icon */}
              <div className="relative mx-auto w-40 h-40 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center" style={{ boxShadow: "var(--shadow-glow)" }}>
                <Server className="w-16 h-16 text-primary" />
              </div>
              {/* Orbiting icons */}
              {[
                { Icon: Cloud, top: "-10%", left: "10%", delay: "0s" },
                { Icon: Database, top: "10%", right: "-5%", delay: "1s" },
                { Icon: Shield, bottom: "-5%", left: "5%", delay: "2s" },
                { Icon: Zap, bottom: "15%", right: "0%", delay: "0.5s" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="absolute w-14 h-14 rounded-xl bg-secondary/80 border border-primary/20 flex items-center justify-center animate-float"
                  style={{
                    ...item,
                    animationDelay: item.delay,
                    boxShadow: "var(--shadow-medium)",
                  } as React.CSSProperties}
                >
                  <item.Icon className="w-6 h-6 text-primary/80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
