import config from "../../config"

export const createLocalLink = url => {
  if (`#` === url) {
    return null
  }
  return url ? url.replace(config.wordPressUrl, ``) : url
}
