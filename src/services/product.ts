import { config } from "config";
import api from "lib/axios";
import useSWR from "swr";

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
  // getProductByName: async (list = []) => {
  //   try {
  //     const res = await api.post(config.api.product._, {
  //       list,
  //     })
  //     return await res.data
  //   } catch (err) {
  //     console.log('err', err)
  //   }
  // },
  getProductByIds: async (ids) => {
    try {
      const res = await api.post(config.api.product._, {
        ids,
      })
      return await res.data
    } catch (err) {
      console.log('err', err)
    }
  },
  getCategories: async () => {
    try {
      const res = await api.get(config.api.product.categories)
      return res.data.categories
    } catch (err) {
      console.log('err', err)
    }
  },
  getProductByName: async (params) => {
    try {
      const res = await api.delete(config.api.product._, { params })
      return await res.data
    } catch (err) {
      console.log('err', err)
    }
  },
  getProductsByCategory: async (params) => {
    try {
      const res = await api.delete(config.api.product._, { params })
      return await res.data
    } catch (err) {
      console.log('err', err)
    }
  },
}

export function useDetailProduct(name) {
  const fetcher = url => api.get(url, { params: { name } }).then(res => res.data)
  const { data, error, mutate } = useSWR(config.api.product.detail, fetcher)
  return {
    // data,
    product: data?.product,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useRelatedProducts(category) {
  const fetcher = url => api.get(url, { params: { category } }).then(res => res.data)
  const { data, error, mutate } = useSWR(category ? config.api.product.related : null, fetcher)
  return {
    relatedProducts: data?.products,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}
