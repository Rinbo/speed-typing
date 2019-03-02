import axios from "axios";

export const setHeaders = () => {
  axios.defaults.headers.common["token"] = localStorage.getItem("token");
};

export const destroyToken = () => {
  localStorage.removeItem("token");
};
