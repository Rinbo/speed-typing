export const initialUserState = {
  message: {},
  user: {}
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "updateUser":
      return { ...state, user: action.payload };
    case "setMessage":
      // @TODO move this to it's own reducer?
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
