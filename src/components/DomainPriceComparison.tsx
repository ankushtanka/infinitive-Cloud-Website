import { Check, Crown, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const domainPrices = [
  { tld: ".com", infinitive: 799, godaddy: 1399, hostinger: 1099, namecheap: 999, bigrock: 899 },
  { tld: ".in", infinitive: 449, godaddy: 749, hostinger: 599, namecheap: 699, bigrock: 549 },
  { tld: ".net", infinitive: 899, godaddy: 1499, hostinger: 1199, namecheap: 1099, bigrock: 999 },
  { tld: ".org", infinitive: 749, godaddy: 1199, hostinger: 999, namecheap: 899, bigrock: 849 },
  { tld: ".online", infinitive: 199, godaddy: 999, hostinger: 499, namecheap: 399, bigrock: 599 },
  { tld: ".xyz", infinitive: 99, godaddy: 599, hostinger: 299, namecheap: 199, bigrock: 349 },
];

const competitors = [
  { key: "godaddy" as const, name: "GoDaddy" },
  { key: "hostinger" as const, name: "Hostinger" },
  { key: "namecheap" as const, name: "Namecheap" },
  { key: "bigrock" as const, name: "BigRock" },
];

const DomainPriceComparison = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const formatPrice = (price: number) => `₹${price}`;

  const getSavingsPercent = (ours: number, theirs: number) => {
    return Math.round(((theirs - ours) / theirs) * 100);
  };

  const avgSavings = Math.round(
    domainPrices.reduce((acc, d) => {
      const avgCompetitor = (d.godaddy + d.hostinger + d.namecheap + d.bigrock) / 4;
      return acc + ((avgCompetitor - d.infinitive) / avgCompetitor) * 100;
    }, 0) / domainPrices.length
  );

  return (
    <section className="py-12 md:py-28 bg-muted/20 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 hidden md:block" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 hidden md:block" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs sm:text-base px-4 md:px-5 py-1.5 md:py-2 rounded-full mb-3 md:mb-5">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
            Save up to {avgSavings}% on Domains
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-5 px-2">
            Domains at <span className="gradient-text">Unbeatable Prices</span>
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get domains at a fraction of what others charge. No hidden renewals.
          </p>
        </motion.div>

        {/* Stats banner - compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid grid-cols-4 gap-2 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-14"
        >
          {[
            { value: `${avgSavings}%`, label: "Savings" },
            { value: "₹99", label: "From" },
            { value: "Free", label: "WHOIS" },
            { value: "Free", label: "DNS" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-lg md:rounded-xl p-2.5 md:p-6 text-center">
              <div className="text-lg sm:text-3xl md:text-4xl font-black gradient-text">{stat.value}</div>
              <div className="text-[9px] sm:text-sm text-muted-foreground font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mobile: simplified price list, Desktop: full comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="bg-card rounded-2xl border border-border overflow-visible" style={{ boxShadow: "var(--shadow-medium)" }}>
              <div className="grid grid-cols-6 bg-muted/50 border-b border-border rounded-t-2xl">
                <div className="p-4 font-bold text-sm">Domain</div>
                <div className="p-5 text-center relative">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                      <Crown className="w-3.5 h-3.5" /> MOST POPULAR
                    </span>
                  </div>
                  <span className="font-bold text-base gradient-text">Infinitive Cloud</span>
                </div>
                {competitors.map((c) => (
                  <div key={c.key} className="p-5 text-center font-medium text-sm text-muted-foreground">
                    {c.name}
                  </div>
                ))}
              </div>
              {domainPrices.map((row, i) => (
                <div
                  key={row.tld}
                  className={`grid grid-cols-6 ${i < domainPrices.length - 1 ? "border-b border-border/50" : ""} hover:bg-muted/30 transition-colors`}
                >
                  <div className="p-5 font-bold text-base flex items-center">{row.tld}</div>
                  <div className="p-5 text-center">
                    <span className="font-black text-primary text-lg font-mono tabular-nums">
                      {formatPrice(row.infinitive)}
                    </span>
                    <span className="text-sm text-muted-foreground">/yr</span>
                  </div>
                  {competitors.map((c) => {
                    const competitorPrice = row[c.key];
                    const savings = getSavingsPercent(row.infinitive, competitorPrice);
                    return (
                      <div key={c.key} className="p-5 text-center">
                        <span className="text-base text-muted-foreground line-through font-mono tabular-nums">
                          {formatPrice(competitorPrice)}
                        </span>
                        <div className="text-xs text-primary font-semibold mt-0.5">
                          Save {savings}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: compact card list */}
          <div className="md:hidden space-y-2">
            {domainPrices.slice(0, 4).map((row) => {
              const avgCompPrice = Math.round((row.godaddy + row.hostinger + row.namecheap + row.bigrock) / 4);
              const savings = getSavingsPercent(row.infinitive, avgCompPrice);
              return (
                <div key={row.tld} className="bg-card border border-border/50 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-foreground">{row.tld}</span>
                    <div className="text-[10px] text-muted-foreground line-through font-mono">avg. {formatPrice(avgCompPrice)}/yr</div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-primary text-lg font-mono tabular-nums">{formatPrice(row.infinitive)}</span>
                    <span className="text-xs text-muted-foreground">/yr</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Save {savings}%
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] md:text-xs text-muted-foreground text-center mt-3 md:mt-4">
            * Prices for new registrations (1st year). Includes GST. Competitor prices approximate.
          </p>
        </motion.div>

        {/* Included features - compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-3xl mx-auto mt-8 md:mt-12"
        >
          <div className="bg-card/80 border border-primary/20 rounded-xl md:rounded-2xl p-4 md:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
            <h3 className="text-sm md:text-lg font-bold text-center mb-3 md:mb-5">
              Every Domain Includes — <span className="text-primary">Free</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                "WHOIS Privacy",
                "DNS Management",
                "Domain Forwarding",
                "Email Forwarding",
                "Domain Lock",
                "Auto-Renewal",
                "Transfer Protection",
                "24/7 Support",
              ].map((feature, i) => (
                <div key={feature} className={`flex items-center gap-1.5 md:gap-2 text-xs md:text-sm ${i >= 4 ? "hidden sm:flex" : ""}`}>
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-6 md:mt-10">
          <Link to="/solutions/domains">
            <Button size="lg" className="btn-gradient glow-effect text-sm md:text-lg px-8 md:px-10 h-12 md:h-14 rounded-xl group font-bold">
              Register Your Domain Now
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomainPriceComparison;