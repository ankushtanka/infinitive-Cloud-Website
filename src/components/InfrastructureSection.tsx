import { HardDrive, Wifi, Shield, Database } from "lucide-react";

const features = [
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "Blazing-fast read/write speeds for optimal performance." },
  { icon: Wifi, title: "High Speed Network", desc: "Multi-gigabit network with redundant upstream providers." },
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade DDoS mitigation on all servers." },
  { icon: Database, title: "Automated Backups", desc: "Daily automated backups with one-click restore." },
];

const InfrastructureSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">Infrastructure</p>
          <h2 className="font-bold mb-3">
            Built on High Performance Infrastructure
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every component of our stack is optimized for speed, reliability, and security.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="text-center p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-300 group"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
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

export default InfrastructureSection;
