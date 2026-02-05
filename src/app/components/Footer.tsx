import { ArrowUp, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '@/app/contexts/TranslationContext';
import { Link, useNavigate, useLocation } from 'react-router';

export function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer ref={footerRef} className="bg-black text-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Top Section - Headline */}
        <div className="mb-12">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl mb-8"
            style={{ 
              fontFamily: 'Avenir Next, sans-serif', 
              fontWeight: 600,
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            <span className="text-white">{t('footer.headline')}</span>{' '}
            <span className="text-gray-500">{t('footer.headlineGray')}</span>
          </h2>
        </div>

        {/* Email and Navigation Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-16 border-b border-white/10">
          {/* Email with Icon */}
          <a
            href="mailto:mgbmediagroup@gmail.com"
            className="flex items-center gap-3 text-xl md:text-2xl hover:text-gray-300 transition-colors group"
            style={{ 
              fontFamily: 'Avenir Next, sans-serif',
              fontWeight: 500
            }}
          >
            <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            mgbmediagroup@gmail.com
          </a>

          {/* Navigation Links */}
          <div className="flex gap-8">
            <button
              onClick={scrollToAbout}
              className="text-white hover:text-gray-300 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
            >
              {t('footer.aboutUs')}
            </button>
            <button
              onClick={scrollToContact}
              className="text-white hover:text-gray-300 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
            >
              {t('footer.contactUs')}
            </button>
          </div>
        </div>

        {/* Large MGB Letters - Animated */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {['M', 'G', 'B'].map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="font-bold leading-none"
                style={{ 
                  fontFamily: 'Avenir Next, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(8rem, 20vw, 24rem)',
                  letterSpacing: '0.1em'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom Section - Copyright and Scroll to Top */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* MGB Logo at bottom left */}
          <div className="flex items-center gap-4">
            {['M', 'G', 'B'].map((letter, index) => (
              <motion.span
                key={`bottom-${letter}`}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + (index * 0.1),
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="font-bold leading-none text-white"
                style={{ 
                  fontFamily: 'Avenir Next, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '0.05em'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-all group ml-auto"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.1em' }}
          >
            <span>{t('footer.scrollTop')}</span>
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}