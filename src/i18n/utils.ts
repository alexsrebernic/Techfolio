import { ui, defaultLang, routes, showDefaultLang, type Ui } from "./ui"

export function getLangFromUrl(url: string): keyof typeof ui {
  let lang;
  const [, langFromCurrentUrl] = url.split('/');
  if (!langFromCurrentUrl) {
    lang = defaultLang;
  } else {
    lang = langFromCurrentUrl;
  }
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui, uiObject : Ui = ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return uiObject[lang][key] || ''
  }
}
export function useProcessSlug(lang: keyof typeof ui) {
  return function processSlug (slug: string) {
    const languageCode : string = slug.substring(0, 2);
    return lang == languageCode? slug.substring(3) : slug
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string | number = lang) {
    const pathName = path.replaceAll("/", "")
    const hasTranslation =
      defaultLang !== l && routes[l] !== undefined && routes[l][pathName] !== undefined
    const translatedPath = hasTranslation   ? "/" + routes[l][pathName] : path 

    return !showDefaultLang && l === defaultLang 
    ? translatedPath 
    : translatedPath != '/' 
    ? `/${l}${translatedPath}` 
    : `/${l}`
  }
}
export function useToggleLanguage(lang: keyof typeof ui) {
    return function toggleLanguage(path: string) {
        const paths = path.split('/').filter(p => p !== '')
        if (lang === 'en') {
            if (paths.length > 1) {
                const translatedPath = routes.pl[paths[1]]; // Translate to Polish
                return translatedPath ?  `/${translatedPath}` : '/'
            } else {
                return '/';
            }
        } else {
            const translatedPath = routes.en[paths[0]]; // Translate to English
            return translatedPath ? `/en/${translatedPath}` : '/en'
        }
    }
}
