import React from "react"
import SiteLayout from "../components/SiteLayout"
import { graphql } from "gatsby"
import { Row, Col, Divider } from "antd"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import PostEntry from "../components/PostEntry"
import Seo from "../components/Seo"

const CategoryTemplate = props => {
  const {
    location,
    data: {
      wpgraphql: { category },
    },
  } = props
  return (
    <SiteLayout location={location}>
      <Seo title={`${category.name}`} />
      <Row type="flex" gutter={24}>
        <Col xs={24} md={16}>
          <h1>Category: {category.name}</h1>
          <Divider />
          {category.posts.nodes &&
            category.posts.nodes.map(post => <PostEntry post={post} />)}
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

export default CategoryTemplate

export const pageQuery = graphql`
  query GET_CATEGORY($id: ID!) {
    wpgraphql {
      category(id: $id) {
        id
        name
        slug
        posts(first: 100) {
          nodes {
            ...PostEntryFragment
          }
        }
      }
    }
  }
`
