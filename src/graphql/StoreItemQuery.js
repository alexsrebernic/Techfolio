export default `query StoreItem {
  storeItems {
    nodes {
      storeItem {
        brief_description_en
        brief_description_es
        buy_link
        content_en
        content_es
        currency
        description_en
        description_es
        image_1 {
          node {
            mediaItemUrl
          }
        }
        image_2 {
          node {
            mediaItemUrl
          }
        }
        image_3 {
          node {
            mediaItemUrl
          }
        }
        image_4 {
          node {
            mediaItemUrl
          }
        }
        items_en
        items_es
        name_en
        name_es
        preview_link
        price
        thumbnail {
          node {
            mediaItemUrl
          }
        }
        type_en
        type_es
      }
      date
      id
      modified
      slug
      title(format: RENDERED)
    }
  }
}`
