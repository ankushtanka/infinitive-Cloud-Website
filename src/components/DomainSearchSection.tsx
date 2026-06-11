import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Globe, ArrowRight, Shield, Zap, Clock, Lock, Loader2, CheckCircle2, XCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useDomainSearch } from "@/hooks/use-domain-search";
import DomainResultsGrid from "@/components/DomainResultsGrid";
import { useDomainPricing } from "@/hooks/use-domain-pricing";
import { bulkDomainSearch, checkSingleDomain } from "@/lib/whmcs";
import { whmcsDomainUrl } from "@/config/whmcs-links";

const fallbackTlds = [
  { ext: ".com", price: 799, original: "₹1,199", popular: true, type: "Global", desc: "Most trusted extension worldwide" },
  { ext: ".in", price: 449, original: "₹699", popular: false, type: "India", desc: "India's official country domain" },
  { ext: ".co.in", price: 299, original: "₹499", popular: false, type: "India", desc: "Business domain for India" },
  { ext: ".net", price: 899, original: "₹1,299", popular: false, type: "Network", desc: "Ideal for tech & networks" },
  { ext: ".org", price: 749, original: "₹1,099", popular: false, type: "Organisation", desc: "Trusted by NGOs & nonprofits" },
  { ext: ".online", price: 199, original: "₹599", popular: false, type: "Generic", desc: "Best value online presence" },
  { ext: ".site", price: 199, original: "₹499", popular: false, type: "Generic", desc: "Perfect for any website" },
  { ext: ".xyz", price: 99, original: "₹299", popular: false, type: "Generic", desc: "Cheapest modern extension" },
];

const TLD_KEYS = fallbackTlds.map((t) => t.ext);

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

interface DomainSearchSectionProps {
  title?: string;
  subtitle?: string;
}

