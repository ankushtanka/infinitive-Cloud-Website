import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-icon.png";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";

const serviceLinks = [
  {
    heading: "Hosting",
    links: [
      { label: "Web Hosting", path: "/solutions/shared-hosting" },
      { label: "Cloud Hosting", path: "/solutions/cloud-hosting" },
      { label: "Reseller Hosting", path: "/solutions/reseller-hosting" },
      { label: "WordPress Hosting", path: "/solutions/wordpress-hosting" },
      { label: "WooCommerce Hosting", path: "/solutions/woocommerce-hosting" },
      { label: "Node.js Hosting", path: "/solutions/nodejs-hosting" },
    ],
  },
  {
    heading: "Servers",
    links: [
      { label: "VPS Server", path: "/solutions/vps-server" },
      { label: "Dedicated Server", path: "/solutions/dedicated-servers" },
      { label: "GPU Server", path: "/solutions/gpu-dedicated-server" },
      { label: "Server Management", path: "/solutions/server-management" },
    ],
  },
  {
    heading: "Domains",
    links: [
      { label: "Domain Registration", path: "/solutions/domains" },
      { label: "Domain Search", path: "/solutions/domains#search" },
      { label: "Domain Transfer", path: "/solutions/domains#transfer" },
    ],
  },
  {
    heading: "Email & Security",
    links: [
      { label: "Zoho Email", path: "/solutions/email-security#zoho" },
      { label: "Microsoft 365", path: "/solutions/email-security#office365" },
      { label: "Google Workspace", path: "/solutions/email-security#workspace" },
      { label: "SSL Certificates", path: "/solutions/email-security#ssl" },
    ],
  },
];

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileSubDropdown, setMobileSubDropdown] = useState<string | null>(null);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const isHome = location.pathname === "/";

  const desktopLinks = isHome
    ? [{ label: "__SERVICES__", path: "" }, ...navLinks.filter(l => l.label !== "Home")]
    : [navLinks[0], { label: "__SERVICES__", path: "" }, ...navLinks.slice(1)];

  const handleCloseMenus = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServiceOpen(false);
    setMobileSubDropdown(null);
  };

  useEffect(() => {
    handleCloseMenus();
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-soft">
        <div className="section-container">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group" onClick={handleCloseMenus}>
              <div className="relative">
                <div className="absolute inset-0 bg-background rounded-xl" />
                <img src={logo} alt="Infinitive Cloud Logo" className="h-12 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-foreground tracking-tight">INFINITIVE CLOUD</span>
                <span className="text-[10px] font-medium text-muted-foreground tracking-wide">PRIVATE LIMITED</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-1 relative">
              {desktopLinks.map((link) => {
                if (link.label === "__SERVICES__") {
                  return (
                    <button
                      key="services-trigger"
                      className="relative px-4 py-2 text-foreground/70 hover:text-foreground font-bold text-[15px] flex items-center gap-1 group transition-all duration-200"
                      onMouseEnter={() => setServicesOpen(true)}
                      onClick={() => setServicesOpen(prev => !prev)}
                    >
                      Services
                      <ChevronDown className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </button>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleCloseMenus}
                    className="relative px-4 py-2 text-foreground/70 hover:text-foreground transition-all font-bold text-[15px] group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>
                );
              })}
              <Link to="/contact" className="ml-4" onClick={handleCloseMenus}>
                <Button className="btn-gradient glow-effect shadow-medium">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Menu */}
      {servicesOpen && (
        <ServicesMegaMenu onClose={() => setServicesOpen(false)} />
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background z-[60] overflow-y-auto">
          <div className="flex flex-col gap-2 px-6 py-6">
            {/* Services Accordion */}
            <div className="flex flex-col">
              <button
                className="flex items-center justify-between text-foreground font-bold py-4 px-4 rounded-lg text-lg hover:text-primary transition-colors"
                onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                aria-expanded={mobileServiceOpen}
                type="button"
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 ml-1 transition-transform duration-200 ${mobileServiceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServiceOpen && (
                <div className="flex flex-col px-2 py-1 ml-2">
                  {serviceLinks.map((service) => (
                    <div key={service.heading} className="flex flex-col">
                      <button
                        className="flex items-center justify-between py-2 px-4 rounded-lg font-medium text-base text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                        onClick={() =>
                          mobileSubDropdown === service.heading
                            ? setMobileSubDropdown(null)
                            : setMobileSubDropdown(service.heading)
                        }
                        type="button"
                      >
                        {service.heading}
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${mobileSubDropdown === service.heading ? "rotate-180" : ""}`} />
                      </button>
                      {mobileSubDropdown === service.heading && (
                        <div className="flex flex-col ml-6 mt-1">
                          {service.links.map((link) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              onClick={handleCloseMenus}
                              className="py-2 px-4 text-foreground/80 hover:text-primary hover:bg-muted font-normal text-base rounded-lg transition-colors"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {desktopLinks
              .filter(link => link.label !== "__SERVICES__")
              .map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleCloseMenus}
                  className="text-foreground hover:text-primary hover:bg-muted transition-colors font-bold py-4 px-4 rounded-lg text-lg"
                >
                  {link.label}
                </Link>
              ))}
            <Link to="/contact" onClick={handleCloseMenus} className="mt-4">
              <Button className="btn-gradient glow-effect w-full h-14 text-lg">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
