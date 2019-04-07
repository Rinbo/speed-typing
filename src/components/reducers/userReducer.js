import { SIGN_IN, SIGN_OUT, UPDATE_USER, FLASH_MESSAGE } from "../types";

export const init = initialState => {
  return initialState;
};

export const initialUserState = {
  user: {},
  isSignedIn: false,
  signedInUser: null,
  userEmail: null,
  score: null,
  message: "",
  status: null
};

// @TODO Update backend to always return the same user object
export const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        userEmail: action.payload.email
      };
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
        signedInUser: action.payload.name,
        isSignedIn: true,
        userEmail: action.payload.email
      };
    case SIGN_OUT:
      return init(initialUserState);
    case FLASH_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status
      };
    default:
      return state;
  }
};
