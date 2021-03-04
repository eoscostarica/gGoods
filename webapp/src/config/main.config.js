export const version = process.env.REACT_APP_VERSION
export const name = process.env.REACT_APP_NAME
export const title = process.env.REACT_APP_TITLE
export const logo = process.env.REACT_APP_LOGO
export const footerLinks = JSON.parse(
  process.env.REACT_APP_FOOTER_LINKS || '[]'
)
