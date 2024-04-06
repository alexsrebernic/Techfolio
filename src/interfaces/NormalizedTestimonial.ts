export default interface NormalizedTestimonial {
  name: string,
  position: string,
  project: string,
  testimonial: string,
  photo: {node:{mediaItemUrl: string}},
  linkedin_url: string
}
