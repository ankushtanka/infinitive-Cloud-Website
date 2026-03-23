const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.25] dark:opacity-[0.30]">
      {/* Blob 1 - primary */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[120px] bg-primary/60 animate-drift"
        style={{ top: "5%", left: "0%" }}
      />
      {/* Blob 2 - secondary */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-secondary/55 animate-float"
        style={{ top: "45%", right: "0%" }}
      />
      {/* Blob 3 - accent */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full blur-[110px] bg-accent/45 animate-drift"
        style={{ bottom: "5%", left: "25%", animationDelay: "8s", animationDirection: "reverse" }}
      />
      {/* Blob 4 - primary */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[90px] bg-primary/40 animate-float"
        style={{ top: "25%", left: "50%", animationDelay: "4s" }}
      />
    </div>
  );
};

export default BackgroundPattern;
