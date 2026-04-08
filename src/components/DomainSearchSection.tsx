import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Globe, ArrowRight, Shield, Zap, Clock, Lock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDomainSearch } from "@/hooks/use-domain-search";
import DomainResultsGrid from "@/components/DomainResultsGrid";

const fallbackTlds = [
  { ext: ".com", price: "₹799", original: "₹1,199", tag: "Most Popular", color: "from-primary to-accent" },
  { ext: ".in", price: "₹449", original: "₹699", tag: "India #1", color: "from-emerald-500 to-teal-500" },
  { ext: ".co.in", price: "₹299", original: "₹499", tag: null, color: "from-slate-500 to-slate-600" },
  { ext: ".net", price: "₹899", original: "₹1,299", tag: null, color: "from-blue-500 to-indigo-500" },
  { ext: ".org", price: "₹749", original: "₹1,099", tag: null, color: "from-violet-500 to-purple-500" },
  { ext: ".online", price: "₹199", original: "₹599", tag: "Best Value", color: "from-orange-500 to-amber-500" },
  { ext: ".site", price: "₹199", original: "₹499", tag: null, color: "from-pink-500 to-rose-500" },
  { ext: ".xyz", price: "₹99", original: "₹299", tag: "Cheapest", color: "from-cyan-500 to-sky-500" },
];

const perks = [
  { icon: Shield, label: "Free WHOIS Privacy" },
  { icon: Zap, label: "Instant Activation" },
  { icon: Clock, label: "24/7 DNS Management" },
  { icon: Lock, label: "Free SSL Included" },
];

const placeholderWords = [
  "mybusiness.com",
  "mystore.in",
  "myportfolio.net",
  "mycompany.co.in",
  "mywebsite.online",
  "mybrand.org",
  "myagency.site",
  "mystartup.xyz",
];

