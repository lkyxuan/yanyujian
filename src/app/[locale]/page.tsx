import HeroSection from '@/components/HeroSection'
import CheckinSection from '@/components/CheckinSection'
import StorySection from '@/components/StorySection'
import GuideSection from '@/components/GuideSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CheckinSection />
      <StorySection />
      <GuideSection />
      <Footer />
    </main>
  )
}
