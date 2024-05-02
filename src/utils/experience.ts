import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Experience, LocalizedExperience } from '~/types';
import { I18N } from '~/utils/config';
import { cleanSlug } from './permalinks';


const getNormalizedPost = async (post: CollectionEntry<'experience'>): Promise<Experience> => {
  const { id, slug: rawSlug = '', data } = post;

  const {
    initYear,
  endYear,
  position,
  companyName,
  details,
  link,
  present,
  content,
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());

  return {
    slug: slug,
    companyName,
    initYear,
    endYear,
    position,
    details,
    link,
    present,
    content,
  };
};

const load = async function (): Promise<Experience[]> {
  const posts = await getCollection('experience');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))


  return results;
};

let _educations: Experience[];
let _localizedEducations : Array<LocalizedExperience>;

/** */
export const fetchLocalizedEducations = async (): Promise<Array<LocalizedExperience>> => {
  if (!_educations) {
    _educations = await load();

    const common_slugs = [...new Set(_educations.map((post) => post.slug.split('/')[1]))];
    _localizedEducations = common_slugs.map((id) => {
      const postsLocalizedMap = Object.keys(I18N.locales).reduce((map, locale) => {
        const post = _educations.find((post) => post.slug === `${locale}/${id}`);
        map[locale] = post;
        return map;
    }, {});
      return {
        common_slug: id,
        locales: postsLocalizedMap
      }
    });
  }

  return _localizedEducations;
};

/** */
export const fetchEducations = async (locale: string): Promise<Experience[]> => {
  const _localizedEducations = await fetchLocalizedEducations();
  return _localizedEducations
    .map((post) => post.locales[locale])
    .filter((post): post is Experience => post !== undefined);
};


