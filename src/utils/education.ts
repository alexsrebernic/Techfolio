import { wpquery } from "@/data/wordpress";
import type Education from "@/interfaces/Education";
import type NormalizedEducation from "@/interfaces/NormalizedEducation";
import EducationQuery from "@/graphql/EducationQuery";
import searchPropsEndingWithLang from "@/helpers/searchPropsEndingWith";
import type { ui } from "@/i18n/ui";
import { I18N } from "./config";

let _educations  : NormalizedEducation[];

export async function fetchEducations(lang : string){
  if (!_educations) {
    _educations = await load(lang);
  }
  return _educations;
}
export async function load (lang : string){
  const educations = (await wpquery({query: EducationQuery})).educations.edges.map(item => item.node.educationItem)
  const normalizeEducation = educations.map(education =>  getNormalizedEducations(education,lang));
  return normalizeEducation
}
export  function getNormalizedEducations (education : Education, lang : string = I18N.language) : NormalizedEducation | {} {
  const translatedEducation = searchPropsEndingWithLang(education,lang, I18N.languages)
  return translatedEducation;
}
