import {
  MEALSCATEGORIES,
  DRINKSCATEGORIES,
  LOADING,
  FAIL,
  SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  mealsCategories: [],
  drinksCategories: [],
  loading: false,
  display: false,
};

const buttonsCategories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING:
    return {
      ...state,
      loading: action.value,
    };
  case MEALSCATEGORIES:
    return {
      ...state,
      mealsCategories: action.value,
    };
  case DRINKSCATEGORIES:
    return {
      ...state,
      drinksCategories: action.value,
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

export default buttonsCategories;
