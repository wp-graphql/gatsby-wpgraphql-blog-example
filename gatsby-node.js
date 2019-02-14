const path = require(`path`)
const _ = require(`lodash`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const POSTS_QUERY = `
    query GET_POSTS($first:Int $after:String){
      wpgraphql {
        posts(
          first: $first 
          after:$after
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            uri
            postId
            title
          }
        }
      }
    }
  `

  let postsPageNumber = 0
  let allPosts = []

  const createPostPages = async ({ after = null }) =>
    await graphql(POSTS_QUERY, {
      first: 12,
      after: after,
    }).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const postTemplate = path.resolve(`./src/templates/post.js`)
      const blogTemplate = path.resolve(`./src/templates/blog.js`)
      const posts = result.data.wpgraphql.posts.nodes

      let ids = []
      posts.map((post, i) => {
        ids.push(post.postId)
        if (!allPosts.includes(post)) {
          allPosts.push(post)
        }
      })

      const hasNextPage = result.data.wpgraphql.posts.pageInfo.hasNextPage

      let pagePath = !after ? `/` : `/page/${postsPageNumber}`
      console.log(pagePath)

      createPage({
        path: pagePath,
        component: blogTemplate,
        context: {
          pageNumber: postsPageNumber,
          hasNextPage: hasNextPage ? hasNextPage : false,
          ids: ids,
        },
      })

      postsPageNumber++

      if (hasNextPage) {
        createPostPages({
          after: result.data.wpgraphql.posts.pageInfo.endCursor,
        })
      } else {
        allPosts.map(post => {
          console.log(post.uri)
          createPage({
            path: `/blog/${post.uri}/`,
            component: postTemplate,
            post: post,
            id: post.id,
            context: {
              id: post.id,
              post: post,
            },
          })
        })
      }

      return Promise.all(allPosts)
    })

  createPostPages({
    after: null,
  }).then(posts => {
    console.log(posts)
  })

  const PAGES_QUERY = `
    query GET_PAGES($first:Int $after:String){
      wpgraphql {
        pages(
          first: $first 
          after: $after
          where: {
            parent: null
          }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            uri
            pageId
            title
          }
        }
      }
    }
  `
  let allPages = []

  const createPagePages = ({ after = null }) =>
    graphql(PAGES_QUERY, {
      first: 12,
      after: after,
    }).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const pageTemplate = path.resolve(`./src/templates/page.js`)
      const pages = result.data.wpgraphql.pages.nodes

      let ids = []
      pages.map((page, i) => {
        ids.push(page.pageId)
        if (!allPages.includes(page)) {
          allPages.push(page)
        }
      })

      const hasNextPage = result.data.wpgraphql.pages.pageInfo.hasNextPage

      if (hasNextPage) {
        createPagePages({
          after: result.data.wpgraphql.pages.pageInfo.endCursor,
        })
      } else {
        allPages.map(page => {
          console.log(page.uri)
          createPage({
            path: `/${page.uri}/`,
            component: pageTemplate,
            page: page,
            id: page.id,
            context: {
              id: page.id,
              page: page,
            },
          })
        })
      }

      return Promise.all(allPages)
    })

  createPagePages({
    after: null,
  }).then(pages => {
    console.log(pages)
  })

  const USER_QUERY = `
  query GET_USERS($first: Int) {
    wpgraphql { 
      users(first: $first) {
        nodes {
          id
          userId
          slug
        }
      }
    }
  }
  `

  const createUserPages = () => {
    graphql(USER_QUERY, { first: 100 }).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const userTemplate = path.resolve(`./src/templates/user.js`)

      const users = result.data.wpgraphql.users.nodes

      let userIds = []
      users.map(user => {
        userIds.push(user.id)

        console.log(`/author/${user.slug}`)

        createPage({
          path: `/author/${user.slug}`,
          component: userTemplate,
          context: user,
          id: user.id,
        })
      })
    })
  }

  createUserPages()

  const CATEGORY_QUERY = `
  query GET_CATEGORIES($first: Int) {
    wpgraphql { 
      categories(first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          categoryId
          slug
        }
      }
    }
  }
  `

  let categoriesPageNumber = 0

  const createCategoryPages = ({ after = null }) => {
    graphql(CATEGORY_QUERY, { first: 100, after: after }).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const categoryTemplate = path.resolve(`./src/templates/category.js`)
      const categories = result.data.wpgraphql.categories.nodes

      let ids = []
      categories.map(category => {
        console.log(category.slug)
        ids.push(category.categoryId)

        createPage({
          path: `/blog/category/${category.slug}`,
          component: categoryTemplate,
          context: category,
          id: category.id,
        })
      })

      const hasNextPage = result.data.wpgraphql.categories.pageInfo.hasNextPage
      let pagePath =
        0 === categoriesPageNumber
          ? `/categories/`
          : `/categories/page/${categoriesPageNumber}`
      const categoryArchiveTemplate = path.resolve(
        `./src/templates/categoriesArchive.js`
      )

      console.log(pagePath)

      createPage({
        path: pagePath,
        component: categoryArchiveTemplate,
        context: {
          pageNumber: categoriesPageNumber,
          hasNextPage: hasNextPage ? hasNextPage : false,
          ids: ids,
        },
      })

      categoriesPageNumber++

      if (hasNextPage) {
        createCategoryPages({
          after: result.data.wpgraphql.categories.pageInfo.endCursor,
        })
      }

      return Promise.all(categories)
    })
  }

  createCategoryPages({
    after: null,
  })

  const TAG_QUERY = `
  query GET_TAGS($first: Int) {
    wpgraphql { 
      tags(first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          tagId
          slug
        }
      }
    }
  }
  `

  let tagsPageNumber = 0

  const createTagPages = ({ after = null }) => {
    graphql(TAG_QUERY, { first: 100, after: after }).then(result => {
      if (result.errors) {
        result.errors.forEach(e => console.error(e.toString()))
        return Promise.reject(result.errors)
      }

      const tagTemplate = path.resolve(`./src/templates/tag.js`)
      const tags = result.data.wpgraphql.tags.nodes

      let ids = []
      tags.map(tag => {
        console.log(tag.slug)
        ids.push(tag.tagId)

        createPage({
          path: `/blog/tag/${tag.slug}`,
          component: tagTemplate,
          context: tag,
          id: tag.id,
        })
      })

      const hasNextPage = result.data.wpgraphql.tags.pageInfo.hasNextPage
      let pagePath =
        0 === tagsPageNumber ? `/tags/` : `/tags/page/${tagsPageNumber}`
      const tagArchiveTemplate = path.resolve(`./src/templates/tagsArchive.js`)

      console.log(pagePath)

      createPage({
        path: pagePath,
        component: tagArchiveTemplate,
        context: {
          pageNumber: tagsPageNumber,
          hasNextPage: hasNextPage ? hasNextPage : false,
          ids: ids,
        },
      })

      tagsPageNumber++

      if (hasNextPage) {
        createTagPages({
          after: result.data.wpgraphql.tags.pageInfo.endCursor,
        })
      }

      return Promise.all(tags)
    })
  }

  createTagPages({
    after: null,
  })
}
