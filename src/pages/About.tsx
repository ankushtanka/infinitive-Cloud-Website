import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, CheckCircle2 } from "lucide-react";

const About = () => {
  const values = [
    "Trust & Transparency",
    "Innovation & Excellence",
    "Sustainability & Green Tech",
    "Reliability & Performance",
    "Customer-Centric Approach",
    "Security First",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              About <span className="gradient-text">Infinitive Cloud</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A global cloud, hosting, development, and AI solutions company delivering high-performance,
              scalable, secure, and future-ready digital infrastructure for businesses of all sizes.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-container mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover animate-fade-in-up">
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empower businesses worldwide with reliable, scalable cloud and digital solutions that drive growth,
                  innovation, and transformation. We're committed to making enterprise-grade technology accessible to
                  organizations of all sizes.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Build a sustainable, intelligent digital future where every business has access to cutting-edge cloud
                  infrastructure, AI capabilities, and expert support. We envision a world where technology seamlessly
                  adapts to business needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12 animate-fade-in">
              What Makes <span className="gradient-text">Us Different</span>
            </h2>
            
            <div className="space-y-6">
              <Card className="card-hover animate-fade-in-up">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-3">Complete Tech Ecosystem</h4>
                  <p className="text-muted-foreground">
                    Unlike fragmented providers, Infinitive Cloud offers cloud infrastructure, hosting, development,
                    and AI solutions under one roof. No juggling multiple vendors—everything you need, unified.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-3">Zero-Downtime Promise</h4>
                  <p className="text-muted-foreground">
                    Our Tier-IV infrastructure, redundant systems, and 24×7 monitoring ensure 99.99% uptime.
                    Your business never stops, and neither do we.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-3">Sustainable & Green</h4>
                  <p className="text-muted-foreground">
                    We're committed to eco-friendly hosting powered by renewable energy and carbon-neutral operations.
                    Grow your business while protecting the planet.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-3">Expert 24×7 Support</h4>
                  <p className="text-muted-foreground">
                    Real humans, real expertise, real time. Our support team is always available to solve challenges,
                    optimize performance, and guide your digital journey.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-12 animate-fade-in">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((value, index) => (
                <div
                  key={value}
                  className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
