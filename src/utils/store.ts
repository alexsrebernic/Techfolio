import type { PaginateFunction } from 'astro';
import { I18N } from '@/utils/config';
import type NormalizedStoreItem from '@/interfaces/NormalizedStoreItem';
import type StoreItem from '@/interfaces/StoreItem';
import { APP_STORE } from '@/utils/config';
import { cleanSlug, trimSlash, STORE_BASE, STORE_ITEM_PERMALINK_PATTERN, CATEGORY_STORE_BASE, TAG_STORE_BASE } from './permalinks';
import { wpquery } from '@/data/wordpress';
import StoreItemQuery from '@/graphql/StoreItemQuery';
import parseHTMLToListObjects from '@/helpers/parseHTMLToObject';
import searchPropsEndingWithLang from '@/helpers/searchPropsEndingWith';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = STORE_ITEM_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedStoreItem = async (storeItem: StoreItem, lang : string = I18N.language): Promise<NormalizedStoreItem>  => {
  const storeItemTranslated : StoreItem = searchPropsEndingWithLang<StoreItem>(storeItem,lang,I18N.languages)
  const _data = {
    publishDate: storeItemTranslated.date,
    updateDate: storeItemTranslated.modified,
    title: storeItemTranslated.name,
    image: storeItemTranslated.thumbnail.node.mediaItemUrl,
    tags: [storeItemTranslated.type],
    draft: storeItemTranslated.draft,
    price: storeItemTranslated.price,
    metadata: null,
  }
  const _storeItem = {
    data: _data,
    body: storeItemTranslated.content,
    collection: 'storeItem',
    id: storeItem.id,
    slug: storeItem.slug,
  }
  const { id, slug: rawSlug = '', data } = _storeItem;

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    image,
    tags: rawTags = [],
    draft = false,
    metadata = {},
    price = 0,
  } = data;

  const slug = cleanSlug(rawSlug); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const tags = rawTags.map((tag: string) => cleanSlug(tag));
  return {
    type: storeItemTranslated.type,
    status: storeItemTranslated.status,
    brief_description: storeItemTranslated.brief_description,
    date: storeItemTranslated.date,
    modified: storeItemTranslated.modified,
    name: storeItemTranslated.name,
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: '' }),
    price,
    publishDate: publishDate,
    updateDate: updateDate,
    title: title,
    image: image,
    currency: storeItem.currency,
    items: storeItemTranslated.items ? storeItemTranslated.items.split('\r\n') : [],
    image_1: storeItemTranslated.image_1 ? storeItemTranslated.image_1.node.mediaItemUrl : null,
    image_2: storeItemTranslated.image_2 ? storeItemTranslated.image_2.node.mediaItemUrl : null,
    image_3: storeItemTranslated.image_3 ? storeItemTranslated.image_3.node.mediaItemUrl : null,
    image_4: storeItemTranslated.image_4 ? storeItemTranslated.image_4.node.mediaItemUrl : null,
    preview_url: storeItemTranslated.preview_link,
    buy_url: storeItem.buy_link, 
    tags: tags,
    content: storeItemTranslated.content && parseHTMLToListObjects(storeItemTranslated.content) ,
    draft: draft,
    description: storeItemTranslated.description,
    metadata,
  };

};

const getRandomizedStoreItems = (array: NormalizedStoreItem[], num: number) => {
  const newArray: NormalizedStoreItem[] = [];

  while (newArray.length < num && array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length);
    newArray.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }

  return newArray;
};

const load = async function (lang : string): Promise<Array<NormalizedStoreItem>> {
  const storeItems = (await wpquery({query : StoreItemQuery})).storeItems.nodes.map(item => {
    return {
          ...item.storeItem,
          slug: item.slug,
          status: item.status,
          title: item.title,
          modified: item.modified,
          date: item.date
    };
  }); 
  const normalizedStoreItems = storeItems.map(async (storeItem) => await getNormalizedStoreItem(storeItem,lang));

  const results = (await Promise.all(normalizedStoreItems))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((storeItem) => !storeItem.draft);

  return results;
};

let _storeItems: Array<NormalizedStoreItem>;

/** */
export const isWordpressEnabled = APP_STORE.isWordpressEnabled;
export const isBlogEnabled = APP_STORE.isEnabled;
export const isRelatedStoreItemsEnabled = APP_STORE.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_STORE.list.isEnabled;
export const isBlogNormalizedStoreItemRouteEnabled = APP_STORE.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_STORE.category.isEnabled;
export const isBlogTagRouteEnabled = APP_STORE.tag.isEnabled;

