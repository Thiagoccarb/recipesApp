import {
  // MEALSORDRINKSEARCHBAR,
  REQUEST,
  FAIL,
  SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  mealsOrDrinks: [],
  loading: false,
};

const searchBar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: true,
    };
  // case MEALSORDRINKSEARCHBAR:
  //   return {
  //     ...state,
  //     mealsOrDrinks: action.value,
  //   };
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

export default searchBar;
