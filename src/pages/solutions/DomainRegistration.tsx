import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, Shield, Zap, Search, Lock, RefreshCw, Headphones, Check, ArrowRight, Star, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const popularExtensions = [
  { ext: ".com", type: "Commercial", price: "₹799", original: "₹1,199", desc: "The world's #1 domain extension", popular: true },
  { ext: ".in", type: "India", price: "₹449", original: "₹699", desc: "Perfect for Indian businesses", popular: true },
  { ext: ".co.in", type: "Company India", price: "₹299", original: "₹499", desc: "Indian company identity", popular: false },
  { ext: ".net", type: "Network", price: "₹899", original: "₹1,299", desc: "Great for tech & networking", popular: false },
  { ext: ".org", type: "Organization", price: "₹749", original: "₹1,099", desc: "Ideal for non-profits & communities", popular: false },
  { ext: ".online", type: "Online Business", price: "₹199", original: "₹599", desc: "Modern & affordable", popular: true },
  { ext: ".site", type: "Website", price: "₹199", original: "₹499", desc: "Simple & recognizable", popular: false },
  { ext: ".xyz", type: "Universal", price: "₹99", original: "₹299", desc: "The next generation domain", popular: true },
  { ext: ".store", type: "E-Commerce", price: "₹299", original: "₹699", desc: "Built for online stores", popular: false },
  { ext: ".tech", type: "Technology", price: "₹399", original: "₹799", desc: "For tech companies & startups", popular: false },
  { ext: ".io", type: "Tech / SaaS", price: "₹2,499", original: "₹3,499", desc: "Startup & developer favourite", popular: true },
  { ext: ".dev", type: "Developer", price: "₹999", original: "₹1,499", desc: "For developers & portfolios", popular: false },
];

const bulkPricing = [
  { years: "1 Year", discount: "0%", note: "Standard pricing" },
  { years: "2 Years", discount: "10% OFF", note: "Save more with 2-year plans" },
  { years: "3 Years", discount: "15% OFF", note: "Best value for long-term" },
  { years: "5 Years", discount: "20% OFF", note: "Maximum savings" },
];

const features = [
  { icon: Zap, title: "Instant Activation", description: "Your domain goes live immediately after registration. No waiting, no delays — start building right away." },
  { icon: Lock, title: "Free WHOIS Privacy", description: "Your personal details stay hidden. We include complimentary WHOIS privacy protection on every domain." },
  { icon: Shield, title: "Domain Lock Protection", description: "Prevent unauthorized domain transfers with registrar lock security enabled by default on all domains." },
  { icon: RefreshCw, title: "Easy Auto-Renewal", description: "Never accidentally lose your domain. Get renewal reminders and enable one-click auto-renewal." },
  { icon: Globe, title: "Full DNS Management", description: "Complete DNS control panel to manage A, AAAA, CNAME, MX, TXT, SRV, and NS records with ease." },
  { icon: Headphones, title: "Domain Expert Support", description: "Our team handles domain transfers, DNS configuration, email routing, and any domain-related queries 24/7." },
];

const transferSteps = [
  { step: "01", title: "Unlock Domain", description: "Unlock your domain at your current registrar and get the EPP/authorization code." },
  { step: "02", title: "Initiate Transfer", description: "Submit a transfer request with us and provide the authorization code." },
  { step: "03", title: "Approve Transfer", description: "Approve the transfer via the confirmation email sent by your registrar." },
  { step: "04", title: "Transfer Complete", description: "Your domain is now with Infinitive Cloud with a free 1-year extension added." },
];

