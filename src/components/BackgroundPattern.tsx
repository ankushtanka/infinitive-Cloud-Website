const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.07] dark:opacity-[0.09]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cloud-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Hexagonal dots */}
            <circle cx="10" cy="10" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="70" cy="10" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="40" cy="35" r="1.5" fill="hsl(var(--secondary))" />
            <circle cx="100" cy="35" r="1.5" fill="hsl(var(--secondary))" />
            <circle cx="10" cy="60" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="70" cy="60" r="1.5" fill="hsl(var(--primary))" />
            <circle cx="40" cy="85" r="1.5" fill="hsl(var(--secondary))" />
            <circle cx="100" cy="85" r="1.5" fill="hsl(var(--secondary))" />
            {/* Subtle connecting lines */}
            <line x1="10" y1="10" x2="40" y2="35" stroke="hsl(var(--primary))" strokeWidth="0.3" />
            <line x1="40" y1="35" x2="70" y2="10" stroke="hsl(var(--primary))" strokeWidth="0.3" />
            <line x1="70" y1="10" x2="100" y2="35" stroke="hsl(var(--secondary))" strokeWidth="0.3" />
            <line x1="10" y1="60" x2="40" y2="85" stroke="hsl(var(--primary))" strokeWidth="0.3" />
            <line x1="40" y1="85" x2="70" y2="60" stroke="hsl(var(--primary))" strokeWidth="0.3" />
            <line x1="40" y1="35" x2="40" y2="85" stroke="hsl(var(--secondary))" strokeWidth="0.2" />
            <line x1="10" y1="10" x2="10" y2="60" stroke="hsl(var(--primary))" strokeWidth="0.2" />
            <line x1="70" y1="10" x2="70" y2="60" stroke="hsl(var(--primary))" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cloud-grid)" />
      </svg>
    </div>
  );
};

export default BackgroundPattern;
