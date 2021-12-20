import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { thunkMealsOrDrinks } from '../actions';
import '../styles/RecommendedList.css';

const RecommendedList = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const history = useHistory();
  const { location: { pathname } } = history;
  const dispatch = useDispatch();
  const getMeals = () => dispatch(thunkMealsOrDrinks('comidas'));
  const getDrinks = () => dispatch(thunkMealsOrDrinks('bebidas'));
  const checkRoute = pathname.includes('comidas');
  const itens = useSelector((state) => state.mealsOrDrinks.mealsOrDrinks);
  const MAX_NUMBER = 6;

  const getDrinksOrMeals = () => {
    if (checkRoute) return getDrinks();
    return getMeals();
  };

  useEffect(() => {
    getDrinksOrMeals();
  }, []);

  return (
    <Carousel activeIndex={ index } onSelect={ handleSelect }>
      {
        itens.map((el, i) => {
          if (i < MAX_NUMBER) {
            return (
              <Carousel.Item
                key={ i }
              >
                <div
                  className="caroussel-card"
                >
                  <div
                    className="recomendation-card"
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <h1
                      data-testid={ `${i}-recomendation-title` }
                    >
                      {checkRoute ? el.strDrink : el.strMeal }
                    </h1>
                    <img
                      className="recommended-image"
                      data-testid={ `${i}-card-img` }
                      src={ checkRoute ? el.strDrinkThumb : el.strMealThumb }
                      alt={ el.strMeal }
                    />
                  </div>
                </div>
              </Carousel.Item>
            );
          }
          return '';
        })
      }
    </Carousel>
  );
};

export default RecommendedList;
