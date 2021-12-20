import {
  EXPLOREINGREDIENTS,
} from '../actions';

const INITIAL_STATE = {
  ingredients: '',
};

const mealsOrDrinksIngredients = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPLOREINGREDIENTS:
    return {
      ...state,
      ingredients: action.value,
    };
  default:
    return state;
  }
};

export default mealsOrDrinksIngredients;
