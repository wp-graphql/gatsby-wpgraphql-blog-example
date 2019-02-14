export const PAGES_QUERY = `
fragment PageFields on Page {
  id
  pageId
  uri
  title
  content(format:"RENDERED")
  comments{
    nodes {
      id
      pageId
      uri
    }
  }
}

query GET_PAGES($first: Int $after:String $where:RootToPageConnectionWhereArgs!) {
  pages(first:$first after:$after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      ...PageFields
      childPages {
        nodes {
          ...PageFields
          childPages {
            nodes {
              ...PageFields
              childPages {
                nodes {
                  ...PageFields
                  childPages {
                    nodes {
                      ...PageFields
                      childPages {
                        nodes {
                          ...PageFields
                          childPages {
                            nodes {
                              ...PageFields
                              childPages {
                                nodes {
                                  ...PageFields
                                  childPages {
                                    nodes {
                                      ...PageFields
                                      childPages {
                                        nodes {
                                          ...PageFields
                                          childPages {
                                            nodes {
                                              ...PageFields
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
}
`;
