import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

const QUERY = graphql`
  {
    wpgraphql {
      categories {
        nodes {
          name
          slug
          link
        }
      }
    }
  }
`

const CategoriesWidget = () => (
  <StaticQuery
    query={QUERY}
    render={data => {
      return (
        <div>
          <h2>Categories</h2>
          <ul>
            {data.wpgraphql.categories.nodes.map(category => {
              return (
                <li>
                  <Link to={`/blog/category/${category.slug}`}>{category.name}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      )
    }}
  />
)

export default CategoriesWidget
