import HeroSection from "./HeroSection";
import TrustSection from "./TrustSection";
import HowItWorks from "./HowItWorks";
import SubjectCategories from "./SubjectCategories";
import PopularLocations from "./PopularLocations";
import FeaturedTutors from "./FeaturedTutors";
import WhyChooseUs from "./WhyChooseUs";
import BecomeATutor from "./BecomeATutor";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <TrustSection />
      <HowItWorks />
      <SubjectCategories />
      <PopularLocations />
      <FeaturedTutors />
      <WhyChooseUs />
      <BecomeATutor />
      <Testimonials />
    </main>
  );
}
