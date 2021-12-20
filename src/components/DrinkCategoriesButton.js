import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setCameFromIngredients } from '../actions/index2';

import {
  thunkDrinkButtonsCategories,
  setButtonCategory,
  thunkMealsOrDrinks,
  thunkDrinkCategorie,
} from '../actions';

function DrinkCategoriesButton() {
  const [displayButtons, setDisplayButtons] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;
  const buttons = useSelector((state) => state.buttonsCategories.drinksCategories);

  const ONE_SECOND = 1000;
  const MAX_NUMBER = 5;

  const getDrinksCategories = () => dispatch(thunkDrinkButtonsCategories());

  useEffect(() => {
    getDrinksCategories();
    setTimeout(() => setDisplayButtons(true), ONE_SECOND);
  }, []);

  const handleChecked = (e) => {
    const element = e.target.firstChild;
    element.checked = !element.checked;
    if (element.checked) {
      dispatch(thunkDrinkCategorie(e.target.innerText));
      dispatch(setCameFromIngredients(false));
    } else {
      dispatch(thunkMealsOrDrinks(pathname));
    }
  };

  const handleClick = (e) => {
    dispatch(setButtonCategory(e.target.innerText));
    handleChecked(e);
  };

  const handleClickAllButton = () => {
    dispatch(setCameFromIngredients(false));
    dispatch(thunkMealsOrDrinks(pathname));
  };

  const buttonsElement = (
    <div
      className="category-buttons"
    >
      {
        buttons.map((el, index) => {
          if (index < MAX_NUMBER) {
            return (
              <button
                onClick={ handleClick }
                type="button"
                key={ index }
                data-testid={ `${el.strCategory}-category-filter` }
              >
                <input type="checkbox" style={ { display: 'none' } } />
                {el.strCategory}
              </button>
            );
          }
          return '';
        })
      }
      <button
        id="btn"
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAllButton }
      >
        All
      </button>

    </div>
  );

  return (
    displayButtons
    && buttonsElement
  );
}

export default DrinkCategoriesButton;
