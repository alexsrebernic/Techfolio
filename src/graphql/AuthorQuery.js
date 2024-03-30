export default  `query Owner {
  owners {
    edges {
      node {
        author {
          availableForWork
          briefIntroduction
          currentSituation
          email
          facebookUrl
          fieldGroupName
          firstName
          githubUrl
          instagramUrl
          lastName
          linkedinUrl
          pinterestUrl
          role
          services
          stackoverflowUrl
          phonenumber
          tools
          twitchUrl
          twitterUrl
          whatsappUrl
          youtubeUrl
          photo {
            node {
              slug
              sourceUrl(size: LARGE)
              srcSet(size: LARGE)
              mediaItemUrl
            }
          }
          ubication
          slogan
        }
      }
    }
  }
}`
