import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * Renders children only once they scroll into the viewport.
 * Massive perf win for heavy SVG infographics with SMIL <animate> loops,
 * which otherwise consume CPU even when off-screen.
 */
interface Props {
  children: ReactNode;
  /** Min height while not yet mounted, prevents layout shift. */
  minHeight?: number | string;
  /** rootMargin for the observer. Default: 200px before entering viewport. */
  rootMargin?: string;
  className?: string;
}

const LazyVisible = ({ children, minHeight = 320, rootMargin = "200px", className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        minHeight: visible ? undefined : minHeight,
        contentVisibility: "auto" as const,
        containIntrinsicSize: typeof minHeight === "number" ? `${minHeight}px` : minHeight,
      }}
    >
      {visible ? children : null}
    </div>
  );
};

export default LazyVisible;
