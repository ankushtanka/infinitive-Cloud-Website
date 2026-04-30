import { Helmet } from "react-helmet";
import UniversalOrbitDiagram from "@/components/infographics/UniversalOrbitDiagram";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bug, CheckCircle2, Database, Globe, KeyRound, Lock, Mail, Monitor, Server, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const licenses = [
  {
    category: "cPanel",
    items: [
      {
        name: "cPanel License - Admin",
        subtitle: "Up to 5 Accounts",
        description: "Manage websites smarter with cPanel — perfect for VPS. Powerful and user-friendly control panel to manage websites, domains, emails, databases, and server settings.",
        price: "3,599",
        icon: Globe,
        availability: "Cloud Server / Virtual Server Only",
        features: ["Website Management", "Email & DNS Control", "Database Management", "File Manager", "SSL Management"],
      },
      {
        name: "cPanel License - Pro",
        subtitle: "Up to 30 Accounts",
        description: "Optimal for mid-level businesses and large, growing agencies. Centralized server management for your expanding web presence.",
        price: "5,399",
        icon: Globe,
        popular: true,
        availability: "Cloud Server / Virtual Server Only",
        features: ["Everything in Admin", "30 cPanel Accounts", "Advanced DNS Zone Editor", "AutoSSL", "Priority Support"],
      },
      {
        name: "cPanel License - Premier",
        subtitle: "Up to 100 Accounts",
        description: "Created for data centers, enterprise-level businesses, and larger web hosts. Complete control over your web hosting infrastructure.",
        price: "6,999",
        icon: Globe,
        availability: "Cloud / Virtual Server & Dedicated Servers",
        features: ["Everything in Pro", "100 cPanel Accounts", "Advanced Security Tools", "Automated Management", "Enterprise Support"],
      },
      {
        name: "cPanel License - Addon",
        subtitle: "50 Additional Accounts",
        description: "Expand your hosting capacity by adding 50 additional cPanel accounts to your server. Requires Premier cPanel License.",
        price: "1,799",
        icon: Globe,
        availability: "Requires Premier cPanel License",
        features: ["50 Extra Accounts", "Seamless Integration", "Same cPanel Features", "Instant Activation"],
      },
    ],
  },
  {
    category: "Security & OS",
    items: [
      {
        name: "CloudLinux License",
        subtitle: "Shared Pro Edition",
        description: "Enhanced stability, security, and resource management for shared hosting. Prevents a single user from affecting overall server performance.",
        price: "1,499",
        icon: Shield,
        availability: "Cloud / Virtual Server & Dedicated Servers",
        features: ["Account Isolation", "Resource Limits (LVE)", "CageFS Security", "MySQL Governor", "PHP Selector"],
      },
      {
        name: "Imunify360 Unlimited",
        subtitle: "Advanced 360° Server Security",
        description: "Automated security management with real-time malware scanning, firewall protection, and proactive threat prevention.",
        price: "2,699",
        icon: Lock,
        popular: true,
        availability: "Cloud / Virtual Server & Dedicated Servers",
        features: ["Real-time Malware Scanning", "Advanced Firewall", "Intrusion Detection", "Proactive Defense", "Patch Management"],
      },
    ],
  },
  {
    category: "Microsoft",
    items: [
      {
        name: "MS Windows STD Edition",
        subtitle: "4 Core CPU License",
        description: "Secure, stable, and scalable Windows Server environment for business workloads. Min 4 Core for VPS, 8 Core for Dedicated.",
        price: "1,499",
        icon: Monitor,
        availability: "Virtual Server (4 Core) & Dedicated Server (8 Core)",
        features: ["Windows Server OS", "Active Directory", "Hyper-V Support", "Remote Desktop", "IIS Web Server"],
      },
      {
        name: "MS SQL Web Edition",
        subtitle: "2 Core CPU License",
        description: "Optimized for web hosting and online applications requiring reliable, secure, and scalable database performance.",
        price: "999",
        icon: Database,
        availability: "Virtual Server (4 Core) & Dedicated Server (4 Core)",
        features: ["SQL Server Engine", "Full-text Search", "Reporting Services", "Web Optimized", "High Availability"],
      },
    ],
  },
  {
    category: "Remote Access",
    items: [
      {
        name: "TSplus Remote Access",
        subtitle: "Remote Desktop Solution",
        description: "The ideal alternative to Citrix and Microsoft RDS. Web-enable legacy apps, create SaaS solutions, or remotely access corporate tools.",
        price: "299",
        icon: Server,
        availability: "All Servers",
        features: ["Remote Desktop Access", "Application Publishing", "Web Portal", "Multi-device Support", "Session Management"],
      },
    ],
  },
];

