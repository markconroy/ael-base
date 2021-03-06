module.exports = {
  siteMetadata: {
    title: `addEventLister`,
    subtitle: `Free Developer Events`,
    description: `addEventLister is the place to see listing of free developer events worldwide`,
    author: `@markconroy`,
    repo: `https://github.com/markconroy/here`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `events`,
        path: `${__dirname}/src/data/events`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `websiteVariables`,
        path: `${__dirname}/src/data/site-variables`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `start_date`, `end_date`, `city`, `country`, `description`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            start_date: node => node.frontmatter.start_date,
            end_date: node => node.frontmatter.end_date,
            city: node => node.frontmatter.city,
            country: node => node.frontmatter.country,
            description: node => node.html
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#666`,
        theme_color: `#666`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
