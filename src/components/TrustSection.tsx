import { Shield, Lock, Headphones, Globe } from "lucide-react";

const badges = [
  { icon: Shield, label: "99.99% Uptime", desc: "Enterprise SLA guarantee" },
  { icon: Lock, label: "Secure Infrastructure", desc: "DDoS protection & firewalls" },
  { icon: Headphones, label: "24×7 Support", desc: "Expert engineers always on" },
  { icon: Globe, label: "Global Datacenter", desc: "Low-latency network" },
];

const TrustSection = () => {
  return (
    <section className="py-16 bg-background border-b border-border">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-label">Trusted Infrastructure</p>
          <h2 className="font-bold mb-3">
            Trusted Cloud Infrastructure for Businesses
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Powering businesses with reliable, secure, and high-performance cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="text-center p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-300 group"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/12 transition-colors">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-1">{badge.label}</h3>
              <p className="text-sm text-muted-foreground">{badge.desc}</p>
            </div>
          ))}
        </div>

        {/* Customer logos placeholder */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-6">Trusted by growing businesses across India</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["TechStart", "E-Shop India", "Digital Agency", "CloudFirst", "DataPro"].map((name) => (
              <span key={name} className="text-lg font-bold text-foreground/60 font-heading">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
