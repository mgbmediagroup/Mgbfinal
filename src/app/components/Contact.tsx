import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/app/contexts/TranslationContext';

export function Contact() {
  const { t, language } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ 
        fullName: '', 
        company: '', 
        email: '', 
        phone: '', 
        message: '' 
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-normal leading-tight text-black">
                  {language === 'hu' ? (
                    <>
                      Fordítsd át{' '}
                      <span 
                        className="transition-colors"
                        style={{ 
                          color: 'rgb(100, 150, 255)',
                          textShadow: '0 0 20px rgba(100, 150, 255, 0.4), 0 0 30px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        Ötleted
                      </span>
                      {' '}Egy Végtelen{' '}
                      <span 
                        className="transition-colors"
                        style={{ 
                          color: 'rgb(100, 150, 255)',
                          textShadow: '0 0 20px rgba(100, 150, 255, 0.4), 0 0 30px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        Élménybe
                      </span>
                    </>
                  ) : (
                    <>
                      Turn Your{' '}
                      <span 
                        className="transition-colors"
                        style={{ 
                          color: 'rgb(100, 150, 255)',
                          textShadow: '0 0 20px rgba(100, 150, 255, 0.4), 0 0 30px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        Vision
                      </span>
                      {' '}Into an{' '}
                      <span 
                        className="transition-colors"
                        style={{ 
                          color: 'rgb(100, 150, 255)',
                          textShadow: '0 0 20px rgba(100, 150, 255, 0.4), 0 0 30px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        Experience
                      </span>
                      {' '}That Lasts
                    </>
                  )}
                </h2>
              </div>

              <div className="w-16 border-t border-black/20" />

              <a 
                href="mailto:mgbmediagroup@gmail.com" 
                className="inline-flex items-center gap-2 text-sm text-black hover:text-gray-600 transition-colors"
              >
                <Mail size={16} />
                <span>mgbmediagroup@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-8">
            <h3 className="text-3xl font-normal text-black text-center">{t('contact.letsTalk')}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name and Company */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder={t('contact.name')}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder={t('contact.company')}
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder={t('contact.email')}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors"
                    placeholder={t('contact.phone')}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-black/20 py-3 text-sm text-black placeholder:text-black/40 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder={t('contact.tellMore')}
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-all ${
                    isSubmitted
                      ? 'text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ 
                    borderRadius: '30px',
                    backgroundColor: isSubmitted ? '#E87428' : undefined
                  }}
                >
                  {isSubmitting ? (
                    t('contact.send').toUpperCase() + '...'
                  ) : isSubmitted ? (
                    t('contact.send').toUpperCase() + '!'
                  ) : (
                    <>
                      {t('contact.send').toUpperCase()}
                      <ArrowRight size={16} className="text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}