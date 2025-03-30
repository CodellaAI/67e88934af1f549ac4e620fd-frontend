
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BookingCTA from '@/components/home/BookingCTA'
import AboutSection from '@/components/home/AboutSection'

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <BookingCTA />
    </div>
  )
}
