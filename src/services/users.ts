import axios from "axios";
import { getHeaders } from "lib/getHeaders";

export const userService = {
  getAll: async (params) => {
    try {
      // const res = await axios.get("/api/admin/users", getHeaders())
      const res = await axios.get("/api/admin/users", {
        ...getHeaders(),
        params,
      })
      return {data: res.data, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  detail: async (id) => {
    try {
      const res = await axios.get(`/api/admin/users/${id}`, getHeaders())
      return {data: res.data, isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  create: async (data) => {
    try {
      await axios.post("/api/admin/users", data, getHeaders())
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  update: async (values) => {
    const {_id} = values
    try {
      await axios.put(`/api/admin/users/${_id}`, values, getHeaders())
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }

  },

  delete: async (_id) => {
    try {
      await axios.delete(`/api/admin/users/${_id}`, getHeaders())
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },

  multiDelete: async (idsArray) => {
    try {
      await axios.post(`/api/admin/users/multiDelete`, idsArray, getHeaders())
      return {isLoading: false, isSuccess: true};
    } catch ({response}) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
}
