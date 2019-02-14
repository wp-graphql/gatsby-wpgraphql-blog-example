import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import { Row, Col, Divider } from "antd"
import config from "../../../config"
import PostEntryMeta from "../PostEntryMeta"

const PostEntry = ({ post }) => {
  return (
    <Fragment>
      <Row type="flex" justify="space-around" gutter={16}>
        <Col xs={24} md={4}>
          <PostEntryMeta post={post} />
        </Col>
        <Col xs={24} md={20}>
          <h2>
            <Link to={`/blog/${post.uri}`}>{post.title}</Link>
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(config.wordPressUrl, ``),
            }}
          />
        </Col>
      </Row>
      <Divider />
    </Fragment>
  )
}

export default PostEntry

export const query = graphql`
  fragment PostEntryFragment on WPGraphQL_Post {
    id
    title
    uri
    slug
    date
    content: excerpt
    author {
      name
      slug
      avatar(size: 100) {
        url
      }
    }
  }
`
