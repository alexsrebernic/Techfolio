
function searchPropsEndingWithLang<T>(obj : T , lang : string, availableLanguages : string[]) : T{
  const result  = {};
  for (const prop in obj) {
      let keepProp = true;
      for (const langSuffix of availableLanguages) {
          if (prop.endsWith('_' + langSuffix) && langSuffix !== lang) {
              keepProp = false;
              break;
          }
      }
      if (keepProp) {
          if(prop.endsWith('_' + lang)) {
            const baseProp = prop.slice(0, -lang.length - 1); // Remove language suffix
            result[baseProp] = obj[prop];
          } else {
            result[prop] = obj[prop];
          }
      }
  }
  return result;
}

export default searchPropsEndingWithLang;
