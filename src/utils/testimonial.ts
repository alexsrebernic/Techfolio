import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Testimonial, LocalizedTestimonial } from '~/types';
import { I18N } from '~/utils/config';
import { cleanSlug } from './permalinks';


const getNormalizedPost = async (post: CollectionEntry<'testimonials'>): Promise<Testimonial> => {
  const { id, slug: rawSlug = '', data } = post;

  const {
    name,
    position,
    project,
    testimonial,
    photo
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());

  return {
    slug: slug,
    name,
    position,
    project,
    testimonial,
    photo
  };
};

const load = async function (): Promise<Testimonial[]> {
  const posts = await getCollection('testimonials');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))


  return results;
};

let _testimonials: Testimonial[];
let _localizedTestimonials : Array<LocalizedTestimonial>;

/** */
export const fetchLocalizedTestimonials = async (): Promise<Array<LocalizedTestimonial>> => {
  if (!_testimonials) {
    _testimonials = await load();

    const common_slugs = [...new Set(_testimonials.map((post) => post.slug.split('/')[1]))];
    _localizedTestimonials = common_slugs.map((id) => {
      const postsLocalizedMap = Object.keys(I18N.locales).reduce((map, locale) => {
        const post = _testimonials.find((post) => post.slug === `${locale}/${id}`);
        map[locale] = post;
        return map;
    }, {});
      return {
        common_slug: id,
        locales: postsLocalizedMap
      }
    });
  }

  return _localizedTestimonials;
};

/** */
export const fetchTestimonials = async (locale: string): Promise<Testimonial[]> => {
  const _localizedTestimonials = await fetchLocalizedTestimonials();
  return _localizedTestimonials
    .map((post) => post.locales[locale])
    .filter((post): post is Testimonial => post !== undefined);
};


