import { useEffect, useRef, useState, ReactNode } from "react";

/**
 * Renders children only while they are near/in the viewport. When the
 * element scrolls far away, children are unmounted so heavy SVG SMIL
 * animations / framer-motion loops stop consuming CPU.
 *
 * Big perf win for infographic-heavy solution pages.
 */
interface Props {
  children: ReactNode;
  /** Min height while not yet mounted, prevents layout shift. */
  minHeight?: number | string;
  /** rootMargin for the observer. Default mounts ~300px before entry. */
  rootMargin?: string;
  /** If true, once mounted stay mounted (skip unmount on exit). */
  keepMounted?: boolean;
  className?: string;
}

const LazyVisible = ({
  children,
  minHeight = 320,
  rootMargin = "300px",
  keepMounted = false,
  className,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        if (inView) {
          setVisible(true);
          if (keepMounted) io.disconnect();
        } else if (!keepMounted) {
          setVisible(false);
        }
      },
      { rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin, keepMounted]);

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
