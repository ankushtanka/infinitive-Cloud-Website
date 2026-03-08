import { Server, SlidersHorizontal, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Server,
    title: "Choose Server Type",
    desc: "Select from shared hosting, VPS, dedicated or cloud servers based on your requirements.",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Configure Resources",
    desc: "Customize CPU, RAM, storage and bandwidth to match your workload needs.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Launch Instantly",
    desc: "Deploy your server in minutes and start hosting your website or application.",
  },
];

const DeployStepsSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">How It Works</p>
          <h2 className="font-bold mb-3">Deploy Your Server in Minutes</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get your infrastructure up and running — no complex setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connector arrows (desktop) */}
          <div className="hidden md:block absolute top-10 left-[33%] w-[10%]">
            <div className="flex items-center justify-center">
              <div className="w-full h-px bg-primary/20" />
              <ArrowRight className="w-4 h-4 text-primary/40 -ml-1 flex-shrink-0" />
            </div>
          </div>
          <div className="hidden md:block absolute top-10 left-[63%] w-[10%]">
            <div className="flex items-center justify-center">
              <div className="w-full h-px bg-primary/20" />
              <ArrowRight className="w-4 h-4 text-primary/40 -ml-1 flex-shrink-0" />
            </div>
          </div>

          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative text-center group">
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-5 group-hover:border-primary/30 group-hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "var(--shadow-soft)" }}>
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary/60 tracking-widest uppercase mb-2 block">Step {item.step}</span>
                  <h3 className="text-lg font-semibold font-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeployStepsSection;
