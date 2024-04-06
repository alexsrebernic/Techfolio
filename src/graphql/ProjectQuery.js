export default `query Project {
  projects {
    nodes {
      date
      id
      modified
      slug
      title(format: RENDERED)
      projectItem {
        background_en
        background_es
        conclusion_en
        conclusion_es
        description_en
        description_es
        endYear
        goals_en
        goals_es
        initYear
        name_es
        name_en
        present
        role_en
        role_es
        solutions_es
        solutions_en
        tags_en
        tags_es
        tools_en
        tools_es
        type_en
        type_es
        image1 {
          node {
            mediaItemUrl
          }
        }
        preview_url {
          url
        }
        testimonial {
          edges {
            node {
              ... on Testimonial {
                id
                testimonialItem {
                  linkedinUrl
                  name
                  photo {
                    node {
                      mediaItemUrl
                    }
                  }
                  position_en
                  position_es
                  project
                  testimonial_en
                  testimonial_es
                }
                title(format: RENDERED)
              }
            }
          }
        }
        thumbnail {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}`
