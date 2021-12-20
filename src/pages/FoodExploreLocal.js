import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { thunkMealsOrDrinks, thunkByArea } from '../actions';
import { thunkByFoodOrigin } from '../actions/index2';

import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/FoodExploreLocal.css';

function FoodExploreLocal() {
  const [display, setDisplay] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const MAX_NUMBER = 12;
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.mealsOrDrinks.mealsOrDrinks);
  const mealsByOrigin = useSelector((state) => state.mealsOrDrinks.origin);
  const options = useSelector((state) => state.mealsOrDrinks.area);
  const itens = display ? mealsByOrigin : meals;

  useEffect(() => {
    dispatch(thunkMealsOrDrinks(pathname));
    dispatch(thunkByArea());
    return (() => setDisplay(false));
  }, []);

  const handleChange = (e) => {
    if (e.target.value === 'All') {
      return setDisplay(false);
    }
    setDisplay(true);
    return dispatch(thunkByFoodOrigin(e.target.value));
  };

  return (
    <>
      <Header
        title="Explorar Origem"
        visible={ 1 }
      />
      <label
        id="originsLabel"
        htmlFor="origins"
      >
        Selecione origem:
        <select
          id="origins"
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => handleChange(e) }
        >
          {
            options.map((el, i) => (
              <option
                data-testid={ `${el.strArea}-option` }
                key={ i }
                value={ el.strArea }
                name={ el.strArea }
              >
                {el.strArea}
              </option>
            ))
          }
          <option
            data-testid="All-option"
            value="All"
            name="All"
          >
            All
          </option>
        </select>
      </label>

      {
        itens.map((el, index) => {
          if (index < MAX_NUMBER) {
            return (
              <Link
                key={ index }
                to={ `/comidas/${el.idMeal}` }
              >
                <div
                  className="food-card"
                  data-testid={ `${index}-recipe-card` }
                >
                  <span
                    data-testid={ `${index}-card-name` }
                  >
                    {el.strMeal}
                  </span>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ el.strMealThumb }
                    alt={ index }
                  />
                </div>
              </Link>
            );
          }
          return '';
        })
      }
      <Footer />
    </>
  );
}

export default FoodExploreLocal;
