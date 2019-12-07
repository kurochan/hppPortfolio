const config = {
  siteTitle: `hpp Portfolio`,
  siteTitleAlt: `hpp Portfolio`,
  siteHeadline: `hppPortfolio - Awesome portfolio site made by gatsby from @hppRC`,
  siteUrl: `https://hpprc.com`,
  siteDescription: `hpp is a Japanese student, majoring in computer science and Informatics at Nagoya uni.`,
  siteLanguage: `ja`,
  author: `@osaremochi`,
  basePath: `/`
};

module.exports = {
  siteMetadata: {
    ...config
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 690,
              quality: 90,
              linkImagesToOriginal: true
            }
          }
        ]
      }
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: config.siteUrl
      }
    },
    `gatsby-plugin-advanced-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: config.siteUrl,
        sitemap: `${config.siteUrl}/sitemap.xml`,
        policy: [{ userAgent: `*`, allow: `/` }]
      }
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyzer`,
      options: {
        openAnalyzer: false
      }
    },
    // gatsby-plugin-manifest should be described before gatsby-plugin-offline
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: `hpp`,
        description: config.siteDescription,
        Scope: `/`,
        start_url: `/?utm_source=homescreen`,
        background_color: `#09090f`,
        theme_color: `#09090f`,
        display: `standalone`,
        icon: `./src/images/icon.png`
      }
    },
    `gatsby-plugin-offline`
  ]
};
