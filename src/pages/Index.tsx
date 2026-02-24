import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import WhyTrustUsSection from "@/components/WhyTrustUsSection";
import CaseStudySection from "@/components/CaseStudySection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { StructuredData, organizationSchema, websiteSchema, createBreadcrumbSchema } from "@/components/StructuredData";
import HomePricingSection from "@/components/HomePricingSection";

const Index = () => {
  const whatWeDo = useScrollAnimation();
  const whyTrust = useScrollAnimation();
  const pricing = useScrollAnimation();
  const caseStudy = useScrollAnimation();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" }
  ]);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Infinitive Cloud - Best Cloud Hosting, Web Development & AI Solutions India | 99.99% Uptime</title>
        <meta name="description" content="Leading IT solutions company in India offering enterprise cloud hosting, VPS, dedicated servers, web development, mobile apps, and AI solutions. 99.99% uptime SLA, 24×7 expert support, starting ₹499/month. Trusted by 1000+ businesses." />
        <meta name="keywords" content="cloud hosting India, VPS hosting, dedicated servers, web development company India, mobile app development, AI solutions, IT infrastructure, managed hosting, enterprise cloud, best hosting provider India" />
        <link rel="canonical" href="https://infinitivecloud.com/" />
        <meta property="og:title" content="Infinitive Cloud - Best Cloud Hosting & IT Solutions India" />
        <meta property="og:description" content="Enterprise cloud hosting, web development, AI solutions with 99.99% uptime. Trusted by 1000+ businesses." />
        <meta property="og:url" content="https://infinitivecloud.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infinitive Cloud - Best IT Solutions Company India" />
        <meta name="twitter:description" content="Enterprise cloud hosting, VPS, web development & AI solutions. 99.99% uptime, 24/7 support." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={breadcrumbSchema} />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <div ref={pricing.ref}>
          <HomePricingSection />
        </div>
        <div ref={whatWeDo.ref}>
          <WhatWeDoSection />
        </div>
        <div ref={whyTrust.ref}>
          <WhyTrustUsSection />
        </div>
        <div ref={caseStudy.ref}>
          <CaseStudySection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
