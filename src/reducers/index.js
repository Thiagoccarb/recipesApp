import { combineReducers } from 'redux';
import searchBar from './searchBar';
import mealsOrDrinks from './mealsOrDrinks';
import buttonsCategories from './buttonsCategories';
import mealsOrDrinksByCategories from './mealsOrDinksByCategories';
import mealsOrDrinksFilteredCategory from './mealsOrDrinksFilteredCategory.js';
import mealsOrDrinksById from './mealsOrDrinksById';
import buttonValidate from './buttonValidate';
import randomMeal from './randomMeal';
import mealsOrDrinksIngredients from './ingredients';
import mealsOrDrinksByIngredient from './mealsOrDrinksByIngredient';

const rootReducer = combineReducers({ searchBar,
  mealsOrDrinks,
  buttonsCategories,
  mealsOrDrinksByCategories,
  mealsOrDrinksFilteredCategory,
  mealsOrDrinksById,
  buttonValidate,
  randomMeal,
  mealsOrDrinksIngredients,
  mealsOrDrinksByIngredient,
});

export default rootReducer;
