import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AnimatedDivider from "@/components/AnimatedDivider";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import WhyTrustUsSection from "@/components/WhyTrustUsSection";
import CaseStudySection from "@/components/CaseStudySection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AnimatedDivider />
        <WhatWeDoSection />
        <WhyTrustUsSection />
        <CaseStudySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
