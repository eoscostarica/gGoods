export const getLastChars = (str, length = 6) => {
  if (!str) {
    return ''
  }

  return str.substr(str.length - length)
}
