import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Use both scroll and RAF to catch Lenis smooth scroll
    let ticking = false;
    const checkScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollY > 400);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });

    // Also poll as fallback for Lenis
    const interval = setInterval(() => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollY > 400);
    }, 500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-20 right-6 z-50 p-2.5 rounded-full bg-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:scale-110 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default BackToTop;
