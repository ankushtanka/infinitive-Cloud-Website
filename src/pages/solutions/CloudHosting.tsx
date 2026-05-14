import { useState } from "react";
import LazyVisible from "@/components/LazyVisible";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { StructuredData, createServiceSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CloudHostingDiagram from "@/components/infographics/CloudHostingDiagram";
import {
  Cloud, Server, Database, Lock, Zap, Shield,
  CheckCircle2, ArrowRight, Globe, Check, X, Star, Info
} from "lucide-react";

// ─── Pricing types ────────────────────────────────────────────────────────────
type Period = "1" | "12" | "24" | "48";
type FeatureType = "check" | "star";

interface PeriodData {
  price: number;
  originalPrice?: number;
  saving?: string;
  upfront?: number;
  noCommit?: boolean;
  renewsAt: number;
}

interface CloudPlan {
  id: string;
  name: string;
  tagline: string;
  popular?: boolean;
  specs: { ram: string; nvme: string; vcpu: string; bw: string };
  periods: Record<Period, PeriodData>;
  features: { label: string; type: FeatureType }[];
}

const CLOUD_PLANS: CloudPlan[] = [
  {
    id: "cloud-starter",
    name: "Cloud Starter",
    tagline: "Dedicated resources for your site",
    popular: false,
    specs: { ram: "2 GB dedicated", nvme: "50 GB NVMe", vcpu: "2 vCPUs dedicated", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 599,  noCommit: true, renewsAt: 599 },
      "12": { price: 349,  originalPrice: 599,  saving: "Save 42% vs monthly", upfront: 4188,  renewsAt: 599  },
      "24": { price: 299,  originalPrice: 599,  saving: "Save 50% vs monthly", upfront: 7176,  renewsAt: 599  },
      "48": { price: 199,  originalPrice: 599,  saving: "Save 67% vs monthly", upfront: 9552,  renewsAt: 599  },
    },
    features: [
      { label: "Unlimited websites",          type: "check" },
      { label: "50 GB NVMe SSD",              type: "check" },
      { label: "Unlimited email accounts",    type: "check" },
      { label: "2 GB dedicated RAM",          type: "check" },
      { label: "2 vCPUs dedicated",           type: "check" },
      { label: "Free SSL + CDN",              type: "check" },
      { label: "Daily automatic backups",     type: "check" },
      { label: "Imunify360 + DDoS shield",    type: "check" },
      { label: "Free domain (1 yr)",          type: "check" },
      { label: "Custom nameservers",          type: "check" },
      { label: "Free migrations",             type: "check" },
      { label: "24/7 support",               type: "star"  },
    ],
  },
  {
    id: "cloud-business",
    name: "Cloud Business",
    tagline: "Best performance for businesses",
    popular: true,
    specs: { ram: "2 GB dedicated", nvme: "100 GB NVMe", vcpu: "2 vCPUs dedicated", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 1099, noCommit: true, renewsAt: 1099 },
      "12": { price: 699,  originalPrice: 1099, saving: "Save 36% vs monthly", upfront: 8388,  renewsAt: 1099 },
      "24": { price: 549,  originalPrice: 1099, saving: "Save 50% vs monthly", upfront: 13176, renewsAt: 1099 },
      "48": { price: 349,  originalPrice: 1099, saving: "Save 68% vs monthly", upfront: 16752, renewsAt: 1099 },
    },
    features: [
      { label: "Unlimited websites",          type: "check" },
      { label: "100 GB NVMe SSD",             type: "check" },
      { label: "Unlimited email accounts",    type: "check" },
      { label: "2 GB dedicated RAM",          type: "check" },
      { label: "2 vCPUs dedicated",           type: "check" },
      { label: "Free SSL + CDN",              type: "check" },
      { label: "Daily automatic backups",     type: "check" },
      { label: "Imunify360 + DDoS shield",    type: "check" },
      { label: "Free domain (1 yr)",          type: "check" },
      { label: "Custom nameservers",          type: "check" },
      { label: "Free migrations",             type: "check" },
      { label: "24/7 priority support",      type: "star"  },
    ],
  },
  {
    id: "cloud-pro",
    name: "Cloud Pro",
    tagline: "For agencies & ecommerce stores",
    popular: false,
    specs: { ram: "2 GB dedicated", nvme: "200 GB NVMe", vcpu: "2 vCPUs dedicated", bw: "Unmetered BW" },
    periods: {
      "1":  { price: 2199, noCommit: true, renewsAt: 2199 },
      "12": { price: 1399, originalPrice: 2199, saving: "Save 36% vs monthly", upfront: 16788, renewsAt: 2199 },
      "24": { price: 1099, originalPrice: 2199, saving: "Save 50% vs monthly", upfront: 26376, renewsAt: 2199 },
      "48": { price: 649,  originalPrice: 2199, saving: "Save 70% vs monthly", upfront: 31152, renewsAt: 2199 },
    },
    features: [
      { label: "Unlimited websites",                   type: "check" },
      { label: "200 GB NVMe SSD",                      type: "check" },
      { label: "Unlimited email accounts",             type: "check" },
      { label: "2 GB dedicated RAM",                   type: "check" },
      { label: "2 vCPUs dedicated",                    type: "check" },
      { label: "Free SSL + CDN",                       type: "check" },
      { label: "Priority daily backups",               type: "check" },
      { label: "Advanced DDoS + Imunify360",           type: "check" },
      { label: "Free domain (1 yr)",                   type: "check" },
      { label: "Custom nameservers",                   type: "check" },
      { label: "Free migrations",                      type: "check" },
      { label: "24/7 priority support + account manager", type: "star" },
    ],
  },
];

