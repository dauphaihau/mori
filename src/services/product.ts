import { config } from "config";
import api from "lib/axios";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite from 'swr/infinite'
import useSWRImmutable from "swr/immutable";

// get data ( color, price, material, ... ) depend category
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

// export function useProducts(params) {
//   const fetcher = url => api.get(url, { params }).then(res => res.data)
//   const { data, error, mutate, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
//       console.log('dauphaihau debug: page-index', pageIndex)
//       console.log('dauphaihau debug: previous-page-data', previousPageData)
//       if (!params) return null;
//
//       // reached the end
//       if (previousPageData && !previousPageData.data) return null;
//
//       // first page, we don't have `previousPageData`
//       // if (pageIndex === 0) return [config.api.product._, params]
//
//       return [config.api.product._, {...params, page: pageIndex + 1}]
//     },
//     fetcher
//   )
//
//   console.log('dauphaihau debug: size', size)
//   // console.log('dauphaihau debug: data', data)
//   // console.log('dauphaihau debug: error', error)
//   console.log('dauphaihau debug: data', data && data[0])
//   return {
//     data: data && data[0] ,
//     // products: data?.products,
//     isLoading: !data,
//     isError: !!error,
//     mutate
//   };
// }

export function useProducts(params) {
  const fetcher = url => api.get(url, { params }).then(res => res.data)
  const { data, error, mutate } = useSWR([config.api.product._, params], fetcher)
  // console.log('dauphaihau debug: error', error)
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

  // const { cache } = useSWRConfig()
  //
  // cache.get(config.) // Get the current data for a key.
  // cache.clear()  // ⚠️ Clear all the cache. SWR will revalidate upon re-render.

  const { data, error, mutate } = useSWR(name ? [config.api.product.detail, name] : null, fetcher, {
    // revalidateOnMount: true
    // revalidateIfStale: true,
    // revalidateOnFocus: true,
    // revalidateOnReconnect: false
  })

  return {
    // data,
    product: data?.product,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useRelatedProducts(params) {
  const fetcher = url => api.get(url, { params }).then(res => res.data)
  const { data, error, mutate } = useSWR(params?.category ? [config.api.product.related, params] : null, fetcher)
  return {
    relatedProducts: data?.products,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useProductsSale() {
  const fetcher = url => api.get(url).then(res => res.data)
  const { data, error } = useSWR(config.api.product.sale, fetcher)
  return {
    products: data?.products,
    isLoading: !data,
    isError: !!error,
  };
}

export function useCategories() {
  const fetcher = url => api.get(url).then(res => res.data)
  const { data, error } = useSWRImmutable(config.api.product.categories, fetcher)
  return {
    categories: data?.categories,
    isLoading: !data,
    isError: !!error,
  };
}
