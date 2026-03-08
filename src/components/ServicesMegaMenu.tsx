import { Link } from "react-router-dom";
import { 
  Globe, Server, Cloud, ShieldCheck, Mail, 
  HardDrive, Cpu, Settings, Search, ArrowRightLeft,
  Monitor, Smartphone, Code, Brain, ShoppingCart,
  Layers, Zap, Lock, ArrowRight
} from "lucide-react";
import { useState } from "react";

interface ServiceLink {
  label: string;
  path: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceCategory {
  heading: string;
  icon: React.ReactNode;
  description: string;
  links: ServiceLink[];
}

const serviceCategories: ServiceCategory[] = [
  {
    heading: "Hosting",
    icon: <Globe className="w-6 h-6" />,
    description: "Fast, reliable hosting for every need",
    links: [
      { label: "Web Hosting", path: "/solutions/shared-hosting", description: "Perfect for small websites & blogs", icon: <Globe className="w-5 h-5" /> },
      { label: "Cloud Hosting", path: "/solutions/cloud-hosting", description: "Scalable cloud infrastructure", icon: <Cloud className="w-5 h-5" /> },
      { label: "Reseller Hosting", path: "/solutions/reseller-hosting", description: "Start your own hosting business", icon: <Layers className="w-5 h-5" /> },
      { label: "WordPress Hosting", path: "/solutions/wordpress-hosting", description: "Optimized for WordPress sites", icon: <Monitor className="w-5 h-5" /> },
      { label: "WooCommerce Hosting", path: "/solutions/woocommerce-hosting", description: "Powerful eCommerce hosting", icon: <ShoppingCart className="w-5 h-5" /> },
      { label: "Node.js Hosting", path: "/solutions/nodejs-hosting", description: "Deploy Node.js apps easily", icon: <Code className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Servers",
    icon: <Server className="w-6 h-6" />,
    description: "Enterprise-grade server solutions",
    links: [
      { label: "VPS Server", path: "/solutions/vps-server", description: "Virtual private servers with full root access", icon: <HardDrive className="w-5 h-5" /> },
      { label: "Dedicated Server", path: "/solutions/dedicated-servers", description: "Bare metal performance & control", icon: <Server className="w-5 h-5" /> },
      { label: "GPU Server", path: "/solutions/gpu-dedicated-server", description: "High-performance GPU computing", icon: <Cpu className="w-5 h-5" /> },
      { label: "Server Management", path: "/solutions/server-management", description: "Expert managed server support", icon: <Settings className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Domains",
    icon: <Search className="w-6 h-6" />,
    description: "Find & manage your perfect domain",
    links: [
      { label: "Domain Registration", path: "/solutions/domains", description: "Register your domain name", icon: <Globe className="w-5 h-5" /> },
      { label: "Domain Search", path: "/solutions/domains#search", description: "Find available domain names", icon: <Search className="w-5 h-5" /> },
      { label: "Domain Transfer", path: "/solutions/domains#transfer", description: "Transfer domains seamlessly", icon: <ArrowRightLeft className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Email & Security",
    icon: <ShieldCheck className="w-6 h-6" />,
    description: "Secure email & SSL solutions",
    links: [
      { label: "Zoho Email", path: "/solutions/email-security#zoho", description: "Professional email by Zoho", icon: <Mail className="w-5 h-5" /> },
      { label: "Microsoft 365", path: "/solutions/email-security#office365", description: "Productivity suite by Microsoft", icon: <Monitor className="w-5 h-5" /> },
      { label: "Google Workspace", path: "/solutions/email-security#workspace", description: "Business tools by Google", icon: <Zap className="w-5 h-5" /> },
      { label: "SSL Certificates", path: "/solutions/email-security#ssl", description: "Encrypt & secure your site", icon: <Lock className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Solutions",
    icon: <Brain className="w-6 h-6" />,
    description: "Custom development & AI",
    links: [
      { label: "Web Development", path: "/solutions/web-development", description: "Custom website development", icon: <Code className="w-5 h-5" /> },
      { label: "Mobile Apps", path: "/solutions/mobile-apps", description: "iOS & Android development", icon: <Smartphone className="w-5 h-5" /> },
      { label: "AI Solutions", path: "/solutions/ai-solutions", description: "Intelligent AI integrations", icon: <Brain className="w-5 h-5" /> },
      { label: "Odoo Solutions", path: "/solutions/odoo-solutions", description: "ERP & business automation", icon: <Layers className="w-5 h-5" /> },
    ],
  },
];

interface ServicesMegaMenuProps {
  onClose: () => void;
}

const ServicesMegaMenu = ({ onClose }: ServicesMegaMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(serviceCategories[0].heading);
  const activeData = serviceCategories.find(c => c.heading === activeCategory);

  return (
    <div 
      className="fixed inset-x-0 top-20 z-50 animate-fade-in"
      style={{ animationDuration: "0.2s" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 h-screen bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu Container */}
      <div className="relative mx-auto max-w-[1400px] px-4">
        <div className="bg-background rounded-2xl border border-border shadow-[var(--shadow-strong)] overflow-hidden">
          <div className="flex min-h-[420px]">
            {/* Left sidebar - Categories */}
            <div className="w-[280px] bg-muted/50 border-r border-border p-4 flex flex-col gap-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-3 py-2 mb-1">
                Our Services
              </p>
              {serviceCategories.map((category) => (
                <button
                  key={category.heading}
                  onMouseEnter={() => setActiveCategory(category.heading)}
                  onClick={() => setActiveCategory(category.heading)}
                  className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeCategory === category.heading
                      ? "bg-background shadow-[var(--shadow-medium)] text-foreground"
                      : "text-foreground/70 hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    activeCategory === category.heading
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[var(--shadow-soft)]"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}>
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-[15px] block">{category.heading}</span>
                    <span className="text-xs text-muted-foreground truncate block">{category.description}</span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-all duration-200 ${
                    activeCategory === category.heading
                      ? "opacity-100 translate-x-0 text-primary"
                      : "opacity-0 -translate-x-2"
                  }`} />
                </button>
              ))}
            </div>

            {/* Right content - Service links */}
            <div className="flex-1 p-6">
              {activeData && (
                <div key={activeData.heading} className="animate-fade-in" style={{ animationDuration: "0.15s" }}>
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      {activeData.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-foreground">{activeData.heading}</h3>
                      <p className="text-sm text-muted-foreground">{activeData.description}</p>
                    </div>
                  </div>

                  {/* Links grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {activeData.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={onClose}
                        className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-muted/80 hover:shadow-[var(--shadow-soft)]"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-muted-foreground transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-primary-foreground group-hover:shadow-[var(--shadow-soft)] group-hover:scale-110">
                          {link.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[15px] text-foreground group-hover:text-primary transition-colors duration-200 flex items-center gap-1">
                            {link.label}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </span>
                          <span className="text-xs text-muted-foreground leading-relaxed block mt-0.5">{link.description}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border bg-muted/30 px-6 py-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Need help choosing? <Link to="/contact" onClick={onClose} className="font-bold text-primary hover:underline">Talk to an expert →</Link>
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-primary" /> 99.9% Uptime</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> Free SSL</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-primary" /> 24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
