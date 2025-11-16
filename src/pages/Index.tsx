import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import DivisionsSection from "@/components/DivisionsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <DivisionsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
