import axios from "axios";

export const setHeaders = () => {
  try {
    axios.defaults.headers.common["token"] = localStorage.getItem("token");
  } catch (e) {
    console.log("Unable to fetch token");
  }
};

export const destroyToken = () => {
  localStorage.removeItem("token");
};
