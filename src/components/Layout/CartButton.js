import { useContext } from 'react'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

import classes from './CartButton.module.css'

export default function CartButton(props) {
  const cartCtx = useContext(CartContext)

  const numberOfCartItems = cartCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount
  }, 0)

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>

      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}
