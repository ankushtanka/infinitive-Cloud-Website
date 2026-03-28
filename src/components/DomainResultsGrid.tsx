import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Sparkles, Star, Clock, TrendingUp, ShoppingCart } from "lucide-react";
import { DomainResult, tldColors, tldTags, formatDomainPrice } from "@/hooks/use-domain-search";

interface DomainResultsGridProps {
  results: DomainResult[];
  suggestions?: DomainResult[];
  loading: boolean;
  searched: boolean;
  searchQuery: string;
}

function getRecommended(domains: DomainResult[]): string | null {
  const available = domains.filter(d => d.available);
  if (available.length === 0) return null;
  const comDomain = available.find(d => d.tld === '.com');
  if (comDomain) return comDomain.domain;
  const withPrice = available.filter(d => d.price);
  if (withPrice.length > 0) {
    withPrice.sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
    return withPrice[0].domain;
  }
  return available[0].domain;
}

const CART_BASE = "https://client.infinitivecloud.com/cart.php?a=add&domain=register&query=";

const DomainCard = ({ r, i, isRecommended }: { r: DomainResult; i: number; isRecommended: boolean }) => {
  const color = tldColors[r.tld] || "from-slate-500 to-slate-600";
  const priceDisplay = formatDomainPrice(r.price, r.currency);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up group
        ${isRecommended ? "ring-2 ring-primary shadow-lg scale-[1.02]" : ""}
        ${r.available ? "border-green-200 dark:border-green-800/40" : "border-border opacity-75"}
      `}
      style={{ animationDelay: `${i * 0.05}s` }}
    >
      {/* Top gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} ${r.available ? 'opacity-100' : 'opacity-30'}`} />

      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute -top-0 -right-0 z-10">
          <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Recommended
          </div>
        </div>
      )}

      <CardContent className="p-5">
        {/* Domain name */}
        <div className="mb-3">
          <h4 className="text-lg font-bold text-foreground tracking-tight">{r.domain}</h4>
        </div>

        {/* Status badge */}
        <div className="mb-3">
          {r.available ? (
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/40 hover:bg-green-100">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800/40">
              <XCircle className="w-3 h-3 mr-1" />
              Taken
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          {priceDisplay ? (
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-foreground">{priceDisplay}</span>
              <span className="text-sm text-muted-foreground">/year</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Price unavailable</span>
          )}
        </div>

        {/* CTA Button */}
        {r.available ? (
          <a href={`${CART_BASE}${encodeURIComponent(r.domain)}`} target="_blank" rel="noopener noreferrer">
            <Button className="w-full btn-gradient font-bold text-sm h-10 gap-2">
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </Button>
          </a>
        ) : (
          <Button disabled variant="outline" className="w-full text-sm h-10 opacity-50 cursor-not-allowed">
            Unavailable
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const DomainResultsGrid = ({ results, suggestions = [], loading, searched, searchQuery }: DomainResultsGridProps) => {
  if (!searched) return null;

  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground font-medium">Searching across 25+ extensions...</p>
        <p className="text-xs text-muted-foreground mt-1">Finding the best options for you</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-lg font-medium">
        No results found. Please try a different domain name.
      </div>
    );
  }

  const availableResults = results.filter(r => r.available);
  const takenResults = results.filter(r => !r.available);
  const recommendedDomain = getRecommended(results);

  return (
    <div className="animate-fade-in space-y-10">
      {/* Urgency banner */}
      {availableResults.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            Limited Time Offer
          </div>
          <div className="flex items-center gap-1.5 text-primary font-semibold bg-primary/10 px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4" />
            Only a few domains left at this price
          </div>
        </div>
      )}

      {/* Available Domains */}
      {availableResults.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-bold text-foreground">
              Available Domains for "<span className="text-primary">{searchQuery}</span>"
            </h3>
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 text-xs">
              {availableResults.length} found
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableResults.map((r, i) => (
              <DomainCard key={r.domain} r={r} i={i} isRecommended={r.domain === recommendedDomain} />
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">
              Try these available options for <span className="text-primary">{searchQuery}</span>
            </h3>
            <Badge className="bg-primary/10 text-primary border-0 text-xs">
              {suggestions.length} alternatives
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((r, i) => (
              <DomainCard key={r.domain} r={r} i={i} isRecommended={false} />
            ))}
          </div>
        </div>
      )}

      {/* Taken Domains */}
      {takenResults.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Unavailable ({takenResults.length})
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {takenResults.map((r, i) => (
              <div
                key={r.domain}
                className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2.5 text-sm animate-fade-in-up"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="text-muted-foreground truncate text-xs font-medium">{r.domain}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainResultsGrid;
