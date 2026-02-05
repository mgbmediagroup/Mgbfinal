import RotatingEarth from "@/app/components/ui/wireframe-dotted-globe";
import { useState } from "react";
import { useTranslation } from "@/app/contexts/TranslationContext";

export function GlobeSection() {
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);
  const { t } = useTranslation();

  return (
    <section id="about" className="relative w-full py-4 md:py-32 bg-black min-h-screen md:min-h-0 flex items-start md:items-center pt-4 md:pt-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-16 items-center">
          {/* Left Column - About Us Text */}
          <div className="space-y-1.5 md:space-y-6">
            <h2 
              className="text-3xl md:text-5xl lg:text-6xl mb-1 md:mb-6 relative inline-block" 
              style={{ 
                fontFamily: "Avenir Next, sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: "1.1"
              }}
            >
              <span 
                className="relative"
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(100, 255, 200, 1) 50%, rgba(50, 200, 255, 1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 25px rgba(16, 185, 129, 0.6)) drop-shadow(0 0 50px rgba(100, 255, 200, 0.3))",
                }}
              >
                {t('globe.aboutUs')}
              </span>
              {/* Animated pulse underline */}
              <div 
                className="absolute -bottom-1 md:-bottom-2 left-0 h-[2px] md:h-[3px]"
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.8) 0%, rgba(100, 255, 200, 1) 50%, rgba(50, 200, 255, 0.8) 100%)',
                  animation: 'shimmer 3s ease-in-out infinite',
                  backgroundSize: '200% 100%',
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.8), 0 0 30px rgba(100, 255, 200, 0.5)',
                }}
              />
            </h2>
            
            <div className="space-y-2 md:space-y-8">
              {/* First paragraph */}
              <p 
                className="text-sm md:text-lg lg:text-xl leading-relaxed"
                style={{ 
                  fontFamily: "Avenir Next, sans-serif",
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.95)",
                  lineHeight: "1.7"
                }}
              >
                {t('globe.intro1')}
              </p>
              
              {/* Service Sign */}
              <div className="pt-1 md:pt-2">
                <h3 
                  className="text-xl md:text-3xl lg:text-4xl mb-2 md:mb-6"
                  style={{ 
                    fontFamily: "Avenir Next, sans-serif",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    letterSpacing: "-0.01em"
                  }}
                >
                  {t('globe.service')}
                </h3>
                <div className="flex flex-wrap gap-4">
                  <div className="relative">
                    <button
                      onMouseEnter={() => setHoveredOrb('service')}
                      onMouseLeave={() => setHoveredOrb(null)}
                      className="relative px-4 py-2 md:px-8 md:py-4 transition-all duration-300"
                      style={{
                        fontFamily: "Avenir Next, sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        background: hoveredOrb === 'service' 
                          ? "rgba(16, 185, 129, 0.25)" 
                          : "rgba(16, 185, 129, 0.2)",
                        border: "2px solid",
                        borderColor: hoveredOrb === 'service' 
                          ? "rgba(16, 185, 129, 1)" 
                          : "rgba(16, 185, 129, 0.6)",
                        borderRadius: "0",
                        cursor: "pointer",
                        letterSpacing: "0.02em",
                        boxShadow: hoveredOrb === 'service' 
                          ? "0 0 40px rgba(16, 185, 129, 0.8), 0 0 80px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(16, 185, 129, 0.2)" 
                          : "0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)",
                        textShadow: "0 0 20px rgba(16, 185, 129, 0.8)",
                        transform: hoveredOrb === 'service' ? "scale(1.05)" : "scale(1)"
                      }}
                    >
                      <span className="relative z-10">{t('globe.serviceTitle')}</span>
                    </button>
                    
                    {/* Tooltip */}
                    {hoveredOrb === 'service' && (
                      <div 
                        className="absolute left-0 mt-2 p-4 z-50"
                        style={{
                          background: "rgba(0, 0, 0, 0.95)",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                          maxWidth: "300px",
                          minWidth: "250px",
                          animation: "fadeIn 0.2s ease-out"
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Avenir Next, sans-serif",
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "rgba(255, 255, 255, 0.85)",
                            lineHeight: "1.6"
                          }}
                        >
                          {t('globe.serviceDescription')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Second paragraph */}
              <p 
                className="text-sm md:text-lg lg:text-xl leading-relaxed"
                style={{ 
                  fontFamily: "Avenir Next, sans-serif",
                  fontWeight: 400,
                  color: "rgba(255, 255, 255, 0.95)",
                  lineHeight: "1.7"
                }}
              >
                {t('globe.intro2')}
              </p>
            </div>
          </div>

          {/* Right Column - Globe */}
          <div className="flex items-start justify-center lg:justify-end relative h-[300px] md:h-auto">
            {/* Mobile Only: Budapest, Hungary Text */}
            <div className="block lg:hidden absolute top-0 left-1/2 -translate-x-1/2 translate-y-2 text-center z-20">
              <p 
                className="text-sm"
                style={{
                  fontFamily: "Avenir Next, sans-serif",
                  fontWeight: 500,
                  color: "rgba(16, 185, 129, 0.9)",
                  letterSpacing: "0.05em",
                  textShadow: "0 0 15px rgba(16, 185, 129, 0.6)",
                }}
              >
                Budapest, Hungary
              </p>
            </div>
            
            {/* Multi-color Green/Blue glow behind the globe */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '1000px',
                height: '1000px',
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(100, 255, 200, 0.35) 15%, rgba(0, 255, 150, 0.3) 30%, rgba(0, 200, 255, 0.25) 50%, rgba(0, 100, 255, 0.2) 70%, transparent 85%)',
                filter: 'blur(100px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
            
            {/* Additional Green/Blue chromatic layers for depth */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '700px',
                height: '700px',
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, rgba(50, 255, 150, 0.3) 20%, rgba(50, 200, 255, 0.25) 45%, rgba(50, 100, 255, 0.2) 70%, transparent 90%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 0,
                animation: 'pulse 4s ease-in-out infinite'
              }}
            />
            
            {/* Globe */}
            <div className="relative z-10">
              {/* Desktop: 600x840, Mobile: smaller */}
              <div className="hidden lg:block">
                <RotatingEarth width={600} height={840} />
              </div>
              <div className="block lg:hidden">
                <RotatingEarth width={280} height={400} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}