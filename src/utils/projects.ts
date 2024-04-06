import type { PaginateFunction } from 'astro';

import type NormalizedProject from '@/interfaces/NormalizedProject';
import { APP_PROJECTS, I18N } from '@/utils/config';
import { cleanSlug, trimSlash, PROJECTS_BASE, PROJECTS_PERMALINK_PATTERN, CATEGORY_PROJECT_BASE, TAG_PROJECT_BASE } from './permalinks';
import { wpquery } from '@/data/wordpress';
import ProjectQuery from '@/graphql/ProjectQuery';
import type Project from '@/interfaces/Project';
import parseHTMLToListObjects from '@/helpers/parseHTMLToObject';
import searchPropsEndingWithLang from '@/helpers/searchPropsEndingWith';
import type Testimonial from '@/interfaces/Testimonial';
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

  const permalink = PROJECTS_PERMALINK_PATTERN.replace('%slug%', slug)
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

const getNormalizedProject = async (project: Project,lang : string = I18N.language): Promise<NormalizedProject> => {
  const normalizedProjectTranslated = searchPropsEndingWithLang<Project>(project,lang,I18N.languages)
  const _tags = normalizedProjectTranslated.tags ? normalizedProjectTranslated.tags.map(tag => tag.toLowerCase().replace(/[\W_]+/g, '-')) : []
  const _data = {
    publishDate: normalizedProjectTranslated.date,
    title: normalizedProjectTranslated.title,
    excerpt: normalizedProjectTranslated.description,
    image: normalizedProjectTranslated.thumbnail.node.mediaItemUrl,
    tags: _tags,
    updateDate: normalizedProjectTranslated.modified,
    draft: normalizedProjectTranslated.draft,
 
  }
  const _project = {
    data: _data,
    body: normalizedProjectTranslated.content,
    collection: 'project',
    id: normalizedProjectTranslated.id,
    slug: normalizedProjectTranslated.slug,
  }
  const { id, slug: rawSlug = '', data } = _project;

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    draft = false,
    metadata = {},
  } = data;
  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));
  const _testimonial = searchPropsEndingWithLang<Testimonial>(project.testimonial.edges[0].node.testimonialItem,lang,I18N.languages)
  _testimonial.photo = _testimonial.photo.node.mediaItemUrl
  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: '' }),
    publishDate: publishDate,
    updateDate: updateDate,
    title: title,
    excerpt: excerpt,
    image: image,
    tags: tags,
    draft: draft,
    metadata,
    name: normalizedProjectTranslated.name,
    content: normalizedProjectTranslated.content,
    date: normalizedProjectTranslated.date,
    status: normalizedProjectTranslated.status,
    modified: normalizedProjectTranslated.modified,
    description: normalizedProjectTranslated.description,
    testimonial: _testimonial,
    init_year: normalizedProjectTranslated.initYear,
    present: normalizedProjectTranslated.present,
    end_year: normalizedProjectTranslated.endYear,
    role: normalizedProjectTranslated.role,
    preview_url: normalizedProjectTranslated.preview_url.url,
    background: normalizedProjectTranslated.background,
    solutions: normalizedProjectTranslated.solutions && parseHTMLToListObjects(normalizedProjectTranslated.solutions),
    conclusion: normalizedProjectTranslated.conclusion,
    goals: normalizedProjectTranslated.goals && parseHTMLToListObjects(normalizedProjectTranslated.goals),
    tools: normalizedProjectTranslated.tools ? normalizedProjectTranslated.tools.split('\r\n') : [],
    type : normalizedProjectTranslated.type,
    image_1: normalizedProjectTranslated.image1.node.mediaItemUrl
  };

};

