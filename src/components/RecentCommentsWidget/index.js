import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { createLocalLink } from "../../utils"

const QUERY = graphql`
  {
    wpgraphql {
      comments(first: 5) {
        nodes {
          author {
            __typename
            ... on WPGraphQL_CommentAuthor {
              name
            }
            ... on WPGraphQL_User {
              name
            }
          }
          commentedOn {
            __typename
            ... on WPGraphQL_Post {
              id
              title
              link
            }
            ... on WPGraphQL_Page {
              id
              title
              link
            }
          }
        }
      }
    }
  }
`

const RecentCommentsWidget = () => (
  <StaticQuery
    query={QUERY}
    render={data => {
      return (
        <div>
          <h2>Recent Comments</h2>
          <ul>
            {data.wpgraphql.comments.nodes.map(comment => {
              if (`WPGraphQL_Post` === comment.commentedOn.__typename) {
                return (
                  <li>
                    {comment.author.name} on{` `}
                    <Link to={createLocalLink(comment.commentedOn.link)}>
                      {comment.commentedOn.title}
                    </Link>
                  </li>
                )
              }
              return null;
            })}
          </ul>
        </div>
      )
    }}
  />
)

export default RecentCommentsWidget
