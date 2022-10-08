import { fetchInventory } from "./provider/inventoryProvider";

async function inventoryCategories() {
  const inventory = await fetchInventory()
  return inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      } else {
        const item = {
          name: c,
          image: next.images[0],
          itemCount: 1
        }
        acc.push(item)
      }
    })
    return acc
  }, [])
}

export default inventoryCategories
