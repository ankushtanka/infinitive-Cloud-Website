import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FreeTrialSection = () => {
  return (
    <section className="py-20 md:py-32" style={{ background: "var(--gradient-hero)" }}>
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 text-primary-foreground">
            Ready to <span className="text-accent italic">Get Started?</span>
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/60 mb-8 max-w-xl mx-auto leading-relaxed">
            Experience premium cloud hosting risk-free. 15-day free trial, 30-day money-back guarantee. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-gold h-12 md:h-14 px-8 md:px-10 text-sm">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="btn-gold-outline h-12 md:h-14 px-8 md:px-10 text-sm border-primary-foreground/20 text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeTrialSection;
