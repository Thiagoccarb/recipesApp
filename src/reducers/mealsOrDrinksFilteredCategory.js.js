import {
  MEALFILTEREDCATEGORY,
  DRINKFILTEREDCATEGORY,
  BUTTONCATEGORY,
  REQUEST,
  FAIL,
  SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  ButtonCategory: '',
  mealFilteredCategory: [],
  drinkFilteredCategory: [],
  loading: false,
};

const mealsOrDrinksFilteredCategory = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: true,
    };
  case BUTTONCATEGORY:
    return {
      ...state,
      ButtonCategory: action.value,
    };
  case MEALFILTEREDCATEGORY:
    return {
      ...state,
      mealFilteredCategory: action.value,
    };
  case DRINKFILTEREDCATEGORY:
    return {
      ...state,
      drinkFilteredCategory: action.value,
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

export default mealsOrDrinksFilteredCategory;
