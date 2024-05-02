import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { HTMLAttributes, ImageMetadata } from 'astro/types';

export interface Post {
  /** A unique ID number that identifies a post. */
  id: string;

  /** A post’s unique slug – part of the post’s URL based on its name, i.e. a post called “My Sample Page” has a slug “my-sample-page”. */
  slug: string;

  /**  */
  permalink: string;

  /**  */
  publishDate: Date;
  /**  */
  updateDate?: Date;

  /**  */
  title: string;
  /** Optional summary of post content. */
  excerpt?: string;
  /**  */
  image?: string;

  /**  */
  category?: string;
  /**  */
  tags?: Array<string>;
  /**  */
  author?: string;

  /**  */
  metadata?: MetaData;

  /**  */
  draft?: boolean;

  /**  */
  Content?: unknown;
  content?: string;

  /**  */
  readingTime?: number;
}


export interface LocalizedPost {
  common_slug: string;
  locales: {
    [locale: string]: Post;
  };
}
export  interface Author  {
  slug: string,
  photo: string ,
  firstName: string ,
  lastName: string ,
  slogan : string,
  email: string ,
  ubication: string ,
  phonenumber: string,
  role: string ,
  instagram_url?: string | null,
  facebook_url?: string | null,
  twitter_url?: string | null,
  linkedin_url?: string | null,
  stackoverflow_url?: string | null,
  dribbble_url?: string | null,
  github_url?: string | null,
  pinterest_url?: string | null,
  twitch_url?: string | null,
  youtube_url?: string | null,
  availableForWork?: boolean | null,
  brief_introduction?: string | null,
  achievements?: string | null,
  services?: string[] | null,
  tools?: string[] | null
}
export  interface LocalizedAuthor  {
  common_slug: string;
  locales: {
    [locale: string]: Author;
  };
}
export  interface Testimonial {
  slug:string,
  name: string,
  position: string,
  project: string,
  testimonial: string,
  photo: string
}
export  interface LocalizedTestimonial {
  common_slug: string;
  locales: {
    [locale: string]: Testimonial;
  };
}
export  interface Experience {
  slug:string,
  initYear: Date,
  endYear: Date,
  position: string,
  companyName: string,
  details: string,
  link: string,
  present: boolean,
  content: string,
}
export  interface LocalizedExperience {
  common_slug: string;
  locales: {
    [locale: string]: LocalizedExperience;
  };
}
export  interface Education {
  degree: string,
  establishment: string,
  initYear: Date,
  endYear: Date,
  position: string,
  details: string,
  link: string,
  present: boolean,
  content: string,
}
export  interface LocalizedEducation {
  common_slug: string;
  locales: {
    [locale: string]: Education;
  };
}
export  interface Project {
  name: string,
  type: string,
  thumbnail: string,
  image1 : string,
  content: string,
  slug:string,
  preview_url: string,
  excerpt: string,
  id: string,
  title: string,
  status: string,
  date: Date,
  draft: boolean,
  modified: Date,
  tags: string[],
  goals: string,
  tools: string,
  solutions: string,
  background: string ,
  conclusion: string ,
  testimonial : Testimonial,
  role : string ,
  initYear: Date,
  endYear: Date | null, 
  description: string,
  present: boolean | null,
}

export  interface LocalizedProject {
  common_slug: string;
  locales: {
    [locale: string]: Project;
  };
}
export  interface StoreItem {
  name: string,
  type: string,
  thumbnail: string,
  price: number,
  currency: string,
  content: string,
  draft: boolean,
  link: string,
  slug: string,
  brief_description: string,
  items:string ,
  description: string,
  status: string,
  date: Date,
  modified: Date,
  id: string,
  buy_link: string,
  preview_link: string,
  image_1? :  string,
  image_2? : string,
  image_3? : string,
  image_4? : string,

}
export  interface LocalizedStoreItem {
  common_slug: string;
  locales: {
    [locale: string]: StoreItem;
  };
}
export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;

  canonical?: string;

  robots?: MetaDataRobots;

  description?: string;

  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface Image {
  src: string;
  alt?: string;
}

