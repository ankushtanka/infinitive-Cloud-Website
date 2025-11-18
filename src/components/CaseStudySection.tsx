import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CaseStudySection = () => {
  const results = [
    { metric: "3x", label: "Traffic capacity" },
    { metric: "62%", label: "Faster page load times" },
    { metric: "0", label: "Downtime during migration" }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Premium glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-6">
              Real <span className="gradient-text">Results</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              How we helped an Ahmedabad e-commerce business scale without downtime
            </p>
          </div>

          <Card className="card-premium overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-8">
                {/* Problem */}
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-destructive to-destructive/60 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-2xl font-bold">The Problem</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed ml-10">
                    A growing Ahmedabad e-commerce company was losing sales during peak hours. Their existing hosting couldn't handle traffic spikes. They needed to migrate to scalable cloud infrastructure—without any downtime.
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-2xl font-bold">Our Approach</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed ml-10">
                    We architected a multi-server cloud setup with automatic load balancing and performed the migration during off-peak hours. DNS propagation was carefully managed to prevent any service interruption. The entire process was completed in under 6 hours.
                  </p>
                </div>

                {/* Results */}
                <div>
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-2xl font-bold">The Outcome</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-10">
                    {results.map((result, index) => (
                      <div 
                        key={result.label}
                        className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6 text-center"
                      >
                        <div className="text-4xl md:text-5xl font-black mb-2 gradient-text">
                          {result.metric}
                        </div>
                        <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 ml-10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground text-base italic">
                      "Zero downtime during migration. The site handled Black Friday traffic without a single crash. Worth every rupee."
                      <span className="block mt-2 text-sm not-italic font-semibold text-foreground">— Operations Manager, Gujarat E-commerce Co.</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link to="/quote">
              <Button 
                size="lg"
                className="btn-gradient glow-effect text-lg px-12 h-16 rounded-xl group"
                style={{ boxShadow: 'var(--shadow-medium)' }}
              >
                Get Your Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
