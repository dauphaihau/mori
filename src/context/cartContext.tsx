import React, { createContext, Component } from 'react'
import { STORAGE_KEY } from "config/enums";

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  numberAllOfItemsInCart: 0,
  total: 0,
  step: 0,
  showAddressDialog: false,
  recentlyViewedProduct: [],
  setShowAddressDialog: (item: object) => {},
  addToCart: (item: object) => {},
  clearCart: () => {},
  removeFromCart: (item: object) => {},
  setItemQuantity: (item: object) => {},
  setStep: (step: number) => {},
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

export class CartProvider extends Component<{}, {step: number, showAddressDialog: boolean}> {

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      showAddressDialog: false
    };
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
    const index = cart.findIndex(cartItem => cartItem.id === item.id)
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
      const index = cart.findIndex(cartItem => cartItem.id === item.id)
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

  addItemToRecentlyViewedProduct = (item) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const { cart } = storageState
    if (cart.length) {
      const index = cart.findIndex(cartItem => cartItem.id === item.id)
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
    cart = cart.filter(c => c.id !== item.id)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      cart,
      numberAllOfItemsInCart: sumAllProduct(cart),
      numberOfItemsInCart: cart.length,
      total: calculateTotal(cart)
    }))
    console.log('dauphaihau debug: initial-state', initialState)
    this.forceUpdate()
  }

  clearCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
    this.forceUpdate()
  }

  setStep = (step) => {
    this.setState({ ...this.state, step })
  }

  setShowAddressDialog = (showAddressDialog) => {
    this.setState({ ...this.state, showAddressDialog })
  }

  render() {
    let state = initialState
    console.log('dauphaihau debug: run render')
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
          step: this.state.step,
          addToCart: this.addToCart,
          clearCart: this.clearCart,
          removeFromCart: this.removeFromCart,
          setItemQuantity: this.setItemQuantity,
          setStep: this.setStep,
          setShowAddressDialog: this.setShowAddressDialog,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}
