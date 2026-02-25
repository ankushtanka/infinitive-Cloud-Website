import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Globe, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const tlds = [
  { ext: ".com", price: "₹799", original: "₹1,199", tag: "Most Popular" },
  { ext: ".in", price: "₹449", original: "₹699", tag: "India #1" },
  { ext: ".co.in", price: "₹299", original: "₹499", tag: null },
  { ext: ".net", price: "₹899", original: "₹1,299", tag: null },
  { ext: ".org", price: "₹749", original: "₹1,099", tag: null },
  { ext: ".online", price: "₹199", original: "₹599", tag: "Best Value" },
  { ext: ".site", price: "₹199", original: "₹499", tag: null },
  { ext: ".xyz", price: "₹99", original: "₹299", tag: "Cheapest" },
];

const DomainSearchSection = () => {
  const [domain, setDomain] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) setSearched(true);
  };

  const baseName = domain.replace(/\..+$/, "").trim();

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 via-accent/5 to-background border-y border-border/50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            <Globe className="w-4 h-4" />
            Domain Registration Starting at ₹99/yr
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Find Your Perfect <span className="gradient-text">Domain Name</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Search, register, and secure your brand online. Free WHOIS privacy & instant activation included.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Type your dream domain... e.g. mybusiness"
                value={domain}
                onChange={(e) => { setDomain(e.target.value); setSearched(false); }}
                className="pl-12 h-14 text-base md:text-lg rounded-xl border-2 focus:border-primary"
              />
            </div>
            <Button type="submit" className="btn-gradient h-14 px-8 rounded-xl font-bold text-base">
              Search
            </Button>
          </form>

          {/* Search Results */}
          {searched && baseName && (
            <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 mb-8 animate-fade-in text-left">
              <p className="text-sm text-muted-foreground mb-4">
                Showing results for <span className="font-bold text-foreground">"{baseName}"</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {tlds.map((tld) => (
                  <div
                    key={tld.ext}
                    className="flex items-center justify-between bg-muted/50 hover:bg-muted rounded-xl px-4 py-3 transition-colors group cursor-pointer border border-transparent hover:border-primary/20"
                  >
                    <div>
                      <span className="font-bold text-sm">{baseName}{tld.ext}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                            <span className="text-xs text-primary font-medium">Available</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground line-through block">{tld.original}/yr</span>
                      <span className="text-sm text-primary font-black">{tld.price}/yr</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/solutions/domains">
                  <Button className="btn-gradient font-bold h-12 px-8">
                    Register Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Extension Cards */}
          {!searched && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {tlds.map((tld, i) => (
                <div
                  key={tld.ext}
                  className="relative bg-card border border-border hover:border-primary/30 rounded-xl px-3 py-4 text-center transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {tld.tag && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full whitespace-nowrap">
                      {tld.tag}
                    </span>
                  )}
                  <span className="text-lg font-black text-foreground">{tld.ext}</span>
                  <div className="mt-1">
                    <span className="text-[10px] text-muted-foreground line-through block">{tld.original}</span>
                    <span className="text-sm font-bold text-primary">{tld.price}/yr</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link to="/solutions/domains" className="text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1">
              View all 500+ domain extensions <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainSearchSection;
