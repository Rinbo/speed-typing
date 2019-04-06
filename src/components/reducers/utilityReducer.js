export const initialUtilityState = {
  message: {},
  formInput: "",
  toggle: false
};

export const utilityReducer = (state, action) => {
  switch (action.type) {
    case "setMessage":
      return { ...state, message: action.payload };
    case "updateFormInput":
      return { ...state, formInput: action.payload };
    case "doToggle":
      return { ...state, toggle: !state.toggle };
    default:
      return state;
  }
};
