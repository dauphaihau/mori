import React, { createContext, Component, useContext } from 'react'
import { STORAGE_KEY } from "config/const";
import { IProduct } from "types/product";
import { AuthContext } from "./authContext";

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  numberAllOfItemsInCart: 0,
  total: 0,
  addToCart: (item: IProduct) => {},
  clearCart: () => {},
  removeFromCart: (item: IProduct) => {},
  setItemQuantity: (item: IProduct) => {},
}

const calculateTotal = (cart) => {
  return cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
}

const sumAllProduct = (cart) => cart.reduce((total, element) => total + element.quantity, 0);

export const CartContext = createContext(initialState)

export function useShoppingCart() {
  return useContext(CartContext);
}

export class CartProvider extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      }
    }
  }

  setItemQuantity = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const { cart } = storageState
    const index = cart.findIndex(cartItem => cartItem._id === item._id)
    cart[index].quantity = item.quantity

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart,
      numberOfItemsInCart: cart.length,
      numberAllOfItemsInCart: sumAllProduct(cart),
      total: calculateTotal(cart)
    }))
    this.forceUpdate()
  }

  addToCart = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const { cart } = storageState
    if (cart.length) {
      const index = cart.findIndex(cartItem => cartItem._id === item._id)
      if (index >= Number(0)) {
        cart[index].quantity = cart[index].quantity + item.quantity
      } else {
        cart.push(item)
      }
    } else {
      cart.push(item)
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart, numberOfItemsInCart: cart.length,
      numberAllOfItemsInCart: sumAllProduct(cart),
      total: calculateTotal(cart)
    }))
    this.forceUpdate()
  }

  removeFromCart = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    let { cart } = storageState
    cart = cart.filter(c => c._id !== item._id)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart,
      numberAllOfItemsInCart: sumAllProduct(cart),
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    }))
    this.forceUpdate()
  }

  clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    this.forceUpdate()
  }

  render() {
    let state = initialState
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (storageState) {
        state = JSON.parse(storageState)
      }
    }

    return (
      <CartContext.Provider
        value={{
          ...state,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
          removeFromCart: this.removeFromCart,
          setItemQuantity: this.setItemQuantity,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
