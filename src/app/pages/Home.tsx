import { Hero } from '@/app/components/Hero';
import { Navigation } from '@/app/components/Navigation';
import { GlobeSection } from '@/app/components/GlobeSection';
import { Portfolio } from '@/app/components/Portfolio';
import { Team } from '@/app/components/Team';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-white font-['Inter',sans-serif] overflow-x-hidden"
      style={{
        overflowY: 'scroll',
        scrollBehavior: 'smooth'
      }}
    >
      <Navigation />
      <section className="min-h-screen">
        <Hero />
      </section>
      <section className="min-h-screen">
        <GlobeSection />
      </section>
      <section className="min-h-screen">
        <Portfolio />
      </section>
      <section>
        <Team />
      </section>
      <section>
        <Contact />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}