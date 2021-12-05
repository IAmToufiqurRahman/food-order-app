import { useContext, useState } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'

import classes from './Cart.module.css'

export default function Cart(props) {
  const [isCheckOut, setIsCheckOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  const hasItems = cartCtx.items.length > 0

  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={cartItemAddHandler.bind(null, item)} onRemove={cartItemRemoveHandler.bind(null, item.id)} />
      ))}
    </ul>
  )
  // adding bind() on those to function pointer ensures that the item.id or item is passed to those funtion pointers, bind pre-configure a function for future execution and allows you to pre-configure the argument that function will receive when it's being executed.

  const orderHandler = () => {
    setIsCheckOut(true)
  }

  const submitOrderHandler = async userData => {
    setIsSubmitting(true)

    const response = await fetch('https://react-custom-hook-90948-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })

    setIsSubmitting(false)
    setDidSubmit(true)

    cartCtx.clearCart()
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>

      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  )

  const cartModalContent = (
    <>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>

        <span>{totalAmount}</span>
      </div>

      {isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}

      {!isCheckOut && modalActions}
    </>
  )

  const isSubmittingModalContent = <p>Sending Order Data</p>

  const didSubmitModalContent = (
    <>
      <p>Successfully Sent the order</p>

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}
