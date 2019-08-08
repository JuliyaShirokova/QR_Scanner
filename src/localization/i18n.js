import i18n from "i18next";
import { NativeModules } from 'react-native';
import { initReactI18next } from "react-i18next";
import en from './en.json';
import ru from './ru.json';
import it from './it.json';
import uk from './uk.json';
import es from './es.json';
import getLocale from '../utilits/getLocale';

const resourcesTranslate = {
  en: en,
  ru: ru,
  uk: uk,
  it: it,
  es: es,
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: getLocale(),
    resources: resourcesTranslate,  
  });

export default i18n;