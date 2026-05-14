import { useEffect, useRef, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Lenis from "lenis";
import SupportWidget from "@/components/SupportWidget";
import useThemeFavicon from "@/hooks/use-theme-favicon";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminProvider } from "@/contexts/AdminContext";
import PageTranslator from "@/components/PageTranslator";
import Index from "./pages/Index";

// Lazy load non-critical pages
const About = lazy(() => import("./pages/About"));
const OurCompany = lazy(() => import("./pages/OurCompany"));
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
const ServerLicenses = lazy(() => import("./pages/solutions/ServerLicenses"));
const WebDevelopment = lazy(() => import("./pages/solutions/WebDevelopment"));
const MobileApps = lazy(() => import("./pages/solutions/MobileApps"));
const AISolutions = lazy(() => import("./pages/solutions/AISolutions"));
const OdooSolutions = lazy(() => import("./pages/solutions/OdooSolutions"));
const WooCommerceHosting = lazy(() => import("./pages/solutions/WooCommerceHosting"));
const NodejsHosting = lazy(() => import("./pages/solutions/NodejsHosting"));
const VPSServer = lazy(() => import("./pages/solutions/VPSServer"));
const EmailSecurity = lazy(() => import("./pages/solutions/EmailSecurity"));
const N8nHosting = lazy(() => import("./pages/solutions/N8nHosting"));
const OpenWebUIHosting = lazy(() => import("./pages/solutions/OpenWebUIHosting"));
const GoogleWorkspace = lazy(() => import("./pages/solutions/GoogleWorkspace"));
const BusinessEmail = lazy(() => import("./pages/solutions/BusinessEmail"));

const LiveChat = lazy(() => import("./pages/LiveChat"));
const Cart = lazy(() => import("./pages/Cart"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const DomainTransfer = lazy(() => import("./pages/DomainTransfer"));
const DomainManagement = lazy(() => import("./pages/DomainManagement"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const FreeTrial = lazy(() => import("./pages/FreeTrial"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminPricing = lazy(() => import("./pages/admin/AdminPricing"));
const AdminContent = lazy(() => import("./pages/admin/AdminContent"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminPages = lazy(() => import("./pages/admin/AdminPages"));
const AdminPageEditor = lazy(() => import("./pages/admin/AdminPageEditor"));

const queryClient = new QueryClient();

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
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
  useThemeFavicon();
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
      <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <LenisProvider>
            <ScrollToTop />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/our-company" element={<OurCompany />} />
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
                <Route path="/solutions/server-licenses" element={<ServerLicenses />} />
                <Route path="/solutions/web-development" element={<WebDevelopment />} />
                <Route path="/solutions/mobile-apps" element={<MobileApps />} />
                <Route path="/solutions/ai-solutions" element={<AISolutions />} />
                <Route path="/solutions/odoo-solutions" element={<OdooSolutions />} />
                <Route path="/solutions/woocommerce-hosting" element={<WooCommerceHosting />} />
                <Route path="/solutions/nodejs-hosting" element={<NodejsHosting />} />
                <Route path="/solutions/vps-server" element={<VPSServer />} />
                <Route path="/solutions/email-security" element={<EmailSecurity />} />
                <Route path="/solutions/n8n-hosting" element={<N8nHosting />} />
                <Route path="/solutions/openclaw" element={<OpenWebUIHosting />} />
                <Route path="/solutions/google-workspace" element={<GoogleWorkspace />} />
                <Route path="/solutions/business-email" element={<BusinessEmail />} />
                
                <Route path="/live-chat" element={<LiveChat />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/domain-transfer" element={<DomainTransfer />} />
                <Route path="/domain-management" element={<DomainManagement />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/free-trial" element={<FreeTrial />} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="pricing" element={<AdminPricing />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="pages" element={<AdminPages />} />
                  <Route path="pages/edit/:pageKey" element={<AdminPageEditor />} />
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <SupportWidget />

            <PageTranslator />
          </LenisProvider>
        </BrowserRouter>
      </TooltipProvider>
      </LanguageProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
};

export default App;
