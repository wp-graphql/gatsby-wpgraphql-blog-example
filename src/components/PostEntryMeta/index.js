import React from 'react'
import moment from "moment/moment"
import { Row, Col, Avatar } from "antd"
import { Link } from "gatsby"

const PostEntryMeta = ({ post }) => (
  <Row
    justify="middle"
    style={{ textAlign: `center`, marginBottom: `15px` }}
    gutter={16}
  >
    <Col xs={24} md={24} style={{ textAlign: `center` }}>
      <Link to={`/author/${post.author.slug}`}>
        <Avatar size={100} src={post.author.avatar.url} />
      </Link>
    </Col>
    <Col xs={24} md={24} style={{ textAlign: `center` }}>
      <Link to={`/author/${post.author.slug}`}>{post.author.name}</Link>
      <br />
      {moment(post.date).format(`MMM Do YY`)}
    </Col>
  </Row>
)

export default PostEntryMeta
