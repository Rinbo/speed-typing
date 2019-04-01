import endpoint from "./endpoint";
import { setHeaders } from "./setHeaders";

export const updatePassword = async obj => {
  setHeaders();
  try {
    const response = await endpoint.put("/users/updatePassword", { ...obj });
    return { status: 200, payload: response.data };
  } catch (e) {
    return { status: e.status, payload: null };
  }
};

export const updateEmail = async obj => {
  setHeaders();
  try {
    const response = await endpoint.put("/users/update", { ...obj });
    return { status: 200, payload: response.data };
  } catch (e) {
    return { status: e.status, payload: e };
  }
};
