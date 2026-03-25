import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "/favicon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerSections = [
    {
      title: "Hosting",
      links: [
        { label: "Shared Hosting", path: "/solutions/shared-hosting" },
        { label: "Cloud Hosting", path: "/solutions/cloud-hosting" },
        { label: "WordPress Hosting", path: "/solutions/wordpress-hosting" },
        { label: "Reseller Hosting", path: "/solutions/reseller-hosting" },
      ],
    },
    {
      title: "Infrastructure",
      links: [
        { label: "VPS Hosting", path: "/solutions/vps-hosting" },
        { label: "Dedicated Servers", path: "/solutions/dedicated-servers" },
        { label: "GPU Servers", path: "/solutions/gpu-dedicated-server" },
        { label: "Server Management", path: "/solutions/server-management" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Pricing", path: "/pricing" },
        { label: "Contact", path: "/contact" },
        { label: "Careers", path: "/careers" },
        { label: "SLA & Uptime", path: "/sla" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Refund Policy", path: "/refund" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border" style={{ background: "var(--gradient-hero)" }}>
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <img src={logo} alt="Infinitive Cloud Logo" className="h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-lg font-black text-primary-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                  INFINITIVE <span className="text-accent">CLOUD</span><sup className="text-[0.5em] align-super font-bold text-primary-foreground/50">™</sup>
                </span>
                <span className="text-xs font-medium text-primary-foreground/40 tracking-wide">PRIVATE LIMITED</span>
              </div>
            </Link>
            <p className="text-primary-foreground/50 mb-5 max-w-sm text-sm leading-relaxed">
              Based in India. Serving the world. We're proud to power founders, e-commerce brands, and agencies who demand more than a hosting account.
            </p>
            <div className="space-y-1 text-xs text-primary-foreground/30 mb-5">
              <p><span className="font-semibold text-primary-foreground/50">GSTIN:</span> 08AAICI5380A1ZP</p>
              <p><span className="font-semibold text-primary-foreground/50">CIN:</span> U62020RJ2025PTC109151</p>
            </div>
            <div className="space-y-2.5 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+918690393087" className="hover:text-accent transition-colors">+91 8690393087</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:info@infinitivecloud.com" className="hover:text-accent transition-colors">info@infinitivecloud.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Navrangpura, Ahmedabad, India</span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/contact">
                <Button className="btn-gold-outline text-xs h-9 px-5">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>

          {footerSections.map(section => (
            <div key={section.title}>
              <h4 className="font-semibold text-primary-foreground/80 mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/30">
            © {currentYear} Infinitive Cloud Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/30">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/sla" className="hover:text-accent transition-colors">SLA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
