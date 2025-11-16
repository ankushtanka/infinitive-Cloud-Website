import { Link } from "react-router-dom";
import { Cloud, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Solutions",
      links: [
        { label: "Cloud Services", path: "/solutions" },
        { label: "Web Hosting", path: "/solutions" },
        { label: "Development", path: "/solutions" },
        { label: "AI Solutions", path: "/solutions" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Our Divisions", path: "/solutions" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", path: "#" },
        { label: "Support Center", path: "#" },
        { label: "Blog", path: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-muted border-t border-border">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Cloud className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">Infinitive Cloud</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Future-ready cloud, hosting, and AI solutions built for zero downtime and infinite scalability.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@infinitivecloud.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Global Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Infinitive Cloud. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
