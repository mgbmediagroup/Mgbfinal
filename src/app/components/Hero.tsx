import { motion } from 'framer-motion';
import { Button } from '@/app/components/ui/neon-button';
import { InfiniteSlider } from "@/app/components/ui/infinite-slider";
import { WebGLShader } from '@/app/components/ui/web-gl-shader';
import { useTranslation } from '@/app/contexts/TranslationContext';
import verticalGardenLogo from '../../assets/b8e0ffab0df61036f52bbc6a7dbd628607625ad1.png';
import ittEsMostLogo from '../../assets/6f0721fa96378a2186aced2f147c30e405b146ed.png';
import terracoreLogo from '../../assets/65dbf0b14781d9fe8bfa012cdfabe45b24ff694a.png';
import transaLogo from '../../assets/1f2c6cbd4ba989ebafcc93e1dbccd479c77422e3.png';
import indecisiveLogo from '../../assets/2312db1e9232307c130a38be542b58c48c042cbf.png';
import in12Logo from '../../assets/3e7706533a795ffbcf0137b960921ddceceeebbf.png';

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { t } = useTranslation();

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden h-screen max-h-[1100px]">
      {/* WebGL Shader Background - Clipped to Hero Section */}
      <div className="absolute inset-0 overflow-hidden">
        <WebGLShader />
        {/* Bottom Gradient Fade */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "400px",
            background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 20%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.9) 90%, #000000 100%)",
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-start justify-center w-full px-4 pt-32 pb-64 md:pb-72">
        <div className="relative w-full mx-auto max-w-3xl">
          <main className="relative py-10 overflow-hidden">
            <h1 className="mb-3 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
              {t('hero.title')}
            </h1>
            <p className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg">
              {t('hero.subtitle')}
            </p>
            <div className="my-8 flex items-center justify-center gap-1">
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
              </span>
              <p className="text-sm" style={{ color: '#22c55e' }}>{t('hero.available')}</p>
            </div>
            
            <div className="flex justify-center"> 
              <Button
                onClick={scrollToContact}
                className="relative px-8 py-3 rounded-full transition-all hover:scale-105 overflow-hidden group"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                <span className="relative z-10">{t('hero.bookMeeting')}</span>
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  }}
                />
              </Button>
            </div> 
          </main>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="absolute bottom-0 left-0 right-0 z-40 w-full overflow-hidden pb-8">
        {/* "Trusted by" Text */}
        <div className="text-center mb-4">
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {t('hero.trustedBy')}
          </span>
        </div>

        {/* Scrolling Brands */}
        <InfiniteSlider
          gap={80}
          duration={40}
          durationOnHover={60}
          className="w-full"
        >
          {/* Vertical Garden Logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center hover:opacity-100 transition-opacity px-4"
            style={{
              height: "120px",
            }}
          >
            <img 
              src={verticalGardenLogo} 
              alt="Vertical Garden KFT" 
              className="opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: "100px", width: "auto", objectFit: "contain" }}
            />
          </div>
          {/* ITT Es Most Logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center hover:opacity-100 transition-opacity px-4"
            style={{
              height: "120px",
            }}
          >
            <img 
              src={ittEsMostLogo} 
              alt="ITT Es Most" 
              className="opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: "100px", width: "auto", objectFit: "contain" }}
            />
          </div>
          {/* Terracore Logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center hover:opacity-100 transition-opacity px-4"
            style={{
              height: "120px",
            }}
          >
            <img 
              src={terracoreLogo} 
              alt="Terracore" 
              className="opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: "100px", width: "auto", objectFit: "contain" }}
            />
          </div>
          {/* Transa Logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center hover:opacity-100 transition-opacity px-4"
            style={{
              height: "120px",
            }}
          >
            <img 
              src={transaLogo} 
              alt="Transa" 
              className="opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: "100px", width: "auto", objectFit: "contain" }}
            />
          </div>
          {/* Indecisive Logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center hover:opacity-100 transition-opacity px-4"
            style={{
              height: "120px",
            }}
          >
            <img 
              src={indecisiveLogo} 
              alt="Indecisive" 
              className="opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: "100px", width: "auto", objectFit: "contain" }}
            />
          </div>
          {/* IN12 Logo */}
          <div
            className="flex-shrink-0 flex items-center justify-center hover:opacity-100 transition-opacity px-4"
            style={{
              height: "120px",
            }}
          >
            <img 
              src={in12Logo} 
              alt="IN12" 
              className="opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: "100px", width: "auto", objectFit: "contain" }}
            />
          </div>
        </InfiniteSlider>
      </div>
    </div>
  );
}