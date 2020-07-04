import axios from "axios";

export default axios.create({
  baseURL: "https://api.borjessons.nu/game-backend",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json",
  },
});
