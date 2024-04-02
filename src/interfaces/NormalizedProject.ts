import type { Testimonial } from "@/types";
import type { Metadata } from "sharp";

export default interface NormalizedProject {
  name: string,
  type: string,
  thumbnail: {node:{mediaItemUrl: string}},
  content: string,
  slug:string,
  project_url: string,
  excerpt: string,
  id: string,
  title: string,
  status: string,
  date: Date,
  modified: Date,
  permalink: string;
  publishDate: Date;
  updateDate?: Date;
  image?: ImageMetadata | string;
  category?: string;
  tags?: Array<string>;
  author?: string;
  metadata?: Metadata;
  draft?: boolean;
  readingTime?: string;
  image_1: {node:{mediaItemUrl: string,srcSet: string, sizes: string, altText:string}},
  tools: string[],
  goals: string[],
  solutions: string[],
  background: string ,
  conclusion: string ,
  testimonial : Testimonial,
  role : string ,
  init_year: Date,
  end_year: Date | null, 
  description: string,
  present: boolean | null,
}
