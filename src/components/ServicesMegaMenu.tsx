import { Link } from "react-router-dom";
import { 
  Globe, Server, Cloud, ShieldCheck, Mail, 
  HardDrive, Cpu, Settings, Search, ArrowRightLeft,
  Monitor, Smartphone, Code, Brain, ShoppingCart,
  Layers, Zap, Lock, ArrowRight, ExternalLink
} from "lucide-react";
import { useState } from "react";

interface ServiceLink {
  label: string;
  path: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
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
      { label: "Web Hosting", path: "/solutions/shared-hosting", description: "Perfect for small websites & blogs", icon: <Globe className="w-5 h-5" />, features: ["Free SSL", "1-Click Install", "99.9% Uptime"] },
      { label: "Cloud Hosting", path: "/solutions/cloud-hosting", description: "Scalable cloud infrastructure", icon: <Cloud className="w-5 h-5" />, features: ["Auto Scaling", "SSD Storage", "Daily Backups"] },
      { label: "Reseller Hosting", path: "/solutions/reseller-hosting", description: "Start your own hosting business", icon: <Layers className="w-5 h-5" />, features: ["WHM/cPanel", "White Label", "Free Migration"] },
      { label: "WordPress Hosting", path: "/solutions/wordpress-hosting", description: "Optimized for WordPress sites", icon: <Monitor className="w-5 h-5" />, features: ["LiteSpeed", "WP-CLI", "Staging"] },
      { label: "WooCommerce Hosting", path: "/solutions/woocommerce-hosting", description: "Powerful eCommerce hosting", icon: <ShoppingCart className="w-5 h-5" />, features: ["PCI Compliant", "Fast Checkout", "CDN"] },
      { label: "Node.js Hosting", path: "/solutions/nodejs-hosting", description: "Deploy Node.js apps easily", icon: <Code className="w-5 h-5" />, features: ["SSH Access", "Git Deploy", "PM2 Ready"] },
    ],
  },
  {
    heading: "Servers",
    icon: <Server className="w-6 h-6" />,
    description: "Enterprise-grade server solutions",
    links: [
      { label: "VPS Server", path: "/solutions/vps-server", description: "Virtual private servers with full root access", icon: <HardDrive className="w-5 h-5" />, features: ["Full Root", "KVM/OpenVZ", "SSD NVMe"] },
      { label: "Dedicated Server", path: "/solutions/dedicated-servers", description: "Bare metal performance & control", icon: <Server className="w-5 h-5" />, features: ["Bare Metal", "IPMI Access", "DDoS Protection"] },
      { label: "GPU Server", path: "/solutions/gpu-dedicated-server", description: "High-performance GPU computing", icon: <Cpu className="w-5 h-5" />, features: ["NVIDIA GPUs", "ML Ready", "High VRAM"] },
      { label: "Server Management", path: "/solutions/server-management", description: "Expert managed server support", icon: <Settings className="w-5 h-5" />, features: ["24/7 Monitoring", "Patch Mgmt", "Hardening"] },
    ],
  },
  {
    heading: "Domains",
    icon: <Search className="w-6 h-6" />,
    description: "Find & manage your perfect domain",
    links: [
      { label: "Domain Registration", path: "/solutions/domains", description: "Register your domain name", icon: <Globe className="w-5 h-5" />, features: ["500+ TLDs", "Free WHOIS", "DNS Mgmt"] },
      { label: "Domain Search", path: "/solutions/domains#search", description: "Find available domain names", icon: <Search className="w-5 h-5" />, features: ["Instant Search", "Bulk Check", "Suggestions"] },
      { label: "Domain Transfer", path: "/solutions/domains#transfer", description: "Transfer domains seamlessly", icon: <ArrowRightLeft className="w-5 h-5" />, features: ["Free Transfer", "No Downtime", "1yr Extension"] },
    ],
  },
  {
    heading: "Email & Security",
    icon: <ShieldCheck className="w-6 h-6" />,
    description: "Secure email & SSL solutions",
    links: [
      { label: "Zoho Email", path: "/solutions/email-security#zoho", description: "Professional email by Zoho", icon: <Mail className="w-5 h-5" />, features: ["5GB/User", "Ad-Free", "Custom Domain"] },
      { label: "Microsoft 365", path: "/solutions/email-security#office365", description: "Productivity suite by Microsoft", icon: <Monitor className="w-5 h-5" />, features: ["Teams", "OneDrive", "Office Apps"] },
      { label: "Google Workspace", path: "/solutions/email-security#workspace", description: "Business tools by Google", icon: <Zap className="w-5 h-5" />, features: ["Gmail", "Drive", "Meet"] },
      { label: "SSL Certificates", path: "/solutions/email-security#ssl", description: "Encrypt & secure your site", icon: <Lock className="w-5 h-5" />, features: ["DV/OV/EV", "Wildcard", "Auto Renew"] },
    ],
  },
  {
    heading: "Solutions",
    icon: <Brain className="w-6 h-6" />,
    description: "Custom development & AI",
    links: [
      { label: "Web Development", path: "/solutions/web-development", description: "Custom website development", icon: <Code className="w-5 h-5" />, features: ["React/Next.js", "SEO Ready", "Responsive"] },
      { label: "Mobile Apps", path: "/solutions/mobile-apps", description: "iOS & Android development", icon: <Smartphone className="w-5 h-5" />, features: ["Cross-Platform", "UI/UX", "App Store"] },
      { label: "AI Solutions", path: "/solutions/ai-solutions", description: "Intelligent AI integrations", icon: <Brain className="w-5 h-5" />, features: ["ChatBots", "ML Models", "Automation"] },
      { label: "Odoo Solutions", path: "/solutions/odoo-solutions", description: "ERP & business automation", icon: <Layers className="w-5 h-5" />, features: ["CRM", "Inventory", "Accounting"] },
    ],
  },
];

