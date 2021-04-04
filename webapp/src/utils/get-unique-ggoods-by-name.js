export const getUniqueGGoodsByName = ggoods => {
  let items = {}

  ggoods.forEach(ggood => {
    items = {
      ...items,
      [ggood.metadata.name]: ggood
    }
  })

  return Object.values(items)
}
