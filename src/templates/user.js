import React from "react"
import SiteLayout from "../components/SiteLayout"
import { Row, Col } from "antd"
import { graphql } from "gatsby"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import PostEntry from "../components/PostEntry"
import Seo from "../components/Seo"

const User = props => {
  const {
    location,
    data: {
      wpgraphql: { user },
    },
  } = props
  return (
    <SiteLayout location={location}>
      <Seo title={`${user.name}`} />
      <Row type="flex" gutter={24}>
        <Col xs={24} md={16}>
          <h1>{user.name}</h1>
          <h2>Latest Posts</h2>
          {user.posts.nodes.map(post => (
            <PostEntry post={post} />
          ))}
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

export default User

export const pageQuery = graphql`
  query user($id: ID!) {
    wpgraphql {
      user(id: $id) {
        name
        avatar {
          url
        }
        posts {
          nodes {
            ...PostEntryFragment
          }
        }
      }
    }
  }
`
