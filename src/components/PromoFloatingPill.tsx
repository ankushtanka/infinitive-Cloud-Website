import { useState, useEffect, useRef } from "react";
import { Target, Copy, Check } from "lucide-react";

const COUNTDOWN_DURATION = 72 * 60 * 60 * 1000; // 72 hours in ms

const getEndTime = (): number => {
  const stored = localStorage.getItem("promo_pill_end");
  if (stored) {
    const val = parseInt(stored, 10);
    if (val > Date.now()) return val;
  }
  const end = Date.now() + COUNTDOWN_DURATION;
  localStorage.setItem("promo_pill_end", String(end));
  return end;
};

const PromoFloatingPill = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [expired, setExpired] = useState(false);
  const [copied, setCopied] = useState(false);
  const endTimeRef = useRef(getEndTime());

  useEffect(() => {
    const update = () => {
      const diff = endTimeRef.current - Date.now();
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("WELCOME50");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className="group relative cursor-default select-none transition-transform duration-200 hover:scale-[1.02]"
      style={{
        borderRadius: "100px",
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow:
          "0 0 12px rgba(79, 70, 229, 0.15), 0 0 0 1px rgba(255,255,255,0.06) inset",
        animation: "pillGlow 3s ease-in-out infinite",
      }}
    >
      {/* Desktop layout */}
      <div className="hidden md:flex items-center gap-0 px-4 py-1.5">
        {/* Left: free trial */}
        <div className="flex items-center gap-1.5 text-white/90 text-xs whitespace-nowrap">
          <Target className="w-3.5 h-3.5 text-white/70" />
          <span>
            15-day{" "}
            <span className="font-bold text-[#818cf8]">free trial</span>
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-white/15 mx-3" />

        {/* Right: promo + countdown */}
        <div className="flex items-center gap-2">
          {!expired ? (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#4f46e5]/25 text-[#a5b4fc] border border-[#4f46e5]/30 hover:bg-[#4f46e5]/35 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-2.5 h-2.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-2.5 h-2.5" /> WELCOME50
                  </>
                )}
              </button>
              <span className="font-mono text-[11px] text-white/50 tabular-nums">
                {pad(timeLeft.days)}d {pad(timeLeft.hours)}h{" "}
                {pad(timeLeft.minutes)}m
              </span>
            </>
          ) : (
            <span className="text-[11px] text-white/40 font-medium">
              Expired
            </span>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col items-center gap-1 px-4 py-2">
        <div className="flex items-center gap-1.5 text-white/90 text-xs">
          <Target className="w-3 h-3 text-white/70" />
          <span>
            15-day{" "}
            <span className="font-bold text-[#818cf8]">free trial</span>
          </span>
        </div>
        {!expired && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full bg-[#4f46e5]/25 text-[#a5b4fc] border border-[#4f46e5]/30"
            >
              {copied ? (
                <>
                  <Check className="w-2.5 h-2.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-2.5 h-2.5" /> WELCOME50
                </>
              )}
            </button>
            <span className="font-mono text-[10px] text-white/50 tabular-nums">
              {pad(timeLeft.days)}d {pad(timeLeft.hours)}h{" "}
              {pad(timeLeft.minutes)}m
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pillGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(79, 70, 229, 0.15), 0 0 0 1px rgba(255,255,255,0.06) inset; }
          50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.3), 0 0 0 1px rgba(255,255,255,0.1) inset; }
        }
      `}</style>
    </div>
  );
};

export default PromoFloatingPill;
