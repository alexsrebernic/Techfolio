import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Project, LocalizedProject } from '~/types';
import { APP_PROJECTS, I18N } from '~/utils/config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Project> => {
  const { id, slug: rawSlug = '', data } = post;
  const { Content, remarkPluginFrontmatter } = await post.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const locale = id.split('/')[0];
  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));
  const permalink = await generatePermalink({ id, slug, publishDate, category });

  return {
    id: id,
    slug: slug,
    permalink: locale === I18N.defaultLocale ? permalink.split('/')[1] : permalink,

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Project>> {
  const projects = await getCollection('post');
  const normalizedProjects = projects.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedProjects))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _projects: Array<Project>;
let _projectsLocalized : Array<LocalizedProject>;
export const paginatedProjectsByLang = new Map<string, Array<Project>>();

/** */
export const isProjectEnabled = APP_PROJECTS.isEnabled;
export const isProjectListRouteEnabled = APP_PROJECTS.list.isEnabled;
export const isProjectPostRouteEnabled = APP_PROJECTS.post.isEnabled;
export const isProjectCategoryRouteEnabled = APP_PROJECTS.category.isEnabled;
export const isProjectTagRouteEnabled = APP_PROJECTS.tag.isEnabled;

export const blogListRobots = APP_PROJECTS.list.robots;
export const blogPostRobots = APP_PROJECTS.post.robots;
export const blogCategoryRobots = APP_PROJECTS.category.robots;
export const blogTagRobots = APP_PROJECTS.tag.robots;

export const blogProjectsPerPage = APP_PROJECTS?.postsPerPage;

/** */
export const fetchLocalizedProjects = async (): Promise<Array<LocalizedProject>> => {
  if (!_projects) {
    _projects = await load();

    const common_slugs = [...new Set(_projects.map((post) => post.slug.split('/')[1]))];
    _projectsLocalized = common_slugs.map((id) => {
      const projectsLocalizedMap = Object.keys(I18N.locales).reduce((map, locale) => {
        const post = _projects.find((post) => post.slug === `${locale}/${id}`);
        map[locale] = post;
        return map;
    }, {});
      return {
        common_slug: id,
        locales: projectsLocalizedMap
      }
    });
  }

  return _projectsLocalized;
};

/** */
export const fetchProjects = async (locale: string): Promise<Array<Project>> => {
  const _projectsLocalized = await fetchLocalizedProjects();
  return _projectsLocalized
    .map((post) => post.locales[locale])
    .filter((post): post is Project => post !== undefined);
};

/** */
export const findProjectsBySlugs = async (slugs: Array<string>, locale: string): Promise<Array<Project>> => {
  if (!Array.isArray(slugs)) return [];

  const projects = await fetchProjects(locale);

  return slugs.reduce(function (r: Array<Project>, slug: string) {
    projects.some(function (post: Project) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findProjectsByIds = async (ids: Array<string>, locale: string): Promise<Array<Project>> => {
  if (!Array.isArray(ids)) return [];

  const projects = await fetchProjects(locale);

  return ids.reduce(function (r: Array<Project>, id: string) {
    projects.some(function (post: Project) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestProjects = async ({ count }: { count?: number }, locale: string): Promise<Array<Project>> => {
  const _count = count || 4;
  const projects = await fetchProjects(locale);

  return projects ? projects.slice(0, _count) : [];
};

/** */
export const getStaticPathsProjectList = async ({ paginate }) => {
  if (!isProjectEnabled || !isProjectListRouteEnabled) return [];
  const _projectsLocalized = await fetchLocalizedProjects();

  return paginate(_projectsLocalized, {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogProjectsPerPage,
    });
};

/** */
export const getStaticPathsProjectPost = async () => {
  if (!isProjectEnabled || !isProjectPostRouteEnabled) return [];
  const _projectsLocalized = await fetchLocalizedProjects();

  return _projectsLocalized.map((post) => ({
    params: {
      blog: post.common_slug,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsProjectCategory = async ({ paginate }) => {
  if (!isProjectEnabled || !isProjectCategoryRouteEnabled) return [];

  const _projectsLocalized = await fetchLocalizedProjects();

  const categoriesSet = new Set(
    _projectsLocalized.flatMap(post =>
      Object.values(post.locales)
        .map(locale => locale?.category?.toLowerCase())  // Use optional chaining
        .filter(category => typeof category === 'string')
    )
  );

  return Array.from(categoriesSet).flatMap(category =>
    paginate(
      _projectsLocalized.filter(post =>
        Object.values(post.locales).some(
          locale =>
            locale?.category?.toLowerCase() === category  // Use optional chaining
        )
      ),
      {
        params: { category, blog: CATEGORY_BASE || undefined },
        pageSize: blogProjectsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsProjectTag = async ({ paginate }) => {
  if (!isProjectEnabled || !isProjectTagRouteEnabled) return [];

  const _projectsLocalized = await fetchLocalizedProjects();

  const tagsSet = new Set(
    _projectsLocalized.flatMap(post =>
      Object.values(post.locales)
        .filter(locale => locale) // Filter out undefined locales
        .flatMap(locale => locale?.tags || []) // Use optional chaining and provide an empty array for undefined tags
        .map(tag => tag?.toLowerCase())
        .filter(tag => typeof tag === 'string')
    )
  );

  return Array.from(tagsSet).flatMap(tag =>
    paginate(
      _projectsLocalized.filter(post =>
        Object.values(post.locales).some(
          locale =>
            locale &&
            Array.isArray(locale.tags) &&
            locale.tags.includes(tag)
        )
      ),
      {
        params: { tag, blog: TAG_BASE || undefined },
        pageSize: blogProjectsPerPage,
        props: { tag },
      }
    )
  );
};
