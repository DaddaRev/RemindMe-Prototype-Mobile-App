import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import itTranslation from './locales/it/translation.json';

// Get saved language from localStorage, default to 'en' if not found
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      it: {
        translation: itTranslation
      }
    },
    lng: savedLanguage, // use saved language or default
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: false // no browser language detection
  });

export default i18n;
