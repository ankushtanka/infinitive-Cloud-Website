import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-icon.png";
import { CONTACT } from "@/config/contact";
import { useCmsMenu } from "@/hooks/use-cms-menu";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const cmsFooterMenu = useCmsMenu("footer");

  // Build CMS footer columns: top-level items with children = columns, flat items = one "Links" column
  const cmsFooterSections = (() => {
    if (!cmsFooterMenu || cmsFooterMenu.items.length === 0) return [];
    const hasColumns = cmsFooterMenu.items.some((i) => i.children.length > 0);
    if (hasColumns) {
      return cmsFooterMenu.items.map((item) => ({
        title: item.label,
        links: item.children.map((c) => ({ label: c.label, path: c.url, target: c.target })),
      }));
    }
    return [{ title: "Links", links: cmsFooterMenu.items.map((i) => ({ label: i.label, path: i.url, target: i.target })) }];
  })();
  const footerSections = [
    {
      title: "Hosting",
      links: [
        { label: "Shared Hosting", path: "/solutions/shared-hosting" },
        { label: "Cloud Hosting", path: "/solutions/cloud-hosting" },
        { label: "WordPress Hosting", path: "/solutions/wordpress-hosting" },
        { label: "VPS Hosting", path: "/solutions/vps-server" },
        { label: "Dedicated Servers", path: "/solutions/dedicated-servers" },
        { label: "Reseller Hosting", path: "/solutions/reseller-hosting" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Domain Registration", path: "/solutions/domains" },
        { label: "SSL Certificates", path: "/solutions/email-security#ssl" },
        { label: "Email Security", path: "/solutions/email-security" },
        { label: "Server Management", path: "/solutions/server-management" },
        { label: "GPU Servers", path: "/solutions/gpu-dedicated-server" },
        { label: "Server Licenses", path: "/solutions/server-licenses" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Pricing", path: "/pricing" },
        { label: "Blog", path: "/blog" },
        { label: "Careers", path: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Refund Policy", path: "/refund" },
        { label: "SLA", path: "/sla" },
      ],
    },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <img src={logo} alt="Infinitive Cloud Logo" className="h-14 w-auto" />
              <div className="flex flex-col">
                <span className="text-lg font-black text-foreground">INFINITIVE <span className="text-primary">CLOUD</span><sup className="text-[0.5em] align-super font-bold text-muted-foreground">™</sup></span>
                <span className="text-xs font-semibold text-foreground/60 tracking-wide">PRIVATE LIMITED</span>
              </div>
            </Link>
            <p className="text-foreground/70 mb-4 max-w-sm text-sm leading-relaxed">
              Premium cloud & web hosting solutions built for speed, security, and scale. Trusted by 1,000+ businesses across India.
            </p>
            <div className="space-y-1 text-xs text-foreground/60 mb-4">
              <p><span className="font-semibold text-foreground/80">GSTIN:</span> {CONTACT.gstin}</p>
              <p><span className="font-semibold text-foreground/80">CIN:</span> {CONTACT.cin}</p>
            </div>
            <div className="space-y-2.5 text-sm text-foreground/75">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href={`tel:${CONTACT.phone}`} className="hover:text-primary transition-colors font-medium">{CONTACT.phoneDisplay}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${CONTACT.email.info}`} className="hover:text-primary transition-colors">{CONTACT.email.info}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${CONTACT.email.sales}`} className="hover:text-primary transition-colors">{CONTACT.email.sales}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{CONTACT.address}</span>
              </div>
            </div>
          </div>

          {[...footerSections, ...cmsFooterSections].map(section => (
            <div key={section.title}>
              <h4 className="font-bold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    {"target" in link && link.target === "_blank" ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.path} className="text-foreground/70 hover:text-primary transition-colors text-sm">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/60">
            © {currentYear} Infinitive Cloud Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-foreground/60">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/sla" className="hover:text-primary transition-colors">SLA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
