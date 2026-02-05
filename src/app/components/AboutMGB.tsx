import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { BackgroundGlow } from '@/app/components/ui/background-glow';
import { Hero } from '@/app/components/ui/void-hero';

export function AboutMGB() {
  const navigationLinks = [
    { name: 'HOME', href: '#' },
    { name: 'WORK', href: '#portfolio' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <section id="about" className="relative bg-black overflow-hidden">
      <Hero 
        title="Sculpted Light and Shadow"
        description="A dynamic form drifts through luminous voids — edges curve, surfaces gleam, and subtle glow pulses like a heartbeat. Motion and material merge, revealing the art hidden within geometry."
        links={navigationLinks}
      />
    </section>
  );
}