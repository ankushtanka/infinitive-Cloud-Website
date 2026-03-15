import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LiveOfferBanner = () => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

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

  if (!visible) return null;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground">
      <div className="section-container flex items-center justify-between py-2.5 sm:py-3 gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1 min-w-0">
            <span className="text-[11px] sm:text-sm md:text-base font-bold leading-tight">
              🔥 Flash Sale: 50% OFF
              <span className="hidden sm:inline"> all hosting plans</span>
            </span>
            <span className="font-mono tabular-nums bg-primary-foreground/20 px-1.5 sm:px-2 py-0.5 rounded text-[11px] sm:text-sm md:text-base font-bold w-fit">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <Link to="/contact">
            <Button size="sm" variant="secondary" className="font-bold text-[10px] sm:text-xs md:text-sm px-2.5 sm:px-3 h-7 sm:h-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Claim Offer
            </Button>
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="p-1 sm:p-1.5 hover:bg-primary-foreground/20 rounded-full transition-colors"
            aria-label="Dismiss offer banner"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveOfferBanner;
