export default  `query JobExperiences {
  educations {
    nodes {
      educationItem {
        companyName
        content
        details
        endYear
        fieldGroupName
        initYear
        position
        present
        icon {
          node {
            sourceUrl(size: LARGE)
            srcSet(size: LARGE)
            mediaItemUrl
          }
        }
      }
      slug
    }
  }
}`
