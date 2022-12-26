import useSWR from "swr";
import useSWRInfinite from 'swr/infinite'
import useSWRImmutable from "swr/immutable";

import { config } from "config";
import api from "lib/axios";
import { PATH } from "config/const";

// get data ( color, price, material, ... ) depend on category
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

export function useProducts<T>(params) {
  const PAGE_SIZE = 18

  const getKey = (pageIndex, previousPageData) => {
    pageIndex = pageIndex + 1
    if (previousPageData && !previousPageData.products.length) return null // reached the end
    return `api${PATH.PRODUCT._}?page=${pageIndex}&limit=${PAGE_SIZE}`     // SWR key
  }

  const fetcher = url => api.get(url, { params }).then(res => res.data)
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher)

  const products: T[] = data?.flatMap(({ products }) => products)
  const total = data && data[0]?.total

  const isReachEnd = data && data[data.length - 1]?.products.length < PAGE_SIZE

  const isLoadingMore = data && typeof data[size - 1] === 'undefined'

  return {
    products,
    // products: products ?? [],
    total,
    size, setSize,
    isLoadingMore,
    isValidating,
    isReachEnd,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useDetailProduct(name) {
  const fetcher = url => api.get(url, { params: { name } }).then(res => res.data)
  const { data, error, mutate } = useSWR(name ? [config.api.product.detail, name] : null, fetcher)
  return {
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
