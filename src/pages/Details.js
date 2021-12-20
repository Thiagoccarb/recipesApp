import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  thunkById,
} from '../actions';
import RecommendedList from '../components/RecommendedList';
import YoutubeEmbed from '../components/YoutubeEmbed';
import StartRecipeButton from '../components/StartRecipeButton';
import IngredientsAndMeasures from '../components/IngredientsAndMeasures';
import FavoriteButton from '../components/ShareButton';
import ShareButton from '../components/FavoriteButton';

import '../styles/FoodDetails.css';
import '../styles/Details.css';

function Details() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = history.location.pathname.split('/')[2];
  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinksById.mealsOrDrinksById);

  useEffect(() => {
    dispatch(thunkById(id, pathname));
  }, []);

  return (
    <div
      className="details-container"
    >
      {mealsOrDrinks.map((el, i) => (
        <div
          key={ i }
          className="item-details"
        >
          <img
            data-testid="recipe-photo"
            src={ pathname.includes('comidas') ? el.strMealThumb : el.strDrinkThumb }
            alt={ pathname.includes('comidas') ? el.strMeal : el.strDrink }
          />
          <div
            className="inputs-container"
          >
            <ShareButton />
            <FavoriteButton />
          </div>
          <h1
            data-testid="recipe-title"
          >
            {pathname.includes('comidas') ? el.strMeal : el.strDrink}
          </h1>
          <span
            data-testid="recipe-category"
          >
            {pathname.includes('comidas') ? el.strTags : el.strAlcoholic}
          </span>
          <copy />
          <h2
            data-testid="recipe-category"
          >
            {el.strCategory}
          </h2>
          <IngredientsAndMeasures />
          <p
            data-testid="instructions"
          >
            {el.strInstructions}
          </p>
          {pathname.includes('comidas') && <YoutubeEmbed />}
          <RecommendedList />
        </div>
      ))}
      <StartRecipeButton />
    </div>
  );
}

export default Details;
