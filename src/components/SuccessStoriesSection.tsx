import { TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stories = [
  {
    client: "E-Commerce Platform",
    problem: "Frequent downtime during peak traffic costing ₹2L+ monthly in lost sales.",
    result: "99.99% uptime with auto-scaling cloud servers — zero downtime in 12 months.",
    stat: "3× faster page loads",
  },
  {
    client: "SaaS Application",
    problem: "Slow API response times affecting 50,000+ users across India.",
    result: "Migrated to dedicated NVMe servers with sub-100ms response times.",
    stat: "68% latency reduction",
  },
  {
    client: "Media & Publishing",
    problem: "Shared hosting couldn't handle 2M+ monthly visitors and large media files.",
    result: "Scaled to VPS cluster with CDN — site loads in under 1.5 seconds globally.",
    stat: "5× traffic capacity",
  },
];

const SuccessStoriesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">
            <TrendingUp className="w-4 h-4" /> Success Stories
          </p>
          <h2 className="font-bold mb-3">Customer Success Stories</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how businesses improved performance and reliability with Infinitive Cloud.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stories.map((story) => (
            <div
              key={story.client}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-300 group flex flex-col"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{story.client}</span>
              <p className="text-sm text-muted-foreground mb-3"><strong className="text-foreground">Challenge:</strong> {story.problem}</p>
              <p className="text-sm text-muted-foreground mb-4 flex-1"><strong className="text-foreground">Result:</strong> {story.result}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-lg font-bold font-heading text-primary">{story.stat}</span>
                <Link to="/contact" className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  Read Case Study <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
