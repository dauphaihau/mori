import axios from 'axios';
import { getHeaders } from 'lib/getHeaders';
import { encryptPassword } from 'lib/crypto';
import config from 'config/config.json';
import { handleSetCookie } from 'lib/cookie';

export const accountService = {
  register: async (values) => {
    const { password } = values
    const modifiedValues = { ...values, password: encryptPassword(password, config.cryptoKey) }
    try {
      const { data: { data } } = await axios.post(config.api.account.register, modifiedValues);
      handleSetCookie(config.cookies.auth, data.auth)
      handleSetCookie(config.cookies.profile, data.profile)
      return { data, isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  login: async (values) => {
    const { password } = values
    const modifiedValues = { ...values, password: encryptPassword(password, config.cryptoKey) }
    try {
      const { data: { data } } = await axios.post(config.api.account.login, modifiedValues);
      // const res = await axios.post('/api/account/login', modifiedValues);
      handleSetCookie(config.cookies.auth, data.auth)
      handleSetCookie(config.cookies.profile, data.profile)
      console.log('dauphaihau debug: right')
      return { data, isLoading: false, isSuccess: true, };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response.data.message,
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
