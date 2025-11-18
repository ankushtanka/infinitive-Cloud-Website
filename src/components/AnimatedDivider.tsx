const AnimatedDivider = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Animated gradient waves */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
      </div>
      
      {/* Center glow element */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin" style={{ animationDuration: '8s' }} />
          
          {/* Middle ring */}
          <div className="absolute inset-3 rounded-full border-2 border-accent/30 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
          
          {/* Inner glow */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl" />
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent glow-effect" />
          </div>
        </div>
      </div>
      
      {/* Side decorative elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-accent/5 rounded-full blur-2xl" />
    </div>
  );
};

export default AnimatedDivider;
