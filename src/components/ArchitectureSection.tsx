import { Users, ArrowRight, Network, Server, Database, HardDrive } from "lucide-react";

const steps = [
  { icon: Users, label: "Users", desc: "Website visitors" },
  { icon: Network, label: "Load Balancer", desc: "Traffic distribution" },
  { icon: Server, label: "Cloud Servers", desc: "Compute instances" },
  { icon: Database, label: "Storage", desc: "NVMe SSD volumes" },
  { icon: HardDrive, label: "Backup", desc: "Automated snapshots" },
];

const ArchitectureSection = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary-end))" }}>
            Architecture
          </p>
          <h2 className="font-bold mb-3">How Your Website is Deployed</h2>
          <p className="text-secondary-foreground/60 max-w-xl mx-auto">
            Every deployment on Infinitive Cloud flows through our high-availability infrastructure stack.
          </p>
        </div>

        {/* Desktop flow */}
        <div className="hidden md:flex items-center justify-center gap-2 max-w-5xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center text-center w-36 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300 group-hover:-translate-y-1">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-sm font-semibold font-heading">{step.label}</span>
                  <span className="text-xs text-secondary-foreground/50 mt-0.5">{step.desc}</span>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-primary/40 flex-shrink-0 mb-6" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile flow */}
        <div className="md:hidden flex flex-col items-center gap-1">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex flex-col items-center">
                <div className="flex items-center gap-4 w-64">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-heading">{step.label}</p>
                    <p className="text-xs text-secondary-foreground/50">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-6 bg-primary/20 my-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
