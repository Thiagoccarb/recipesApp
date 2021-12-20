import {
  BUTTONVALIDATE,
} from '../actions';

const INITIAL_STATE = {
  validate: false,
};

const buttonValidate = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case BUTTONVALIDATE:
    return {
      ...state,
      validate: action.value,
    };
  default:
    return state;
  }
};

export default buttonValidate;