interface ServicesMegaMenuProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ServicesMegaMenu = ({ onClose, onMouseEnter, onMouseLeave }: ServicesMegaMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(serviceCategories[0].heading);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const activeData = serviceCategories.find(c => c.heading === activeCategory);

  return (
    <div 
      className="fixed inset-x-0 top-20 z-50 animate-fade-in"
      style={{ animationDuration: "0.2s" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 h-screen bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu Container */}
      <div className="relative mx-auto max-w-[1400px] px-4" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
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
                  onMouseEnter={() => { setActiveCategory(category.heading); setHoveredLink(null); }}
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
            <div className="flex-1 p-6 flex flex-col">
              {activeData && (
                <div key={activeData.heading} className="animate-fade-in flex-1 flex flex-col" style={{ animationDuration: "0.15s" }}>
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
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    {activeData.links.map((link, index) => {
                      const isHovered = hoveredLink === link.path;
                      const hasSiblingHovered = hoveredLink !== null && hoveredLink !== link.path;

                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={onClose}
                          onMouseEnter={() => setHoveredLink(link.path)}
                          onMouseLeave={() => setHoveredLink(null)}
                          className={`group relative flex flex-col p-3.5 rounded-xl transition-all duration-300 ease-out overflow-hidden ${
                            isHovered
                              ? "bg-primary/[0.06] shadow-[0_0_0_1px_hsl(var(--primary)/0.2),var(--shadow-soft)] scale-[1.02] z-10"
                              : hasSiblingHovered
                                ? "opacity-60 scale-[0.98]"
                                : "hover:bg-muted/80"
                          }`}
                          style={{
                            animationDelay: `${index * 40}ms`,
                            animationFillMode: "both",
                          }}
                        >
                          {/* Animated gradient border on hover */}
                          <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
                            isHovered ? "opacity-100" : "opacity-0"
                          }`}>
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" 
                              style={{ 
                                transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                                transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                              }} 
                            />
                          </div>

                          <div className="flex items-start gap-3">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-400 ease-out ${
                              isHovered
                                ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[0_4px_12px_hsl(var(--primary)/0.3)] scale-110 rotate-3"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {link.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={`font-bold text-[15px] flex items-center gap-1.5 transition-colors duration-200 ${
                                isHovered ? "text-primary" : "text-foreground"
                              }`}>
                                {link.label}
                                <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ease-out ${
                                  isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                                }`} />
                              </span>
                              <span className="text-xs text-muted-foreground leading-relaxed block mt-0.5">{link.description}</span>
                            </div>
                          </div>

                          {/* Feature tags - reveal on hover */}
                          {link.features && (
                            <div className={`flex flex-wrap gap-1.5 mt-2.5 ml-[52px] transition-all duration-400 ease-out ${
                              isHovered 
                                ? "opacity-100 max-h-20 translate-y-0" 
                                : "opacity-0 max-h-0 -translate-y-2 overflow-hidden"
                            }`}>
                              {link.features.map((feature, fi) => (
                                <span 
                                  key={feature}
                                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold tracking-wide border border-primary/15"
                                  style={{ 
                                    transitionDelay: isHovered ? `${fi * 60}ms` : "0ms",
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? "translateY(0)" : "translateY(-4px)",
                                    transition: "opacity 0.25s ease-out, transform 0.25s ease-out"
                                  }}
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                        </Link>
                      );
                    })}
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