export const storeListRobots = APP_STORE.list.robots;
export const storeNormalizedStoreItemRobots = APP_STORE.post.robots;
export const storeCategoryRobots = APP_STORE.category.robots;
export const storeTagRobots = APP_STORE.tag.robots;

export const storeStoreItemsPerPage = APP_STORE?.postsPerPage;

/** */
export const fetchStoreItems = async (lang : string): Promise<Array<NormalizedStoreItem>> => {
  if (!_storeItems) {
    _storeItems = await load(lang);
  }

  return _storeItems;
};

/** */
export const findStoreItemsBySlugs = async (slugs: Array<string>, lang: string): Promise<Array<NormalizedStoreItem>> => {
  if (!Array.isArray(slugs)) return [];

  const storeItems = await fetchStoreItems(lang);

  return slugs.reduce(function (r: Array<NormalizedStoreItem>, slug: string) {
    storeItems.some(function (storeItem: NormalizedStoreItem) {
      return slug === storeItem.slug && r.push(storeItem);
    });
    return r;
  }, []);
};

/** */
export const findStoreItemsByIds = async (ids: Array<string>, lang: string): Promise<Array<NormalizedStoreItem>> => {
  if (!Array.isArray(ids)) return [];

  const storeItems = await fetchStoreItems(lang);

  return ids.reduce(function (r: Array<NormalizedStoreItem>, id: string) {
    storeItems.some(function (storeItem: NormalizedStoreItem) {
      return id === storeItem.id && r.push(storeItem);
    });
    return r;
  }, []);
};

/** */
export const findLatestStoreItems = async ({ count }: { count?: number } , lang : string): Promise<Array<NormalizedStoreItem>> => {
  const _count = count || 4;
  const storeItems = await fetchStoreItems(lang);

  return storeItems ? storeItems.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate } : { paginate: PaginateFunction }, lang : string ) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchStoreItems(lang), {
    params: { store: STORE_BASE || undefined },
    pageSize: storeStoreItemsPerPage,
  });
};

/** */
export const getStaticPathsBlogNormalizedStoreItem = async (lang: string) => {
  if (!isBlogEnabled || !isBlogNormalizedStoreItemRouteEnabled) return [];
  return (await fetchStoreItems(lang)).flatMap((storeItem) => ({
    params: {
      store: storeItem.permalink,
    },
    props: { storeItem },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate } : { paginate: PaginateFunction }, lang : string) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const storeItems = await fetchStoreItems(lang);
  const categories = new Set<string>();
  storeItems.map((storeItem) => {
    typeof storeItem.category === 'string' && categories.add(storeItem.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category) =>
    paginate(
      storeItems.filter((storeItem) => typeof storeItem.category === 'string' && category === storeItem.category.toLowerCase()),
      {
        params: { category: category, store: CATEGORY_STORE_BASE || undefined },
        pageSize: storeStoreItemsPerPage,
        props: { category },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate } : { paginate: PaginateFunction }, lang : string) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const storeItems = await fetchStoreItems(lang);
  const tags = new Set<string>();
  storeItems.map((storeItem) => {
    Array.isArray(storeItem.tags) && storeItem.tags.map((tag) => tags.add(tag.toLowerCase()));
  });
  return Array.from(tags).flatMap((tag) =>
    paginate(
      storeItems.filter((storeItem) => Array.isArray(storeItem.tags) && storeItem.tags.find((elem) => elem.toLowerCase() === tag)),
      {
        params: { tag: tag, store: TAG_STORE_BASE || undefined },
        pageSize: storeStoreItemsPerPage,
        props: { tag },
      }
    )
  );
};

/** */
export function getRelatedStoreItems(allStoreItems: NormalizedStoreItem[], currentSlug: string, currentTags: string[]) {
  if (!isBlogEnabled || !isRelatedStoreItemsEnabled) return [];

  const relatedStoreItems = getRandomizedStoreItems(
    allStoreItems.filter((storeItem) => storeItem.slug !== currentSlug && storeItem.tags?.some((tag) => currentTags.includes(tag))),
    APP_STORE.relatedPostsCount
  );

  if (relatedStoreItems.length < APP_STORE.relatedPostsCount) {
    const moreStoreItems = getRandomizedStoreItems(
      allStoreItems.filter((storeItem) => storeItem.slug !== currentSlug && !storeItem.tags?.some((tag) => currentTags.includes(tag))),
      APP_STORE.relatedPostsCount - relatedStoreItems.length
    );
    relatedStoreItems.push(...moreStoreItems);
  }

  return relatedStoreItems;
}
