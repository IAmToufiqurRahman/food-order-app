import { useContext } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'

import classes from './Cart.module.css'

export default function Cart(props) {
  const cartctx = useContext(CartContext)

  const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`

  const hasItems = cartctx.items.length > 0

  const cartItemAddHandler = item => {}

  const cartItemRemoveHandler = id => {}

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartctx.items.map(item => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={cartItemAddHandler.bind(null, item)} onRemove={cartItemRemoveHandler.bind(null, item.id)} />
      ))}
    </ul>
  )

  // adding bind() on those to function pointer ensures that the item.id or item is passed to those funtion pointers, bind pre-configure a function for future execution and allows you to pre-configure the argument that function will receive when it's being executed.

  return (
    <Modal onClose={props.onClose}>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>

        <span>{totalAmount}</span>
      </div>

      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>

        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}
