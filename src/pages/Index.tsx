import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DomainSearchSection from "@/components/DomainSearchSection";
import HomePricingSection from "@/components/HomePricingSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import WhyTrustUsSection from "@/components/WhyTrustUsSection";
import FreeTrialSection from "@/components/FreeTrialSection";
import SEOContentSection from "@/components/SEOContentSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { StructuredData, organizationSchema, websiteSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/StructuredData";

const Index = () => {
  const whyUs = useScrollAnimation();
  const trial = useScrollAnimation();
  const seo = useScrollAnimation();
  const testimonials = useScrollAnimation();
  const faq = useScrollAnimation();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" }
  ]);

  const faqSchema = createFAQSchema([
    { question: "What is cloud hosting and how is it different from shared hosting?", answer: "Cloud hosting uses a network of virtual servers to host your website, offering better scalability, performance, and reliability compared to shared hosting." },
    { question: "Do you offer a free trial?", answer: "Yes! We offer a 15-day free trial on all cloud and VPS hosting plans with no credit card required." },
    { question: "What is your uptime guarantee?", answer: "We guarantee 99.99% uptime across all hosting plans, backed by a real service credit SLA." },
    { question: "Do you provide free website migration?", answer: "Yes, our expert migration team handles the entire process for free with zero downtime." },
  ]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Infinitive Cloud | Best Cloud & Web Hosting Company in India</title>
        <meta name="description" content="Premium cloud hosting, VPS, dedicated servers & domain services in India. 99.99% uptime SLA, 24×7 support & 15-day free trial. Launch your business with Infinitive Cloud." />
        <meta name="keywords" content="cloud hosting India, VPS hosting India, dedicated server India, web hosting India, best hosting provider, managed cloud hosting, affordable web hosting, shared hosting, reseller hosting, SSL certificates" />
        <link rel="canonical" href="https://infinitivecloud.com/" />
        <meta property="og:title" content="Infinitive Cloud | Best Cloud & Web Hosting Company in India" />
        <meta property="og:description" content="Premium cloud hosting, VPS, dedicated servers & domain services. 99.99% uptime SLA, 24×7 support & 15-day free trial." />
        <meta property="og:url" content="https://infinitivecloud.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infinitive Cloud | Best Cloud & Web Hosting Company in India" />
        <meta name="twitter:description" content="Premium cloud hosting, VPS, dedicated servers. 99.99% uptime, 24/7 support, 15-day free trial." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <DomainSearchSection />
        <HomePricingSection />
        <WhatWeDoSection />
        <div ref={whyUs.ref}>
          <WhyTrustUsSection />
        </div>
        <div ref={trial.ref}>
          <FreeTrialSection />
        </div>
        <div ref={testimonials.ref}>
          <TestimonialsSection />
        </div>
        <div ref={seo.ref}>
          <SEOContentSection />
        </div>
        <div ref={faq.ref}>
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
