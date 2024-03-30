export default `query StoreItem {
  shopItems {
    nodes {
      title(format: RENDERED)
      slug
      status
      modified
      itemShop {
        type
        price
        overview
        name
        link
        items
        currency
        content
        briefDescription
        image1 {
          node {
            mediaItemUrl
          }
        }
        tags {
          edges {
            node {
              name
              slug
            }
          }
        }
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
        thumbnail {
          node {
            mediaItemUrl
          }
        }
      }
      shopItemId
    }
  }
}`