const DomainSearchSection: React.FC<DomainSearchSectionProps> = ({ title, subtitle }) => {
  const [domain, setDomain] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const { loading, results, suggestions, searched, checkTime, search, reset } = useDomainSearch();
  const { prices: livePrices, loading: pricesLoading } = useDomainPricing(TLD_KEYS);

  // Inline TLD availability check state
  const [activeTld, setActiveTld] = useState<string | null>(null);
  const [tldInput, setTldInput] = useState("");
  const [tldStatus, setTldStatus] = useState<"idle" | "checking" | "available" | "taken" | "unknown">("idle");
  const tldInputRef = useRef<HTMLInputElement>(null);

  const openTldSearch = (ext: string) => {
    const opening = activeTld !== ext;
    setActiveTld(opening ? ext : null);
    if (!opening) return;
    const baseName = domain.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    setTldInput(baseName);
    setTldStatus("idle");
    setTimeout(() => tldInputRef.current?.focus(), 120);
  };

  const checkTldDomain = async (ext: string) => {
    const baseName = tldInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!baseName) return;
    setTldStatus("checking");
    try {
      const res = await bulkDomainSearch(baseName);
      const match = res.domains?.find((d: any) => d.domain === `${baseName}${ext}`);
      if (match !== undefined) {
        setTldStatus(match.available ? "available" : "taken");
      } else {
        const single = await checkSingleDomain(`${baseName}${ext}`);
        if (single?.result === "success" && single.available === true) {
          setTldStatus("available");
        } else if (single?.result === "success" && single.available === false) {
          setTldStatus("taken");
        } else {
          setTldStatus("unknown");
        }
      }
    } catch { setTldStatus("idle"); }
  };

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
            {title ? title : <>Find Your Perfect{" "}<span className="gradient-text">Domain Name</span></>}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle || "Register your domain at India's lowest prices. Free WHOIS privacy & SSL included with every domain."}
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
                  id="domain-search-input"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {fallbackTlds.map((tld, i) => {
              const rawPrice = livePrices[tld.ext]?.register ?? tld.price;
              const renewPrice = livePrices[tld.ext]?.renew ?? 0;
              const isExpanded = activeTld === tld.ext;
              const staticOrigNum = parseInt(tld.original.replace(/[₹,]/g, ""), 10);
              const showOrig = rawPrice < staticOrigNum;

              return (
                <Card
                  key={tld.ext}
                  className={`animate-fade-in-up relative overflow-hidden transition-all duration-300 group ${
                    tld.popular ? "border-primary/40 shadow-lg shadow-primary/10" : "border-border"
                  } ${isExpanded ? "ring-2 ring-primary shadow-lg shadow-primary/20" : "hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1"} ${i >= 4 ? "hidden sm:block" : ""}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-opacity duration-300 ${tld.popular ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                  <CardContent className="p-5 flex flex-col h-full text-center">
                    {/* Badge row — fixed height so all cards align */}
                    <div className="h-5 flex items-center justify-center mb-2">
                      {tld.popular && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/8 px-2 py-0.5 rounded-full border border-primary/20">
                          <Star className="w-2.5 h-2.5 fill-primary" /> Popular
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black gradient-text mb-0.5">{tld.ext}</h3>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{tld.type}</p>
                    <p className="text-[11px] text-muted-foreground/60 mb-4 leading-tight">{tld.desc}</p>
                    {/* Price — fixed min-height */}
                    <div className="min-h-[52px] flex flex-col items-center justify-end mb-1">
                      {showOrig && (
                        <span className="text-xs text-muted-foreground line-through">{tld.original}/yr</span>
                      )}
                      {pricesLoading ? (
                        <span className="inline-block h-7 w-24 rounded bg-muted animate-pulse mt-1" />
                      ) : (
                        <span className="text-xl md:text-2xl font-black text-foreground">
                          ₹{rawPrice.toLocaleString("en-IN")}
                          <span className="text-sm font-medium text-muted-foreground">/yr</span>
                        </span>
                      )}
                    </div>
                    {/* Button pushed to bottom */}
                    <div className="mt-auto pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs font-bold h-9 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => openTldSearch(tld.ext)}
                      >
                        {isExpanded ? "Close ✕" : "Check Availability"}
                      </Button>
                    </div>

                    {/* Inline availability check — expands on click */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-border text-left">
                        <p className="text-[11px] text-muted-foreground mb-2">
                          Check a name for <span className="font-bold text-foreground">{tld.ext}</span>
                        </p>
                        <div className="flex gap-1.5">
                          <Input
                            ref={tldInputRef}
                            value={tldInput}
                            onChange={(e) => { setTldInput(e.target.value); setTldStatus("idle"); }}
                            placeholder={`name${tld.ext}`}
                            className="h-8 text-xs rounded-lg flex-1 min-w-0"
                            onKeyDown={(e) => e.key === "Enter" && checkTldDomain(tld.ext)}
                          />
                          <Button
                            size="sm"
                            className="h-8 px-3 text-xs shrink-0"
                            onClick={() => checkTldDomain(tld.ext)}
                            disabled={tldStatus === "checking" || !tldInput.trim()}
                          >
                            {tldStatus === "checking" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Check"}
                          </Button>
                        </div>

                        {tldStatus === "available" && (
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-green-600 font-semibold flex items-center gap-1 min-w-0 truncate">
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              {tldInput.replace(/[^a-z0-9-]/g, "")}{tld.ext} available!
                            </span>
                            <Button
                              size="sm"
                              className="h-7 px-3 text-[11px] btn-gradient shrink-0"
                              onClick={() => {
                                const bn = tldInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
                                window.open(whmcsDomainUrl(`${bn}${tld.ext}`), '_blank');
                              }}
                            >
                              Buy Now
                            </Button>
                          </div>
                        )}

                        {tldStatus === "taken" && (
                          <p className="mt-2 text-[11px] text-red-500 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            {tldInput.replace(/[^a-z0-9-]/g, "")}{tld.ext} is taken — try another name
                          </p>
                        )}

                        {tldStatus === "unknown" && (
                          <div className="mt-2">
                            <p className="text-[11px] text-muted-foreground mb-1.5">
                              Can't auto-check this TLD — proceed to register and we'll verify.
                            </p>
                            <Button
                              size="sm"
                              className="h-7 w-full px-3 text-[11px] btn-gradient"
                              onClick={() => {
                                const bn = tldInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
                                window.open(whmcsDomainUrl(`${bn}${tld.ext}`), '_blank');
                              }}
                            >
                              Proceed to Register
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
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
