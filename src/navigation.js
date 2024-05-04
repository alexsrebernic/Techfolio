import { getLocalizedPermalink, getLocalizedBlogPermalink, getAsset } from './utils/permalinks';
import { useTranslations } from '~/i18n/translator';

export const getHeaderData = (locale) => {
  const { t } = useTranslations(locale);
  return {
    links: [
      {
        text: t('sidebar.home'),
        href: getLocalizedPermalink('/'),
        icon: 'home',
      },
      {
        text: t('sidebar.about'),
        href: getLocalizedPermalink('/about'),
        icon: 'about',
      },
      {
        text: t('sidebar.blog'),
        href: getLocalizedPermalink('/blog'),
        icon: 'blog',
      },
      {
        text: t('sidebar.projects'),
        href: getLocalizedPermalink('/projects'),
        icon: 'projects',
      },
      {
        text: t('sidebar.store'),
        href: getLocalizedPermalink('/store'),
        icon: 'store',
      },
      {
        text: t('sidebar.contact'),
        href: getLocalizedPermalink('/contact'),
        icon: 'contact',
      },
    ],
  };
};

export const getFooterData = (locale) => {
  const { t } = useTranslations(locale);
  
  return {
    links: [
      {
        title: t('footer.product.title'),
        links: [
          { text: t('footer.product.features'), href: '#' },
          { text: t('footer.product.security'), href: '#' },
          { text: t('footer.product.team'), href: '#' },
          { text: t('footer.product.enterprise'), href: '#' },
          { text: t('footer.product.customerStories'), href: '#' },
          { text: t('footer.product.pricing'), href: '#' },
          { text: t('footer.product.resources'), href: '#' },
        ],
      },
      {
        title: t('footer.platform.title'),
        links: [
          { text: t('footer.platform.developerAPIs'), href: '#' },
          { text: t('footer.platform.partners'), href: '#' },
          { text: t('footer.platform.atom'), href: '#' },
          { text: t('footer.platform.electron'), href: '#' },
          { text: t('footer.platform.astrowindDesktop'), href: '#' },
        ],
      },
      {
        title: t('footer.support.title'),
        links: [
          { text: t('footer.support.docs'), href: '#' },
          { text: t('footer.support.communityForum'), href: '#' },
          { text: t('footer.support.professionalServices'), href: '#' },
          { text: t('footer.support.skills'), href: '#' },
          { text: t('footer.support.status'), href: '#' },
        ],
      },
      {
        title: t('footer.company.title'),
        links: [
          { text: t('footer.company.about'), href: '#' },
          { text: t('footer.company.blog'), href: '#' },
          { text: t('footer.company.careers'), href: '#' },
          { text: t('footer.company.press'), href: '#' },
          { text: t('footer.company.inclusion'), href: '#' },
          { text: t('footer.company.socialImpact'), href: '#' },
          { text: t('footer.company.shop'), href: '#' },
        ],
      },
    ],
    secondaryLinks: [
      { text: t('footer.legal.terms'), href: getLocalizedPermalink(locale, '/terms') },
      { text: t('footer.legal.privacy'), href: getLocalizedPermalink(locale, '/privacy') },
    ],
    socialLinks: [
      { ariaLabel: 'Twitter', icon: 'tabler:brand-twitter', href: '#' },
      { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
      { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
    ],
    footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://onwidget.com/favicon/favicon-32x32.png)]"></span>
    Made by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://onwidget.com/"> onWidget</a> · All rights reserved.`,
  };
};
