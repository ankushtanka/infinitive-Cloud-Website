const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient mesh blobs */}
      <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.25]">
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[120px] bg-primary/50 animate-drift"
          style={{ top: "5%", left: "0%" }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-secondary/45 animate-float"
          style={{ top: "45%", right: "0%" }}
        />
        <div
          className="absolute w-[550px] h-[550px] rounded-full blur-[110px] bg-accent/35 animate-drift"
          style={{ bottom: "5%", left: "25%", animationDelay: "8s", animationDirection: "reverse" }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full blur-[90px] bg-primary/30 animate-float"
          style={{ top: "25%", left: "50%", animationDelay: "4s" }}
        />
      </div>

      {/* Geometric grid pattern on top */}
      <div className="absolute inset-0 opacity-[0.10] dark:opacity-[0.12]">
        <svg
          className="animate-drift"
          style={{ width: "200%", height: "200%", marginLeft: "-50%", marginTop: "-50%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="cloud-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="1.5" fill="hsl(var(--primary))" />
              <circle cx="48" cy="8" r="1.5" fill="hsl(var(--primary))" />
              <circle cx="28" cy="24" r="1.5" fill="hsl(var(--secondary))" />
              <circle cx="68" cy="24" r="1.5" fill="hsl(var(--secondary))" />
              <circle cx="8" cy="40" r="1.5" fill="hsl(var(--primary))" />
              <circle cx="48" cy="40" r="1.5" fill="hsl(var(--primary))" />
              <circle cx="28" cy="56" r="1.5" fill="hsl(var(--secondary))" />
              <circle cx="68" cy="56" r="1.5" fill="hsl(var(--secondary))" />
              <line x1="8" y1="8" x2="28" y2="24" stroke="hsl(var(--primary))" strokeWidth="0.4" />
              <line x1="28" y1="24" x2="48" y2="8" stroke="hsl(var(--primary))" strokeWidth="0.4" />
              <line x1="48" y1="8" x2="68" y2="24" stroke="hsl(var(--secondary))" strokeWidth="0.4" />
              <line x1="8" y1="40" x2="28" y2="56" stroke="hsl(var(--primary))" strokeWidth="0.4" />
              <line x1="28" y1="56" x2="48" y2="40" stroke="hsl(var(--primary))" strokeWidth="0.4" />
              <line x1="28" y1="24" x2="28" y2="56" stroke="hsl(var(--secondary))" strokeWidth="0.3" />
              <line x1="8" y1="8" x2="8" y2="40" stroke="hsl(var(--primary))" strokeWidth="0.3" />
              <line x1="48" y1="8" x2="48" y2="40" stroke="hsl(var(--primary))" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-grid)" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundPattern;
