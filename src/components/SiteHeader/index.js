import { Link, StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Layout } from "antd"
import SiteMenu from "../SiteMenu"
import wpgraphqlLogo from "../../images/wpgraphql-logo.png"

const { Header } = Layout

const Index = ({ location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Header>
        <div
          className="logo"
          style={{
            minWidth: `120px`,
            minHeight: `31px`,
            lineHeight: `31px`,
            margin: `16px 24px 16px 0`,
            float: `left`,
          }}
        >
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <img
              src={wpgraphqlLogo}
              alt="WPGraphQL Logo"
              style={{ height: `30px`, width: `30px` }}
            />
            {` `}
            {data.site.siteMetadata.title}
          </Link>
        </div>
        <SiteMenu location={location} />
      </Header>
    )}
  />
)

Index.propTypes = {
  siteTitle: PropTypes.string,
}

Index.defaultProps = {
  siteTitle: ``,
}

export default Index
