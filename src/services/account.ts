import axios from 'axios';
import useSWR from "swr";

import { config } from "config";
import api from 'lib/axios';
import { encryptPassword } from 'lib/crypto';
import { handleSetCookie } from 'lib/cookie';
import { isEmptyObject } from "core/helpers";

export const accountService = {
  register: async (values) => {
    const modifiedValues = { ...values, password: encryptPassword(values.password, config.cryptoKey) }
    try {
      const { data: { data }, status } = await axios.post(config.api.account.register, modifiedValues);
      handleSetCookie(config.cookies.auth, data.auth)
      handleSetCookie(config.cookies.profile, data.profile)
      return { status, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response.status,
        message: response?.data.message,
      };
    }
  },
  login: async (values) => {
    try {
      values.password = encryptPassword(values.password, config.cryptoKey)
      const { data: { data }, status } = await axios.post(config.api.account.login, values); // client ??
      // const { data: { data } } = await api.post(config.api.account.login, modifiedValues); // method server on client, error ?
      handleSetCookie(config.cookies.auth, data.auth)
      handleSetCookie(config.cookies.profile, data.profile)
      return { status, isLoading: !data };
    } catch ({ response }) {
      console.log('dauphaihau debug: response', response)
      return {
        isLoading: false,
        status: response.status,
        message: response?.data.message,
      };
    }
  },
  forgotPassword: async (email) => {
    try {
      // const { data } = await api.post(config.api.account.forgotPassword, email);
      // const { data, status } = await axios.post(config.api.account.forgotPassword, email);
      const { data, status } = await axios.post(config.api.account.password, email);
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
      console.log('dauphaihau debug: values', values)
      values.password = encryptPassword(values.password, config.cryptoKey)
      const { status } = await axios.delete(config.api.account.password, { data: values });
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
      // const modifiedValues = {
      //   ...values,
      //   password: encryptPassword(values.password, config.cryptoKey),
      //   newPassword: encryptPassword(values.newPassword, config.cryptoKey)
      // }
      values.password = encryptPassword(values.password, config.cryptoKey)
      values.newPassword = encryptPassword(values.newPassword, config.cryptoKey)

      const { status } = await api.put(config.api.account.password, values);
      console.log('dauphaihau debug: status', status)
      return { isLoading: false, status };
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
      await api.post(config.api.account.address, values)
      // await axios.post(config.api.account.address, values, getHeaders())
      return { isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
}

export function useCheckToken(params) {
  const fetcher = url => axios.get(url, { params }).then(res => res)
  const { error, data } = useSWR(
    !isEmptyObject(params) ? [config.api.account.password, params] : null,
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
