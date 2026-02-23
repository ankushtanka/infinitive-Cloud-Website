import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star, Zap, Shield, Globe, Server, Cpu, Mail, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";
import { useState } from "react";

type Plan = {
  name: string;
  originalPrice: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  specs?: string[];
};

type Category = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  plans: Plan[];
};

const categories: Category[] = [
  {
    id: "web-hosting",
    icon: Globe,
    title: "Web Hosting",
    description: "Blazing-fast SSD hosting with free domain, SSL & AI tools",
    plans: [
      {
        name: "Premium",
        originalPrice: "₹1,091",
        price: "₹129",
        period: "/mo",
        features: [
          "Up to 3 Websites",
          "20 GB SSD Storage",
          "Free Domain (1 Year)",
          "Free SSL Certificate",
          "Weekly Auto Backups",
          "Free Site Migration",
          "Email Marketing (1 Year)",
          "AI Website Builder",
          "2 Email Accounts/Site",
        ],
      },
      {
        name: "Business",
        originalPrice: "₹1,595",
        price: "₹199",
        period: "/mo",
        popular: true,
        features: [
          "Up to 50 Websites",
          "50 GB NVMe Storage",
          "Free Domain (1 Year)",
          "Free SSL & CDN",
          "Daily & On-Demand Backups",
          "AI eCommerce Builder",
          "WordPress AI Agent",
          "5 Email Accounts/Site",
          "WordPress Staging Tool",
          "Managed WordPress",
        ],
      },
      {
        name: "Cloud Startup",
        originalPrice: "₹2,351",
        price: "₹469",
        period: "/mo",
        features: [
          "Up to 100 Websites",
          "100 GB NVMe Storage",
          "4 GB RAM",
          "2 CPU Cores",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "100 PHP Workers",
          "2M Inodes",
          "10 Email Accounts/Site",
          "Free CDN Included",
        ],
      },
    ],
  },
  {
    id: "cloud-hosting",
    icon: Zap,
    title: "Cloud Hosting",
    description: "Fully managed cloud with 20x more resources, dedicated IPs & priority support",
    plans: [
      {
        name: "Cloud Startup",
        originalPrice: "₹2,351",
        price: "₹469",
        period: "/mo",
        specs: ["2 CPU Cores", "4 GB RAM", "100 GB NVMe"],
        features: [
          "100 Websites",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "Free SSL & CDN",
          "Daily Backups",
          "100 PHP Workers",
          "99.9% Uptime SLA",
          "Free Domain (1 Year)",
        ],
      },
      {
        name: "Cloud Professional",
        originalPrice: "₹3,527",
        price: "₹699",
        period: "/mo",
        popular: true,
        specs: ["4 CPU Cores", "8 GB RAM", "200 GB NVMe"],
        features: [
          "200 Websites",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "Free SSL & CDN",
          "Daily Backups",
          "200 PHP Workers",
          "99.9% Uptime SLA",
          "Free Domain (1 Year)",
        ],
      },
      {
        name: "Cloud Enterprise",
        originalPrice: "₹5,879",
        price: "₹1,169",
        period: "/mo",
        specs: ["8 CPU Cores", "16 GB RAM", "300 GB NVMe"],
        features: [
          "300 Websites",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "Free SSL & CDN",
          "Daily Backups",
          "300 PHP Workers",
          "99.9% Uptime SLA",
          "Free Domain (1 Year)",
        ],
      },
    ],
  },
  {
    id: "vps-hosting",
    icon: Server,
    title: "VPS Hosting",
    description: "Full root access on AMD EPYC-powered servers with NVMe SSD",
    plans: [
      {
        name: "KVM 1",
        originalPrice: "₹1,175",
        price: "₹335",
        period: "/mo",
        specs: ["1 vCPU Core", "4 GB RAM", "50 GB NVMe"],
        features: [
          "4 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
      {
        name: "KVM 2",
        originalPrice: "₹1,511",
        price: "₹469",
        period: "/mo",
        popular: true,
        specs: ["2 vCPU Cores", "8 GB RAM", "100 GB NVMe"],
        features: [
          "8 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
      {
        name: "KVM 4",
        originalPrice: "₹2,519",
        price: "₹669",
        period: "/mo",
        specs: ["4 vCPU Cores", "16 GB RAM", "200 GB NVMe"],
        features: [
          "16 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
      {
        name: "KVM 8",
        originalPrice: "₹5,039",
        price: "₹1,339",
        period: "/mo",
        specs: ["8 vCPU Cores", "32 GB RAM", "400 GB NVMe"],
        features: [
          "32 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
    ],
  },
  {
    id: "wordpress-hosting",
    icon: Palette,
    title: "WordPress Hosting",
    description: "Managed WordPress with AI tools, auto-updates & staging environments",
    plans: [
      {
        name: "Premium",
        originalPrice: "₹1,091",
        price: "₹129",
        period: "/mo",
        features: [
          "Up to 3 Websites",
          "20 GB SSD Storage",
          "Free Domain (1 Year)",
          "Free SSL Certificate",
          "Weekly Auto Backups",
          "Managed WordPress",
          "Free Site Migration",
          "2 Email Accounts/Site",
        ],
      },
      {
        name: "Business + AI",
        originalPrice: "₹1,595",
        price: "₹199",
        period: "/mo",
        popular: true,
        features: [
          "Up to 50 Websites",
          "50 GB NVMe Storage",
          "AI Website Builder",
          "AI Agent for WordPress",
          "AI Troubleshooter",
          "Daily Backups",
          "WordPress Staging Tool",
          "Free CDN & SSL",
          "5 Email Accounts/Site",
        ],
      },
      {
        name: "Cloud Startup + AI",
        originalPrice: "₹2,351",
        price: "₹469",
        period: "/mo",
        features: [
          "Up to 100 Websites",
          "100 GB NVMe Storage",
          "4 GB RAM & 2 CPU Cores",
          "AI Tools Included",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "100 PHP Workers",
          "Daily Backups",
          "10 Email Accounts/Site",
        ],
      },
    ],
  },
  {
    id: "email-hosting",
    icon: Mail,
    title: "Business Email",
    description: "Professional email hosting with your own domain",
    plans: [
      {
        name: "Business Starter",
        originalPrice: "₹169",
        price: "₹79",
        period: "/mo",
        features: [
          "10 GB Storage",
          "Custom Domain Email",
          "Webmail Access",
          "Calendar & Contacts",
          "Anti-Spam Protection",
          "IMAP/POP3 Support",
        ],
      },
      {
        name: "Business Premium",
        originalPrice: "₹299",
        price: "₹149",
        period: "/mo",
        popular: true,
        features: [
          "50 GB Storage",
          "Custom Domain Email",
          "Webmail Access",
          "Calendar & Contacts",
          "Advanced Anti-Spam",
          "Priority Support",
          "Email Aliases",
          "Auto-Reply Rules",
        ],
      },
    ],
  },
  {
    id: "reseller-hosting",
    icon: Cpu,
    title: "Reseller & Agency Hosting",
    description: "White-label hosting to start your own hosting business",
    plans: [
      {
        name: "Agency Starter",
        originalPrice: "₹1,679",
        price: "₹539",
        period: "/mo",
        features: [
          "50 Websites",
          "50 GB NVMe Storage",
          "White-Label Panel",
          "Client Management",
          "Free SSL & CDN",
          "Daily Backups",
          "Priority Support",
        ],
      },
      {
        name: "Agency Pro",
        originalPrice: "₹2,855",
        price: "₹899",
        period: "/mo",
        popular: true,
        features: [
          "100 Websites",
          "100 GB NVMe Storage",
          "White-Label Panel",
          "Client Management",
          "Dedicated IP",
          "Free SSL & CDN",
          "Daily Backups",
          "Priority 24/7 Support",
          "Reseller API Access",
        ],
      },
      {
        name: "Agency Enterprise",
        originalPrice: "₹5,039",
        price: "₹1,599",
        period: "/mo",
        features: [
          "300 Websites",
          "200 GB NVMe Storage",
          "White-Label Panel",
          "Full Client Management",
          "Dedicated IP",
          "Free SSL & CDN",
          "Daily Backups",
          "Priority 24/7 Support",
          "Reseller API Access",
          "Custom Branding",
        ],
      },
    ],
  },
];

const Pricing = () => {
  const [activeCategory, setActiveCategory] = useState("web-hosting");
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Pricing", url: "https://infinitivecloud.com/pricing" },
  ]);

  const currentCategory = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Pricing - Affordable Cloud Hosting, VPS, WordPress & Reseller Hosting India</title>
        <meta
          name="description"
          content="India's most affordable hosting plans. Web hosting from ₹129/mo, Cloud from ₹469/mo, VPS from ₹335/mo, WordPress from ₹129/mo. 99.9% uptime, 24/7 support."
        />
        <meta
          name="keywords"
          content="web hosting pricing India, cloud hosting plans, VPS hosting cost, WordPress hosting price, reseller hosting India, cheap hosting India"
        />
        <link rel="canonical" href="https://infinitivecloud.com/pricing" />
        <meta property="og:title" content="Affordable Hosting Plans - Infinitive Cloud" />
        <meta property="og:description" content="Web hosting from ₹129/mo, Cloud from ₹469/mo, VPS from ₹335/mo. Enterprise features at India's best prices." />
        <meta property="og:url" content="https://infinitivecloud.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing - Infinitive Cloud" />
        <meta name="twitter:description" content="Affordable cloud, VPS, WordPress & reseller hosting in India." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>

      <StructuredData data={breadcrumbSchema} />

      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-12">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade hosting at India's most competitive prices. All plans include free SSL, 24/7 support & 99.9% uptime guarantee.
            </p>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="section-container mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.title}
              </button>
            ))}
          </div>
        </section>

        {/* Plans Grid */}
        <section className="section-container mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">{currentCategory.title}</h2>
            <p className="text-muted-foreground">{currentCategory.description}</p>
          </div>

          <div className={`grid grid-cols-1 gap-8 ${
            currentCategory.plans.length === 2
              ? "md:grid-cols-2 max-w-3xl mx-auto"
              : currentCategory.plans.length === 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3"
          }`}>
            {currentCategory.plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in-up ${
                  plan.popular ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                )}
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Star className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}/mo</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-black gradient-text">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <span className="inline-block mt-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Save 20% + Extra
                    </span>
                  </div>

                  {plan.specs && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {plan.specs.map((spec, i) => (
                        <span key={i} className="text-xs font-medium bg-muted px-2 py-1 rounded-md">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/quote">
                    <Button
                      className={`w-full ${plan.popular ? "btn-gradient" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Banner */}
        <section className="section-container mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "99.9% Uptime", desc: "Guaranteed SLA" },
              { label: "24/7 Support", desc: "Expert Help Always" },
              { label: "Free SSL", desc: "On All Plans" },
              { label: "30-Day Refund", desc: "Money-Back Guarantee" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-muted/50">
                <div className="text-lg font-bold text-foreground">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Quote CTA */}
        <section className="section-container">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="mb-4">Need a Custom Solution?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every business is unique. Get a tailored hosting plan with custom resources, managed services, and dedicated support.
              </p>
              <Link to="/contact">
                <Button size="lg" className="btn-gradient font-semibold px-8">
                  Request Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
