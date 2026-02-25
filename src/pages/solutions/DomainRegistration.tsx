import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Shield, Zap, Clock, Search, Lock, RefreshCw, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const extensions = [
  { ext: ".com", type: "Commercial", price: "₹799/yr" },
  { ext: ".in", type: "India", price: "₹499/yr" },
  { ext: ".co.in", type: "Company India", price: "₹299/yr" },
  { ext: ".net", type: "Network", price: "₹899/yr" },
  { ext: ".org", type: "Organization", price: "₹899/yr" },
  { ext: ".online", type: "Online Business", price: "₹199/yr" },
  { ext: ".site", type: "Website", price: "₹199/yr" },
  { ext: ".xyz", type: "Universal", price: "₹99/yr" },
];

const features = [
  { icon: Zap, title: "Instant Activation", description: "Your domain goes live immediately after registration. No waiting, no delays." },
  { icon: Lock, title: "Free WHOIS Privacy", description: "Keep your personal information protected with complimentary WHOIS privacy on all domains." },
  { icon: Shield, title: "Domain Lock Protection", description: "Prevent unauthorized transfers with domain lock security enabled by default." },
  { icon: RefreshCw, title: "Auto-Renewal", description: "Never lose your domain with automatic renewal reminders and easy renewal options." },
  { icon: Globe, title: "DNS Management", description: "Full DNS control panel to manage A records, CNAME, MX, TXT, and more with ease." },
  { icon: Headphones, title: "Expert Domain Support", description: "Our team helps with domain transfers, DNS configuration, and any domain-related queries." },
];

const DomainRegistration = () => {
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
          {/* Hero */}
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                Register Your <span className="gradient-text">Dream Domain</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Secure your brand online with instant domain registration. Choose from 500+ extensions with free WHOIS privacy, DNS management, and expert support.
              </p>
            </div>
          </section>

          {/* Domain Search Mockup */}
          <section className="section-container mb-16">
            <Card className="max-w-3xl mx-auto border-2 border-primary/20">
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Find Your Perfect Domain</h2>
                <p className="text-muted-foreground mb-6">Search for your ideal domain name across hundreds of extensions</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="text"
                    placeholder="yourbusiness.com"
                    className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled
                  />
                  <Button className="btn-gradient font-bold h-12 px-8" disabled>Search Domain</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Domain search coming soon. Contact us to register your domain today.</p>
              </CardContent>
            </Card>
          </section>

          {/* Domain Extensions */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Popular <span className="gradient-text">Domain Extensions</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Choose from the most popular domain extensions at competitive prices.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {extensions.map((d, i) => (
                <Card key={d.ext} className="card-hover text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-black gradient-text mb-1">{d.ext}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{d.type}</p>
                    <p className="text-lg font-bold">{d.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Why Register With <span className="gradient-text">Infinitive Cloud</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We make domain registration simple, secure, and affordable.
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
                  Contact us to register your domain or transfer an existing one. We handle everything for you.
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
