import { Link } from "react-router-dom";
import {
  Monitor, Cloud, Database, Code2, Package, Layers,
  Globe, Server, Cpu, Mail, ShieldCheck, Brain, Smartphone,
} from "lucide-react";

interface DropdownItem {
  icon: React.ReactNode;
  label: string;
  desc: string;
  path: string;
}

interface Section {
  heading: string;
  items: DropdownItem[];
}

const sections: Section[] = [
  {
    heading: "HOST AND DEPLOY",
    items: [
      {
        icon: <Monitor className="w-4 h-4" />,
        label: "Web hosting",
        desc: "Host any site quickly, easily, and securely",
        path: "/solutions/shared-hosting",
      },
      {
        icon: <Cloud className="w-4 h-4" />,
        label: "Cloud hosting",
        desc: "Scale with more power and resources",
        path: "/solutions/cloud-hosting",
      },
      {
        icon: <Database className="w-4 h-4" />,
        label: "VPS hosting",
        desc: "Get full control with AI-managed VPS",
        path: "/solutions/vps-server",
      },
      {
        icon: <Code2 className="w-4 h-4" />,
        label: "Node.js apps",
        desc: "Deploy and run modern web apps instantly",
        path: "/solutions/nodejs-hosting",
      },
      {
        icon: <Package className="w-4 h-4" />,
        label: "Application catalog",
        desc: "Deploy open-source apps in seconds",
        path: "/solutions/reseller-hosting",
      },
      {
        icon: <Layers className="w-4 h-4" />,
        label: "Agency hosting",
        desc: "Manage multiple sites professionally",
        path: "/solutions/reseller-hosting",
      },
    ],
  },
  {
    heading: "DOMAINS",
    items: [
      {
        icon: <Globe className="w-4 h-4" />,
        label: "Domain name search",
        desc: "Find the perfect domain name",
        path: "/solutions/domains",
      },
    ],
  },
  {
    heading: "SERVERS & SECURITY",
    items: [
      {
        icon: <Server className="w-4 h-4" />,
        label: "Dedicated servers",
        desc: "Bare metal performance and full control",
        path: "/solutions/dedicated-servers",
      },
      {
        icon: <Cpu className="w-4 h-4" />,
        label: "GPU servers",
        desc: "High-performance computing for AI & ML",
        path: "/solutions/gpu-dedicated-server",
      },
      {
        icon: <ShieldCheck className="w-4 h-4" />,
        label: "SSL certificates",
        desc: "Encrypt and secure your website",
        path: "/solutions/ssl-certificates",
      },
      {
        icon: <Mail className="w-4 h-4" />,
        label: "Email & security",
        desc: "Professional email and spam protection",
        path: "/solutions/email-security",
      },
    ],
  },
  {
    heading: "DEVELOPMENT",
    items: [
      {
        icon: <Brain className="w-4 h-4" />,
        label: "AI solutions",
        desc: "Intelligent AI integrations for your business",
        path: "/solutions/ai-solutions",
      },
      {
        icon: <Smartphone className="w-4 h-4" />,
        label: "Mobile apps",
        desc: "iOS & Android app development",
        path: "/solutions/mobile-apps",
      },
    ],
  },
];

interface ServicesDropdownProps {
  onClose: () => void;
}

const ServicesDropdown = ({ onClose }: ServicesDropdownProps) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-[300px] bg-background border border-border rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden z-[100] animate-fade-in">
      {sections.map((section, idx) => (
        <div key={section.heading}>
          {idx > 0 && <div className="border-t border-border/60 mx-3" />}
          <div className={`px-3 ${idx === 0 ? "pt-4" : "pt-3"} pb-2`}>
            <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground mb-2 px-2">
              {section.heading}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.path + item.label}
                  to={item.path}
                  onClick={onClose}
                  className="group flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted transition-all duration-150"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted group-hover:bg-primary/10 border border-border/50 group-hover:border-primary/20 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-snug mt-0.5 truncate">
                      {item.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="pb-3" />
    </div>
  );
};

export default ServicesDropdown;
