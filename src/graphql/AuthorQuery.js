export default  `query Owner {
  owners {
    nodes {
      author {
        achievements_en
        achievements_es
        availableForWork
        brief_introduction_en
        brief_introduction_es
        email
        facebookUrl
        fieldGroupName
        firstName
        githubUrl
        instagramUrl
        lastName
        linkedinUrl
        phonenumber
        pinterestUrl
        role_en
        role_es
        services_es
        services_en
        slogan_en
        slogan_es
        stackoverflowUrl
        tools
        twitchUrl
        twitterUrl
        ubication
        whatsappUrl
        youtubeUrl
        photo {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}`
