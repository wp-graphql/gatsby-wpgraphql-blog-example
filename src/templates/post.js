import React, { Fragment } from "react"
import { graphql } from "gatsby"
import { Row, Col, Divider, Tag } from "antd"
import SiteLayout from "../components/SiteLayout"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import PostEntryMeta from "../components/PostEntryMeta"
import Seo from "../components/Seo"

const renderTermNodes = (nodes, title) => (
  <div>
    {title}
    {` `}
    {nodes.map(term => (
      <Tag>{term.name}</Tag>
    ))}
  </div>
)

const renderTerms = (categoryNodes = [], tagNodes = []) => (
  <Fragment>
    <Divider />
    {categoryNodes ? renderTermNodes(categoryNodes, `Categories: `) : null}
    {tagNodes && tagNodes.length ? renderTermNodes(tagNodes, `Tags: `) : null }
  </Fragment>
)

const Post = props => {
  const {
    location,
    data: {
      wpgraphql: { post },
    },
  } = props
  const { title, content } = post
  return (
    <SiteLayout location={location}>
      <Seo title={`${post.title}`} />
      <Row type="flex" gutter={24}>
        <Col xs={24} md={16}>
          <h1 style={{ wordBreak: `break-all` }}>{title}</h1>
          <Divider />
          <Row type="flex" justify="space-around" gutter={24}>
            <Col xs={24} md={6}>
              <PostEntryMeta post={post} />
            </Col>
            <Col xs={24} md={18}>
              <div
                style={{ wordBreak: `break-all` }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {post.categories.nodes.length || post.tags.nodes.length
                ? renderTerms(post.categories.nodes, post.tags.nodes)
                : null}
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

export default Post

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
        uri
        author {
          name
          slug
          avatar {
            url
          }
        }
        tags {
          nodes {
            name
            link
          }
        }
        categories {
          nodes {
            name
            link
          }
        }
      }
    }
  }
`
