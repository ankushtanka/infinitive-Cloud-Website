import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Rocket, Heart, Mail } from "lucide-react";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";

const Careers = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Careers", url: "https://infinitivecloud.com/careers" }
  ]);
  const benefits = [
    {
      icon: Rocket,
      title: "Growth Opportunities",
      description: "Continuous learning and career advancement in cutting-edge technologies",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work with passionate teams on innovative cloud and AI projects",
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and comprehensive benefits",
    },
    {
      icon: Briefcase,
      title: "Exciting Projects",
      description: "Build solutions that power businesses across industries",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Careers at Infinitive Cloud - Join Our Team | IT Jobs India</title>
        <meta name="description" content="Join Infinitive Cloud and work on cutting-edge cloud, AI, and development projects. Growth opportunities, collaborative culture, and exciting projects. Ahmedabad, India." />
        <meta name="keywords" content="IT jobs India, cloud computing careers, web development jobs, AI careers Ahmedabad, tech jobs India, software developer jobs" />
        <link rel="canonical" href="https://infinitivecloud.com/careers" />
        <meta property="og:title" content="Careers at Infinitive Cloud" />
        <meta property="og:description" content="Join our team building the future of cloud infrastructure and AI solutions." />
        <meta property="og:url" content="https://infinitivecloud.com/careers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers - Infinitive Cloud" />
        <meta name="twitter:description" content="Join our team and work on cutting-edge technology projects." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      
      <StructuredData data={breadcrumbSchema} />
      
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Join <span className="gradient-text">Team Infinitive Cloud</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of a team that's building the future of cloud infrastructure, hosting, and AI solutions.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="section-container mb-20">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Work With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 glow-effect">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Current Openings */}
        <section className="section-container mb-20">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 glow-effect">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-4">Current Openings</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our growing team. Send us your resume and we'll get in touch if there's a good fit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:careers@infinitivecloud.com">
                  <Button size="lg" className="btn-gradient text-white font-semibold px-8">
                    <Mail className="mr-2 w-5 h-5" />
                    careers@infinitivecloud.com
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Company Info */}
        <section className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">About Infinitive Cloud</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded by <span className="text-primary font-semibold">Ankush Ranka</span>, Infinitive Cloud is a leading provider of cloud infrastructure, web hosting, development services, and AI solutions. We're headquartered in <span className="text-primary font-semibold">Navrangpura, Ahmedabad, India</span>, and serve clients globally.
            </p>
            <p className="text-lg text-muted-foreground">
              Our mission is to empower businesses with reliable, scalable, and innovative digital solutions that drive growth and success.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
