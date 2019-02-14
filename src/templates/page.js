import React from "react"
import { graphql } from "gatsby"
import { Row, Col, Divider } from "antd"
import SiteLayout from "../components/SiteLayout"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import Seo from "../components/Seo"

const Page = props => {
  const {
    location,
    data: {
      wpgraphql: { page },
    },
  } = props
  const { title, content } = page
  return (
    <SiteLayout location={location}>
      <Seo title={`${page.title}`} />
      <Row type="flex" gutter={24}>
        <Col xs={24} md={16}>
          <h1 style={{ wordBreak: `break-all` }}>{title}</h1>
          <Divider />
          <Row type="flex" justify="space-around" gutter={24}>
            <Col xs={24}>
              <div
                style={{ wordBreak: `break-all` }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={8}>
          <RecentPostsWidget />
          <CategoriesWidget />
          <RecentCommentsWidget />
        </Col>
      </Row>
    </SiteLayout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`
