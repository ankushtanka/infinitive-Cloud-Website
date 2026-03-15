import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, Globe, Server, ShieldCheck, Search, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-icon.png";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import CurrencyLanguageDropdown from "@/components/CurrencyLanguageDropdown";
import ThemeToggle from "@/components/ThemeToggle";

const WHMCS_LOGIN = "https://billing.infinitivecloud.com";

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

// Quick product links shown directly in the nav bar
const productQuickLinks = [
  { label: "Hosting", icon: Globe, category: "Hosting" },
  { label: "Servers", icon: Server, category: "Servers" },
  { label: "Domains", icon: Search, category: "Domains" },
  { label: "Security", icon: ShieldCheck, category: "Email & Security" },
];

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [megaMenuCategory, setMegaMenuCategory] = useState<string | undefined>();
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileSubDropdown, setMobileSubDropdown] = useState<string | null>(null);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setTopBarVisible(window.scrollY < 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleServicesEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setServicesOpen(true);
  }, []);

  const handleServicesLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
      setMegaMenuCategory(undefined);
    }, 150);
  }, []);

  const handleProductHover = useCallback((category: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaMenuCategory(category);
    setServicesOpen(true);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const isHome = location.pathname === "/";

  const handleCloseMenus = () => {
    setIsOpen(false);
    setServicesOpen(false);
    setMegaMenuCategory(undefined);
    setMobileServiceOpen(false);
    setMobileSubDropdown(null);
  };

  useEffect(() => {
    handleCloseMenus();
    // eslint-disable-next-line
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* Top utility bar - desktop only, hides on scroll */}
      <div
        className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-muted/80 backdrop-blur-md border-b border-border/30 transition-transform duration-300"
        style={{ transform: topBarVisible ? "translateY(0)" : "translateY(-100%)" }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-4 text-xs text-foreground font-medium">
              <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-primary" /> +91 8690393087</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-primary" /> support@infinitivecloud.com</span>
            </div>
            <div className="flex items-center gap-2">
              <CurrencyLanguageDropdown />
              <ThemeToggle />
              <div className="h-4 w-px bg-border/50 mx-1" />
              {/* Login button hidden until client area is ready */}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`fixed left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft transition-[top] duration-300 top-0 ${topBarVisible ? "lg:top-9" : "lg:top-0"}`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-14">
            {/* Logo - prominent and clear */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" onClick={handleCloseMenus}>
              <img src={logo} alt="Infinitive Cloud Logo" className="h-11 lg:h-13 w-auto group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col leading-none">
                <span className="text-base lg:text-lg font-black text-foreground tracking-tight">
                  INFINITIVE <span className="text-primary">CLOUD</span><sup className="text-[0.5em] align-super font-bold text-muted-foreground">™</sup>
                </span>
                <span className="text-[8px] lg:text-[9px] font-semibold text-muted-foreground tracking-[0.2em]">PRIVATE LIMITED</span>
              </div>
            </Link>

            {/* Desktop Navigation - centered */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Product quick links */}
              {productQuickLinks.map((product) => {
                const Icon = product.icon;
                return (
                  <button
                    key={product.label}
                    className={`relative px-3 py-2 font-bold text-sm flex items-center gap-1.5 group transition-all duration-200 rounded-lg ${
                      servicesOpen && megaMenuCategory === product.category 
                        ? "text-primary bg-primary/10" 
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    }`}
                    onMouseEnter={() => handleProductHover(product.category)}
                    onMouseLeave={handleServicesLeave}
                    onClick={() => {
                      setMegaMenuCategory(product.category);
                      setServicesOpen(prev => !prev);
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {product.label}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen && megaMenuCategory === product.category ? "rotate-180" : ""}`} />
                  </button>
                );
              })}

              <div className="h-5 w-px bg-border/40 mx-1" />

              {navLinks.filter(l => l.label !== "Home").map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleCloseMenus}
                  className="relative px-3 py-2 text-foreground hover:text-primary hover:bg-muted/50 transition-all font-bold text-sm rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side CTA */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <Link to="/contact" onClick={handleCloseMenus}>
                <Button className="btn-gradient glow-effect shadow-medium text-sm px-6 h-9 font-bold">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Mobile: utility icons + hamburger */}
            <div className="flex lg:hidden items-center gap-1">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 text-foreground hover:bg-muted rounded-lg transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Menu */}
      {servicesOpen && (
        <ServicesMegaMenu
          onClose={() => { setServicesOpen(false); setMegaMenuCategory(undefined); }}
          onMouseEnter={handleServicesEnter}
          onMouseLeave={handleServicesLeave}
          initialCategory={megaMenuCategory}
        />
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-[60] overflow-y-auto">
          <div className="flex flex-col gap-2 px-6 py-6">
            {/* Services Accordion */}
            <div className="flex flex-col">
              <button
                className="flex items-center justify-between text-foreground font-bold py-4 px-4 rounded-lg text-lg hover:text-primary transition-colors"
                onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                aria-expanded={mobileServiceOpen}
                type="button"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Products & Services
                </span>
                <ChevronDown className={`w-5 h-5 ml-1 transition-transform duration-200 ${mobileServiceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServiceOpen && (
                <div className="flex flex-col px-2 py-1 ml-2">
                  {serviceLinks.map((service) => (
                    <div key={service.heading} className="flex flex-col">
                      <button
                        className="flex items-center justify-between py-2.5 px-4 rounded-lg font-semibold text-base text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
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
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleCloseMenus}
                className="text-foreground hover:text-primary hover:bg-muted transition-colors font-bold py-4 px-4 rounded-lg text-lg"
              >
                {link.label}
              </Link>
            ))}
            {/* Login button hidden until client area is ready */}
            <div className="flex items-center justify-between py-4 px-4">
              <span className="text-foreground font-bold text-lg">Dark Mode</span>
              <ThemeToggle />
            </div>
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
