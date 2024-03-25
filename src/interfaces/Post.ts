export default interface Post {
  name: string,
  type: string,
  thumbnail: string,
  tags: string[],
  content: string,
  published_date: Date,
}
