import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Server, Globe, Shield, Mail, Database, Settings, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const categories = [
  {
    icon: Server,
    title: "Getting Started",
    description: "Set up your hosting account, connect your domain, and launch your first website.",
    articles: ["How to set up your hosting account", "Connecting your domain name", "Installing WordPress via cPanel", "Setting up email accounts", "Understanding your control panel"],
  },
  {
    icon: Globe,
    title: "Domain Management",
    description: "Manage DNS records, transfers, and domain settings.",
    articles: ["How to update DNS records", "Transferring a domain to us", "Setting up domain forwarding", "Understanding nameservers", "WHOIS privacy protection"],
  },
  {
    icon: Shield,
    title: "Security & SSL",
    description: "Secure your website with SSL certificates and best practices.",
    articles: ["Installing an SSL certificate", "Forcing HTTPS on your website", "Understanding DDoS protection", "Setting up two-factor authentication", "Malware scanning and removal"],
  },
  {
    icon: Mail,
    title: "Email Hosting",
    description: "Configure and manage your business email accounts.",
    articles: ["Creating email accounts in cPanel", "Setting up email on mobile", "Configuring SPF, DKIM & DMARC", "Troubleshooting email delivery", "Email storage and quotas"],
  },
  {
    icon: Database,
    title: "Databases & Development",
    description: "Manage MySQL databases, PHP settings, and developer tools.",
    articles: ["Creating a MySQL database", "Updating PHP version", "Using phpMyAdmin", "Setting up cron jobs", "SSH access and Git deployment"],
  },
  {
    icon: Settings,
    title: "Account & Billing",
    description: "Manage your account, invoices, and subscription details.",
    articles: ["Upgrading your hosting plan", "Understanding your invoice", "Requesting a refund", "Updating payment method", "Cancelling your subscription"],
  },
];

const Knowledgebase = () => {
  return (
    <>
      <Helmet>
        <title>Knowledgebase | Hosting Help & Tutorials - Infinitive Cloud</title>
        <meta name="description" content="Find answers to common hosting questions. Step-by-step tutorials for cPanel, WordPress, domains, SSL, email, and more. Self-service support from Infinitive Cloud." />
        <link rel="canonical" href="https://infinitivecloud.com/knowledgebase" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">Knowledgebase</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                Find answers, tutorials, and step-by-step guides to help you get the most out of your hosting.
              </p>
              <div className="max-w-lg mx-auto flex gap-3">
                <input
                  type="text"
                  placeholder="Search for articles..."
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
                <Button className="btn-gradient h-12 px-6" disabled><Search className="w-5 h-5" /></Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Search coming soon. Browse categories below or contact support.</p>
            </div>
          </section>

          <section className="section-container mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <Card key={cat.title} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{cat.description}</p>
                      <ul className="space-y-2">
                        {cat.articles.map((article, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                            <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                            {article}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="py-12 text-center">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="mb-4">Can't Find What You're Looking For?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our support team is available 24/7 to help with any questions or technical issues.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Contact Support</Button></Link>
                  <a href="mailto:support@infinitivecloud.com"><Button variant="outline" className="h-14 px-8 font-semibold">Email Us</Button></a>
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

export default Knowledgebase;
