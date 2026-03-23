const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.07] dark:opacity-[0.09]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cloud-grid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {/* Hexagonal dots */}
            <circle cx="8" cy="8" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="48" cy="8" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="28" cy="24" r="1.5" fill="hsl(var(--secondary))" />
            <circle cx="68" cy="24" r="1.5" fill="hsl(var(--secondary))" />
            <circle cx="8" cy="40" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="48" cy="40" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="28" cy="56" r="1.5" fill="hsl(var(--secondary))" />
            <circle cx="68" cy="56" r="1.5" fill="hsl(var(--secondary))" />
            {/* Connecting lines */}
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
  );
};

export default BackgroundPattern;
