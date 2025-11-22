import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { StructuredData, createServiceSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Code, Globe, Smartphone, Database, Palette, ShoppingCart,
  CheckCircle2, ArrowRight, Layers, Zap
} from "lucide-react";

const WebDevelopment = () => {
  const serviceSchema = createServiceSchema(
    "Professional Web Development Services India",
    "Custom website development, e-commerce solutions, progressive web apps, and SaaS platforms. Expert React, Node.js, PHP, and WordPress developers in India.",
    "https://infinitivecloud.com/solutions/web-development",
    "Web Development Services",
    "₹10,000 - ₹5,00,000"
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Solutions", url: "https://infinitivecloud.com/solutions" },
    { name: "Web Development", url: "https://infinitivecloud.com/solutions/web-development" }
  ]);

  const faqSchema = createFAQSchema([
    {
      question: "How much does website development cost in India?",
      answer: "Website development costs vary based on complexity. Simple business websites start from ₹10,000, e-commerce sites from ₹50,000, and complex web applications from ₹1,00,000+. We provide custom quotes after understanding your requirements."
    },
    {
      question: "What technologies do you use for web development?",
      answer: "We use modern technologies including React.js, Next.js, Vue.js, Angular, Node.js, Python, PHP, Laravel, WordPress, and various databases like MongoDB and PostgreSQL. We select the best stack for your specific needs."
    },
    {
      question: "How long does it take to develop a website?",
      answer: "Development time depends on project scope. Simple websites take 2-4 weeks, e-commerce sites 6-8 weeks, and complex web applications 3-6 months. We provide detailed timelines during project planning."
    },
    {
      question: "Do you provide website maintenance after launch?",
      answer: "Yes, we offer ongoing website maintenance and support services including updates, bug fixes, security patches, performance optimization, and feature enhancements to keep your website running smoothly."
    }
  ]);

  const services = [
    {
      icon: Globe,
      title: "Custom Website Development",
      description: "Bespoke websites built with modern frameworks like React, Next.js, and Vue.js for optimal performance."
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      description: "Full-featured online stores with payment integration, inventory management, and secure checkout."
    },
    {
      icon: Layers,
      title: "Progressive Web Apps",
      description: "Fast, reliable web applications that work offline and provide native app-like experience."
    },
    {
      icon: Database,
      title: "Web Applications",
      description: "Scalable SaaS platforms, portals, and enterprise applications with robust backend systems."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "User-centered design focusing on intuitive interfaces, brand identity, and conversion optimization."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization, SEO enhancement, and technical improvements for better user experience."
    }
  ];

  const technologies = [
    "React.js", "Next.js", "Vue.js", "Angular", "Node.js", "Python", 
    "PHP", "Laravel", "WordPress", "Shopify", "MongoDB", "PostgreSQL"
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "Understanding your business goals, target audience, and project requirements."
    },
    {
      step: "02",
      title: "Design & Prototyping",
      description: "Creating wireframes, mockups, and interactive prototypes for your approval."
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Building your website with clean code, rigorous testing, and quality assurance."
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Deploying your website and providing ongoing maintenance and technical support."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Top Web Development Company India | Custom Website Design & Development</title>
        <meta name="description" content="⭐ Leading Web Development Company in India | Custom Websites | E-Commerce | React, Node.js, PHP | 2000+ Websites Built | SEO-Friendly | Mobile Responsive | From ₹10,000. Free Consultation!" />
        <meta name="keywords" content="web development company India, website development India, custom web development, e-commerce development India, React development company, Node.js developers India, PHP web development, WordPress development, website design company India, best web development company, affordable web development" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/web-development" />
        <meta property="og:title" content="Best Web Development Company India | Custom Websites & E-Commerce" />
        <meta property="og:description" content="Professional web development services. 2000+ websites built. React, Node.js, PHP experts. Free consultation!" />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/web-development" />
        <meta property="og:type" content="service" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Development Company India - Custom Websites & E-Commerce" />
        <meta name="twitter:description" content="Expert web development services. 2000+ websites delivered. React, Node.js, PHP, WordPress." />
      </Helmet>
      
      <StructuredData data={serviceSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Code className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Expert Development Team</span>
              </div>
              <h1 className="mb-6">
                Professional <span className="gradient-text">Web Development</span> Services
              </h1>
              <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                Transform Your Vision into Powerful Digital Experiences
              </p>
              <p className="text-base md:text-lg text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
                From stunning corporate websites to complex web applications, our expert developers create 
                custom solutions that drive business growth. We combine cutting-edge technology with 
                user-centric design to deliver websites that engage, convert, and scale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-8">
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 font-semibold">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Our <span className="gradient-text">Development Services</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Comprehensive web development solutions tailored to your business needs.
              </p>
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

          {/* Technologies */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Technologies <span className="gradient-text">We Work With</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="px-6 py-3 rounded-full bg-muted border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-default"
                >
                  <span className="font-semibold text-foreground">{tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Our Development <span className="gradient-text">Process</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="text-5xl font-black gradient-text mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Professional Web Development?
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                In today's digital landscape, your website is often the first interaction potential customers 
                have with your business. Professional web development ensures your website not only looks great 
                but performs exceptionally, loads fast, ranks well in search engines, and provides an outstanding 
                user experience across all devices.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 mt-8">
                Custom Development vs Website Builders
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                While website builders offer quick solutions, custom web development provides unlimited 
                flexibility, superior performance, better security, and scalability for growing businesses. 
                Our developers create tailor-made solutions that perfectly align with your unique business 
                requirements and brand identity.
              </p>

              <h3 className="text-2xl font-bold mb-4 mt-8">
                Why Infinitive Cloud for Web Development?
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Our team of experienced developers combines technical expertise with creative problem-solving. 
                We follow industry best practices, write clean maintainable code, and deliver projects on time 
                and within budget. With post-launch support and maintenance, we ensure your website continues 
                to perform optimally as your business grows.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="mb-4">Ready to Build Your Website?</h2>
                <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Let's discuss your project and create a website that drives real business results.
                </p>
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-10">
                    Get Free Consultation
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

export default WebDevelopment;
