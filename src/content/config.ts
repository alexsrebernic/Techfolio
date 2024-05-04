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
  type: 'content',
  schema: ({image}) => z.object({
    photo: image(),
    first_name: z.string(),
    last_name: z.string(),
    brief_introduction: z.string(),
    phone_number: z.string(),
    achievements: z.string(),
    slogan: z.string(),
    role: z.string(),
    services: z.array(z.string()),
    tools: z.array(z.string()),
    available_for_work: z.boolean(),
    ubication: z.string(),
    email: z.string(),
    instagram_url: z.string().optional(),
    twitter_url: z.string().optional(),
    facebook_url: z.string().optional(),
    linkedin_url: z.string().optional(),
    github_url: z.string().optional(),
    stackoverflow_url: z.string().optional(),
    twitch_url: z.string().optional(),
    whatsapp_url : z.string().optional(),
    youtube_url: z.string().optional(),
    pinterest_url: z.string().optional(),
  }),
});
const educationCollection = defineCollection({
  type: 'content',
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
  type: 'content',
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
  type: 'content',
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
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),
    metadata: metadataDefinition(),
    thumbnail: image(),
    preview_url: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});
const storeCollection = defineCollection({
  type: 'content',
  schema: ({image}) => z.object({
    metadata: metadataDefinition(),
    thumbnail: image(),
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),
    preview_url: z.string(),
    buy_link: z.string(),
    brief_description: z.string(),
    currency: z.string(),
    price: z.number(),
    name: z.string(),
    category: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
})
export const collections = {
  post: postCollection,
  education: educationCollection,
  experience: experienceCollection,
  testimonials: testimonialCollection,
  projects: projectCollection,
  store: storeCollection,
  author: authorCollection,
};
