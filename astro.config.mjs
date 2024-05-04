import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, squooshImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import tasks from './src/utils/tasks';
import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin } from './src/utils/frontmatter.mjs';
import { ANALYTICS, SITE, I18N } from './src/utils/config.ts';
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import react from "@astrojs/react";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => ANALYTICS.vendors.googleAnalytics.id && ANALYTICS.vendors.googleAnalytics.partytown ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  integrations: [tailwind({
    applyBaseStyles: false
  }), 
  ...(I18N.isEnabled
    ? [
        i18n({
          locales: I18N.locales,
          defaultLocale: I18N.defaultLocale,
          exclude: ["pages/api/**/*", "pages/rss.xml.ts","pages/**/rss.xml.ts"]
        }),
        sitemap({
          i18n: {
            locales: I18N.locales,
            defaultLocale: I18N.defaultLocale,
          },
          filter: filterSitemapByDefaultLocale({ defaultLocale: I18N.defaultLocale }),
        }),
      ]
    : [
        sitemap({}),
      ]),
  , mdx(), icon({
    iconDir: "src/assets/icons",
    include: {
      tabler: ['*'],
      'flat-color-icons': ['template', 'gallery', 'approval', 'document', 'advertising', 'currency-exchange', 'voice-presentation', 'business-contact', 'database']
    },
    iconDir: "src/assets/icons"
  }), ...whenExternalScripts(() => partytown({
    config: {
      forward: ['dataLayer.push']
    }
  })), compress({
    CSS: true,
    HTML: {
      'html-minifier-terser': {
        removeAttributeQuotes: false
      }
    },
    Image: false,
    JavaScript: true,
    SVG: false,
    Logger: 1
  }), tasks(), react()],
  image: {
    service: squooshImageService()
  },
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin]
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  }
});
