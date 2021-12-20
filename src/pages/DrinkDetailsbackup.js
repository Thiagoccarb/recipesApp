import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setId,
  setIngredient,
  setLoading,
} from '../actions';
import RecommendedList from '../components/RecommendedList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import StartRecipeDrinkButton from '../components/StartRecipeDrinkButton';


function DrinkDetails() {
  const msg = 'serviço indisponível';
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.mealsOrDrinks.loading);
  const drink = useSelector((state) => state.mealsOrDrinks.mealsOrDrinksByID);
  const drinkObjectValues = useSelector((state) => state.mealsOrDrinks.ingredients);
  const ingredients = drinkObjectValues
    .filter((ingredient) => ingredient[0]
      .includes('strIngredient') && ingredient[1] !== '' && ingredient[1] !== null)
    .map((e) => e[1]);
    const measures = drinkObjectValues
    .filter((ingredient) => ingredient[0]
      .includes('strMeasure') && ingredient[1] !== null)
    .map((e) => e[1]);

  const getDrinkById = async (value) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`;
    try {
      dispatch(setLoading(true));
      const request = await fetch(URL);
      const { drinks } = await request.json();
      dispatch(setLoading(false));
      dispatch(setId(drinks));
      dispatch(setIngredient(Object.entries(drinks[0])));
    } catch (error) {
      global.alert(msg);
      return error;
    }
  };

  useEffect(() => {
    getDrinkById(id);
  }, []);

  return (
    <div>
      {drink.map((el, i) => (
        <div
          key={ i }
          className="item-details"
        >
          <img
            data-testid="recipe-photo"
            src={ el.strDrinkThumb }
            alt={ el.strDrink }
          />
          <h1
            data-testid="recipe-title"
          >
            {el.strDrink}
          </h1>
          <h2
            data-testid="recipe-category"
          >
            {el.strAlcoholic}
          </h2>
          <button
            type="button"
            data-testid="share-btn"
          >
            <img
              src={ shareIcon }
              alt={ shareIcon }
            />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            <img
              src={ whiteHeartIcon }
              alt={ shareIcon }
            />
          </button>
          <span
            data-testid="recipe-category"
          >
            {el.strCategory}
          </span>
          <ol>
            {
              ingredients.map((e, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {e}
                </li>
              ))
            }
          </ol>
          <ol>
            {
              measures.map((e, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {e}
                </li>
              ))
            }
          </ol>
          <p
            data-testid="instructions"
          >
            {el.strInstructions}
          </p>
          <RecommendedList /> 
        </div>
      ))}
        {!isFetching && <StartRecipeDrinkButton />  }
    </div>
  );
}

export default DrinkDetails;
