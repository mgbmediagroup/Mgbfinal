import founderImage from 'figma:asset/75b1edfffedd8bb289f184bd6dd593c880ae3dea.png';
import cofounderImage from 'figma:asset/ef6475b27fb1189a73a520423aa7993402e91860.png';
import cofounderImage2 from 'figma:asset/10fd501e231817f2430e91aa389b966a3675b01d.png';
import { useTranslation } from '@/app/contexts/TranslationContext';

export function Team() {
  const { t } = useTranslation();
  
  const members = [
    {
      name: 'Mile Máté',
      role: t('team.coFounderSales'),
      avatar: founderImage,
    },
    {
      name: 'Luke Gocentas',
      role: t('team.coFounderDeveloper'),
      avatar: cofounderImage,
    },
    {
      name: 'Dominik Blair',
      role: t('team.coFounderDeveloper'),
      avatar: cofounderImage2,
    },
  ];

  return (
    <section className="bg-black py-12 md:py-16 relative overflow-hidden">
      {/* Blue-Green Glow Effect - Left Side */}
      <div 
        className="absolute left-0 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(100, 150, 255, 0.4) 0%, rgba(50, 200, 255, 0.2) 50%, transparent 100%)',
          transform: 'translate(-50%, 0)',
        }}
      />
      
      <div className="mx-auto max-w-5xl border-t border-white/10 px-6 relative z-10">
        <span className="-ml-6 -mt-3.5 block w-max bg-black px-6 text-gray-400">
          {t('team.label')}
        </span>
        <div className="mt-12 gap-4 md:mt-24">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-white" style={{ 
              fontFamily: "Avenir Next, sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.02em"
            }}>
              {t('team.coFounders')}
            </h2>
          </div>
        </div>
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="group overflow-hidden">
                <img
                  className="h-96 w-full rounded-md object-cover object-top transition-all duration-500 
                    md:grayscale md:hover:grayscale-0 md:group-hover:h-[22.5rem] md:group-hover:rounded-xl"
                  src={member.avatar}
                  alt={member.name}
                  width="826"
                  height="1239"
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium text-white transition-all duration-500 md:group-hover:tracking-wider">
                      {member.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      _0{index + 1}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm text-gray-400 transition duration-300
                      md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}