import { imageConfig } from 'astro:assets';
import { z, defineCollection, reference } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();
const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});
const authorCollection = defineCollection({
  type: 'data',
  schema: ({image}) => z.object({
    photo: image(),
    first_name: z.string(),
    last_name: z.string(),
    brief_introduction: z.string(),
    achievements: z.string(),
    slogan: z.string(),
    role: z.string(),
    services: z.array(z.string()),
    tools: z.array(z.string()),
    available_for_work: z.boolean(),
    ubication: z.string(),
    email: z.string(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    stackoverflow: z.string().optional(),
    twitch: z.string().optional(),
    whatsapp : z.string().optional(),
    youtube: z.string().optional(),
    pinterest: z.string().optional(),
  }),
});
const educationCollection = defineCollection({
  type: 'data',
  schema: ({image}) => z.object({
    init_year: z.date(),
    end_year: z.date().optional(),
    present: z.boolean().optional(),
    degree: z.string(),
    establishment: z.string(),
    details: z.string(),
    certification: image()
  }),
});
const experienceCollection = defineCollection({
  type: 'data',
  schema: z.object({
    init_year: z.date(),
    end_year: z.date().optional(),
    present: z.boolean().optional(),
    company: z.string(),
    position: z.string(),
    details: z.string(),
  }),
});
const testimonialCollection = defineCollection({
  type: 'data',
  schema: ({image}) => z.object({
    name: z.string(),
    position: z.string(),
    project: z.string(),
    testimonial: z.string(),
    photo: image(),
  }),
});
const projectCollection = defineCollection({
  type: 'content',
  schema: ({image}) => z.object({
    thumbnail: image(),
    preview_url: z.string(),
    name: z.string(),
    type: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});
const storeCollection = defineCollection({
  type: 'content',
  schema: ({image}) => z.object({
    thumbnail: image(),
    preview_url: z.string(),
    buy_link: z.string(),
    brief_description: z.string(),
    currency: z.string(),
    price: z.number(),
    name: z.string(),
    type: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
})
export const collections = {
  post: postCollection,
  educations: educationCollection,
  experiences: experienceCollection,
  testimonials: testimonialCollection,
  projects: projectCollection,
  store: storeCollection,
  author: authorCollection,
};
