import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:5000",
  baseURL: "https://typing2.borjessons.nu/game-backend",
  //baseURL: "http://ec2-13-53-130-252.eu-north-1.compute.amazonaws.com:8080/game-backend",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json"
  }
});
