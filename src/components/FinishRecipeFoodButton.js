import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDoneRecipes } from '../services/localStorage';

function FinishRecipeFoodButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const displayButton = useSelector((state) => state.buttonValidate.validate);
  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinksById.mealsOrDrinksById);

  const redirect = () => {
    updateDoneRecipes(pathname, mealsOrDrinks);
    history.push('/receitas-feitas');
  };

  return (
    <button
      onClick={ redirect }
      disabled={ !displayButton }
      id="recipe-button"
      type="button"
      data-testid="finish-recipe-btn"
    >
      Finalizar Receita
    </button>
  );
}

export default FinishRecipeFoodButton;
