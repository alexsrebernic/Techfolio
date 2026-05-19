import fs from 'fs';
import yaml from 'js-yaml';
import merge from 'lodash.merge';

import type { MetaData } from '~/types';

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
  googleSiteVerificationId?: string;
}
export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string;
    template: string;
  };
}
export interface I18NConfig {
  isEnabled: boolean,
  defaultLocale: string;
  locales: { [key: string]: string };
  textDirection: string;
  prefixDefaultLocale: boolean;
  dateFormatter?: Intl.DateTimeFormat;
}

export interface AppBlogConfig {
  isWordpressEnabled: boolean;
  isEnabled: boolean;
  postsPerPage: number;
  isRelatedPostsEnabled: boolean;
  relatedPostsCount: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AppProjectsConfig {
  isEnabled: boolean;
  postsPerPage: number;
  isRelatedPostsEnabled: boolean;
  relatedPostsCount: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AppItemShopConfig {
  isWordpressEnabled: boolean;
  isEnabled: boolean;
  postsPerPage: number;
  isRelatedPostsEnabled: boolean;
  relatedPostsCount: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}
export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string;
      partytown?: boolean;
    };
  };
}

const config = yaml.load(fs.readFileSync('src/config.yaml', 'utf8')) as {
  site?: SiteConfig;
  metadata?: MetaDataConfig;
  i18n?: I18NConfig;
  apps?: {
    blog?: AppBlogConfig;
    projects?: AppProjectsConfig;
    store?: AppItemShopConfig;
  };
  ui?: unknown;
  analytics?: unknown;
};

const DEFAULT_SITE_NAME = "Alex Srebernic's portfolio";

const getSite = () => {
  const _default = {
    name: DEFAULT_SITE_NAME,
    site: undefined,
    base: '/',
    trailingSlash: false,
    googleSiteVerificationId: '',
  };

  return merge({}, _default, config?.site ?? {}) as SiteConfig;
};

const getMetadata = () => {
  const siteConfig = getSite();

  const _default = {
    title: {
      default: siteConfig?.name || DEFAULT_SITE_NAME,
      template: '%s',
    },
    description: '',
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      type: 'website',
    },
  };

  return merge({}, _default, config?.metadata ?? {}) as MetaDataConfig;
};

const getI18N = () => {
  const _default = {
    isEnabled: true,
    defaultLocale: 'en',
    prefixDefaultLocale: true,
    locales: {
      en: 'en-US',
      es: 'es-ES'
    },
    textDirection: 'ltr',
  };

  const value = merge({}, _default, config?.i18n ?? {});

  return Object.assign(value, {
    dateFormatter: new Intl.DateTimeFormat(value.defaultLocale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
  }) as I18NConfig;
};

const getAppBlog = () => {
  const _default = {
    isWordpressEnabled: false,
    isEnabled: true,
    postsPerPage: 6,
    isRelatedPostsEnabled: false,
    relatedPostsCount: 4,
    post: {
      isEnabled: true,
      permalink: '/blog/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'blog',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'blog-category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'blog-tag',
      robots: {
        index: true,
        follow: true,
      },
    },
  };
  return merge({}, _default, config?.apps?.blog ?? {}) as AppBlogConfig;
};
const getAppProjects = () => {
  const _default = {
    isEnabled: true,
    postsPerPage: 6,
    isRelatedPostsEnabled: true,
    relatedPostsCount: 4,
    post: {
      isEnabled: true,
      permalink: '/projects/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'projects',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'projects-category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'projects-tag',
      robots: {
        index: true,
        follow: true,
      },
    },
  };
  return merge({}, _default, config?.apps?.projects ?? {}) as AppProjectsConfig;
};
const getAppStore = () => {
  const _default = {
    isWordpressEnabled: false,
    isEnabled: false,
    postsPerPage: 6,
    isRelatedPostsEnabled: false,
    relatedPostsCount: 4,
    post: {
      isEnabled: true,
      permalink: '/store/%slug%',
      robots: {
        index: true,
        follow: true,
      },
    },
    list: {
      isEnabled: true,
      pathname: 'store',
      robots: {
        index: true,
        follow: true,
      },
    },
    category: {
      isEnabled: true,
      pathname: 'store-category',
      robots: {
        index: true,
        follow: true,
      },
    },
    tag: {
      isEnabled: true,
      pathname: 'store-tag',
      robots: {
        index: true,
        follow: true,
      },
    },
  };
  return merge({}, _default, config?.apps?.store ?? {}) as AppItemShopConfig;
};
const getUI = () => {
  const _default = {
    theme: 'system',
    classes: {},
    tokens: {},
  };

  return merge({}, _default, config?.ui ?? {});
};

const getAnalytics = () => {
  const _default = {
    vendors: {
      googleAnalytics: {
        id: undefined,
        partytown: true,
      },
    },
  };

  return merge({}, _default, config?.analytics ?? {}) as AnalyticsConfig;
};

export const SITE = getSite();
export const I18N = getI18N();
export const METADATA = getMetadata();
export const APP_BLOG = getAppBlog();
export const APP_PROJECTS = getAppProjects();
export const APP_STORE = getAppStore();
export const UI = getUI();
export const ANALYTICS = getAnalytics();
