import { useEffect, useState } from "react";
import { setHeaders, destroyToken } from "../apis/setHeaders";
import endpoint from "../apis/endpoint";

export default () => {
  const [state, updateState] = useState({
    isSignedIn: null,
    signedInUser: null,
    userEmail: null,
    isLoading: true,
    statusMessage: "",
    statusCode: null,
    score: null
  });

  useEffect(() => {
    setHeaders();
    endpoint
      .get("/users/validatetoken")
      .then(response => {
        localStorage.setItem("token", response.headers.token);
        setHeaders();
        updateState({
          isSignedIn: true,
          signedInUser: response.data.name,
          userEmail: response.data.email,
          isLoading: false,
          statusMessage: "Welcome back " + response.data.name,
          statusCode: 200
        });
      })
      .catch(e => {
        updateState({
          isSignedIn: false,
          signedInUser: null,
          userEmail: null,
          isLoading: false,
          statusMessage:
            "Unable to validate your token. Please try to log in using your credentials",
          statusCode: e.response.status
        });
        destroyToken();
      });
  }, []);
  return [state, updateState];
};
