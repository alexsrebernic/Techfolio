export type Ui = {
  [key: string]: {
    [key: string]: string;
  };
};
export interface RouteObject {
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
export const locales = {
    en: "English",
    es: "Spanish",
} as const
export const languagesCodes : LanguageCodes = {
  en: "en-EN",
  es: "es-ES",
} as const

export const defaultLang = "es"
  
export const showDefaultLang = false
  
export const ui : Ui = {
    es: {
      "homepage.available_work": 'Disponible para trabajo',
      "homepage.not_available_work": 'No disponible para trabajar',
      "homepage.presentation": 'Hola! Yo soy',
      "button.about": 'Acerca',
      "button.copy_email": 'Copiar email',
      "button.load_more": 'Cargar más',
      "button.read_more": 'Leer más',
      "button.see_more": 'Ver más',
      "button.schedule_call": 'Agendar llamada',
      "button.contact.form": 'Enviar',
      "homepage.projects.title": 'Proyectos hechos',
      "homepage.testimonials.title": 'Lo que dicen clientes/colegas',
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
      "testimonial.of": 'de',
    },
    en: {
      "homepage.available_work": 'Available for work',
      "homepage.not_available_work": 'Not available for work',
      "homepage.presentation": "Hello! I'm",
      "button.about": 'About',
      "button.copy_email": 'Copy email',
      "button.load_more": 'Load more',
      "button.read_more": 'Read more',
      "button.see_more": 'See more',
      "button.schedule_call": 'Schedule a call',
      "button.contact.form": 'Send',
      "homepage.projects.title": 'Selected work',
      "homepage.testimonials.title": 'What co-workers/clients say',
      "homepage.blog.title": 'Blog',
      "blog.title": 'Blog',
      "blog.subtitle": 'The place where I share resources and tools I use',
      "about.services.title": 'Services',
      "about.tools.title": 'Tools and locales I work with',
      "about.experience.title": 'Experience',
      "about.education.title": 'Education',
      "shop.title": 'Store',
      "shop.subtitle": 'Check my useful resources',
      "contact.title": 'Contact',
      "contact.subtitle": 'Get in touch for web development inquiries',
      "contact.form.title": 'Send a message',
      "testimonial.of": 'of',
    },
} as const
  

export const routes : Routes = {
    es: {
      homepage: "inicio",
      contact: "contact",
      projects: "projects",
      store: "store",
      blog: "blog",
      about: "about",
    },
    en: {
      homepage: "homepage",
      contact: "contact",
      projects: "projects",
      blog: "blog",
      store: "store",
      about: "about"
    },
} as const


