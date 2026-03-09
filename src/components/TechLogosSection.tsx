import { motion } from "framer-motion";

const technologies = [
  { name: "cPanel", icon: "🖥️" },
  { name: "WHM", icon: "⚙️" },
  { name: "LiteSpeed", icon: "⚡" },
  { name: "CloudLinux", icon: "☁️" },
  { name: "WordPress", icon: "📝" },
  { name: "Let's Encrypt", icon: "🔒" },
  { name: "Cloudflare", icon: "🛡️" },
  { name: "PHP 8.x", icon: "🐘" },
  { name: "MySQL", icon: "🗄️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Redis", icon: "🔴" },
  { name: "Docker", icon: "🐳" },
];

const TechLogosSection = () => {
  return (
    <section className="py-12 bg-muted/20 border-y border-border/30">
      <div className="section-container">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
          Powered by Industry-Leading Technologies
        </p>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-x">
            {[...technologies, ...technologies].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-6 py-3 mx-3 bg-card/50 border border-border/30 rounded-xl flex-shrink-0 hover:border-primary/30 transition-colors"
              >
                <span className="text-xl">{tech.icon}</span>
                <span className="text-sm font-semibold text-foreground/80 whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 25s linear infinite;
          width: max-content;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechLogosSection;
