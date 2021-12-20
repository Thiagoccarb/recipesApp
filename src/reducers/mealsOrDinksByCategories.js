import {
  MEALSCATEGORIES,
  DRINKSCATEGORIES,
  REQUEST,
  FAIL,
  SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  meals: [],
  drinks: [],
  loading: false,
};

const mealsOrDrinksByCategories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: true,
    };
  case MEALSCATEGORIES:
    return {
      ...state,
      meals: action.value,
    };
  case DRINKSCATEGORIES:
    return {
      ...state,
      drinks: action.value,
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

export default mealsOrDrinksByCategories;
