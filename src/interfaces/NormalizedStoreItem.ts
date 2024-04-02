import type { MetaData } from "@/types";

export default interface NormalizedStoreItem {
  name: string,
  type: string,
  price: number,
  currency: string,
  content: string,
  link: string,
  slug: string,
  excerpt: string,
  title: string,
  status: string,
  date: Date,
  id: string,
  thumbnail: {node:{mediaItemUrl: string}},
  modified: Date,
  permalink: string;
  publishDate: Date;
  updateDate?: Date;
  image?: ImageMetadata | string;
  category?: string;
  tags?: Array<string>;
  author?: string;
  metadata?: MetaData;
  draft?: boolean;
  readingTime?: string;
}
