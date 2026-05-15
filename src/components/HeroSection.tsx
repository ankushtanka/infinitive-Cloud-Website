import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  Server,
  Cloud,
  Shield,
  Zap,
  Database,
  Users,
  Lock,
  Globe,
  Check,
  ChevronRight,
} from "lucide-react";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  return (
    <div ref={containerRef} className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] pt-24 pb-24 md:pt-28 md:pb-28 lg:min-h-[calc(100vh-5.75rem)] lg:pt-[7.5rem] lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">Powered by Enterprise Technology</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Next-Gen Cloud Infrastructure,{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Built for Performance
                </span>
              </h1>

              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Deploy faster with ultra-reliable cloud servers. Get 99.99% uptime,
                lightning-fast speeds, and enterprise-grade security.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center gap-2 group">
                  Start Free Trial
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-medium transition-all">
                  View Pricing
                </button>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-300">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-300">Free migration support</span>
                </div>
              </div>
            </motion.div>

            {/* Right - 3D Server Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px]"
              style={{ perspective: "1200px" }}
            >
              {/* Central Server Stack */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 via-purple-500/40 to-transparent blur-3xl rounded-full scale-150" />

                  {/* 3D Server Container with scroll rotation */}
                  <motion.div
                    className="relative w-64 h-80"
                    style={{
                      transformStyle: "preserve-3d",
                      rotateY,
                      rotateX,
                    }}
                  >
                    {/* Front face */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
                      style={{
                        transform: "translateZ(40px)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Server panels */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="h-16 border-b border-slate-700 px-4 flex items-center gap-3"
                        >
                          <div className="flex gap-1.5">
                            <motion.div
                              animate={{
                                backgroundColor: ["#3b82f6", "#8b5cf6", "#3b82f6"],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              className="w-2 h-2 rounded-full"
                            />
                            <div className="w-2 h-2 bg-slate-600 rounded-full" />
                            <div className="w-2 h-2 bg-slate-600 rounded-full" />
                          </div>
                          <div className="flex-1 flex gap-1">
                            {[...Array(8)].map((_, j) => (
                              <div
                                key={j}
                                className="flex-1 h-1.5 bg-slate-700 rounded"
                              />
                            ))}
                          </div>
                        </motion.div>
                      ))}
                      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-500/30 to-transparent" />
                    </div>

                    {/* Back face */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
                      style={{
                        transform: "translateZ(-40px) rotateY(180deg)",
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-16 border-b border-slate-700 px-4 flex items-center justify-center"
                        >
                          <div className="flex gap-2">
                            {[...Array(12)].map((_, j) => (
                              <div
                                key={j}
                                className="w-1 h-8 bg-slate-700 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-purple-500/30 to-transparent" />
                    </div>

                    {/* Left face */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-slate-850 to-slate-900 rounded-l-2xl border-l border-slate-700 shadow-2xl overflow-hidden"
                      style={{
                        transform: "rotateY(-90deg) translateZ(40px)",
                        width: "80px",
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-16 border-b border-slate-700 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-slate-700 rounded-full" />
                        </div>
                      ))}
                    </div>

                    {/* Right face */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-slate-850 to-slate-900 rounded-r-2xl border-r border-slate-700 shadow-2xl overflow-hidden"
                      style={{
                        transform: "rotateY(90deg) translateZ(224px)",
                        width: "80px",
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-16 border-b border-slate-700 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-slate-700 rounded-full" />
                        </div>
                      ))}
                    </div>

                    {/* Top face */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-t-2xl border-t border-slate-600 shadow-2xl"
                      style={{
                        transform: "rotateX(90deg) translateZ(0px)",
                        height: "80px",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                    </div>

                    {/* Bottom face */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 rounded-b-2xl border-b border-slate-800 shadow-2xl"
                      style={{
                        transform: "rotateX(-90deg) translateZ(320px)",
                        height: "80px",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
                    </div>

                    {/* Orbiting elements - adjusted to work with 3D rotation */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(80px)",
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-400" />
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(80px)",
                      }}
                    >
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl flex items-center justify-center">
                        <Database className="w-6 h-6 text-purple-400" />
                      </div>
                    </motion.div>

                    {/* Additional orbiting icons */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(80px)",
                      }}
                    >
                      <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-10 h-10 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-cyan-400" />
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(80px)",
                      }}
                    >
                      <div className="absolute top-1/2 -right-12 -translate-y-1/2 w-10 h-10 bg-pink-500/20 backdrop-blur-sm border border-pink-500/30 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-pink-400" />
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-20 left-0 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">99.99%</div>
                    <div className="text-xs text-slate-400">Uptime</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute top-32 right-0 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">35+</div>
                    <div className="text-xs text-slate-400">Data Centers</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-20 left-8 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl p-4 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">DDoS</div>
                    <div className="text-xs text-slate-400">Protection</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
