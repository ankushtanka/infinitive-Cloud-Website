import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const TAWK_PROPERTY_ID = "68fb0774603401195169c6da";
const TAWK_WIDGET_ID = "1j8a9a8jf";

const LiveChat = () => {
  return (
    <>
      <PageSEO
        title="Live Chat Support | Infinitive Cloud"
        description="Chat live with our support team for instant help with hosting, servers, and cloud services."
        canonical="https://infinitivecloud.com/live-chat"
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

        {/* Tawk.to embedded via direct chat URL in iframe */}
        <div className="flex-1 relative">
          <iframe
            src={`https://tawk.to/chat/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`}
            className="absolute inset-0 w-full h-full border-0"
            title="Live Chat Support"
            allow="microphone; camera"
          />
        </div>
      </div>
    </>
  );
};

export default LiveChat;
