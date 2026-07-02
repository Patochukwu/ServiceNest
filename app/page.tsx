import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import ServicesGrid from '@/components/home/ServicesGrid';
import BraidingGalleryPreview from '@/components/home/BraidingGalleryPreview';
import CuisinePreview from '@/components/home/CuisinePreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ServicesGrid />
        <BraidingGalleryPreview />
        <CuisinePreview />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
