export default  `query JobExperiences {
  jobExperiences {
    nodes {
      experience {
        companyName
        content
        details
        endYear
        fieldGroupName
        initYear
        link
        position
        present
        icon {
          node {
            mediaItemUrl
            sourceUrl(size: LARGE)
            srcSet(size: LARGE)
          }
        }
      }
    }
  }
}`