const PERIODS: { key: Period; label: string }[] = [
  { key: "1",  label: "1 month" },
  { key: "12", label: "12 months" },
  { key: "24", label: "24 months" },
  { key: "48", label: "48 months — Best value" },
];

const FeatureIcon = ({ type }: { type: FeatureType }) => {
  if (type === "star") return <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" />;
  return <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />;
};

const CloudHosting = () => {
  const [period, setPeriod] = useState<Period>("48");

  const serviceSchema = createServiceSchema(
    "Enterprise Cloud Hosting Services India",
    "Premium cloud hosting with 99.99% uptime SLA, auto-scaling servers, enterprise security, SSD NVMe storage, and 24/7 expert support. Best cloud infrastructure for businesses in India.",
    "https://infinitivecloud.com/solutions/cloud-hosting",
    "Cloud Hosting Services",
    "₹499 - ₹2,499"
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Solutions", url: "https://infinitivecloud.com/solutions" },
    { name: "Cloud Hosting", url: "https://infinitivecloud.com/solutions/cloud-hosting" }
  ]);

  const faqSchema = createFAQSchema([
    {
      question: "What is cloud hosting and how is it different from traditional hosting?",
      answer: "Cloud hosting uses multiple interconnected servers to distribute resources, ensuring maximum uptime and scalability. Unlike traditional hosting that relies on a single server, cloud hosting spreads load across virtual servers for superior reliability, automatic scaling, and better performance."
    },
    {
      question: "What are cloud hosting prices in India?",
      answer: "Our cloud hosting plans start at ₹499/month for Starter Cloud (2 CPU, 4GB RAM, 50GB SSD), ₹999/month for Business Cloud (4 CPU, 8GB RAM, 100GB SSD), and ₹2,499/month for Enterprise Cloud (8 CPU, 16GB RAM, 250GB SSD). All plans include free SSL and 24/7 support."
    },
    {
      question: "Do you offer 99.99% uptime guarantee?",
      answer: "Yes, we provide a 99.99% uptime SLA guarantee with all cloud hosting plans. Our redundant infrastructure and automated failover systems ensure your website remains accessible at all times."
    },
    {
      question: "Is cloud hosting suitable for e-commerce websites?",
      answer: "Absolutely! Cloud hosting is perfect for e-commerce sites as it offers scalability during traffic spikes, enhanced security for payment processing, fast loading speeds, and guaranteed uptime to ensure you never miss sales opportunities."
    }
  ]);

  const features = [
    {
      icon: Server,
      title: "Scalable Infrastructure",
      description: "Auto-scaling cloud servers that grow with your business demands, ensuring optimal performance at all times."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption, DDoS protection, and advanced firewall systems to keep your data safe."
    },
    {
      icon: Zap,
      title: "Lightning Fast Performance",
      description: "SSD NVMe storage, CDN integration, and optimized server configurations for maximum speed."
    },
    {
      icon: Database,
      title: "Automated Backups",
      description: "Daily automated backups with instant restoration capabilities to protect against data loss."
    },
    {
      icon: Globe,
      title: "Global Data Centers",
      description: "Multiple data center locations worldwide for reduced latency and improved reliability."
    },
    {
      icon: Lock,
      title: "Free SSL Certificates",
      description: "Complimentary SSL certificates for all domains to ensure secure, encrypted connections."
    }
  ];

  const plans = [
    {
      name: "Starter Cloud",
      price: "₹499",
      features: ["2 CPU Cores", "4GB RAM", "50GB SSD Storage", "1TB Bandwidth", "Free SSL", "24/7 Support"]
    },
    {
      name: "Business Cloud",
      price: "₹999",
      features: ["4 CPU Cores", "8GB RAM", "100GB SSD Storage", "2TB Bandwidth", "Free SSL", "Priority Support"],
      popular: true
    },
    {
      name: "Enterprise Cloud",
      price: "₹2,499",
      features: ["8 CPU Cores", "16GB RAM", "250GB SSD Storage", "5TB Bandwidth", "Free SSL", "Dedicated Support"]
    }
  ];

  const benefits = [
    "99.99% Uptime SLA Guarantee",
    "24/7 Expert Technical Support",
    "Instant Provisioning & Deployment",
    "Full Root Access & Control",
    "IPv4 & IPv6 Support",
    "DDoS Protection Included",
    "Automated OS Updates",
    "API Access for Automation",
    "Free Migration Assistance",
    "Money-Back Guarantee"
  ];

  return (
    <>
      <Helmet>
        <title>Best Cloud Hosting India | 99.99% Uptime | Starting ₹499/mo - Infinitive Cloud</title>
        <meta name="description" content="⭐ #1 Cloud Hosting Provider in India | 99.99% Uptime SLA | SSD NVMe Storage | Auto-Scaling | Free SSL | 24/7 Support | Enterprise Security | Starting ₹499/month. 10,000+ Happy Customers. Get Started Free!" />
        <meta name="keywords" content="cloud hosting India, best cloud hosting, cheap cloud hosting India, managed cloud hosting, scalable cloud servers, enterprise cloud hosting, cloud infrastructure India, SSD cloud hosting, AWS alternative India, cloud VPS hosting, business cloud hosting" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/cloud-hosting" />
        <meta property="og:title" content="Best Cloud Hosting India | 99.99% Uptime | From ₹499/month" />
        <meta property="og:description" content="Premium cloud hosting with auto-scaling, enterprise security, and expert 24/7 support. Trusted by 10,000+ businesses." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/cloud-hosting" />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Cloud Hosting India - 99.99% Uptime SLA" />
        <meta name="twitter:description" content="Enterprise cloud hosting from ₹499/month. Auto-scaling, free SSL, 24/7 support." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      
      <StructuredData data={serviceSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Cloud className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Enterprise Cloud Solutions</span>
              </div>
              <h1 className="mb-6">
                Premium <span className="gradient-text">Cloud Hosting</span> Solutions
              </h1>
              <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                Enterprise-Grade Cloud Infrastructure with 99.99% Uptime SLA
              </p>
              <p className="text-base md:text-lg text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
                Power your business with scalable cloud servers, automated deployments, and enterprise-level 
                security. Our cloud hosting platform delivers exceptional performance, reliability, and 
                flexibility for businesses of all sizes across India and globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-8">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="h-14 px-8 font-semibold">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Premium architecture diagram */}
          <section className="section-container mb-20">
            <div className="max-w-5xl mx-auto">
              <LazyVisible minHeight={400}><CloudHostingDiagram /></LazyVisible>
            </div>
          </section>

          {/* Features Grid */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Powerful <span className="gradient-text">Cloud Features</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Everything you need to run your applications in the cloud with confidence and control.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index} 
                    className="card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 glow-effect">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Pricing Plans */}
          <section className="section-container mb-20">
            <div className="text-center mb-10">
              <h2 className="mb-4">
                Cloud Hosting <span className="gradient-text">Plans</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Choose the perfect cloud hosting plan for your business needs. Save more with longer commitment.
              </p>
            </div>

            {/* Commitment period selector */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Commitment Period
              </p>
              <div className="relative max-w-xs">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as Period)}
                  className="w-full h-11 pl-4 pr-10 rounded-xl border border-border/60 bg-card/60 backdrop-blur-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  {PERIODS.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </div>

            {/* Info note */}
            <div className="flex items-start gap-2 mb-8 text-sm text-muted-foreground max-w-3xl">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
              <span>Every cloud plan gives your customer a fully dedicated cPanel — 2 GB RAM + 2 vCPUs guaranteed to them alone, never shared.</span>
            </div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {CLOUD_PLANS.map((plan) => {
                const pd = plan.periods[period];
                return (
                  <Card
                    key={plan.id}
                    className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      plan.popular
                        ? "border-primary/50 ring-2 ring-primary/20 shadow-lg shadow-primary/10"
                        : "border-border"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                    )}
                    <CardContent className="p-6 pt-7 flex flex-col flex-1">
                      {plan.popular && (
                        <div className="text-center mb-3">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Most popular</span>
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-5 text-xs text-muted-foreground">
                        <span>{plan.specs.ram}</span>
                        <span>{plan.specs.vcpu}</span>
                        <span>{plan.specs.nvme}</span>
                        <span>{plan.specs.bw}</span>
                      </div>

                      <div className="mb-1">
                        {pd.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{pd.originalPrice.toLocaleString("en-IN")}/mo
                          </span>
                        )}
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-foreground">₹{pd.price.toLocaleString("en-IN")}</span>
                          <span className="text-sm text-muted-foreground">/month</span>
                        </div>
                      </div>

                      <div className="min-h-[56px] mb-4 text-sm">
                        {pd.noCommit ? (
                          <p className="text-muted-foreground text-xs">
                            No commitment · cancel anytime<br />
                            <em>Renews at ₹{pd.renewsAt.toLocaleString("en-IN")}/mo</em>
                          </p>
                        ) : (
                          <>
                            <p className="text-green-600 dark:text-green-400 font-medium text-xs">{pd.saving}</p>
                            <p className="text-muted-foreground text-xs">
                              Pay ₹{pd.upfront?.toLocaleString("en-IN")} upfront · {period} months<br />
                              <em>Renews at ₹{pd.renewsAt.toLocaleString("en-IN")}/mo</em>
                            </p>
                          </>
                        )}
                      </div>

                      <Link
                        to={`/cart?product=${plan.id}&period=${period}&name=${encodeURIComponent(plan.name)}&type=cloud-hosting`}
                        className="mb-6"
                      >
                        <Button
                          className={`w-full h-10 font-bold ${plan.popular ? "btn-gradient" : ""}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Get started <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Button>
                      </Link>

                      <div className="border-t border-border mb-4" />

                      <ul className="space-y-2.5 flex-1">
                        {plan.features.map((f) => (
                          <li key={f.label} className="flex items-start gap-2.5">
                            <FeatureIcon type={f.type} />
                            <span className="text-sm text-foreground/80 leading-snug">{f.label}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="text-xs text-center text-muted-foreground mt-6">
              All prices are in INR. Taxes may apply. Plans renew at regular monthly rate after commitment period.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Why Choose Our <span className="gradient-text">Cloud Hosting</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold mb-6">
                What is Cloud Hosting and Why Your Business Needs It
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Cloud hosting is a revolutionary hosting solution that uses multiple interconnected servers 
                to distribute resources and ensure maximum uptime. Unlike traditional hosting where your 
                website relies on a single server, cloud hosting spreads the load across multiple virtual 
                servers, providing superior reliability, scalability, and performance.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 mt-8">
                Benefits of Cloud Hosting for Indian Businesses
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                For businesses in India, cloud hosting offers unmatched advantages including scalability 
                to handle traffic spikes during festivals and sales, cost-effectiveness with pay-as-you-go 
                pricing, enhanced security with enterprise-grade protection, and 24/7 local support. Our 
                cloud infrastructure is optimized for Indian market needs with data centers ensuring low 
                latency and compliance with local data regulations.
              </p>

              <h3 className="text-2xl font-bold mb-4 mt-8">
                Cloud vs Traditional Hosting: Making the Right Choice
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Traditional shared hosting limits your resources and scalability, while cloud hosting 
                provides on-demand resource allocation, automatic failover, and horizontal scaling. 
                Whether you're running an e-commerce store, SaaS application, or corporate website, 
                cloud hosting ensures your digital presence remains fast, secure, and always available.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="mb-4">Ready to Move to the Cloud?</h2>
                <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Get started with enterprise-grade cloud hosting today. Free migration assistance included.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-10">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CloudHosting;
