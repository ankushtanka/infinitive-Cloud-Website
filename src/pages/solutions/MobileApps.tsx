import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Smartphone, Apple, Play, Code2, Zap, Users,
  CheckCircle2, ArrowRight, Layers, Database
} from "lucide-react";

const MobileApps = () => {
  const services = [
    {
      icon: Smartphone,
      title: "Native App Development",
      description: "High-performance iOS and Android apps built with Swift, Kotlin, and native technologies."
    },
    {
      icon: Code2,
      title: "Cross-Platform Apps",
      description: "Cost-effective React Native and Flutter apps that work seamlessly on both platforms."
    },
    {
      icon: Layers,
      title: "Progressive Web Apps",
      description: "App-like experiences through web browsers with offline capabilities and push notifications."
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Scalable cloud backend, APIs, and database architecture for your mobile applications."
    },
    {
      icon: Users,
      title: "UI/UX Design",
      description: "Intuitive, engaging mobile interfaces designed following iOS and Android design guidelines."
    },
    {
      icon: Zap,
      title: "App Maintenance",
      description: "Ongoing support, updates, bug fixes, and feature enhancements for your mobile apps."
    }
  ];

  const platforms = [
    { name: "iOS Apps", icon: Apple, description: "Native Swift & SwiftUI development" },
    { name: "Android Apps", icon: Play, description: "Native Kotlin & Jetpack Compose" },
    { name: "React Native", icon: Code2, description: "Cross-platform JavaScript" },
    { name: "Flutter", icon: Code2, description: "Cross-platform Dart framework" }
  ];

  const benefits = [
    "Native Performance",
    "Offline Functionality",
    "Push Notifications",
    "Device Hardware Access",
    "App Store Optimization",
    "Analytics Integration",
    "Secure Payment Integration",
    "Cloud Synchronization",
    "Social Media Integration",
    "Post-Launch Support"
  ];

  return (
    <>
      <Helmet>
        <title>Mobile App Development Company India | iOS & Android App Development</title>
        <meta name="description" content="Leading mobile app development company in India. Expert iOS, Android, React Native, and Flutter developers. Custom mobile applications for startups and enterprises." />
        <meta name="keywords" content="mobile app development India, iOS app development, Android app development, React Native developers, Flutter development, cross-platform apps, mobile application company" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/mobile-apps" />
        <meta property="og:title" content="Professional Mobile App Development Services India" />
        <meta property="og:description" content="Custom iOS and Android app development with native and cross-platform solutions." />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">iOS & Android Experts</span>
              </div>
              <h1 className="mb-6">
                Expert <span className="gradient-text">Mobile App</span> Development
              </h1>
              <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                Transform Ideas into Powerful Mobile Applications
              </p>
              <p className="text-base md:text-lg text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
                From concept to launch, we create engaging mobile applications for iOS and Android platforms. 
                Whether you need a native app, cross-platform solution, or progressive web app, our experienced 
                developers deliver high-quality mobile experiences that users love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-8">
                    Start Your App Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 font-semibold">
                    Discuss Your Idea
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Platforms */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Platforms <span className="gradient-text">We Build For</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <Card key={index} className="card-hover text-center">
                    <CardContent className="pt-8 pb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 glow-effect">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
                      <p className="text-foreground/70 text-sm">{platform.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Services */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Mobile App <span className="gradient-text">Development Services</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
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
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Benefits */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Why Choose Our <span className="gradient-text">Mobile App Development</span>
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

          {/* SEO Content */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Mobile App Development: Your Business in Every Pocket
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Mobile applications have become essential for businesses looking to engage customers, 
                streamline operations, and stay competitive. With over 6 billion smartphone users worldwide, 
                a well-designed mobile app provides direct access to your audience, enhances brand loyalty, 
                and creates new revenue opportunities.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 mt-8">
                Native vs Cross-Platform Development
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Native apps offer the best performance and user experience but require separate development 
                for iOS and Android. Cross-platform frameworks like React Native and Flutter allow you to 
                build for both platforms with a single codebase, reducing development time and costs while 
                still delivering quality results. We help you choose the right approach based on your 
                specific requirements and budget.
              </p>

              <h3 className="text-2xl font-bold mb-4 mt-8">
                Our Mobile App Development Expertise
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Our team has delivered successful mobile applications for various industries including 
                e-commerce, healthcare, finance, education, and entertainment. We follow agile development 
                methodology, conduct thorough testing, ensure App Store compliance, and provide comprehensive 
                documentation. From initial concept to post-launch support, we're with you every step of the way.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="mb-4">Ready to Build Your Mobile App?</h2>
                <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Let's turn your app idea into reality. Get a free consultation and project estimate.
                </p>
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-10">
                    Get Free Quote
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

export default MobileApps;
