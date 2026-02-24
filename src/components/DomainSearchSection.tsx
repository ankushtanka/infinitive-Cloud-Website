import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Globe } from "lucide-react";

const tlds = [
  { ext: ".com", price: "₹799/yr" },
  { ext: ".in", price: "₹449/yr" },
  { ext: ".net", price: "₹899/yr" },
  { ext: ".org", price: "₹749/yr" },
];

const DomainSearchSection = () => {
  const [domain, setDomain] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) setSearched(true);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 border-y border-border/50">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Find Your Perfect Domain</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Search and register your domain name — get online in minutes.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your domain name..."
                value={domain}
                onChange={(e) => { setDomain(e.target.value); setSearched(false); }}
                className="pl-12 h-14 text-base md:text-lg rounded-xl border-2 focus:border-primary"
              />
            </div>
            <Button type="submit" className="btn-gradient h-14 px-8 rounded-xl font-bold text-base">
              Search
            </Button>
          </form>

          {searched && domain.trim() && (
            <div className="bg-card border border-border rounded-xl p-4 mb-8 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-2">Results for <span className="font-bold text-foreground">{domain}</span></p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tlds.map((tld) => (
                  <div key={tld.ext} className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-3">
                    <span className="font-semibold text-sm">{domain.replace(/\..+$/, '')}{tld.ext}</span>
                    <span className="text-xs text-primary font-bold">{tld.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            {tlds.map((tld) => (
              <div key={tld.ext} className="bg-card border border-border rounded-lg px-5 py-3 text-center min-w-[100px]">
                <span className="text-lg font-bold text-foreground">{tld.ext}</span>
                <p className="text-xs text-primary font-semibold">{tld.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainSearchSection;
