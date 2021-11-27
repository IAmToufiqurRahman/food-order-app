import Input from '../../UI/Input'

import classes from './MealItemForm.module.css'

export default function MealItemForm() {
  return (
    <form className={classes.form}>
      <Input
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '20',
          step: '1',
          defaultValue: '1'
        }}
      />
      {/* Two curly braces: one for embedding javascript expression and the other one is threse because the value is object */}
      <button>+ Add</button>
    </form>
  )
}
