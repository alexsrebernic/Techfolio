export default `query Project {
  projects {
    nodes {
      projectItem {
        background
        conclusion
        description
        endYear
        goals
        initYear
        name
        role
        solutions
        tags
        present
        tools
        type
        image1 {
          node {
            mediaItemUrl
          }
        }
        thumbnail {
          node {
            mediaItemUrl
          }
        }
        testimonial {
          edges {
            node {
              ... on Testimonial {
                id
                testimonialItem {
                  fieldGroupName
                  linkedinUrl
                  name
                  position
                  project
                  testimonial
                  photo {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
        url {
          title
          url
        }
      }
      slug
      status
      title(format: RENDERED)
      modified
      date
      id
    }
  }
}`
