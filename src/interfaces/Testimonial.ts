export default interface Testimonial {
  name: string,
  position: string,
  project: string,
  testimonial: string,
  photo: {node:{mediaItemUrl: string}},
  linkedin_url: string
}
