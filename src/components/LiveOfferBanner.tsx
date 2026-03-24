import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const LiveOfferBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  const visible = !dismissed && !scrolledDown;

  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 ease-in-out ${
        scrolledDown ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="section-container flex items-center justify-between py-2.5 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="flex items-center gap-1.5 shrink-0">
              <Zap className="w-4 h-4 text-primary-foreground fill-primary-foreground animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-primary-foreground uppercase tracking-wider">
                Flash Sale
              </span>
            </span>
            <span className="hidden sm:inline text-xs sm:text-sm text-primary-foreground/90 font-medium">
              — 50% OFF all plans
            </span>
            <span className="sm:hidden text-xs text-primary-foreground/90 font-medium">
              50% OFF
            </span>
            <div className="flex items-center gap-1 font-mono tabular-nums text-xs sm:text-sm">
              <span className="bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5 font-bold backdrop-blur-sm">
                {pad(timeLeft.hours)}
              </span>
              <span className="text-primary-foreground/70">:</span>
              <span className="bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5 font-bold backdrop-blur-sm">
                {pad(timeLeft.minutes)}
              </span>
              <span className="text-primary-foreground/70">:</span>
              <span className="bg-primary-foreground/20 text-primary-foreground rounded px-1.5 py-0.5 font-bold backdrop-blur-sm">
                {pad(timeLeft.seconds)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/contact"
              className="text-xs sm:text-sm font-bold text-primary-foreground bg-primary-foreground/20 hover:bg-primary-foreground/30 px-3 py-1 rounded-full transition-colors backdrop-blur-sm"
            >
              Claim Now →
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
              aria-label="Dismiss offer banner"
            >
              <X className="w-3.5 h-3.5 text-primary-foreground/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOfferBanner;
