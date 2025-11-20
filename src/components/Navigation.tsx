import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-icon.png";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [{
    label: "Home",
    path: "/"
  }, {
    label: "Solutions",
    path: "/solutions"
  }, {
    label: "Pricing",
    path: "/pricing"
  }, {
    label: "About",
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
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="Infinitive Cloud" 
                className="h-9 md:h-10 w-auto group-hover:scale-105 transition-transform duration-200" 
              />
            </div>
            <span className="text-lg md:text-xl font-display font-bold text-foreground tracking-tight">
              INFINITIVE CLOUD
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => <Link 
              key={link.path} 
              to={link.path} 
              className="relative px-3 py-2 text-foreground/70 hover:text-foreground transition-colors font-medium text-sm group"
            >
                {link.label}
                <span className="absolute bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </Link>)}
            <Link to="/quote" className="ml-3">
              <Button className="btn-gradient font-semibold text-sm h-10 px-5">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className="text-foreground hover:text-primary hover:bg-muted/50 transition-colors font-medium py-3 px-3 rounded-lg"
              >
                  {link.label}
                </Link>)}
              <Link to="/quote" onClick={() => setIsOpen(false)} className="mt-2">
                <Button className="btn-gradient w-full h-12 font-semibold">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;