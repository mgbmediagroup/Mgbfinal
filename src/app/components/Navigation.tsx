import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/app/contexts/TranslationContext';
import mgbLogo from 'figma:asset/cc513d506bfbac231316656f549d5f817feddc6b.png';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const yOffset = -100; // Offset to account for fixed navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div 
        className="flex flex-row justify-between items-center px-8 lg:px-16 py-6"
        style={{
          background: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}
      >
        {/* Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img src={mgbLogo} alt="MGB Design" className="h-8 w-auto md:h-9 lg:h-10" />
        </button>

        {/* Navigation - Centered */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 flex-row items-center gap-8" aria-label="Main navigation">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            {t('nav.home')}
          </button>
          <button
            onClick={scrollToPortfolio}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            {t('nav.portfolio')}
          </button>
          <button
            onClick={scrollToAbout}
            className="hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            {t('nav.about')}
          </button>
        </nav>

        {/* Contact Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToContact}
            className="px-6 py-2.5 rounded-full transition-all hover:scale-105"
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#FFFFFF",
            }}
          >
            {t('nav.contact')}
          </button>
          
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hu' : 'en')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full transition-all text-white/80 hover:text-white hover:bg-white/10"
            title={language === 'en' ? 'Switch to Hungarian' : 'Switch to English'}
            style={{
              fontFamily: "Inter, sans-serif",
            }}
          >
            <Globe size={14} />
            <span className="text-xs font-medium uppercase">{language}</span>
          </button>
        </div>
      </div>
      
      {/* Bottom Fade Out Gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 100%)',
        }}
      />
    </header>
  );
}