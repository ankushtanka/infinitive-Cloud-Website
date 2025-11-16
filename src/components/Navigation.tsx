import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Infinitive Cloud Logo" 
              className="h-12 w-auto group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">INFINITIVE CLOUD</span>
              <span className="text-xs text-primary font-medium uppercase tracking-wide">
                Limitless Solution for Cloud and Web Hostings
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground/80 hover:text-primary transition-colors font-semibold text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact">
              <Button className="btn-gradient text-white font-semibold">
                Request a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/80 hover:text-primary transition-colors font-semibold py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="btn-gradient text-white font-semibold w-full">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
