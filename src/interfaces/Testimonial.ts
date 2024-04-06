export default interface Testimonial {
  name: string,
  position_en: string,
  position_es: string,
  project: string,
  testimonial_en: string,
  testimonial_es: string,
  photo: {node:{mediaItemUrl: string}},
  linkedin_url: string
}
