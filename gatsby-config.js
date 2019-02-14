module.exports = {
  siteMetadata: {
    title: `Gatsby WPGraphQL Source Demo`,
    description: `Gatsby demo site with WPGraphQL as the source.`,
    author: `@wpgraphql`,
    wordPressUrl: `https://wpgraphqldemo.wpengine.com`,
  },
  plugins: [
    // Include Ant Design component library.
    {
      resolve: `gatsby-plugin-antd`,
      options: {
        style: true,
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: {
          // DEFAULTS FOR ANT DESIGN
          // Full list of variables can be found here:
          // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
          // @primary-color: #1890ff;
          "layout-header-background": `#0e2339`,
          // primary color for all components
          "primary-color": `#1890ff`,
          // @link-color: #1890ff;
          "link-color": `#1890ff`,
          // @success-color: #52c41a;
          "success-color": `#52c41a`,
          // @warning-color: #faad14;
          "warning-color": `#faad14`,
          // @error-color: #f5222d;
          "error-color": `#f5222d`,
          // @font-size-base: 14px;
          // major text font size
          "font-size-base": `16px`,
          // @heading-color: rgba(0, 0, 0, .85);
          "heading-color": `rgba(0, 0, 0, .85)`,
          // @text-color: rgba(0, 0, 0, .65);
          "text-color": `rgba(0, 0, 0, .65)`,
          // @text-color-secondary : rgba(0, 0, 0, .45);
          "text-color-secondary": `rgba(0, 0, 0, .45)`,
          // @disabled-color : rgba(0, 0, 0, .25);
          "disabled-color": `rgba(0, 0, 0, .25)`,
          // @border-radius-base: 4px;
          "border-radius-base": `4px`,
          // @border-color-base: #d9d9d9;
          "border-color-base": `#d9d9d9`,
          // @box-shadow-base: 0 2px 8px rgba(0, 0, 0, .15);
          "box-shadow-base": `0 2px 8px rgba(0, 0, 0, .15)`,
        },
      },
    },
    // Setup WPGraphQL.com to be the source
    {
      resolve: `gatsby-source-graphql`,
      options: {
        // This type will contain remote schema Query type
        typeName: `WPGraphQL`,
        // This is field under which it's accessible
        fieldName: `wpgraphql`,
        // Url to query from
        url: `https://demo.wpgraphql.com/graphql`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-wpgraphql-starter`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#f0f2f5`,
        theme_color: `#001529`,
        display: `minimal-ui`,
        icon: `src/images/wpgraphql-logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    `gatsby-plugin-offline`,
  ],
}
