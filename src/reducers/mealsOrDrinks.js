import {
  INITIALMEALSORDRINKS,
  REQUEST,
  FAIL,
  SUCCESS,
  AREA,
  ORIGIN,
} from '../actions';

const INITIAL_STATE = {
  mealsOrDrinks: [],
  area: [],
  origin: [],
  loading: false,
};

const mealsOrDrinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: true,
    };
  case INITIALMEALSORDRINKS:
    return {
      ...state,
      mealsOrDrinks: action.value,
    };
  case SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case AREA:
    return {
      ...state,
      area: action.value,
    };
  case ORIGIN:
    return {
      ...state,
      origin: action.value,
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

export default mealsOrDrinks;
