import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  Star,
  Clock,
  TrendingUp,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import {
  DomainResult,
  tldColors,
  formatDomainPrice,
} from "@/hooks/use-domain-search";

interface DomainResultsGridProps {
  results: DomainResult[];
  suggestions?: DomainResult[];
  loading: boolean;
  searched: boolean;
  searchQuery: string;
}

function getRecommended(domains: DomainResult[]): string | null {
  const available = domains.filter((d) => d.available);
  if (available.length === 0) return null;
  const comDomain = available.find((d) => d.tld === ".com");
  if (comDomain) return comDomain.domain;
  const withPrice = available.filter((d) => d.price);
  if (withPrice.length > 0) {
    withPrice.sort(
      (a, b) => parseFloat(a.price || "0") - parseFloat(b.price || "0")
    );
    return withPrice[0].domain;
  }
  return available[0].domain;
}

const CART_BASE =
  "https://client.infinitivecloud.com/cart.php?a=add&domain=register&query=";

/* ─── Available Card ─── */
const AvailableCard = ({
  r,
  i,
  isRecommended,
}: {
  r: DomainResult;
  i: number;
  isRecommended: boolean;
}) => {
  const color = tldColors[r.tld] || "from-slate-500 to-slate-600";
  const priceDisplay = formatDomainPrice(r.price, r.currency);

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up group
        ${isRecommended ? "ring-2 ring-primary shadow-lg scale-[1.02]" : ""}
        border-green-200 dark:border-green-800/40
      `}
      style={{ animationDelay: `${i * 0.04}s` }}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`}
      />
      {isRecommended && (
        <div className="absolute -top-0 -right-0 z-10">
          <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Recommended
          </div>
        </div>
      )}
      <CardContent className="p-5">
        <h4 className="text-lg font-bold text-foreground tracking-tight mb-2">
          {r.domain}
        </h4>
        <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/40 hover:bg-green-100 mb-3 text-[11px]">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          Available
        </Badge>
        <div className="mb-4">
          {priceDisplay ? (
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-foreground">
                {priceDisplay}
              </span>
              <span className="text-sm text-muted-foreground">/year</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground italic">
              Contact for pricing
            </span>
          )}
        </div>
        <a
          href={`${CART_BASE}${encodeURIComponent(r.domain)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full btn-gradient font-bold text-sm h-10 gap-2 rounded-lg">
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

/* ─── Taken Row Item ─── */
const TakenRow = ({
  r,
  i,
  alternative,
}: {
  r: DomainResult;
  i: number;
  alternative: DomainResult | null;
}) => {
  const altPrice = alternative
    ? formatDomainPrice(alternative.price, alternative.currency)
    : null;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3 rounded-lg border border-border/50 bg-muted/30 animate-fade-in-up"
      style={{ animationDelay: `${i * 0.02}s` }}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
        <span className="text-sm font-medium text-foreground/50 truncate">
          {r.domain}
        </span>
        <Badge
          variant="outline"
          className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800/40 text-[10px] shrink-0"
        >
          Taken
        </Badge>
      </div>

      {alternative && (
        <div className="flex items-center gap-2 sm:ml-auto shrink-0">
          <span className="text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 inline mr-1 text-primary" />
            Try <span className="font-bold text-foreground">{alternative.domain}</span>
            {altPrice && <span className="text-primary font-bold"> — {altPrice}/yr</span>}
          </span>
          <a
            href={`${CART_BASE}${encodeURIComponent(alternative.domain)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-7 px-3 border-primary/20 hover:bg-primary hover:text-primary-foreground gap-1 rounded-lg"
            >
              Register
              <ArrowRight className="w-3 h-3" />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

/* ─── Main Grid ─── */
const DomainResultsGrid = ({
  results,
  suggestions = [],
  loading,
  searched,
  searchQuery,
}: DomainResultsGridProps) => {
  if (!searched) return null;

  /* Skeleton loader — only when no results at all yet */
  if (loading && results.length === 0 && suggestions.length === 0) {
    return (
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">
            Searching across 25+ extensions...
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="relative overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
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

  const availableResults = results.filter((r) => r.available);
  const takenResults = results.filter((r) => !r.available);
  const recommendedDomain = getRecommended(results);
  const alternativePool = [
    ...availableResults,
    ...suggestions.filter((s) => s.available),
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Loading more indicator */}
      {loading && (results.length > 0 || suggestions.length > 0) && (
        <div className="flex items-center justify-center gap-2 rounded-full border border-border bg-muted/50 px-5 py-2 text-sm text-muted-foreground w-fit mx-auto">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          Loading more extensions...
        </div>
      )}

      {/* Urgency banner */}
      {availableResults.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-full border border-amber-200/50 dark:border-amber-800/30">
            <Clock className="w-3.5 h-3.5" />
            Limited Time Offer
          </div>
          <div className="flex items-center gap-1.5 text-primary font-medium bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <TrendingUp className="w-3.5 h-3.5" />
            Only a few domains left at this price
          </div>
        </div>
      )}

      {/* Available Domains */}
      {availableResults.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              Available Domains for "
              <span className="text-primary">{searchQuery}</span>"
            </h3>
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 text-[11px] ml-auto shrink-0">
              {availableResults.length} found
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableResults.map((r, i) => (
              <AvailableCard
                key={r.domain}
                r={r}
                i={i}
                isRecommended={r.domain === recommendedDomain}
              />
            ))}
          </div>
        </div>
      )}

      {/* Taken Domains */}
      {takenResults.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-4 h-4 text-muted-foreground/60" />
            <h3 className="text-base font-semibold text-muted-foreground">
              Unavailable Domains
            </h3>
            <Badge
              variant="outline"
              className="text-[10px] text-muted-foreground/60 ml-auto shrink-0"
            >
              {takenResults.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {takenResults.map((r, i) => (
              <TakenCard
                key={r.domain}
                r={r}
                i={i}
                alternatives={alternativePool}
              />
            ))}
          </div>
        </div>
      )}

      {/* Name Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              More options you might like
            </h3>
            <Badge className="bg-primary/10 text-primary border-0 text-[11px] ml-auto shrink-0">
              {suggestions.length} alternatives
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((r, i) => (
              <AvailableCard
                key={r.domain}
                r={r}
                i={i}
                isRecommended={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainResultsGrid;
