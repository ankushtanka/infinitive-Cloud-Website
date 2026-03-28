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
  { ext: ".xyz", price: "₹99", original: "₹299", tag: "Cheapest", color: "from-cyan-500 to-sky-500" }
];

const perks = [
  { icon: Shield, label: "Free WHOIS Privacy" },
  { icon: Zap, label: "Instant Activation" },
  { icon: Clock, label: "24/7 DNS Management" },
  { icon: Lock, label: "Free SSL Included" }
];

const placeholderWords = [
  "mybusiness.com", "mystore.in", "myportfolio.net", "mycompany.co.in",
  "mywebsite.online", "mybrand.org", "myagency.site", "mystartup.xyz"
];

const DomainSearchSection = () => {
  const [domain, setDomain] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const { loading, results, searched, search, reset } = useDomainSearch();

  useEffect(() => {
    if (domain || inputFocused) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = placeholderWords[wordIndexRef.current];
      if (!isDeletingRef.current) {
        charIndexRef.current++;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === word.length) { isDeletingRef.current = true; timeout = setTimeout(tick, 1800); }
        else timeout = setTimeout(tick, 110);
      } else {
        charIndexRef.current--;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === 0) { isDeletingRef.current = false; wordIndexRef.current = (wordIndexRef.current + 1) % placeholderWords.length; timeout = setTimeout(tick, 350); }
        else timeout = setTimeout(tick, 55);
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
    <section className="py-12 md:py-20 bg-muted/30" id="domains">
      <div className="section-container">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-3 md:mb-4">
            <Globe className="w-4 h-4" />
            Domain Registration Starting at <span className="font-mono tabular-nums">₹799</span>/yr
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Find Your Perfect <span className="gradient-text">Domain Name</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Register your domain at India's lowest prices. Free WHOIS privacy included.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto mb-8 md:mb-12 border-0 shadow-none bg-transparent">
          <CardContent className="p-4 md:p-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <div className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary/80 via-accent/60 to-primary/80 bg-[length:200%_100%] transition-all duration-1000 ease-in-out ${inputFocused ? 'opacity-90 animate-[gradient-shift_6s_ease-in-out_infinite]' : 'opacity-15'}`} />
                <div className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary/60 via-accent/40 to-primary/60 bg-[length:200%_100%] transition-all duration-1000 ease-in-out ${inputFocused ? 'opacity-50 animate-[gradient-shift_6s_ease-in-out_infinite] blur-[6px]' : 'opacity-0'}`} />
                <div className={`absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-primary/40 via-accent/25 to-primary/40 bg-[length:200%_100%] transition-all duration-1000 ease-in-out ${inputFocused ? 'opacity-35 animate-[gradient-shift_6s_ease-in-out_infinite] blur-[16px]' : 'opacity-0'}`} />
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-500 ${inputFocused ? 'text-primary scale-110' : 'text-muted-foreground scale-100'}`} />
                  <Input
                    type="text"
                    placeholder={domain ? "" : (!inputFocused ? `${animatedPlaceholder}|` : "")}
                    value={domain}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    onChange={(e) => { setDomain(e.target.value); reset(); }}
                    className="pl-12 h-12 md:h-14 text-base md:text-lg rounded-2xl border-0 bg-background focus-visible:ring-0 transition-all duration-500"
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="btn-gradient h-12 md:h-14 px-8 md:px-10 rounded-xl font-bold text-sm md:text-base">
                {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
                {loading ? "Searching..." : "Search Domain"}
              </Button>
            </form>
            <div className="hidden sm:flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5">
              {perks.map((perk) => (
                <div key={perk.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <perk.icon className="w-4 h-4 text-primary" />
                  <span>{perk.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Search Results */}
        {searched && (
          <div className="max-w-5xl mx-auto mb-8 md:mb-12">
            <DomainResultsGrid results={results} loading={loading} searched={searched} searchQuery={domain.trim()} />
            {!loading && results.length > 0 && (
              <div className="mt-6 text-center">
                <Link to="/solutions/domains">
                  <Button className="btn-gradient font-bold h-12 px-10 text-base">
                    View All Extensions <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Default TLD Cards */}
        {!searched && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-5 max-w-5xl mx-auto">
            {fallbackTlds.map((tld, i) => (
              <Card
                key={tld.ext}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer animate-fade-in-up group ${
                  tld.tag ? "border-primary/20 shadow-md" : "border-border"
                } ${i >= 4 ? "hidden sm:block" : ""}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tld.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                {tld.tag && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3">
                    <span className="text-[9px] md:text-[10px] font-bold bg-primary text-primary-foreground px-2 md:px-2.5 py-0.5 rounded-full uppercase tracking-wider">{tld.tag}</span>
                  </div>
                )}
                <CardContent className="p-3 md:p-6 pt-5 md:pt-7 text-center">
                  <span className="text-xl md:text-3xl font-black text-foreground block tracking-tight">{tld.ext}</span>
                  <div className={`w-8 h-0.5 mx-auto mt-1.5 md:mt-2 mb-2 md:mb-4 rounded-full bg-gradient-to-r ${tld.color} opacity-60`} />
                  <div>
                    <span className="text-xs md:text-sm text-muted-foreground line-through block"><span className="font-mono tabular-nums">{tld.original}</span>/yr</span>
                    <span className="text-2xl md:text-4xl font-black gradient-text"><span className="font-mono tabular-nums">{tld.price}</span></span>
                    <span className="text-xs md:text-base text-muted-foreground">/yr</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 md:mt-5 w-full font-semibold text-xs md:text-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">Register</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8 md:mt-10">
          <Link to="/solutions/domains">
            <Button size="lg" variant="outline" className="group text-sm md:text-base">
              View All 500+ Domain Extensions
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomainSearchSection;
