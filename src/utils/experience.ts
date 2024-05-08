import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Experience, LocalizedExperience } from '~/types';
import { I18N } from '~/utils/config';
import { cleanSlug } from './permalinks';


const getNormalizedPost = async (post: CollectionEntry<'experience'>): Promise<Experience> => {
  const { id, slug: rawSlug = '', data } = post;

  const {
  init_year,
  end_year,
  position,
  company,
  details,
  present = false,
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());

  return {
    id,
    slug: slug,
    init_year,
    end_year,
    position,
    company,
    details,
    present ,
  };
};

const load = async function (): Promise<Experience[]> {
  const posts = await getCollection('experience');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))


  return results;
};

let _experiences: Experience[];
let _localizedExperiences : Array<LocalizedExperience>;

/** */
export const fetchLocalizedExperiences = async (): Promise<Array<LocalizedExperience>> => {
  if (!_experiences) {
    _experiences = await load();

    const common_slugs = [...new Set(_experiences.map((post) => post.slug.split('/')[1]))];
    _localizedExperiences = common_slugs.map((id) => {
      const postsLocalizedMap = Object.keys(I18N.locales).reduce((map, locale) => {
        const post = _experiences.find((post) => post.slug === `${locale}/${id}`);
        map[locale] = post;
        return map;
    }, {});
      return {
        common_slug: id,
        locales: postsLocalizedMap
      }
    });
  }

  return _localizedExperiences;
};

/** */
export const fetchExperiences = async (locale: string): Promise<Experience[]> => {
  const _localizedExperiences = await fetchLocalizedExperiences();
  return _localizedExperiences
    .map((post) => post.locales[locale])
    .filter((post): post is Experience => post !== undefined);
};