const DomainSearchSection: React.FC = () => {
  const [domain, setDomain] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const { loading, results, suggestions, searched, checkTime, search, reset } = useDomainSearch();

  useEffect(() => {
    if (domain || inputFocused) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = placeholderWords[wordIndexRef.current];
      if (!isDeletingRef.current) {
        charIndexRef.current++;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === word.length) {
          isDeletingRef.current = true;
          timeout = setTimeout(tick, 1800);
        } else timeout = setTimeout(tick, 110);
      } else {
        charIndexRef.current--;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % placeholderWords.length;
          timeout = setTimeout(tick, 350);
        } else timeout = setTimeout(tick, 55);
      }
    };
    timeout = setTimeout(tick, 100);
    return () => clearTimeout(timeout);
  }, [domain, inputFocused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(domain);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="domains">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs sm:text-sm px-5 py-2 rounded-full mb-4 md:mb-5 border border-primary/10">
            <Globe className="w-4 h-4" />
            Domain Registration Starting at{" "}
            <span className="font-mono tabular-nums">₹799</span>/yr
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-5 leading-tight">
            Find Your Perfect{" "}
            <span className="gradient-text">Domain Name</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Register your domain at India's lowest prices. Free WHOIS privacy &
            SSL included with every domain.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-14">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              {/* Outer rotating conic gradient border */}
              <div
                className={`absolute -inset-[2px] rounded-xl transition-all duration-700 ${
                  inputFocused ? "opacity-100" : "opacity-20 group-hover:opacity-40"
                }`}
                style={{
                  background: "conic-gradient(from var(--border-angle, 0deg), hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))",
                  animation: inputFocused ? "border-rotate 3s linear infinite" : "border-rotate 8s linear infinite",
                }}
              />
              {/* Soft glow layer */}
              <div
                className={`absolute -inset-[3px] rounded-xl transition-all duration-700 ${
                  inputFocused ? "opacity-60 blur-[8px]" : "opacity-0"
                }`}
                style={{
                  background: "conic-gradient(from var(--border-angle, 0deg), hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))",
                  animation: "border-rotate 3s linear infinite",
                }}
              />
              {/* Inner shimmer pulse */}
              <div
                className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 bg-[length:200%_100%] transition-opacity duration-500 ${
                  inputFocused ? "opacity-60 animate-[shimmer_2s_ease-in-out_infinite]" : "opacity-0"
                }`}
              />
              <div className="relative">
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 ${
                    inputFocused
                      ? "text-primary scale-110 drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]"
                      : "text-muted-foreground scale-100"
                  }`}
                />
                <Input
                  type="text"
                  placeholder={
                    domain
                      ? ""
                      : !inputFocused
                        ? `${animatedPlaceholder}|`
                        : "Enter your domain name..."
                  }
                  value={domain}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    reset();
                  }}
                  className="pl-12 h-13 md:h-14 text-base md:text-lg rounded-xl border-0 bg-background focus-visible:ring-0 transition-all duration-500"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="btn-gradient h-13 md:h-14 px-8 md:px-10 rounded-xl font-bold text-sm md:text-base shrink-0"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Search className="w-5 h-5 mr-2" />
              )}
              {loading ? "Searching..." : "Search Domain"}
            </Button>
          </form>

          {/* Perks row */}
          <div className="hidden sm:flex flex-wrap justify-center gap-x-8 gap-y-2 mt-5">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <perk.icon className="w-4 h-4 text-primary/70" />
                <span>{perk.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        {searched && (
          <div className="max-w-5xl mx-auto mb-10 md:mb-14">
            {!loading && checkTime && results.length > 0 && (
              <p className="text-xs text-muted-foreground text-center mb-4">
                Checked {results.length} extensions in {checkTime.toFixed(1)}s
              </p>
            )}
            <DomainResultsGrid
              results={results}
              suggestions={suggestions}
              loading={loading}
              searched={searched}
              searchQuery={domain.trim()}
            />
            {!loading && results.length > 0 && (
              <div className="mt-8 text-center">
                <Link
                  to={`/solutions/domains?search=${encodeURIComponent(domain.trim())}`}
                >
                  <Button className="btn-gradient font-bold h-12 px-10 text-base rounded-xl">
                    View All Extensions{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Default TLD Cards */}
        {!searched && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {fallbackTlds.map((tld, i) => (
              <Card
                key={tld.ext}
                className={`relative overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up group ${
                  tld.tag ? "border-primary/20 shadow-md" : "border-border"
                } ${i >= 4 ? "hidden sm:block" : ""}`}
                style={{
                  animationDelay: `${i * 0.06}s`,
                  boxShadow: "var(--shadow-soft)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 32px -8px hsl(var(--primary) / 0.3), 0 0 20px hsl(var(--primary) / 0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "var(--shadow-soft)";
                }}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tld.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                />
                {tld.tag && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3">
                    <span className="text-[9px] md:text-[10px] font-bold bg-badge text-badge-foreground px-2 md:px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                      {tld.tag}
                    </span>
                  </div>
                )}
                <CardContent className="p-4 md:p-6 pt-6 md:pt-8 text-center">
                  <span className="text-xl md:text-3xl font-black text-foreground block tracking-tight">
                    {tld.ext}
                  </span>
                  <div
                    className={`w-8 h-0.5 mx-auto mt-2 mb-3 md:mb-4 rounded-full bg-gradient-to-r ${tld.color} opacity-60`}
                  />
                  <div>
                    <span className="text-xs md:text-sm text-muted-foreground line-through block mb-0.5">
                      <span className="font-mono tabular-nums">
                        {tld.original}
                      </span>
                      /yr
                    </span>
                    <span className="text-2xl md:text-4xl font-black gradient-text">
                      <span className="font-mono tabular-nums">
                        {tld.price}
                      </span>
                    </span>
                    <span className="text-xs md:text-base text-muted-foreground">
                      /yr
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 md:mt-5 w-full font-semibold text-xs md:text-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/cart?domain=yourdomain${tld.ext}&price=${tld.price.replace('₹', '').replace(',', '')}&renewPrice=`;
                    }}
                  >
                    Register
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className="text-center mt-10 md:mt-12">
          <Link to="/solutions/domains">
            <Button
              size="lg"
              variant="outline"
              className="group text-sm md:text-base rounded-xl"
            >
              View All 500+ Domain Extensions
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
};

export default DomainSearchSection;
