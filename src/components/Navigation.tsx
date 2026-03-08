import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-icon.png";
import CurrencyLanguageDropdown from "@/components/CurrencyLanguageDropdown";

const WHMCS_LOGIN = "https://billing.infinitivecloud.com/clientarea.php";

interface DropdownItem {
  label: string;
  path: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

const dropdowns: NavDropdown[] = [
  {
    label: "Hosting",
    items: [
      { label: "Shared Hosting", path: "/solutions/shared-hosting" },
      { label: "WordPress Hosting", path: "/solutions/wordpress-hosting" },
      { label: "Cloud Hosting", path: "/solutions/cloud-hosting" },
    ],
  },
  {
    label: "Servers",
    items: [
      { label: "VPS Servers", path: "/solutions/vps-hosting" },
      { label: "Dedicated Servers", path: "/solutions/dedicated-servers" },
      { label: "GPU Servers", path: "/solutions/gpu-dedicated-server" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Cloud Deployment", path: "/solutions/cloud-hosting" },
      { label: "Server Management", path: "/solutions/server-management" },
      { label: "Website Migration", path: "/solutions/cloud-migration" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Us", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", path: "/blog" },
      { label: "Knowledgebase", path: "/knowledgebase" },
      { label: "SLA", path: "/sla" },
    ],
  },
];

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnter = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, []);

  const handleCloseAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  };

  useEffect(() => {
    handleCloseAll();
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-background/80 backdrop-blur-sm"
        }`}
        style={{ boxShadow: scrolled ? "var(--shadow-soft)" : "none" }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" onClick={handleCloseAll}>
              <img
                src={logo}
                alt="Infinitive Cloud Logo"
                className="h-9 w-auto group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold text-foreground tracking-tight font-heading">
                  INFINITIVE CLOUD
                </span>
                <span className="text-[9px] font-medium text-muted-foreground tracking-wider">
                  PRIVATE LIMITED
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                onClick={handleCloseAll}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted"
              >
                Home
              </Link>
              {dropdowns.map((dropdown) => (
                <div
                  key={dropdown.label}
                  className="relative"
                  onMouseEnter={() => handleEnter(dropdown.label)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      activeDropdown === dropdown.label
                        ? "text-foreground bg-muted"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {dropdown.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === dropdown.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === dropdown.label && (
                    <div
                      className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-xl overflow-hidden animate-fade-in"
                      style={{ boxShadow: "var(--shadow-strong)", animationDuration: "0.15s" }}
                      onMouseEnter={() => handleEnter(dropdown.label)}
                      onMouseLeave={handleLeave}
                    >
                      <div className="py-1.5">
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={handleCloseAll}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors group"
                          >
                            {item.label}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3">
              <CurrencyLanguageDropdown />
              <a
                href={WHMCS_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-foreground/60 hover:text-foreground rounded-md transition-colors"
                aria-label="Login"
                title="Login to Client Area"
              >
                <User className="w-4.5 h-4.5" />
              </a>
              <div className="h-5 w-px bg-border" />
              <Link to="/contact" onClick={handleCloseAll}>
                <Button size="sm" className="btn-primary rounded-lg text-sm px-5 h-9">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-[60] overflow-y-auto animate-fade-in" style={{ animationDuration: "0.2s" }}>
          <div className="flex flex-col px-5 py-4 gap-1">
            <Link
              to="/"
              onClick={handleCloseAll}
              className="text-foreground font-medium py-3 px-4 rounded-lg hover:bg-muted transition-colors"
            >
              Home
            </Link>
            {dropdowns.map((dropdown) => (
              <div key={dropdown.label}>
                <button
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === dropdown.label ? null : dropdown.label)
                  }
                  className="flex items-center justify-between w-full text-foreground font-medium py-3 px-4 rounded-lg hover:bg-muted transition-colors"
                >
                  {dropdown.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileDropdown === dropdown.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdown === dropdown.label && (
                  <div className="ml-4 flex flex-col gap-0.5 mt-1 mb-2">
                    {dropdown.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleCloseAll}
                        className="text-foreground/70 hover:text-foreground py-2.5 px-4 text-sm rounded-lg hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-border mt-3 pt-3">
              <a
                href={WHMCS_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCloseAll}
                className="flex items-center gap-2 text-foreground font-medium py-3 px-4 rounded-lg hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </a>
              <Link to="/contact" onClick={handleCloseAll} className="mt-2 block">
                <Button className="btn-primary w-full h-11">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
