import { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

import classes from './CartButton.module.css'

export default function CartButton(props) {
  const [btnIsHighlighted, setBtnIsHighLighted] = useState(false)

  const cartCtx = useContext(CartContext)

  const { items } = cartCtx

  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }

    setBtnIsHighLighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false)
    }, 300)

    // Clean up function
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your Cart</span>

      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}
