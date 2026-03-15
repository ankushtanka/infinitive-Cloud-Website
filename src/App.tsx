import { useEffect, useRef, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Lenis from "lenis";

import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import PageTranslator from "@/components/PageTranslator";
import Index from "./pages/Index";

// Lazy load non-critical pages
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Careers = lazy(() => import("./pages/Careers"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const SLA = lazy(() => import("./pages/SLA"));
const Refund = lazy(() => import("./pages/Refund"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Knowledgebase = lazy(() => import("./pages/Knowledgebase"));
const Quote = lazy(() => import("./pages/Quote"));

// Solution pages
const SharedHosting = lazy(() => import("./pages/solutions/SharedHosting"));
const VPSHosting = lazy(() => import("./pages/solutions/VPSHosting"));
const CloudHosting = lazy(() => import("./pages/solutions/CloudHosting"));
const DedicatedServers = lazy(() => import("./pages/solutions/DedicatedServers"));
const ResellerHosting = lazy(() => import("./pages/solutions/ResellerHosting"));
const WordPressHosting = lazy(() => import("./pages/solutions/WordPressHosting"));
const GPUDedicatedServer = lazy(() => import("./pages/solutions/GPUDedicatedServer"));
const StreamingServers = lazy(() => import("./pages/solutions/StreamingServers"));
const SSLCertificates = lazy(() => import("./pages/solutions/SSLCertificates"));
const DomainRegistration = lazy(() => import("./pages/solutions/DomainRegistration"));
const ServerManagement = lazy(() => import("./pages/solutions/ServerManagement"));
const CloudMigration = lazy(() => import("./pages/solutions/CloudMigration"));

const queryClient = new QueryClient();

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Reset Lenis scroll position on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LenisProvider>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/sla" element={<SLA />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/knowledgebase" element={<Knowledgebase />} />

                {/* Solution pages */}
                <Route path="/solutions/shared-hosting" element={<SharedHosting />} />
                <Route path="/solutions/vps-hosting" element={<VPSHosting />} />
                <Route path="/solutions/cloud-hosting" element={<CloudHosting />} />
                <Route path="/solutions/dedicated-servers" element={<DedicatedServers />} />
                <Route path="/solutions/reseller-hosting" element={<ResellerHosting />} />
                <Route path="/solutions/wordpress-hosting" element={<WordPressHosting />} />
                <Route path="/solutions/gpu-dedicated-server" element={<GPUDedicatedServer />} />
                <Route path="/solutions/streaming-servers" element={<StreamingServers />} />
                <Route path="/solutions/ssl-certificates" element={<SSLCertificates />} />
                <Route path="/solutions/domains" element={<DomainRegistration />} />
                <Route path="/solutions/server-management" element={<ServerManagement />} />
                <Route path="/solutions/cloud-migration" element={<CloudMigration />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            
            <BackToTop />
            <PageTranslator />
          </LenisProvider>
        </BrowserRouter>
      </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
