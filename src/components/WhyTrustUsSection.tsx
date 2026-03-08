import { Zap, Server, Globe, Shield, Settings, Headphones } from "lucide-react";

const features = [
  { icon: Zap, title: "High Performance Infrastructure", desc: "Enterprise-grade hardware with NVMe SSD storage and high-speed network." },
  { icon: Server, title: "Instant Server Deployment", desc: "Deploy your server in minutes with automated provisioning." },
  { icon: Globe, title: "Dedicated IP Availability", desc: "Get a dedicated IP address for better performance and security." },
  { icon: Shield, title: "Advanced Security Protection", desc: "DDoS protection, firewalls, and real-time threat monitoring." },
  { icon: Settings, title: "Fully Managed Servers", desc: "24/7 monitoring, updates, and proactive issue resolution." },
  { icon: Headphones, title: "24×7 Expert Support", desc: "Certified engineers available around the clock for any issue." },
];

const WhyTrustUsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">Why Infinitive Cloud</p>
          <h2 className="font-bold mb-3">
            Why Businesses Choose Infinitive Cloud
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by 1,000+ businesses across India for reliable, high-performance cloud infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-300 group"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
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

export default WhyTrustUsSection;
