import { getLocales } from 'expo-localization';
import * as i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enA11y from './resources/en.a11y.json';
import en from './resources/en.json';

const resources = {
  en: {
    translation: { ...en, accessibility: enA11y },
  },
};

const fallbackLng = 'en';
const language = getLocales()[0]?.languageCode ?? fallbackLng;

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
