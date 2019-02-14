import React, { Component } from "react"
import { graphql, navigate } from "gatsby"
import { Button, Col, Row } from "antd"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import PostEntry from "../components/PostEntry"
import HomepageLayout from "../components/HomepageLayout"
import Seo from "../components/Seo"

class IndexPage extends Component {
  renderPreviousLink = () => {
    const {
      pageContext: { pageNumber },
    } = this.props

    let previousLink = null

    if (!pageNumber) {
      return null
    } else if (1 === pageNumber) {
      previousLink = `/`
    } else if (1 < pageNumber) {
      previousLink = `/page/${pageNumber - 1}`
    }

    return (
      <Button type="primary" onClick={() => navigate(previousLink)}>
        Previous Posts
      </Button>
    )
  }

  renderNextLink = () => {
    const {
      pageContext: { hasNextPage, pageNumber },
    } = this.props

    if (hasNextPage) {
      return (
        <Button
          type="primary"
          onClick={() => navigate(`/page/${pageNumber + 1}`)}
        >
          Next Posts
        </Button>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      data,
      location,
      pageContext: { pageNumber },
    } = this.props
    const blogPageNumber = pageNumber ? ` Page ${pageNumber}` : ``
    return (
      <HomepageLayout pageNumber={pageNumber} location={{ location }}>
        <Seo title={`Blog${blogPageNumber}`} />
        <Row type="flex" gutter={24}>
          <Col xs={24} md={16}>
            {data &&
              data.wpgraphql &&
              data.wpgraphql.posts.nodes.map(post => (
                <div key={post.id}>
                  <PostEntry post={post} />
                </div>
              ))}
          </Col>
          <Col xs={24} md={8}>
            <RecentPostsWidget />
            <CategoriesWidget />
            <RecentCommentsWidget />
          </Col>
        </Row>
        <Row
          type="flex"
          justify="space-between"
          style={{
            background: `#001529`,
            margin: `50px -50px -50px -50px`,
            padding: `25px`,
          }}
        >
          <Col xs={12}>
            <Row type="flex" justify="start">
              {this.renderPreviousLink()}
            </Row>
          </Col>
          <Col xs={12}>
            <Row type="flex" justify="end">
              {this.renderNextLink()}
            </Row>
          </Col>
        </Row>
      </HomepageLayout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          ...PostEntryFragment
        }
      }
    }
  }
`
