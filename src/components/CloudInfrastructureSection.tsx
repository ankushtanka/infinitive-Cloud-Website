import { Users, Globe, Network, Server, HardDrive, DatabaseBackup, ArrowRight } from "lucide-react";

const nodes = [
  { icon: Users, label: "Users", desc: "Website visitors worldwide" },
  { icon: Globe, label: "CDN", desc: "Global content delivery" },
  { icon: Network, label: "Load Balancer", desc: "Intelligent traffic routing" },
  { icon: Server, label: "Cloud Servers", desc: "Auto-scaling compute" },
  { icon: HardDrive, label: "NVMe Storage", desc: "Ultra-fast SSD volumes" },
  { icon: DatabaseBackup, label: "Backup Systems", desc: "Automated daily backups" },
];

const CloudInfrastructureSection = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary-end))" }}>
            Infrastructure
          </p>
          <h2 className="font-bold mb-3">Built on Powerful Cloud Infrastructure</h2>
          <p className="text-secondary-foreground/60 max-w-2xl mx-auto">
            Every request flows through our multi-layered, high-availability stack for maximum performance and reliability.
          </p>
        </div>

        {/* Desktop horizontal */}
        <div className="hidden lg:flex items-start justify-center gap-1 max-w-6xl mx-auto">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.label} className="flex items-center gap-1">
                <div className="flex flex-col items-center text-center w-32 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm font-semibold font-heading mb-0.5">{node.label}</span>
                  <span className="text-[11px] text-secondary-foreground/50 leading-tight">{node.desc}</span>
                </div>
                {i < nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-primary/30 flex-shrink-0 mt-5" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden flex flex-col items-center gap-1">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.label} className="flex flex-col items-center">
                <div className="flex items-center gap-4 w-64">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-heading">{node.label}</p>
                    <p className="text-[11px] text-secondary-foreground/50">{node.desc}</p>
                  </div>
                </div>
                {i < nodes.length - 1 && (
                  <div className="w-px h-5 bg-primary/20 my-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CloudInfrastructureSection;
