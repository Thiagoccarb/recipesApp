import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setButtonValidate,
  // thunkDrinks,
  // thunkMeals,
} from '../actions';
import { getIngredients, getMeasures, getItens } from '../services/services';
import '../styles/IngredientsAndMeasures.css';
import { updateLocalStorage } from '../services/localStorage';

function InProgressIngredients() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;
  const type = pathname.includes('comidas') ? 'meals' : 'cocktails';
  const id = history.location.pathname.split('/')[2];
  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinksById.mealsOrDrinksById);
  const measures = getMeasures(mealsOrDrinks);
  const ingredients = getIngredients(mealsOrDrinks);
  const ingredientsAndMeasures = getItens(ingredients, measures);

  const checkIngredients = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const elements = document.getElementsByTagName('input');
    const nodeList = [...elements];
    const doneIngredients = inProgressRecipes[type][id];
    nodeList.forEach((e) => {
      if (doneIngredients.includes(e.name)) {
        e.checked = true;
        e.parentNode.style.textDecoration = 'line-through';
      }
    });
  };

  const handleButton = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneIngredients = inProgressRecipes[type][id];
    const elements = document.getElementsByTagName('input');
    const nodeList = [...elements]
      .filter((el) => el.name !== '');
    const validate = nodeList.length === doneIngredients.length;
    dispatch(setButtonValidate(validate));
    console.log(doneIngredients.length);
  };

  useEffect(() => {
    checkIngredients();
    handleButton();
  }, []);

  const updateIngredients = (e) => {
    const element = e.target;
    if (element.checked) {
      element.parentNode.style.textDecoration = 'line-through';
    } else {
      element.parentNode.style.textDecoration = 'none';
    }
  };

  const handleClick = (e) => {
    updateIngredients(e);
    updateLocalStorage(e, pathname, type, id);
    handleButton();
  };

  return (
    <div>
      <ol>
        {
          ingredientsAndMeasures.map((el, i) => (
            <li
              key={ i }
            >
              <label
                htmlFor={ `${el.ingredient}-${i}` }
              >
                <input
                  type="checkbox"
                  id={ `${el.ingredient}-${i}` }
                  data-testid={ `${i}-ingredient-step` }
                  name={ el.ingredient }
                  value={ el.ingredient }
                  onChange={ handleClick }
                />
                {`${el.ingredient} : ${el.measure}` }
              </label>
            </li>
          ))
        }
      </ol>
      {/* <ol>
        {
          measures.map((el, i) => (
            <li
              key={ i }
            >
              {el}
            </li>
          ))
        }
      </ol> */}
    </div>
  );
}

export default InProgressIngredients;
