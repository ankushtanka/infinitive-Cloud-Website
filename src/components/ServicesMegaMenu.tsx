import { Link } from "react-router-dom";
import { 
  Globe, Server, Cloud, ShieldCheck, Mail, 
  HardDrive, Cpu, Settings, Search, ArrowRightLeft,
  Monitor, Smartphone, Code, Brain, ShoppingCart,
  Layers, Zap, Lock, ArrowRight, Sparkles, 
  Rocket, CircleDot
} from "lucide-react";
import { useState } from "react";

interface ServiceLink {
  label: string;
  path: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

interface ServiceCategory {
  heading: string;
  icon: React.ReactNode;
  color: string;
  links: ServiceLink[];
}

const serviceCategories: ServiceCategory[] = [
  {
    heading: "Hosting",
    icon: <Globe className="w-5 h-5" />,
    color: "from-[hsl(186,100%,53%)] to-[hsl(199,89%,48%)]",
    links: [
      { label: "Web Hosting", path: "/solutions/shared-hosting", description: "Fast & reliable shared hosting", icon: <Globe className="w-5 h-5" />, badge: "Popular" },
      { label: "Cloud Hosting", path: "/solutions/cloud-hosting", description: "Auto-scaling cloud infrastructure", icon: <Cloud className="w-5 h-5" /> },
      { label: "Reseller Hosting", path: "/solutions/reseller-hosting", description: "Start your hosting business", icon: <Layers className="w-5 h-5" /> },
      { label: "WordPress Hosting", path: "/solutions/wordpress-hosting", description: "Managed WordPress platform", icon: <Monitor className="w-5 h-5" /> },
      { label: "WooCommerce", path: "/solutions/wordpress-hosting", description: "Optimized eCommerce hosting", icon: <ShoppingCart className="w-5 h-5" /> },
      { label: "Streaming Servers", path: "/solutions/streaming-servers", description: "Media streaming infrastructure", icon: <Rocket className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Servers",
    icon: <Server className="w-5 h-5" />,
    color: "from-[hsl(217,91%,60%)] to-[hsl(250,80%,60%)]",
    links: [
      { label: "VPS Hosting", path: "/solutions/vps-hosting", description: "Full root access VPS", icon: <HardDrive className="w-5 h-5" />, badge: "Best Value" },
      { label: "Dedicated Servers", path: "/solutions/dedicated-servers", description: "Bare metal performance", icon: <Server className="w-5 h-5" /> },
      { label: "GPU Servers", path: "/solutions/gpu-dedicated-server", description: "AI & ML workloads", icon: <Cpu className="w-5 h-5" /> },
      { label: "Server Management", path: "/solutions/server-management", description: "24/7 expert management", icon: <Settings className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Domains",
    icon: <Search className="w-5 h-5" />,
    color: "from-[hsl(160,84%,39%)] to-[hsl(186,100%,53%)]",
    links: [
      { label: "Domain Registration", path: "/solutions/domains", description: "Register your perfect domain", icon: <Globe className="w-5 h-5" /> },
      { label: "Domain Search", path: "/solutions/domains#search", description: "Find available domains", icon: <Search className="w-5 h-5" /> },
      { label: "Domain Transfer", path: "/solutions/domains#transfer", description: "Seamless domain transfers", icon: <ArrowRightLeft className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Security",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "from-[hsl(45,93%,47%)] to-[hsl(25,95%,53%)]",
    links: [
      { label: "SSL Certificates", path: "/solutions/ssl-certificates", description: "Encrypt & protect your site", icon: <Lock className="w-5 h-5" /> },
      { label: "Zoho Email", path: "/solutions/ssl-certificates", description: "Professional business email", icon: <Mail className="w-5 h-5" /> },
      { label: "Microsoft 365", path: "/solutions/ssl-certificates", description: "Full productivity suite", icon: <Monitor className="w-5 h-5" /> },
      { label: "Google Workspace", path: "/solutions/ssl-certificates", description: "Collaborate with Google", icon: <Zap className="w-5 h-5" /> },
    ],
  },
  {
    heading: "Solutions",
    icon: <Brain className="w-5 h-5" />,
    color: "from-[hsl(280,80%,55%)] to-[hsl(320,80%,55%)]",
    links: [
      { label: "Web Development", path: "/solutions/web-development", description: "Custom websites & apps", icon: <Code className="w-5 h-5" /> },
      { label: "Mobile Apps", path: "/solutions/mobile-apps", description: "iOS & Android apps", icon: <Smartphone className="w-5 h-5" /> },
      { label: "AI Solutions", path: "/solutions/ai-solutions", description: "Intelligent automation", icon: <Brain className="w-5 h-5" />, badge: "New" },
      { label: "Odoo ERP", path: "/solutions/odoo-solutions", description: "Business process automation", icon: <Layers className="w-5 h-5" /> },
    ],
  },
];

interface ServicesMegaMenuProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ServicesMegaMenu = ({ onClose, onMouseEnter, onMouseLeave }: ServicesMegaMenuProps) => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div 
      className="fixed inset-x-0 top-20 z-50"
      style={{ animation: "fade-in 0.25s ease-out" }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 h-screen bg-foreground/50 backdrop-blur-[2px]" onClick={onClose} />
      
      {/* Menu Container - Full width dark design */}
      <div 
        className="relative w-full bg-[hsl(222,47%,8%)] border-b border-[hsl(220,30%,18%)] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
      >
        {/* Subtle gradient accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(186,100%,53%)] to-transparent opacity-60" />
        
        <div className="max-w-[1400px] 2xl:max-w-[1536px] mx-auto px-6 2xl:px-12 py-8">
          {/* Categories Grid */}
          <div className="grid grid-cols-5 gap-8">
            {serviceCategories.map((category) => (
              <div key={category.heading} className="flex flex-col">
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[hsl(220,30%,15%)]">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                    {category.icon}
                  </div>
                  <h3 className="text-[15px] font-black text-white tracking-tight">{category.heading}</h3>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-0.5">
                  {category.links.map((link) => (
                    <Link
                      key={link.path + link.label}
                      to={link.path}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="group relative flex items-center gap-2.5 px-2.5 py-2.5 rounded-lg transition-all duration-200 hover:bg-[hsl(220,30%,13%)]"
                    >
                      {/* Hover glow effect */}
                      {hoveredLink === link.label && (
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[hsl(186,100%,53%,0.05)] to-transparent pointer-events-none" />
                      )}
                      
                      <div className={`relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300 ${
                        hoveredLink === link.label 
                          ? `bg-gradient-to-br ${category.color} text-white shadow-md scale-105` 
                          : "bg-[hsl(220,30%,15%)] text-[hsl(220,20%,55%)] group-hover:text-white"
                      }`}>
                        {link.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-sm font-semibold transition-colors duration-200 ${
                            hoveredLink === link.label ? "text-[hsl(186,100%,70%)]" : "text-[hsl(220,20%,80%)] group-hover:text-white"
                          }`}>
                            {link.label}
                          </span>
                          {link.badge && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                              link.badge === "New" 
                                ? "bg-[hsl(280,80%,55%,0.2)] text-[hsl(280,80%,70%)]"
                                : link.badge === "Popular"
                                ? "bg-[hsl(186,100%,53%,0.15)] text-[hsl(186,100%,65%)]"
                                : "bg-[hsl(217,91%,60%,0.15)] text-[hsl(217,91%,70%)]"
                            }`}>
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[hsl(220,15%,45%)] leading-tight block mt-0.5 group-hover:text-[hsl(220,15%,55%)] transition-colors">
                          {link.description}
                        </span>
                      </div>

                      <ArrowRight className={`w-3.5 h-3.5 transition-all duration-200 ${
                        hoveredLink === link.label 
                          ? "opacity-100 translate-x-0 text-[hsl(186,100%,65%)]" 
                          : "opacity-0 -translate-x-1"
                      }`} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-6 pt-5 border-t border-[hsl(220,30%,13%)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(186,100%,53%)]" />
              <span className="text-sm text-[hsl(220,20%,60%)]">
                Need help choosing?{" "}
                <Link to="/contact" onClick={onClose} className="font-bold text-[hsl(186,100%,60%)] hover:text-[hsl(186,100%,70%)] transition-colors">
                  Talk to an expert
                  <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </Link>
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span className="flex items-center gap-1.5 text-[hsl(220,20%,55%)]">
                <CircleDot className="w-3.5 h-3.5 text-[hsl(150,80%,50%)]" />
                <span className="text-[hsl(150,80%,60%)] font-semibold">99.9%</span> Uptime
              </span>
              <span className="flex items-center gap-1.5 text-[hsl(220,20%,55%)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[hsl(186,100%,53%)]" /> Free SSL
              </span>
              <span className="flex items-center gap-1.5 text-[hsl(220,20%,55%)]">
                <Zap className="w-3.5 h-3.5 text-[hsl(45,93%,55%)]" /> NVMe SSD
              </span>
              <span className="flex items-center gap-1.5 text-[hsl(220,20%,55%)]">
                <Globe className="w-3.5 h-3.5 text-[hsl(186,100%,53%)]" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMegaMenu;
