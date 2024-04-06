import type { PaginateFunction } from 'astro';

import type Post from '@/interfaces/Post';
import { APP_BLOG, I18N } from '@/utils/config';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';
import { wpquery } from '@/data/wordpress';
import PostQuery from '@/graphql/PostQuery';
import type NormalizedPost from '@/interfaces/NormalizedPost';

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

const getNormalizedPost = async (post: Post, lang : string = I18N.language): Promise<NormalizedPost | false> => {
  const _tags = post.tags.edges.map(item => item.node.name)
  let categories = post.categories.edges.map(item => item.node.name)
  const index = categories.indexOf(lang)
  if(index == -1) return false
  categories = categories.filter((l,i) => i !== index)[0]
  const _data = {
    publishDate: post.date,
    title: post.title,
    excerpt: post.excerpt,
    image: post.featuredImage.node.mediaItemUrl,
    tags: _tags,
    category : categories,
    author: post.author.node.name,
    updateDate: post.modified,
    draft: post.draft,
    metadata: null,
  }
  const _post = {
    data: _data,
    body: post.content,
    collection: 'post',
    id: post.id,
    slug: post.slug,
    author: post.author
  }
  const { id, slug: rawSlug = '', data } = _post;

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
  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));
  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,
    content: post.content,
    draft: draft,
    metadata,
    readingTime: post?.readingTime,
  };

};

const getRandomizedPosts = (array: NormalizedPost[], num: number) => {
  const newArray: NormalizedPost[] = [];

  while (newArray.length < num && array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    newArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return newArray;
};

const load = async function (lang : string): Promise<Array<NormalizedPost>> {
  const posts = (await wpquery({query : PostQuery})).posts.nodes ;
  const normalizedPosts = (await Promise.all(posts.map(async (post : Post) => await getNormalizedPost(post,lang) ))).filter(post => post)
  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<NormalizedPost>;

/** */
export const isWordpressEnabled = APP_BLOG.isWordpressEnabled;
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (lang: string): Promise<Array<NormalizedPost>> => {
  if (!_posts) {
    _posts = await load(lang);
  }

  return _posts;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>, lang : string): Promise<Array<NormalizedPost>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts(lang);

  return slugs.reduce(function (r: Array<NormalizedPost>, slug: string) {
    posts.some(function (post: NormalizedPost) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>, lang : string): Promise<Array<NormalizedPost>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts(lang);

  return ids.reduce(function (r: Array<NormalizedPost>, id: string) {
    posts.some(function (post: NormalizedPost) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }, lang : string): Promise<Array<NormalizedPost>> => {
  const _count = count || 4;
  const posts = await fetchPosts(lang);

  return posts ? posts.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }, lang : string) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPosts(lang), {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

/** */
export const getStaticPathsBlogPost = async (lang:string) => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts(lang)).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }, lang : string) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts(lang);
  const categories = new Set<string>();
  posts.map((post) => {
    typeof post.category === 'string' && categories.add(post.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      posts.filter((post) => typeof post.category === 'string' && category === post.category.toLowerCase()),
      {
        params: { category: category, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }, lang : string) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts(lang);
  const tags = new Set<string>();
  posts.map((post) => {
    Array.isArray(post.tags) && post.tags.map((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags).flatMap((tag) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, store: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag },
      }
    )
  );
};

/** */
export function getRelatedPosts(allPosts: NormalizedPost[], currentSlug: string, currentTags: string[]) {
  if (!isBlogEnabled || !isRelatedPostsEnabled) return [];

  const relatedPosts = getRandomizedPosts(
    allPosts.filter((post) => post.slug !== currentSlug && post.tags?.some((tag) => currentTags.includes(tag))),
    APP_BLOG.relatedPostsCount
  );

  if (relatedPosts.length < APP_BLOG.relatedPostsCount) {
    const morePosts = getRandomizedPosts(
      allPosts.filter((post) => post.slug !== currentSlug && !post.tags?.some((tag) => currentTags.includes(tag))),
      APP_BLOG.relatedPostsCount - relatedPosts.length
    );
    relatedPosts.push(...morePosts);
  }

  return relatedPosts;
}
