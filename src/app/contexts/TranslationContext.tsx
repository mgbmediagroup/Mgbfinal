import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hu';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.letsTalk': 'Let\'s talk',
    
    // Hero Section
    'hero.title': 'Design Is Everything',
    'hero.subtitle': 'Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.',
    'hero.available': 'Available for New Projects',
    'hero.bookMeeting': 'Book a Meeting',
    'hero.trustedBy': 'Trusted by',
    
    // Globe Section / About
    'globe.aboutUs': 'About Us',
    'globe.intro1': 'We build modern, high-converting websites for businesses that either don\'t have a site yet or are stuck with an outdated one—using AI to deliver faster builds, better design, and a lower price than traditional agencies.',
    'globe.intro2': 'We do this because too many great companies (especially here in Hungary) are invisible online or losing customers to competitors with cleaner, more trustworthy web presence; our job is to turn that gap into sales, credibility, and momentum for you.',
    'globe.service': 'Service',
    'globe.serviceTitle': 'Web Design',
    'globe.serviceDescription': 'We create websites that don\'t just look good—they work. Fast-loading, easy to use, and built to turn visitors into customers. Clean design, smart structure, real results.',
    'globe.getStarted': 'Get Started',
    'globe.title': 'About Us',
    'globe.beaconTitle': 'Creating Your Dreams',
    'globe.beaconLocation': 'from Budapest, Hungary',
    
    // Portfolio Section
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'A showcase of our finest work',
    'portfolio.heading': 'Our Craft, Your Expression.',
    'portfolio.viewProject': 'View Project',
    'portfolio.uiux': 'UI/UX',
    'portfolio.development': 'DEVELOPMENT',
    'portfolio.branding': 'BRANDING',
    
    // About Section
    'about.title': 'About MGB Design',
    'about.description': 'We are a creative agency specializing in web design and UI/UX, crafting digital experiences that captivate and convert.',
    
    // Team Section
    'team.title': 'Meet the Team',
    'team.subtitle': 'The talented individuals behind MGB Design',
    'team.coFounders': 'The Founders',
    'team.label': 'Team',
    'team.coFounderSales': 'Co-Founder / Sales',
    'team.coFounderDeveloper': 'Co-Founder / Developer',
    
    // Footer
    'footer.headline': 'Is there a fascinating project',
    'footer.headlineGray': 'brewing in your mind?',
    'footer.aboutUs': 'About Us',
    'footer.contactUs': 'Contact Us',
    'footer.scrollTop': 'SCROLL TOP',
    'footer.newsletter': 'Subscribe to our newsletter',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.subscribe': 'Subscribe',
    
    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Let\'s discuss your project',
    'contact.name': 'Full Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.phone': 'Phone Number',
    'contact.company': 'Company Name',
    'contact.interested': 'What are you interested in?',
    'contact.webDesign': 'Web Design',
    'contact.uiux': 'UI/UX Design',
    'contact.branding': 'Branding',
    'contact.development': 'Development',
    'contact.consulting': 'Consulting',
    'contact.other': 'Other',
    'contact.tellMore': 'Tell us more about your project!',
    'contact.send': 'Send Message',
    'contact.info': 'Contact Information',
    'contact.getInTouch': 'Get In Touch',
    'contact.description': 'Ready to transform your digital presence? Let\'s create something extraordinary together.',
    'contact.heading': 'Turn Your Vision Into an Experience That Lasts',
    'contact.letsTalk': 'Let\'s talk',
  },
  hu: {
    // Navigation
    'nav.home': 'Főoldal',
    'nav.portfolio': 'Portfólió',
    'nav.about': 'Rólunk',
    'nav.contact': 'Kapcsolat',
    'nav.letsTalk': 'Beszéljünk',
    
    // Hero Section
    'hero.title': 'A Dizájn Minden',
    'hero.subtitle': 'Kreativitás felszabadítása merész vizuális elemekkel, zökkenőmentes felületekkel és határtalan lehetőségekkel.',
    'hero.available': 'Elérhető Új Projektekhez',
    'hero.bookMeeting': 'Időpont Foglalás',
    'hero.trustedBy': 'Megbíznak bennünk',
    
    // Globe Section / About
    'globe.aboutUs': 'Rólunk',
    'globe.intro1': 'Modern, értékesítést támogató weboldalakat készítünk azoknak a vállalkozásoknak, akiknek még nincs online jelenlétük, vagy akik egy elavult, gyengén teljesítő weboldallal dolgoznak. Mesterséges intelligenciát használunk azért, hogy gyorsabban, jobb felhasználói élménnyel és kedvezőbb áron szállítsunk, mint a hagyományos ügynökségek.',
    'globe.intro2': 'Azért csináljuk ezt, mert túl sok jó vállalkozás – különösen Magyarországon – láthatatlan az interneten, vagy ügyfeleket veszít a profibb megjelenésű versenytársakkal szemben. A mi célunk, hogy ezt a hátrányt bizalommá, érdeklődőkké és valódi bevétellé alakítsuk.',
    'globe.service': 'Szolgáltatás',
    'globe.serviceTitle': 'Webdizájn',
    'globe.serviceDescription': 'Olyan weboldalakat készítünk, amelyek nemcsak jól néznek ki—hanem működnek is. Gyorsan betöltődnek, könnyen használhatók és úgy vannak kialakítva, hogy a látogatókat vásárlókká alakítsák. Tiszta dizájn, okos struktúra, valódi eredmények.',
    'globe.getStarted': 'Kezdjük El',
    'globe.title': 'Rólunk',
    'globe.beaconTitle': 'Álmaid Megvalósítása',
    'globe.beaconLocation': 'Budapest, Magyarország',
    
    // Portfolio Section
    'portfolio.title': 'Portfólió',
    'portfolio.subtitle': 'Legjobb munkáink bemutatása',
    'portfolio.heading': 'A Művészetünk, Az Ön Kifejezése.',
    'portfolio.viewProject': 'Projekt Megtekintése',
    'portfolio.uiux': 'UI/UX',
    'portfolio.development': 'FEJLESZTÉS',
    'portfolio.branding': 'MÁRKAÉPÍTÉS',
    
    // About Section
    'about.title': 'Az MGB Design-ról',
    'about.description': 'Kreatív ügynökség vagyunk, amely webdizájnra és UI/UX-re specializálódott, lenyűgöző és konvertáló digitális élményeket teremtve.',
    
    // Team Section
    'team.title': 'Csapatunk',
    'team.subtitle': 'A tehetséges emberek az MGB Design mögött',
    'team.coFounders': 'Az Alapítók',
    'team.label': 'Csapat',
    'team.coFounderSales': 'Társalapító / Értékesítés',
    'team.coFounderDeveloper': 'Társalapító / Fejlesztő',
    
    // Footer
    'footer.headline': 'Van egy lenyűgöző projekt',
    'footer.headlineGray': 'a fejedben?',
    'footer.aboutUs': 'Rólunk',
    'footer.contactUs': 'Kapcsolat',
    'footer.scrollTop': 'FEL',
    'footer.newsletter': 'Feliratkozz a hírlevélünkre',
    'footer.emailPlaceholder': 'Adja meg az e-mail címét',
    'footer.subscribe': 'Feliratkozás',
    
    // Contact Page
    'contact.title': 'Lépj Kapcsolatba Velünk',
    'contact.subtitle': 'Beszéljük meg a projektedet',
    'contact.name': 'Teljes Név',
    'contact.email': 'Email',
    'contact.message': 'Üzenet',
    'contact.phone': 'Telefonszám',
    'contact.company': 'Cég Neve',
    'contact.interested': 'Mi érdekli?',
    'contact.webDesign': 'Webdizájn',
    'contact.uiux': 'UI/UX Tervezés',
    'contact.branding': 'Márkaépítés',
    'contact.development': 'Fejlesztés',
    'contact.consulting': 'Tanácsadás',
    'contact.other': 'Egyéb',
    'contact.tellMore': 'Mesélj többet a projektedről!',
    'contact.send': 'Küldés',
    'contact.info': 'Kapcsolat',
    'contact.getInTouch': 'Vedd Fel Velünk a Kapcsolatot',
    'contact.description': 'Készen állsz, hogy átalakítsd digitális jelenlétedet? Teremtsünk együtt valami rendkívülit.',
    'contact.heading': 'Fordítsd át Ötleted Egy Végtelen Élménybe',
    'contact.letsTalk': 'Beszéljünk',
  }
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('language');
      return (saved === 'en' || saved === 'hu') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    try {
      return translations[language][key as keyof typeof translations['en']] || key;
    } catch {
      return key;
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    // During hot reload or initial render, this might be called before provider is ready
    // Return a fallback that won't crash the app
    console.warn('TranslationProvider not ready - using fallback');
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
}