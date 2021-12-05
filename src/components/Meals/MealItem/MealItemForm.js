import { useRef, useState } from 'react'

import Input from '../../UI/Input'

import classes from './MealItemForm.module.css'

export default function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true)

  const [clickCount, setClickCount] = useState(0)

  const amountInputRef = useRef()

  const submitHandler = event => {
    event.preventDefault()

    const enteredAmount = amountInputRef.current.value // this value is always a string
    const enteredAmountNumber = +enteredAmount

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 20) {
      setAmountIsValid(false)
      return
    }

    props.onAddToCart(enteredAmountNumber)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '20',
          step: '1',
          defaultValue: '1'
        }}
      />
      {/* Two curly braces: one for embedding javascript expression and the other one is there because the value is expented to be an object passed as props */}

      <button
        disabled={clickCount > 20}
        onClick={() => {
          setClickCount(clickCount => clickCount + 1)
        }}
      >
        + Add
      </button>

      {!amountIsValid && <p>Please enter a valid amount(1~20)</p>}
    </form>
  )
}
