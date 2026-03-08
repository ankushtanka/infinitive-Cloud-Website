import { Gauge, Search, SmilePlus } from "lucide-react";

const points = [
  { icon: Gauge, title: "Website Performance", desc: "Faster hosting reduces page load times, keeping visitors engaged and reducing bounce rates." },
  { icon: Search, title: "SEO Rankings", desc: "Google prioritises fast-loading websites. Better speed means higher search engine rankings." },
  { icon: SmilePlus, title: "Customer Experience", desc: "Fast websites create smooth user experiences that increase conversions and customer satisfaction." },
];

const SpeedSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">Performance</p>
          <h2 className="font-bold mb-3">Why Website Speed Matters</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every millisecond counts. Fast hosting directly impacts your traffic, revenue, and search visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {points.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="text-center p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-300 group"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2 font-heading">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpeedSection;
