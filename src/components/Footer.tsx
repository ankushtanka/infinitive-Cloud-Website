import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "/favicon.png";

const footerSections = [
  {
    title: "Products",
    links: [
      { label: "Shared Hosting", path: "/solutions/shared-hosting" },
      { label: "VPS Servers", path: "/solutions/vps-hosting" },
      { label: "Dedicated Servers", path: "/solutions/dedicated-servers" },
      { label: "Cloud Servers", path: "/solutions/cloud-hosting" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Cloud Deployment", path: "/solutions/cloud-hosting" },
      { label: "Server Management", path: "/solutions/server-management" },
      { label: "Website Migration", path: "/solutions/cloud-migration" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", path: "/blog" },
      { label: "Knowledgebase", path: "/knowledgebase" },
      { label: "SLA", path: "/sla" },
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="section-container py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Infinitive Cloud Logo" className="h-8 w-auto" />
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight font-heading">INFINITIVE CLOUD</span>
                <span className="text-[8px] font-medium text-secondary-foreground/50 tracking-wider">PRIVATE LIMITED</span>
              </div>
            </Link>
            <p className="text-secondary-foreground/60 text-sm mb-4 max-w-xs leading-relaxed">
              Enterprise-grade cloud & web hosting infrastructure trusted by businesses across India.
            </p>
            <div className="space-y-2 text-sm text-secondary-foreground/60">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <a href="tel:+917737393087" className="hover:text-primary transition-colors">+91 7737393087</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <a href="mailto:info@infinitivecloud.com" className="hover:text-primary transition-colors">info@infinitivecloud.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Ahmedabad, India</span>
              </div>
            </div>
            <div className="mt-3 space-y-0.5 text-xs text-secondary-foreground/40">
              <p><span className="font-medium">GSTIN:</span> 08AAICI5380A1ZP</p>
              <p><span className="font-medium">CIN:</span> U62020RJ2025PTC109151</p>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-4 font-heading">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary-foreground/40">
            © {currentYear} Infinitive Cloud Private Limited. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-secondary-foreground/40">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/sla" className="hover:text-primary transition-colors">SLA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
