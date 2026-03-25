import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    <section className="py-6 md:py-8 border-b border-border/30 bg-muted/30">
      <div className="section-container">
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {technologies.map((tech) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger asChild>
                <span className="text-lg md:text-xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default">
                  {tech.icon}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">{tech.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechLogosSection;
