import endpoint from "./endpoint";
import { setHeaders } from "./setHeaders";
import { parseErr } from "../utility/parseResponse";

export const updateUser = async (obj, route, dispatch) => {
  try {
    setHeaders();
    const response = await endpoint.put(`/users/${route}`, { ...obj });
    localStorage.setItem("token", response.headers.token);
    dispatch({ type: "updateUser", payload: response.data });
    dispatch({
      type: "setStatus",
      payload: { message: "Update successful", status: 200 }
    });
  } catch (e) {
    const [message, statusCode] = parseErr(e);
    dispatch({ type: "setStatus", payload: { message, status: statusCode } });
  }
};
