import {
  ID,
  REQUEST,
  FAIL,
  SUCCESS,
  INGREDIENTS,
} from '../actions';

const INITIAL_STATE = {
  mealsOrDrinksById: [],
  loading: false,
  ingredients: [],
};

const mealsOrDrinksById = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: true,
    };
  case ID:
    return {
      ...state,
      mealsOrDrinksById: action.value,
    };
  case INGREDIENTS:
    return {
      ...state,
      ingredients: action.value,
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

export default mealsOrDrinksById;
