import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Globe, Headphones, HeadphonesIcon, Mail, Server, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import UniversalOrbitDiagram from "@/components/infographics/UniversalOrbitDiagram";

const ResellerHosting = () => {
  const features = [
    { icon: Users, title: "White-Label Branding", description: "Sell hosting under your own brand with fully customizable control panels and branding." },
    { icon: Server, title: "SSD NVMe Infrastructure", description: "Enterprise-grade hardware ensures your clients get fast, reliable hosting." },
    { icon: Shield, title: "Free SSL for All Accounts", description: "Every hosting account you create gets a free SSL certificate automatically." },
    { icon: Zap, title: "Easy Account Management", description: "WHM/cPanel access makes creating and managing client accounts effortless." },
    { icon: Globe, title: "Multiple Data Centers", description: "Choose server locations across the US, India, and Europe for optimal performance." },
    { icon: Headphones, title: "Priority Support", description: "Dedicated reseller support so you can resolve client issues quickly." },
  ];

  return (
    <>
      <Helmet>
        <title>Reseller Hosting | Start Your Hosting Business - Infinitive Cloud</title>
        <meta name="description" content="White-label reseller hosting with SSD NVMe, WHM/cPanel, free SSL, and priority support. Start your own hosting business with reliable infrastructure." />
        <meta name="keywords" content="reseller hosting India, white-label hosting, WHM hosting, start hosting business" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/reseller-hosting" />
        <meta property="og:title" content="Reseller Hosting | Start Your Hosting Business" />
        <meta property="og:description" content="White-label reseller hosting with WHM/cPanel, free SSL, and priority support." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/reseller-hosting" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Reseller Hosting | Start Your Hosting Business" />
        <meta name="twitter:description" content="White-label reseller hosting with WHM/cPanel, free SSL, and priority support." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">Reseller</span> Hosting
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Start and scale your own hosting business with white-label infrastructure. Sell hosting under your brand with enterprise-grade hardware, easy management, and dedicated support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/contact"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get a Quote</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
              </div>
            </div>
          </section>
          {{/* Premium animated infographic */}}
          <section className="section-container -mt-8 mb-20">
            <div className="max-w-5xl mx-auto animate-fade-in">
              <UniversalOrbitDiagram
                CenterIcon={{Users}}
                centerTitle="Reseller Panel"
                centerSubtitle="WHM · Branded"
                statusLabel="Accounts · provisioning"
                metric="∞"
                badge="White Label"
                uid="reseller"
                nodes={{[
                  { icon: Server, label: "cPanel", angle: 0 },
                  { icon: Globe, label: "DNS", angle: 60 },
                  { icon: CreditCard, label: "Billing", angle: 120 },
                  { icon: Mail, label: "Email", angle: 180 },
                  { icon: Shield, label: "Security", angle: 240 },
                  { icon: HeadphonesIcon, label: "Support", angle: 300 },
                ]}}
              />
            </div>
          </section>


          <section className="section-container mb-16">
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
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ResellerHosting;