const getRandomizedNormalizedProjects = (array: NormalizedProject[], num: number) => {
  const newArray: NormalizedProject[] = [];

  while (newArray.length < num && array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    newArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return newArray;
};

const load = async function (lang: string): Promise<Array<NormalizedProject>> {
  const projects = (await wpquery({query : ProjectQuery})).projects.nodes.map(project => {
    return {
          ...project.projectItem,
          slug: project.slug,
          status: project.status,
          title: project.title,
          modified: project.modified,
          date: project.date
    };
  });
  const normalizedNormalizedProjects = projects.map(async (project) => await getNormalizedProject(project, lang));
  const results = (await Promise.all(normalizedNormalizedProjects))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((project) => !project.draft);

  return results;
};

let _projects: Array<NormalizedProject>;

/** */
export const isWordpressEnabled = APP_PROJECTS.isWordpressEnabled;
export const isProjectEnabled = APP_PROJECTS.isEnabled;
export const isRelatedNormalizedProjectsEnabled = APP_PROJECTS.isRelatedPostsEnabled;
export const isProjectListRouteEnabled = APP_PROJECTS.list.isEnabled;
export const isProjectNormalizedProjectRouteEnabled = APP_PROJECTS.post.isEnabled;
export const isProjectCategoryRouteEnabled = APP_PROJECTS.category.isEnabled;
export const isProjectTagRouteEnabled = APP_PROJECTS.tag.isEnabled;

export const blogListRobots = APP_PROJECTS.list.robots;
export const blogNormalizedProjectRobots = APP_PROJECTS.post.robots;
export const blogCategoryRobots = APP_PROJECTS.category.robots;
export const blogTagRobots = APP_PROJECTS.tag.robots;

export const blogNormalizedProjectsPerPage = APP_PROJECTS?.postsPerPage;

/** */
export const fetchNormalizedProjects = async (lang: string): Promise<Array<NormalizedProject>> => {
  if (!_projects) {
    _projects = await load(lang);
  }
  return _projects;
};

/** */
export const findNormalizedProjectsBySlugs = async (slugs: Array<string>, lang : string): Promise<Array<NormalizedProject>> => {
  if (!Array.isArray(slugs)) return [];

  const projects = await fetchNormalizedProjects(lang);

  return slugs.reduce(function (r: Array<NormalizedProject>, slug: string) {
    projects.some(function (project: NormalizedProject) {
      return slug === project.slug && r.push(project);
    });
    return r;
  }, []);
};

/** */
export const findNormalizedProjectsByIds = async (ids: Array<string>, lang : string): Promise<Array<NormalizedProject>> => {
  if (!Array.isArray(ids)) return [];

  const projects = await fetchNormalizedProjects(lang);

  return ids.reduce(function (r: Array<NormalizedProject>, id: string) {
    projects.some(function (project: NormalizedProject) {
      return id === project.id && r.push(project);
    });
    return r;
  }, []);
};

/** */
export const findLatestNormalizedProjects = async ({ count }: { count?: number  } , lang : string): Promise<Array<NormalizedProject>> => {
  const _count = count || 4;
  const projects = await fetchNormalizedProjects(lang);

  return projects ? projects.slice(0, _count) : [];
};

/** */
export const getStaticPathsProjectList = async ({ paginate }: { paginate: PaginateFunction } , lang : string) => {
  if (!isProjectEnabled || !isProjectListRouteEnabled) return [];
  return paginate(await fetchNormalizedProjects(lang), {
    params: { project: PROJECTS_BASE || undefined },
    pageSize: blogNormalizedProjectsPerPage,
  });
};

/** */
export const getStaticPathsNormalizedProject = async (lang : string) => {
  if (!isProjectEnabled || !isProjectNormalizedProjectRouteEnabled) return [];
  return (await fetchNormalizedProjects(lang)).flatMap((project) => ({
    params: {
      project: project.permalink,
    },
    props: { project },
  }));
};

/** */
export const getStaticPathsProjectCategory = async ({ paginate }: { paginate: PaginateFunction } , lang : string) => {
  if (!isProjectEnabled || !isProjectCategoryRouteEnabled) return [];

  const projects = await fetchNormalizedProjects(lang);
  const categories = new Set<string>();
  projects.map((project) => {
    typeof project.category === 'string' && categories.add(project.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      projects.filter((project) => typeof project.category === 'string' && category === project.category.toLowerCase()),
      {
        params: { category: category, project: CATEGORY_PROJECT_BASE || undefined },
        pageSize: blogNormalizedProjectsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsProjectTag = async ({ paginate }: { paginate: PaginateFunction } , lang : string) => {
  if (!isProjectEnabled || !isProjectTagRouteEnabled) return [];

  const projects = await fetchNormalizedProjects(lang);
  const tags = new Set<string>();
  projects.map((project) => {
    Array.isArray(project.tags) && project.tags.map((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags).flatMap((tag) =>
    paginate(
      projects.filter((project) => Array.isArray(project.tags) && project.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, project: TAG_PROJECT_BASE || undefined },
        pageSize: blogNormalizedProjectsPerPage,
        props: { tag },
      }
    )
  );
};

/** */
export function getRelatedNormalizedProjects(allNormalizedProjects: NormalizedProject[], currentSlug: string, currentTags: string[]) {
  if (!isProjectEnabled || !isRelatedNormalizedProjectsEnabled) return [];

  const relatedNormalizedProjects = getRandomizedNormalizedProjects(
    allNormalizedProjects.filter((project) => project.slug !== currentSlug && project.tags?.some((tag) => currentTags.includes(tag))),
    APP_PROJECTS.relatedPostsCount
  );

  if (relatedNormalizedProjects.length < APP_PROJECTS.relatedPostsCount) {
    const moreNormalizedProjects = getRandomizedNormalizedProjects(
      allNormalizedProjects.filter((project) => project.slug !== currentSlug && !project.tags?.some((tag) => currentTags.includes(tag))),
      APP_PROJECTS.relatedPostsCount - relatedNormalizedProjects.length
    );
    relatedNormalizedProjects.push(...moreNormalizedProjects);
  }

  return relatedNormalizedProjects;
}
