import type Author from "./Author";

export default interface Post {
  title: string,
  featuredImage: string,
  slug : string,
  status: string,
  excerpt: string,
  content: string,
  date: Date,
  tags: string[],
  categories: string[],
  readingTime : string,
  id: string,
  author: Author,
  draft: boolean,
  modified: Date,

}
