import React, { useState, useEffect } from "react";
import endpoint from "../apis/endpoint";
import { setHeaders, destroyToken } from "../apis/setHeaders";

const Context = React.createContext("auth");

export const AuthStore = props => {
  const [state, updateState] = useState({
    isSignedIn: null,
    signedInUser: null,
    userEmail: null,
    isLoading: true,
    statusMessage: "",
    statusCode: null
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
          statusMessage: "Token validated. Welcome back " + response.data.name,
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
          statusCode: 401
        });
        console.log("Failed to validate token");
      });
  }, []);

  const signIn = user => {
    updateState({
      isSignedIn: true,
      signedInUser: user.name,
      userEmail: user.email,
      isLoading: false,
      statusMessage: "Signin successful. Welcome " + user.name,
      statusCode: 200
    });
  };

  const signOut = () => {
    setHeaders();
    endpoint
      .delete("/users/signout")
      .then(response => {
        console.log(response.data);
      })
      .catch(e => console.log("Unable to destory token."));
    updateState({
      isSignedIn: false,
      signedInUser: null,
      userEmail: null,
      isLoading: false,
      statusMessage: "Signout Successful. Cya later",
      statusCode: 200
    });
    destroyToken();
  };

  const setStatus = (message, code) => {
    updateState(prevState => {
      return { ...prevState, statusMessage: message, statusCode: code };
    });
  };

  return (
    <Context.Provider value={{ ...state, signIn, signOut, setStatus }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
