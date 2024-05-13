# 🚀 TechFolio

<img src="https://alexsrebernic.com/assets/techfolio.jpg" align="right" alt="TechFolio Screenshot" width="200" height="200">

🌟 _Crafted for the tech-savvy professionals, TechFolio is your go-to portfolio template for showcasing your skills and projects._ 🌟

**TechFolio** is a responsive, minimalistic, and lightning-fast portfolio template designed specifically for individuals in the tech industry. Whether you're a developer, designer, or any other tech enthusiast, TechFolio has got you covered.

- ✅ **Responsive Design**: Looks great on all devices, ensuring your portfolio shines no matter where it's viewed.
- ✅ **Minimalistic Style**: Clean and clutter-free design focuses attention on your work and accomplishments.
- ✅ **Lightning Fast**: Optimized for speed to ensure swift loading times and smooth browsing experience.
- ✅ **Built-in Blog**: Share your thoughts, insights, and experiences with the world through the integrated blog feature.
- ✅ **Store Integration**: Showcase your products or services effortlessly with the built-in store functionality.
- ✅ **Contact Section**: Allow potential clients or collaborators to get in touch easily through the dedicated contact section.
- ✅ **About Me Section**: Introduce yourself and let visitors know who you are, what you do, and what sets you apart.
- ✅ **Projects Section**: Highlight your projects, past works, or contributions to demonstrate your expertise and creativity.

<br>

<img src="https://alexsrebernic.com/assets/techfolio-2.png" alt="TechFolio Theme Screenshot">

