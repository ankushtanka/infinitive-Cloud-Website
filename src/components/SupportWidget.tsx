import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X, Phone, Headset, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const TooltipContent = ({ label, isHovered }: { label: string; isHovered: boolean }) => (
  <AnimatePresence mode="popLayout">
    {isHovered && (
      <motion.span
        key={label}
        layout
        className="text-sm font-semibold whitespace-nowrap bg-foreground/90 text-background px-3 py-1.5 rounded-lg shadow-md"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8, transition: { duration: 0.08 } }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      >
        {label}
      </motion.span>
    )}
  </AnimatePresence>
);

const ActionButton = ({
  label,
  icon,
  className,
  onClick,
  href,
  variants,
  isHovered,
  onHover,
  onLeave,
}: {
  label: string;
  icon: React.ReactNode;
  className: string;
  onClick?: () => void;
  href?: string;
  variants: any;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const sharedProps = {
    className,
    "aria-label": label,
    variants,
    transition: { type: "spring" as const, stiffness: 400, damping: 24 },
    whileHover: { scale: 1.08 },
    whileTap: { scale: 0.95 },
    onHoverStart: onHover,
    onHoverEnd: onLeave,
  };

  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...sharedProps}>
        <TooltipContent label={label} isHovered={isHovered} />
        <span className="flex items-center justify-center w-12 h-12 rounded-full">{icon}</span>
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...sharedProps}>
      <TooltipContent label={label} isHovered={isHovered} />
      <span className="flex items-center justify-center w-12 h-12 rounded-full">{icon}</span>
    </motion.button>
  );
};

const WHATSAPP_NUMBER = "918690393087";
const PHONE_NUMBER = "+918690393087";

const TAWK_CHAT_URL = "https://tawk.to/chat/68fb0774603401195169c6da/1j8a9a8jf";

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const checkState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      setShowBackToTop(scrollY > 400);
      setBannerVisible(document.body.getAttribute("data-offer-banner") === "true");
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(checkState); ticking = true; }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new MutationObserver(() => {
      setBannerVisible(document.body.getAttribute("data-offer-banner") === "true");
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-offer-banner"] });
    const interval = setInterval(checkState, 500);
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); clearInterval(interval); };
  }, []);

  const openTawk = () => {
    setIsOpen(false);
    if (isMobile) {
      navigate("/live-chat");
    } else {
      const tawk = (window as any).Tawk_API;
      if (tawk && tawk.maximize) {
        tawk.showWidget?.();
        tawk.maximize();
      } else {
        // Load Tawk script if not already loaded
        const existing = document.querySelector('script[src*="embed.tawk.to"]');
        if (!existing) {
          const s = document.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = `https://embed.tawk.to/68fb0774603401195169c6da/1j8a9a8jf`;
          s.charset = "UTF-8";
          s.setAttribute("crossorigin", "*");
          document.head.appendChild(s);
        }
        const interval = setInterval(() => {
          const t = (window as any).Tawk_API;
          if (t && t.maximize) {
            t.maximize();
            clearInterval(interval);
          }
        }, 300);
        setTimeout(() => clearInterval(interval), 10000);
      }
    }
  };

  const actions = [
    {
      label: "Live Chat",
      icon: <Headset className="w-5 h-5" />,
      onClick: openTawk,
      bg: "bg-primary",
      hover: "hover:bg-primary-hover",
    },
    {
      label: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20need%20help%20with%20Infinitive%20Cloud%20services.`,
      onClick: () => setIsOpen(false),
      bg: "bg-[hsl(142,70%,45%)]",
      hover: "hover:bg-[hsl(142,70%,38%)]",
    },
    {
      label: "Call Us",
      icon: <Phone className="w-5 h-5" />,
      href: `tel:${PHONE_NUMBER}`,
      onClick: () => setIsOpen(false),
      bg: "bg-secondary",
      hover: "hover:bg-[hsl(217,91%,50%)]",
    },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Back to top - always above everything */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`flex items-center justify-center w-14 h-14 rounded-full bg-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:scale-110 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col items-end gap-2.5"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
              closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
            }}
          >
            {actions.map((action) => {
              const classes = `group flex items-center gap-3 ${action.bg} ${action.hover} text-white rounded-full shadow-lg cursor-pointer`;

              return (
                <ActionButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  className={classes}
                  href={action.href}
                  onClick={action.onClick}
                  isHovered={hoveredLabel === action.label}
                  onHover={() => setHoveredLabel(action.label)}
                  onLeave={() => setHoveredLabel(null)}
                  variants={{
                    open: { opacity: 1, y: 0, scale: 1 },
                    closed: { opacity: 0, y: 20, scale: 0.8 },
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl ${
          isOpen
            ? "bg-foreground text-background"
            : "bg-primary text-primary-foreground"
        }`}
        aria-label={isOpen ? "Close support menu" : "Open support menu"}
        animate={
          isOpen
            ? { rotate: 180, y: 0 }
            : {
                rotate: 0,
                y: [0, -6, 0, -3, 0],
              }
        }
        transition={
          isOpen
            ? { type: "spring", stiffness: 300, damping: 20 }
            : {
                y: { duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" },
                rotate: { type: "spring", stiffness: 300, damping: 20 },
              }
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default SupportWidget;