const DomainRegistration = () => {
  const [domain, setDomain] = useState("");
  const [searched, setSearched] = useState(false);
  const baseName = domain.replace(/\..+$/, "").trim();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) setSearched(true);
  };

  return (
    <>
      <Helmet>
        <title>Domain Registration India | Register .com .in Domains from ₹99/yr - Infinitive Cloud</title>
        <meta name="description" content="Register your domain name in India starting at ₹99/yr. 500+ extensions available with free WHOIS privacy, instant activation, and DNS management. Trusted by 1000+ businesses." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/domains" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero + Search */}
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
                <Tag className="w-4 h-4" />
                Starting at just ₹99/yr
              </div>
              <h1 className="mb-6">
                Register Your <span className="gradient-text">Dream Domain</span> Starting at ₹99/yr
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Secure your brand online with instant domain registration. Choose from 500+ extensions with free WHOIS privacy, DNS management, and expert support.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search your domain... e.g. mybusiness"
                    value={domain}
                    onChange={(e) => { setDomain(e.target.value); setSearched(false); }}
                    className="pl-12 h-14 text-base md:text-lg rounded-xl border-2 focus:border-primary"
                  />
                </div>
                <Button type="submit" className="btn-gradient h-14 px-8 rounded-xl font-bold text-base">
                  Search
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">Example: yourbusiness.com, mybrand.in, mywebsite.co.in</p>
            </div>
          </section>

          {/* Search Results */}
          {searched && baseName && (
            <section className="section-container mb-16 animate-fade-in">
              <Card className="max-w-4xl mx-auto border-2 border-primary/20">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Domain results for <span className="font-bold text-foreground">"{baseName}"</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {popularExtensions.slice(0, 9).map((ext) => (
                      <div
                        key={ext.ext}
                        className="flex items-center justify-between bg-muted/50 hover:bg-muted rounded-xl px-4 py-3 transition-colors border border-transparent hover:border-primary/20"
                      >
                        <div>
                          <span className="font-bold text-sm">{baseName}{ext.ext}</span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Check className="w-3 h-3 text-primary" />
                            <span className="text-xs text-primary font-medium">Available</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground line-through block">₹{ext.original}/yr</span>
                          <span className="text-sm text-primary font-black">{ext.price}/yr</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Link to="/contact">
                      <Button className="btn-gradient font-bold h-12 px-8">
                        Register Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Domain Extensions Pricing */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Popular <span className="gradient-text">Domain Extensions</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose from the most popular domain extensions at India's most competitive prices.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {popularExtensions.map((d, i) => (
                <Card
                  key={d.ext}
                  className={`card-hover text-center animate-fade-in-up relative overflow-hidden ${
                    d.popular ? "border-primary/30 shadow-primary/5 shadow-md" : ""
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {d.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                  )}
                  <CardContent className="p-6">
                    {d.popular && (
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Popular</span>
                      </div>
                    )}
                    <h3 className="text-3xl font-black gradient-text mb-1">{d.ext}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{d.type}</p>
                    <p className="text-[11px] text-muted-foreground/70 mb-3">{d.desc}</p>
                    <div>
                      <span className="text-xs text-muted-foreground line-through block">{d.original}/yr</span>
                      <span className="text-xl font-black text-foreground">{d.price}<span className="text-sm font-medium text-muted-foreground">/yr</span></span>
                    </div>
                    <Link to="/contact">
                      <Button variant="outline" size="sm" className="mt-3 w-full text-xs font-bold">
                        Register
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Multi-Year Discount */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Save More with <span className="gradient-text">Multi-Year Registration</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Lock in today's prices and save up to 20% when you register for multiple years.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {bulkPricing.map((b, i) => (
                <Card key={b.years} className="card-hover text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{b.years}</h3>
                    <span className={`text-2xl font-black ${b.discount !== "0%" ? "gradient-text" : "text-muted-foreground"}`}>
                      {b.discount === "0%" ? "—" : b.discount}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">{b.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Domain Transfer */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Transfer Your Domain to <span className="gradient-text">Infinitive Cloud</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Move your domain to us in 4 simple steps. Get a free 1-year extension on every transfer.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {transferSteps.map((s, i) => (
                <Card key={s.step} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-6">
                    <span className="text-4xl font-black text-primary/15">{s.step}</span>
                    <h3 className="text-lg font-bold mb-2 mt-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/contact">
                <Button className="btn-gradient font-bold h-12 px-8">
                  Start Domain Transfer <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Features */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Everything You Get With <span className="gradient-text">Every Domain</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Every domain registered with us includes these premium features at no extra cost.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="py-12 text-center">
                <h2 className="mb-4">Ready to Claim Your Domain?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Register a new domain or transfer your existing one. Free WHOIS privacy, instant activation, and expert support included.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Register Domain</Button></Link>
                  <Link to="/quote"><Button variant="outline" className="h-14 px-8 font-semibold">Get a Quote</Button></Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DomainRegistration;
