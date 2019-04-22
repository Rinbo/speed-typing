import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
  //baseURL: "https://typing.borjessons.nu",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json"
  }
});

//http://acc-game-backend.eu-north-1.elasticbeanstalk.com