[![Alex Srebernic](https://custom-icon-badges.demolab.com/badge/made%20by%20-Alex-Srebernic-556bf2?style=flat-square&logo=yourlogo&logoColor=white&labelColor=101827)](https://yourwebsite.com)
[![License](https://img.shields.io/github/license/yourusername/techfolio?style=flat-square&color=dddddd&labelColor=000000)](https://github.com/alexsrebernic/techfolio/blob/main/LICENSE.md)
[![Maintained](https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg?style=flat-square)](https://github.com/alexsrebernic)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/alexsrebernic/techfolio#contributing)
[![Stars](https://img.shields.io/github/stars/alexsrebernic/techfolio.svg?style=social&label=stars&maxAge=86400&color=ff69b4)](https://github.com/alexsrebernic/techfolio)
[![Forks](https://img.shields.io/github/forks/alexsrebernic/techfolio.svg?style=social&label=forks&maxAge=86400&color=ff69b4)](https://github.com/alexsrebernic/techfolio)

<br>

<details open>
<summary>Table of Contents</summary>

- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Commands](#commands)
  - [Configuration](#configuration)
  - [Deploy](#deploy)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

</details>

<br>

## Demo

📌 [View Demo](https://alexsrebernic.com/)

<br>

## Getting Started

**TechFolio** empowers tech professionals like you to create an impressive online presence with ease. Whether you're a seasoned veteran or just starting out, TechFolio provides the perfect platform to showcase your talents.

### Project Structure

Here's a glimpse into the structure of TechFolio:

```
.
├── public
└── src
    ├── assets
    │   ├── favicons
    │   ├── icons
    │   │   ├── social-media
    │   │   └── tools
    │   ├── images
    │   └── styles
    ├── components
    │   ├── blog
    │   ├── common
    │   ├── projects
    │   ├── store
    │   ├── ui
    │   └── widgets
    ├── content
    │   ├── author
    │   │   ├── assets
    │   │   ├── en
    │   │   └── es
    │   ├── education
    │   │   ├── en
    │   │   └── es
    │   ├── experience
    │   │   ├── en
    │   │   └── es
    │   ├── post
    │   │   ├── en
    │   │   └── es
    │   ├── projects
    │   │   ├── en
    │   │   └── es
    │   ├── store
    │   │   ├── en
    │   │   └── es
    │   └── testimonials
    │       ├── en
    │       └── es
    ├── helpers
    ├── i18n
    ├── layouts
    ├── pages
    │   ├── [...blog]
    │   │   ├── [category]
    │   │   └── [tag]
    │   ├── [locale]
    │   ├── [...projects]
    │   │   ├── [category]
    │   │   └── [tag]
    │   └── [...store]
    │       ├── [category]
    │       └── [tag]
    └── utils
```

### Commands

Execute these commands from the project root:

| Command               | Action                                             |
| :-------------------- | :------------------------------------------------- |
| `npm install`         | Install dependencies                              |
| `npm run dev`         | Start local development server at `localhost:3000` |
| `npm run build`       | Generate optimized production build to `./dist/`  |
| `npm run preview`     | Preview production build locally before deployment|
| `npm run format`      | Format code using Prettier                         |
| `npm run lint:eslint` | Run ESLint to lint code                            |
| `npm run ...`         | Other Astro CLI commands such as `astro add`, `astro preview`, etc. |


### Configuration

Basic configuration file: `./src/config.yaml`

```yaml
site:
  name: Alex Srebernic | Portfolio
  site: 'https://alexsrebernic.com'
  base: '/'
  trailingSlash: false

  googleSiteVerificationId: orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M

# Default SEO metadata
metadata:
  title:
    default: Alex Srebernic | Portfolio
    template: Alex Srebernic's portfolio
  description: "Alex Srebernic's portfolio."
  robots:
    index: true
    follow: true
  openGraph:
    site_name: Alex Srebernic's portfolio
    images:
      - url: '~/assets/images/techfolio.jpg'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@alexsrebernic'
    site: '@alexsrebernic'
    cardType: summary_large_image

i18n:
  isEnabled: true,
  defaultLocale: es
  prefixDefaultLocale: true
  locales: 
    en: en-US
    es: es-ES
  textDirection: ltr
apps:
  store:
    isEnabled: true
    postsPerPage: 6

    post:
      isEnabled: true
      permalink: 'store/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'store' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'store-category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'store-tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: true

    isRelatedPostsEnabled: true
    relatedPostsCount: 4
    
  projects:
    isEnabled: true
    postsPerPage: 6
    post:
      isEnabled: true
      permalink: 'projects/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'projects' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'projects-category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'projects-tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: true

    isRelatedPostsEnabled: true
    relatedPostsCount: 4
    
  blog:
    isEnabled: true
    postsPerPage: 6

    post:
      isEnabled: true
      permalink: '/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'blog-category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'blog-tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

    isRelatedPostsEnabled: true
    relatedPostsCount: 4

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"

  tokens:
    default:
      fonts:
        sans: Inter
        serif: var(--ph-font-sans)
        heading: var(--ph-font-sans)
      colors:
        default: rgb(16 16 16)
        heading: rgb(0 0 0)
        muted: rgb(40 40 40)
        bgPage: rgb(255 255 255)
        primary: rgb(0 124 220)
        secondary: rgb(30 58 138)
        accent: rgb(109 40 217)
        info: rgb(119 182 234)
        success: rgb(54 211 153)
        warning: rgb(251 189 35)
        error: rgb(248 114 114)
        link: var(--ph-color-primary)
        linkActive: var(--ph-color-link)
    dark:
      fonts: {}
      colors:
        default: rgb(247, 248, 248)
        heading: rgb(247, 248, 248)
        muted: rgb(200, 188, 208)
        bgPage: rgb(3 6 32)
        primary: rgb(29 78 216)
        secondary: rgb(30 58 138)
        accent: rgb(135 77 2267)
        info: rgb(58 191 248)
        success: rgb(54 211 153)
        warning: rgb(251 189 35)
        error: rgb(248 114 114)
        link: var(--ph-color-primary)
        linkActive: var(--ph-color-link)

```


### Deploy

#### Manual Production Deployment

Create an optimized production build with:

```shell
npm run build
```

The generated files will be in the `dist` folder, ready to be deployed to your chosen hosting service.

#### Cloudflare Deployment

Deploy TechFolio to Cloudflare (recommended):

[![Cloudflare Deploy button](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/alexsrebernic/techfolio)


#### Netlify Deployment

Deploy TechFolio to Netlify:

[![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/alexsrebernic/techfolio)

#### Vercel Deployment

Deploy TechFolio to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%alexsrebernic%2Ftechfolio)

<br>

## Contributing

If you have any idea, suggestions or find any bugs, feel free to open a discussion, an issue or create a pull request.
That would be very useful for all of us and we would be happy to listen and take action.

## Acknowledgements

Initially created by [Alex Srebernic](https://alexsrebernic.com) with the template Astrowind made by [onWidget](https://onwidget.com) 

## License

**Techfolio** is licensed under the MIT license — see the [LICENSE](./LICENSE.md) file for details.
