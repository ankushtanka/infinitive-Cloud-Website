import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const domainExtensions = [
  { ext: ".com", price: "₹799/yr", renewal: "₹1,199/yr" },
  { ext: ".in", price: "₹449/yr", renewal: "₹699/yr" },
  { ext: ".co.in", price: "₹299/yr", renewal: "₹499/yr" },
  { ext: ".net", price: "₹899/yr", renewal: "₹1,299/yr" },
  { ext: ".org", price: "₹749/yr", renewal: "₹1,099/yr" },
  { ext: ".online", price: "₹199/yr", renewal: "₹599/yr" },
  { ext: ".site", price: "₹199/yr", renewal: "₹499/yr" },
  { ext: ".xyz", price: "₹99/yr", renewal: "₹299/yr" },
];

const placeholderWords = ["mybusiness.com", "mystore.in", "myagency.site"];

const DomainSearchSection = () => {
  const [domain, setDomain] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    if (domain || inputFocused) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = placeholderWords[wordIndexRef.current];
      if (!isDeletingRef.current) {
        charIndexRef.current++;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        timeout = setTimeout(tick, charIndexRef.current === word.length ? 1800 : 110);
        if (charIndexRef.current === word.length) isDeletingRef.current = true;
      } else {
        charIndexRef.current--;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % placeholderWords.length;
        }
        timeout = setTimeout(tick, charIndexRef.current === 0 ? 350 : 55);
      }
    };
    timeout = setTimeout(tick, 100);
    return () => clearTimeout(timeout);
  }, [domain, inputFocused]);

  return (
    <section className="py-20 md:py-32 bg-muted/30" id="domains">
      <div className="section-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Find Your <span className="gradient-text">Domain</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Domain registration included free with all hosting plans. No surprises at renewal.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={domain ? "" : (!inputFocused ? `${animatedPlaceholder}|` : "Search your domain...")}
                value={domain}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onChange={(e) => setDomain(e.target.value)}
                className="pl-12 h-12 md:h-14 text-base rounded-lg border-2 focus:border-accent bg-background"
              />
            </div>
            <Button type="submit" className="btn-gold h-12 md:h-14 px-6 md:px-8">
              Search
            </Button>
          </form>
        </div>

        {/* Domain Extensions - clean list */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {domainExtensions.map((d) => (
              <div key={d.ext} className="p-4 rounded-lg border border-border bg-card text-center hover:border-accent/30 transition-colors">
                <span className="text-lg md:text-xl font-bold text-foreground block" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{d.ext}</span>
                <span className="text-sm font-semibold text-accent block mt-1">{d.price}</span>
                <span className="text-[10px] text-muted-foreground">Renewal: {d.renewal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/solutions/domains">
            <Button variant="outline" className="btn-gold-outline text-sm">
              View All Extensions
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomainSearchSection;
