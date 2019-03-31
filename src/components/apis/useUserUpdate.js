import { useEffect, useContext } from "react";
import endpoint from "./endpoint";
import { setHeaders } from "./setHeaders";
import { parseErr } from "../utility/parseResponse";
import APIContext from "../context/APIContext";

export default obj => {
  const apiContext = useContext(APIContext);
  useEffect(() => {
    endpoint
      .put("/users/update", obj)
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        apiContext.updateUser(response.data);
      })
      .catch(err => {
        const [message, statusCode] = parseErr(err);
        apiContext.setStatus(message, statusCode);
      });
  }, []);
};
