import axios from 'axios';
import { getHeaders } from 'lib/getHeaders';
import { encryptPassword } from 'lib/crypto';
import config from 'config/config.json';
import { handleSetCookie } from 'lib/cookie';
import api from 'lib/axios';

export const accountService = {
  register: async (values) => {
    const { password } = values
    const modifiedValues = { ...values, password: encryptPassword(password, config.cryptoKey) }
    try {
      const { data: { data } } = await axios.post(config.api.account.register, modifiedValues);
      handleSetCookie(config.cookies.auth, data.auth)
      handleSetCookie(config.cookies.profile, data.profile)
      return { data, isLoading: !data  };
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
      return { data, isLoading: !data  };
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
