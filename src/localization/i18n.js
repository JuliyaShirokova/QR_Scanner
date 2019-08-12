import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './en.json';
import ru from './ru.json';
import it from './it.json';
import uk from './uk.json';
import es from './es.json';
import fr from './fr.json';
import de from './de.json';
import getLocale from '../utilits/getLocale';

const resourcesTranslate = {
  en: en,
  ru: ru,
  uk: uk,
  it: it,
  es: es,
  de: de,
  fr: fr
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: getLocale(),
    resources: resourcesTranslate,  
  });

export default i18n;