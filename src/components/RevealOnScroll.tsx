import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  /** Stagger children when used as a container */
  stagger?: number;
  as?: "div" | "section" | "article" | "ul" | "li";
}

/**
 * Premium scroll-reveal wrapper.
 * - Fade + lift on entry (once)
 * - Honors prefers-reduced-motion via framer-motion defaults
 * - When `stagger` is set, child <RevealItem /> elements animate in sequence
 */
export const RevealOnScroll = ({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.7,
  stagger,
  as = "div",
}: RevealOnScrollProps) => {
  const MotionTag = motion[as] as typeof motion.div;

  if (stagger) {
    const container: Variants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    };
    return (
      <MotionTag
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export const RevealItem = ({
  children,
  className,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}) => {
  const MotionTag = motion[as] as typeof motion.div;
  const item: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
};

export default RevealOnScroll;
