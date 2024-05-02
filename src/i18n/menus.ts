import type {Ui} from './ui'
export const footerUi : Ui = {
    es: {
    "footer.builtIn": "Hecho con",
    "sidebar.madeBy": "Hecho por",
    "sidebar.getTemplateForFree": "Obtener template gratis",
    },
    en: {
      "footer.builtIn": "Built in",
      "sidebar.madeBy": "Made by",
      "sidebar.getTemplateForFree": "Get template for free",
    },
} as const

export const sidebarUi : Ui = {
    es: {
      "sidebar.homepage": "Inicio",
      "sidebar.projects": "Proyectos",
      "sidebar.about": "Acerca",
      "sidebar.store": "Tienda",
      "sidebar.contact": "Contacto",
      "sidebar.blog": "Blog",
    },
    en: {
      "sidebar.homepage": "Homepage",
      "sidebar.projects": "Projects",
      "sidebar.about": "About",
      "sidebar.store": "Store",
      "sidebar.contact": "Contact",
      "sidebar.blog": "Blog",
    },
} as const
