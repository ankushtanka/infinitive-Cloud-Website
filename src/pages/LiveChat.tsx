import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const TAWK_PROPERTY_ID = "68fb0774603401195169c6da";
const TAWK_WIDGET_ID = "1j8a9a8jf";

const LiveChat = () => {
  useEffect(() => {
    // Load Tawk.to script
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);

    // Maximize the widget once loaded
    const interval = setInterval(() => {
      if (window.Tawk_API && window.Tawk_API.maximize) {
        window.Tawk_API.maximize();
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      // Clean up tawk script
      s.remove();
      if (window.Tawk_API) {
        try {
          window.Tawk_API.hideWidget?.();
        } catch {}
      }
      // Remove tawk iframe elements
      document.querySelectorAll('iframe[title*="chat"]').forEach(el => el.remove());
      document.querySelectorAll('[id^="tawk-"]').forEach(el => el.remove());
    };
  }, []);

  return (
    <>
      <PageSEO
        title="Live Chat Support | Infinitive Cloud"
        description="Chat live with our support team for instant help with hosting, servers, and cloud services."
      />
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft">
          <div className="section-container flex items-center h-14 gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="ml-auto text-sm font-bold text-primary">Live Chat Support</div>
          </div>
        </div>

        {/* Chat area - Tawk.to will render its widget here */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p className="text-muted-foreground font-medium">Loading live chat...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
