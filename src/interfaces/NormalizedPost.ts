import type { Metadata } from "sharp";

export default interface NormalizedPost {
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
  image?: ImageMetadata | string;

  /**  */
  category?: string;
  /**  */
  tags?: Array<string>;
  /**  */
  author?: string;

  /**  */
  metadata?: Metadata;

  /**  */
  draft?: boolean;

  /**  */
  content?: string;

  /**  */
  readingTime?: string;
}
