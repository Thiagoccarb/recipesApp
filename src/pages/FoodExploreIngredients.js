import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkMealorDrinkIngredient } from '../actions';
import { thunkBySpecIngredient, setCameFromIngredients } from '../actions/index2';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function FoodExploreIngredients() {
  const foodIngredients = useSelector((state) => state
    .mealsOrDrinksIngredients.ingredients || []);
  const loading = useSelector((state) => state
    .mealsOrDrinks.loading);
  const MAX_NUMBER = 12;
  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { pathname } } = history;

  const getItemsByIngredient = (e) => {
    const elementName = e.target.parentNode.lastChild.innerText;
    dispatch(thunkBySpecIngredient(pathname, elementName));
  };

  useEffect(() => {
    dispatch(thunkMealorDrinkIngredient(pathname));
    return (() => dispatch(setCameFromIngredients(true))); // irá controlar o que será renderizado na roda /comidas;
  }, []);

  const ingredientElements = foodIngredients.map((el, i) => {
    if (i < MAX_NUMBER) {
      return (
        <Link
          to={ { pathname: '/comidas', state: true } }
          onClick={ (e) => getItemsByIngredient(e) }
          key={ i }
        >
          <div
            className="ingredient-card"
            data-testid={ `${i}-ingredient-card` }
          >
            <img
              data-testid={ `${i}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png` }
              alt={ i }
            />
            <span
              data-testid={ `${i}-card-name` }
            >
              {el.strIngredient}
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

export default FoodExploreIngredients;
