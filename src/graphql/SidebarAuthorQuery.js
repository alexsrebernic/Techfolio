export default  `query Author {
  owners {
    edges {
      node {
        author {
          role
          email
          facebookUrl
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
          stackoverflowUrl
          twitchUrl
          twitterUrl
          whatsappUrl
          youtubeUrl
        }
      }
    }
  }
}`
