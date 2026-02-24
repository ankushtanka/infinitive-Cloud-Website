import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-icon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-background rounded-xl" />
              <img src={logo} alt="Infinitive Cloud Logo" className="h-12 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground tracking-tight">INFINITIVE CLOUD</span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wide">PRIVATE LIMITED</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} className="relative px-4 py-2 text-foreground/70 hover:text-foreground transition-all font-semibold text-sm group">
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
            <Link to="/free-trial" className="ml-4">
              <Button className="btn-gradient glow-effect shadow-medium">
                Start Free Trial
              </Button>
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-3 text-foreground hover:bg-muted rounded-lg transition-colors" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-foreground hover:text-primary hover:bg-muted transition-colors font-semibold py-4 px-4 rounded-lg text-lg">
                  {link.label}
                </Link>
              ))}
              <Link to="/free-trial" onClick={() => setIsOpen(false)} className="mt-4">
                <Button className="btn-gradient glow-effect w-full h-14 text-lg">
                  Start Free Trial
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
