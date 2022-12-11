import axios from 'axios';
import { getHeaders } from 'lib/getHeaders';
import { encryptPassword } from 'lib/crypto';
import { handleSetCookie } from 'lib/cookie';
import { config } from "config";
import api from 'lib/axios';
import useSWR from "swr";

export const accountService = {
  register: async (values) => {
    const { password } = values
    const modifiedValues = { ...values, password: encryptPassword(password, config.cryptoKey) }
    try {
      const { data: { data } } = await axios.post(config.api.account.register, modifiedValues);
      handleSetCookie(config.cookies.auth, data.auth)
      handleSetCookie(config.cookies.profile, data.profile)
      return { data, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  login: async (values) => {
    const { password } = values
    const modifiedValues = { ...values, password: encryptPassword(password, config.cryptoKey) }
    try {
      const { data: { data } } = await axios.post(config.api.account.login, modifiedValues); // client ??
      // const { data: { data } } = await api.post(config.api.account.login, modifiedValues); // method server on client, error ?
      handleSetCookie(config.cookies.auth, data.auth)
      handleSetCookie(config.cookies.profile, data.profile)
      return { data, isLoading: !data };
    } catch ({ response }) {
      return {
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  forgotPassword: async (email) => {
    try {
      const { data } = await axios.post(config.api.account.forgotPassword, email);
      return { status: data.status, isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  updatePassword: async (values) => {
    try {
      await axios.put(config.api.account.resetPassword, values);
      return { isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  changePassword: async (values) => {
    const modifiedValues = {
      ...values,
      password: encryptPassword(values.password, config.cryptoKey),
      newPassword: encryptPassword(values.newPassword, config.cryptoKey)
    }
    try {
      await axios.put(config.api.account.changePassword, modifiedValues, getHeaders());
      return { isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  createAddress: async (values) => {
    try {
      await axios.post(config.api.account.address, values, getHeaders())
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

export function useAccount(params) {
// export function useLogin(values) {
  // const { password } = values
  // const modifiedValues = { ...values, password: encryptPassword(password, config.cryptoKey) }
  console.log('dauphaihau debug: values', values)
  const fetcher = url => api.post(url, {data: values}).then(res => res.data)
  const { data, error, mutate } = useSWR(config.api.account.login, fetcher)
  console.log('dauphaihau debug: data', data)

  // handleSetCookie(config.cookies.auth, data.auth)
  // handleSetCookie(config.cookies.profile, data.profile)

  // console.log('dauphaihau debug: error', error)
  return {
    data,
    // products: data?.products,
    isLoading: !data,
    isError: !!error,
    mutate
  };
}

