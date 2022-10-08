import axios from "axios";
import { omitFieldNullish } from "core/helpers";
import { getHeaders } from "lib/getHeaders";

export const productService = {
  getAll: async (params) => {
    try {
      const res = await axios.get("/api/admin/products", {
        // ...getHeaders(), params,
        ...getHeaders(), params: omitFieldNullish(params),
      })
      return { data: res.data, isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  detail: async (id) => {
    try {
      const res = await axios.get(`/api/admin/products/${id}`, getHeaders())
      return { data: res.data, isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  create: async (data) => {
    try {
      await axios.post("/api/admin/products", data, getHeaders())
      return { isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  update: async (values) => {
    const { _id } = values
    try {
      await axios.put(`/api/admin/products/${_id}`, values, getHeaders())
      return { isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  delete: async (_id) => {
    try {
      await axios.delete(`/api/admin/products/${_id}`, getHeaders())
      return { isLoading: false, isSuccess: true };
    } catch ({ response }) {
      return {
        isSuccess: false,
        isLoading: false,
        message: response?.data.message,
      };
    }
  },
  multiDelete: async (idsArray) => {
    try {
      await axios.post(`/api/admin/products/multiDelete`, idsArray, getHeaders())
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
