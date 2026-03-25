import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPreviewSection = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-8">
            We're <span className="gradient-text">Infinitive Cloud.</span>
          </h2>
          <div className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed mb-10">
            <p>
              Founded by engineers who were tired of "unlimited" hosting that meant limited support. We believe infrastructure should be invisible, but the people behind it shouldn't be.
            </p>
            <p>
              Every server we deploy runs on genuine licenses — cPanel, LiteSpeed, CloudLinux, and enterprise‑grade hardware. We don't cut corners because your business can't afford us to.
            </p>
            <p>
              Our team is small by design. When you reach out, you'll speak to a senior engineer who knows your environment — not a scripted agent.
            </p>
          </div>
          <Link to="/about">
            <Button className="btn-gold-outline text-sm">
              Learn More About Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
