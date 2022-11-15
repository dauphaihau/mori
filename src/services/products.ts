import axios from "axios";
import config from "../../config.json";

// const baseUrl = 'https://coffin-ecommerce-app.vercel.app'
const baseUrl = process.env.BASE_URL

export const getProducts = async (params) => {
  try {
    const res = await fetch(`${baseUrl}${config.api.product}${params}`, {
      method: 'GET',
    })
    console.log('dauphaihau debug: res', res)
    return await res.json()
  } catch (err) {
    console.log('err', err)
  }
}

export const getProductByName = async (params) => {
  try {
    const res = await axios.delete(config.api.product, {
      params,
    })
    return await res.data
  } catch (err) {
    console.log('err', err)
  }
}

export const getProductByIds = async (ids) => {
  try {
    const res = await axios.post(baseUrl + config.api.product, {
      ids,
    })
    return await res.data
  } catch (err) {
    console.log('err', err)
  }
}

export const getCategories = async () => {
  try {
    const res = await axios.get('/api/product/categories')
    console.log('dauphaihau debug: res', res)
    return await res.data

    // const res = await fetch(`${baseUrl}/api/product/categories`, {
    //   method: 'GET',
    // })
    // return await res.json()
  } catch (err) {
    console.log('err', err)
  }
}
