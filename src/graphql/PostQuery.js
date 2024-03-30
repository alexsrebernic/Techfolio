export default `query Post {
  posts {
    nodes {
      content(format: RENDERED)
      date
      featuredImage {
        node {
          mediaItemUrl
          srcSet(size: MEDIUM)
          slug
          sizes(size: THUMBNAIL)
          status
          altText
          modified
        }
      }
      modified
      link
      slug
      status
      title(format: RENDERED)
      excerpt(format: RENDERED)
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
      id
      author {
        node {
          avatar {
            url
          }
          email
          firstName
          lastName
          name
          username
        }
      }
      readingTime
    }
  }
}`
