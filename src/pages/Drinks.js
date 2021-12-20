import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { thunkMealsOrDrinks } from '../actions';
import Loading from '../components/Loading';

import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinkCategoriesButton from '../components/DrinkCategoriesButton';
import '../styles/Drinks.css';

function Drinks() {
  const [display, setDisplay] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  const ONE_SECOND = 1000;
  const MAX_NUMBER = 12;

  const dispatch = useDispatch();
  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinks.mealsOrDrinks) || [];
  const mealsOrDrinksByIngredient = useSelector((state) => state
    .mealsOrDrinksByIngredient.itens) || [];

  const cameFromIngredient = useSelector((state) => state
    .mealsOrDrinksByIngredient.cameFromIngredientPage);
  const itens = cameFromIngredient ? mealsOrDrinksByIngredient : mealsOrDrinks;

  useEffect(() => {
    setTimeout(() => setDisplay(true), ONE_SECOND);
    if (!cameFromIngredient) {
      dispatch(thunkMealsOrDrinks(pathname));
    }
  }, []);

  const elements = (
    itens.map((el, index) => {
      if (index < MAX_NUMBER) {
        return (
          <Link
            className="drink-link"
            key={ index }
            to={ `/bebidas/${el.idDrink}` }
          >
            <div
              className="drink-card"
              data-testid={ `${index}-recipe-card` }
            >
              <span
                data-testid={ `${index}-card-name` }
              >
                {el.strDrink}
              </span>
              <img
                data-testid={ `${index}-card-img` }
                src={ el.strDrinkThumb }
                alt={ index }
              />
            </div>
          </Link>
        );
      }
      return '';
    })
  );

  return (
    <>
      <Header
        visible={ 1 }
        title="Bebidas"
      />
      <DrinkCategoriesButton />
      {display ? elements : <Loading />}
      <Footer />
    </>
  );
}

export default Drinks;
