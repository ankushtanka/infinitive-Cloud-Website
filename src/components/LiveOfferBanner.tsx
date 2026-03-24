import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const LiveOfferBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  const visible = !dismissed && !scrolledDown;

  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Communicate banner visibility to other components
  useEffect(() => {
    document.body.setAttribute("data-offer-banner", visible ? "true" : "false");
    return () => document.body.removeAttribute("data-offer-banner");
  }, [visible]);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border text-foreground transition-transform duration-300 ${
        scrolledDown ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="section-container flex items-center justify-between py-2 gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-xs sm:text-sm font-medium">
            50% OFF all plans
          </span>
          <span className="font-mono tabular-nums text-xs sm:text-sm text-muted-foreground">
            {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/contact"
            className="text-xs sm:text-sm font-semibold text-primary hover:underline"
          >
            Claim →
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Dismiss offer banner"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveOfferBanner;
