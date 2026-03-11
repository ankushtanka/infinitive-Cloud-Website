import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const currencies = [
  { code: "INR", symbol: "₹", label: "Indian Rupee", flag: "🇮🇳" },
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", label: "British Pound", flag: "🇬🇧" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", flag: "🇦🇪" },
];

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
];

const CurrencyLanguageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState(currencies[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 });
  const { setLanguage: setGlobalLanguage } = useLanguage();

  useEffect(() => {
    const savedCurrency = localStorage.getItem("ic_currency");
    const savedLanguage = localStorage.getItem("ic_language");
    if (savedCurrency) {
      const found = currencies.find((c) => c.code === savedCurrency);
      if (found) setCurrency(found);
    }
    if (savedLanguage) {
      const found = languages.find((l) => l.code === savedLanguage);
      if (found) setSelectedLanguage(found);
    }
  }, []);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPanelPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [open]);

  const handleCurrencyChange = (c: typeof currencies[0]) => {
    setCurrency(c);
    localStorage.setItem("ic_currency", c.code);
  };

  const handleLanguageChange = (l: typeof languages[0]) => {
    setSelectedLanguage(l);
    setGlobalLanguage(l.code);
  };

  const dropdown = open
    ? createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpen(false)} />
          <div
            className="fixed w-72 bg-background border border-border rounded-xl z-[9999] overflow-hidden"
            style={{
              top: panelPos.top,
              right: panelPos.right,
              boxShadow: "var(--shadow-strong)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Currency Section */}
            <div className="p-3 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
                Currency
              </p>
              <div className="grid grid-cols-1 gap-0.5">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCurrencyChange(c)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      currency.code === c.code
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="text-base">{c.flag}</span>
                    <span className="flex-1 text-left">
                      <span className="font-semibold">{c.code}</span>
                      <span className="text-muted-foreground ml-1.5 text-xs">{c.symbol} · {c.label}</span>
                    </span>
                    {currency.code === c.code && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Section */}
            <div className="p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
                Language
              </p>
              <div className="grid grid-cols-1 gap-0.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleLanguageChange(l)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                      language.code === l.code
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="flex-1 text-left">
                      <span className="font-semibold">{l.label}</span>
                      <span className="text-muted-foreground ml-1.5 text-xs">{l.native}</span>
                    </span>
                    {language.code === l.code && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex items-center gap-1.5 p-2 text-foreground/70 hover:text-primary rounded-lg transition-colors"
        aria-label="Currency & Language"
        title="Currency & Language"
        type="button"
      >
        <Globe className="w-5 h-5" />
        <span className="text-xs font-bold hidden xl:inline">{currency.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {dropdown}
    </>
  );
};

export default CurrencyLanguageDropdown;
