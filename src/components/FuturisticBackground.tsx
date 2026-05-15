import { useEffect, useRef } from "react";

/**
 * Premium futuristic animated background.
 * - Animated mesh grid with parallax tilt
 * - Floating glowing orbs (canvas particles)
 * - Scanning beam line
 * - Aurora gradient blobs
 * Pure CSS + lightweight canvas. Pointer-events disabled.
 */
const FuturisticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(60, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const alpha = (1 - d2 / 14000) * 0.25;
            ctx.strokeStyle = `hsla(186, 100%, 55%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Glowing dot
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(186, 100%, 65%, ${p.a})`);
        grad.addColorStop(1, "hsla(186, 100%, 55%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(199, 100%, 75%, ${p.a + 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.18] dark:opacity-25 futuristic-grid" />

      {/* Aurora blobs */}
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-30 aurora-blob-1"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.6), transparent 60%)" }} />
      <div className="absolute -bottom-40 -right-40 w-[44rem] h-[44rem] rounded-full blur-3xl opacity-25 aurora-blob-2"
        style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.55), transparent 60%)" }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 aurora-blob-3"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.5), transparent 60%)" }} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Scan beam */}
      <div className="absolute inset-x-0 top-0 h-[2px] scan-beam" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />

      <style>{`
        .futuristic-grid {
          background-image:
            linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%);
          animation: gridShift 18s linear infinite;
          transform-origin: center;
        }
        @keyframes gridShift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 60px 60px, 60px 60px; }
        }
        .aurora-blob-1 { animation: floatA 14s ease-in-out infinite; }
        .aurora-blob-2 { animation: floatB 18s ease-in-out infinite; }
        .aurora-blob-3 { animation: floatC 22s ease-in-out infinite; }
        @keyframes floatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -20px) scale(1.1); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-50%, -40px) scale(1.05); }
        }
        .scan-beam {
          background: linear-gradient(90deg,
            transparent,
            hsl(var(--primary) / 0.8),
            hsl(var(--secondary) / 0.6),
            transparent);
          filter: blur(1px);
          box-shadow: 0 0 24px hsl(var(--primary) / 0.6);
          animation: scanMove 7s ease-in-out infinite;
        }
        @keyframes scanMove {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(85vh); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .futuristic-grid, .aurora-blob-1, .aurora-blob-2, .aurora-blob-3, .scan-beam {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FuturisticBackground;
