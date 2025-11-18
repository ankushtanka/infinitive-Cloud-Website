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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 rounded-xl blur-md group-hover:opacity-40 transition-opacity" />
              <img 
                src={logo} 
                alt="Infinitive Cloud Logo" 
                className="h-12 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground tracking-tight">INFINITIVE CLOUD</span>
              <span className="text-[9px] text-primary font-semibold uppercase tracking-wider">
                Limitless Solution
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Premium styling */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-foreground/70 hover:text-foreground transition-all font-semibold text-sm group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
            <Link to="/quote" className="ml-4">
              <Button className="btn-gradient glow-effect shadow-medium">
                Get Quote
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
