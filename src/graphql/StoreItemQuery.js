export default `query StoreItem {
  shopItems {
    nodes {
      id
      slug
      status
      title(format: RENDERED)
      link
      modified
      date
      itemShop {
        briefDescription
        content
        currency
        items
        link
        name
        price
        type
        image1 {
          node {
            mediaItemUrl
          }
        }
        image2 {
          node {
            mediaItemUrl
          }
        }
        image3 {
          node {
            mediaItemUrl
          }
        }
        image4 {
          node {
            mediaItemUrl
          }
        }
        thumbnail {
          node {
            mediaItemUrl
          }
        }
        description
      }
    }
  }
}`
