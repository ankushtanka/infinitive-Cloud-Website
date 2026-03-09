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
  return (
    <section className="py-24 bg-muted/20">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why <span className="gradient-text">Switch to Us</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how Infinitive Cloud stacks up against typical hosting providers. More features, better performance, lower price.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-medium)" }}>
            {/* Header */}
            <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
              <div className="p-4 md:p-5 font-bold text-sm md:text-base">Feature</div>
              <div className="p-4 md:p-5 text-center font-bold text-sm md:text-base gradient-text">Infinitive Cloud</div>
              <div className="p-4 md:p-5 text-center font-bold text-sm md:text-base text-muted-foreground">Others</div>
            </div>

            {/* Rows */}
            {features.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 ${i < features.length - 1 ? "border-b border-border/50" : ""} hover:bg-muted/30 transition-colors`}>
                <div className="p-4 md:p-5 text-sm font-medium">{row.feature}</div>
                <div className="p-4 md:p-5 flex justify-center">
                  {row.us ? (
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5 flex justify-center">
                  {row.others ? (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <Check className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="w-4 h-4 text-destructive" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/contact">
              <Button size="lg" className="btn-gradient glow-effect text-lg px-10 h-14 rounded-xl group font-bold">
                Switch to Infinitive Cloud
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
