import { Check, Crown, TrendingDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const domainPrices = [
  {
    tld: ".com",
    infinitive: 799,
    godaddy: 1399,
    hostinger: 1099,
    namecheap: 999,
    bigrock: 899,
  },
  {
    tld: ".in",
    infinitive: 449,
    godaddy: 749,
    hostinger: 599,
    namecheap: 699,
    bigrock: 549,
  },
  {
    tld: ".net",
    infinitive: 899,
    godaddy: 1499,
    hostinger: 1199,
    namecheap: 1099,
    bigrock: 999,
  },
  {
    tld: ".org",
    infinitive: 749,
    godaddy: 1199,
    hostinger: 999,
    namecheap: 899,
    bigrock: 849,
  },
  {
    tld: ".online",
    infinitive: 199,
    godaddy: 999,
    hostinger: 499,
    namecheap: 399,
    bigrock: 599,
  },
  {
    tld: ".xyz",
    infinitive: 99,
    godaddy: 599,
    hostinger: 299,
    namecheap: 199,
    bigrock: 349,
  },
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

  // Calculate average savings
  const avgSavings = Math.round(
    domainPrices.reduce((acc, d) => {
      const avgCompetitor = (d.godaddy + d.hostinger + d.namecheap + d.bigrock) / 4;
      return acc + ((avgCompetitor - d.infinitive) / avgCompetitor) * 100;
    }, 0) / domainPrices.length
  );

  return (
    <section className="py-20 md:py-28 bg-muted/20 relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm sm:text-base px-5 py-2 rounded-full mb-5">
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
            Save up to {avgSavings}% on Domains
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 px-2">
            Domains at <span className="gradient-text">Unbeatable Prices</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Why pay more? Get the same domains at a fraction of what GoDaddy, Hostinger, and others charge. No hidden renewals, no upsells.
          </p>
        </motion.div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-14"
        >
          {[
            { value: `${avgSavings}%`, label: "Avg. Savings" },
            { value: "₹99", label: "Domains From" },
            { value: "Free", label: "WHOIS Privacy" },
            { value: "Free", label: "DNS Management" },
          ].map((stat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-xl p-5 md:p-6 text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Price comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="bg-card rounded-2xl border border-border overflow-visible min-w-[600px]" style={{ boxShadow: "var(--shadow-medium)" }}>
            {/* Table header */}
            <div className="grid grid-cols-6 bg-muted/50 border-b border-border rounded-t-2xl">
              <div className="p-3 md:p-4 font-bold text-sm">Domain</div>
              <div className="p-3 md:p-5 text-center relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                    <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> MOST POPULAR
                  </span>
                </div>
                <span className="font-bold text-sm md:text-base gradient-text">Infinitive Cloud</span>
              </div>
              {competitors.map((c) => (
                <div key={c.key} className="p-3 md:p-4 text-center font-medium text-xs md:text-sm text-muted-foreground">
                  {c.name}
                </div>
              ))}
            </div>

            {/* Table rows */}
            {domainPrices.map((row, i) => (
              <div
                key={row.tld}
                className={`grid grid-cols-6 ${i < domainPrices.length - 1 ? "border-b border-border/50" : ""} hover:bg-muted/30 transition-colors`}
              >
                <div className="p-3 md:p-4 font-bold text-sm flex items-center">{row.tld}</div>
                <div className="p-3 md:p-4 text-center">
                  <span className="font-black text-primary text-sm md:text-base font-mono tabular-nums">
                    {formatPrice(row.infinitive)}
                  </span>
                  <span className="text-xs text-muted-foreground">/yr</span>
                </div>
                {competitors.map((c) => {
                  const competitorPrice = row[c.key];
                  const savings = getSavingsPercent(row.infinitive, competitorPrice);
                  return (
                    <div key={c.key} className="p-3 md:p-4 text-center">
                      <span className="text-sm text-muted-foreground line-through font-mono tabular-nums">
                        {formatPrice(competitorPrice)}
                      </span>
                      <div className="text-[10px] text-primary font-semibold mt-0.5">
                        Save {savings}%
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            * Prices shown are for new registrations (1st year). All prices include GST. Competitor prices are approximate and may vary.
          </p>
        </motion.div>

        {/* Included features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="bg-card/80 border border-primary/20 rounded-2xl p-6 md:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
            <h3 className="text-lg font-bold text-center mb-5">
              Every Domain Includes — <span className="text-primary">Free</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "WHOIS Privacy Protection",
                "DNS Management",
                "Domain Forwarding",
                "Email Forwarding",
                "Domain Lock",
                "Auto-Renewal",
                "Transfer Protection",
                "24/7 Support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/solutions/domains">
            <Button size="lg" className="btn-gradient glow-effect text-lg px-10 h-14 rounded-xl group font-bold">
              Register Your Domain Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DomainPriceComparison;
