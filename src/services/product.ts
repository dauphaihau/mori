import { config } from "config";
import api from "lib/axios";

export const productService = {
  getProducts: async (params) => {
    try {
      const res = await api.get(config.api.product._, {
        params
      })
      return res.data
    } catch (err) {
      console.log('err', err)
    }
  },
  getProductByName: async (list = []) => {
    try {
      const res = await api.post(config.api.product._, {
        list,
      })
      return await res.data
    } catch (err) {
      console.log('err', err)
    }
  },
  // getProductByIds: async (ids) => {
  //   try {
  //     const res = await api.post(config.api.product._, {
  //       ids,
  //     })
  //     return await res.data
  //   } catch (err) {
  //     console.log('err', err)
  //   }
  // },
  getCategories: async () => {
    try {
      const res = await api.get(config.api.product.categories)
      return res.data.categories
    } catch (err) {
      console.log('err', err)
    }
  },
  // getProductByName: async (params) => {
  //   try {
  //     const res = await api.delete(config.api.product._, { params })
  //     return await res.data
  //   } catch (err) {
  //     console.log('err', err)
  //   }
  // },
}
