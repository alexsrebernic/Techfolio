function parseHTMLToListObjects(html) {
  const regex = /<li[^>]*>(.*?)<\/li>/gs;
  const items = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const listItemHTML = match[1].trim(); // Content inside <li> tag
    const titleRegex = /<strong>(.*?)<\/strong>/;
    const titleMatch = titleRegex.exec(listItemHTML);
    if (titleMatch) {
      const title = titleMatch[1].trim();

      // Extract the paragraph after the title
      let paragraph = listItemHTML.replace(/<[^>]*>/g, '').replace(titleMatch[0], '').trim();

      // Remove unwanted characters like '&#8217;'
      paragraph = paragraph.replace(/&#?\w+;/g, '');

      const nestedListRegex = /<ul[^>]*>(.*?)<\/ul>/gs;
      const nestedListMatch = nestedListRegex.exec(listItemHTML);
      if (nestedListMatch) {
        const nestedListHTML = nestedListMatch[0];
        const nestedItems = parseHTMLToListObjects(nestedListHTML);
        items.push({ title, items: nestedItems });
      } else {
        // Split the paragraph into separate items if "Blog" is present
        if (title.toLowerCase() === 'blog') {
          const blogItems = paragraph.split(/\n(?=\w+:)/).map(item => {
            const [blogTitle, blogContent] = item.split(/:(.+)/);
            return { title: blogTitle.trim(), paragraph: blogContent.trim() };
          });
          items.push(...blogItems);
        } else {
          items.push({ title, paragraph });
        }
      }
    }
  }
  return items;
}

export default parseHTMLToListObjects
