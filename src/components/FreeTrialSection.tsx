import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const FreeTrialSection = () => {
  const benefits = [
    "15 Days Free Cloud Hosting Trial",
    "No Setup Fees",
    "No Hidden Charges",
    "No Credit Card Required",
    "Full Feature Access",
    "Cancel Anytime — No Risk",
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Try Before You Buy — <span className="gradient-text">15 Days Free</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Experience premium cloud hosting risk-free. No credit card, no commitments, no catch.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium text-foreground">{b}</span>
              </div>
            ))}
          </div>

          <Link to="/free-trial">
            <Button
              size="lg"
              className="btn-gradient glow-effect text-lg px-12 h-16 rounded-xl group font-bold"
              style={{ boxShadow: 'var(--shadow-medium)' }}
            >
              Start Free Trial Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;
