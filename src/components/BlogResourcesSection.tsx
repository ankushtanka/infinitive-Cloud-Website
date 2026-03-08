import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    title: "How to Choose the Right Hosting",
    excerpt: "A complete guide to selecting the best hosting solution for your website based on traffic, budget, and technical requirements.",
    tag: "Guide",
  },
  {
    title: "VPS vs Dedicated Server",
    excerpt: "Understand the key differences between VPS and dedicated servers to make an informed decision for your business.",
    tag: "Comparison",
  },
  {
    title: "How to Improve Website Speed",
    excerpt: "Proven techniques to optimize your website performance including caching, CDN setup, and server-side improvements.",
    tag: "Performance",
  },
  {
    title: "Website Migration Guide",
    excerpt: "Step-by-step guide to migrating your website to a new hosting provider with zero downtime.",
    tag: "Tutorial",
  },
];

const BlogResourcesSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">
            <BookOpen className="w-4 h-4" /> Resources
          </p>
          <h2 className="font-bold mb-3">Cloud Hosting Resources</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Expert guides and tutorials to help you get the most out of your hosting infrastructure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link
              key={post.title}
              to="/blog"
              className="p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-3 px-2 py-0.5 bg-primary/8 rounded-full self-start">{post.tag}</span>
              <h3 className="text-base font-semibold font-heading mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">{post.excerpt}</p>
              <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Read More <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogResourcesSection;
