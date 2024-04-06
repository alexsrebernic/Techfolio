import { wpquery } from "@/data/wordpress";
import type Testimonial from "@/interfaces/Testimonial";
import type NormalizedTestimonial from "@/interfaces/NormalizedTestimonial";
import TestimonialQuery from "@/graphql/TestimonialQuery";
import searchPropsEndingWithLang from "@/helpers/searchPropsEndingWith";
import type { ui } from "@/i18n/ui";
import { I18N } from "./config";

let _testimonials  : NormalizedTestimonial[];

export async function fetchTestimonials(lang : string){
  if(!_testimonials) return await load(lang);
  return _testimonials;
}
export async function load (lang : string){
  const data = (await wpquery({query: TestimonialQuery})).testimonials.nodes.map(testimonial => {
    return {
          ...testimonial.testimonialItem,
          slug: testimonial.slug
  }
  })
  const normalizedTestimonials = data.map(testimonial =>  getNormalizedTestimonial(testimonial,lang));
  return normalizedTestimonials
}
export  function getNormalizedTestimonial (testimonial : Testimonial, lang : string = I18N.language) : NormalizedTestimonial | {} {
  const translatedTestimonial = searchPropsEndingWithLang(testimonial,lang, I18N.languages)
  translatedTestimonial.photo = translatedTestimonial.photo.node.mediaItemUrl
  return translatedTestimonial;
}
