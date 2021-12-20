import {
  RANDOMMEAL,
} from '../actions';

const INITIAL_STATE = {
  randomMealID: '',
};

const randomMeal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RANDOMMEAL:
    return {
      ...state,
      randomMealID: action.value,
    };
  default:
    return state;
  }
};

export default randomMeal;
