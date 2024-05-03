import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Author, LocalizedAuthor } from '~/types';
import { I18N } from '~/utils/config';
import { cleanSlug } from './permalinks';


const getNormalizedPost = async (post: CollectionEntry<'author'>): Promise<Author> => {
  const { id, slug: rawSlug = '', data } = post;

  const {
    photo,
  firstName,
  lastName,
  slogan,
  email,
  ubication,
  phonenumber,
  role,
  instagram_url,
  facebook_url,
  twitter_url,
  linkedin_url,
  stackoverflow_url,
  dribbble_url,
  github_url,
  pinterest_url,
  twitch_url,
  youtube_url,
  availableForWork,
  brief_introduction,
  achievements,
  services,
  tools
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());

  return {
    slug: slug,
    photo,
    firstName,
    lastName,
    slogan,
    email,
    ubication,
    phonenumber,
    role,
    instagram_url,
    facebook_url,
    twitter_url,
    linkedin_url,
    stackoverflow_url,
    dribbble_url,
    github_url,
    pinterest_url,
    twitch_url,
    youtube_url,
    availableForWork,
    brief_introduction,
    achievements,
    services,
    tools
  };
};

const load = async function (): Promise<Author[]> {
  const posts = await getCollection('author');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
  console.log(results)


  return results;
};

let _authors: Author[];
let _localizedAuthors : Array<LocalizedAuthor>;

/** */
export const fetchLocalizedAuthors = async (): Promise<Array<LocalizedAuthor>> => {
  if (!_authors) {
    _authors = await load();
    const common_slugs = [...new Set(_authors.map((post) => post.slug.split('/')[1]))];
    _localizedAuthors = common_slugs.map((id) => {
      const postsLocalizedMap = Object.keys(I18N.locales).reduce((map, locale) => {
        const post = _authors.find((post) => post.slug === `${locale}/${id}`);
        map[locale] = post;
        return map;
    }, {});
      return {
        common_slug: id,
        locales: postsLocalizedMap
      }
    });
  }

  return _localizedAuthors;
};

/** */
export const fetchAuthor = async (locale: string): Promise<Author[]> => {
  const _localizedAuthors = await fetchLocalizedAuthors();
  return _localizedAuthors
    .map((post) => post.locales[locale])
    .filter((post): post is Author => post !== undefined);
};


