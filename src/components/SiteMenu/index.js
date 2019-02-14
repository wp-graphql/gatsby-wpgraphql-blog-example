import React from "react"
import { Menu } from "antd"
import { Link, StaticQuery, graphql } from "gatsby"
import { createLocalLink } from "../../utils"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const MENU_QUERY = graphql`
  fragment MenuFields on WPGraphQL_MenuItem {
    id
    label
    url
    connectedObject {
      __typename
    }
  }

  query GET_MENU_ITEMS {
    wpgraphql {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          ...MenuFields
          childItems {
            nodes {
              ...MenuFields
              childItems {
                nodes {
                  ...MenuFields
                  childItems {
                    nodes {
                      ...MenuFields
                      childItems {
                        nodes {
                          ...MenuFields
                          childItems {
                            nodes {
                              ...MenuFields
                              childItems {
                                nodes {
                                  ...MenuFields
                                  childItems {
                                    nodes {
                                      ...MenuFields
                                      childItems {
                                        nodes {
                                          ...MenuFields
                                          childItems {
                                            nodes {
                                              ...MenuFields
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const renderMenuItem = menuItem => {
  const link = createLocalLink(menuItem.url)
  if (menuItem.childItems && menuItem.childItems.nodes.length) {
    return renderSubMenu(menuItem)
  } else {
    return (
      <Menu.Item key={menuItem.id}>
        {link ? (
          <Link to={createLocalLink(menuItem.url)}>{menuItem.label}</Link>
        ) : (
          menuItem.label
        )}
      </Menu.Item>
    )
  }
}

const renderSubMenu = menuItem => (
  <SubMenu title={menuItem.label}>
    <MenuItemGroup title={menuItem.label}>
      {menuItem.childItems.nodes.map(item => renderMenuItem(item))}
    </MenuItemGroup>
  </SubMenu>
)

const SiteMenu = ({ location }) => (
  <StaticQuery
    query={MENU_QUERY}
    render={data => {
      if (data.wpgraphql.menuItems) {
        return (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[location.pathname ? location.pathname : `1`]}
            style={{
              float: `right`,
              lineHeight: `64px`,
            }}
          >
            {data.wpgraphql.menuItems.nodes.map(menuItem => {
              if (menuItem.childItems.nodes.length) {
                return renderSubMenu(menuItem)
              } else {
                return renderMenuItem(menuItem)
              }
            })}
          </Menu>
        )
      } else {
        return null
      }
    }}
  />
)

export default SiteMenu
