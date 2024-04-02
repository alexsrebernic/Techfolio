import slugify from 'limax';

import { SITE, APP_BLOG, APP_STORE, APP_PROJECTS } from '@/utils/config';

import { trim } from '@/utils/utils';

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';
export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

export const STORE_BASE = cleanSlug(APP_STORE?.list?.pathname);
export const TAG_STORE_BASE = cleanSlug(APP_STORE?.tag?.pathname) || 'tag';
export const STORE_ITEM_PERMALINK_PATTERN = trimSlash(APP_STORE?.post?.permalink || `${STORE_BASE}/%slug%`);
export const CATEGORY_STORE_BASE = cleanSlug(APP_STORE?.category?.pathname);


export const PROJECTS_BASE = cleanSlug(APP_PROJECTS?.list?.pathname);
export const TAG_PROJECT_BASE = cleanSlug(APP_PROJECTS?.tag?.pathname) || 'tag';
export const CATEGORY_PROJECT_BASE = cleanSlug(APP_PROJECTS?.category?.pathname);
export const PROJECTS_PERMALINK_PATTERN = trimSlash(APP_PROJECTS?.post?.permalink || `${PROJECTS_BASE}/%slug%`);

/** */
export const getCanonical = (path = ''): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    return url + '/';
  }
  return url;
};

/** */
export const getPermalink = (slug = '', type = 'page'): string => {
  let permalink: string;
  switch (type) {
    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }
  return definitivePermalink(permalink);
};
export const getPermaStoreLink = (slug = '', type = 'page'): string => {
  let permalink: string;

  switch (type) {
    case 'category':
      permalink = createPath(CATEGORY_STORE_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_STORE_BASE, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

export const getPermaProjectsLink = (slug = '', type = 'page'): string => {
  let permalink: string;
  switch (type) {
    case 'category':
      permalink = createPath(CATEGORY_PROJECT_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_PROJECT_BASE, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink('/');

export const getProjectsPermaLink = (): string => getPermalink(PROJECTS_BASE);

export const getStorePermaLink = (): string => getPermalink(STORE_BASE);

export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);



/** */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string): string => createPath(BASE_PATHNAME, permalink);
