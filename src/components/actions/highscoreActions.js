import { setHeaders } from "../apis/setHeaders";
import endpoint from "../apis/endpoint";
import { FLASH_MESSAGE } from "../types";
import { parseErr } from "../utility/parseResponse";

export const updateScore = async (score, dispatch) => {
  try {
    setHeaders();
    const response = await endpoint.put("/highscores/update", { ...score });
    localStorage.setItem("token", response.headers.token);
    dispatch({
      type: FLASH_MESSAGE,
      payload: { message: response.data, status: 200 }
    });
  } catch (e) {
    const [message, status] = parseErr(e);
    dispatch({ type: FLASH_MESSAGE, payload: { message, status } });
  }
};

export const getHighscores = (params, dispatch) => {
  setHeaders();
  endpoint
    .get("/highscores/all", { ...params })
    .then(response => response.data)
    .catch(e => {
      const [message, status] = parseErr(e);
      dispatch({ type: FLASH_MESSAGE, payload: { message, status } });
    });
};
