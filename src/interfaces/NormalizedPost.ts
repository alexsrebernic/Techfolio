import type { Metadata } from "sharp";

export default interface NormalizedPost {
  id: string;
  slug: string;
  permalink: string;
  publishDate: Date;
  updateDate?: Date;
  title: string;
  excerpt?: string;
  image?: ImageMetadata | string;
  category?: string;
  tags?: Array<string>;
  author?: string;
  metadata?: Metadata;
  draft?: boolean;
  content?: string;
  readingTime?: string;
}
