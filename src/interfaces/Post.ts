export default interface Post {
  title: string,
  featuredImage: {node:{mediaItemUrl: string,srcSet: string, sizes: string, altText:string}},
  slug : string,
  status: string,
  excerpt: string,
  content: string,
  date: Date,
  tags: {edges: {node: {name: string}}[]},
  categories: {edges: {node: {name: string}}[]},
  readingTime : string,
  id: string,
  author: {node: {name :string}},
  draft: boolean,
  modified: Date,

}
