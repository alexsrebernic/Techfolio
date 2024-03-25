export default  `query Author {
  languages {
    nodes {
      languageItem {
        language
        level
      }
    }
  }
  owners {
    edges {
      node {
        author {
          email
          facebookUrl
          fieldGroupName
          githubUrl
          firstName
          instagramUrl
          linkedinUrl
          lastName
          photo {
            node {
              mediaItemUrl
            }
          }
          pinterestUrl
          services
          stackoverflowUrl
          telephoneNumber
          tools
          twitchUrl
          twitterUrl
          whatsappUrl
          youtubeUrl
        }
        content(format: RENDERED)
      }
    }
  }
}`
