import { motion } from 'framer-motion';
import { useTranslation } from '@/app/contexts/TranslationContext';
import verticalFutureImage from '../../assets/36157d2c89a12ef778fad46849a5b9ac61af4df7.png';
import ittEsMostImage from '../../assets/c9db3ba311e2575f64e2b1a927622c82fe26ed99.png';
import terracoreImage from '../../assets/db20bc152c084762c5de57dcd523f3f2b21499a5.png';
import audiImage from '../../assets/d9f991ef2e6f6b13e1fd9bbc19376b8763322833.png';
import transaImage from '../../assets/b327579a418187cb2e752d8779bdcae0adff4c29.png';
import indecisiveCreationsImage from '../../assets/97416f094fc30e265119e93d91a7c007e46b73c9.png';
import in12Image from '../../assets/bbeef0dd88be6e41dd29b2c7cae75eac2f0e2f3e.png';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 7,
    title: 'IN12 Residences',
    description: 'Luxury waterfront living with panoramic views. Contemporary architecture meets refined elegance in this exclusive residential development featuring 12 premium residences.',
    category: ['UI/UX', 'DEVELOPMENT', 'BRANDING'],
    image: in12Image,
    link: 'https://in12demo.figma.site',
  },
  {
    id: 3,
    title: 'Terracore',
    description: 'Powering the inner frontier with sustainable energy from the Earth\'s core. Innovative geothermal solutions for a cleaner tomorrow.',
    category: ['UI/UX', 'DEVELOPMENT', 'BRANDING'],
    image: terracoreImage,
    link: 'https://terracore.figma.site/',
  },
  {
    id: 4,
    title: 'Audi Hungary',
    description: 'Experience electric performance that moves you forward. A premium automotive website showcasing the future of driving with cutting-edge design.',
    category: ['UI/UX', 'DEVELOPMENT'],
    image: audiImage,
    link: 'https://audidemo.figma.site/',
  },
  {
    id: 1,
    title: 'Vertical Future Garden',
    description: 'Year-round local produce, sustainably grown in Hungary. Premium vegetables using Dutch precision agriculture and geothermal energy.',
    category: ['UI/UX', 'DEVELOPMENT'],
    image: verticalFutureImage,
    link: 'https://verticalgarden2.netlify.app/',
  },
  {
    id: 2,
    title: 'Itt és Most Egyesület',
    description: 'Creating opportunities and driving innovation for a better tomorrow. A non-profit organization focused on sustainable development and community engagement.',
    category: ['UI/UX', 'DEVELOPMENT', 'BRANDING'],
    image: ittEsMostImage,
    link: 'https://ittesmost.figma.site',
  },
  {
    id: 5,
    title: 'Transa',
    description: 'International freight forwarding across Hungary and the European Union. Road freight and logistics solutions with 15+ years of reliable service.',
    category: ['UI/UX', 'DEVELOPMENT'],
    image: transaImage,
    link: 'https://transa.figma.site/',
  },
  {
    id: 6,
    title: 'Indecisive Creations',
    description: 'Niche clothing brand redefining streetwear with bold designs and premium quality. Curated collections that blend contemporary aesthetics with authentic craftsmanship.',
    category: ['UI/UX', 'DEVELOPMENT', 'BRANDING'],
    image: indecisiveCreationsImage,
    link: 'https://indecisivecreations.figma.site/',
  },
];

export function Portfolio() {
  const { t } = useTranslation();
  
  // Helper function to translate category names
  const translateCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'UI/UX': t('portfolio.uiux'),
      'DEVELOPMENT': t('portfolio.development'),
      'BRANDING': t('portfolio.branding'),
    };
    return categoryMap[category] || category;
  };
  
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background glow effects - similar to globe section */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(100, 255, 200, 0.35) 15%, rgba(0, 255, 150, 0.3) 30%, rgba(0, 200, 255, 0.25) 50%, rgba(0, 100, 255, 0.2) 70%, transparent 85%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      <div
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, rgba(50, 255, 150, 0.3) 20%, rgba(50, 200, 255, 0.25) 45%, rgba(50, 100, 255, 0.2) 70%, transparent 90%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'pulse 4s ease-in-out infinite'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl text-white relative inline-block" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            <span className="relative">
              {t('portfolio.heading').split(',')[0]},{' '}
              <span 
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, rgba(100, 150, 255, 1) 0%, rgba(50, 200, 255, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(100, 150, 255, 0.5), 0 0 60px rgba(50, 200, 255, 0.3)',
                }}
              >
                {t('portfolio.heading').split(',')[1].trim()}
              </span>
            </span>
            {/* Animated underline */}
            <div 
              className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{
                width: '100%',
                animation: 'shimmer 3s ease-in-out infinite',
                background: 'linear-gradient(90deg, transparent 0%, rgba(100, 150, 255, 0.8) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
              }}
            />
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a 
              key={project.id} 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer space-y-4 relative"
            >
              {/* Project image - no border, uncropped */}
              <div className="relative overflow-hidden bg-black aspect-[16/10]">
                {/* Wave glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(100, 150, 255, 0.3) 0%, rgba(34, 197, 94, 0.2) 40%, transparent 70%)',
                    filter: 'blur(40px)',
                    animation: 'waveGlow 2s ease-in-out infinite',
                  }}
                />
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 relative z-10 ${
                      project.id === 7 || project.id === 6
                        ? 'object-contain' 
                        : project.id === 2
                        ? 'object-cover object-top'
                        : 'object-cover'
                    }`}
                  />
                )}
              </div>

              {/* Project info */}
              <div className="space-y-2">
                {/* Category tags */}
                <p 
                  className="text-xs text-gray-500 uppercase tracking-wider"
                  style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.1em' }}
                >
                  {project.category.map(translateCategory).join(' / ')}
                </p>
                
                {/* Title with arrow */}
                <h3 
                  className="text-2xl text-white flex items-center gap-2 group-hover:gap-3 transition-all"
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 400,
                  }}
                >
                  <span 
                    className="transition-all duration-300"
                    style={{
                      textShadow: '0 0 0px rgba(100, 150, 255, 0)',
                      transition: 'text-shadow 0.3s ease, color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textShadow = '0 0 20px rgba(100, 150, 255, 0.6), 0 0 40px rgba(34, 197, 94, 0.4)';
                      e.currentTarget.style.color = 'rgba(100, 150, 255, 0.95)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textShadow = '0 0 0px rgba(100, 150, 255, 0)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    {project.title}
                  </span>
                  <ArrowUpRight 
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300" 
                    style={{
                      width: '28px',
                      height: '28px',
                      color: 'rgba(100, 150, 255, 0.95)',
                      filter: 'drop-shadow(0 0 8px rgba(100, 150, 255, 0.6)) drop-shadow(0 0 12px rgba(34, 197, 94, 0.4))',
                      transform: 'translate(0, 0)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(3px, -3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                    }}
                  />
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}