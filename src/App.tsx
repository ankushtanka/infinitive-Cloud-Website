import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import CloudHosting from "./pages/solutions/CloudHosting";
import VPSHosting from "./pages/solutions/VPSHosting";
import WebDevelopment from "./pages/solutions/WebDevelopment";
import MobileApps from "./pages/solutions/MobileApps";
import AISolutions from "./pages/solutions/AISolutions";
import Pricing from "./pages/Pricing";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SLA from "./pages/SLA";
import Refund from "./pages/Refund";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/cloud-hosting" element={<CloudHosting />} />
            <Route path="/solutions/vps-hosting" element={<VPSHosting />} />
            <Route path="/solutions/web-development" element={<WebDevelopment />} />
            <Route path="/solutions/mobile-apps" element={<MobileApps />} />
            <Route path="/solutions/ai-solutions" element={<AISolutions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sla" element={<SLA />} />
            <Route path="/refund" element={<Refund />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
