import endpoint from "./endpoint";
import { setHeaders } from "./setHeaders";
import { parseErr } from "../utility/parseResponse";

export const updateUser = async (obj, route, userDispatch, utilityDispatch) => {
  try {
    setHeaders();
    const response = await endpoint.put(`/users/${route}`, { ...obj });
    localStorage.setItem("token", response.headers.token);
    userDispatch({ type: "updateUser", payload: response.data });
    utilityDispatch({
      type: "setStatus",
      payload: { message: "Update successful", status: 200 }
    });
  } catch (e) {
    const [message, statusCode] = parseErr(e);
    utilityDispatch({
      type: "setStatus",
      payload: { message, status: statusCode }
    });
  }
};
