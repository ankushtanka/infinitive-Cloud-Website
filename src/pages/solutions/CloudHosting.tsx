import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Cloud, Server, Database, Lock, Zap, Shield, 
  CheckCircle2, ArrowRight, Globe, HardDrive 
} from "lucide-react";

const CloudHosting = () => {
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
        <title>Cloud Hosting Services India | Scalable Cloud Infrastructure - Infinitive Cloud</title>
        <meta name="description" content="Premium cloud hosting services in India with 99.99% uptime SLA. Scalable cloud servers, automated backups, enterprise security, and 24/7 support. Starting at ₹499/month." />
        <meta name="keywords" content="cloud hosting India, cloud servers, scalable hosting, VPS hosting, managed cloud, enterprise cloud hosting, cloud infrastructure" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/cloud-hosting" />
        <meta property="og:title" content="Cloud Hosting Services India | Scalable Infrastructure" />
        <meta property="og:description" content="Premium cloud hosting with 99.99% uptime SLA. Auto-scaling servers, enterprise security, and expert support." />
        <meta property="og:type" content="website" />
      </Helmet>

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
                <Link to="/quote">
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
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Cloud Hosting <span className="gradient-text">Plans</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Choose the perfect cloud hosting plan for your business needs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index}
                  className={`card-hover relative ${plan.popular ? 'border-2 border-primary shadow-xl' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full">
                      <span className="text-sm font-bold text-white">Most Popular</span>
                    </div>
                  )}
                  <CardContent className="pt-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-black gradient-text">{plan.price}</span>
                      <span className="text-foreground/70">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/quote">
                      <Button className={`w-full h-12 font-bold ${plan.popular ? 'btn-gradient' : ''}`}>
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                <Link to="/quote">
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
