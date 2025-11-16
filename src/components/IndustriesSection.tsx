import { Building2, ShoppingCart, Heart, Scale, GraduationCap, Code, Palette, Home, Users } from "lucide-react";

const IndustriesSection = () => {
  const industries = [
    { icon: Building2, label: "Startups & MSMEs" },
    { icon: ShoppingCart, label: "E-commerce" },
    { icon: Heart, label: "Healthcare" },
    { icon: Scale, label: "Legal & CA Firms" },
    { icon: GraduationCap, label: "Education" },
    { icon: Code, label: "IT & Developers" },
    { icon: Palette, label: "Agencies" },
    { icon: Users, label: "NGOs" },
    { icon: Home, label: "Real Estate" },
  ];

  return (
    <section className="section-container py-20">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="mb-4">
          Industries <span className="gradient-text">We Serve</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tailored cloud and hosting solutions optimized for your industry's unique needs
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {industries.map((industry, index) => {
          const Icon = industry.icon;
          return (
            <div
              key={industry.label}
              className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-effect">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-center">{industry.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default IndustriesSection;