export interface Video {
  src: string;
  type?: string;
}

export interface Widget {
  id?: string;
  isDark?: boolean;
  bg?: string;
  classes?: Record<string, string>;
}

export interface Headline {
  title?: string;
  subtitle?: string;
  tagline?: string;
  classes?: Record<string, string>;
}

interface TeamMember {
  name?: string;
  job?: string;
  image?: Image;
  socials?: Array<Social>;
  description?: string;
  classes?: Record<string, string>;
}

interface Social {
  icon?: string;
  href?: string;
}

export interface Stat {
  amount?: number;
  title?: string;
  icon?: string;
}

export interface Item {
  title?: string;
  description?: string;
  icon?: string;
  classes?: Record<string, string>;
  callToAction?: CallToAction;
  image?: Image;
}

export interface Price {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: number;
  period?: string;
  items?: Array<Item>;
  callToAction?: CallToAction;
  hasRibbon?: boolean;
  ribbonTitle?: string;
}

export interface Testimonial {
  title?: string;
  testimonial?: string;
  name?: string;
  job?: string;
  image?: string | unknown;
}

export interface Input {
  type: HTMLInputTypeAttribute;
  name: string;
  label?: string;
  autocomplete?: string;
  placeholder?: string;
}

export interface Textarea {
  label?: string;
  placeholder?: string;
  rows?: number;
}

export interface Disclaimer {
  label?: string;
}

// COMPONENTS
export interface CallToAction extends HTMLAttributes<a> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: 'button' | 'submit' | 'reset';
}

export interface ItemGrid {
  title? : string;
  items?: Array<Item>;
  columns?: number;
  defaultIcon?: string;
  classes?: Record<string, string>;
}

export interface Collapse {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
  classes?: Record<string, string>;
}

export interface Form {
  inputs?: Array<Input>;
  textarea?: Textarea;
  disclaimer?: Disclaimer;
  button?: string;
  description?: string;
}

// WIDGETS
export interface Hero extends Headline, Widget {
  content?: string;
  image?: string | unknown;
  callToAction1?: CallToAction;
  callToAction2?: CallToAction;
  isReversed?: boolean;
}

export interface Team extends Headline, Widget {
  team?: Array<TeamMember>;
}

export interface Stats extends Headline, Widget {
  stats?: Array<Stat>;
}

export interface Pricing extends Headline, Widget {
  prices?: Array<Price>;
}

export interface Testimonials extends Headline, Widget {
  testimonials?: Array<Testimonial>;
  callToAction?: CallToAction;
}

export interface Brands extends Headline, Widget {
  icons?: Array<string>;
  images?: Array<Image>;
}

export interface Features extends Headline, Widget {
  image?: string | unknown;
  video?: Video;
  items: Array<Item>;
  columns: number;
  defaultIcon?: string;
  callToAction1?: CallToAction;
  callToAction2?: CallToAction;
  isReversed?: boolean;
  isBeforeContent?: boolean;
  isAfterContent?: boolean;
}

export interface Faqs extends Headline, Widget {
  iconUp?: string;
  iconDown?: string;
  items?: Array<Item>;
  columns?: number;
}

export interface Steps extends Headline, Widget {
  items: Array<{
    title: string;
    description?: string;
    icon?: string;
    classes?: Record<string, string>;
  }>;
  callToAction?: string | CallToAction;
  image?: string | Image;
  isReversed?: boolean;
}

export interface Content extends Headline, Widget {
  content?: string;
  image?: string | unknown;
  items?: Array<Item>;
  columns?: number;
  isReversed?: boolean;
  isAfterContent?: boolean;
  callToAction?: CallToAction;
}

export interface Contact extends Headline, Form, Widget {}
