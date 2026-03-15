import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { feature: "NVMe SSD Storage", us: true, others: false },
  { feature: "Free SSL Certificate", us: true, others: true },
  { feature: "Free Domain (1 Year)", us: true, others: false },
  { feature: "Free Website Migration", us: true, others: false },
  { feature: "cPanel / WHM Included", us: true, others: false },
  { feature: "99.99% Uptime SLA", us: true, others: false },
  { feature: "15-Day Free Trial", us: true, others: false },
  { feature: "24/7 Expert Support", us: true, others: true },
  { feature: "DDoS Protection", us: true, others: false },
  { feature: "LiteSpeed Web Server", us: true, others: false },
];

const ComparisonSection = () => {
  // Show only 6 features on mobile
  const mobileFeatures = features.slice(0, 6);

  return (
    <section className="py-12 md:py-24 bg-muted/20">
      <div className="section-container">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Why <span className="gradient-text">Switch to Us</span>?
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            More features, better performance, lower price.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-medium)" }}>
            {/* Header */}
            <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
              <div className="p-3 md:p-5 font-bold text-xs md:text-base">Feature</div>
              <div className="p-3 md:p-5 text-center font-bold text-xs md:text-base gradient-text">Infinitive Cloud</div>
              <div className="p-3 md:p-5 text-center font-bold text-xs md:text-base text-muted-foreground">Others</div>
            </div>

            {/* Mobile: show 6, Desktop: show all */}
            {features.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 ${i < features.length - 1 ? "border-b border-border/50" : ""} hover:bg-muted/30 transition-colors ${i >= 6 ? "hidden md:grid" : ""}`}
              >
                <div className="p-3 md:p-5 text-[11px] md:text-sm font-medium">{row.feature}</div>
                <div className="p-3 md:p-5 flex justify-center">
                  {row.us ? (
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                    </div>
                  )}
                </div>
                <div className="p-3 md:p-5 flex justify-center">
                  {row.others ? (
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-muted flex items-center justify-center">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-3 h-3 md:w-4 md:h-4 text-destructive" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-10">
            <Link to="/contact">
              <Button size="lg" className="btn-gradient glow-effect text-sm md:text-lg px-8 md:px-10 h-12 md:h-14 rounded-xl group font-bold">
                Switch to Infinitive Cloud
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;