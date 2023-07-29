import useSWR from "swr";

import { config } from "config";
import api from 'lib/axios';
import { encryptPassword } from 'lib/crypto';
import { getHeadersWithAuth } from 'lib/cookie';
import { isEmptyObject } from "core/helpers";

export const accountService = {
  register: async (values) => {
    try {
      values.password = encryptPassword(values.password, config.cryptoKey)
      const { data: { data }, status } = await api.post(config.api.account.register, values);
      return { data, status, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
  login: async (values) => {
    try {
      values.password = encryptPassword(values.password, config.cryptoKey)
      const { data: { data }, status } = await api.post(config.api.account.login, values);
      return { data, status, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
  forgotPassword: async (email) => {
    try {
      const { data, status } = await api.post(config.api.account.password, email);
      return { status, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response.status,
        message: response?.data?.message,
      };
    }
  },
  resetPassword: async (values) => {
    try {
      values.password = encryptPassword(values.password, config.cryptoKey)
      const { status } = await api.delete(config.api.account.password, { data: values });
      return { status, isLoading: false };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
  changePassword: async (values) => {
    try {
      values.password = encryptPassword(values.password, config.cryptoKey)
      values.newPassword = encryptPassword(values.newPassword, config.cryptoKey)
      const { status } = await api.put(config.api.account.password, values);
      return { isLoading: false, status };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
  refreshToken: async (token) => {
    try {
      const { data: { data }, status } = await api.post(config.api.account.refreshToken, { token });
      return { data, status, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
  createAddress: async (values) => {
    try {
      const { status } = await api.post(config.api.account.address, values)
      return { status, isLoading: false };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
  deleteAddress: async (id) => {
    try {
      const { status } = await api.delete(config.api.account.address, { data: { id } })
      return { status, isLoading: false };
      // return { status, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
  updateAddress: async (values) => {
    try {
      const { status } = await api.put(config.api.account.address, values)
      return { status, isLoading: false };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
}

export function useCheckToken(params) {
  const fetcher = url => api.get(url, { params }).then(res => res)
  const { error, data } = useSWR(
    isEmptyObject(params) ? null : [config.api.account.password, params],
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    isLoading: data ? !data : !error,
    isError: !!error,
    status: error?.response?.status,
  };
}

export function useAddress() {
  const headers = getHeadersWithAuth()
  const fetcher = url => api.get(url, { headers }).then(res => res.data)
  const { error, data, mutate } = useSWR([config.api.account.address, headers], fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    mutate,
    addresses: data?.address,
    isLoading: !data,
    isError: !!error,
  };
}

export function usePrimaryAddress() {
  const params = { isPrimary: true }
  const headers = getHeadersWithAuth()
  const token = headers.Authorization.replace('Bearer ', '')
  const arrKeys = token === 'undefined' ? null : [config.api.account.address, params, headers]
  const fetcher = url => api.get(url, { params, headers }).then(res => res.data)

  const { error, data, mutate } = useSWR(
    arrKeys,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true
    }
  )

  return {
    address: data?.address,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

export function useOrders(params) {
  const headers = getHeadersWithAuth()
  const token = headers.Authorization.replace('Bearer ', '')
  const arrKeys = token === 'undefined' ? null : [config.api.account.order, params, headers]
  const fetcher = url => api.get(url, { params }).then(res => res.data)

  const { error, data } = useSWR(
    arrKeys,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true
    }
  )

  return {
    // orders: [],
    orders: data?.orders?.data,
    paginatedOrderList: data?.paginatedOrderList,
    total: data?.orders?.total_count,
    isLoading: !data,
    isError: !!error,
  };
}

export function useDetailOrder(chargeId) {
  const fetcher = url => api.post(url, { chargeId }).then(res => res.data)
  const { error, data, mutate } = useSWR(
    chargeId ? [config.api.account.order, chargeId] : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    mutate,
    purchasedProducts: data?.purchasedProducts,
    customer: data?.customer,
    isLoading: !data,
    isError: !!error,
  };
}

