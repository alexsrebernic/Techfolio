export type Ui = {
  [key: string]: {
    [key: string]: string;
  };
};
interface RouteObject {
  slug: string;
}
export type Routes = {
  [key: string]: {
    [key: string]: string;
  };
};

export type LanguageCodes = {
  [key: string] : string,
} 
export const languages = {
    en: "English",
    es: "Spanish",
} as const
export const languagesCodes : LanguageCodes = {
  en: "en-EN",
  es: "es-ES",
} as const

export const defaultLang = "en"
  
export const showDefaultLang = false
  
export const ui : Ui = {
    es: {
      "homepage.available_work": 'Disponible para trabajo',
      "homepage.not_available_work": 'No disponible para trabajar',
      "button.about": 'Acerca',
      "button.copy_email": 'Copiar email',
      "button.load_more": 'Cargar mas',
      "button.read_more": 'Leer mas',
      "button.schedule_call": 'Agendar llamada',
      "button.contact.form": 'Enviar',
      "homepage.projects.title": 'Proyectos hechos',
      "homepage.testimonials.title": 'Lo que dicen clients/colegas',
      "homepage.blog.title": 'Blog',
      "blog.title": 'Blog',
      "blog.subtitle": 'El lugar en donde comparto recursos, noticias y herramientas que uso',
      "about.services.title": 'Servicios',
      "about.tools.title": 'Herramientas y lenguajes con los que trabajo',
      "about.experience.title": 'Experiencia',
      "about.education.title": 'Educacion',
      "shop.title": 'Tienda',
      "shop.subtitle": 'Dale un vistazo a mis utiles recursos',
      "contact.title": 'Contacto',
      "contact.subtitle": 'Hazme saber si necesitas mis servicios de desarrollo web',
      "contact.form.title": 'Enviar mensaje',
    },
    en: {
      "homepage.available_work": 'Available for work',
      "homepage.not_available_work": 'Not available for work',
      "button.about": 'About',
      "button.copy_email": 'Copy email',
      "button.load_more": 'Load more',
      "button.read_more": 'Read more',
      "button.schedule_call": 'Schedule a call',
      "button.contact.form": 'Send',
      "homepage.projects.title": 'Selected work',
      "homepage.testimonials.title": 'What co-workers/clients say',
      "homepage.blog.title": 'Blog',
      "blog.title": 'Blog',
      "blog.subtitle": 'The place where I share resources and tools I use',
      "about.services.title": 'Services',
      "about.tools.title": 'Tools and languages I work with',
      "about.experience.title": 'Experience',
      "about.education.title": 'Education',
      "shop.title": 'Store',
      "shop.subtitle": 'Check my useful resources',
      "contact.title": 'Contact',
      "contact.subtitle": 'Get in touch for web development inquiries',
      "contact.form.title": 'Send a message',
    },
} as const
  

export const routes : Routes = {
    es: {
      contact: "contacto",
      projects: "proyectos",
      store: "tienda",
      blog: "blog",
      about: "acerca",
    },
    en: {
      contact: "contact",
      projects: "projects",
      blog: "blog",
      store: "store",
      about: "about"
    },
} as const

export function generateSlugRoutes(): RouteObject[] {
  const slugRoutes: RouteObject[] = [];

  Object.keys(routes).forEach((language) => {
    const languageRoutes = routes[language];

    Object.keys(languageRoutes).forEach((routeKey) => {
      const slug = `${language}/${languageRoutes[routeKey]}`;
      slugRoutes.push({ slug });
    });
  });

  return slugRoutes;
}