const ServerLicenses = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Server & Software Licenses | cPanel, Plesk, Windows | Infinitive Cloud</title>
        <meta name="description" content="Buy genuine cPanel, CloudLinux, Imunify360, Windows Server, MS SQL, and TSplus licenses at best prices. Instant activation with reliable support from Infinitive Cloud." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/server-licenses" />
      </Helmet>

      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="section-container relative z-10 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-semibold border-primary/30 text-primary">
              <Shield className="w-4 h-4 mr-2" /> Genuine Licenses
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
              Software & Server <span className="text-primary">Licenses</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Genuine cPanel, CloudLinux, Imunify360, Microsoft Windows & SQL Server licenses with instant activation and reliable support.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Get Custom Quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/quote">Request Bulk Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
          {{/* Premium animated infographic */}}
          <section className="section-container -mt-8 mb-20">
            <div className="max-w-5xl mx-auto animate-fade-in">
              <UniversalOrbitDiagram
                CenterIcon={{KeyRound}}
                centerTitle="License Vault"
                centerSubtitle="Instant Activation"
                statusLabel="Keys · provisioning"
                metric="< 1 min"
                badge="Authorized Reseller"
                uid="serverli"
                nodes={{[
                  { icon: Server, label: "cPanel", angle: 0 },
                  { icon: Shield, label: "CloudLinux", angle: 60 },
                  { icon: Bug, label: "Imunify360", angle: 120 },
                  { icon: Mail, label: "SitePad", angle: 180 },
                  { icon: Database, label: "JetBackup", angle: 240 },
                  { icon: Zap, label: "LiteSpeed", angle: 300 },
                ]}}
              />
            </div>
          </section>


        {/* Trust Badges */}
        <section className="py-8 border-y border-border bg-muted/30">
          <div className="section-container">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Genuine Licenses</div>
              <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Instant Activation</div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> 24/7 Support</div>
              <div className="flex items-center gap-2"><Server className="w-5 h-5 text-primary" /> Compatible with All Servers</div>
            </div>
          </div>
        </section>

        {/* License Categories */}
        {licenses.map((category) => (
          <section key={category.category} className="py-16 border-b border-border/50">
            <div className="section-container">
              <h2 className="text-3xl font-bold text-foreground mb-2">{category.category} <span className="text-primary">Licenses</span></h2>
              <p className="text-muted-foreground mb-10">Choose the right license for your infrastructure needs.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((license) => {
                  const Icon = license.icon;
                  return (
                    <Card
                      key={license.name}
                      className={`relative flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        license.popular ? "border-primary shadow-lg ring-2 ring-primary/20" : ""
                      }`}
                    >
                      {license.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1 shadow-md">
                            POPULAR
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2.5 rounded-xl bg-primary/10">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{license.name}</CardTitle>
                            <CardDescription className="text-xs font-medium">{license.subtitle}</CardDescription>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{license.description}</p>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="mb-5">
                            <span className="text-3xl font-black text-foreground">₹{license.price}</span>
                            <span className="text-muted-foreground text-sm">/month</span>
                          </div>

                          <ul className="space-y-2 mb-6">
                            {license.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <p className="text-xs text-muted-foreground/70 bg-muted/50 rounded-lg px-3 py-2 mb-5">
                            {license.availability}
                          </p>
                        </div>

                        <Button className="w-full" variant={license.popular ? "default" : "outline"} asChild>
                          <Link to="/quote">Order Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
          <div className="section-container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need a Custom License Package?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Contact our team for bulk license pricing, custom configurations, or any questions about compatibility with your server setup.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Contact Sales <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/live-chat">Live Chat</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServerLicenses;
