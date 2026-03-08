import { ShieldCheck, Flame, HardDrive, Lock } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "DDoS Protection", desc: "Enterprise-grade DDoS mitigation protects your servers from volumetric and application-layer attacks." },
  { icon: Flame, title: "Advanced Firewall", desc: "Multi-layered firewall with custom rules, IP whitelisting, and real-time threat blocking." },
  { icon: HardDrive, title: "Automated Backups", desc: "Daily automated backups with one-click restore and off-site disaster recovery." },
  { icon: Lock, title: "Secure Infrastructure", desc: "ISO-certified data centres with physical security, encrypted storage, and access controls." },
];

const SecuritySection = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      <div className="section-container relative z-10">
        <div className="text-center mb-14">
          <p className="section-label" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary-end))" }}>
            Security
          </p>
          <h2 className="font-bold mb-3 text-primary-foreground">Enterprise Level Security</h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Multi-layered security protects your data at every level of the infrastructure stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm hover:bg-primary-foreground/10 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2 font-heading text-primary-foreground">{item.title}</h3>
                <p className="text-sm text-primary-foreground/50 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
