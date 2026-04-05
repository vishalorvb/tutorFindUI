import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import TrustSection from "./TrustSection";
import HowItWorks from "./HowItWorks";
import SubjectCategories from "./SubjectCategories";
import PopularLocations from "./PopularLocations";
import FeaturedTutors from "./FeaturedTutors";
import WhyChooseUs from "./WhyChooseUs";
import BecomeATutor from "./BecomeATutor";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <HowItWorks />
      <SubjectCategories />
      <PopularLocations />
      <FeaturedTutors />
      <WhyChooseUs />
      <BecomeATutor />
      <Testimonials />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
