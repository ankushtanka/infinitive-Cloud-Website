import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe, User, IndianRupee, ChevronRight } from "lucide-react";
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
      { label: "VPS Server", path: "/solutions/vps-hosting" },
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
      { label: "Zoho Email", path: "/solutions/ssl-certificates" },
      { label: "Microsoft 365", path: "/solutions/ssl-certificates" },
      { label: "Google Workspace", path: "/solutions/ssl-certificates" },
      { label: "SSL Certificates", path: "/solutions/ssl-certificates" },
    ],
  },
];

const currencies = [
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham" },
];

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", label: "العربية", flag: "🇦🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileSubDropdown, setMobileSubDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Utility dropdowns
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCurr, setSelectedCurr] = useState(currencies[0]);
  
  const langRef = useRef<HTMLDivElement>(null);
  const currRef = useRef<HTMLDivElement>(null);

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
    }, 150);
  }, []);

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
    setLangOpen(false);
    setCurrOpen(false);
  };

  useEffect(() => {
    handleCloseMenus();
    // eslint-disable-next-line
  }, [location.pathname, location.hash]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (currRef.current && !currRef.current.contains(e.target as Node)) setCurrOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(222,47%,11%)]/95 backdrop-blur-xl border-b border-[hsl(220,30%,18%)]/80">
        <div className="section-container">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={handleCloseMenus}>
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(222,47%,11%)] rounded-xl" />
                <img src={logo} alt="Infinitive Cloud Logo" className="h-11 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight leading-tight">INFINITIVE CLOUD</span>
                <span className="text-[9px] font-medium text-[hsl(220,20%,55%)] tracking-widest">PRIVATE LIMITED</span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-0.5 mx-auto">
              {desktopLinks.map((link) => {
                if (link.label === "__SERVICES__") {
                  return (
                    <button
                      key="services-trigger"
                      className={`relative px-4 py-2 font-semibold text-sm flex items-center gap-1 group transition-all duration-200 rounded-lg ${
                        servicesOpen 
                          ? "text-white bg-[hsl(220,30%,16%)]" 
                          : "text-[hsl(220,20%,72%)] hover:text-white hover:bg-[hsl(220,30%,14%)]"
                      }`}
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                      onClick={() => setServicesOpen(true)}
                    >
                      Services
                      <ChevronDown className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                  );
                }
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleCloseMenus}
                    className={`relative px-4 py-2 transition-all font-semibold text-sm rounded-lg ${
                      isActive
                        ? "text-white bg-[hsl(220,30%,16%)]"
                        : "text-[hsl(220,20%,72%)] hover:text-white hover:bg-[hsl(220,30%,14%)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side - Utility icons + CTA */}
            <div className="hidden lg:flex items-center gap-1 shrink-0">
              {/* Vertical separator */}
              <div className="w-px h-8 bg-[hsl(220,30%,20%)] mx-2" />

              {/* Language selector */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => { setLangOpen(!langOpen); setCurrOpen(false); }}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[hsl(220,20%,65%)] hover:text-white hover:bg-[hsl(220,30%,14%)] transition-all duration-200"
                  title="Language"
                >
                  <Globe className="w-[18px] h-[18px]" />
                  <span className="text-xs font-medium">{selectedLang.code.toUpperCase()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[hsl(222,47%,11%)] border border-[hsl(220,30%,18%)] rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-50" style={{ animation: "fade-in 0.15s ease-out" }}>
                    <div className="p-1.5">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                            selectedLang.code === lang.code
                              ? "bg-[hsl(186,100%,53%,0.1)] text-[hsl(186,100%,65%)]"
                              : "text-[hsl(220,20%,70%)] hover:bg-[hsl(220,30%,14%)] hover:text-white"
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span className="font-medium">{lang.label}</span>
                          {selectedLang.code === lang.code && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(186,100%,53%)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Currency selector */}
              <div ref={currRef} className="relative">
                <button
                  onClick={() => { setCurrOpen(!currOpen); setLangOpen(false); }}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[hsl(220,20%,65%)] hover:text-white hover:bg-[hsl(220,30%,14%)] transition-all duration-200"
                  title="Currency"
                >
                  <IndianRupee className="w-[18px] h-[18px]" />
                  <span className="text-xs font-medium">{selectedCurr.code}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${currOpen ? "rotate-180" : ""}`} />
                </button>
                {currOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-[hsl(222,47%,11%)] border border-[hsl(220,30%,18%)] rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-50" style={{ animation: "fade-in 0.15s ease-out" }}>
                    <div className="p-1.5">
                      {currencies.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => { setSelectedCurr(curr); setCurrOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                            selectedCurr.code === curr.code
                              ? "bg-[hsl(186,100%,53%,0.1)] text-[hsl(186,100%,65%)]"
                              : "text-[hsl(220,20%,70%)] hover:bg-[hsl(220,30%,14%)] hover:text-white"
                          }`}
                        >
                          <span className="font-bold text-base w-6 text-center">{curr.symbol}</span>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{curr.code}</span>
                            <span className="text-[11px] text-[hsl(220,15%,45%)] leading-tight">{curr.label}</span>
                          </div>
                          {selectedCurr.code === curr.code && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(186,100%,53%)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Login icon */}
              <Link
                to="/contact"
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[hsl(220,20%,65%)] hover:text-white hover:bg-[hsl(220,30%,14%)] transition-all duration-200"
                title="Login / Sign Up"
                onClick={handleCloseMenus}
              >
                <User className="w-[18px] h-[18px]" />
              </Link>

              {/* Separator */}
              <div className="w-px h-8 bg-[hsl(220,30%,20%)] mx-2" />

              {/* CTA */}
              <Link to="/contact" onClick={handleCloseMenus}>
                <Button className="bg-gradient-to-r from-[hsl(186,100%,53%)] to-[hsl(217,91%,60%)] hover:from-[hsl(186,100%,48%)] hover:to-[hsl(217,91%,55%)] text-white font-bold text-sm px-5 h-10 rounded-lg shadow-[0_4px_15px_-3px_hsl(186,100%,53%,0.4)] hover:shadow-[0_6px_20px_-3px_hsl(186,100%,53%,0.5)] transition-all duration-200">
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 text-white hover:bg-[hsl(220,30%,14%)] rounded-lg transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Menu */}
      {servicesOpen && (
        <ServicesMegaMenu onClose={() => setServicesOpen(false)} onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave} />
      )}

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-[hsl(222,47%,8%)] z-[60] overflow-y-auto">
          <div className="flex flex-col gap-1 px-4 py-4">
            {/* Mobile Language & Currency row */}
            <div className="flex items-center gap-2 px-2 py-3 mb-2 border-b border-[hsl(220,30%,15%)]">
              <button
                onClick={() => {
                  const idx = languages.indexOf(selectedLang);
                  setSelectedLang(languages[(idx + 1) % languages.length]);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(220,30%,13%)] text-[hsl(220,20%,70%)]"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedLang.flag} {selectedLang.code.toUpperCase()}</span>
              </button>
              <button
                onClick={() => {
                  const idx = currencies.indexOf(selectedCurr);
                  setSelectedCurr(currencies[(idx + 1) % currencies.length]);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(220,30%,13%)] text-[hsl(220,20%,70%)]"
              >
                <IndianRupee className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedCurr.symbol} {selectedCurr.code}</span>
              </button>
              <Link
                to="/contact"
                onClick={handleCloseMenus}
                className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg bg-[hsl(220,30%,13%)] text-[hsl(220,20%,70%)]"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            </div>

            {/* Services Accordion */}
            <div className="flex flex-col">
              <button
                className="flex items-center justify-between text-white font-bold py-3 px-3 rounded-lg text-base hover:bg-[hsl(220,30%,13%)] transition-colors"
                onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                aria-expanded={mobileServiceOpen}
                type="button"
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileServiceOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServiceOpen && (
                <div className="flex flex-col px-1 py-1 ml-2">
                  {serviceLinks.map((service) => (
                    <div key={service.heading} className="flex flex-col">
                      <button
                        className="flex items-center justify-between py-2.5 px-3 rounded-lg font-medium text-sm text-[hsl(220,20%,70%)] hover:text-white hover:bg-[hsl(220,30%,13%)] transition-colors"
                        onClick={() =>
                          mobileSubDropdown === service.heading
                            ? setMobileSubDropdown(null)
                            : setMobileSubDropdown(service.heading)
                        }
                        type="button"
                      >
                        {service.heading}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSubDropdown === service.heading ? "rotate-180" : ""}`} />
                      </button>
                      {mobileSubDropdown === service.heading && (
                        <div className="flex flex-col ml-4 mt-0.5">
                          {service.links.map((link) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              onClick={handleCloseMenus}
                              className="py-2 px-3 text-[hsl(220,20%,60%)] hover:text-[hsl(186,100%,65%)] hover:bg-[hsl(220,30%,13%)] font-normal text-sm rounded-lg transition-colors"
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
            {desktopLinks
              .filter(link => link.label !== "__SERVICES__")
              .map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleCloseMenus}
                  className="text-white hover:text-[hsl(186,100%,65%)] hover:bg-[hsl(220,30%,13%)] transition-colors font-bold py-3 px-3 rounded-lg text-base"
                >
                  {link.label}
                </Link>
              ))}
            <Link to="/contact" onClick={handleCloseMenus} className="mt-3">
              <Button className="bg-gradient-to-r from-[hsl(186,100%,53%)] to-[hsl(217,91%,60%)] text-white font-bold w-full h-12 text-base rounded-lg shadow-[0_4px_15px_-3px_hsl(186,100%,53%,0.4)]">
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
