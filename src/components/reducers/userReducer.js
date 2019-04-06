export const initialUserState = {
  user: {},
  isSignedIn: false,
  signedInUser: null,
  userEmail: null,
  score: null
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "updateUser":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
