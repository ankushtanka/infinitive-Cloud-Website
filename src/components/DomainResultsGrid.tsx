import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, Sparkles, Star, Clock, TrendingUp, ShoppingCart, ArrowRight } from "lucide-react";
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

const AvailableCard = ({ r, i, isRecommended }: { r: DomainResult; i: number; isRecommended: boolean }) => {
  const color = tldColors[r.tld] || "from-slate-500 to-slate-600";
  const priceDisplay = formatDomainPrice(r.price, r.currency);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up group
        ${isRecommended ? "ring-2 ring-primary shadow-lg scale-[1.02]" : ""}
        border-green-200 dark:border-green-800/40
      `}
      style={{ animationDelay: `${i * 0.05}s` }}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />
      {isRecommended && (
        <div className="absolute -top-0 -right-0 z-10">
          <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Recommended
          </div>
        </div>
      )}
      <CardContent className="p-5">
        <h4 className="text-lg font-bold text-foreground tracking-tight mb-3">{r.domain}</h4>
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/40 hover:bg-green-100 mb-3">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Available
        </Badge>
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
        <a href={`${CART_BASE}${encodeURIComponent(r.domain)}`} target="_blank" rel="noopener noreferrer">
          <Button className="w-full btn-gradient font-bold text-sm h-10 gap-2">
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

const TakenCard = ({ r, i, alternatives }: { r: DomainResult; i: number; alternatives: DomainResult[] }) => {
  const color = tldColors[r.tld] || "from-slate-500 to-slate-600";
  // Find a relevant available alternative for this TLD or base name
  const suggestion = alternatives.length > 0 ? alternatives[Math.min(i, alternatives.length - 1)] : null;
  const suggestionPrice = suggestion ? formatDomainPrice(suggestion.price, suggestion.currency) : null;

  return (
    <Card
      className="relative overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in-up border-border"
      style={{ animationDelay: `${i * 0.04}s` }}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} opacity-30`} />
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-base font-bold text-foreground/70 tracking-tight">{r.domain}</h4>
          <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800/40 shrink-0 text-[10px]">
            <XCircle className="w-3 h-3 mr-1" />
            Taken
          </Badge>
        </div>

        {/* Suggestion nudge */}
        {suggestion && (
          <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground mb-2">
              <Sparkles className="w-3 h-3 inline mr-1 text-primary" />
              Try <span className="font-bold text-foreground">{suggestion.domain}</span> instead
              {suggestionPrice && <span className="text-primary font-bold"> — {suggestionPrice}/yr</span>}
            </p>
            <a href={`${CART_BASE}${encodeURIComponent(suggestion.domain)}`} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="w-full text-xs h-8 border-primary/20 hover:bg-primary hover:text-primary-foreground gap-1">
                Register {suggestion.domain}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DomainResultsGrid = ({ results, suggestions = [], loading, searched, searchQuery }: DomainResultsGridProps) => {
  if (!searched) return null;

  if (loading && results.length === 0 && suggestions.length === 0) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">Searching across 25+ extensions...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="relative overflow-hidden animate-pulse" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />
              <CardContent className="p-5 space-y-3">
                <div className="h-5 w-2/3 rounded bg-muted" />
                <div className="h-5 w-20 rounded-full bg-muted" />
                <div className="h-8 w-1/2 rounded bg-muted" />
                <div className="h-10 w-full rounded-xl bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
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

  // Build a pool of alternatives for taken-domain suggestions
  const alternativePool = [...availableResults, ...suggestions.filter(s => s.available)];

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
              <AvailableCard key={r.domain} r={r} i={i} isRecommended={r.domain === recommendedDomain} />
            ))}
          </div>
        </div>
      )}

      {/* Taken Domains — with inline suggestions */}
      {takenResults.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-foreground">
              Unavailable Domains
            </h3>
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {takenResults.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {takenResults.map((r, i) => (
              <TakenCard key={r.domain} r={r} i={i} alternatives={alternativePool} />
            ))}
          </div>
        </div>
      )}

      {/* Name Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">
              More options you might like
            </h3>
            <Badge className="bg-primary/10 text-primary border-0 text-xs">
              {suggestions.length} alternatives
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((r, i) => (
              <AvailableCard key={r.domain} r={r} i={i} isRecommended={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainResultsGrid;
