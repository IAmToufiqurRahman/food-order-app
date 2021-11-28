import { Fragment } from 'react'

import CartButton from './CartButton'
import MealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'

export default function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Mealify</h1>

        <CartButton onClick={props.onShowCart} />
      </header>

      <div className={classes['main-image']}>
        <img src={MealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  )
}
