export default `query Testimonial {
  testimonials {
    nodes {
      testimonialItem {
        linkedinUrl
        name
        position
        project
        testimonial
        photo {
          node {
            sourceUrl(size: LARGE)
            srcSet(size: LARGE)
            mediaItemUrl
            link
          }
        }
      }
      slug
    }
  }
}`
