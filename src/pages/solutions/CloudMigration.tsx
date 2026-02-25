import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Cloud, Shield, Clock, Zap, CheckCircle, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const steps = [
  { step: "01", title: "Assessment & Planning", description: "We analyze your current setup, identify dependencies, and create a detailed migration roadmap with zero downtime strategy." },
  { step: "02", title: "Environment Setup", description: "We provision and configure your new cloud environment with optimized settings for your specific workload." },
  { step: "03", title: "Data Migration", description: "Secure transfer of all files, databases, emails, and configurations to the new infrastructure with full verification." },
  { step: "04", title: "Testing & Go-Live", description: "Comprehensive testing of all functionality, DNS switchover, and 48-hour post-migration monitoring and support." },
];

const features = [
  { icon: Clock, title: "Zero Downtime Migration", description: "We migrate your website without any service interruption. Your visitors won't notice a thing." },
  { icon: Shield, title: "Secure Data Transfer", description: "All data is transferred using encrypted connections with complete integrity verification." },
  { icon: Zap, title: "Free Migration Service", description: "We handle the entire migration process at no additional cost for all hosting plans." },
  { icon: CheckCircle, title: "Full Compatibility Check", description: "We test every aspect of your website post-migration to ensure everything works perfectly." },
  { icon: Headphones, title: "Dedicated Migration Team", description: "A dedicated engineer is assigned to your migration for personalized attention and support." },
  { icon: Cloud, title: "Multi-Platform Support", description: "We migrate from any hosting provider — cPanel, Plesk, custom servers, AWS, GCP, and more." },
];

const CloudMigration = () => {
  return (
    <>
      <Helmet>
        <title>Free Website Migration | Zero Downtime Cloud Migration - Infinitive Cloud</title>
        <meta name="description" content="Free website migration to Infinitive Cloud with zero downtime. We handle the entire process — files, databases, emails, DNS. Migrate from any hosting provider." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/cloud-migration" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                Free <span className="gradient-text">Cloud Migration</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Moving to Infinitive Cloud? We handle everything — from files and databases to DNS configuration. Zero downtime, zero hassle, completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/quote"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Request Free Migration</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to Migration Team</Button></Link>
              </div>
            </div>
          </section>

          {/* Migration Steps */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-12">How Our <span className="gradient-text">Migration Works</span></h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <Card key={s.step} className="card-hover animate-fade-in-up relative" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CardContent className="p-8">
                    <span className="text-5xl font-black text-primary/10">{s.step}</span>
                    <h3 className="text-xl font-bold mb-2 mt-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm">{s.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="section-container mb-20">
            <h2 className="text-center mb-4">Why Migrate With <span className="gradient-text">Us</span></h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              We've migrated thousands of websites with a 100% success rate and zero data loss.
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

          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="py-12 text-center">
                <h2 className="mb-4">Ready to Make the Switch?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our migration team is standing by. Tell us about your current setup and we'll create a custom migration plan.
                </p>
                <Link to="/contact"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Start Free Migration</Button></Link>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CloudMigration;
