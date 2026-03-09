import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LiveOfferBanner = () => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    // Calculate time to end of day
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
      <div className="section-container flex items-center justify-between py-3 gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Zap className="w-5 h-5 flex-shrink-0 animate-pulse" />
          <span className="text-sm md:text-base font-bold truncate">
            🔥 Flash Sale: 50% OFF all hosting plans — Ends in{" "}
            <span className="font-mono tabular-nums bg-primary-foreground/20 px-2 py-0.5 rounded ml-1">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to="/contact">
            <Button size="sm" variant="secondary" className="font-bold text-xs md:text-sm bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Claim Offer
            </Button>
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="p-1.5 hover:bg-primary-foreground/20 rounded-full transition-colors"
            aria-label="Dismiss offer banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveOfferBanner;
