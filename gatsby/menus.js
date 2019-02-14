export const MENU_QUERY = `
fragment MenuFields on MenuItem {
  id
  title
  url
  connectedObject {
    __typename
  }
}

query GET_MENU_ITEMS {
  menuItems(where: {location: PRIMARY}) {
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
`;
