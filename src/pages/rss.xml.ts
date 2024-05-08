import rss, { getRssString } from '@astrojs/rss';

import { SITE, METADATA, APP_BLOG, I18N } from '~/utils/config';
import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export const GET = async () => {
  if (!APP_BLOG.isEnabled) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  const posts = await fetchPosts(I18N.defaultLocale);
  const rss = await getRssString({
    title: `${SITE.name}’s Blog`,
    description: METADATA?.description || "",
    site: import.meta.env.SITE,

    items: posts.map((post) => ({
      link: getPermalink(post.permalink, 'post'),
      title: post.title,
      description: post.excerpt,
      pubDate: post.publishDate,
    })),
    customData: `<language>${I18N.defaultLocale}</language>`,
    trailingSlash: SITE.trailingSlash,
  });


  return new Response(rss,  {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
