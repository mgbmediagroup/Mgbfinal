import { LogoCloud } from "@/app/components/ui/logo-cloud";
import verticalGardenLogo from '../../assets/b8e0ffab0df61036f52bbc6a7dbd628607625ad1.png';
import in12Logo from '../../assets/3e7706533a795ffbcf0137b960921ddceceeebbf.png';
import nvidiaLogo from '../../assets/nvidia-wordmark-light.svg';
import supabaseLogo from '../../assets/supabase-wordmark-light.svg';
import openaiLogo from '../../assets/openai-wordmark-light.svg';

const clientLogos = [
  {
    src: verticalGardenLogo,
    alt: "Vertical Garden KFT",
  },
  {
    src: in12Logo,
    alt: "IN12 Residences",
  },
  {
    src: nvidiaLogo,
    alt: "Client 1",
  },
  {
    src: supabaseLogo,
    alt: "Client 2",
  },
  {
    src: openaiLogo,
    alt: "Client 3",
  },
];

export function TrustedBySection() {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trusted By Header */}
        <div className="text-center mb-8">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Trusted by
          </h3>
        </div>

        {/* Logo Cloud */}
        <LogoCloud logos={clientLogos} />
      </div>
    </section>
  );
}