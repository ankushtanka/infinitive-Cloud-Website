import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";

const team = [
  { name: "Rahul Mehta", role: "Founder & Chief Architect", bio: "15 years in cloud infrastructure" },
  { name: "Anjali Nair", role: "Head of Client Success", bio: "Ex-AWS, customer obsessed" },
  { name: "Vikram Singh", role: "Senior Support Engineer", bio: "10 min average response time" },
];

const About = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "About", url: "https://infinitivecloud.com/about" }
  ]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Infinitive Cloud — Infrastructure Built by Engineers</title>
        <meta name="description" content="Founded by engineers tired of 'unlimited' hosting that meant limited support. Learn about our team, our values, and why we build differently." />
        <link rel="canonical" href="https://infinitivecloud.com/about" />
        <meta property="og:title" content="About Infinitive Cloud — Infrastructure Built by Engineers" />
        <meta property="og:description" content="Founded by engineers who believe infrastructure should be invisible, but the people behind it shouldn't be." />
        <meta property="og:url" content="https://infinitivecloud.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <StructuredData data={breadcrumbSchema} />
      
      <Navigation />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 md:py-32" style={{ background: "var(--gradient-hero)" }}>
          <div className="section-container">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl text-primary-foreground mb-8">
                We're <span className="text-accent italic">Infinitive Cloud.</span>
              </h1>
              <div className="space-y-5 text-sm md:text-base text-primary-foreground/60 leading-relaxed">
                <p>
                  Founded by engineers who were tired of "unlimited" hosting that meant limited support. We believe infrastructure should be invisible, but the people behind it shouldn't be.
                </p>
                <p>
                  Every server we deploy runs on genuine licenses — cPanel, LiteSpeed, CloudLinux, and enterprise‑grade hardware. We don't cut corners because your business can't afford us to.
                </p>
                <p>
                  Our team is small by design. When you reach out, you'll speak to a senior engineer who knows your environment — not a scripted agent.
                </p>
                <p className="text-accent font-medium">
                  Based in India. Serving the world.
                </p>
                <p>
                  We're proud to power founders, e‑commerce brands, and agencies who demand more than a hosting account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-32 bg-background">
          <div className="section-container">
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-16">
              The <span className="gradient-text">Team</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              {team.map((person) => (
                <div key={person.name} className="group">
                  <div className="w-full aspect-square rounded-lg bg-muted mb-5 flex items-center justify-center">
                    <span className="text-4xl font-bold text-accent/30" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{person.name}</h3>
                  <p className="text-sm text-accent font-medium mb-1">{person.role}</p>
                  <p className="text-xs text-muted-foreground">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-32 bg-muted/20">
          <div className="section-container">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-12">
                What We <span className="gradient-text">Stand For</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Genuine Infrastructure", desc: "All genuine licenses. No pirated software. No compromises on the hardware your business runs on." },
                  { title: "Transparent Pricing", desc: "No hidden fees, no surprise renewals, no aggressive upselling. What you see is what you pay." },
                  { title: "Real Human Support", desc: "Average first response: 4 minutes 23 seconds. Escalation to senior engineer within 15 minutes." },
                  { title: "Zero-Downtime Promise", desc: "Tier-IV infrastructure, redundant systems, and 24×7 monitoring ensure 99.99% uptime." },
                ].map((value) => (
                  <div key={value.title} className="border-l-2 border-accent/30 pl-6">
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
