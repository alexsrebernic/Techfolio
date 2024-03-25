export default `query Project {
  projects {
    nodes {
      projectItem {
        content
        description
        name
        tags
        type
        thumbnail {
          node {
            link
            mediaItemUrl
            srcSet(size: LARGE)
            sourceUrl(size: LARGE)
          }
        }
        url {
          url
        }
      }
      slug
    }
  }
}`
