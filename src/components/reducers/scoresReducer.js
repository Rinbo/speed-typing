import { GET_HIGHSCORES, GET_USER_SCORES } from "../types";

export const initialScores = {
  highscores: [],
  userScores: []
};

export const scoresReducer = (state, action) => {
  switch (action.type) {
    case GET_HIGHSCORES:
      return { ...state, highscores: action.payload };
    case GET_USER_SCORES:
      return { ...state, userScores: action.payload };
    default:
      return state;
  }
};
