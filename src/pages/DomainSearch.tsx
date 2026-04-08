import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Loader2,
  Globe,
  CheckCircle2,
  XCircle,
  ShoppingCart,
  Clock,
} from "lucide-react";

const MIDDLEWARE_URL = "https://client.infinitivecloud.com/middleware/domainMiddleware.php";

interface DomainResult {
  domain: string;
  tld: string;
  available: boolean;
  pricing?: { register?: string; renew?: string; transfer?: string };
}

interface SearchState {
  loading: boolean;
  results: DomainResult[];
  checkTime: number | null;
  error: string | null;
}

const DomainSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(q);
  const abortRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<SearchState>({
    loading: false,
    results: [],
    checkTime: null,
    error: null,
  });

  const doSearch = async (term: string) => {
    const name = term.trim().replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
    if (!name) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ loading: true, results: [], checkTime: null, error: null });

    try {
      const res = await fetch(MIDDLEWARE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "bulk_search", name }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (controller.signal.aborted) return;

      if (data.result === "success" && Array.isArray(data.domains)) {
        // Sort: available first
        const sorted = [...data.domains].sort((a, b) => {
          if (a.available === b.available) return 0;
          return a.available ? -1 : 1;
        });
        setState({
          loading: false,
          results: sorted,
          checkTime: data.check_time_s ?? null,
          error: null,
        });
      } else {
        setState({
          loading: false,
          results: [],
          checkTime: null,
          error: data.message || "No results found — please try a different name.",
        });
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setState({
        loading: false,
        results: [],
        checkTime: null,
        error: "Search failed — please try again.",
      });
    }
  };

  // Trigger search when q param changes
  useEffect(() => {
    if (q) {
      setInputValue(q);
      doSearch(q);
    }
  }, [q]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = inputValue.trim();
    if (!term) return;
    setSearchParams({ q: term });
  };

  const handleAddToCart = (r: DomainResult) => {
    const price = r.pricing?.register || "";
    const renewPrice = r.pricing?.renew || "";
    navigate(
      `/cart?domain=${encodeURIComponent(r.domain)}&price=${price}&renewPrice=${renewPrice}`
    );
  };

  const formatPrice = (price?: string) => {
    if (!price) return null;
    const num = parseFloat(price);
    if (isNaN(num)) return null;
    return `₹${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Domain Search Results | Infinitive Cloud</title>
        <meta name="description" content="Search for your perfect domain name across 25+ extensions." />
      </Helmet>
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="section-container max-w-5xl mx-auto">
          {/* Search Again Bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search another domain..."
                className="pl-12 h-12 text-base rounded-xl"
              />
            </div>
            <Button
              type="submit"
              disabled={state.loading}
              className="btn-gradient h-12 px-8 rounded-xl font-bold shrink-0"
            >
              {state.loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </form>

          {/* Loading Skeleton */}
          {state.loading && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center gap-3 justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium text-lg">
                  Checking availability across all extensions…
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
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
          )}

          {/* Error / No Results */}
          {!state.loading && state.error && (
            <div className="text-center py-16 text-muted-foreground text-lg">
              {state.error}
            </div>
          )}

          {/* Results */}
          {!state.loading && state.results.length > 0 && (
            <div className="space-y-6 animate-fade-in">
              {/* Heading + check time */}
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  Results for "<span className="text-primary">{q}</span>"
                </h1>
                <Badge className="bg-primary/10 text-primary border-0 text-xs ml-auto">
                  {state.results.filter((r) => r.available).length} available
                </Badge>
              </div>
              {state.checkTime !== null && (
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Checked in {state.checkTime.toFixed(1)} seconds
                </p>
              )}

              {/* Domain Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.results.map((r, i) => {
                  const price = formatPrice(r.pricing?.register);
                  return (
                    <Card
                      key={r.domain}
                      className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up ${
                        r.available
                          ? "border-green-200 dark:border-green-800/40"
                          : "border-border/50 opacity-70"
                      }`}
                      style={{ animationDelay: `${i * 0.03}s` }}
                    >
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 ${
                          r.available
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : "bg-muted"
                        }`}
                      />
                      <CardContent className="p-5">
                        <h3 className="text-lg font-bold text-foreground tracking-tight mb-2">
                          {r.domain}
                        </h3>
                        <Badge
                          className={`mb-3 text-[11px] ${
                            r.available
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/40 hover:bg-green-100"
                              : "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border-red-200 dark:border-red-800/40 hover:bg-red-50"
                          }`}
                        >
                          {r.available ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Available
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Taken
                            </>
                          )}
                        </Badge>
                        <div className="mb-4">
                          {price ? (
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-foreground">
                                {price}
                              </span>
                              <span className="text-sm text-muted-foreground">/year</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground italic">
                              {r.available ? "Contact for pricing" : "—"}
                            </span>
                          )}
                        </div>
                        {r.available && (
                          <Button
                            className="w-full btn-gradient font-bold text-sm h-10 gap-2 rounded-lg"
                            onClick={() => handleAddToCart(r)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results at all after loading */}
          {!state.loading && !state.error && state.results.length === 0 && q && (
            <div className="text-center py-16 text-muted-foreground text-lg">
              No results found — please try a different name.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DomainSearch;
