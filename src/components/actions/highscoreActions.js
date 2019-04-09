import { setHeaders } from "../apis/setHeaders";
import endpoint from "../apis/endpoint";
import { FLASH_MESSAGE, GET_HIGHSCORES, GET_USER_SCORES } from "../types";
import { parseErr } from "../utility/parseResponse";

export const updateScore = async (score, flashDispatch) => {
  try {
    setHeaders();
    const response = await endpoint.put("/highscores/update", { ...score });
    localStorage.setItem("token", response.headers.token);
    flashDispatch({
      type: FLASH_MESSAGE,
      payload: { message: response.data, status: 200 }
    });
  } catch (e) {
    const [message, status] = parseErr(e);
    flashDispatch({ type: FLASH_MESSAGE, payload: { message, status } });
  }
};

export const getHighscores = (params, highscoresDispatch, flashDispatch) => {
  setHeaders();
  endpoint
    .get("/highscores/all", { ...params })
    .then(response => {
      highscoresDispatch({ type: GET_HIGHSCORES, payload: response.data });
    })
    .catch(e => {
      const [message, status] = parseErr(e);
      flashDispatch({ type: FLASH_MESSAGE, payload: { message, status } });
    });
};

export const getUserScores = (scoresDispatch, flashDispatch) => {
  setHeaders();
  endpoint
    .get("/highscores/user")
    .then(response => {
      localStorage.setItem("token", response.headers.token);
      scoresDispatch({ type: GET_USER_SCORES, payload: response.data });
    })

    .catch(e => {
      const [message, status] = parseErr(e);
      flashDispatch({ type: FLASH_MESSAGE, payload: { message, status } });
    });
};
