import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Navigation } from '@/app/components/Navigation';
import { useTranslation } from '@/app/contexts/TranslationContext';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-[#E5DDD5]">
      <Navigation />
      
      <div className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-0 lg:gap-24">
          
          {/* Left Section */}
          <div className="flex flex-col justify-between mb-0 lg:mb-0">
            <div>
              {/* Main heading */}
              <h1 
                className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-3 md:mb-4 lg:mb-12"
                style={{ 
                  fontFamily: 'Inter, sans-serif', 
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#000'
                }}
              >
                {t('contact.getInTouch')}
              </h1>

              {/* Divider */}
              <div className="w-16 h-px bg-gray-400 mb-3 md:mb-4 lg:mb-8"></div>

              {/* Email */}
              <a 
                href="mailto:mgbmediagroup@gmail.com"
                className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors mb-0 lg:mb-12"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Mail className="w-5 h-5" />
                <span>mgbmediagroup@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Section - Form */}
          <div>
            <h2 
              className="text-2xl md:text-4xl mb-4 md:mb-6 lg:mb-12"
              style={{ 
                fontFamily: 'Inter, sans-serif', 
                fontWeight: 400,
                color: '#000'
              }}
            >
              {t('nav.letsTalk')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Company Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder={t('contact.name')}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-400 pb-3 outline-none focus:border-black transition-colors placeholder:text-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder={t('contact.company')}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-400 pb-3 outline-none focus:border-black transition-colors placeholder:text-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }}
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    placeholder={t('contact.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-400 pb-3 outline-none focus:border-black transition-colors placeholder:text-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder={t('contact.phone')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-gray-400 pb-3 outline-none focus:border-black transition-colors placeholder:text-gray-500"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }}
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <textarea
                  placeholder={t('contact.tellMore')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full bg-transparent border-b border-gray-400 pb-3 outline-none focus:border-black transition-colors placeholder:text-gray-500 resize-none"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-5 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 group"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', letterSpacing: '0.05em' }}
              >
                {t('contact.send').toUpperCase()}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}