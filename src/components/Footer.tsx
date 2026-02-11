import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "/favicon.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerSections = [{
    title: "Solutions",
    links: [{
      label: "Cloud Solutions",
      path: "/solutions#cloud"
    }, {
      label: "Web Hosting",
      path: "/solutions#hosting"
    }, {
      label: "Domain Services",
      path: "/solutions#domains"
    }, {
      label: "Development",
      path: "/solutions#development"
    }, {
      label: "AI Solutions",
      path: "/solutions#ai"
    }]
  }, {
    title: "Company",
    links: [{
      label: "About Us",
      path: "/about"
    }, {
      label: "Careers",
      path: "/careers"
    }, {
      label: "Blog",
      path: "/blog"
    }, {
      label: "Contact",
      path: "/contact"
    }]
  }, {
    title: "Legal",
    links: [{
      label: "Privacy Policy",
      path: "/privacy"
    }, {
      label: "Terms of Service",
      path: "/terms"
    }, {
      label: "SLA",
      path: "/sla"
    }, {
      label: "Refund Policy",
      path: "/refund"
    }]
  }];
  return <footer className="bg-muted border-t border-border">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative bg-muted p-2 rounded-lg">
                <img src={logo} alt="Infinitive Cloud Logo" className="h-10 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">INFINITIVE CLOUD</span>
                <span className="text-xs font-medium text-muted-foreground">PRIVATE LIMITED</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm text-sm">
              Future-ready cloud, hosting, and AI solutions built for zero downtime and infinite scalability.
            </p>
            <div className="space-y-1 text-xs text-muted-foreground mb-3">
              <p><span className="font-medium">GSTIN:</span> 08AAICI5380A1ZP</p>
              <p><span className="font-medium">CIN:</span> U62020RJ2025PTC109151</p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+917737393087" className="hover:text-primary transition-colors">
                  +91 7737393087
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@infinitivecloud.com" className="hover:text-primary transition-colors">
                  info@infinitivecloud.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:sales@infinitivecloud.com" className="hover:text-primary transition-colors">
                  sales@infinitivecloud.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:ankush@infinitivecloud.com" className="hover:text-primary transition-colors">
                  ankush@infinitivecloud.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Navrangpura, Ahmedabad, India</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map(section => <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => <li key={link.label}>
                    <Link to={link.path} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Infinitive Cloud Private Limited. All rights reserved.
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
    </footer>;
};
export default Footer;