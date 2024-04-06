export default `query Testimonial {
  testimonials {
    nodes {
      testimonialItem {
        linkedinUrl
        name
        position_en
        position_es
        project
        testimonial_en
        testimonial_es
        photo {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}`
