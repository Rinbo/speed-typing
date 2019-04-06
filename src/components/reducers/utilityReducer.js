import { FLASH_MESSAGE, UPDATE_FORM_INPUT, DO_TOGGLE } from "../types";

export const initialUtilityState = {
  message: {},
  formInput: "",
  toggle: false
};

export const utilityReducer = (state, action) => {
  switch (action.type) {
    case FLASH_MESSAGE:
      return { ...state, message: action.payload };
    case UPDATE_FORM_INPUT:
      return { ...state, formInput: action.payload };
    case DO_TOGGLE:
      return { ...state, toggle: !state.toggle };
    default:
      return state;
  }
};
