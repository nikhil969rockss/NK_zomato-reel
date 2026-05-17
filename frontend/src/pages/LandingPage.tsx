import Navbar from "@/components/LandingPage/Navbar";
import HeroSection from "@/components/LandingPage/HeroSection";
import BrandsSection from "@/components/LandingPage/BrandSection";
import FeaturesSection from "@/components/LandingPage/FeatureSection";
import TrendingSection from "@/components/LandingPage/TrandingSection";
import HowItWorksSection from "@/components/LandingPage/HowItWorksSection";
import CTASection from "@/components/LandingPage/CTASection";
import Footer from "@/components/LandingPage/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BrandsSection />
      <FeaturesSection />
      <TrendingSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
