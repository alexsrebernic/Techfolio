import { wpquery } from "@/data/wordpress";
import type Author from "@/interfaces/Author";
import type NormalizedAuthor from "@/interfaces/NormalizedAuthor";
import AuthorQuery from "@/graphql/AuthorQuery";
import searchPropsEndingWithLang from "@/helpers/searchPropsEndingWith";
import { I18N } from "./config";

let _author  : NormalizedAuthor[];

export async function fetchAuthor(lang : string){
  if(!_author) return await load(lang);
  return _author;
}
export async function load (lang : string ){
  const data = (await wpquery({query: AuthorQuery})).owners.nodes
  const NormalizedAuthor = data.map(author =>  getNormalizedAuthor(author,lang));
  return NormalizedAuthor[0]
}
export  function getNormalizedAuthor (author : Author, lang : string = I18N.language) : NormalizedAuthor | {} {
  const translatedAuthor = searchPropsEndingWithLang<Author>(author.author,lang, I18N.languages)
  translatedAuthor.photo = translatedAuthor.photo.node.mediaItemUrl
  return translatedAuthor;
}
