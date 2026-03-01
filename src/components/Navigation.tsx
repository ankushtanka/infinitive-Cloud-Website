import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-icon.png";

// Services (no dropdown for Servers, all services flat in dropdown)
const serviceLinks = [
  {
    heading: "Hosting",
    links: [
      { label: "Web Hosting", path: "/solutions/shared-hosting" },
      { label: "Cloud Hosting", path: "/solutions/cloud-hosting" },
      { label: "Reseller Hosting", path: "/solutions/reseller-hosting" },
      { label: "Managed WordPress Hosting", path: "/solutions/wordpress-hosting" },
      { label: "Managed WooCommerce Hosting", path: "/solutions/woocommerce-hosting" },
      { label: "Node.js Web App Hosting", path: "/solutions/nodejs-hosting" },
    ],
  },
  {
    heading: "Servers",
    // flatten all subLinks to links
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
      { label: "Domain Name Search", path: "/solutions/domains#search" },
      { label: "Domain Transfer", path: "/solutions/domains#transfer" },
    ],
  },
  {
    heading: "Email & Productivity",
    links: [
      { label: "Zoho Email Services", path: "/solutions/email-security#zoho" },
      { label: "Microsoft Office 365", path: "/solutions/email-security#office365" },
      { label: "Google Workspace", path: "/solutions/email-security#workspace" },
      { label: "SSL Certificates", path: "/solutions/email-security#ssl" },
    ],
  },
];

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesHovering, setServicesHovering] = useState(false);
  const [dropdownHovering, setDropdownHovering] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileSubDropdown, setMobileSubDropdown] = useState<string | null>(null);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  // Helper to create the Services nav item (for desktop and mobile)
  const servicesNavItem = (
    <div
      className="relative flex items-center"
      style={{ minWidth: "110px" }}
      tabIndex={0}
      ref={servicesDropdownRef}
      onMouseEnter={() => {
        setServicesHovering(true);
        setServicesOpen(true);
      }}
      onMouseLeave={() => {
        setServicesHovering(false);
        // Defer closing to check if either hovering trigger or dropdown area
        setTimeout(() => {
          if (!servicesHovering && !dropdownHovering) {
            setServicesOpen(false);
          }
        }, 60);
      }}
      onFocus={() => setServicesOpen(true)}
      onBlur={() => {
        setTimeout(() => {
          if (!servicesHovering && !dropdownHovering) {
            setServicesOpen(false);
          }
        }, 60);
      }}
    >
      <button
        className="relative px-4 py-2 text-foreground/70 hover:text-foreground font-semibold text-sm flex items-center gap-1 group"
        aria-haspopup="true"
        aria-expanded={servicesOpen}
        type="button"
        tabIndex={-1}
        onClick={() => setServicesOpen((prev) => !prev)}
        style={{ zIndex: 51 }}
      >
        Services
        <ChevronDown
          className={`w-4 h-4 ml-1 transition-transform ${servicesOpen ? "rotate-180" : ""} text-foreground/70 group-hover:text-foreground`}
        />
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </button>
      {servicesOpen && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[750px] grid grid-cols-4 gap-4 shadow-2xl z-50 bg-background border border-border rounded-2xl py-6 px-7"
          style={{ minHeight: "250px" }}
          onMouseEnter={() => setDropdownHovering(true)}
          onMouseLeave={() => {
            setDropdownHovering(false);
            setTimeout(() => {
              if (!servicesHovering && !dropdownHovering) {
                setServicesOpen(false);
              }
            }, 60);
          }}
        >
          {serviceLinks.map((service) => (
            <div key={service.heading} className="flex flex-col">
              <span className="px-2 pb-1 font-semibold text-foreground/90 text-base border-b border-border mb-3">{service.heading}</span>
              {service.links && service.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-2 py-2 text-foreground/80 hover:text-primary hover:bg-muted transition-colors rounded-lg font-normal text-sm"
                  onClick={() => {
                    setIsOpen(false);
                    setServicesOpen(false);
                    setMobileServiceOpen(false);
                    setMobileSubDropdown(null);
                  }}
                  tabIndex={0}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // filteredNavLinks logic refactored: On homepage, Services is injected first from the left.
  let filteredNavLinks: typeof navLinks | Array<{ label: string; path: string } | { label: "__SERVICES__"; path: string }>;

  if (location.pathname === "/") {
    // On home, Services dropdown first, then all other links *except* Home
    filteredNavLinks = [
      { label: "__SERVICES__", path: "" },
      ...navLinks.filter(link => link.label !== "Home"),
    ];
  } else {
    // Otherwise, inject Services after Home
    const navWithServices = [
      navLinks[0],
      { label: "__SERVICES__", path: "" },
      ...navLinks.slice(1),
    ];
    filteredNavLinks = navWithServices;
  }

  const handleCloseMenus = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServiceOpen(false);
    setMobileSubDropdown(null);
  };

  useEffect(() => {
    if (!servicesOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [servicesOpen]);

  useEffect(() => {
    // Close all menus when the route changes
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

            {/* Desktop Navigation CENTERED */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-1 relative">
              {filteredNavLinks.map((link, idx) => {
                if (link.label === "__SERVICES__") {
                  // Insert services dropdown here
                  return (
                    <div key="services-dropdown-nav">{servicesNavItem}</div>
                  );
                } else {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={handleCloseMenus}
                      className="relative px-4 py-2 text-foreground/70 hover:text-foreground transition-all font-semibold text-sm group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </Link>
                  );
                }
              })}
              <Link to="/free-trial" className="ml-4" onClick={handleCloseMenus}>
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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background z-[60] overflow-y-auto">
          <div className="flex flex-col gap-2 px-6 py-6">
            {/* Services Accordion */}
            <div className="flex flex-col">
              <button
                className="flex items-center justify-between text-foreground font-semibold py-4 px-4 rounded-lg text-lg hover:text-primary"
                onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                aria-haspopup="true"
                aria-expanded={mobileServiceOpen}
                type="button"
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${mobileServiceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServiceOpen && (
                <div className="flex flex-col px-2 py-1 ml-2">
                  {serviceLinks.map((service) => (
                    <div key={service.heading} className="flex flex-col">
                      <button
                        className={`flex items-center justify-between py-2 px-4 rounded-lg font-medium text-base focus:outline-none text-foreground/80 hover:text-primary hover:bg-muted transition-colors`}
                        onClick={() =>
                          mobileSubDropdown === service.heading
                            ? setMobileSubDropdown(null)
                            : setMobileSubDropdown(service.heading)
                        }
                        type="button"
                      >
                        {service.heading}
                        {(service.links) && (
                          <ChevronDown
                            className={`w-4 h-4 ml-1 transition-transform ${mobileSubDropdown === service.heading ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>
                      {/* Sub-links for headings with .links */}
                      {service.links && mobileSubDropdown === service.heading && (
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
            {/* Other nav links */}
            {/* For mobile, keep "Services" accordion at top, then rest of links (remove Home if on "/") */}
            {filteredNavLinks
              .filter(link => link.label !== "__SERVICES__")
              .map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleCloseMenus}
                  className="text-foreground hover:text-primary hover:bg-muted transition-colors font-semibold py-4 px-4 rounded-lg text-lg"
                >
                  {link.label}
                </Link>
              ))}
            <Link to="/free-trial" onClick={handleCloseMenus} className="mt-4">
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
