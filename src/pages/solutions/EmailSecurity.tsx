import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Mail, Shield, Lock, Monitor, Zap, Globe, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const emailServices = [
  {
    id: "zoho",
    name: "Zoho Mail",
    icon: Mail,
    tagline: "Professional Email for Business",
    desc: "Ad-free, secure business email with 30 GB storage, calendar, contacts, and notes. Perfect for startups and SMBs.",
    price: "₹75",
    period: "/user/mo",
    features: ["30 GB Mailbox", "Custom Domain Email", "Calendar & Contacts", "Mobile Apps", "Email Routing", "24/7 Support"],
  },
  {
    id: "office365",
    name: "Microsoft 365",
    icon: Monitor,
    tagline: "Complete Productivity Suite",
    desc: "Get Outlook, Word, Excel, PowerPoint, Teams, and 1 TB OneDrive cloud storage per user. Enterprise-grade collaboration.",
    price: "₹550",
    period: "/user/mo",
    popular: true,
    features: ["50 GB Mailbox", "Office Desktop Apps", "Microsoft Teams", "1 TB OneDrive", "SharePoint", "Enterprise Security"],
  },
  {
    id: "workspace",
    name: "Google Workspace",
    icon: Zap,
    tagline: "Smart Business Tools by Google",
    desc: "Gmail, Google Drive, Docs, Sheets, Meet, and more with your custom domain. Trusted by millions of businesses.",
    price: "₹250",
    period: "/user/mo",
    features: ["30 GB Cloud Storage", "Custom Gmail", "Google Meet", "Google Docs Suite", "Admin Console", "24/7 Support"],
  },
];

const sslPlans = [
  { name: "Domain Validation (DV)", price: "₹999", period: "/yr", desc: "Basic encryption for blogs & personal sites", features: ["Single Domain", "256-bit Encryption", "Browser Padlock", "5 Min Issuance"] },
  { name: "Organization Validation (OV)", price: "₹4,999", period: "/yr", desc: "Business identity verification", popular: true, features: ["Single Domain", "Business Verification", "Trust Seal", "1-3 Day Issuance"] },
  { name: "Wildcard SSL", price: "₹8,999", period: "/yr", desc: "Secure unlimited subdomains", features: ["Unlimited Subdomains", "256-bit Encryption", "Trust Seal", "Quick Issuance"] },
];

const EmailSecurity = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Business Email & SSL Certificates India | Infinitive Cloud</title>
        <meta name="description" content="Professional business email (Zoho, Microsoft 365, Google Workspace) and SSL certificates. Secure your business with Infinitive Cloud." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/email-security" />
      </Helmet>

      <Navigation />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="section-container text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" /> Email & Security
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Professional <span className="gradient-text">Email & SSL</span> Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Set up custom domain email with Zoho, Microsoft 365, or Google Workspace. Protect your website with trusted SSL certificates.
            </p>
          </div>
        </section>

        {/* Email Services */}
        <section className="py-20">
          <div className="section-container">
            <h2 className="text-3xl font-black text-center mb-4">Business Email Solutions</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Choose the email platform that fits your business needs</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {emailServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.id} id={service.id} className={`relative scroll-mt-32 ${service.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Most Popular
                      </div>
                    )}
                    <CardContent className="pt-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{service.name}</h3>
                          <p className="text-xs text-muted-foreground">{service.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
                      <div className="text-3xl font-black text-primary mb-1">
                        {service.price}<span className="text-sm font-normal text-muted-foreground">{service.period}</span>
                      </div>
                      <div className="space-y-2.5 mt-5 text-sm">
                        {service.features.map((f) => (
                          <div key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0" />{f}</div>
                        ))}
                      </div>
                      <Link to="/contact" className="block mt-6">
                        <Button className={`w-full font-bold ${service.popular ? "btn-gradient" : ""}`} variant={service.popular ? "default" : "outline"}>
                          Get Started
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* SSL Section */}
        <section id="ssl" className="py-20 bg-muted/30 scroll-mt-32">
          <div className="section-container">
            <h2 className="text-3xl font-black text-center mb-4">SSL Certificates</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Secure your website with trusted SSL certificates and boost your SEO rankings</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sslPlans.map((plan) => (
                <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      Recommended
                    </div>
                  )}
                  <CardContent className="pt-8 text-center">
                    <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>
                    <div className="text-3xl font-black text-primary mb-1">{plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span></div>
                    <div className="space-y-2.5 mt-5 text-sm text-left">
                      {plan.features.map((f) => (
                        <div key={f} className="flex items-center gap-2"><Check className="w-4 h-4 text-primary flex-shrink-0" />{f}</div>
                      ))}
                    </div>
                    <Link to="/contact" className="block mt-6">
                      <Button className={`w-full font-bold ${plan.popular ? "btn-gradient" : ""}`} variant={plan.popular ? "default" : "outline"}>
                        Buy Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EmailSecurity;
