import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ShoppingCart, User } from "lucide-react";
import logo from "@/assets/logo-icon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Solutions", path: "/solutions" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(222,47%,11%)] border-b border-white/10">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Left */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src={logo}
                alt="Infinitive Cloud Logo"
                className="h-9 w-auto group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-lg font-bold text-white tracking-tight">
                Infinitive Cloud
              </span>
            </Link>

            {/* Nav Links - Center */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white/70 hover:text-white transition-colors font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="h-6 w-px bg-white/20 mx-2" />
              <Link to="/free-trial">
                <Button className="bg-white text-[hsl(222,47%,11%)] hover:bg-white/90 font-semibold text-sm h-9 px-5 rounded-full">
                  Start Free Trial
                </Button>
              </Link>
              <div className="h-6 w-px bg-white/20 mx-2" />
              <button className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Language">
                <Globe className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Cart">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/70 hover:text-white transition-colors" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[hsl(222,47%,11%)] z-[60] overflow-y-auto">
          <div className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/5 transition-colors font-medium py-3 px-4 rounded-lg text-base"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-4" />
            <Link to="/free-trial" onClick={() => setIsOpen(false)}>
              <Button className="bg-white text-[hsl(222,47%,11%)] hover:bg-white/90 font-semibold w-full h-12 text-base rounded-full">
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
