export default  `query NewQuery {
  jobExperiences {
    edges {
      node {
        experienceItem {
          details_es
          details_en
          companyName
          endYear
          initYear
          position_en
          position_es
          present
        }
      }
    }
  }
}`
