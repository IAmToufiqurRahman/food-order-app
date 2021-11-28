import classes from './AvailableMeals.module.css'

import MealItem from './MealItem/MealItem'
import Card from '../UI/Card'

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Kacchi Biriyani',
    description: 'Finest Combo of Basmoti rice and mutton',
    price: 22.99
  },
  {
    id: 'm2',
    name: 'Mustakim Chicken Chap',
    description: 'A delicate art of kabab!',
    price: 16.5
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99
  }
]

export default function AvailableMeals() {
  const mealsList = DUMMY_MEALS.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}
