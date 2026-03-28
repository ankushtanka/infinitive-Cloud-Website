import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react";
import { DomainResult, tldColors, tldTags, formatDomainPrice } from "@/hooks/use-domain-search";

interface DomainResultsGridProps {
  results: DomainResult[];
  suggestions?: DomainResult[];
  loading: boolean;
  searched: boolean;
  searchQuery: string;
}

const DomainCard = ({ r, i }: { r: DomainResult; i: number }) => {
  const color = tldColors[r.tld] || "from-slate-500 to-slate-600";
  const tag = tldTags[r.tld];
  const priceDisplay = formatDomainPrice(r.price, r.currency);

  return (
    <Card
      key={r.domain}
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer animate-fade-in-up group ${
        r.available ? "border-primary/20 shadow-md" : "border-border opacity-70"
      }`}
      style={{ animationDelay: `${i * 0.04}s` }}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} ${r.available ? 'opacity-80' : 'opacity-30'} group-hover:opacity-100 transition-opacity`} />
      {tag && r.available && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {tag}
          </span>
        </div>
      )}
      <CardContent className="p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {r.available ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span className="text-sm md:text-base font-bold text-foreground truncate">
                {r.domain}
              </span>
            </div>
            <span className={`text-xs font-medium ${r.available ? 'text-green-600 dark:text-green-400' : 'text-red-400'}`}>
              {r.available ? "Available" : "Taken"}
            </span>
          </div>
          <div className="text-right shrink-0 ml-2">
            {priceDisplay ? (
              <>
                <span className="text-base md:text-lg font-black gradient-text">{priceDisplay}</span>
                <span className="text-xs text-muted-foreground">/yr</span>
              </>
            ) : (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </div>
        </div>
        {r.available && (
          <Button variant="outline" size="sm" className="mt-3 w-full font-semibold text-xs border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">
            Register Now
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
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-3" />
        <p className="text-muted-foreground">Checking domain availability across 25+ extensions...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground text-lg font-medium">
        No results found. Please try a different domain name.
      </div>
    );
  }

  const availableResults = results.filter(r => r.available);
  const takenResults = results.filter(r => !r.available);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Available Domains */}
      {availableResults.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-bold text-foreground">
              Available Domains for "{searchQuery}"
            </h3>
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-semibold">
              {availableResults.length} found
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableResults.map((r, i) => (
              <DomainCard key={r.domain} r={r} i={i} />
            ))}
          </div>
        </div>
      )}

      {/* Suggested Alternative Names */}
      {suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">
              Name Suggestions You Might Like
            </h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">
              {suggestions.length} available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestions.map((r, i) => (
              <DomainCard key={r.domain} r={r} i={i} />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {takenResults.map((r, i) => (
              <div
                key={r.domain}
                className="flex items-center gap-2 bg-muted/40 rounded-lg px-3 py-2 text-sm animate-fade-in-up"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <XCircle className="w-3 h-3 text-red-400 shrink-0" />
                <span className="text-muted-foreground truncate text-xs">{r.domain}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainResultsGrid;
