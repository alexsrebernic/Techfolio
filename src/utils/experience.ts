import { wpquery } from "@/data/wordpress";
import type Experience from "@/interfaces/Experience";
import type NormalizedExperience from "@/interfaces/NormalizedExperience";
import ExperienceQuery from "@/graphql/JobExperienceQuery";
import searchPropsEndingWithLang from "@/helpers/searchPropsEndingWith";
import type { ui } from "@/i18n/ui";
import { I18N } from "./config";

let _experiences  : NormalizedExperience[];

export async function fetchExperiences(lang : string){
  if (!_experiences) {
    _experiences = await load(lang);
  }
  return _experiences;
}
export async function load (lang : string){
  const data = (await wpquery({query: ExperienceQuery})).jobExperiences.edges.map(item => item.node.experienceItem)
  const normalizedExperience = data.map(experience =>  getNormalizedExperience(experience,lang));
  return normalizedExperience
}
export  function getNormalizedExperience (testimonial : Experience, lang : string = I18N.language) : NormalizedExperience | {} {
  const translatedExperience = searchPropsEndingWithLang(testimonial,lang, I18N.languages)
  return translatedExperience;
}
