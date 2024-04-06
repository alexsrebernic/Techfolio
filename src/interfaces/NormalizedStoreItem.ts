import type { MetaData } from "@/types";

export default interface NormalizedStoreItem {
  name: string,
  type: string,
  price: number,
  currency: string,
  content: string,
  slug: string,
  title: string,
  status: string,
  date: Date,
  id: string,
  image_1: string | null,
  image_2: string | null,
  image_3: string | null,
  image_4: string | null,
  items: string[]
  brief_description: string,
  description: string,
  preview_url: string,
  buy_url: string,
  modified: Date,
  permalink: string;
  publishDate: Date;
  updateDate?: Date;
  image?: ImageMetadata | string;
  category?: string;
  tags?: Array<string>;
  author?: string;
  metadata?: MetaData | null | {};
  draft?: boolean;

}
