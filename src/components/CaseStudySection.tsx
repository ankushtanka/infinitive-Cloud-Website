import { ArrowRight, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CaseStudySection = () => {
  return (
    <section className="section-container py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-[36px] md:text-[40px] mb-4">
            Real migration, real results
          </h2>
          <p className="text-lg text-muted-foreground">
            Example: Migration for an Ahmedabad ecommerce firm
          </p>
        </div>

        <div className="bg-card p-8 md:p-10 rounded-xl border border-border shadow-soft animate-fade-in-up">
          <div className="space-y-8">
            {/* Problem */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">Problem</span>
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Their current hosting provider had frequent downtime during sale events. Peak traffic would crash their site, costing them orders. They needed to migrate 800GB of product data and customer records without disrupting their ongoing sales.
              </p>
            </div>

            {/* Approach */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">Approach</span>
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                We set up a parallel environment on our cloud infrastructure and synced their data in real-time. When ready, we switched DNS during a low-traffic window. The entire cutover took 12 minutes. Their old site stayed live until we confirmed everything worked on the new infrastructure.
              </p>
              <ul className="space-y-2">
                {[
                  "Migrated during business hours with zero customer impact",
                  "Tested checkout flow and payment gateway before switching",
                  "Set up auto-scaling to handle their next big sale"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">Outcome</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/5 p-5 rounded-lg border border-primary/20">
                  <TrendingUp className="w-6 h-6 text-primary mb-2" />
                  <div className="text-2xl font-bold text-primary mb-1">3x</div>
                  <div className="text-sm text-muted-foreground">Traffic capacity during sale events</div>
                </div>
                <div className="bg-primary/5 p-5 rounded-lg border border-primary/20">
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <div className="text-2xl font-bold text-primary mb-1">62%</div>
                  <div className="text-sm text-muted-foreground">Faster page load times</div>
                </div>
                <div className="bg-primary/5 p-5 rounded-lg border border-primary/20">
                  <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
                  <div className="text-2xl font-bold text-primary mb-1">Zero</div>
                  <div className="text-sm text-muted-foreground">Downtime incidents since migration</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need a similar migration? Let's talk about your specific situation.
            </p>
            <Link to="/contact">
              <Button className="bg-[hsl(270,90%,55%)] hover:bg-[hsl(270,90%,50%)] text-white group">
                Schedule a Call
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
