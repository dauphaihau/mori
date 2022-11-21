import { config } from "config";
import api from "lib/axios";
import useSWR from "swr";

export const productService = {
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

  getProductSale: async (names) => {
    try {
      const res = await api.post(config.api.product._, {
        names,
      })
      console.log('dauphaihau debug: res', res)
      return await res.data
    } catch (err) {
      console.log('err', err)
    }
  },
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

export function useCategories() {
  const fetcher = url => api.get(url).then(res => res.data)
  const { data, error } = useSWR(config.api.product.categories, fetcher)
  return {
    categories: data?.categories,
    isLoading: !data,
    isError: !!error,
  };
}

// get data depend category ( color, price, material, ... )
export function useFilters(category) {
  const fetcher = url => api.get(url, { params: { category: category ?? 'all' } }).then(res => res.data)
  const { data, error } = useSWR([config.api.product.filters, { params: { category: category ?? 'all' } }], fetcher)
  return {
    colors: data?.colors,
    materials: data?.materials,
    prices: data?.prices,
    isLoading: !data,
    isError: !!error,
  };
}

export function useSearchProducts(params) {
  const fetcher = url => api.get(url, { params }).then(res => res.data)
  const { data, error, mutate } = useSWR(params.search ? [config.api.product.search, params] : null, fetcher)
  return {
    // data,
    products: data?.products,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useProducts(params) {
  const fetcher = url => api.get(url, { params }).then(res => res.data)
  const { data, error, mutate } = useSWR([config.api.product._, params], fetcher)
  return {
    data,
    // products: data?.products,
    isLoading: !data,
    isError: !!error,
    mutate
  };
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

export function useProductsSale(names) {
  // try {
  //   const res = await api.post(config.api.product._, {
  //     names,
  //   })
  //   console.log('dauphaihau debug: res', res)
  //   return await res.data
  // } catch (err) {
  //   console.log('err', err)
  // }

  const fetcher = url => api.get(url).then(res => res.data)
  const { data, error, mutate } = useSWR(config.api.product.sale, fetcher)

  // const fetcher = url => api.get(url, { params: { names } }).then(res => res.data)
  // const { data, error, mutate } = useSWR(names ? config.api.product.sale : null, fetcher)

  console.log('dauphaihau debug: data', data)
  return {
    products: data?.products,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}
