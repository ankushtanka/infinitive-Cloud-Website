import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AnimatedDivider from "@/components/AnimatedDivider";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import WhyTrustUsSection from "@/components/WhyTrustUsSection";
import CaseStudySection from "@/components/CaseStudySection";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Index = () => {
  const animatedDivider = useScrollAnimation({ threshold: 0.2 });
  const whatWeDo = useScrollAnimation({ threshold: 0.2 });
  const whyTrust = useScrollAnimation({ threshold: 0.2 });
  const caseStudy = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <div 
          ref={animatedDivider.ref}
          className={`transition-all duration-1000 ${
            animatedDivider.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <AnimatedDivider />
        </div>
        <div 
          ref={whatWeDo.ref}
          className={`transition-all duration-1000 ${
            whatWeDo.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <WhatWeDoSection />
        </div>
        <div 
          ref={whyTrust.ref}
          className={`transition-all duration-1000 ${
            whyTrust.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <WhyTrustUsSection />
        </div>
        <div 
          ref={caseStudy.ref}
          className={`transition-all duration-1000 ${
            caseStudy.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <CaseStudySection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
