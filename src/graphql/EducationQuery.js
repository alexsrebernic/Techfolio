export default  `query NewQuery {
  educations {
    edges {
      node {
        educationItem {
          degree_en
          degree_es
          details_en
          details_es
          endYear
          establishment
          present
          initYear
          fieldGroupName
          certificationdegree {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}`
