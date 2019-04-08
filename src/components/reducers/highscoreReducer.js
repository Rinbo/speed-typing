import { GET_HIGHSCORES } from "../types";

export const initialHighscores = {
  highscores: []
};

export const highscoreReducer = (state, action) => {
  switch (action.type) {
    case GET_HIGHSCORES:
      return { highscores: action.payload };
    default:
      return state;
  }
};
