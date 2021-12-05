import { useEffect, useState } from 'react'

import classes from './AvailableMeals.module.css'

import MealItem from './MealItem/MealItem'
import Card from '../UI/Card'

export default function AvailableMeals() {
  const [meals, setMeals] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [httpError, setHttpError] = useState()

  // sending http request is an asynchronous task so, fetch returns a promise
  useEffect(() => {
    // the function you pass to useEffect should not return a promise, the solution is creating a new function
    const fetchMeals = async () => {
      const response = await fetch('https://react-custom-hook-90948-default-rtdb.firebaseio.com/meals.json')

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const responseData = await response.json() // this will be an object

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      setMeals(loadedMeals)

      setIsLoading(false)
    }

    // the traditional way of handling an error inside of a promise
    fetchMeals().catch(error => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />)

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}
