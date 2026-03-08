import { ArrowRightLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Free migration service",
  "Zero downtime transfer",
  "Secure data migration",
  "Handled by expert engineers",
];

const MigrationSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="section-container">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Icon / visual */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center" style={{ boxShadow: "var(--shadow-glow)" }}>
              <ArrowRightLeft className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="section-label">Migration</p>
            <h2 className="font-bold mb-3">Free Website Migration</h2>
            <p className="text-muted-foreground mb-6 max-w-lg">
              Move your existing website to Infinitive Cloud with zero downtime. Our expert migration team handles everything — files, databases, emails, and DNS configuration.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              Request Migration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MigrationSection;
