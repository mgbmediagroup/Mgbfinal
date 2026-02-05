import { LogoCloud } from "@/app/components/ui/logo-cloud";
import verticalGardenLogo from 'figma:asset/b8e0ffab0df61036f52bbc6a7dbd628607625ad1.png';
import in12Logo from 'figma:asset/3e7706533a795ffbcf0137b960921ddceceeebbf.png';

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
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Client 1",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Client 2",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
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