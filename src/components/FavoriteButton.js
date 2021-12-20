import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import { updateFavoriteRecipes } from '../services/localStorage';

function FavoriteButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const type = pathname.includes('comidas') ? 'comida' : 'bebida';
  const id = pathname.split('/')[2];
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinksById.mealsOrDrinksById);

  useEffect(() => {
    const checkId = favoriteRecipes.some((el) => el.id === id && el.type === type);
    if (checkId) return setFavoriteRecipe(true);
  }, []);

  useEffect(() => {
    updateFavoriteRecipes(mealsOrDrinks[0], pathname, id, favoriteRecipe);
  }, [favoriteRecipe]);

  const handleClick = async () => {
    setFavoriteRecipe(!favoriteRecipe);
  };

  return (
    <input
      onClick={ handleClick }
      type="image"
      data-testid="favorite-btn"
      src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
      alt="share-btn"
    />
  );
}

export default FavoriteButton;
