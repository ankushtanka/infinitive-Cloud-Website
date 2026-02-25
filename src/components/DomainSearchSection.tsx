import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Globe, ArrowRight, Check, Shield, Zap, Clock, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const tlds = [
  { ext: ".com", price: "₹799", original: "₹1,199", tag: "Most Popular", Icon: Globe },
  { ext: ".in", price: "₹449", original: "₹699", tag: "India #1", Icon: Shield },
  { ext: ".co.in", price: "₹299", original: "₹499", tag: null, Icon: Globe },
  { ext: ".net", price: "₹899", original: "₹1,299", tag: null, Icon: Zap },
  { ext: ".org", price: "₹749", original: "₹1,099", tag: null, Icon: Lock },
  { ext: ".online", price: "₹199", original: "₹599", tag: "Best Value", Icon: Globe },
  { ext: ".site", price: "₹199", original: "₹499", tag: null, Icon: Globe },
  { ext: ".xyz", price: "₹99", original: "₹299", tag: "Cheapest", Icon: Zap },
];

const perks = [
  { icon: Shield, label: "Free WHOIS Privacy" },
  { icon: Zap, label: "Instant Activation" },
  { icon: Clock, label: "24/7 DNS Management" },
  { icon: Lock, label: "Free SSL Included" },
];

const placeholderWords = [
  "mybusiness",
  "mystore",
  "myportfolio",
  "mycompany",
  "mywebsite",
  "mybrand",
  "myagency",
  "mystartup",
];

const DomainSearchSection = () => {
  const [domain, setDomain] = useState("");
  const [searched, setSearched] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const wordIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    if (domain) return; // stop animation when user is typing
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = placeholderWords[wordIndexRef.current];
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
          wordIndexRef.current = (wordIndexRef.current + 1) % placeholderWords.length;
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
            Search, register, and secure your brand online. Every domain includes free WHOIS privacy, instant DNS activation, and enterprise-grade security.
          </p>
        </div>

        {/* Search Bar - Full Width Card */}
        <Card className="max-w-4xl mx-auto mb-10 border-primary/20 shadow-lg shadow-primary/5">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={domain ? "" : `Type your dream domain... e.g. ${animatedPlaceholder}|`}
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
            {/* Perks Row */}
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

        {/* Search Results */}
        {searched && baseName && (
          <div className="max-w-5xl mx-auto mb-12 animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4">
              Showing results for <span className="font-bold text-foreground">"{baseName}"</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tlds.map((tld) => (
                <Card
                  key={tld.ext}
                  className="hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <CardContent className="p-5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-base">{baseName}{tld.ext}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Check className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-primary font-semibold">Available</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground line-through block">{tld.original}/yr</span>
                      <span className="text-lg text-primary font-black">{tld.price}<span className="text-xs font-medium">/yr</span></span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link to="/solutions/domains">
                <Button className="btn-gradient font-bold h-12 px-10 text-base">
                  Register Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Extension Cards Grid */}
        {!searched && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {tlds.map((tld, i) => (
              <Card
                key={tld.ext}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer animate-fade-in-up ${
                  tld.tag ? "border-primary/30 shadow-primary/5 shadow-md" : ""
                }`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {tld.tag && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                )}
                {tld.tag && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {tld.tag}
                    </span>
                  </div>
                )}
                <CardContent className="p-6 pt-8 text-center">
                  <tld.Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <span className="text-3xl font-black text-foreground block">{tld.ext}</span>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground line-through block">{tld.original}/yr</span>
                    <span className="text-3xl md:text-4xl font-black gradient-text">{tld.price}</span>
                    <span className="text-base text-muted-foreground">/yr</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4 w-full font-bold text-sm">
                    Register
                  </Button>
                </CardContent>
              </Card>
            ))}
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
