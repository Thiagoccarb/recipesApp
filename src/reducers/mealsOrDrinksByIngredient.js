import {
  MEALORDRINKBYINGREDIENT,
  CAMEFROMINGREDIENT,
} from '../actions/index2';

import {
  REQUEST,
  FAIL,
  SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  itens: [],
  cameFromIngredientPage: false,
};

const mealsOrDrinksByIngredient = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: true,
    };
  case MEALORDRINKBYINGREDIENT:
    return {
      ...state,
      itens: action.value,
    };
  case CAMEFROMINGREDIENT:
    return {
      ...state,
      cameFromIngredientPage: action.value,
    };
  case SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case FAIL:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default mealsOrDrinksByIngredient;
