import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.borjessons.nu/game-backend",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token") || "";
  config.headers = { ...config.headers, token };
  return config;
});

export default instance;
