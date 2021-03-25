export const setData = (obj, key, value) => {
  if (key.includes('.')) {
    const [a, b] = key.split('.')
    return {
      ...obj,
      [a]: setData(obj[a], b, value)
    }
  }

  return {
    ...obj,
    [key]: value
  }
}
