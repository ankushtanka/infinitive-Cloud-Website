import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { DomainResult, tldColors, tldTags, formatDomainPrice } from "@/hooks/use-domain-search";

interface DomainResultsGridProps {
  results: DomainResult[];
  loading: boolean;
  searched: boolean;
  searchQuery: string;
}

const DomainResultsGrid = ({ results, loading, searched, searchQuery }: DomainResultsGridProps) => {
  if (!searched) return null;

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-3" />
        <p className="text-muted-foreground">Checking domain availability...</p>
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

  return (
    <div className="animate-fade-in">
      <p className="text-sm text-muted-foreground mb-4">
        Showing results for <span className="font-bold text-foreground">"{searchQuery}"</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {results.map((r, i) => {
          const color = tldColors[r.tld] || "from-slate-500 to-slate-600";
          const tag = tldTags[r.tld];
          const priceDisplay = formatDomainPrice(r.price, r.currency);

          return (
            <Card
              key={r.domain}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer animate-fade-in-up group ${
                r.available ? "border-primary/20 shadow-md" : "border-border opacity-75"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
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
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {r.available ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                      <span className="text-base md:text-lg font-bold text-foreground truncate">
                        {r.domain}
                      </span>
                    </div>
                    <span className={`text-xs font-medium ${r.available ? 'text-green-600 dark:text-green-400' : 'text-red-400'}`}>
                      {r.available ? "Available" : "Taken"}
                    </span>
                  </div>
                  <div className="text-right">
                    {priceDisplay ? (
                      <>
                        <span className="text-lg md:text-xl font-black gradient-text">{priceDisplay}</span>
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
        })}
      </div>
    </div>
  );
};

export default DomainResultsGrid;
