export default `query ShopItem {
  shopItems {
    nodes {
      itemShop {
        content
        currency
        link
        name
        price
        thumbnail {
          node {
            mediaItemUrl
            link
            sourceUrl(size: LARGE)
            srcSet(size: LARGE)
          }
        }
        type
        image1 {
          node {
            srcSet(size: LARGE)
            sourceUrl(size: LARGE)
            link
            mediaItemUrl
          }
        }
      }
      slug
    }
  }
}`
