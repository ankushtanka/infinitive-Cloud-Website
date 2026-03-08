import { useState } from "react";
import { MessageCircle, Phone, Headphones, X } from "lucide-react";

const FloatingSupportButtons = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 animate-fade-in">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Support
          </a>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <Headphones className="w-4 h-4" />
            Live Chat
          </button>
          <a
            href="/contact"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <Phone className="w-4 h-4" />
            Contact Sales
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        aria-label="Support options"
      >
        {open ? <X className="w-6 h-6" /> : <Headphones className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default FloatingSupportButtons;
