import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
} from '../actions';
import { useHistory } from 'react-router-dom';
import { updateInProgresRecipes, checkLocalStorage } from '../services/localStorage';
import { getIngredients } from '../services/services';
import '../styles/StartRecipeButton.css';

function StartRecipeButton() {
  const [done, setDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  // const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const history = useHistory();
  const { location: { pathname } } = history;
  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinksById.mealsOrDrinksById);
  const ingredients = getIngredients(mealsOrDrinks);
  const id = pathname.split('/')[2];
  const type = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  const handleClick = () => {
    updateInProgresRecipes(id, ingredients, pathname);
    history.push(`/${type}/${id}/in-progress`);
  };

  const checkDoneRecipes = (value) => {
    const itens = pathname.includes('comidas') ? 'meals' : 'cocktails';
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const validateDoneRecipes = doneRecipes.some((el) => el.id === value); // ok
    setDone(validateDoneRecipes);
    let validateInProgressRecipes;
    if (Object.values(inProgressRecipe).length > 0) { // se já possui localStorage, então...;
      validateInProgressRecipes = Object.keys(inProgressRecipe[itens])
        .some((el) => el === id);
    }
    if (validateInProgressRecipes && !validateDoneRecipes) return setInProgress(true);
  };

  useEffect(() => {
    checkDoneRecipes(id);
    checkLocalStorage(pathname, id, setInProgress);
  }, []);

  return (
    <button
      onClick={ handleClick }
      id="recipe-button"
      type="button"
      data-testid="start-recipe-btn"
      disabled={ done }
      style={ done ? { display: 'none' } : null }
    >
      {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
}

export default StartRecipeButton;
