import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Globe, ArrowRight, Shield, Zap, Clock, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const tlds = [
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

const domainNames = [".com", ".in", ".co.in", ".net", ".org", ".online", ".site", ".xyz"];

const DomainSearchSection = () => {
  const [domain, setDomain] = useState("");
  const [searched, setSearched] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    if (domain) return;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = domainNames[wordIndexRef.current];
      if (!isDeletingRef.current) {
        charIndexRef.current++;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === word.length) {
          isDeletingRef.current = true;
          timeout = setTimeout(tick, 1800);
        } else {
          timeout = setTimeout(tick, 110);
        }
      } else {
        charIndexRef.current--;
        setAnimatedPlaceholder(word.slice(0, charIndexRef.current));
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % domainNames.length;
          timeout = setTimeout(tick, 350);
        } else {
          timeout = setTimeout(tick, 55);
        }
      }
    };
    timeout = setTimeout(tick, 100);
    return () => clearTimeout(timeout);
  }, [domain]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) setSearched(true);
  };

  const baseName = domain.replace(/\..+$/, "").trim();

  return (
    <section className="py-20 bg-muted/30" id="domains">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            <Globe className="w-4 h-4" />
            Domain Registration Starting at ₹99/yr
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect <span className="gradient-text">Domain Name</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          </p>
        </div>

        {/* Search Bar */}
        <Card className="max-w-4xl mx-auto mb-12 border-primary/20 shadow-lg shadow-primary/5">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={domain ? "" : `Search domain ${animatedPlaceholder}|`}
                  value={domain}
                  onChange={(e) => { setDomain(e.target.value); setSearched(false); }}
                  className="pl-12 h-14 text-base md:text-lg rounded-xl border-2 focus:border-primary"
                />
              </div>
              <Button type="submit" className="btn-gradient h-14 px-10 rounded-xl font-bold text-base">
                <Search className="w-5 h-5 mr-2" />
                Search Domain
              </Button>
            </form>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-5">
              {perks.map((perk) => (
                <div key={perk.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <perk.icon className="w-4 h-4 text-primary" />
                  <span>{perk.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results / Extension Cards — same card style for both */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {tlds.map((tld, i) => (
            <Card
              key={tld.ext}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer animate-fade-in-up group ${
                tld.tag ? "border-primary/20 shadow-md" : "border-border"
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tld.color} opacity-80 group-hover:opacity-100 transition-opacity`} />

              {tld.tag && (
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {tld.tag}
                  </span>
                </div>
              )}

              <CardContent className="p-6 pt-7 text-center">
                {/* Domain name or extension */}
                <span className="text-3xl font-black text-foreground block tracking-tight">
                  {searched && baseName ? `${baseName}${tld.ext}` : tld.ext}
                </span>
                <div className={`w-8 h-0.5 mx-auto mt-2 mb-4 rounded-full bg-gradient-to-r ${tld.color} opacity-60`} />

                {/* Pricing */}
                <div>
                  <span className="text-sm text-muted-foreground line-through block">{tld.original}/yr</span>
                  <span className="text-3xl md:text-4xl font-black gradient-text">{tld.price}</span>
                  <span className="text-base text-muted-foreground">/yr</span>
                </div>

                <Button variant="outline" size="sm" className="mt-5 w-full font-semibold text-sm border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">
                  Register
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {searched && baseName && (
          <div className="mt-6 text-center animate-fade-in">
            <Link to="/solutions/domains">
              <Button className="btn-gradient font-bold h-12 px-10 text-base">
                Register Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/solutions/domains">
            <Button size="lg" variant="outline" className="group text-base">
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
