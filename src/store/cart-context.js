import React from 'react'

// initialize the context with some default data for the sake of auto-completion
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: item => {},
  removeItem: id => {}
})

export default CartContext
