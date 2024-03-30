export default  `query JobExperiences {
  jobExperiences {
    edges {
      node {
        experienceItem {
          companyName
          content
          details
          endYear
          fieldGroupName
          icon {
            node {
              mediaItemUrl
              slug
              sourceUrl
            }
          }
          initYear
          link
          position
          present
        }
      }
    }
  }
}`
