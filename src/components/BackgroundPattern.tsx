const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.12] dark:opacity-[0.18]">
      {/* Blob 1 - primary */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-primary/40 animate-drift"
        style={{ top: "10%", left: "5%" }}
      />
      {/* Blob 2 - secondary */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-secondary/40 animate-float"
        style={{ top: "50%", right: "5%" }}
      />
      {/* Blob 3 - accent */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[110px] bg-accent/30 animate-drift"
        style={{ bottom: "10%", left: "30%", animationDelay: "8s", animationDirection: "reverse" }}
      />
      {/* Blob 4 - smaller primary */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full blur-[90px] bg-primary/25 animate-float"
        style={{ top: "30%", left: "55%", animationDelay: "4s" }}
      />
    </div>
  );
};

export default BackgroundPattern;
