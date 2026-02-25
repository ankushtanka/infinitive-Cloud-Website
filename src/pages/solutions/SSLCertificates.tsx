import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Shield, Lock, Globe, Zap, Award, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const plans = [
  {
    name: "Domain Validation (DV)",
    price: "Free",
    period: "with hosting",
    popular: false,
    features: ["Single Domain", "256-bit Encryption", "Padlock & HTTPS", "5 Min Issuance", "Browser Compatible", "Auto-Renewal"],
  },
  {
    name: "Organization Validation (OV)",
    price: "₹2,999",
    period: "/yr",
    popular: true,
    features: ["Single Domain", "256-bit Encryption", "Company Name in Certificate", "Business Verification", "Warranty up to $10K", "Priority Support"],
  },
  {
    name: "Extended Validation (EV)",
    price: "₹7,999",
    period: "/yr",
    popular: false,
    features: ["Single Domain", "256-bit Encryption", "Green Address Bar", "Full Business Verification", "Warranty up to $1M", "Highest Trust Level"],
  },
  {
    name: "Wildcard SSL",
    price: "₹4,999",
    period: "/yr",
    popular: false,
    features: ["Unlimited Subdomains", "256-bit Encryption", "Single Certificate", "Padlock & HTTPS", "Warranty up to $50K", "Auto-Renewal"],
  },
];

const benefits = [
  { icon: Lock, title: "Data Encryption", description: "Protect sensitive customer data with 256-bit encryption between browser and server." },
  { icon: Globe, title: "SEO Boost", description: "Google gives ranking preference to HTTPS websites. SSL directly improves your search visibility." },
  { icon: ShieldCheck, title: "Customer Trust", description: "Display the padlock icon and HTTPS to build confidence and increase conversions." },
  { icon: Zap, title: "Instant Issuance", description: "DV certificates are issued within minutes. OV and EV certificates within 1-3 business days." },
  { icon: Award, title: "Industry Compliance", description: "Meet PCI DSS, HIPAA, and GDPR requirements with proper SSL implementation." },
  { icon: Shield, title: "Warranty Protection", description: "Financial warranty coverage in case of certificate mis-issuance, up to $1M for EV certificates." },
];

const SSLCertificates = () => {
  return (
    <>
      <Helmet>
        <title>SSL Certificates India | Free & Premium SSL from ₹2,999/yr - Infinitive Cloud</title>
        <meta name="description" content="Secure your website with SSL certificates. Free DV SSL with all hosting plans. Premium OV, EV, and Wildcard SSL certificates with 256-bit encryption and warranty protection." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/ssl-certificates" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">SSL Certificates</span> for Complete Security
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Protect your website and build customer trust with industry-standard SSL certificates. Free SSL included with all hosting plans, plus premium options for businesses that need more.
              </p>
            </div>
          </section>

          {/* Plans */}
          <section className="section-container mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, i) => (
                <Card
                  key={plan.name}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up ${
                    plan.popular ? "border-primary/50 shadow-primary/10 shadow-lg ring-2 ring-primary/20 scale-[1.02]" : ""
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {plan.popular && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full uppercase tracking-wider">Recommended</span>
                      </div>
                    </>
                  )}
                  <CardContent className="p-8 pt-10">
                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black gradient-text">{plan.price}</span>
                        <span className="text-base text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote">
                      <Button className={`w-full h-12 font-bold ${plan.popular ? "btn-gradient" : ""}`} variant={plan.popular ? "default" : "outline"}>
                        Get SSL
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Why You Need <span className="gradient-text">SSL</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              SSL is essential for every website — from personal blogs to enterprise e-commerce platforms.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((f, i) => {
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
                <h2 className="mb-4">Secure Your Website Today</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Every hosting plan includes a free DV SSL certificate. Need premium SSL? Contact our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/free-trial"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get Free SSL with Hosting</Button></Link>
                  <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
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

export default SSLCertificates;
