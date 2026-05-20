import { lazy } from "react";

import Navbar from "@/components/LandingPage/Navbar";
const HeroSection = lazy(() => import("@/components/LandingPage/HeroSection"));
const BrandsSection = lazy(
  () => import("@/components/LandingPage/BrandSection"),
);
const FeaturesSection = lazy(
  () => import("@/components/LandingPage/FeatureSection"),
);
const TrendingSection = lazy(
  () => import("@/components/LandingPage/TrandingSection"),
);
const HowItWorksSection = lazy(
  () => import("@/components/LandingPage/HowItWorksSection"),
);
const CTASection = lazy(() => import("@/components/LandingPage/CTASection"));

const Footer = lazy(() => import("@/components/LandingPage/Footer"));

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
