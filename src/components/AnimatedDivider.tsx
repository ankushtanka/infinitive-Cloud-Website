import { useState, useEffect } from "react";
import logo from "@/assets/logo-icon.png";
import { Code, Cloud, Database, Cpu } from "lucide-react";

const AnimatedDivider = () => {
  const [activeService, setActiveService] = useState(0);
  
  const services = [
    { icon: Code, text: "Development Solutions", color: "from-cyan-500 to-blue-500" },
    { icon: Database, text: "Hosting Solutions", color: "from-blue-500 to-purple-500" },
    { icon: Cloud, text: "Cloud Solutions", color: "from-purple-500 to-pink-500" },
    { icon: Cpu, text: "AI Solutions", color: "from-pink-500 to-cyan-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = services[activeService].icon;

  return (
    <div className="relative py-40 overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      {/* Animated connecting lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative section-container flex flex-col items-center justify-center gap-16">
        {/* Logo with rotating service icons */}
        <div className="relative w-96 h-96 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin" style={{ animationDuration: '15s' }} />
          
          {/* Service icons orbiting */}
          {services.map((service, index) => {
            const angle = (index * 360) / services.length;
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="absolute w-16 h-16 flex items-center justify-center"
                style={{
                  transform: `rotate(${angle}deg) translateX(180px) rotate(-${angle}deg)`,
                  transition: 'all 0.5s ease',
                }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                  activeService === index 
                    ? 'bg-gradient-to-br ' + service.color + ' scale-125 shadow-2xl border-transparent' 
                    : 'bg-background/80 border-primary/30 scale-100'
                }`}>
                  <Icon className={`w-7 h-7 transition-all duration-500 ${
                    activeService === index ? 'text-white' : 'text-primary'
                  }`} />
                </div>
              </div>
            );
          })}

          {/* Center logo */}
          <div className="relative z-10 w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 bg-background rounded-full" />
            <img 
              src={logo} 
              alt="Infinitive Cloud" 
              className="relative z-10 w-44 h-44 object-contain"
            />
          </div>
        </div>

        {/* Animated service text */}
        <div className="relative h-20 flex items-center justify-center">
          {services.map((service, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-500 ${
                activeService === index
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              <h3 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                {service.text}
              </h3>
            </div>
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              style={{
                left: `${20 + i * 12}%`,
                top: '50%',
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedDivider;
