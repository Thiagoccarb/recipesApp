import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkMealorDrinkIngredient } from '../actions';
import { thunkBySpecIngredient, setCameFromIngredients } from '../actions/index2';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function DrinkExploreIngredients() {
  const MAX_NUMBER = 12;
  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { pathname } } = history;
  const drinkIngredients = useSelector((state) => state
    .mealsOrDrinksIngredients.ingredients || []);
  const loading = useSelector((state) => state
    .mealsOrDrinks.loading);

  const getItemsByIngredient = (e) => {
    const elementName = e.target.parentNode.lastChild.innerText;
    dispatch(thunkBySpecIngredient(pathname, elementName));
  };

  useEffect(() => {
    dispatch(setCameFromIngredients(true)); // irá controlar o que será renderizado na roda /comidas;
    dispatch(thunkMealorDrinkIngredient(pathname));
  }, []);

  const ingredientElements = drinkIngredients.map((el, i) => {
    if (i < MAX_NUMBER) {
      return (
        <Link
          to={ { pathname: '/bebidas', state: true } }
          onClick={ (e) => getItemsByIngredient(e) }
          key={ i }
        >
          <div
            className="ingredient-card"
            data-testid={ `${i}-ingredient-card` }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
              alt={ i }
            />
            <span
              data-testid={ `${i}-card-name` }
            >
              {el.strIngredient1}
            </span>
          </div>
        </Link>
      );
    }
    return '';
  });

  return (
    <>
      <Header
        title="Explorar Ingredientes"
        visible={ false }
      />
      {loading ? <Loading /> : ingredientElements}
      <Footer />
    </>
  );
}

export default DrinkExploreIngredients;
