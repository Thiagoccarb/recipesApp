import React from 'react';
import { useSelector } from 'react-redux';
import { getIngredients, getMeasures, getItens } from '../services/services';
import '../styles/IngredientsAndMeasures.css';

function IngredientsAndMeasures() {
  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinksById.mealsOrDrinksById);
  const ingredients = getIngredients(mealsOrDrinks);
  const measures = getMeasures(mealsOrDrinks);

  const ingredientsAndMeasures = getItens(ingredients, measures);

  return (
    <div
      className="ingredients-measures"
    >
      <ol>
        {
          ingredientsAndMeasures.map((el, i) => (
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              {`${el.ingredient} : ${el.measure}` }
            </li>
          ))
        }
      </ol>
      {/* <ol>
        {
          measures.map((e, i) => (
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              {e}
            </li>
          ))
        }
      </ol> */}
    </div>
  );
}

export default IngredientsAndMeasures;
